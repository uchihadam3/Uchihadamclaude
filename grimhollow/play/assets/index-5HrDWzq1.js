var of=Object.defineProperty;var af=(s,t,e)=>t in s?of(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var ut=(s,t,e)=>af(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sl="170",lf=0,Jl=1,cf=2,Xh=1,hf=2,kn=3,ri=0,je=1,qt=2,ii=0,Ki=1,so=2,Ql=3,tc=4,df=5,vi=100,uf=101,ff=102,pf=103,mf=104,gf=200,_f=201,xf=202,vf=203,Aa=204,Ra=205,bf=206,Mf=207,wf=208,yf=209,Sf=210,Tf=211,Ef=212,Af=213,Rf=214,Ca=0,La=1,Pa=2,ns=3,Ua=4,Da=5,Ia=6,ka=7,po=0,Cf=1,Lf=2,si=0,Pf=1,Uf=2,Df=3,If=4,kf=5,Nf=6,Ff=7,qh=300,is=301,ss=302,Na=303,Fa=304,mo=306,nn=1e3,mn=1001,Oa=1002,xn=1003,Of=1004,or=1005,We=1006,yo=1007,gn=1008,Hn=1009,$h=1010,Yh=1011,Hs=1012,Tl=1013,wi=1014,Fn=1015,Ys=1016,El=1017,Al=1018,rs=1020,jh=35902,Zh=1021,Kh=1022,_n=1023,Jh=1024,Qh=1025,Ji=1026,os=1027,td=1028,Rl=1029,ed=1030,Cl=1031,Ll=1033,Yr=33776,jr=33777,Zr=33778,Kr=33779,za=35840,Ba=35841,Ha=35842,Ga=35843,Va=36196,Wa=37492,Xa=37496,qa=37808,$a=37809,Ya=37810,ja=37811,Za=37812,Ka=37813,Ja=37814,Qa=37815,tl=37816,el=37817,nl=37818,il=37819,sl=37820,rl=37821,Jr=36492,ol=36494,al=36495,nd=36283,ll=36284,cl=36285,hl=36286,zf=3200,Bf=3201,Pl=0,Hf=1,ni="",Re="srgb",cs="srgb-linear",go="linear",pe="srgb",Ai=7680,ec=519,Gf=512,Vf=513,Wf=514,id=515,Xf=516,qf=517,$f=518,Yf=519,dl=35044,nc="300 es",On=2e3,ro=2001;class hs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],So=Math.PI/180,ul=180/Math.PI;function zn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[s&255]+Ne[s>>8&255]+Ne[s>>16&255]+Ne[s>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Ge(s,t,e){return Math.max(t,Math.min(e,s))}function jf(s,t){return(s%t+t)%t}function To(s,t,e){return(1-e)*s+e*t}function Tn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function me(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class wt{constructor(t=0,e=0){wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,n,i,r,a,o,l,c){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],y=i[1],v=i[4],x=i[7],E=i[2],S=i[5],A=i[8];return r[0]=a*_+o*y+l*E,r[3]=a*m+o*v+l*S,r[6]=a*p+o*x+l*A,r[1]=c*_+h*y+d*E,r[4]=c*m+h*v+d*S,r[7]=c*p+h*x+d*A,r[2]=u*_+f*y+g*E,r[5]=u*m+f*v+g*S,r[8]=u*p+f*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Eo.makeScale(t,e)),this}rotate(t){return this.premultiply(Eo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Eo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Eo=new Zt;function sd(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Gs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Zf(){const s=Gs("canvas");return s.style.display="block",s}const ic={};function Ls(s){s in ic||(ic[s]=!0,console.warn(s))}function Kf(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Jf(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Qf(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ce={enabled:!0,workingColorSpace:cs,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===pe&&(s.r=Bn(s.r),s.g=Bn(s.g),s.b=Bn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===pe&&(s.r=Qi(s.r),s.g=Qi(s.g),s.b=Qi(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ni?go:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Bn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Qi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const sc=[.64,.33,.3,.6,.15,.06],rc=[.2126,.7152,.0722],oc=[.3127,.329],ac=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lc=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ce.define({[cs]:{primaries:sc,whitePoint:oc,transfer:go,toXYZ:ac,fromXYZ:lc,luminanceCoefficients:rc,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:sc,whitePoint:oc,transfer:pe,toXYZ:ac,fromXYZ:lc,luminanceCoefficients:rc,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}});let Ri;class tp{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ri===void 0&&(Ri=Gs("canvas")),Ri.width=t.width,Ri.height=t.height;const n=Ri.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ri}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Gs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Bn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bn(e[n]/255)*255):e[n]=Bn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ep=0;class rd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=zn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ao(i[a].image)):r.push(Ao(i[a]))}else r=Ao(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ao(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?tp.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let np=0;class Xe extends hs{constructor(t=Xe.DEFAULT_IMAGE,e=Xe.DEFAULT_MAPPING,n=mn,i=mn,r=We,a=gn,o=_n,l=Hn,c=Xe.DEFAULT_ANISOTROPY,h=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=zn(),this.name="",this.source=new rd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==qh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case nn:t.x=t.x-Math.floor(t.x);break;case mn:t.x=t.x<0?0:1;break;case Oa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case nn:t.y=t.y-Math.floor(t.y);break;case mn:t.y=t.y<0?0:1;break;case Oa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=qh;Xe.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,n=0,i=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,x=(f+1)/2,E=(p+1)/2,S=(h+u)/4,A=(d+_)/4,C=(g+m)/4;return v>x&&v>E?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=S/n,r=A/n):x>E?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=S/i,r=C/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=A/r,i=C/r),this.set(n,i,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-_)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ip extends hs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:We,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Xe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new rd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yi extends ip{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class od extends Xe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=xn,this.minFilter=xn,this.wrapR=mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class sp extends Xe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=xn,this.minFilter=xn,this.wrapR=mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class js{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==f||h!==g){let m=1-o;const p=l*u+c*f+h*g+d*_,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const E=Math.sqrt(v),S=Math.atan2(E,p*y);m=Math.sin(m*S)/E,o=Math.sin(o*S)/E}const x=o*y;if(l=l*m+u*x,c=c*m+f*x,h=h*m+g*x,d=d*m+_*x,m===1-o){const E=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=E,c*=E,h*=E,d*=E}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-o*f,t[e+2]=c*g+h*f+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(r/2),u=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ge(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(t=0,e=0,n=0){k.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=i+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ro.copy(this).projectOnVector(t),this.sub(Ro)}reflect(t){return this.sub(Ro.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ro=new k,cc=new js;class Zs{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ar.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ar.copy(n.boundingBox)),ar.applyMatrix4(t.matrixWorld),this.union(ar)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),lr.subVectors(this.max,ms),Ci.subVectors(t.a,ms),Li.subVectors(t.b,ms),Pi.subVectors(t.c,ms),qn.subVectors(Li,Ci),$n.subVectors(Pi,Li),hi.subVectors(Ci,Pi);let e=[0,-qn.z,qn.y,0,-$n.z,$n.y,0,-hi.z,hi.y,qn.z,0,-qn.x,$n.z,0,-$n.x,hi.z,0,-hi.x,-qn.y,qn.x,0,-$n.y,$n.x,0,-hi.y,hi.x,0];return!Co(e,Ci,Li,Pi,lr)||(e=[1,0,0,0,1,0,0,0,1],!Co(e,Ci,Li,Pi,lr))?!1:(cr.crossVectors(qn,$n),e=[cr.x,cr.y,cr.z],Co(e,Ci,Li,Pi,lr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Cn=[new k,new k,new k,new k,new k,new k,new k,new k],hn=new k,ar=new Zs,Ci=new k,Li=new k,Pi=new k,qn=new k,$n=new k,hi=new k,ms=new k,lr=new k,cr=new k,di=new k;function Co(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){di.fromArray(s,r);const o=i.x*Math.abs(di.x)+i.y*Math.abs(di.y)+i.z*Math.abs(di.z),l=t.dot(di),c=e.dot(di),h=n.dot(di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const rp=new Zs,gs=new k,Lo=new k;class _o{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):rp.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);const e=gs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(gs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Lo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(Lo)),this.expandByPoint(gs.copy(t.center).sub(Lo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ln=new k,Po=new k,hr=new k,Yn=new k,Uo=new k,dr=new k,Do=new k;class Ul{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ln.copy(this.origin).addScaledVector(this.direction,e),Ln.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Po.copy(t).add(e).multiplyScalar(.5),hr.copy(e).sub(t).normalize(),Yn.copy(this.origin).sub(Po);const r=t.distanceTo(e)*.5,a=-this.direction.dot(hr),o=Yn.dot(this.direction),l=-Yn.dot(hr),c=Yn.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Po).addScaledVector(hr,u),f}intersectSphere(t,e){Ln.subVectors(t.center,this.origin);const n=Ln.dot(this.direction),i=Ln.dot(Ln)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ln)!==null}intersectTriangle(t,e,n,i,r){Uo.subVectors(e,t),dr.subVectors(n,t),Do.crossVectors(Uo,dr);let a=this.direction.dot(Do),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yn.subVectors(this.origin,t);const l=o*this.direction.dot(dr.crossVectors(Yn,dr));if(l<0)return null;const c=o*this.direction.dot(Uo.cross(Yn));if(c<0||l+c>a)return null;const h=-o*Yn.dot(Do);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xe{constructor(t,e,n,i,r,a,o,l,c,h,d,u,f,g,_,m){xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,d,u,f,g,_,m)}set(t,e,n,i,r,a,o,l,c,h,d,u,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ui.setFromMatrixColumn(t,0).length(),r=1/Ui.setFromMatrixColumn(t,1).length(),a=1/Ui.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u+_*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u-_*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,f=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-_*d}else if(t.order==="XZY"){const u=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(op,t,ap)}lookAt(t,e,n){const i=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),jn.crossVectors(n,Je),jn.lengthSq()===0&&(Math.abs(n.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),jn.crossVectors(n,Je)),jn.normalize(),ur.crossVectors(Je,jn),i[0]=jn.x,i[4]=ur.x,i[8]=Je.x,i[1]=jn.y,i[5]=ur.y,i[9]=Je.y,i[2]=jn.z,i[6]=ur.z,i[10]=Je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],y=n[3],v=n[7],x=n[11],E=n[15],S=i[0],A=i[4],C=i[8],M=i[12],w=i[1],P=i[5],I=i[9],N=i[13],H=i[2],X=i[6],q=i[10],it=i[14],j=i[3],gt=i[7],yt=i[11],Ct=i[15];return r[0]=a*S+o*w+l*H+c*j,r[4]=a*A+o*P+l*X+c*gt,r[8]=a*C+o*I+l*q+c*yt,r[12]=a*M+o*N+l*it+c*Ct,r[1]=h*S+d*w+u*H+f*j,r[5]=h*A+d*P+u*X+f*gt,r[9]=h*C+d*I+u*q+f*yt,r[13]=h*M+d*N+u*it+f*Ct,r[2]=g*S+_*w+m*H+p*j,r[6]=g*A+_*P+m*X+p*gt,r[10]=g*C+_*I+m*q+p*yt,r[14]=g*M+_*N+m*it+p*Ct,r[3]=y*S+v*w+x*H+E*j,r[7]=y*A+v*P+x*X+E*gt,r[11]=y*C+v*I+x*q+E*yt,r[15]=y*M+v*N+x*it+E*Ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*d-i*c*d-r*o*u+n*c*u+i*o*f-n*l*f)+_*(+e*l*f-e*c*u+r*a*u-i*a*f+i*c*h-r*l*h)+m*(+e*c*d-e*o*f-r*a*d+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-e*l*d+e*o*u+i*a*d-n*a*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],y=d*m*c-_*u*c+_*l*f-o*m*f-d*l*p+o*u*p,v=g*u*c-h*m*c-g*l*f+a*m*f+h*l*p-a*u*p,x=h*_*c-g*d*c+g*o*f-a*_*f-h*o*p+a*d*p,E=g*d*l-h*_*l-g*o*u+a*_*u+h*o*m-a*d*m,S=e*y+n*v+i*x+r*E;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/S;return t[0]=y*A,t[1]=(_*u*r-d*m*r-_*i*f+n*m*f+d*i*p-n*u*p)*A,t[2]=(o*m*r-_*l*r+_*i*c-n*m*c-o*i*p+n*l*p)*A,t[3]=(d*l*r-o*u*r-d*i*c+n*u*c+o*i*f-n*l*f)*A,t[4]=v*A,t[5]=(h*m*r-g*u*r+g*i*f-e*m*f-h*i*p+e*u*p)*A,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*p-e*l*p)*A,t[7]=(a*u*r-h*l*r+h*i*c-e*u*c-a*i*f+e*l*f)*A,t[8]=x*A,t[9]=(g*d*r-h*_*r-g*n*f+e*_*f+h*n*p-e*d*p)*A,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*p+e*o*p)*A,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*f-e*o*f)*A,t[12]=E*A,t[13]=(h*_*i-g*d*i+g*n*u-e*_*u-h*n*m+e*d*m)*A,t[14]=(g*o*i-a*_*i-g*n*l+e*_*l+a*n*m-e*o*m)*A,t[15]=(a*d*i-h*o*i+h*n*l-e*d*l-a*n*u+e*o*u)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,_=a*h,m=a*d,p=o*d,y=l*c,v=l*h,x=l*d,E=n.x,S=n.y,A=n.z;return i[0]=(1-(_+p))*E,i[1]=(f+x)*E,i[2]=(g-v)*E,i[3]=0,i[4]=(f-x)*S,i[5]=(1-(u+p))*S,i[6]=(m+y)*S,i[7]=0,i[8]=(g+v)*A,i[9]=(m-y)*A,i[10]=(1-(u+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Ui.set(i[0],i[1],i[2]).length();const a=Ui.set(i[4],i[5],i[6]).length(),o=Ui.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],dn.copy(this);const c=1/r,h=1/a,d=1/o;return dn.elements[0]*=c,dn.elements[1]*=c,dn.elements[2]*=c,dn.elements[4]*=h,dn.elements[5]*=h,dn.elements[6]*=h,dn.elements[8]*=d,dn.elements[9]*=d,dn.elements[10]*=d,e.setFromRotationMatrix(dn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=On){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,g;if(o===On)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===ro)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=On){const l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(a-r),u=(e+t)*c,f=(n+i)*h;let g,_;if(o===On)g=(a+r)*d,_=-2*d;else if(o===ro)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ui=new k,dn=new xe,op=new k(0,0,0),ap=new k(1,1,1),jn=new k,ur=new k,Je=new k,hc=new xe,dc=new js;class vn{constructor(t=0,e=0,n=0,i=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ge(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return hc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return dc.setFromEuler(this),this.setFromQuaternion(dc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class Dl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let lp=0;const uc=new k,Di=new js,Pn=new xe,fr=new k,_s=new k,cp=new k,hp=new js,fc=new k(1,0,0),pc=new k(0,1,0),mc=new k(0,0,1),gc={type:"added"},dp={type:"removed"},Ii={type:"childadded",child:null},Io={type:"childremoved",child:null};class Le extends hs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Le.DEFAULT_UP.clone();const t=new k,e=new vn,n=new js,i=new k(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new xe},normalMatrix:{value:new Zt}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=Le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Di.setFromAxisAngle(t,e),this.quaternion.multiply(Di),this}rotateOnWorldAxis(t,e){return Di.setFromAxisAngle(t,e),this.quaternion.premultiply(Di),this}rotateX(t){return this.rotateOnAxis(fc,t)}rotateY(t){return this.rotateOnAxis(pc,t)}rotateZ(t){return this.rotateOnAxis(mc,t)}translateOnAxis(t,e){return uc.copy(t).applyQuaternion(this.quaternion),this.position.add(uc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fc,t)}translateY(t){return this.translateOnAxis(pc,t)}translateZ(t){return this.translateOnAxis(mc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?fr.copy(t):fr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(_s,fr,this.up):Pn.lookAt(fr,_s,this.up),this.quaternion.setFromRotationMatrix(Pn),i&&(Pn.extractRotation(i.matrixWorld),Di.setFromRotationMatrix(Pn),this.quaternion.premultiply(Di.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gc),Ii.child=t,this.dispatchEvent(Ii),Ii.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(dp),Io.child=t,this.dispatchEvent(Io),Io.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gc),Ii.child=t,this.dispatchEvent(Ii),Ii.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,t,cp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,hp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Le.DEFAULT_UP=new k(0,1,0);Le.DEFAULT_MATRIX_AUTO_UPDATE=!0;Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new k,Un=new k,ko=new k,Dn=new k,ki=new k,Ni=new k,_c=new k,No=new k,Fo=new k,Oo=new k,zo=new ge,Bo=new ge,Ho=new ge;class ln{constructor(t=new k,e=new k,n=new k){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),un.subVectors(t,e),i.cross(un);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){un.subVectors(i,e),Un.subVectors(n,e),ko.subVectors(t,e);const a=un.dot(un),o=un.dot(Un),l=un.dot(ko),c=Un.dot(Un),h=Un.dot(ko),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(a,Dn.y),l.addScaledVector(o,Dn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return zo.setScalar(0),Bo.setScalar(0),Ho.setScalar(0),zo.fromBufferAttribute(t,e),Bo.fromBufferAttribute(t,n),Ho.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(zo,r.x),a.addScaledVector(Bo,r.y),a.addScaledVector(Ho,r.z),a}static isFrontFacing(t,e,n,i){return un.subVectors(n,e),Un.subVectors(t,e),un.cross(Un).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),un.cross(Un).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return ln.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;ki.subVectors(i,n),Ni.subVectors(r,n),No.subVectors(t,n);const l=ki.dot(No),c=Ni.dot(No);if(l<=0&&c<=0)return e.copy(n);Fo.subVectors(t,i);const h=ki.dot(Fo),d=Ni.dot(Fo);if(h>=0&&d<=h)return e.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(ki,a);Oo.subVectors(t,r);const f=ki.dot(Oo),g=Ni.dot(Oo);if(g>=0&&f<=g)return e.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ni,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return _c.subVectors(r,i),o=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(_c,o);const p=1/(m+_+u);return a=_*p,o=u*p,e.copy(n).addScaledVector(ki,a).addScaledVector(Ni,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ad={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},pr={h:0,s:0,l:0};function Go(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Re){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ce.workingColorSpace){if(t=jf(t,1),e=Ge(e,0,1),n=Ge(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Go(a,r,t+1/3),this.g=Go(a,r,t),this.b=Go(a,r,t-1/3)}return ce.toWorkingColorSpace(this,i),this}setStyle(t,e=Re){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Re){const n=ad[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bn(t.r),this.g=Bn(t.g),this.b=Bn(t.b),this}copyLinearToSRGB(t){return this.r=Qi(t.r),this.g=Qi(t.g),this.b=Qi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Re){return ce.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Ge(Fe.r*255,0,255))*65536+Math.round(Ge(Fe.g*255,0,255))*256+Math.round(Ge(Fe.b*255,0,255))}getHexString(t=Re){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.fromWorkingColorSpace(Fe.copy(this),e);const n=Fe.r,i=Fe.g,r=Fe.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Re){ce.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,i=Fe.b;return t!==Re?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Zn),this.setHSL(Zn.h+t,Zn.s+e,Zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zn),t.getHSL(pr);const n=To(Zn.h,pr.h,e),i=To(Zn.s,pr.s,e),r=To(Zn.l,pr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new kt;kt.NAMES=ad;let up=0;class li extends hs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=zn(),this.name="",this.blending=Ki,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Aa,this.blendDst=Ra,this.blendEquation=vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ec,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Aa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ra&&(n.blendDst=this.blendDst),this.blendEquation!==vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ec&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ae extends li{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new k,mr=new wt;class Ve{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=dl,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)mr.fromBufferAttribute(this,e),mr.applyMatrix3(t),this.setXY(e,mr.x,mr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Tn(e,this.array)),e}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Tn(e,this.array)),e}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Tn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Tn(e,this.array)),e}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array),r=me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==dl&&(t.usage=this.usage),t}}class ld extends Ve{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class cd extends Ve{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class he extends Ve{constructor(t,e,n){super(new Float32Array(t),e,n)}}let fp=0;const on=new xe,Vo=new Le,Fi=new k,Qe=new Zs,xs=new Zs,De=new k;class Se extends hs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(sd(t)?cd:ld)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,n){return on.makeTranslation(t,e,n),this.applyMatrix4(on),this}scale(t,e,n){return on.makeScale(t,e,n),this.applyMatrix4(on),this}lookAt(t){return Vo.lookAt(t),Vo.updateMatrix(),this.applyMatrix4(Vo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fi).negate(),this.translate(Fi.x,Fi.y,Fi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new he(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _o);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){const n=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];xs.setFromBufferAttribute(o),this.morphTargetsRelative?(De.addVectors(Qe.min,xs.min),Qe.expandByPoint(De),De.addVectors(Qe.max,xs.max),Qe.expandByPoint(De)):(Qe.expandByPoint(xs.min),Qe.expandByPoint(xs.max))}Qe.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)De.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(De));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)De.fromBufferAttribute(o,c),l&&(Fi.fromBufferAttribute(t,c),De.add(Fi)),i=Math.max(i,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ve(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new k,l[C]=new k;const c=new k,h=new k,d=new k,u=new wt,f=new wt,g=new wt,_=new k,m=new k;function p(C,M,w){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,w),u.fromBufferAttribute(r,C),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,w),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[C].add(_),o[M].add(_),o[w].add(_),l[C].add(m),l[M].add(m),l[w].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let C=0,M=y.length;C<M;++C){const w=y[C],P=w.start,I=w.count;for(let N=P,H=P+I;N<H;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const v=new k,x=new k,E=new k,S=new k;function A(C){E.fromBufferAttribute(i,C),S.copy(E);const M=o[C];v.copy(M),v.sub(E.multiplyScalar(E.dot(M))).normalize(),x.crossVectors(S,M);const P=x.dot(l[C])<0?-1:1;a.setXYZW(C,v.x,v.y,v.z,P)}for(let C=0,M=y.length;C<M;++C){const w=y[C],P=w.start,I=w.count;for(let N=P,H=P+I;N<H;N+=3)A(t.getX(N+0)),A(t.getX(N+1)),A(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ve(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new k,r=new k,a=new k,o=new k,l=new k,c=new k,h=new k,d=new k;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new Ve(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xc=new xe,ui=new Ul,gr=new _o,vc=new k,_r=new k,xr=new k,vr=new k,Wo=new k,br=new k,bc=new k,Mr=new k;class Q extends Le{constructor(t=new Se,e=new Ae){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){br.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Wo.fromBufferAttribute(d,t),a?br.addScaledVector(Wo,h):br.addScaledVector(Wo.sub(e),h))}e.add(br)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(r),ui.copy(t.ray).recast(t.near),!(gr.containsPoint(ui.origin)===!1&&(ui.intersectSphere(gr,vc)===null||ui.origin.distanceToSquared(vc)>(t.far-t.near)**2))&&(xc.copy(r).invert(),ui.copy(t.ray).applyMatrix4(xc),!(n.boundingBox!==null&&ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ui)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,E=v;x<E;x+=3){const S=o.getX(x),A=o.getX(x+1),C=o.getX(x+2);i=wr(this,p,t,n,c,h,d,S,A,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const y=o.getX(m),v=o.getX(m+1),x=o.getX(m+2);i=wr(this,a,t,n,c,h,d,y,v,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,E=v;x<E;x+=3){const S=x,A=x+1,C=x+2;i=wr(this,p,t,n,c,h,d,S,A,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const y=m,v=m+1,x=m+2;i=wr(this,a,t,n,c,h,d,y,v,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function pp(s,t,e,n,i,r,a,o){let l;if(t.side===je?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===ri,o),l===null)return null;Mr.copy(o),Mr.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Mr);return c<e.near||c>e.far?null:{distance:c,point:Mr.clone(),object:s}}function wr(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,_r),s.getVertexPosition(l,xr),s.getVertexPosition(c,vr);const h=pp(s,t,e,n,_r,xr,vr,bc);if(h){const d=new k;ln.getBarycoord(bc,_r,xr,vr,d),i&&(h.uv=ln.getInterpolatedAttribute(i,o,l,c,d,new wt)),r&&(h.uv1=ln.getInterpolatedAttribute(r,o,l,c,d,new wt)),a&&(h.normal=ln.getInterpolatedAttribute(a,o,l,c,d,new k),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new k,materialIndex:0};ln.getNormal(_r,xr,vr,u.normal),h.face=u,h.barycoord=d}return h}class fe extends Se{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(d,2));function g(_,m,p,y,v,x,E,S,A,C,M){const w=x/A,P=E/C,I=x/2,N=E/2,H=S/2,X=A+1,q=C+1;let it=0,j=0;const gt=new k;for(let yt=0;yt<q;yt++){const Ct=yt*P-N;for(let Vt=0;Vt<X;Vt++){const ae=Vt*w-I;gt[_]=ae*y,gt[m]=Ct*v,gt[p]=H,c.push(gt.x,gt.y,gt.z),gt[_]=0,gt[m]=0,gt[p]=S>0?1:-1,h.push(gt.x,gt.y,gt.z),d.push(Vt/A),d.push(1-yt/C),it+=1}}for(let yt=0;yt<C;yt++)for(let Ct=0;Ct<A;Ct++){const Vt=u+Ct+X*yt,ae=u+Ct+X*(yt+1),tt=u+(Ct+1)+X*(yt+1),dt=u+(Ct+1)+X*yt;l.push(Vt,ae,dt),l.push(ae,tt,dt),j+=6}o.addGroup(f,j,M),f+=j,u+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function as(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ye(s){const t={};for(let e=0;e<s.length;e++){const n=as(s[e]);for(const i in n)t[i]=n[i]}return t}function mp(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function hd(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}const gp={clone:as,merge:Ye};var _p=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class oi extends li{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_p,this.fragmentShader=xp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=as(t.uniforms),this.uniformsGroups=mp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class dd extends Le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=On}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Kn=new k,Mc=new wt,wc=new wt;class en extends dd{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ul*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(So*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ul*2*Math.atan(Math.tan(So*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z)}getViewSize(t,e){return this.getViewBounds(t,Mc,wc),e.subVectors(wc,Mc)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(So*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Oi=-90,zi=1;class vp extends Le{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new en(Oi,zi,t,e);i.layers=this.layers,this.add(i);const r=new en(Oi,zi,t,e);r.layers=this.layers,this.add(r);const a=new en(Oi,zi,t,e);a.layers=this.layers,this.add(a);const o=new en(Oi,zi,t,e);o.layers=this.layers,this.add(o);const l=new en(Oi,zi,t,e);l.layers=this.layers,this.add(l);const c=new en(Oi,zi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===On)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ro)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ud extends Xe{constructor(t,e,n,i,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:is,super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class bp extends yi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new ud(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:We}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new fe(5,5,5),r=new oi({name:"CubemapFromEquirect",uniforms:as(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:je,blending:ii});r.uniforms.tEquirect.value=e;const a=new Q(i,r),o=e.minFilter;return e.minFilter===gn&&(e.minFilter=We),new vp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const Xo=new k,Mp=new k,wp=new Zt;class gi{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Xo.subVectors(n,e).cross(Mp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Xo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||wp.getNormalMatrix(t),i=this.coplanarPoint(Xo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fi=new _o,yr=new k;class Il{constructor(t=new gi,e=new gi,n=new gi,i=new gi,r=new gi,a=new gi){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=On){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],y=i[13],v=i[14],x=i[15];if(n[0].setComponents(l-r,u-c,m-f,x-p).normalize(),n[1].setComponents(l+r,u+c,m+f,x+p).normalize(),n[2].setComponents(l+a,u+h,m+g,x+y).normalize(),n[3].setComponents(l-a,u-h,m-g,x-y).normalize(),n[4].setComponents(l-o,u-d,m-_,x-v).normalize(),e===On)n[5].setComponents(l+o,u+d,m+_,x+v).normalize();else if(e===ro)n[5].setComponents(o,d,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(t){return fi.center.set(0,0,0),fi.radius=.7071067811865476,fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(yr.x=i.normal.x>0?t.max.x:t.min.x,yr.y=i.normal.y>0?t.max.y:t.min.y,yr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(yr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function fd(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function yp(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}class It extends Se{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=t/o,u=e/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const y=p*u-a;for(let v=0;v<c;v++){const x=v*d-r;g.push(x,-y,0),_.push(0,0,1),m.push(v/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const v=y+c*p,x=y+c*(p+1),E=y+1+c*(p+1),S=y+1+c*p;f.push(v,x,S),f.push(x,E,S)}this.setIndex(f),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(_,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new It(t.width,t.height,t.widthSegments,t.heightSegments)}}var Sp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tp=`#ifdef USE_ALPHAHASH
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
#endif`,Ep=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ap=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lp=`#ifdef USE_AOMAP
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
#endif`,Pp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Up=`#ifdef USE_BATCHING
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
#endif`,Dp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ip=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Np=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Fp=`#ifdef USE_IRIDESCENCE
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
#endif`,Op=`#ifdef USE_BUMPMAP
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
#endif`,zp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,$p=`#define PI 3.141592653589793
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
} // validated`,Yp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jp=`vec3 transformedNormal = objectNormal;
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
#endif`,Zp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tm="gl_FragColor = linearToOutputTexel( gl_FragColor );",em=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nm=`#ifdef USE_ENVMAP
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
#endif`,im=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,sm=`#ifdef USE_ENVMAP
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
#endif`,rm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,om=`#ifdef USE_ENVMAP
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
#endif`,am=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dm=`#ifdef USE_GRADIENTMAP
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
}`,um=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mm=`uniform bool receiveShadow;
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
#endif`,gm=`#ifdef USE_ENVMAP
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
#endif`,_m=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mm=`PhysicalMaterial material;
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
#endif`,wm=`struct PhysicalMaterial {
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
}`,ym=`
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
#endif`,Sm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Tm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Em=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Am=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Um=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Dm=`#if defined( USE_POINTS_UV )
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
#endif`,Im=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,km=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Om=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zm=`#ifdef USE_MORPHTARGETS
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
#endif`,Bm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qm=`#ifdef USE_NORMALMAP
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
#endif`,$m=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ym=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Km=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Qm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,eg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ng=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ig=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,og=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ag=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,lg=`float getShadowMask() {
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
}`,cg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hg=`#ifdef USE_SKINNING
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
#endif`,dg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ug=`#ifdef USE_SKINNING
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
#endif`,fg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,_g=`#ifdef USE_TRANSMISSION
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
#endif`,xg=`#ifdef USE_TRANSMISSION
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
#endif`,vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sg=`uniform sampler2D t2D;
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
}`,Tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Eg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cg=`#include <common>
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
}`,Lg=`#if DEPTH_PACKING == 3200
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
}`,Pg=`#define DISTANCE
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
}`,Ug=`#define DISTANCE
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
}`,Dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ig=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`uniform float scale;
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
}`,Ng=`uniform vec3 diffuse;
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
}`,Fg=`#include <common>
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
}`,Og=`uniform vec3 diffuse;
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
}`,zg=`#define LAMBERT
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
}`,Bg=`#define LAMBERT
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
}`,Hg=`#define MATCAP
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
}`,Gg=`#define MATCAP
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
}`,Vg=`#define NORMAL
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
}`,Wg=`#define NORMAL
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
}`,Xg=`#define PHONG
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
}`,qg=`#define PHONG
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
}`,$g=`#define STANDARD
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
}`,Yg=`#define STANDARD
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
}`,jg=`#define TOON
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
}`,Zg=`#define TOON
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
}`,Kg=`uniform float size;
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
}`,Jg=`uniform vec3 diffuse;
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
}`,Qg=`#include <common>
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
}`,t0=`uniform vec3 color;
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
}`,e0=`uniform float rotation;
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
}`,n0=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:Sp,alphahash_pars_fragment:Tp,alphamap_fragment:Ep,alphamap_pars_fragment:Ap,alphatest_fragment:Rp,alphatest_pars_fragment:Cp,aomap_fragment:Lp,aomap_pars_fragment:Pp,batching_pars_vertex:Up,batching_vertex:Dp,begin_vertex:Ip,beginnormal_vertex:kp,bsdfs:Np,iridescence_fragment:Fp,bumpmap_pars_fragment:Op,clipping_planes_fragment:zp,clipping_planes_pars_fragment:Bp,clipping_planes_pars_vertex:Hp,clipping_planes_vertex:Gp,color_fragment:Vp,color_pars_fragment:Wp,color_pars_vertex:Xp,color_vertex:qp,common:$p,cube_uv_reflection_fragment:Yp,defaultnormal_vertex:jp,displacementmap_pars_vertex:Zp,displacementmap_vertex:Kp,emissivemap_fragment:Jp,emissivemap_pars_fragment:Qp,colorspace_fragment:tm,colorspace_pars_fragment:em,envmap_fragment:nm,envmap_common_pars_fragment:im,envmap_pars_fragment:sm,envmap_pars_vertex:rm,envmap_physical_pars_fragment:gm,envmap_vertex:om,fog_vertex:am,fog_pars_vertex:lm,fog_fragment:cm,fog_pars_fragment:hm,gradientmap_pars_fragment:dm,lightmap_pars_fragment:um,lights_lambert_fragment:fm,lights_lambert_pars_fragment:pm,lights_pars_begin:mm,lights_toon_fragment:_m,lights_toon_pars_fragment:xm,lights_phong_fragment:vm,lights_phong_pars_fragment:bm,lights_physical_fragment:Mm,lights_physical_pars_fragment:wm,lights_fragment_begin:ym,lights_fragment_maps:Sm,lights_fragment_end:Tm,logdepthbuf_fragment:Em,logdepthbuf_pars_fragment:Am,logdepthbuf_pars_vertex:Rm,logdepthbuf_vertex:Cm,map_fragment:Lm,map_pars_fragment:Pm,map_particle_fragment:Um,map_particle_pars_fragment:Dm,metalnessmap_fragment:Im,metalnessmap_pars_fragment:km,morphinstance_vertex:Nm,morphcolor_vertex:Fm,morphnormal_vertex:Om,morphtarget_pars_vertex:zm,morphtarget_vertex:Bm,normal_fragment_begin:Hm,normal_fragment_maps:Gm,normal_pars_fragment:Vm,normal_pars_vertex:Wm,normal_vertex:Xm,normalmap_pars_fragment:qm,clearcoat_normal_fragment_begin:$m,clearcoat_normal_fragment_maps:Ym,clearcoat_pars_fragment:jm,iridescence_pars_fragment:Zm,opaque_fragment:Km,packing:Jm,premultiplied_alpha_fragment:Qm,project_vertex:tg,dithering_fragment:eg,dithering_pars_fragment:ng,roughnessmap_fragment:ig,roughnessmap_pars_fragment:sg,shadowmap_pars_fragment:rg,shadowmap_pars_vertex:og,shadowmap_vertex:ag,shadowmask_pars_fragment:lg,skinbase_vertex:cg,skinning_pars_vertex:hg,skinning_vertex:dg,skinnormal_vertex:ug,specularmap_fragment:fg,specularmap_pars_fragment:pg,tonemapping_fragment:mg,tonemapping_pars_fragment:gg,transmission_fragment:_g,transmission_pars_fragment:xg,uv_pars_fragment:vg,uv_pars_vertex:bg,uv_vertex:Mg,worldpos_vertex:wg,background_vert:yg,background_frag:Sg,backgroundCube_vert:Tg,backgroundCube_frag:Eg,cube_vert:Ag,cube_frag:Rg,depth_vert:Cg,depth_frag:Lg,distanceRGBA_vert:Pg,distanceRGBA_frag:Ug,equirect_vert:Dg,equirect_frag:Ig,linedashed_vert:kg,linedashed_frag:Ng,meshbasic_vert:Fg,meshbasic_frag:Og,meshlambert_vert:zg,meshlambert_frag:Bg,meshmatcap_vert:Hg,meshmatcap_frag:Gg,meshnormal_vert:Vg,meshnormal_frag:Wg,meshphong_vert:Xg,meshphong_frag:qg,meshphysical_vert:$g,meshphysical_frag:Yg,meshtoon_vert:jg,meshtoon_frag:Zg,points_vert:Kg,points_frag:Jg,shadow_vert:Qg,shadow_frag:t0,sprite_vert:e0,sprite_frag:n0},bt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Sn={basic:{uniforms:Ye([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Ye([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new kt(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Ye([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Ye([bt.common,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.roughnessmap,bt.metalnessmap,bt.fog,bt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Ye([bt.common,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.gradientmap,bt.fog,bt.lights,{emissive:{value:new kt(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Ye([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Ye([bt.points,bt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Ye([bt.common,bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Ye([bt.common,bt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Ye([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Ye([bt.sprite,bt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:Ye([bt.common,bt.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:Ye([bt.lights,bt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};Sn.physical={uniforms:Ye([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const Sr={r:0,b:0,g:0},pi=new vn,i0=new xe;function s0(s,t,e,n,i,r,a){const o=new kt(0);let l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1;const x=g(y);x===null?p(o,l):x&&x.isColor&&(p(x,1),v=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,v){const x=g(v);x&&(x.isCubeTexture||x.mapping===mo)?(h===void 0&&(h=new Q(new fe(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:as(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),pi.copy(v.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(i0.makeRotationFromEuler(pi)),h.material.toneMapped=ce.getTransfer(x.colorSpace)!==pe,(d!==x||u!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Q(new It(2,2),new oi({name:"BackgroundMaterial",uniforms:as(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=ce.getTransfer(x.colorSpace)!==pe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,v){y.getRGB(Sr,hd(s)),n.buffers.color.setClear(Sr.r,Sr.g,Sr.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){o.set(y),l=v,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(o,l)},render:_,addToRenderList:m}}function r0(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,a=!1;function o(w,P,I,N,H){let X=!1;const q=d(N,I,P);r!==q&&(r=q,c(r.object)),X=f(w,N,I,H),X&&g(w,N,I,H),H!==null&&t.update(H,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,x(w,P,I,N),H!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return s.createVertexArray()}function c(w){return s.bindVertexArray(w)}function h(w){return s.deleteVertexArray(w)}function d(w,P,I){const N=I.wireframe===!0;let H=n[w.id];H===void 0&&(H={},n[w.id]=H);let X=H[P.id];X===void 0&&(X={},H[P.id]=X);let q=X[N];return q===void 0&&(q=u(l()),X[N]=q),q}function u(w){const P=[],I=[],N=[];for(let H=0;H<e;H++)P[H]=0,I[H]=0,N[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:I,attributeDivisors:N,object:w,attributes:{},index:null}}function f(w,P,I,N){const H=r.attributes,X=P.attributes;let q=0;const it=I.getAttributes();for(const j in it)if(it[j].location>=0){const yt=H[j];let Ct=X[j];if(Ct===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(Ct=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(Ct=w.instanceColor)),yt===void 0||yt.attribute!==Ct||Ct&&yt.data!==Ct.data)return!0;q++}return r.attributesNum!==q||r.index!==N}function g(w,P,I,N){const H={},X=P.attributes;let q=0;const it=I.getAttributes();for(const j in it)if(it[j].location>=0){let yt=X[j];yt===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(yt=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(yt=w.instanceColor));const Ct={};Ct.attribute=yt,yt&&yt.data&&(Ct.data=yt.data),H[j]=Ct,q++}r.attributes=H,r.attributesNum=q,r.index=N}function _(){const w=r.newAttributes;for(let P=0,I=w.length;P<I;P++)w[P]=0}function m(w){p(w,0)}function p(w,P){const I=r.newAttributes,N=r.enabledAttributes,H=r.attributeDivisors;I[w]=1,N[w]===0&&(s.enableVertexAttribArray(w),N[w]=1),H[w]!==P&&(s.vertexAttribDivisor(w,P),H[w]=P)}function y(){const w=r.newAttributes,P=r.enabledAttributes;for(let I=0,N=P.length;I<N;I++)P[I]!==w[I]&&(s.disableVertexAttribArray(I),P[I]=0)}function v(w,P,I,N,H,X,q){q===!0?s.vertexAttribIPointer(w,P,I,H,X):s.vertexAttribPointer(w,P,I,N,H,X)}function x(w,P,I,N){_();const H=N.attributes,X=I.getAttributes(),q=P.defaultAttributeValues;for(const it in X){const j=X[it];if(j.location>=0){let gt=H[it];if(gt===void 0&&(it==="instanceMatrix"&&w.instanceMatrix&&(gt=w.instanceMatrix),it==="instanceColor"&&w.instanceColor&&(gt=w.instanceColor)),gt!==void 0){const yt=gt.normalized,Ct=gt.itemSize,Vt=t.get(gt);if(Vt===void 0)continue;const ae=Vt.buffer,tt=Vt.type,dt=Vt.bytesPerElement,Rt=tt===s.INT||tt===s.UNSIGNED_INT||gt.gpuType===Tl;if(gt.isInterleavedBufferAttribute){const _t=gt.data,Nt=_t.stride,Gt=gt.offset;if(_t.isInstancedInterleavedBuffer){for(let Bt=0;Bt<j.locationSize;Bt++)p(j.location+Bt,_t.meshPerAttribute);w.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let Bt=0;Bt<j.locationSize;Bt++)m(j.location+Bt);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let Bt=0;Bt<j.locationSize;Bt++)v(j.location+Bt,Ct/j.locationSize,tt,yt,Nt*dt,(Gt+Ct/j.locationSize*Bt)*dt,Rt)}else{if(gt.isInstancedBufferAttribute){for(let _t=0;_t<j.locationSize;_t++)p(j.location+_t,gt.meshPerAttribute);w.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let _t=0;_t<j.locationSize;_t++)m(j.location+_t);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let _t=0;_t<j.locationSize;_t++)v(j.location+_t,Ct/j.locationSize,tt,yt,Ct*dt,Ct/j.locationSize*_t*dt,Rt)}}else if(q!==void 0){const yt=q[it];if(yt!==void 0)switch(yt.length){case 2:s.vertexAttrib2fv(j.location,yt);break;case 3:s.vertexAttrib3fv(j.location,yt);break;case 4:s.vertexAttrib4fv(j.location,yt);break;default:s.vertexAttrib1fv(j.location,yt)}}}}y()}function E(){C();for(const w in n){const P=n[w];for(const I in P){const N=P[I];for(const H in N)h(N[H].object),delete N[H];delete P[I]}delete n[w]}}function S(w){if(n[w.id]===void 0)return;const P=n[w.id];for(const I in P){const N=P[I];for(const H in N)h(N[H].object),delete N[H];delete P[I]}delete n[w.id]}function A(w){for(const P in n){const I=n[P];if(I[w.id]===void 0)continue;const N=I[w.id];for(const H in N)h(N[H].object),delete N[H];delete I[w.id]}}function C(){M(),a=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:C,resetDefaultState:M,dispose:E,releaseStatesOfGeometry:S,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function o0(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function a0(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==_n&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const C=A===Ys&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Hn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Fn&&!C)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,S=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:E,maxSamples:S}}function l0(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new gi,o=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const y=r?0:n,v=y*4;let x=p.clippingState||null;l.value=x,x=h(g,u,v,f);for(let E=0;E!==v;++E)x[E]=e[E];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,x=f;v!==_;++v,x+=4)a.copy(d[v]).applyMatrix4(y,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function c0(s){let t=new WeakMap;function e(a,o){return o===Na?a.mapping=is:o===Fa&&(a.mapping=ss),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Na||o===Fa)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new bp(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class pd extends dd{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Yi=4,yc=[.125,.215,.35,.446,.526,.582],bi=20,qo=new pd,Sc=new kt;let $o=null,Yo=0,jo=0,Zo=!1;const _i=(1+Math.sqrt(5))/2,Bi=1/_i,Tc=[new k(-_i,Bi,0),new k(_i,Bi,0),new k(-Bi,0,_i),new k(Bi,0,_i),new k(0,_i,-Bi),new k(0,_i,Bi),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)];class Ec{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){$o=this._renderer.getRenderTarget(),Yo=this._renderer.getActiveCubeFace(),jo=this._renderer.getActiveMipmapLevel(),Zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($o,Yo,jo),this._renderer.xr.enabled=Zo,t.scissorTest=!1,Tr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===is||t.mapping===ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$o=this._renderer.getRenderTarget(),Yo=this._renderer.getActiveCubeFace(),jo=this._renderer.getActiveMipmapLevel(),Zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:We,minFilter:We,generateMipmaps:!1,type:Ys,format:_n,colorSpace:cs,depthBuffer:!1},i=Ac(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ac(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=h0(r)),this._blurMaterial=d0(r,t,e)}return i}_compileMaterial(t){const e=new Q(this._lodPlanes[0],t);this._renderer.compile(e,qo)}_sceneToCubeUV(t,e,n,i){const o=new en(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Sc),h.toneMapping=si,h.autoClear=!1;const f=new Ae({name:"PMREM.Background",side:je,depthWrite:!1,depthTest:!1}),g=new Q(new fe,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(Sc),_=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):y===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const v=this._cubeSize;Tr(i,y*v,p>2?v:0,v,v),h.setRenderTarget(i),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===is||t.mapping===ss;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Q(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Tr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,qo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Tc[(i-r-1)%Tc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Q(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*bi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):bi;m>bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bi}`);const p=[];let y=0;for(let A=0;A<bi;++A){const C=A/_,M=Math.exp(-C*C/2);p.push(M),A===0?y+=M:A<m&&(y+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/y;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-n;const x=this._sizeLods[i],E=3*x*(i>v-Yi?i-v+Yi:0),S=4*(this._cubeSize-x);Tr(e,E,S,3*x,2*x),l.setRenderTarget(e),l.render(d,qo)}}function h0(s){const t=[],e=[],n=[];let i=s;const r=s-Yi+1+yc.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Yi?l=yc[a-s+Yi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,m=2,p=1,y=new Float32Array(_*g*f),v=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let S=0;S<f;S++){const A=S%3*2/3-1,C=S>2?0:-1,M=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];y.set(M,_*g*S),v.set(u,m*g*S);const w=[S,S,S,S,S,S];x.set(w,p*g*S)}const E=new Se;E.setAttribute("position",new Ve(y,_)),E.setAttribute("uv",new Ve(v,m)),E.setAttribute("faceIndex",new Ve(x,p)),t.push(E),i>Yi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ac(s,t,e){const n=new yi(s,t,e);return n.texture.mapping=mo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Tr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function d0(s,t,e){const n=new Float32Array(bi),i=new k(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:kl(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Rc(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kl(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Cc(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function kl(){return`

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
	`}function u0(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Na||l===Fa,h=l===is||l===ss;if(c||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new Ec(s)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Ec(s)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function f0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Ls("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function p0(s,t,e,n){const i={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}u.removeEventListener("dispose",a),delete i[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],s.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let v=0,x=y.length;v<x;v+=3){const E=y[v+0],S=y[v+1],A=y[v+2];u.push(E,S,S,A,A,E)}}else if(g!==void 0){const y=g.array;_=g.version;for(let v=0,x=y.length/3-1;v<x;v+=3){const E=v+0,S=v+1,A=v+2;u.push(E,S,S,A,A,E)}}else return;const m=new(sd(u)?cd:ld)(u,1);m.version=_;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function m0(s,t,e){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){s.drawElements(n,f,r,u*a),e.update(f,n,1)}function c(u,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,u*a,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*_[y];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function g0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function _0(s,t,e){const n=new WeakMap,i=new ge;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let M=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let v=0;f===!0&&(v=1),g===!0&&(v=2),_===!0&&(v=3);let x=o.attributes.position.count*v,E=1;x>t.maxTextureSize&&(E=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const S=new Float32Array(x*E*4*d),A=new od(S,x,E,d);A.type=Fn,A.needsUpdate=!0;const C=v*4;for(let w=0;w<d;w++){const P=m[w],I=p[w],N=y[w],H=x*E*4*w;for(let X=0;X<P.count;X++){const q=X*C;f===!0&&(i.fromBufferAttribute(P,X),S[H+q+0]=i.x,S[H+q+1]=i.y,S[H+q+2]=i.z,S[H+q+3]=0),g===!0&&(i.fromBufferAttribute(I,X),S[H+q+4]=i.x,S[H+q+5]=i.y,S[H+q+6]=i.z,S[H+q+7]=0),_===!0&&(i.fromBufferAttribute(N,X),S[H+q+8]=i.x,S[H+q+9]=i.y,S[H+q+10]=i.z,S[H+q+11]=N.itemSize===4?i.w:1)}}u={count:d,texture:A,size:new wt(x,E)},n.set(o,u),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function x0(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class md extends Xe{constructor(t,e,n,i,r,a,o,l,c,h=Ji){if(h!==Ji&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ji&&(n=wi),n===void 0&&h===os&&(n=rs),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:xn,this.minFilter=l!==void 0?l:xn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const gd=new Xe,Lc=new md(1,1),_d=new od,xd=new sp,vd=new ud,Pc=[],Uc=[],Dc=new Float32Array(16),Ic=new Float32Array(9),kc=new Float32Array(4);function ds(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Pc[i];if(r===void 0&&(r=new Float32Array(i),Pc[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Pe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ue(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function xo(s,t){let e=Uc[t];e===void 0&&(e=new Int32Array(t),Uc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function v0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function b0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2fv(this.addr,t),Ue(e,t)}}function M0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;s.uniform3fv(this.addr,t),Ue(e,t)}}function w0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4fv(this.addr,t),Ue(e,t)}}function y0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(Pe(e,n))return;kc.set(n),s.uniformMatrix2fv(this.addr,!1,kc),Ue(e,n)}}function S0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(Pe(e,n))return;Ic.set(n),s.uniformMatrix3fv(this.addr,!1,Ic),Ue(e,n)}}function T0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(Pe(e,n))return;Dc.set(n),s.uniformMatrix4fv(this.addr,!1,Dc),Ue(e,n)}}function E0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function A0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2iv(this.addr,t),Ue(e,t)}}function R0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;s.uniform3iv(this.addr,t),Ue(e,t)}}function C0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4iv(this.addr,t),Ue(e,t)}}function L0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function P0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2uiv(this.addr,t),Ue(e,t)}}function U0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;s.uniform3uiv(this.addr,t),Ue(e,t)}}function D0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4uiv(this.addr,t),Ue(e,t)}}function I0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Lc.compareFunction=id,r=Lc):r=gd,e.setTexture2D(t||r,i)}function k0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||xd,i)}function N0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||vd,i)}function F0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||_d,i)}function O0(s){switch(s){case 5126:return v0;case 35664:return b0;case 35665:return M0;case 35666:return w0;case 35674:return y0;case 35675:return S0;case 35676:return T0;case 5124:case 35670:return E0;case 35667:case 35671:return A0;case 35668:case 35672:return R0;case 35669:case 35673:return C0;case 5125:return L0;case 36294:return P0;case 36295:return U0;case 36296:return D0;case 35678:case 36198:case 36298:case 36306:case 35682:return I0;case 35679:case 36299:case 36307:return k0;case 35680:case 36300:case 36308:case 36293:return N0;case 36289:case 36303:case 36311:case 36292:return F0}}function z0(s,t){s.uniform1fv(this.addr,t)}function B0(s,t){const e=ds(t,this.size,2);s.uniform2fv(this.addr,e)}function H0(s,t){const e=ds(t,this.size,3);s.uniform3fv(this.addr,e)}function G0(s,t){const e=ds(t,this.size,4);s.uniform4fv(this.addr,e)}function V0(s,t){const e=ds(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function W0(s,t){const e=ds(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function X0(s,t){const e=ds(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function q0(s,t){s.uniform1iv(this.addr,t)}function $0(s,t){s.uniform2iv(this.addr,t)}function Y0(s,t){s.uniform3iv(this.addr,t)}function j0(s,t){s.uniform4iv(this.addr,t)}function Z0(s,t){s.uniform1uiv(this.addr,t)}function K0(s,t){s.uniform2uiv(this.addr,t)}function J0(s,t){s.uniform3uiv(this.addr,t)}function Q0(s,t){s.uniform4uiv(this.addr,t)}function t_(s,t,e){const n=this.cache,i=t.length,r=xo(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||gd,r[a])}function e_(s,t,e){const n=this.cache,i=t.length,r=xo(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||xd,r[a])}function n_(s,t,e){const n=this.cache,i=t.length,r=xo(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||vd,r[a])}function i_(s,t,e){const n=this.cache,i=t.length,r=xo(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||_d,r[a])}function s_(s){switch(s){case 5126:return z0;case 35664:return B0;case 35665:return H0;case 35666:return G0;case 35674:return V0;case 35675:return W0;case 35676:return X0;case 5124:case 35670:return q0;case 35667:case 35671:return $0;case 35668:case 35672:return Y0;case 35669:case 35673:return j0;case 5125:return Z0;case 36294:return K0;case 36295:return J0;case 36296:return Q0;case 35678:case 36198:case 36298:case 36306:case 35682:return t_;case 35679:case 36299:case 36307:return e_;case 35680:case 36300:case 36308:case 36293:return n_;case 36289:case 36303:case 36311:case 36292:return i_}}class r_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=O0(e.type)}}class o_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=s_(e.type)}}class a_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Ko=/(\w+)(\])?(\[|\.)?/g;function Nc(s,t){s.seq.push(t),s.map[t.id]=t}function l_(s,t,e){const n=s.name,i=n.length;for(Ko.lastIndex=0;;){const r=Ko.exec(n),a=Ko.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Nc(e,c===void 0?new r_(o,s,t):new o_(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new a_(o),Nc(e,d)),e=d}}}class Qr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);l_(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Fc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const c_=37297;let h_=0;function d_(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Oc=new Zt;function u_(s){ce._getMatrix(Oc,ce.workingColorSpace,s);const t=`mat3( ${Oc.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(s)){case go:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function zc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+d_(s.getShaderSource(t),a)}else return i}function f_(s,t){const e=u_(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function p_(s,t){let e;switch(t){case Pf:e="Linear";break;case Uf:e="Reinhard";break;case Df:e="Cineon";break;case If:e="ACESFilmic";break;case Nf:e="AgX";break;case Ff:e="Neutral";break;case kf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Er=new k;function m_(){ce.getLuminanceCoefficients(Er);const s=Er.x.toFixed(4),t=Er.y.toFixed(4),e=Er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function g_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ps).join(`
`)}function __(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function x_(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Ps(s){return s!==""}function Bc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const v_=/^[ \t]*#include +<([\w\d./]+)>/gm;function fl(s){return s.replace(v_,M_)}const b_=new Map;function M_(s,t){let e=ee[t];if(e===void 0){const n=b_.get(t);if(n!==void 0)e=ee[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return fl(e)}const w_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gc(s){return s.replace(w_,y_)}function y_(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Vc(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function S_(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Xh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===hf?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===kn&&(t="SHADOWMAP_TYPE_VSM"),t}function T_(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case is:case ss:t="ENVMAP_TYPE_CUBE";break;case mo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function E_(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ss:t="ENVMAP_MODE_REFRACTION";break}return t}function A_(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case po:t="ENVMAP_BLENDING_MULTIPLY";break;case Cf:t="ENVMAP_BLENDING_MIX";break;case Lf:t="ENVMAP_BLENDING_ADD";break}return t}function R_(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function C_(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=S_(e),c=T_(e),h=E_(e),d=A_(e),u=R_(e),f=g_(e),g=__(r),_=i.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ps).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ps).join(`
`),p.length>0&&(p+=`
`)):(m=[Vc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ps).join(`
`),p=[Vc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==si?"#define TONE_MAPPING":"",e.toneMapping!==si?ee.tonemapping_pars_fragment:"",e.toneMapping!==si?p_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,f_("linearToOutputTexel",e.outputColorSpace),m_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ps).join(`
`)),a=fl(a),a=Bc(a,e),a=Hc(a,e),o=fl(o),o=Bc(o,e),o=Hc(o,e),a=Gc(a),o=Gc(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===nc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===nc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=y+m+a,x=y+p+o,E=Fc(i,i.VERTEX_SHADER,v),S=Fc(i,i.FRAGMENT_SHADER,x);i.attachShader(_,E),i.attachShader(_,S),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(P){if(s.debug.checkShaderErrors){const I=i.getProgramInfoLog(_).trim(),N=i.getShaderInfoLog(E).trim(),H=i.getShaderInfoLog(S).trim();let X=!0,q=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,E,S);else{const it=zc(i,E,"vertex"),j=zc(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+I+`
`+it+`
`+j)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(N===""||H==="")&&(q=!1);q&&(P.diagnostics={runnable:X,programLog:I,vertexShader:{log:N,prefix:m},fragmentShader:{log:H,prefix:p}})}i.deleteShader(E),i.deleteShader(S),C=new Qr(i,_),M=x_(i,_)}let C;this.getUniforms=function(){return C===void 0&&A(this),C};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=i.getProgramParameter(_,c_)),w},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=h_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=S,this}let L_=0;class P_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new U_(t),e.set(t,n)),n}}class U_{constructor(t){this.id=L_++,this.code=t,this.usedTimes=0}}function D_(s,t,e,n,i,r,a){const o=new Dl,l=new P_,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,w,P,I,N){const H=I.fog,X=N.geometry,q=M.isMeshStandardMaterial?I.environment:null,it=(M.isMeshStandardMaterial?e:t).get(M.envMap||q),j=it&&it.mapping===mo?it.image.height:null,gt=g[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const yt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Ct=yt!==void 0?yt.length:0;let Vt=0;X.morphAttributes.position!==void 0&&(Vt=1),X.morphAttributes.normal!==void 0&&(Vt=2),X.morphAttributes.color!==void 0&&(Vt=3);let ae,tt,dt,Rt;if(gt){const jt=Sn[gt];ae=jt.vertexShader,tt=jt.fragmentShader}else ae=M.vertexShader,tt=M.fragmentShader,l.update(M),dt=l.getVertexShaderID(M),Rt=l.getFragmentShaderID(M);const _t=s.getRenderTarget(),Nt=s.state.buffers.depth.getReversed(),Gt=N.isInstancedMesh===!0,Bt=N.isBatchedMesh===!0,re=!!M.map,Wt=!!M.matcap,oe=!!it,z=!!M.aoMap,Ce=!!M.lightMap,Kt=!!M.bumpMap,Jt=!!M.normalMap,Mt=!!M.displacementMap,Qt=!!M.emissiveMap,Pt=!!M.metalnessMap,U=!!M.roughnessMap,T=M.anisotropy>0,W=M.clearcoat>0,st=M.dispersion>0,at=M.iridescence>0,et=M.sheen>0,Tt=M.transmission>0,vt=T&&!!M.anisotropyMap,St=W&&!!M.clearcoatMap,$t=W&&!!M.clearcoatNormalMap,ct=W&&!!M.clearcoatRoughnessMap,Et=at&&!!M.iridescenceMap,Dt=at&&!!M.iridescenceThicknessMap,Ut=et&&!!M.sheenColorMap,At=et&&!!M.sheenRoughnessMap,Yt=!!M.specularMap,Xt=!!M.specularColorMap,le=!!M.specularIntensityMap,F=Tt&&!!M.transmissionMap,pt=Tt&&!!M.thicknessMap,J=!!M.gradientMap,V=!!M.alphaMap,rt=M.alphaTest>0,lt=!!M.alphaHash,mt=!!M.extensions;let Ht=si;M.toneMapped&&(_t===null||_t.isXRRenderTarget===!0)&&(Ht=s.toneMapping);const ie={shaderID:gt,shaderType:M.type,shaderName:M.name,vertexShader:ae,fragmentShader:tt,defines:M.defines,customVertexShaderID:dt,customFragmentShaderID:Rt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Bt,batchingColor:Bt&&N._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&N.instanceColor!==null,instancingMorph:Gt&&N.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:_t===null?s.outputColorSpace:_t.isXRRenderTarget===!0?_t.texture.colorSpace:cs,alphaToCoverage:!!M.alphaToCoverage,map:re,matcap:Wt,envMap:oe,envMapMode:oe&&it.mapping,envMapCubeUVHeight:j,aoMap:z,lightMap:Ce,bumpMap:Kt,normalMap:Jt,displacementMap:u&&Mt,emissiveMap:Qt,normalMapObjectSpace:Jt&&M.normalMapType===Hf,normalMapTangentSpace:Jt&&M.normalMapType===Pl,metalnessMap:Pt,roughnessMap:U,anisotropy:T,anisotropyMap:vt,clearcoat:W,clearcoatMap:St,clearcoatNormalMap:$t,clearcoatRoughnessMap:ct,dispersion:st,iridescence:at,iridescenceMap:Et,iridescenceThicknessMap:Dt,sheen:et,sheenColorMap:Ut,sheenRoughnessMap:At,specularMap:Yt,specularColorMap:Xt,specularIntensityMap:le,transmission:Tt,transmissionMap:F,thicknessMap:pt,gradientMap:J,opaque:M.transparent===!1&&M.blending===Ki&&M.alphaToCoverage===!1,alphaMap:V,alphaTest:rt,alphaHash:lt,combine:M.combine,mapUv:re&&_(M.map.channel),aoMapUv:z&&_(M.aoMap.channel),lightMapUv:Ce&&_(M.lightMap.channel),bumpMapUv:Kt&&_(M.bumpMap.channel),normalMapUv:Jt&&_(M.normalMap.channel),displacementMapUv:Mt&&_(M.displacementMap.channel),emissiveMapUv:Qt&&_(M.emissiveMap.channel),metalnessMapUv:Pt&&_(M.metalnessMap.channel),roughnessMapUv:U&&_(M.roughnessMap.channel),anisotropyMapUv:vt&&_(M.anisotropyMap.channel),clearcoatMapUv:St&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:$t&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ut&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:At&&_(M.sheenRoughnessMap.channel),specularMapUv:Yt&&_(M.specularMap.channel),specularColorMapUv:Xt&&_(M.specularColorMap.channel),specularIntensityMapUv:le&&_(M.specularIntensityMap.channel),transmissionMapUv:F&&_(M.transmissionMap.channel),thicknessMapUv:pt&&_(M.thicknessMap.channel),alphaMapUv:V&&_(M.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Jt||T),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!X.attributes.uv&&(re||V),fog:!!H,useFog:M.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Nt,skinning:N.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Vt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ht,decodeVideoTexture:re&&M.map.isVideoTexture===!0&&ce.getTransfer(M.map.colorSpace)===pe,decodeVideoTextureEmissive:Qt&&M.emissiveMap.isVideoTexture===!0&&ce.getTransfer(M.emissiveMap.colorSpace)===pe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===qt,flipSided:M.side===je,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:mt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(mt&&M.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ie.vertexUv1s=c.has(1),ie.vertexUv2s=c.has(2),ie.vertexUv3s=c.has(3),c.clear(),ie}function p(M){const w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)w.push(P),w.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(y(w,M),v(w,M),w.push(s.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function y(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function v(M,w){o.disableAll(),w.supportsVertexTextures&&o.enable(0),w.instancing&&o.enable(1),w.instancingColor&&o.enable(2),w.instancingMorph&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),w.dispersion&&o.enable(20),w.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reverseDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),M.push(o.mask)}function x(M){const w=g[M.type];let P;if(w){const I=Sn[w];P=gp.clone(I.uniforms)}else P=M.uniforms;return P}function E(M,w){let P;for(let I=0,N=h.length;I<N;I++){const H=h[I];if(H.cacheKey===w){P=H,++P.usedTimes;break}}return P===void 0&&(P=new C_(s,w,M,r),h.push(P)),P}function S(M){if(--M.usedTimes===0){const w=h.indexOf(M);h[w]=h[h.length-1],h.pop(),M.destroy()}}function A(M){l.remove(M)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:E,releaseProgram:S,releaseShaderCache:A,programs:h,dispose:C}}function I_(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function k_(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Wc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Xc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(d,u,f,g,_,m){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},s[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),t++,p}function o(d,u,f,g,_,m){const p=a(d,u,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(d,u,f,g,_,m){const p=a(d,u,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||k_),n.length>1&&n.sort(u||Wc),i.length>1&&i.sort(u||Wc)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function N_(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Xc,s.set(n,[a])):i>=r.length?(a=new Xc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function F_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new kt};break;case"SpotLight":e={position:new k,direction:new k,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new k,halfWidth:new k,halfHeight:new k};break}return s[t.id]=e,e}}}function O_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let z_=0;function B_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function H_(s){const t=new F_,e=O_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new k);const i=new k,r=new xe,a=new xe;function o(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,y=0,v=0,x=0,E=0,S=0,A=0;c.sort(B_);for(let M=0,w=c.length;M<w;M++){const P=c[M],I=P.color,N=P.intensity,H=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=I.r*N,d+=I.g*N,u+=I.b*N;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],N);A++}else if(P.isDirectionalLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const it=P.shadow,j=e.get(P);j.shadowIntensity=it.intensity,j.shadowBias=it.bias,j.shadowNormalBias=it.normalBias,j.shadowRadius=it.radius,j.shadowMapSize=it.mapSize,n.directionalShadow[f]=j,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=P.shadow.matrix,y++}n.directional[f]=q,f++}else if(P.isSpotLight){const q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(I).multiplyScalar(N),q.distance=H,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[_]=q;const it=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,it.updateMatrices(P),P.castShadow&&S++),n.spotLightMatrix[_]=it.matrix,P.castShadow){const j=e.get(P);j.shadowIntensity=it.intensity,j.shadowBias=it.bias,j.shadowNormalBias=it.normalBias,j.shadowRadius=it.radius,j.shadowMapSize=it.mapSize,n.spotShadow[_]=j,n.spotShadowMap[_]=X,x++}_++}else if(P.isRectAreaLight){const q=t.get(P);q.color.copy(I).multiplyScalar(N),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=q,m++}else if(P.isPointLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){const it=P.shadow,j=e.get(P);j.shadowIntensity=it.intensity,j.shadowBias=it.bias,j.shadowNormalBias=it.normalBias,j.shadowRadius=it.radius,j.shadowMapSize=it.mapSize,j.shadowCameraNear=it.camera.near,j.shadowCameraFar=it.camera.far,n.pointShadow[g]=j,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=P.shadow.matrix,v++}n.point[g]=q,g++}else if(P.isHemisphereLight){const q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(N),q.groundColor.copy(P.groundColor).multiplyScalar(N),n.hemi[p]=q,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=bt.LTC_FLOAT_1,n.rectAreaLTC2=bt.LTC_FLOAT_2):(n.rectAreaLTC1=bt.LTC_HALF_1,n.rectAreaLTC2=bt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const C=n.hash;(C.directionalLength!==f||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==y||C.numPointShadows!==v||C.numSpotShadows!==x||C.numSpotMaps!==E||C.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+E-S,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=A,C.directionalLength=f,C.pointLength=g,C.spotLength=_,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=y,C.numPointShadows=v,C.numSpotShadows=x,C.numSpotMaps=E,C.numLightProbes=A,n.version=z_++)}function l(c,h){let d=0,u=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const v=c[p];if(v.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(v.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),f++}else if(v.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(v.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),u++}else if(v.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function qc(s){const t=new H_(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function G_(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new qc(s),t.set(i,[o])):r>=a.length?(o=new qc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class V_ extends li{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=zf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class W_ extends li{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const X_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,q_=`uniform sampler2D shadow_pass;
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
}`;function $_(s,t,e){let n=new Il;const i=new wt,r=new wt,a=new ge,o=new V_({depthPacking:Bf}),l=new W_,c={},h=e.maxTextureSize,d={[ri]:je,[je]:ri,[qt]:qt},u=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:X_,fragmentShader:q_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Se;g.setAttribute("position",new Ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Q(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xh;let p=this.type;this.render=function(S,A,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const M=s.getRenderTarget(),w=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),I=s.state;I.setBlending(ii),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const N=p!==kn&&this.type===kn,H=p===kn&&this.type!==kn;for(let X=0,q=S.length;X<q;X++){const it=S[X],j=it.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;i.copy(j.mapSize);const gt=j.getFrameExtents();if(i.multiply(gt),r.copy(j.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/gt.x),i.x=r.x*gt.x,j.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/gt.y),i.y=r.y*gt.y,j.mapSize.y=r.y)),j.map===null||N===!0||H===!0){const Ct=this.type!==kn?{minFilter:xn,magFilter:xn}:{};j.map!==null&&j.map.dispose(),j.map=new yi(i.x,i.y,Ct),j.map.texture.name=it.name+".shadowMap",j.camera.updateProjectionMatrix()}s.setRenderTarget(j.map),s.clear();const yt=j.getViewportCount();for(let Ct=0;Ct<yt;Ct++){const Vt=j.getViewport(Ct);a.set(r.x*Vt.x,r.y*Vt.y,r.x*Vt.z,r.y*Vt.w),I.viewport(a),j.updateMatrices(it,Ct),n=j.getFrustum(),x(A,C,j.camera,it,this.type)}j.isPointLightShadow!==!0&&this.type===kn&&y(j,C),j.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(M,w,P)};function y(S,A){const C=t.update(_);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new yi(i.x,i.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(A,null,C,u,_,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(A,null,C,f,_,null)}function v(S,A,C,M){let w=null;const P=C.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)w=P;else if(w=C.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const I=w.uuid,N=A.uuid;let H=c[I];H===void 0&&(H={},c[I]=H);let X=H[N];X===void 0&&(X=w.clone(),H[N]=X,A.addEventListener("dispose",E)),w=X}if(w.visible=A.visible,w.wireframe=A.wireframe,M===kn?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:d[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,C.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const I=s.properties.get(w);I.light=C}return w}function x(S,A,C,M,w){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&w===kn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,S.matrixWorld);const N=t.update(S),H=S.material;if(Array.isArray(H)){const X=N.groups;for(let q=0,it=X.length;q<it;q++){const j=X[q],gt=H[j.materialIndex];if(gt&&gt.visible){const yt=v(S,gt,M,w);S.onBeforeShadow(s,S,A,C,N,yt,j),s.renderBufferDirect(C,null,N,yt,S,j),S.onAfterShadow(s,S,A,C,N,yt,j)}}}else if(H.visible){const X=v(S,H,M,w);S.onBeforeShadow(s,S,A,C,N,X,null),s.renderBufferDirect(C,null,N,X,S,null),S.onAfterShadow(s,S,A,C,N,X,null)}}const I=S.children;for(let N=0,H=I.length;N<H;N++)x(I[N],A,C,M,w)}function E(S){S.target.removeEventListener("dispose",E);for(const C in c){const M=c[C],w=S.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}const Y_={[Ca]:La,[Pa]:Ia,[Ua]:ka,[ns]:Da,[La]:Ca,[Ia]:Pa,[ka]:Ua,[Da]:ns};function j_(s,t){function e(){let F=!1;const pt=new ge;let J=null;const V=new ge(0,0,0,0);return{setMask:function(rt){J!==rt&&!F&&(s.colorMask(rt,rt,rt,rt),J=rt)},setLocked:function(rt){F=rt},setClear:function(rt,lt,mt,Ht,ie){ie===!0&&(rt*=Ht,lt*=Ht,mt*=Ht),pt.set(rt,lt,mt,Ht),V.equals(pt)===!1&&(s.clearColor(rt,lt,mt,Ht),V.copy(pt))},reset:function(){F=!1,J=null,V.set(-1,0,0,0)}}}function n(){let F=!1,pt=!1,J=null,V=null,rt=null;return{setReversed:function(lt){if(pt!==lt){const mt=t.get("EXT_clip_control");pt?mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.ZERO_TO_ONE_EXT):mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.NEGATIVE_ONE_TO_ONE_EXT);const Ht=rt;rt=null,this.setClear(Ht)}pt=lt},getReversed:function(){return pt},setTest:function(lt){lt?_t(s.DEPTH_TEST):Nt(s.DEPTH_TEST)},setMask:function(lt){J!==lt&&!F&&(s.depthMask(lt),J=lt)},setFunc:function(lt){if(pt&&(lt=Y_[lt]),V!==lt){switch(lt){case Ca:s.depthFunc(s.NEVER);break;case La:s.depthFunc(s.ALWAYS);break;case Pa:s.depthFunc(s.LESS);break;case ns:s.depthFunc(s.LEQUAL);break;case Ua:s.depthFunc(s.EQUAL);break;case Da:s.depthFunc(s.GEQUAL);break;case Ia:s.depthFunc(s.GREATER);break;case ka:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}V=lt}},setLocked:function(lt){F=lt},setClear:function(lt){rt!==lt&&(pt&&(lt=1-lt),s.clearDepth(lt),rt=lt)},reset:function(){F=!1,J=null,V=null,rt=null,pt=!1}}}function i(){let F=!1,pt=null,J=null,V=null,rt=null,lt=null,mt=null,Ht=null,ie=null;return{setTest:function(jt){F||(jt?_t(s.STENCIL_TEST):Nt(s.STENCIL_TEST))},setMask:function(jt){pt!==jt&&!F&&(s.stencilMask(jt),pt=jt)},setFunc:function(jt,de,Me){(J!==jt||V!==de||rt!==Me)&&(s.stencilFunc(jt,de,Me),J=jt,V=de,rt=Me)},setOp:function(jt,de,Me){(lt!==jt||mt!==de||Ht!==Me)&&(s.stencilOp(jt,de,Me),lt=jt,mt=de,Ht=Me)},setLocked:function(jt){F=jt},setClear:function(jt){ie!==jt&&(s.clearStencil(jt),ie=jt)},reset:function(){F=!1,pt=null,J=null,V=null,rt=null,lt=null,mt=null,Ht=null,ie=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,y=null,v=null,x=null,E=null,S=null,A=new kt(0,0,0),C=0,M=!1,w=null,P=null,I=null,N=null,H=null;const X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,it=0;const j=s.getParameter(s.VERSION);j.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(j)[1]),q=it>=1):j.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),q=it>=2);let gt=null,yt={};const Ct=s.getParameter(s.SCISSOR_BOX),Vt=s.getParameter(s.VIEWPORT),ae=new ge().fromArray(Ct),tt=new ge().fromArray(Vt);function dt(F,pt,J,V){const rt=new Uint8Array(4),lt=s.createTexture();s.bindTexture(F,lt),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let mt=0;mt<J;mt++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(pt,0,s.RGBA,1,1,V,0,s.RGBA,s.UNSIGNED_BYTE,rt):s.texImage2D(pt+mt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,rt);return lt}const Rt={};Rt[s.TEXTURE_2D]=dt(s.TEXTURE_2D,s.TEXTURE_2D,1),Rt[s.TEXTURE_CUBE_MAP]=dt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Rt[s.TEXTURE_2D_ARRAY]=dt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Rt[s.TEXTURE_3D]=dt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),_t(s.DEPTH_TEST),a.setFunc(ns),Kt(!1),Jt(Jl),_t(s.CULL_FACE),z(ii);function _t(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function Nt(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function Gt(F,pt){return d[F]!==pt?(s.bindFramebuffer(F,pt),d[F]=pt,F===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=pt),F===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=pt),!0):!1}function Bt(F,pt){let J=f,V=!1;if(F){J=u.get(pt),J===void 0&&(J=[],u.set(pt,J));const rt=F.textures;if(J.length!==rt.length||J[0]!==s.COLOR_ATTACHMENT0){for(let lt=0,mt=rt.length;lt<mt;lt++)J[lt]=s.COLOR_ATTACHMENT0+lt;J.length=rt.length,V=!0}}else J[0]!==s.BACK&&(J[0]=s.BACK,V=!0);V&&s.drawBuffers(J)}function re(F){return g!==F?(s.useProgram(F),g=F,!0):!1}const Wt={[vi]:s.FUNC_ADD,[uf]:s.FUNC_SUBTRACT,[ff]:s.FUNC_REVERSE_SUBTRACT};Wt[pf]=s.MIN,Wt[mf]=s.MAX;const oe={[gf]:s.ZERO,[_f]:s.ONE,[xf]:s.SRC_COLOR,[Aa]:s.SRC_ALPHA,[Sf]:s.SRC_ALPHA_SATURATE,[wf]:s.DST_COLOR,[bf]:s.DST_ALPHA,[vf]:s.ONE_MINUS_SRC_COLOR,[Ra]:s.ONE_MINUS_SRC_ALPHA,[yf]:s.ONE_MINUS_DST_COLOR,[Mf]:s.ONE_MINUS_DST_ALPHA,[Tf]:s.CONSTANT_COLOR,[Ef]:s.ONE_MINUS_CONSTANT_COLOR,[Af]:s.CONSTANT_ALPHA,[Rf]:s.ONE_MINUS_CONSTANT_ALPHA};function z(F,pt,J,V,rt,lt,mt,Ht,ie,jt){if(F===ii){_===!0&&(Nt(s.BLEND),_=!1);return}if(_===!1&&(_t(s.BLEND),_=!0),F!==df){if(F!==m||jt!==M){if((p!==vi||x!==vi)&&(s.blendEquation(s.FUNC_ADD),p=vi,x=vi),jt)switch(F){case Ki:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case so:s.blendFunc(s.ONE,s.ONE);break;case Ql:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case tc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ki:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case so:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ql:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case tc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}y=null,v=null,E=null,S=null,A.set(0,0,0),C=0,m=F,M=jt}return}rt=rt||pt,lt=lt||J,mt=mt||V,(pt!==p||rt!==x)&&(s.blendEquationSeparate(Wt[pt],Wt[rt]),p=pt,x=rt),(J!==y||V!==v||lt!==E||mt!==S)&&(s.blendFuncSeparate(oe[J],oe[V],oe[lt],oe[mt]),y=J,v=V,E=lt,S=mt),(Ht.equals(A)===!1||ie!==C)&&(s.blendColor(Ht.r,Ht.g,Ht.b,ie),A.copy(Ht),C=ie),m=F,M=!1}function Ce(F,pt){F.side===qt?Nt(s.CULL_FACE):_t(s.CULL_FACE);let J=F.side===je;pt&&(J=!J),Kt(J),F.blending===Ki&&F.transparent===!1?z(ii):z(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const V=F.stencilWrite;o.setTest(V),V&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Qt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?_t(s.SAMPLE_ALPHA_TO_COVERAGE):Nt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Kt(F){w!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),w=F)}function Jt(F){F!==lf?(_t(s.CULL_FACE),F!==P&&(F===Jl?s.cullFace(s.BACK):F===cf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Nt(s.CULL_FACE),P=F}function Mt(F){F!==I&&(q&&s.lineWidth(F),I=F)}function Qt(F,pt,J){F?(_t(s.POLYGON_OFFSET_FILL),(N!==pt||H!==J)&&(s.polygonOffset(pt,J),N=pt,H=J)):Nt(s.POLYGON_OFFSET_FILL)}function Pt(F){F?_t(s.SCISSOR_TEST):Nt(s.SCISSOR_TEST)}function U(F){F===void 0&&(F=s.TEXTURE0+X-1),gt!==F&&(s.activeTexture(F),gt=F)}function T(F,pt,J){J===void 0&&(gt===null?J=s.TEXTURE0+X-1:J=gt);let V=yt[J];V===void 0&&(V={type:void 0,texture:void 0},yt[J]=V),(V.type!==F||V.texture!==pt)&&(gt!==J&&(s.activeTexture(J),gt=J),s.bindTexture(F,pt||Rt[F]),V.type=F,V.texture=pt)}function W(){const F=yt[gt];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function st(){try{s.compressedTexImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function at(){try{s.compressedTexImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function et(){try{s.texSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Tt(){try{s.texSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function vt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function St(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function $t(){try{s.texStorage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ct(){try{s.texStorage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Et(){try{s.texImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Dt(){try{s.texImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ut(F){ae.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),ae.copy(F))}function At(F){tt.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),tt.copy(F))}function Yt(F,pt){let J=c.get(pt);J===void 0&&(J=new WeakMap,c.set(pt,J));let V=J.get(F);V===void 0&&(V=s.getUniformBlockIndex(pt,F.name),J.set(F,V))}function Xt(F,pt){const V=c.get(pt).get(F);l.get(pt)!==V&&(s.uniformBlockBinding(pt,V,F.__bindingPointIndex),l.set(pt,V))}function le(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},gt=null,yt={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,y=null,v=null,x=null,E=null,S=null,A=new kt(0,0,0),C=0,M=!1,w=null,P=null,I=null,N=null,H=null,ae.set(0,0,s.canvas.width,s.canvas.height),tt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:_t,disable:Nt,bindFramebuffer:Gt,drawBuffers:Bt,useProgram:re,setBlending:z,setMaterial:Ce,setFlipSided:Kt,setCullFace:Jt,setLineWidth:Mt,setPolygonOffset:Qt,setScissorTest:Pt,activeTexture:U,bindTexture:T,unbindTexture:W,compressedTexImage2D:st,compressedTexImage3D:at,texImage2D:Et,texImage3D:Dt,updateUBOMapping:Yt,uniformBlockBinding:Xt,texStorage2D:$t,texStorage3D:ct,texSubImage2D:et,texSubImage3D:Tt,compressedTexSubImage2D:vt,compressedTexSubImage3D:St,scissor:Ut,viewport:At,reset:le}}function $c(s,t,e,n){const i=Z_(n);switch(e){case Zh:return s*t;case Jh:return s*t;case Qh:return s*t*2;case td:return s*t/i.components*i.byteLength;case Rl:return s*t/i.components*i.byteLength;case ed:return s*t*2/i.components*i.byteLength;case Cl:return s*t*2/i.components*i.byteLength;case Kh:return s*t*3/i.components*i.byteLength;case _n:return s*t*4/i.components*i.byteLength;case Ll:return s*t*4/i.components*i.byteLength;case Yr:case jr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Zr:case Kr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ba:case Ga:return Math.max(s,16)*Math.max(t,8)/4;case za:case Ha:return Math.max(s,8)*Math.max(t,8)/2;case Va:case Wa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Xa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case qa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case $a:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case ja:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Za:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Ka:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Qa:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case tl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case el:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case nl:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case il:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case sl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case rl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Jr:case ol:case al:return Math.ceil(s/4)*Math.ceil(t/4)*16;case nd:case ll:return Math.ceil(s/4)*Math.ceil(t/4)*8;case cl:case hl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Z_(s){switch(s){case Hn:case $h:return{byteLength:1,components:1};case Hs:case Yh:case Ys:return{byteLength:2,components:1};case El:case Al:return{byteLength:2,components:4};case wi:case Tl:case Fn:return{byteLength:4,components:1};case jh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function K_(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new wt,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(U,T){return f?new OffscreenCanvas(U,T):Gs("canvas")}function _(U,T,W){let st=1;const at=Pt(U);if((at.width>W||at.height>W)&&(st=W/Math.max(at.width,at.height)),st<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const et=Math.floor(st*at.width),Tt=Math.floor(st*at.height);d===void 0&&(d=g(et,Tt));const vt=T?g(et,Tt):d;return vt.width=et,vt.height=Tt,vt.getContext("2d").drawImage(U,0,0,et,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+et+"x"+Tt+")."),vt}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),U;return U}function m(U){return U.generateMipmaps}function p(U){s.generateMipmap(U)}function y(U){return U.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?s.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(U,T,W,st,at=!1){if(U!==null){if(s[U]!==void 0)return s[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let et=T;if(T===s.RED&&(W===s.FLOAT&&(et=s.R32F),W===s.HALF_FLOAT&&(et=s.R16F),W===s.UNSIGNED_BYTE&&(et=s.R8)),T===s.RED_INTEGER&&(W===s.UNSIGNED_BYTE&&(et=s.R8UI),W===s.UNSIGNED_SHORT&&(et=s.R16UI),W===s.UNSIGNED_INT&&(et=s.R32UI),W===s.BYTE&&(et=s.R8I),W===s.SHORT&&(et=s.R16I),W===s.INT&&(et=s.R32I)),T===s.RG&&(W===s.FLOAT&&(et=s.RG32F),W===s.HALF_FLOAT&&(et=s.RG16F),W===s.UNSIGNED_BYTE&&(et=s.RG8)),T===s.RG_INTEGER&&(W===s.UNSIGNED_BYTE&&(et=s.RG8UI),W===s.UNSIGNED_SHORT&&(et=s.RG16UI),W===s.UNSIGNED_INT&&(et=s.RG32UI),W===s.BYTE&&(et=s.RG8I),W===s.SHORT&&(et=s.RG16I),W===s.INT&&(et=s.RG32I)),T===s.RGB_INTEGER&&(W===s.UNSIGNED_BYTE&&(et=s.RGB8UI),W===s.UNSIGNED_SHORT&&(et=s.RGB16UI),W===s.UNSIGNED_INT&&(et=s.RGB32UI),W===s.BYTE&&(et=s.RGB8I),W===s.SHORT&&(et=s.RGB16I),W===s.INT&&(et=s.RGB32I)),T===s.RGBA_INTEGER&&(W===s.UNSIGNED_BYTE&&(et=s.RGBA8UI),W===s.UNSIGNED_SHORT&&(et=s.RGBA16UI),W===s.UNSIGNED_INT&&(et=s.RGBA32UI),W===s.BYTE&&(et=s.RGBA8I),W===s.SHORT&&(et=s.RGBA16I),W===s.INT&&(et=s.RGBA32I)),T===s.RGB&&W===s.UNSIGNED_INT_5_9_9_9_REV&&(et=s.RGB9_E5),T===s.RGBA){const Tt=at?go:ce.getTransfer(st);W===s.FLOAT&&(et=s.RGBA32F),W===s.HALF_FLOAT&&(et=s.RGBA16F),W===s.UNSIGNED_BYTE&&(et=Tt===pe?s.SRGB8_ALPHA8:s.RGBA8),W===s.UNSIGNED_SHORT_4_4_4_4&&(et=s.RGBA4),W===s.UNSIGNED_SHORT_5_5_5_1&&(et=s.RGB5_A1)}return(et===s.R16F||et===s.R32F||et===s.RG16F||et===s.RG32F||et===s.RGBA16F||et===s.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function x(U,T){let W;return U?T===null||T===wi||T===rs?W=s.DEPTH24_STENCIL8:T===Fn?W=s.DEPTH32F_STENCIL8:T===Hs&&(W=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===wi||T===rs?W=s.DEPTH_COMPONENT24:T===Fn?W=s.DEPTH_COMPONENT32F:T===Hs&&(W=s.DEPTH_COMPONENT16),W}function E(U,T){return m(U)===!0||U.isFramebufferTexture&&U.minFilter!==xn&&U.minFilter!==We?Math.log2(Math.max(T.width,T.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?T.mipmaps.length:1}function S(U){const T=U.target;T.removeEventListener("dispose",S),C(T),T.isVideoTexture&&h.delete(T)}function A(U){const T=U.target;T.removeEventListener("dispose",A),w(T)}function C(U){const T=n.get(U);if(T.__webglInit===void 0)return;const W=U.source,st=u.get(W);if(st){const at=st[T.__cacheKey];at.usedTimes--,at.usedTimes===0&&M(U),Object.keys(st).length===0&&u.delete(W)}n.remove(U)}function M(U){const T=n.get(U);s.deleteTexture(T.__webglTexture);const W=U.source,st=u.get(W);delete st[T.__cacheKey],a.memory.textures--}function w(U){const T=n.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),n.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(T.__webglFramebuffer[st]))for(let at=0;at<T.__webglFramebuffer[st].length;at++)s.deleteFramebuffer(T.__webglFramebuffer[st][at]);else s.deleteFramebuffer(T.__webglFramebuffer[st]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[st])}else{if(Array.isArray(T.__webglFramebuffer))for(let st=0;st<T.__webglFramebuffer.length;st++)s.deleteFramebuffer(T.__webglFramebuffer[st]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let st=0;st<T.__webglColorRenderbuffer.length;st++)T.__webglColorRenderbuffer[st]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[st]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const W=U.textures;for(let st=0,at=W.length;st<at;st++){const et=n.get(W[st]);et.__webglTexture&&(s.deleteTexture(et.__webglTexture),a.memory.textures--),n.remove(W[st])}n.remove(U)}let P=0;function I(){P=0}function N(){const U=P;return U>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+i.maxTextures),P+=1,U}function H(U){const T=[];return T.push(U.wrapS),T.push(U.wrapT),T.push(U.wrapR||0),T.push(U.magFilter),T.push(U.minFilter),T.push(U.anisotropy),T.push(U.internalFormat),T.push(U.format),T.push(U.type),T.push(U.generateMipmaps),T.push(U.premultiplyAlpha),T.push(U.flipY),T.push(U.unpackAlignment),T.push(U.colorSpace),T.join()}function X(U,T){const W=n.get(U);if(U.isVideoTexture&&Mt(U),U.isRenderTargetTexture===!1&&U.version>0&&W.__version!==U.version){const st=U.image;if(st===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(W,U,T);return}}e.bindTexture(s.TEXTURE_2D,W.__webglTexture,s.TEXTURE0+T)}function q(U,T){const W=n.get(U);if(U.version>0&&W.__version!==U.version){tt(W,U,T);return}e.bindTexture(s.TEXTURE_2D_ARRAY,W.__webglTexture,s.TEXTURE0+T)}function it(U,T){const W=n.get(U);if(U.version>0&&W.__version!==U.version){tt(W,U,T);return}e.bindTexture(s.TEXTURE_3D,W.__webglTexture,s.TEXTURE0+T)}function j(U,T){const W=n.get(U);if(U.version>0&&W.__version!==U.version){dt(W,U,T);return}e.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture,s.TEXTURE0+T)}const gt={[nn]:s.REPEAT,[mn]:s.CLAMP_TO_EDGE,[Oa]:s.MIRRORED_REPEAT},yt={[xn]:s.NEAREST,[Of]:s.NEAREST_MIPMAP_NEAREST,[or]:s.NEAREST_MIPMAP_LINEAR,[We]:s.LINEAR,[yo]:s.LINEAR_MIPMAP_NEAREST,[gn]:s.LINEAR_MIPMAP_LINEAR},Ct={[Gf]:s.NEVER,[Yf]:s.ALWAYS,[Vf]:s.LESS,[id]:s.LEQUAL,[Wf]:s.EQUAL,[$f]:s.GEQUAL,[Xf]:s.GREATER,[qf]:s.NOTEQUAL};function Vt(U,T){if(T.type===Fn&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===We||T.magFilter===yo||T.magFilter===or||T.magFilter===gn||T.minFilter===We||T.minFilter===yo||T.minFilter===or||T.minFilter===gn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(U,s.TEXTURE_WRAP_S,gt[T.wrapS]),s.texParameteri(U,s.TEXTURE_WRAP_T,gt[T.wrapT]),(U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY)&&s.texParameteri(U,s.TEXTURE_WRAP_R,gt[T.wrapR]),s.texParameteri(U,s.TEXTURE_MAG_FILTER,yt[T.magFilter]),s.texParameteri(U,s.TEXTURE_MIN_FILTER,yt[T.minFilter]),T.compareFunction&&(s.texParameteri(U,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(U,s.TEXTURE_COMPARE_FUNC,Ct[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===xn||T.minFilter!==or&&T.minFilter!==gn||T.type===Fn&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");s.texParameterf(U,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function ae(U,T){let W=!1;U.__webglInit===void 0&&(U.__webglInit=!0,T.addEventListener("dispose",S));const st=T.source;let at=u.get(st);at===void 0&&(at={},u.set(st,at));const et=H(T);if(et!==U.__cacheKey){at[et]===void 0&&(at[et]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,W=!0),at[et].usedTimes++;const Tt=at[U.__cacheKey];Tt!==void 0&&(at[U.__cacheKey].usedTimes--,Tt.usedTimes===0&&M(T)),U.__cacheKey=et,U.__webglTexture=at[et].texture}return W}function tt(U,T,W){let st=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(st=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(st=s.TEXTURE_3D);const at=ae(U,T),et=T.source;e.bindTexture(st,U.__webglTexture,s.TEXTURE0+W);const Tt=n.get(et);if(et.version!==Tt.__version||at===!0){e.activeTexture(s.TEXTURE0+W);const vt=ce.getPrimaries(ce.workingColorSpace),St=T.colorSpace===ni?null:ce.getPrimaries(T.colorSpace),$t=T.colorSpace===ni||vt===St?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let ct=_(T.image,!1,i.maxTextureSize);ct=Qt(T,ct);const Et=r.convert(T.format,T.colorSpace),Dt=r.convert(T.type);let Ut=v(T.internalFormat,Et,Dt,T.colorSpace,T.isVideoTexture);Vt(st,T);let At;const Yt=T.mipmaps,Xt=T.isVideoTexture!==!0,le=Tt.__version===void 0||at===!0,F=et.dataReady,pt=E(T,ct);if(T.isDepthTexture)Ut=x(T.format===os,T.type),le&&(Xt?e.texStorage2D(s.TEXTURE_2D,1,Ut,ct.width,ct.height):e.texImage2D(s.TEXTURE_2D,0,Ut,ct.width,ct.height,0,Et,Dt,null));else if(T.isDataTexture)if(Yt.length>0){Xt&&le&&e.texStorage2D(s.TEXTURE_2D,pt,Ut,Yt[0].width,Yt[0].height);for(let J=0,V=Yt.length;J<V;J++)At=Yt[J],Xt?F&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,At.width,At.height,Et,Dt,At.data):e.texImage2D(s.TEXTURE_2D,J,Ut,At.width,At.height,0,Et,Dt,At.data);T.generateMipmaps=!1}else Xt?(le&&e.texStorage2D(s.TEXTURE_2D,pt,Ut,ct.width,ct.height),F&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ct.width,ct.height,Et,Dt,ct.data)):e.texImage2D(s.TEXTURE_2D,0,Ut,ct.width,ct.height,0,Et,Dt,ct.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Xt&&le&&e.texStorage3D(s.TEXTURE_2D_ARRAY,pt,Ut,Yt[0].width,Yt[0].height,ct.depth);for(let J=0,V=Yt.length;J<V;J++)if(At=Yt[J],T.format!==_n)if(Et!==null)if(Xt){if(F)if(T.layerUpdates.size>0){const rt=$c(At.width,At.height,T.format,T.type);for(const lt of T.layerUpdates){const mt=At.data.subarray(lt*rt/At.data.BYTES_PER_ELEMENT,(lt+1)*rt/At.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,lt,At.width,At.height,1,Et,mt)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,At.width,At.height,ct.depth,Et,At.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,J,Ut,At.width,At.height,ct.depth,0,At.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?F&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,At.width,At.height,ct.depth,Et,Dt,At.data):e.texImage3D(s.TEXTURE_2D_ARRAY,J,Ut,At.width,At.height,ct.depth,0,Et,Dt,At.data)}else{Xt&&le&&e.texStorage2D(s.TEXTURE_2D,pt,Ut,Yt[0].width,Yt[0].height);for(let J=0,V=Yt.length;J<V;J++)At=Yt[J],T.format!==_n?Et!==null?Xt?F&&e.compressedTexSubImage2D(s.TEXTURE_2D,J,0,0,At.width,At.height,Et,At.data):e.compressedTexImage2D(s.TEXTURE_2D,J,Ut,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?F&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,At.width,At.height,Et,Dt,At.data):e.texImage2D(s.TEXTURE_2D,J,Ut,At.width,At.height,0,Et,Dt,At.data)}else if(T.isDataArrayTexture)if(Xt){if(le&&e.texStorage3D(s.TEXTURE_2D_ARRAY,pt,Ut,ct.width,ct.height,ct.depth),F)if(T.layerUpdates.size>0){const J=$c(ct.width,ct.height,T.format,T.type);for(const V of T.layerUpdates){const rt=ct.data.subarray(V*J/ct.data.BYTES_PER_ELEMENT,(V+1)*J/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,V,ct.width,ct.height,1,Et,Dt,rt)}T.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,Et,Dt,ct.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ut,ct.width,ct.height,ct.depth,0,Et,Dt,ct.data);else if(T.isData3DTexture)Xt?(le&&e.texStorage3D(s.TEXTURE_3D,pt,Ut,ct.width,ct.height,ct.depth),F&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,Et,Dt,ct.data)):e.texImage3D(s.TEXTURE_3D,0,Ut,ct.width,ct.height,ct.depth,0,Et,Dt,ct.data);else if(T.isFramebufferTexture){if(le)if(Xt)e.texStorage2D(s.TEXTURE_2D,pt,Ut,ct.width,ct.height);else{let J=ct.width,V=ct.height;for(let rt=0;rt<pt;rt++)e.texImage2D(s.TEXTURE_2D,rt,Ut,J,V,0,Et,Dt,null),J>>=1,V>>=1}}else if(Yt.length>0){if(Xt&&le){const J=Pt(Yt[0]);e.texStorage2D(s.TEXTURE_2D,pt,Ut,J.width,J.height)}for(let J=0,V=Yt.length;J<V;J++)At=Yt[J],Xt?F&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,Et,Dt,At):e.texImage2D(s.TEXTURE_2D,J,Ut,Et,Dt,At);T.generateMipmaps=!1}else if(Xt){if(le){const J=Pt(ct);e.texStorage2D(s.TEXTURE_2D,pt,Ut,J.width,J.height)}F&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Et,Dt,ct)}else e.texImage2D(s.TEXTURE_2D,0,Ut,Et,Dt,ct);m(T)&&p(st),Tt.__version=et.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function dt(U,T,W){if(T.image.length!==6)return;const st=ae(U,T),at=T.source;e.bindTexture(s.TEXTURE_CUBE_MAP,U.__webglTexture,s.TEXTURE0+W);const et=n.get(at);if(at.version!==et.__version||st===!0){e.activeTexture(s.TEXTURE0+W);const Tt=ce.getPrimaries(ce.workingColorSpace),vt=T.colorSpace===ni?null:ce.getPrimaries(T.colorSpace),St=T.colorSpace===ni||Tt===vt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const $t=T.isCompressedTexture||T.image[0].isCompressedTexture,ct=T.image[0]&&T.image[0].isDataTexture,Et=[];for(let V=0;V<6;V++)!$t&&!ct?Et[V]=_(T.image[V],!0,i.maxCubemapSize):Et[V]=ct?T.image[V].image:T.image[V],Et[V]=Qt(T,Et[V]);const Dt=Et[0],Ut=r.convert(T.format,T.colorSpace),At=r.convert(T.type),Yt=v(T.internalFormat,Ut,At,T.colorSpace),Xt=T.isVideoTexture!==!0,le=et.__version===void 0||st===!0,F=at.dataReady;let pt=E(T,Dt);Vt(s.TEXTURE_CUBE_MAP,T);let J;if($t){Xt&&le&&e.texStorage2D(s.TEXTURE_CUBE_MAP,pt,Yt,Dt.width,Dt.height);for(let V=0;V<6;V++){J=Et[V].mipmaps;for(let rt=0;rt<J.length;rt++){const lt=J[rt];T.format!==_n?Ut!==null?Xt?F&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,rt,0,0,lt.width,lt.height,Ut,lt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,rt,Yt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,rt,0,0,lt.width,lt.height,Ut,At,lt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,rt,Yt,lt.width,lt.height,0,Ut,At,lt.data)}}}else{if(J=T.mipmaps,Xt&&le){J.length>0&&pt++;const V=Pt(Et[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,pt,Yt,V.width,V.height)}for(let V=0;V<6;V++)if(ct){Xt?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,0,0,Et[V].width,Et[V].height,Ut,At,Et[V].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,Yt,Et[V].width,Et[V].height,0,Ut,At,Et[V].data);for(let rt=0;rt<J.length;rt++){const mt=J[rt].image[V].image;Xt?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,rt+1,0,0,mt.width,mt.height,Ut,At,mt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,rt+1,Yt,mt.width,mt.height,0,Ut,At,mt.data)}}else{Xt?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,0,0,Ut,At,Et[V]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,Yt,Ut,At,Et[V]);for(let rt=0;rt<J.length;rt++){const lt=J[rt];Xt?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,rt+1,0,0,Ut,At,lt.image[V]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,rt+1,Yt,Ut,At,lt.image[V])}}}m(T)&&p(s.TEXTURE_CUBE_MAP),et.__version=at.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function Rt(U,T,W,st,at,et){const Tt=r.convert(W.format,W.colorSpace),vt=r.convert(W.type),St=v(W.internalFormat,Tt,vt,W.colorSpace),$t=n.get(T),ct=n.get(W);if(ct.__renderTarget=T,!$t.__hasExternalTextures){const Et=Math.max(1,T.width>>et),Dt=Math.max(1,T.height>>et);at===s.TEXTURE_3D||at===s.TEXTURE_2D_ARRAY?e.texImage3D(at,et,St,Et,Dt,T.depth,0,Tt,vt,null):e.texImage2D(at,et,St,Et,Dt,0,Tt,vt,null)}e.bindFramebuffer(s.FRAMEBUFFER,U),Jt(T)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,st,at,ct.__webglTexture,0,Kt(T)):(at===s.TEXTURE_2D||at>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,st,at,ct.__webglTexture,et),e.bindFramebuffer(s.FRAMEBUFFER,null)}function _t(U,T,W){if(s.bindRenderbuffer(s.RENDERBUFFER,U),T.depthBuffer){const st=T.depthTexture,at=st&&st.isDepthTexture?st.type:null,et=x(T.stencilBuffer,at),Tt=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,vt=Kt(T);Jt(T)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,vt,et,T.width,T.height):W?s.renderbufferStorageMultisample(s.RENDERBUFFER,vt,et,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,et,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Tt,s.RENDERBUFFER,U)}else{const st=T.textures;for(let at=0;at<st.length;at++){const et=st[at],Tt=r.convert(et.format,et.colorSpace),vt=r.convert(et.type),St=v(et.internalFormat,Tt,vt,et.colorSpace),$t=Kt(T);W&&Jt(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,$t,St,T.width,T.height):Jt(T)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,$t,St,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,St,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Nt(U,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,U),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const st=n.get(T.depthTexture);st.__renderTarget=T,(!st.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),X(T.depthTexture,0);const at=st.__webglTexture,et=Kt(T);if(T.depthTexture.format===Ji)Jt(T)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,at,0,et):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,at,0);else if(T.depthTexture.format===os)Jt(T)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,at,0,et):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,at,0);else throw new Error("Unknown depthTexture format")}function Gt(U){const T=n.get(U),W=U.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==U.depthTexture){const st=U.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),st){const at=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,st.removeEventListener("dispose",at)};st.addEventListener("dispose",at),T.__depthDisposeCallback=at}T.__boundDepthTexture=st}if(U.depthTexture&&!T.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Nt(T.__webglFramebuffer,U)}else if(W){T.__webglDepthbuffer=[];for(let st=0;st<6;st++)if(e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[st]),T.__webglDepthbuffer[st]===void 0)T.__webglDepthbuffer[st]=s.createRenderbuffer(),_t(T.__webglDepthbuffer[st],U,!1);else{const at=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,et=T.__webglDepthbuffer[st];s.bindRenderbuffer(s.RENDERBUFFER,et),s.framebufferRenderbuffer(s.FRAMEBUFFER,at,s.RENDERBUFFER,et)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=s.createRenderbuffer(),_t(T.__webglDepthbuffer,U,!1);else{const st=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,at=T.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,at),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,at)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Bt(U,T,W){const st=n.get(U);T!==void 0&&Rt(st.__webglFramebuffer,U,U.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),W!==void 0&&Gt(U)}function re(U){const T=U.texture,W=n.get(U),st=n.get(T);U.addEventListener("dispose",A);const at=U.textures,et=U.isWebGLCubeRenderTarget===!0,Tt=at.length>1;if(Tt||(st.__webglTexture===void 0&&(st.__webglTexture=s.createTexture()),st.__version=T.version,a.memory.textures++),et){W.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer[vt]=[];for(let St=0;St<T.mipmaps.length;St++)W.__webglFramebuffer[vt][St]=s.createFramebuffer()}else W.__webglFramebuffer[vt]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer=[];for(let vt=0;vt<T.mipmaps.length;vt++)W.__webglFramebuffer[vt]=s.createFramebuffer()}else W.__webglFramebuffer=s.createFramebuffer();if(Tt)for(let vt=0,St=at.length;vt<St;vt++){const $t=n.get(at[vt]);$t.__webglTexture===void 0&&($t.__webglTexture=s.createTexture(),a.memory.textures++)}if(U.samples>0&&Jt(U)===!1){W.__webglMultisampledFramebuffer=s.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let vt=0;vt<at.length;vt++){const St=at[vt];W.__webglColorRenderbuffer[vt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,W.__webglColorRenderbuffer[vt]);const $t=r.convert(St.format,St.colorSpace),ct=r.convert(St.type),Et=v(St.internalFormat,$t,ct,St.colorSpace,U.isXRRenderTarget===!0),Dt=Kt(U);s.renderbufferStorageMultisample(s.RENDERBUFFER,Dt,Et,U.width,U.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,W.__webglColorRenderbuffer[vt])}s.bindRenderbuffer(s.RENDERBUFFER,null),U.depthBuffer&&(W.__webglDepthRenderbuffer=s.createRenderbuffer(),_t(W.__webglDepthRenderbuffer,U,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(et){e.bindTexture(s.TEXTURE_CUBE_MAP,st.__webglTexture),Vt(s.TEXTURE_CUBE_MAP,T);for(let vt=0;vt<6;vt++)if(T.mipmaps&&T.mipmaps.length>0)for(let St=0;St<T.mipmaps.length;St++)Rt(W.__webglFramebuffer[vt][St],U,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,St);else Rt(W.__webglFramebuffer[vt],U,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);m(T)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let vt=0,St=at.length;vt<St;vt++){const $t=at[vt],ct=n.get($t);e.bindTexture(s.TEXTURE_2D,ct.__webglTexture),Vt(s.TEXTURE_2D,$t),Rt(W.__webglFramebuffer,U,$t,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,0),m($t)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let vt=s.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(vt=U.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(vt,st.__webglTexture),Vt(vt,T),T.mipmaps&&T.mipmaps.length>0)for(let St=0;St<T.mipmaps.length;St++)Rt(W.__webglFramebuffer[St],U,T,s.COLOR_ATTACHMENT0,vt,St);else Rt(W.__webglFramebuffer,U,T,s.COLOR_ATTACHMENT0,vt,0);m(T)&&p(vt),e.unbindTexture()}U.depthBuffer&&Gt(U)}function Wt(U){const T=U.textures;for(let W=0,st=T.length;W<st;W++){const at=T[W];if(m(at)){const et=y(U),Tt=n.get(at).__webglTexture;e.bindTexture(et,Tt),p(et),e.unbindTexture()}}}const oe=[],z=[];function Ce(U){if(U.samples>0){if(Jt(U)===!1){const T=U.textures,W=U.width,st=U.height;let at=s.COLOR_BUFFER_BIT;const et=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Tt=n.get(U),vt=T.length>1;if(vt)for(let St=0;St<T.length;St++)e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let St=0;St<T.length;St++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(at|=s.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(at|=s.STENCIL_BUFFER_BIT)),vt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Tt.__webglColorRenderbuffer[St]);const $t=n.get(T[St]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,$t,0)}s.blitFramebuffer(0,0,W,st,0,0,W,st,at,s.NEAREST),l===!0&&(oe.length=0,z.length=0,oe.push(s.COLOR_ATTACHMENT0+St),U.depthBuffer&&U.resolveDepthBuffer===!1&&(oe.push(et),z.push(et),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,z)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,oe))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),vt)for(let St=0;St<T.length;St++){e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,Tt.__webglColorRenderbuffer[St]);const $t=n.get(T[St]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,$t,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&l){const T=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[T])}}}function Kt(U){return Math.min(i.maxSamples,U.samples)}function Jt(U){const T=n.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Mt(U){const T=a.render.frame;h.get(U)!==T&&(h.set(U,T),U.update())}function Qt(U,T){const W=U.colorSpace,st=U.format,at=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||W!==cs&&W!==ni&&(ce.getTransfer(W)===pe?(st!==_n||at!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),T}function Pt(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=I,this.setTexture2D=X,this.setTexture2DArray=q,this.setTexture3D=it,this.setTextureCube=j,this.rebindTextures=Bt,this.setupRenderTarget=re,this.updateRenderTargetMipmap=Wt,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=Rt,this.useMultisampledRTT=Jt}function J_(s,t){function e(n,i=ni){let r;const a=ce.getTransfer(i);if(n===Hn)return s.UNSIGNED_BYTE;if(n===El)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Al)return s.UNSIGNED_SHORT_5_5_5_1;if(n===jh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===$h)return s.BYTE;if(n===Yh)return s.SHORT;if(n===Hs)return s.UNSIGNED_SHORT;if(n===Tl)return s.INT;if(n===wi)return s.UNSIGNED_INT;if(n===Fn)return s.FLOAT;if(n===Ys)return s.HALF_FLOAT;if(n===Zh)return s.ALPHA;if(n===Kh)return s.RGB;if(n===_n)return s.RGBA;if(n===Jh)return s.LUMINANCE;if(n===Qh)return s.LUMINANCE_ALPHA;if(n===Ji)return s.DEPTH_COMPONENT;if(n===os)return s.DEPTH_STENCIL;if(n===td)return s.RED;if(n===Rl)return s.RED_INTEGER;if(n===ed)return s.RG;if(n===Cl)return s.RG_INTEGER;if(n===Ll)return s.RGBA_INTEGER;if(n===Yr||n===jr||n===Zr||n===Kr)if(a===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===za||n===Ba||n===Ha||n===Ga)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===za)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ba)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ha)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ga)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Va||n===Wa||n===Xa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Va||n===Wa)return a===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Xa)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===qa||n===$a||n===Ya||n===ja||n===Za||n===Ka||n===Ja||n===Qa||n===tl||n===el||n===nl||n===il||n===sl||n===rl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===qa)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$a)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ya)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ja)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Za)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ka)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ja)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qa)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===tl)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===el)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nl)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===il)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===sl)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===rl)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Jr||n===ol||n===al)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Jr)return a===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ol)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===al)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nd||n===ll||n===cl||n===hl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Jr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ll)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===cl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===hl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Q_ extends en{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ie extends Le{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tx={type:"move"};class Jo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ie,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ie,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ie,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tx)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ie;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const ex=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nx=`
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

}`;class ix{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Xe,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new oi({vertexShader:ex,fragmentShader:nx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Q(new It(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sx extends hs{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const _=new ix,m=e.getContextAttributes();let p=null,y=null;const v=[],x=[],E=new wt;let S=null;const A=new en;A.viewport=new ge;const C=new en;C.viewport=new ge;const M=[A,C],w=new Q_;let P=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let dt=v[tt];return dt===void 0&&(dt=new Jo,v[tt]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(tt){let dt=v[tt];return dt===void 0&&(dt=new Jo,v[tt]=dt),dt.getGripSpace()},this.getHand=function(tt){let dt=v[tt];return dt===void 0&&(dt=new Jo,v[tt]=dt),dt.getHandSpace()};function N(tt){const dt=x.indexOf(tt.inputSource);if(dt===-1)return;const Rt=v[dt];Rt!==void 0&&(Rt.update(tt.inputSource,tt.frame,c||a),Rt.dispatchEvent({type:tt.type,data:tt.inputSource}))}function H(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",X);for(let tt=0;tt<v.length;tt++){const dt=x[tt];dt!==null&&(x[tt]=null,v[tt].disconnect(dt))}P=null,I=null,_.reset(),t.setRenderTarget(p),f=null,u=null,d=null,i=null,y=null,ae.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){r=tt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){o=tt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(tt){c=tt},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(tt){if(i=tt,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",H),i.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(E),i.renderState.layers===void 0){const dt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,dt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new yi(f.framebufferWidth,f.framebufferHeight,{format:_n,type:Hn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let dt=null,Rt=null,_t=null;m.depth&&(_t=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=m.stencil?os:Ji,Rt=m.stencil?rs:wi);const Nt={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:r};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(Nt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new yi(u.textureWidth,u.textureHeight,{format:_n,type:Hn,depthTexture:new md(u.textureWidth,u.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ae.setContext(i),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(tt){for(let dt=0;dt<tt.removed.length;dt++){const Rt=tt.removed[dt],_t=x.indexOf(Rt);_t>=0&&(x[_t]=null,v[_t].disconnect(Rt))}for(let dt=0;dt<tt.added.length;dt++){const Rt=tt.added[dt];let _t=x.indexOf(Rt);if(_t===-1){for(let Gt=0;Gt<v.length;Gt++)if(Gt>=x.length){x.push(Rt),_t=Gt;break}else if(x[Gt]===null){x[Gt]=Rt,_t=Gt;break}if(_t===-1)break}const Nt=v[_t];Nt&&Nt.connect(Rt)}}const q=new k,it=new k;function j(tt,dt,Rt){q.setFromMatrixPosition(dt.matrixWorld),it.setFromMatrixPosition(Rt.matrixWorld);const _t=q.distanceTo(it),Nt=dt.projectionMatrix.elements,Gt=Rt.projectionMatrix.elements,Bt=Nt[14]/(Nt[10]-1),re=Nt[14]/(Nt[10]+1),Wt=(Nt[9]+1)/Nt[5],oe=(Nt[9]-1)/Nt[5],z=(Nt[8]-1)/Nt[0],Ce=(Gt[8]+1)/Gt[0],Kt=Bt*z,Jt=Bt*Ce,Mt=_t/(-z+Ce),Qt=Mt*-z;if(dt.matrixWorld.decompose(tt.position,tt.quaternion,tt.scale),tt.translateX(Qt),tt.translateZ(Mt),tt.matrixWorld.compose(tt.position,tt.quaternion,tt.scale),tt.matrixWorldInverse.copy(tt.matrixWorld).invert(),Nt[10]===-1)tt.projectionMatrix.copy(dt.projectionMatrix),tt.projectionMatrixInverse.copy(dt.projectionMatrixInverse);else{const Pt=Bt+Mt,U=re+Mt,T=Kt-Qt,W=Jt+(_t-Qt),st=Wt*re/U*Pt,at=oe*re/U*Pt;tt.projectionMatrix.makePerspective(T,W,st,at,Pt,U),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert()}}function gt(tt,dt){dt===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(dt.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(i===null)return;let dt=tt.near,Rt=tt.far;_.texture!==null&&(_.depthNear>0&&(dt=_.depthNear),_.depthFar>0&&(Rt=_.depthFar)),w.near=C.near=A.near=dt,w.far=C.far=A.far=Rt,(P!==w.near||I!==w.far)&&(i.updateRenderState({depthNear:w.near,depthFar:w.far}),P=w.near,I=w.far),A.layers.mask=tt.layers.mask|2,C.layers.mask=tt.layers.mask|4,w.layers.mask=A.layers.mask|C.layers.mask;const _t=tt.parent,Nt=w.cameras;gt(w,_t);for(let Gt=0;Gt<Nt.length;Gt++)gt(Nt[Gt],_t);Nt.length===2?j(w,A,C):w.projectionMatrix.copy(A.projectionMatrix),yt(tt,w,_t)};function yt(tt,dt,Rt){Rt===null?tt.matrix.copy(dt.matrixWorld):(tt.matrix.copy(Rt.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(dt.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(dt.projectionMatrix),tt.projectionMatrixInverse.copy(dt.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=ul*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(tt){l=tt,u!==null&&(u.fixedFoveation=tt),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=tt)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(w)};let Ct=null;function Vt(tt,dt){if(h=dt.getViewerPose(c||a),g=dt,h!==null){const Rt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let _t=!1;Rt.length!==w.cameras.length&&(w.cameras.length=0,_t=!0);for(let Gt=0;Gt<Rt.length;Gt++){const Bt=Rt[Gt];let re=null;if(f!==null)re=f.getViewport(Bt);else{const oe=d.getViewSubImage(u,Bt);re=oe.viewport,Gt===0&&(t.setRenderTargetTextures(y,oe.colorTexture,u.ignoreDepthValues?void 0:oe.depthStencilTexture),t.setRenderTarget(y))}let Wt=M[Gt];Wt===void 0&&(Wt=new en,Wt.layers.enable(Gt),Wt.viewport=new ge,M[Gt]=Wt),Wt.matrix.fromArray(Bt.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(Bt.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(re.x,re.y,re.width,re.height),Gt===0&&(w.matrix.copy(Wt.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),_t===!0&&w.cameras.push(Wt)}const Nt=i.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")){const Gt=d.getDepthInformation(Rt[0]);Gt&&Gt.isValid&&Gt.texture&&_.init(t,Gt,i.renderState)}}for(let Rt=0;Rt<v.length;Rt++){const _t=x[Rt],Nt=v[Rt];_t!==null&&Nt!==void 0&&Nt.update(_t,dt,c||a)}Ct&&Ct(tt,dt),dt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:dt}),g=null}const ae=new fd;ae.setAnimationLoop(Vt),this.setAnimationLoop=function(tt){Ct=tt},this.dispose=function(){}}}const mi=new vn,rx=new xe;function ox(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,hd(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,y,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===je&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===je&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),v=y.envMap,x=y.envMapRotation;v&&(m.envMap.value=v,mi.copy(x),mi.x*=-1,mi.y*=-1,mi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),m.envMapRotation.value.setFromMatrix4(rx.makeRotationFromEuler(mi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===je&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function ax(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){const x=v.program;n.uniformBlockBinding(y,x)}function c(y,v){let x=i[y.id];x===void 0&&(g(y),x=h(y),i[y.id]=x,y.addEventListener("dispose",m));const E=v.program;n.updateUBOMapping(y,E);const S=t.render.frame;r[y.id]!==S&&(u(y),r[y.id]=S)}function h(y){const v=d();y.__bindingPointIndex=v;const x=s.createBuffer(),E=y.__size,S=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,E,S),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,x),x}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const v=i[y.id],x=y.uniforms,E=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let S=0,A=x.length;S<A;S++){const C=Array.isArray(x[S])?x[S]:[x[S]];for(let M=0,w=C.length;M<w;M++){const P=C[M];if(f(P,S,M,E)===!0){const I=P.__offset,N=Array.isArray(P.value)?P.value:[P.value];let H=0;for(let X=0;X<N.length;X++){const q=N[X],it=_(q);typeof q=="number"||typeof q=="boolean"?(P.__data[0]=q,s.bufferSubData(s.UNIFORM_BUFFER,I+H,P.__data)):q.isMatrix3?(P.__data[0]=q.elements[0],P.__data[1]=q.elements[1],P.__data[2]=q.elements[2],P.__data[3]=0,P.__data[4]=q.elements[3],P.__data[5]=q.elements[4],P.__data[6]=q.elements[5],P.__data[7]=0,P.__data[8]=q.elements[6],P.__data[9]=q.elements[7],P.__data[10]=q.elements[8],P.__data[11]=0):(q.toArray(P.__data,H),H+=it.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,I,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,v,x,E){const S=y.value,A=v+"_"+x;if(E[A]===void 0)return typeof S=="number"||typeof S=="boolean"?E[A]=S:E[A]=S.clone(),!0;{const C=E[A];if(typeof S=="number"||typeof S=="boolean"){if(C!==S)return E[A]=S,!0}else if(C.equals(S)===!1)return C.copy(S),!0}return!1}function g(y){const v=y.uniforms;let x=0;const E=16;for(let A=0,C=v.length;A<C;A++){const M=Array.isArray(v[A])?v[A]:[v[A]];for(let w=0,P=M.length;w<P;w++){const I=M[w],N=Array.isArray(I.value)?I.value:[I.value];for(let H=0,X=N.length;H<X;H++){const q=N[H],it=_(q),j=x%E,gt=j%it.boundary,yt=j+gt;x+=gt,yt!==0&&E-yt<it.storage&&(x+=E-yt),I.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=x,x+=it.storage}}}const S=x%E;return S>0&&(x+=E-S),y.__size=x,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const x=a.indexOf(v.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function p(){for(const y in i)s.deleteBuffer(i[y]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}class lx{constructor(t={}){const{canvas:e=Zf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Re,this.toneMapping=si,this.toneMappingExposure=1;const x=this;let E=!1,S=0,A=0,C=null,M=-1,w=null;const P=new ge,I=new ge;let N=null;const H=new kt(0);let X=0,q=e.width,it=e.height,j=1,gt=null,yt=null;const Ct=new ge(0,0,q,it),Vt=new ge(0,0,q,it);let ae=!1;const tt=new Il;let dt=!1,Rt=!1;const _t=new xe,Nt=new xe,Gt=new k,Bt=new ge,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function oe(){return C===null?j:1}let z=n;function Ce(L,B){return e.getContext(L,B)}try{const L={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sl}`),e.addEventListener("webglcontextlost",V,!1),e.addEventListener("webglcontextrestored",rt,!1),e.addEventListener("webglcontextcreationerror",lt,!1),z===null){const B="webgl2";if(z=Ce(B,L),z===null)throw Ce(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let Kt,Jt,Mt,Qt,Pt,U,T,W,st,at,et,Tt,vt,St,$t,ct,Et,Dt,Ut,At,Yt,Xt,le,F;function pt(){Kt=new f0(z),Kt.init(),Xt=new J_(z,Kt),Jt=new a0(z,Kt,t,Xt),Mt=new j_(z,Kt),Jt.reverseDepthBuffer&&u&&Mt.buffers.depth.setReversed(!0),Qt=new g0(z),Pt=new I_,U=new K_(z,Kt,Mt,Pt,Jt,Xt,Qt),T=new c0(x),W=new u0(x),st=new yp(z),le=new r0(z,st),at=new p0(z,st,Qt,le),et=new x0(z,at,st,Qt),Ut=new _0(z,Jt,U),ct=new l0(Pt),Tt=new D_(x,T,W,Kt,Jt,le,ct),vt=new ox(x,Pt),St=new N_,$t=new G_(Kt),Dt=new s0(x,T,W,Mt,et,f,l),Et=new $_(x,et,Jt),F=new ax(z,Qt,Jt,Mt),At=new o0(z,Kt,Qt),Yt=new m0(z,Kt,Qt),Qt.programs=Tt.programs,x.capabilities=Jt,x.extensions=Kt,x.properties=Pt,x.renderLists=St,x.shadowMap=Et,x.state=Mt,x.info=Qt}pt();const J=new sx(x,z);this.xr=J,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const L=Kt.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=Kt.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(L){L!==void 0&&(j=L,this.setSize(q,it,!1))},this.getSize=function(L){return L.set(q,it)},this.setSize=function(L,B,$=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=L,it=B,e.width=Math.floor(L*j),e.height=Math.floor(B*j),$===!0&&(e.style.width=L+"px",e.style.height=B+"px"),this.setViewport(0,0,L,B)},this.getDrawingBufferSize=function(L){return L.set(q*j,it*j).floor()},this.setDrawingBufferSize=function(L,B,$){q=L,it=B,j=$,e.width=Math.floor(L*$),e.height=Math.floor(B*$),this.setViewport(0,0,L,B)},this.getCurrentViewport=function(L){return L.copy(P)},this.getViewport=function(L){return L.copy(Ct)},this.setViewport=function(L,B,$,b){L.isVector4?Ct.set(L.x,L.y,L.z,L.w):Ct.set(L,B,$,b),Mt.viewport(P.copy(Ct).multiplyScalar(j).round())},this.getScissor=function(L){return L.copy(Vt)},this.setScissor=function(L,B,$,b){L.isVector4?Vt.set(L.x,L.y,L.z,L.w):Vt.set(L,B,$,b),Mt.scissor(I.copy(Vt).multiplyScalar(j).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(L){Mt.setScissorTest(ae=L)},this.setOpaqueSort=function(L){gt=L},this.setTransparentSort=function(L){yt=L},this.getClearColor=function(L){return L.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor.apply(Dt,arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha.apply(Dt,arguments)},this.clear=function(L=!0,B=!0,$=!0){let b=0;if(L){let R=!1;if(C!==null){const G=C.texture.format;R=G===Ll||G===Cl||G===Rl}if(R){const G=C.texture.type,O=G===Hn||G===wi||G===Hs||G===rs||G===El||G===Al,Y=Dt.getClearColor(),K=Dt.getClearAlpha(),ot=Y.r,ht=Y.g,Z=Y.b;O?(g[0]=ot,g[1]=ht,g[2]=Z,g[3]=K,z.clearBufferuiv(z.COLOR,0,g)):(_[0]=ot,_[1]=ht,_[2]=Z,_[3]=K,z.clearBufferiv(z.COLOR,0,_))}else b|=z.COLOR_BUFFER_BIT}B&&(b|=z.DEPTH_BUFFER_BIT),$&&(b|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(b)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",V,!1),e.removeEventListener("webglcontextrestored",rt,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),St.dispose(),$t.dispose(),Pt.dispose(),T.dispose(),W.dispose(),et.dispose(),le.dispose(),F.dispose(),Tt.dispose(),J.dispose(),J.removeEventListener("sessionstart",Mn),J.removeEventListener("sessionend",qe),Te.stop()};function V(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function rt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const L=Qt.autoReset,B=Et.enabled,$=Et.autoUpdate,b=Et.needsUpdate,R=Et.type;pt(),Qt.autoReset=L,Et.enabled=B,Et.autoUpdate=$,Et.needsUpdate=b,Et.type=R}function lt(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function mt(L){const B=L.target;B.removeEventListener("dispose",mt),Ht(B)}function Ht(L){ie(L),Pt.remove(L)}function ie(L){const B=Pt.get(L).programs;B!==void 0&&(B.forEach(function($){Tt.releaseProgram($)}),L.isShaderMaterial&&Tt.releaseShaderCache(L))}this.renderBufferDirect=function(L,B,$,b,R,G){B===null&&(B=re);const O=R.isMesh&&R.matrixWorld.determinant()<0,Y=rr(L,B,$,b,R);Mt.setMaterial(b,O);let K=$.index,ot=1;if(b.wireframe===!0){if(K=at.getWireframeAttribute($),K===void 0)return;ot=2}const ht=$.drawRange,Z=$.attributes.position;let xt=ht.start*ot,Ot=(ht.start+ht.count)*ot;G!==null&&(xt=Math.max(xt,G.start*ot),Ot=Math.min(Ot,(G.start+G.count)*ot)),K!==null?(xt=Math.max(xt,0),Ot=Math.min(Ot,K.count)):Z!=null&&(xt=Math.max(xt,0),Ot=Math.min(Ot,Z.count));const Ft=Ot-xt;if(Ft<0||Ft===1/0)return;le.setup(R,b,Y,$,K);let se,zt=At;if(K!==null&&(se=st.get(K),zt=Yt,zt.setIndex(se)),R.isMesh)b.wireframe===!0?(Mt.setLineWidth(b.wireframeLinewidth*oe()),zt.setMode(z.LINES)):zt.setMode(z.TRIANGLES);else if(R.isLine){let nt=b.linewidth;nt===void 0&&(nt=1),Mt.setLineWidth(nt*oe()),R.isLineSegments?zt.setMode(z.LINES):R.isLineLoop?zt.setMode(z.LINE_LOOP):zt.setMode(z.LINE_STRIP)}else R.isPoints?zt.setMode(z.POINTS):R.isSprite&&zt.setMode(z.TRIANGLES);if(R.isBatchedMesh)if(R._multiDrawInstances!==null)zt.renderMultiDrawInstances(R._multiDrawStarts,R._multiDrawCounts,R._multiDrawCount,R._multiDrawInstances);else if(Kt.get("WEBGL_multi_draw"))zt.renderMultiDraw(R._multiDrawStarts,R._multiDrawCounts,R._multiDrawCount);else{const nt=R._multiDrawStarts,ue=R._multiDrawCounts,te=R._multiDrawCount,Ze=K?st.get(K).bytesPerElement:1,Vn=Pt.get(b).currentProgram.getUniforms();for(let Ke=0;Ke<te;Ke++)Vn.setValue(z,"_gl_DrawID",Ke),zt.render(nt[Ke]/Ze,ue[Ke])}else if(R.isInstancedMesh)zt.renderInstances(xt,Ft,R.count);else if($.isInstancedBufferGeometry){const nt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,ue=Math.min($.instanceCount,nt);zt.renderInstances(xt,Ft,ue)}else zt.render(xt,Ft)};function jt(L,B,$){L.transparent===!0&&L.side===qt&&L.forceSinglePass===!1?(L.side=je,L.needsUpdate=!0,ci(L,B,$),L.side=ri,L.needsUpdate=!0,ci(L,B,$),L.side=qt):ci(L,B,$)}this.compile=function(L,B,$=null){$===null&&($=L),p=$t.get($),p.init(B),v.push(p),$.traverseVisible(function(R){R.isLight&&R.layers.test(B.layers)&&(p.pushLight(R),R.castShadow&&p.pushShadow(R))}),L!==$&&L.traverseVisible(function(R){R.isLight&&R.layers.test(B.layers)&&(p.pushLight(R),R.castShadow&&p.pushShadow(R))}),p.setupLights();const b=new Set;return L.traverse(function(R){if(!(R.isMesh||R.isPoints||R.isLine||R.isSprite))return;const G=R.material;if(G)if(Array.isArray(G))for(let O=0;O<G.length;O++){const Y=G[O];jt(Y,$,R),b.add(Y)}else jt(G,$,R),b.add(G)}),v.pop(),p=null,b},this.compileAsync=function(L,B,$=null){const b=this.compile(L,B,$);return new Promise(R=>{function G(){if(b.forEach(function(O){Pt.get(O).currentProgram.isReady()&&b.delete(O)}),b.size===0){R(L);return}setTimeout(G,10)}Kt.get("KHR_parallel_shader_compile")!==null?G():setTimeout(G,10)})};let de=null;function Me(L){de&&de(L)}function Mn(){Te.stop()}function qe(){Te.start()}const Te=new fd;Te.setAnimationLoop(Me),typeof self<"u"&&Te.setContext(self),this.setAnimationLoop=function(L){de=L,J.setAnimationLoop(L),L===null?Te.stop():Te.start()},J.addEventListener("sessionstart",Mn),J.addEventListener("sessionend",qe),this.render=function(L,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(B),B=J.getCamera()),L.isScene===!0&&L.onBeforeRender(x,L,B,C),p=$t.get(L,v.length),p.init(B),v.push(p),Nt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),tt.setFromProjectionMatrix(Nt),Rt=this.localClippingEnabled,dt=ct.init(this.clippingPlanes,Rt),m=St.get(L,y.length),m.init(),y.push(m),J.enabled===!0&&J.isPresenting===!0){const G=x.xr.getDepthSensingMesh();G!==null&&ke(G,B,-1/0,x.sortObjects)}ke(L,B,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(gt,yt),Wt=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Wt&&Dt.addToRenderList(m,L),this.info.render.frame++,dt===!0&&ct.beginShadows();const $=p.state.shadowsArray;Et.render($,L,B),dt===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const b=m.opaque,R=m.transmissive;if(p.setupLights(),B.isArrayCamera){const G=B.cameras;if(R.length>0)for(let O=0,Y=G.length;O<Y;O++){const K=G[O];er(b,R,L,K)}Wt&&Dt.render(L);for(let O=0,Y=G.length;O<Y;O++){const K=G[O];cn(m,L,K,K.viewport)}}else R.length>0&&er(b,R,L,B),Wt&&Dt.render(L),cn(m,L,B);C!==null&&(U.updateMultisampleRenderTarget(C),U.updateRenderTargetMipmap(C)),L.isScene===!0&&L.onAfterRender(x,L,B),le.resetDefaultState(),M=-1,w=null,v.pop(),v.length>0?(p=v[v.length-1],dt===!0&&ct.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function ke(L,B,$,b){if(L.visible===!1)return;if(L.layers.test(B.layers)){if(L.isGroup)$=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(B);else if(L.isLight)p.pushLight(L),L.castShadow&&p.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||tt.intersectsSprite(L)){b&&Bt.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Nt);const O=et.update(L),Y=L.material;Y.visible&&m.push(L,O,Y,$,Bt.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||tt.intersectsObject(L))){const O=et.update(L),Y=L.material;if(b&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),Bt.copy(L.boundingSphere.center)):(O.boundingSphere===null&&O.computeBoundingSphere(),Bt.copy(O.boundingSphere.center)),Bt.applyMatrix4(L.matrixWorld).applyMatrix4(Nt)),Array.isArray(Y)){const K=O.groups;for(let ot=0,ht=K.length;ot<ht;ot++){const Z=K[ot],xt=Y[Z.materialIndex];xt&&xt.visible&&m.push(L,O,xt,$,Bt.z,Z)}}else Y.visible&&m.push(L,O,Y,$,Bt.z,null)}}const G=L.children;for(let O=0,Y=G.length;O<Y;O++)ke(G[O],B,$,b)}function cn(L,B,$,b){const R=L.opaque,G=L.transmissive,O=L.transparent;p.setupLightsView($),dt===!0&&ct.setGlobalState(x.clippingPlanes,$),b&&Mt.viewport(P.copy(b)),R.length>0&&Ei(R,B,$),G.length>0&&Ei(G,B,$),O.length>0&&Ei(O,B,$),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function er(L,B,$,b){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[b.id]===void 0&&(p.state.transmissionRenderTarget[b.id]=new yi(1,1,{generateMipmaps:!0,type:Kt.has("EXT_color_buffer_half_float")||Kt.has("EXT_color_buffer_float")?Ys:Hn,minFilter:gn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ce.workingColorSpace}));const G=p.state.transmissionRenderTarget[b.id],O=b.viewport||P;G.setSize(O.z,O.w);const Y=x.getRenderTarget();x.setRenderTarget(G),x.getClearColor(H),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear(),Wt&&Dt.render($);const K=x.toneMapping;x.toneMapping=si;const ot=b.viewport;if(b.viewport!==void 0&&(b.viewport=void 0),p.setupLightsView(b),dt===!0&&ct.setGlobalState(x.clippingPlanes,b),Ei(L,$,b),U.updateMultisampleRenderTarget(G),U.updateRenderTargetMipmap(G),Kt.has("WEBGL_multisampled_render_to_texture")===!1){let ht=!1;for(let Z=0,xt=B.length;Z<xt;Z++){const Ot=B[Z],Ft=Ot.object,se=Ot.geometry,zt=Ot.material,nt=Ot.group;if(zt.side===qt&&Ft.layers.test(b.layers)){const ue=zt.side;zt.side=je,zt.needsUpdate=!0,nr(Ft,$,b,se,zt,nt),zt.side=ue,zt.needsUpdate=!0,ht=!0}}ht===!0&&(U.updateMultisampleRenderTarget(G),U.updateRenderTargetMipmap(G))}x.setRenderTarget(Y),x.setClearColor(H,X),ot!==void 0&&(b.viewport=ot),x.toneMapping=K}function Ei(L,B,$){const b=B.isScene===!0?B.overrideMaterial:null;for(let R=0,G=L.length;R<G;R++){const O=L[R],Y=O.object,K=O.geometry,ot=b===null?O.material:b,ht=O.group;Y.layers.test($.layers)&&nr(Y,B,$,K,ot,ht)}}function nr(L,B,$,b,R,G){L.onBeforeRender(x,B,$,b,R,G),L.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),R.onBeforeRender(x,B,$,b,L,G),R.transparent===!0&&R.side===qt&&R.forceSinglePass===!1?(R.side=je,R.needsUpdate=!0,x.renderBufferDirect($,B,b,R,L,G),R.side=ri,R.needsUpdate=!0,x.renderBufferDirect($,B,b,R,L,G),R.side=qt):x.renderBufferDirect($,B,b,R,L,G),L.onAfterRender(x,B,$,b,R,G)}function ci(L,B,$){B.isScene!==!0&&(B=re);const b=Pt.get(L),R=p.state.lights,G=p.state.shadowsArray,O=R.state.version,Y=Tt.getParameters(L,R.state,G,B,$),K=Tt.getProgramCacheKey(Y);let ot=b.programs;b.environment=L.isMeshStandardMaterial?B.environment:null,b.fog=B.fog,b.envMap=(L.isMeshStandardMaterial?W:T).get(L.envMap||b.environment),b.envMapRotation=b.environment!==null&&L.envMap===null?B.environmentRotation:L.envMapRotation,ot===void 0&&(L.addEventListener("dispose",mt),ot=new Map,b.programs=ot);let ht=ot.get(K);if(ht!==void 0){if(b.currentProgram===ht&&b.lightsStateVersion===O)return sr(L,Y),ht}else Y.uniforms=Tt.getUniforms(L),L.onBeforeCompile(Y,x),ht=Tt.acquireProgram(Y,K),ot.set(K,ht),b.uniforms=Y.uniforms;const Z=b.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Z.clippingPlanes=ct.uniform),sr(L,Y),b.needsLights=sn(L),b.lightsStateVersion=O,b.needsLights&&(Z.ambientLightColor.value=R.state.ambient,Z.lightProbe.value=R.state.probe,Z.directionalLights.value=R.state.directional,Z.directionalLightShadows.value=R.state.directionalShadow,Z.spotLights.value=R.state.spot,Z.spotLightShadows.value=R.state.spotShadow,Z.rectAreaLights.value=R.state.rectArea,Z.ltc_1.value=R.state.rectAreaLTC1,Z.ltc_2.value=R.state.rectAreaLTC2,Z.pointLights.value=R.state.point,Z.pointLightShadows.value=R.state.pointShadow,Z.hemisphereLights.value=R.state.hemi,Z.directionalShadowMap.value=R.state.directionalShadowMap,Z.directionalShadowMatrix.value=R.state.directionalShadowMatrix,Z.spotShadowMap.value=R.state.spotShadowMap,Z.spotLightMatrix.value=R.state.spotLightMatrix,Z.spotLightMap.value=R.state.spotLightMap,Z.pointShadowMap.value=R.state.pointShadowMap,Z.pointShadowMatrix.value=R.state.pointShadowMatrix),b.currentProgram=ht,b.uniformsList=null,ht}function ir(L){if(L.uniformsList===null){const B=L.currentProgram.getUniforms();L.uniformsList=Qr.seqWithValue(B.seq,L.uniforms)}return L.uniformsList}function sr(L,B){const $=Pt.get(L);$.outputColorSpace=B.outputColorSpace,$.batching=B.batching,$.batchingColor=B.batchingColor,$.instancing=B.instancing,$.instancingColor=B.instancingColor,$.instancingMorph=B.instancingMorph,$.skinning=B.skinning,$.morphTargets=B.morphTargets,$.morphNormals=B.morphNormals,$.morphColors=B.morphColors,$.morphTargetsCount=B.morphTargetsCount,$.numClippingPlanes=B.numClippingPlanes,$.numIntersection=B.numClipIntersection,$.vertexAlphas=B.vertexAlphas,$.vertexTangents=B.vertexTangents,$.toneMapping=B.toneMapping}function rr(L,B,$,b,R){B.isScene!==!0&&(B=re),U.resetTextureUnits();const G=B.fog,O=b.isMeshStandardMaterial?B.environment:null,Y=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:cs,K=(b.isMeshStandardMaterial?W:T).get(b.envMap||O),ot=b.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ht=!!$.attributes.tangent&&(!!b.normalMap||b.anisotropy>0),Z=!!$.morphAttributes.position,xt=!!$.morphAttributes.normal,Ot=!!$.morphAttributes.color;let Ft=si;b.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Ft=x.toneMapping);const se=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,zt=se!==void 0?se.length:0,nt=Pt.get(b),ue=p.state.lights;if(dt===!0&&(Rt===!0||L!==w)){const rn=L===w&&b.id===M;ct.setState(b,L,rn)}let te=!1;b.version===nt.__version?(nt.needsLights&&nt.lightsStateVersion!==ue.state.version||nt.outputColorSpace!==Y||R.isBatchedMesh&&nt.batching===!1||!R.isBatchedMesh&&nt.batching===!0||R.isBatchedMesh&&nt.batchingColor===!0&&R.colorTexture===null||R.isBatchedMesh&&nt.batchingColor===!1&&R.colorTexture!==null||R.isInstancedMesh&&nt.instancing===!1||!R.isInstancedMesh&&nt.instancing===!0||R.isSkinnedMesh&&nt.skinning===!1||!R.isSkinnedMesh&&nt.skinning===!0||R.isInstancedMesh&&nt.instancingColor===!0&&R.instanceColor===null||R.isInstancedMesh&&nt.instancingColor===!1&&R.instanceColor!==null||R.isInstancedMesh&&nt.instancingMorph===!0&&R.morphTexture===null||R.isInstancedMesh&&nt.instancingMorph===!1&&R.morphTexture!==null||nt.envMap!==K||b.fog===!0&&nt.fog!==G||nt.numClippingPlanes!==void 0&&(nt.numClippingPlanes!==ct.numPlanes||nt.numIntersection!==ct.numIntersection)||nt.vertexAlphas!==ot||nt.vertexTangents!==ht||nt.morphTargets!==Z||nt.morphNormals!==xt||nt.morphColors!==Ot||nt.toneMapping!==Ft||nt.morphTargetsCount!==zt)&&(te=!0):(te=!0,nt.__version=b.version);let Ze=nt.currentProgram;te===!0&&(Ze=ci(b,B,R));let Vn=!1,Ke=!1,fs=!1;const ve=Ze.getUniforms(),wn=nt.uniforms;if(Mt.useProgram(Ze.program)&&(Vn=!0,Ke=!0,fs=!0),b.id!==M&&(M=b.id,Ke=!0),Vn||w!==L){Mt.buffers.depth.getReversed()?(_t.copy(L.projectionMatrix),Jf(_t),Qf(_t),ve.setValue(z,"projectionMatrix",_t)):ve.setValue(z,"projectionMatrix",L.projectionMatrix),ve.setValue(z,"viewMatrix",L.matrixWorldInverse);const Wn=ve.map.cameraPosition;Wn!==void 0&&Wn.setValue(z,Gt.setFromMatrixPosition(L.matrixWorld)),Jt.logarithmicDepthBuffer&&ve.setValue(z,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(b.isMeshPhongMaterial||b.isMeshToonMaterial||b.isMeshLambertMaterial||b.isMeshBasicMaterial||b.isMeshStandardMaterial||b.isShaderMaterial)&&ve.setValue(z,"isOrthographic",L.isOrthographicCamera===!0),w!==L&&(w=L,Ke=!0,fs=!0)}if(R.isSkinnedMesh){ve.setOptional(z,R,"bindMatrix"),ve.setOptional(z,R,"bindMatrixInverse");const rn=R.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),ve.setValue(z,"boneTexture",rn.boneTexture,U))}R.isBatchedMesh&&(ve.setOptional(z,R,"batchingTexture"),ve.setValue(z,"batchingTexture",R._matricesTexture,U),ve.setOptional(z,R,"batchingIdTexture"),ve.setValue(z,"batchingIdTexture",R._indirectTexture,U),ve.setOptional(z,R,"batchingColorTexture"),R._colorsTexture!==null&&ve.setValue(z,"batchingColorTexture",R._colorsTexture,U));const ps=$.morphAttributes;if((ps.position!==void 0||ps.normal!==void 0||ps.color!==void 0)&&Ut.update(R,$,Ze),(Ke||nt.receiveShadow!==R.receiveShadow)&&(nt.receiveShadow=R.receiveShadow,ve.setValue(z,"receiveShadow",R.receiveShadow)),b.isMeshGouraudMaterial&&b.envMap!==null&&(wn.envMap.value=K,wn.flipEnvMap.value=K.isCubeTexture&&K.isRenderTargetTexture===!1?-1:1),b.isMeshStandardMaterial&&b.envMap===null&&B.environment!==null&&(wn.envMapIntensity.value=B.environmentIntensity),Ke&&(ve.setValue(z,"toneMappingExposure",x.toneMappingExposure),nt.needsLights&&Rn(wn,fs),G&&b.fog===!0&&vt.refreshFogUniforms(wn,G),vt.refreshMaterialUniforms(wn,b,j,it,p.state.transmissionRenderTarget[L.id]),Qr.upload(z,ir(nt),wn,U)),b.isShaderMaterial&&b.uniformsNeedUpdate===!0&&(Qr.upload(z,ir(nt),wn,U),b.uniformsNeedUpdate=!1),b.isSpriteMaterial&&ve.setValue(z,"center",R.center),ve.setValue(z,"modelViewMatrix",R.modelViewMatrix),ve.setValue(z,"normalMatrix",R.normalMatrix),ve.setValue(z,"modelMatrix",R.matrixWorld),b.isShaderMaterial||b.isRawShaderMaterial){const rn=b.uniformsGroups;for(let Wn=0,Xn=rn.length;Wn<Xn;Wn++){const Kl=rn[Wn];F.update(Kl,Ze),F.bind(Kl,Ze)}}return Ze}function Rn(L,B){L.ambientLightColor.needsUpdate=B,L.lightProbe.needsUpdate=B,L.directionalLights.needsUpdate=B,L.directionalLightShadows.needsUpdate=B,L.pointLights.needsUpdate=B,L.pointLightShadows.needsUpdate=B,L.spotLights.needsUpdate=B,L.spotLightShadows.needsUpdate=B,L.rectAreaLights.needsUpdate=B,L.hemisphereLights.needsUpdate=B}function sn(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(L,B,$){Pt.get(L.texture).__webglTexture=B,Pt.get(L.depthTexture).__webglTexture=$;const b=Pt.get(L);b.__hasExternalTextures=!0,b.__autoAllocateDepthBuffer=$===void 0,b.__autoAllocateDepthBuffer||Kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),b.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,B){const $=Pt.get(L);$.__webglFramebuffer=B,$.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(L,B=0,$=0){C=L,S=B,A=$;let b=!0,R=null,G=!1,O=!1;if(L){const K=Pt.get(L);if(K.__useDefaultFramebuffer!==void 0)Mt.bindFramebuffer(z.FRAMEBUFFER,null),b=!1;else if(K.__webglFramebuffer===void 0)U.setupRenderTarget(L);else if(K.__hasExternalTextures)U.rebindTextures(L,Pt.get(L.texture).__webglTexture,Pt.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){const Z=L.depthTexture;if(K.__boundDepthTexture!==Z){if(Z!==null&&Pt.has(Z)&&(L.width!==Z.image.width||L.height!==Z.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(L)}}const ot=L.texture;(ot.isData3DTexture||ot.isDataArrayTexture||ot.isCompressedArrayTexture)&&(O=!0);const ht=Pt.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(ht[B])?R=ht[B][$]:R=ht[B],G=!0):L.samples>0&&U.useMultisampledRTT(L)===!1?R=Pt.get(L).__webglMultisampledFramebuffer:Array.isArray(ht)?R=ht[$]:R=ht,P.copy(L.viewport),I.copy(L.scissor),N=L.scissorTest}else P.copy(Ct).multiplyScalar(j).floor(),I.copy(Vt).multiplyScalar(j).floor(),N=ae;if(Mt.bindFramebuffer(z.FRAMEBUFFER,R)&&b&&Mt.drawBuffers(L,R),Mt.viewport(P),Mt.scissor(I),Mt.setScissorTest(N),G){const K=Pt.get(L.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+B,K.__webglTexture,$)}else if(O){const K=Pt.get(L.texture),ot=B||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,K.__webglTexture,$||0,ot)}M=-1},this.readRenderTargetPixels=function(L,B,$,b,R,G,O){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Y=Pt.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&O!==void 0&&(Y=Y[O]),Y){Mt.bindFramebuffer(z.FRAMEBUFFER,Y);try{const K=L.texture,ot=K.format,ht=K.type;if(!Jt.textureFormatReadable(ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Jt.textureTypeReadable(ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=L.width-b&&$>=0&&$<=L.height-R&&z.readPixels(B,$,b,R,Xt.convert(ot),Xt.convert(ht),G)}finally{const K=C!==null?Pt.get(C).__webglFramebuffer:null;Mt.bindFramebuffer(z.FRAMEBUFFER,K)}}},this.readRenderTargetPixelsAsync=async function(L,B,$,b,R,G,O){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Y=Pt.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&O!==void 0&&(Y=Y[O]),Y){const K=L.texture,ot=K.format,ht=K.type;if(!Jt.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Jt.textureTypeReadable(ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=L.width-b&&$>=0&&$<=L.height-R){Mt.bindFramebuffer(z.FRAMEBUFFER,Y);const Z=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Z),z.bufferData(z.PIXEL_PACK_BUFFER,G.byteLength,z.STREAM_READ),z.readPixels(B,$,b,R,Xt.convert(ot),Xt.convert(ht),0);const xt=C!==null?Pt.get(C).__webglFramebuffer:null;Mt.bindFramebuffer(z.FRAMEBUFFER,xt);const Ot=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Kf(z,Ot,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Z),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,G),z.deleteBuffer(Z),z.deleteSync(Ot),G}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(L,B=null,$=0){L.isTexture!==!0&&(Ls("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,L=arguments[1]);const b=Math.pow(2,-$),R=Math.floor(L.image.width*b),G=Math.floor(L.image.height*b),O=B!==null?B.x:0,Y=B!==null?B.y:0;U.setTexture2D(L,0),z.copyTexSubImage2D(z.TEXTURE_2D,$,0,0,O,Y,R,G),Mt.unbindTexture()},this.copyTextureToTexture=function(L,B,$=null,b=null,R=0){L.isTexture!==!0&&(Ls("WebGLRenderer: copyTextureToTexture function signature has changed."),b=arguments[0]||null,L=arguments[1],B=arguments[2],R=arguments[3]||0,$=null);let G,O,Y,K,ot,ht,Z,xt,Ot;const Ft=L.isCompressedTexture?L.mipmaps[R]:L.image;$!==null?(G=$.max.x-$.min.x,O=$.max.y-$.min.y,Y=$.isBox3?$.max.z-$.min.z:1,K=$.min.x,ot=$.min.y,ht=$.isBox3?$.min.z:0):(G=Ft.width,O=Ft.height,Y=Ft.depth||1,K=0,ot=0,ht=0),b!==null?(Z=b.x,xt=b.y,Ot=b.z):(Z=0,xt=0,Ot=0);const se=Xt.convert(B.format),zt=Xt.convert(B.type);let nt;B.isData3DTexture?(U.setTexture3D(B,0),nt=z.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(U.setTexture2DArray(B,0),nt=z.TEXTURE_2D_ARRAY):(U.setTexture2D(B,0),nt=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,B.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,B.unpackAlignment);const ue=z.getParameter(z.UNPACK_ROW_LENGTH),te=z.getParameter(z.UNPACK_IMAGE_HEIGHT),Ze=z.getParameter(z.UNPACK_SKIP_PIXELS),Vn=z.getParameter(z.UNPACK_SKIP_ROWS),Ke=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,Ft.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ft.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,K),z.pixelStorei(z.UNPACK_SKIP_ROWS,ot),z.pixelStorei(z.UNPACK_SKIP_IMAGES,ht);const fs=L.isDataArrayTexture||L.isData3DTexture,ve=B.isDataArrayTexture||B.isData3DTexture;if(L.isRenderTargetTexture||L.isDepthTexture){const wn=Pt.get(L),ps=Pt.get(B),rn=Pt.get(wn.__renderTarget),Wn=Pt.get(ps.__renderTarget);Mt.bindFramebuffer(z.READ_FRAMEBUFFER,rn.__webglFramebuffer),Mt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Wn.__webglFramebuffer);for(let Xn=0;Xn<Y;Xn++)fs&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Pt.get(L).__webglTexture,R,ht+Xn),L.isDepthTexture?(ve&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Pt.get(B).__webglTexture,R,Ot+Xn),z.blitFramebuffer(K,ot,G,O,Z,xt,G,O,z.DEPTH_BUFFER_BIT,z.NEAREST)):ve?z.copyTexSubImage3D(nt,R,Z,xt,Ot+Xn,K,ot,G,O):z.copyTexSubImage2D(nt,R,Z,xt,Ot+Xn,K,ot,G,O);Mt.bindFramebuffer(z.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else ve?L.isDataTexture||L.isData3DTexture?z.texSubImage3D(nt,R,Z,xt,Ot,G,O,Y,se,zt,Ft.data):B.isCompressedArrayTexture?z.compressedTexSubImage3D(nt,R,Z,xt,Ot,G,O,Y,se,Ft.data):z.texSubImage3D(nt,R,Z,xt,Ot,G,O,Y,se,zt,Ft):L.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,R,Z,xt,G,O,se,zt,Ft.data):L.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,R,Z,xt,Ft.width,Ft.height,se,Ft.data):z.texSubImage2D(z.TEXTURE_2D,R,Z,xt,G,O,se,zt,Ft);z.pixelStorei(z.UNPACK_ROW_LENGTH,ue),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,te),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Ze),z.pixelStorei(z.UNPACK_SKIP_ROWS,Vn),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Ke),R===0&&B.generateMipmaps&&z.generateMipmap(nt),Mt.unbindTexture()},this.copyTextureToTexture3D=function(L,B,$=null,b=null,R=0){return L.isTexture!==!0&&(Ls("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,b=arguments[1]||null,L=arguments[2],B=arguments[3],R=arguments[4]||0),Ls('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(L,B,$,b,R)},this.initRenderTarget=function(L){Pt.get(L).__webglFramebuffer===void 0&&U.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?U.setTextureCube(L,0):L.isData3DTexture?U.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?U.setTexture2DArray(L,0):U.setTexture2D(L,0),Mt.unbindTexture()},this.resetState=function(){S=0,A=0,C=null,Mt.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}}class Nl{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new kt(t),this.density=e}clone(){return new Nl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Mi{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new kt(t),this.near=e,this.far=n}clone(){return new Mi(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class cx extends Le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class hx{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=dl,this.updateRanges=[],this.version=0,this.uuid=zn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const $e=new k;class oo{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix4(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyNormalMatrix(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.transformDirection(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Tn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Tn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Tn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Tn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array),r=me(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Ve(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new oo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class to extends li{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Hi;const vs=new k,Gi=new k,Vi=new k,Wi=new wt,bs=new wt,bd=new xe,Ar=new k,Ms=new k,Rr=new k,Yc=new wt,Qo=new wt,jc=new wt;class ta extends Le{constructor(t=new to){if(super(),this.isSprite=!0,this.type="Sprite",Hi===void 0){Hi=new Se;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new hx(e,5);Hi.setIndex([0,1,2,0,2,3]),Hi.setAttribute("position",new oo(n,3,0,!1)),Hi.setAttribute("uv",new oo(n,2,3,!1))}this.geometry=Hi,this.material=t,this.center=new wt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gi.setFromMatrixScale(this.matrixWorld),bd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Vi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gi.multiplyScalar(-Vi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Cr(Ar.set(-.5,-.5,0),Vi,a,Gi,i,r),Cr(Ms.set(.5,-.5,0),Vi,a,Gi,i,r),Cr(Rr.set(.5,.5,0),Vi,a,Gi,i,r),Yc.set(0,0),Qo.set(1,0),jc.set(1,1);let o=t.ray.intersectTriangle(Ar,Ms,Rr,!1,vs);if(o===null&&(Cr(Ms.set(-.5,.5,0),Vi,a,Gi,i,r),Qo.set(0,1),o=t.ray.intersectTriangle(Ar,Rr,Ms,!1,vs),o===null))return;const l=t.ray.origin.distanceTo(vs);l<t.near||l>t.far||e.push({distance:l,point:vs.clone(),uv:ln.getInterpolation(vs,Ar,Ms,Rr,Yc,Qo,jc,new wt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Cr(s,t,e,n,i,r){Wi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(bs.x=r*Wi.x-i*Wi.y,bs.y=i*Wi.x+r*Wi.y):bs.copy(Wi),s.copy(t),s.x+=bs.x,s.y+=bs.y,s.applyMatrix4(bd)}class Md extends li{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Zc=new xe,pl=new Ul,Lr=new _o,Pr=new k;class dx extends Le{constructor(t=new Se,e=new Md){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere),Lr.applyMatrix4(i),Lr.radius+=r,t.ray.intersectsSphere(Lr)===!1)return;Zc.copy(i).invert(),pl.copy(t.ray).applyMatrix4(Zc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,_=f;g<_;g++){const m=c.getX(g);Pr.fromBufferAttribute(d,m),Kc(Pr,m,l,i,t,e,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,_=f;g<_;g++)Pr.fromBufferAttribute(d,g),Kc(Pr,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Kc(s,t,e,n,i,r,a){const o=pl.distanceSqToPoint(s);if(o<e){const l=new k;pl.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class pn extends Xe{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class En{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],u=n[i+1]-h,f=(a-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new wt:new k);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new k,i=[],r=[],a=[],o=new k,l=new xe;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new k)}r[0]=new k,a[0]=new k;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ge(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Ge(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Fl extends En{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new wt){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ux extends Fl{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ol(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,i(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Ur=new k,ea=new Ol,na=new Ol,ia=new Ol;class fx extends En{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new k){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Ur.subVectors(i[0],i[1]).add(i[0]),c=Ur);const d=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Ur.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ur),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),ea.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,_,m),na.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,_,m),ia.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(ea.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),na.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),ia.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(ea.calc(l),na.calc(l),ia.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new k().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Jc(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function px(s,t){const e=1-s;return e*e*t}function mx(s,t){return 2*(1-s)*s*t}function gx(s,t){return s*s*t}function ks(s,t,e,n){return px(s,t)+mx(s,e)+gx(s,n)}function _x(s,t){const e=1-s;return e*e*e*t}function xx(s,t){const e=1-s;return 3*e*e*s*t}function vx(s,t){return 3*(1-s)*s*s*t}function bx(s,t){return s*s*s*t}function Ns(s,t,e,n,i){return _x(s,t)+xx(s,e)+vx(s,n)+bx(s,i)}class wd extends En{constructor(t=new wt,e=new wt,n=new wt,i=new wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new wt){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ns(t,i.x,r.x,a.x,o.x),Ns(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Mx extends En{constructor(t=new k,e=new k,n=new k,i=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new k){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ns(t,i.x,r.x,a.x,o.x),Ns(t,i.y,r.y,a.y,o.y),Ns(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class yd extends En{constructor(t=new wt,e=new wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new wt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class wx extends En{constructor(t=new k,e=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new k){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new k){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sd extends En{constructor(t=new wt,e=new wt,n=new wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new wt){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ks(t,i.x,r.x,a.x),ks(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yx extends En{constructor(t=new k,e=new k,n=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new k){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ks(t,i.x,r.x,a.x),ks(t,i.y,r.y,a.y),ks(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Td extends En{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new wt){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(Jc(o,l.x,c.x,h.x,d.x),Jc(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new wt().fromArray(i))}return this}}var Qc=Object.freeze({__proto__:null,ArcCurve:ux,CatmullRomCurve3:fx,CubicBezierCurve:wd,CubicBezierCurve3:Mx,EllipseCurve:Fl,LineCurve:yd,LineCurve3:wx,QuadraticBezierCurve:Sd,QuadraticBezierCurve3:yx,SplineCurve:Td});class Sx extends En{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Qc[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Qc[i.type]().fromJSON(i))}return this}}class ml extends Sx{constructor(t){super(),this.type="Path",this.currentPoint=new wt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new yd(this.currentPoint.clone(),new wt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Sd(this.currentPoint.clone(),new wt(t,e),new wt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new wd(this.currentPoint.clone(),new wt(t,e),new wt(n,i),new wt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Td(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new Fl(t,e,n,i,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Fs extends Se{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new k,h=new wt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new he(a,3)),this.setAttribute("normal",new he(o,3)),this.setAttribute("uv",new he(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fs(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class _e extends Se{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const _=[],m=n/2;let p=0;y(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new he(d,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(f,2));function y(){const x=new k,E=new k;let S=0;const A=(e-t)/n;for(let C=0;C<=r;C++){const M=[],w=C/r,P=w*(e-t)+t;for(let I=0;I<=i;I++){const N=I/i,H=N*l+o,X=Math.sin(H),q=Math.cos(H);E.x=P*X,E.y=-w*n+m,E.z=P*q,d.push(E.x,E.y,E.z),x.set(X,A,q).normalize(),u.push(x.x,x.y,x.z),f.push(N,1-w),M.push(g++)}_.push(M)}for(let C=0;C<i;C++)for(let M=0;M<r;M++){const w=_[M][C],P=_[M+1][C],I=_[M+1][C+1],N=_[M][C+1];(t>0||M!==0)&&(h.push(w,P,N),S+=3),(e>0||M!==r-1)&&(h.push(P,I,N),S+=3)}c.addGroup(p,S,0),p+=S}function v(x){const E=g,S=new wt,A=new k;let C=0;const M=x===!0?t:e,w=x===!0?1:-1;for(let I=1;I<=i;I++)d.push(0,m*w,0),u.push(0,w,0),f.push(.5,.5),g++;const P=g;for(let I=0;I<=i;I++){const H=I/i*l+o,X=Math.cos(H),q=Math.sin(H);A.x=M*q,A.y=m*w,A.z=M*X,d.push(A.x,A.y,A.z),u.push(0,w,0),S.x=X*.5+.5,S.y=q*.5*w+.5,f.push(S.x,S.y),g++}for(let I=0;I<i;I++){const N=E+I,H=P+I;x===!0?h.push(H,H+1,N):h.push(H+1,H,N),C+=3}c.addGroup(p,C,x===!0?1:2),p+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Nn extends _e{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Nn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class zl extends Se{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new he(r,3)),this.setAttribute("normal",new he(r.slice(),3)),this.setAttribute("uv",new he(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const v=new k,x=new k,E=new k;for(let S=0;S<e.length;S+=3)f(e[S+0],v),f(e[S+1],x),f(e[S+2],E),l(v,x,E,y)}function l(y,v,x,E){const S=E+1,A=[];for(let C=0;C<=S;C++){A[C]=[];const M=y.clone().lerp(x,C/S),w=v.clone().lerp(x,C/S),P=S-C;for(let I=0;I<=P;I++)I===0&&C===S?A[C][I]=M:A[C][I]=M.clone().lerp(w,I/P)}for(let C=0;C<S;C++)for(let M=0;M<2*(S-C)-1;M++){const w=Math.floor(M/2);M%2===0?(u(A[C][w+1]),u(A[C+1][w]),u(A[C][w])):(u(A[C][w+1]),u(A[C+1][w+1]),u(A[C+1][w]))}}function c(y){const v=new k;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(y),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){const y=new k;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];const x=m(y)/2/Math.PI+.5,E=p(y)/Math.PI+.5;a.push(x,1-E)}g(),d()}function d(){for(let y=0;y<a.length;y+=6){const v=a[y+0],x=a[y+2],E=a[y+4],S=Math.max(v,x,E),A=Math.min(v,x,E);S>.9&&A<.1&&(v<.2&&(a[y+0]+=1),x<.2&&(a[y+2]+=1),E<.2&&(a[y+4]+=1))}}function u(y){r.push(y.x,y.y,y.z)}function f(y,v){const x=y*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function g(){const y=new k,v=new k,x=new k,E=new k,S=new wt,A=new wt,C=new wt;for(let M=0,w=0;M<r.length;M+=9,w+=6){y.set(r[M+0],r[M+1],r[M+2]),v.set(r[M+3],r[M+4],r[M+5]),x.set(r[M+6],r[M+7],r[M+8]),S.set(a[w+0],a[w+1]),A.set(a[w+2],a[w+3]),C.set(a[w+4],a[w+5]),E.copy(y).add(v).add(x).divideScalar(3);const P=m(E);_(S,w+0,y,P),_(A,w+2,v,P),_(C,w+4,x,P)}}function _(y,v,x,E){E<0&&y.x===1&&(a[v]=y.x-1),x.x===0&&x.z===0&&(a[v]=E/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zl(t.vertices,t.indices,t.radius,t.details)}}class Bl extends zl{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Bl(t.radius,t.detail)}}class Ed extends ml{constructor(t){super(t),this.uuid=zn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new ml().fromJSON(i))}return this}}const Tx={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Ad(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,d,u,f;if(n&&(r=Lx(s,t,r,e)),s.length>80*e){o=c=s[0],l=h=s[1];for(let g=e;g<i;g+=e)d=s[g],u=s[g+1],d<o&&(o=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return Vs(r,a,e,o,l,f,0),a}};function Ad(s,t,e,n,i){let r,a;if(i===Hx(s,t,e,n)>0)for(r=t;r<e;r+=n)a=th(r,s[r],s[r+1],a);else for(r=e-n;r>=t;r-=n)a=th(r,s[r],s[r+1],a);return a&&vo(a,a.next)&&(Xs(a),a=a.next),a}function Si(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(vo(e,e.next)||ye(e.prev,e,e.next)===0)){if(Xs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Vs(s,t,e,n,i,r,a){if(!s)return;!a&&r&&kx(s,n,i,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Ax(s,n,i,r):Ex(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),Xs(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Rx(Si(s),t,e),Vs(s,t,e,n,i,r,2)):a===2&&Cx(s,t,e,n,i,r):Vs(Si(s),t,e,n,i,r,1);break}}}function Ex(s){const t=s.prev,e=s,n=s.next;if(ye(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=i<r?i<a?i:a:r<a?r:a,d=o<l?o<c?o:c:l<c?l:c,u=i>r?i>a?i:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&ji(i,o,r,l,a,c,g.x,g.y)&&ye(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ax(s,t,e,n){const i=s.prev,r=s,a=s.next;if(ye(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,d=r.y,u=a.y,f=o<l?o<c?o:c:l<c?l:c,g=h<d?h<u?h:u:d<u?d:u,_=o>l?o>c?o:c:l>c?l:c,m=h>d?h>u?h:u:d>u?d:u,p=gl(f,g,t,e,n),y=gl(_,m,t,e,n);let v=s.prevZ,x=s.nextZ;for(;v&&v.z>=p&&x&&x.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==i&&v!==a&&ji(o,h,l,d,c,u,v.x,v.y)&&ye(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&ji(o,h,l,d,c,u,x.x,x.y)&&ye(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==i&&v!==a&&ji(o,h,l,d,c,u,v.x,v.y)&&ye(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&ji(o,h,l,d,c,u,x.x,x.y)&&ye(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Rx(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!vo(i,r)&&Rd(i,n,n.next,r)&&Ws(i,r)&&Ws(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Xs(n),Xs(n.next),n=s=r),n=n.next}while(n!==s);return Si(n)}function Cx(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ox(a,o)){let l=Cd(a,o);a=Si(a,a.next),l=Si(l,l.next),Vs(a,t,e,n,i,r,0),Vs(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Lx(s,t,e,n){const i=[];let r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Ad(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Fx(c));for(i.sort(Px),r=0;r<i.length;r++)e=Ux(i[r],e);return e}function Px(s,t){return s.x-t.x}function Ux(s,t){const e=Dx(s,t);if(!e)return t;const n=Cd(e,s);return Si(n,n.next),Si(e,e.next)}function Dx(s,t){let e=t,n=-1/0,i;const r=s.x,a=s.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const u=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,i=e.x<e.next.x?e:e.next,u===r))return i}e=e.next}while(e!==t);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,d;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&ji(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(d=Math.abs(a-e.y)/(r-e.x),Ws(e,s)&&(d<h||d===h&&(e.x>i.x||e.x===i.x&&Ix(i,e)))&&(i=e,h=d)),e=e.next;while(e!==o);return i}function Ix(s,t){return ye(s.prev,s,t.prev)<0&&ye(t.next,s,s.next)<0}function kx(s,t,e,n){let i=s;do i.z===0&&(i.z=gl(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Nx(i)}function Nx(s){let t,e,n,i,r,a,o,l,c=1;do{for(e=s,s=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(a>1);return s}function gl(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Fx(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function ji(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Ox(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!zx(s,t)&&(Ws(s,t)&&Ws(t,s)&&Bx(s,t)&&(ye(s.prev,s,t.prev)||ye(s,t.prev,t))||vo(s,t)&&ye(s.prev,s,s.next)>0&&ye(t.prev,t,t.next)>0)}function ye(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function vo(s,t){return s.x===t.x&&s.y===t.y}function Rd(s,t,e,n){const i=Ir(ye(s,t,e)),r=Ir(ye(s,t,n)),a=Ir(ye(e,n,s)),o=Ir(ye(e,n,t));return!!(i!==r&&a!==o||i===0&&Dr(s,e,t)||r===0&&Dr(s,n,t)||a===0&&Dr(e,s,n)||o===0&&Dr(e,t,n))}function Dr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Ir(s){return s>0?1:s<0?-1:0}function zx(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Rd(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Ws(s,t){return ye(s.prev,s,s.next)<0?ye(s,t,s.next)>=0&&ye(s,s.prev,t)>=0:ye(s,t,s.prev)<0||ye(s,s.next,t)<0}function Bx(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Cd(s,t){const e=new _l(s.i,s.x,s.y),n=new _l(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function th(s,t,e,n){const i=new _l(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Xs(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function _l(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Hx(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Os{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Os.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];eh(t),nh(n,t);let a=t.length;e.forEach(eh);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,nh(n,e[l]);const o=Tx.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function eh(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function nh(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Hl extends Se{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let d=t;const u=(e-t)/i,f=new k,g=new wt;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const y=p+m,v=y,x=y+n+1,E=y+n+2,S=y+1;o.push(v,x,S),o.push(x,E,S)}}this.setIndex(o),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(c,3)),this.setAttribute("uv",new he(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Gl extends Se{constructor(t=new Ed([new wt(0,.5),new wt(-.5,-.5),new wt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new he(i,3)),this.setAttribute("normal",new he(r,3)),this.setAttribute("uv",new he(a,2));function c(h){const d=i.length/3,u=h.extractPoints(e);let f=u.shape;const g=u.holes;Os.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const y=g[m];Os.isClockWise(y)===!0&&(g[m]=y.reverse())}const _=Os.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const y=g[m];f=f.concat(y)}for(let m=0,p=f.length;m<p;m++){const y=f[m];i.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let m=0,p=_.length;m<p;m++){const y=_[m],v=y[0]+d,x=y[1]+d,E=y[2]+d;n.push(v,x,E),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Gx(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new Gl(n,t.curveSegments)}}function Gx(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class Vl extends Se{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new k,u=new k,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const y=[],v=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let E=0;E<=e;E++){const S=E/e;d.x=-t*Math.cos(i+S*r)*Math.sin(a+v*o),d.y=t*Math.cos(a+v*o),d.z=t*Math.sin(i+S*r)*Math.sin(a+v*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(S+x,1-v),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const v=h[p][y+1],x=h[p][y],E=h[p+1][y],S=h[p+1][y+1];(p!==0||a>0)&&f.push(v,x,S),(p!==n-1||l<Math.PI)&&f.push(x,E,S)}this.setIndex(f),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(_,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vl(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Vx extends li{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new kt(16777215),this.specular=new kt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pl,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ft extends li{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pl,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const ih={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Wx{constructor(t,e,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Xx=new Wx;class Wl{constructor(t){this.manager=t!==void 0?t:Xx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Wl.DEFAULT_MATERIAL_NAME="__DEFAULT";class qx extends Wl{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=ih.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=Gs("img");function l(){h(),ih.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(d){h(),i&&i(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class Ld extends Wl{constructor(t){super(t)}load(t,e,n,i){const r=new Xe,a=new qx(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class bo extends Le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class ws extends bo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const sa=new xe,sh=new k,rh=new k;class Pd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new wt(512,512),this.map=null,this.mapPass=null,this.matrix=new xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Il,this._frameExtents=new wt(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;sh.setFromMatrixPosition(t.matrixWorld),e.position.copy(sh),rh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(rh),e.updateMatrixWorld(),sa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(sa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const oh=new xe,ys=new k,ra=new k;class $x extends Pd{constructor(){super(new en(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new wt(4,2),this._viewportCount=6,this._viewports=[new ge(2,1,1,1),new ge(0,1,1,1),new ge(3,1,1,1),new ge(1,1,1,1),new ge(3,0,1,1),new ge(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ys.setFromMatrixPosition(t.matrixWorld),n.position.copy(ys),ra.copy(n.position),ra.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ra),n.updateMatrixWorld(),i.makeTranslation(-ys.x,-ys.y,-ys.z),oh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(oh)}}class fn extends bo{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new $x}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Yx extends Pd{constructor(){super(new pd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oa extends bo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.shadow=new Yx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ss extends bo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const ah=new xe;class jx{constructor(t,e,n=0,i=1/0){this.ray=new Ul(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Dl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ah.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ah),this}intersectObject(t,e=!0,n=[]){return xl(t,this,n,e),n.sort(lh),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)xl(t[i],this,n,e);return n.sort(lh),n}}function lh(s,t){return s.distance-t.distance}function xl(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)xl(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sl);const D=4,Jn=3.2,aa=2,kr=1.7,ch=.6,la=2,hh=.35,dh=1.65,Nr=2.7,Zx=1,Kx=1,Jx=1.85,Ud=260,Qx=210,Ts=8884384,Fr=6e5,Or=.34,Ks=["MMMMM##########","MMMMM##########","MMSMM##########","MMTMM##########","MMTMM##########","MMTMM##########","##.........####","##...........##","##...........##","##...........##","##...........##","##...........##","##...........##","######...######","######...######","######.P.######","#######F#######"],He=Ks.length,tn=Ks[0].length;function be(s,t){if(t<0||t>=He||s<0||s>=tn)return"building";const e=Ks[t][s];return e==="#"?"building":e==="o"?"barrel":e==="M"?"mountain":e==="T"?"tunnel":e==="S"?"stairs":e==="F"?"forestgate":"street"}function uh(s,t){const e=be(s,t);return e==="tunnel"||e==="stairs"}function ca(s,t){const e=be(s,t);return e==="street"||e==="barrel"||e==="tunnel"||e==="stairs"||e==="forestgate"}function fh(){for(let s=0;s<He;s++){const t=Ks[s].indexOf("P");if(t>=0)return{col:t,row:s}}return{col:1,row:1}}function ph(){for(let s=0;s<He;s++){const t=Ks[s].indexOf("F");if(t>=0)return{col:t,row:s}}return{col:7,row:He-1}}const Js=["###################################","###################################","##T...f...TrTTbT.NTTTTTT.T...bf.T##","##T...TTTf.TTf..T===TTfT..Tr.TTTf##","##Tb.f.TTTT.......T==.TTTrTT...T.##","##f....T..T..TrT.bT==.b.TTTTT.T.T##","##.b..T..T..r.T.T.T=.T....TTTTTTT##","##......TT....T.rk.=TT..TfTb..T..##","##frT..TTT.T...T.rT===.bT..T.TT.T##","##.f.kT.TT.rT..rT.==r.TTfT.fTr..T##","##TT.TTTTrTTTTTT.==...TT..T.TTT.T##","##T..TTTbTT.bT....=.Tff..TbTf.TT.##","##T..Tfb..b.k.T..======.TTTT....f##","##.TTT.T....rTT..=..Tk..TT..T.T..##","##...TT......bkT.=.kT.f...r.T.TT.##","##...TfT...T.T.r==..TTTbT..k..TT.##","##.TTTT.T..r.bbT=T.T...r....TTb.T##","##.f.T..T..TTf..===.T.TT.....TrbT##","##..TTTbTT.bT.T===TTTT.bT.......T##","##.fk.T.T....TTT.=.....T...rT.TTT##","##...T..T.b.TTkT==.TT.TfTf...TT..##","##.rTT..TTT.Tr.=====rT....T..TT=E##","##r.TT.T..TT..T===TbTTbTT...T.r.=##","##.TT.TfT....TT.T=rf.rTT.T...T===##","##T....rf.T..bT..==..TfT..Tk=====##","##T..Tff.TrTTTT...==.TT..T..=Tk.T##","##T.TTb==========j===========..Tf##","##..TT==.TfTT.T.==...r.TTTTrTT.bb##","##T.b==TT.rr.Tr..==.TT.TTT.TT..Tb##","##T======.TTr..T.==T.T...k.f.T...##","##===.brb.....bTT=.TT.T..r.T.T..T##","##W==TT.T.r.rTr===....rf.ffb.TTTT##","##..T.T.....k..===.Tk.Tr.Tf.f..TT##","##TT..TTT.T.TT==TTTrTTk.r..T.T.r.##","##T......r..TT=T.TTT.TTT.rf...T.T##","##.r....T.T.TT=TTT..TTkr.T.T..bbT##","##rk....fT.T.T==.rrb..T..r.T..Tr.##","##TTTb..Tf....=TbTrT..T..TTrT..f.##","##...T.b....TT====fT..T.T..T.T...##","##T..........T...=..Tf.T.T..T..fk##","##r.T..Tf........=T.....T...TTb.T##","##TTT.TTbT.bTT...===.T.......TbT.##","##.T.T....TTTbT..==T.T......TTTTT##","##.T..T...TTTf.T====..k..T.b..krT##","##bT.TTT.kTr.....==.TT.T.TTb.T.r.##","##TT.TbrT....T..r==T...bb.f..T...##","##..b.TTTrT.rf=s.===TTf..T.TTT.rr##","##..rTT.TTTTTr.r.P...TTT..T..T.b.##","#################=#################","#################V#################"],ts=Js.length,Us=Js[0].length;function ti(s,t){if(t<0||t>=ts||s<0||s>=Us)return"edge";switch(Js[t][s]){case".":return"grass";case"=":return"path";case"T":return"tree";case"b":return"bush";case"r":return"rock";case"f":return"foliage";case"k":return"skull";case"s":case"j":case"N":case"E":case"W":return"sign";case"V":return"gate";case"P":return"spawn";default:return"edge"}}function ha(s,t){const e=ti(s,t);return e==="grass"||e==="path"||e==="tree"||e==="foliage"||e==="skull"||e==="gate"||e==="spawn"}function tv(s,t){switch(Js[t]?.[s]){case"s":return["Trilha da Mata Sussurrante.","A neblina nunca se levanta por aqui. Dizem que ela se lembra de quem passa.","Siga a trilha até a encruzilhada."];case"j":return["Encruzilhada da Mata.","Ao sul: Vilarejo de Grimhollow.","Norte: Montanhas Cinzentas · Leste: o Charco · Oeste: as Ruínas.","(Esses caminhos se abrirão em breve.)"];case"N":return["Trilha das Montanhas Cinzentas.","O caminho sobe rumo ao nevoeiro gelado.","(Bloqueado — em breve.)"];case"E":return["Trilha do Charco.","Um cheiro de água parada vem do leste.","(Bloqueado — em breve.)"];case"W":return["Trilha das Ruínas.","Pedras antigas espreitam entre as árvores a oeste.","(Bloqueado — em breve.)"];default:return["Uma placa de madeira, gasta pelo tempo."]}}function da(s){for(let t=0;t<ts;t++){const e=Js[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:8,row:ts-2}}const Qs=["############################################","############################################","############################################","############################################","####......#######..........#################","####..C...#######....C.....#################","####......#######...E......#################","####......#######.......E..#################","####..X...#######..........#################","######.##########..K.......#################","######.##########..........#################","######.###############.#####################","######.###############G#####################","###.........##########.#########.........###","###.........##########.#########.........###","###.........###..............###...E.....###","###...E.....###.K...........B###.........###","###.........###..........E...###......K..###","###......................................###","###.........###......E.......###.........###","###.........###..............###.........###","#######.#######..............#######.#######","#######.#######...E..........#######.#######","#######.#######.B..........K.#######.#######","#######.#######..............#######.#######","#######.#############..#############.#######","#######.#############..#############.#######","###.........#########..#########.........###","###.B.......#########..#########........B###","###...E.....#########..#########....E....###","###................##..###...............###","###..K......#########..#########..K......###","###.........#########..#########.........###","##################........##################","#############....#........##################","#############.C..G........#...##############","#############....#...S.U..L.A.##############","##################........#...##############","############################################","############################################"],qs=Qs.length,ao=Qs[0].length;function ev(s,t){return t<0||t>=qs||s<0||s>=ao?"#":Qs[t][s]}function an(s,t){switch(ev(s,t)){case".":return"floor";case"S":return"spawn";case"U":return"stairs";case"E":return"enemy";case"C":return"chest";case"K":return"bones";case"B":return"barrel";case"G":return"gate";case"L":return"lockgate";case"A":return"sanctuary";case"X":return"secret";default:return"wall"}}function mh(s,t){return an(s,t)!=="wall"}function zr(s,t){const e=an(s,t);return e==="wall"||e==="secret"}function gh(s){for(let t=0;t<qs;t++){const e=Qs[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:21,row:36}}function Xi(s){const t=[];for(let e=0;e<qs;e++)for(let n=0;n<ao;n++)Qs[e][n]===s&&t.push({col:n,row:e});return t}const lo=24,co=23,Ds=5,nv=2.6,iv=7.4,$s=24,sv=2,es=12,rv=es/$s,_h=Math.PI*2*sv/$s,xh=Math.PI/2,ua=es;function vh(s,t){return Math.atan2(-s,-t)}function ov(){const s=[];for(let r=0;r<=$s;r++){const a=xh+r*_h;s.push({x:lo+Ds*Math.cos(a),y:r*rv,z:co+Ds*Math.sin(a),yaw:vh(-Math.sin(a),Math.cos(a))})}const t=xh+$s*_h,e=lo+Ds*Math.cos(t),n=co+Ds*Math.sin(t),i=vh(-Math.sin(t),Math.cos(t));for(let r=1;r<=4;r++)s.push({x:e-2*r,y:es,z:n,yaw:i});return s}const Mo=ov(),Zi=Mo.length-1,bh=Mo[Zi].yaw,ho=4,Mh={c:4,r:7},Br={c:3,r:7},ai={col:2,row:7},Xl=new Set;for(let s=6;s<=8;s++)for(let t=1;t<=3;t++)t===ai.col&&s===ai.row||Xl.add(`${t},${s}`);function wh(s,t){return Xl.has(`${s},${t}`)}function av(s,t){return s===Mh.c&&t===Mh.r}function lv(){return[...Xl].map(s=>s.split(",").map(Number))}const yh={x:ai.col*ho,z:ai.row*ho},fa=ai.col*ho,pa=ai.row*ho,cv=7,Sh=lo,Es=co+Ds;function As(s){return Mo[Math.max(0,Math.min(Zi,s))]}const hv=""+new URL("tex_cobble-DXMPAwZE.jpg",import.meta.url).href,dv=""+new URL("tex_stonewall-BFmowWy6.jpg",import.meta.url).href,uv=""+new URL("tex_thatch-DdJMnyvF.jpg",import.meta.url).href,fv=""+new URL("tex_wood-B0jCHZZA.jpg",import.meta.url).href,pv=""+new URL("tex_dirt-BHcbB_Wz.jpg",import.meta.url).href,mv=""+new URL("tex_grass-C2Q1l28q.jpg",import.meta.url).href,gv=""+new URL("tex_mosswall-DpaqdZvP.jpg",import.meta.url).href,_v=""+new URL("tex_cavewall-DQwg9sDl.jpg",import.meta.url).href,xv=""+new URL("tex_cavefloor-CIzR_jPs.jpg",import.meta.url).href,vv=""+new URL("tex_caveceil-Dh6eDyCo.jpg",import.meta.url).href,Th=new Map,bv=new Ld;function An(s,t=1,e=1){let n=Th.get(s);n||(n=bv.load(s),n.wrapS=nn,n.wrapT=nn,n.colorSpace=Re,n.anisotropy=8,Th.set(s,n));const i=n.clone();return i.wrapS=nn,i.wrapT=nn,i.repeat.set(t,e),i.needsUpdate=!0,i}const Hr=4;function bn(s,t){const e=document.createElement("canvas");e.width=s*Hr,e.height=t*Hr;const n=e.getContext("2d");return n.scale(Hr,Hr),{c:e,ctx:n}}function tr(s,t=1,e=1){const n=new pn(s);return n.magFilter=We,n.minFilter=gn,n.generateMipmaps=!0,n.anisotropy=8,n.wrapS=nn,n.wrapT=nn,n.repeat.set(t,e),n.colorSpace=Re,n}function us(s){const t=new pn(s);return t.magFilter=We,t.minFilter=gn,t.generateMipmaps=!0,t.anisotropy=8,t.wrapS=mn,t.wrapT=mn,t.colorSpace=Re,t}const Gn=s=>{let t=s>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}};function Oe(s=1){return An(fv)}function Eh(s=7){return An(hv)}function Rs(s=3){return An(uv)}function Mv(s=11){const{c:n,ctx:i}=bn(48,64);i.fillStyle="#5a4a38",i.fillRect(0,0,48,64),i.fillStyle="#4a2f16",i.fillRect(6,6,36,58);for(let r=6;r<42;r+=8)i.fillStyle="rgba(20,10,4,0.7)",i.fillRect(r,6,1,58),i.fillStyle="rgba(120,80,40,0.25)",i.fillRect(r+1,6,1,58);return i.fillStyle="#20242a",i.fillRect(8,14,32,3),i.fillRect(8,46,32,3),i.fillStyle="#c9a227",i.fillRect(34,64/2,3,3),tr(n)}function ma(s=17){const{c:n,ctx:i}=bn(48,32),r=Gn(s);for(let a=0;a<48;a++){const o=96+Math.sin(a/48*Math.PI)*46+(r()-.5)*10;i.fillStyle=`rgb(${o|0},${o*.6|0},${o*.32|0})`,i.fillRect(a,0,1,32),a%6===0&&(i.fillStyle="rgba(20,10,4,0.6)",i.fillRect(a,0,1,32))}return i.fillStyle="#3a3f47",i.fillRect(0,3,48,3),i.fillRect(0,26,48,3),i.fillStyle="rgba(200,210,220,0.3)",i.fillRect(0,3,48,1),tr(n)}function wv(s=32){return An(gv)}function Ah(){return An(_v)}function Rh(){return An(xv)}function yv(){return An(vv)}function In(s=31){return An(dv)}function Sv(s=1){const{c:n,ctx:i}=bn(76,128);i.clearRect(0,0,76,128),i.lineJoin="round",i.lineCap="round";const r=Gn(s),a="#241812",o=76/2,l=29,c=13,h=(C,M)=>{const w=parseInt(C.slice(1),16);let P=w>>16&255,I=w>>8&255,N=w&255;if(M<0){const H=1+M;P*=H,I*=H,N*=H}else P+=(255-P)*M,I+=(255-I)*M,N+=(255-N)*M;return`rgb(${P|0},${I|0},${N|0})`},d=(C,M,w=2.2)=>{i.beginPath(),C.forEach(([P,I],N)=>N?i.lineTo(P,I):i.moveTo(P,I)),i.closePath(),i.fillStyle=M,i.fill(),w&&(i.strokeStyle=a,i.lineWidth=w,i.stroke())},u=(C,M,w,P,I=2)=>{i.beginPath(),i.arc(C,M,w,0,Math.PI*2),i.fillStyle=P,i.fill(),I&&(i.strokeStyle=a,i.lineWidth=I,i.stroke())},f=(C,M,w,P,I,N,H=2)=>{i.beginPath(),vl(i,C,M,w,P,I),i.fillStyle=N,i.fill(),H&&(i.strokeStyle=a,i.lineWidth=H,i.stroke())},g=(C,M)=>{i.save(),i.beginPath(),C.forEach(([w,P],I)=>I?i.lineTo(w,P):i.moveTo(w,P)),i.closePath(),i.clip(),i.fillStyle=M,i.fillRect(o+2,40,44,90),i.restore()},_=["#f4cc9c","#eab488","#d89a68"],m=_[Math.floor(r()*_.length)],p=h(m,-.16),y=Math.floor(r()*5);i.fillStyle="rgba(0,0,0,0.22)",i.beginPath(),i.ellipse(o,123,15,4.5,0,0,Math.PI*2),i.fill();const v=()=>{i.fillStyle=p,i.fillRect(o-4,36,8,12),u(o,l,c,m),i.save(),i.beginPath(),i.arc(o,l,c,0,Math.PI*2),i.clip(),i.fillStyle="rgba(0,0,0,0.10)",i.fillRect(o+3,l-c,c,2*c),i.restore();for(const C of[-1,1]){const M=o+C*4.6;i.fillStyle="#fff",i.beginPath(),i.ellipse(M,l-.3,2.3,3.6,0,0,Math.PI*2),i.fill(),i.fillStyle="#241812",i.beginPath(),i.ellipse(M+C*.3,l,1.6,3.1,0,0,Math.PI*2),i.fill(),i.fillStyle="#fff",i.beginPath(),i.arc(M-.7,l-1.8,.8,0,Math.PI*2),i.fill()}i.strokeStyle=a,i.lineWidth=1.6,i.beginPath(),i.moveTo(o-8,l-5.5),i.lineTo(o-2.5,l-6),i.moveTo(o+2.5,l-6),i.lineTo(o+8,l-5.5),i.stroke(),i.fillStyle=p,i.fillRect(o-.6,l+3,1.3,2.4),i.strokeStyle="#9c4a38",i.lineWidth=1.4,i.beginPath(),i.arc(o,l+6,2.2,.18*Math.PI,.82*Math.PI),i.stroke(),i.fillStyle="rgba(232,120,110,0.28)",i.beginPath(),i.arc(o-7.5,l+4,2,0,Math.PI*2),i.arc(o+7.5,l+4,2,0,Math.PI*2),i.fill()},x=C=>{i.beginPath(),i.arc(o,l-1,c+1,Math.PI*.98,Math.PI*2.02),i.lineTo(o+c,l+2),i.lineTo(o+8,l-3),i.lineTo(o+5,l-1),i.lineTo(o+2,l-4),i.lineTo(o-1,l-1),i.lineTo(o-4,l-4),i.lineTo(o-7,l-1),i.lineTo(o-c,l+2),i.closePath(),i.fillStyle=C,i.fill(),i.strokeStyle=a,i.lineWidth=2,i.stroke();const M=[-11,-7,-3,1,5,9,12];for(const w of M){const P=o+w*.9,I=Math.max(0,c*c-w*w),N=l-Math.sqrt(I)+3,H=o+w*1.7+(w>0?2:-2),X=N-10-(12-Math.abs(w))*.5;d([[P-3.4,N],[H,X],[P+3.4,N]],C,1.8)}i.strokeStyle=h(C,.35),i.lineWidth=1.3,i.beginPath(),i.moveTo(o-4,l-6),i.lineTo(o-2,l-c+1),i.moveTo(o+3,l-6),i.lineTo(o+5,l-c+2),i.stroke()},E=(C,M)=>{d([[o-12,48],[o-20,52],[o-18,74],[o-11,70]],C,2),d([[o+12,48],[o+20,52],[o+18,74],[o+11,70]],C,2),u(o-18,76,3.6,M,1.8),u(o+18,76,3.6,M,1.8)},S=(C,M)=>{d([[o-9,82],[o-1,82],[o-2,112],[o-9,112]],C,2),d([[o+1,82],[o+9,82],[o+9,112],[o+2,112]],C,2),f(o-11,110,10,11,3,M,2),f(o+1,110,10,11,3,M,2)},A=(C,M)=>{d(C,M,2.2),g(C,"rgba(0,0,0,0.16)")};if(y===0)S("#2f6f9a","#6a4526"),A([[o-12,46],[o+12,46],[o+14,84],[o-14,84]],"#37a34a"),d([[o-14,80],[o+14,80],[o+14,84],[o-14,84]],"#e8e0b0",1.4),E("#2f8f40","#e0b070"),f(o-14,79,28,5,2,"#5a3a1e",1.8),f(o-3,78,6,7,1.5,"#e6c040",1.4),v(),x("#f0d24a"),d([[o-c,l-6],[o+c,l-6],[o+5,l-c-13],[o-2,l-c-7]],"#2f8f3f",2),u(o+4,l-c-12,2.4,"#e6c040",1.4);else if(y===1)S("#33507e","#3a4656"),A([[o-13,46],[o+13,46],[o+14,82],[o-14,82]],"#8a5a2e"),d([[o-8,50],[o+8,50],[o+9,74],[o-9,74]],"#6f4522",1.8),i.strokeStyle="#e6c040",i.lineWidth=1.6,i.beginPath(),i.moveTo(o-7,56),i.lineTo(o+7,60),i.stroke(),E("#7a4d26","#3a4656"),u(o-15,49,5.5,"#9a6a38",2),u(o+15,49,5.5,"#9a6a38",2),f(o-14,78,28,5,2,"#4a2f18",1.8),v(),x("#e07028"),f(o-c-1,l-8,2*c+2,4.5,1.5,"#2f8f3f",1.8),d([[o+c-1,l-7],[o+c+6,l-2],[o+c+4,l-9]],"#2f8f3f",1.4);else if(y===2){const C=[[o-11,46],[o+11,46],[o+20,116],[o-20,116]];d(C,"#2a52b0",2.2),g(C,"rgba(0,0,0,0.16)"),d([[o-4,52],[o+4,52],[o+6,116],[o-6,116]],"#e6b83a",1.6),f(o-20,112,40,5,2,"#e6b83a",1.6),d([[o-11,48],[o-21,58],[o-17,84],[o-9,74]],"#2a52b0",2),d([[o+11,48],[o+21,58],[o+17,84],[o+9,74]],"#2a52b0",2),u(o-17,86,3.4,m,1.6),u(o+17,86,3.4,m,1.6),v(),x("#4aa8d8"),i.strokeStyle="#8a5a2e",i.lineWidth=3,i.beginPath(),i.moveTo(o+19,40),i.lineTo(o+19,118),i.stroke(),u(o+19,33,5,"#e6c040",2),u(o+19,33,2.2,"#fff6c0",0)}else if(y===3){const C=[[o-13,46],[o+13,46],[o+22,100],[o-22,100]];d(C,"#c0432a",2.2),g(C,"rgba(0,0,0,0.18)"),S("#2a2f45","#5a3a22"),A([[o-11,48],[o+11,48],[o+13,82],[o-13,82]],"#356ab8"),E("#2f5aa0","#d8a070"),f(o-13,78,26,5,2,"#4a3018",1.8),d([[o-12,46],[o-4,44],[o-6,52]],"#c0432a",1.6),d([[o+12,46],[o+4,44],[o+6,52]],"#c0432a",1.6),v(),x("#e8802a")}else{const C=[[o-11,46],[o+11,46],[o+18,116],[o-18,116]];d(C,"#dcd6c6",2.2),g(C,"rgba(0,0,0,0.12)"),f(o-18,112,36,5,2,"#c05a86",1.6),d([[o-5,46],[o+5,46],[o+3,74],[o-3,74]],"#c05a86",1.4),d([[o-11,48],[o-19,58],[o-15,82],[o-9,74]],"#dcd6c6",2),d([[o+11,48],[o+19,58],[o+15,82],[o+9,74]],"#dcd6c6",2),u(o-15,84,3.4,m,1.6),u(o+15,84,3.4,m,1.6),v();const M="#7a4a2a";d([[o-c-2,l-4],[o-c-3,l+26],[o-5,l+20],[o-4,l]],M,2),d([[o+c+2,l-4],[o+c+3,l+26],[o+5,l+20],[o+4,l]],M,2),i.beginPath(),i.arc(o,l-1,c+1,Math.PI*.92,Math.PI*2.08),i.lineTo(o+c-1,l+1),i.lineTo(o+7,l-2),i.lineTo(o+4,l+1),i.lineTo(o+1,l-3),i.lineTo(o-2,l+1),i.lineTo(o-5,l-2),i.lineTo(o-c+1,l+1),i.closePath(),i.fillStyle=M,i.fill(),i.strokeStyle=a,i.lineWidth=2,i.stroke()}return us(n)}function vl(s,t,e,n,i,r){s.beginPath(),s.moveTo(t+r,e),s.arcTo(t+n,e,t+n,e+i,r),s.arcTo(t+n,e+i,t,e+i,r),s.arcTo(t,e+i,t,e,r),s.arcTo(t,e,t+n,e,r),s.closePath()}function ga(s){const{c:n,ctx:i}=bn(160,56);i.clearRect(0,0,160,56),i.fillStyle="#33220f",vl(i,2,2,156,52,6),i.fill(),i.fillStyle="#59401f",vl(i,6,6,148,44,5),i.fill(),i.strokeStyle="rgba(30,18,8,0.35)",i.lineWidth=1;for(let a=12;a<48;a+=6)i.beginPath(),i.moveTo(10,a),i.lineTo(150,a+1),i.stroke();i.fillStyle="#2a1a0a";for(const[a,o]of[[12,12],[148,12],[12,44],[148,44]])i.beginPath(),i.arc(a,o,2,0,Math.PI*2),i.fill();let r=26;for(i.fillStyle="#f2dda0",i.textAlign="center",i.textBaseline="middle",i.font=`bold ${r}px Georgia, "Times New Roman", serif`;i.measureText(s).width>138&&r>10;)r-=1,i.font=`bold ${r}px Georgia, "Times New Roman", serif`;return i.strokeStyle="rgba(0,0,0,0.55)",i.lineWidth=3,i.strokeText(s,160/2,56/2+1),i.fillText(s,160/2,56/2+1),us(n)}function _a(s=41){const{c:n,ctx:i}=bn(96,96),r=Gn(s);for(let a=0;a<96;a+=2)for(let o=0;o<96;o+=2){const l=78+Math.floor(r()*34);i.fillStyle=`rgb(${l},${l*.94|0},${l*.84|0})`,i.fillRect(o,a,2,2)}for(let a=0;a<26;a++){const o=r()*96,l=r()*96,c=10+r()*16,h=r()<.5?.22:-.18;i.fillStyle=h>0?`rgba(0,0,0,${h})`:`rgba(255,250,240,${-h})`,i.beginPath();const d=4+(r()*3|0);for(let u=0;u<=d;u++){const f=u/d*Math.PI*2+r()*.3,g=c*(.7+r()*.4),_=o+Math.cos(f)*g,m=l+Math.sin(f)*g*.8;u===0?i.moveTo(_,m):i.lineTo(_,m)}i.closePath(),i.fill()}i.strokeStyle="rgba(20,16,12,0.5)",i.lineWidth=1.4;for(let a=0;a<7;a++){i.beginPath();let o=r()*96,l=r()*96;i.moveTo(o,l);for(let c=0;c<5;c++)o+=(r()-.5)*26,l+=(r()-.5)*26,i.lineTo(o,l);i.stroke()}return tr(n)}function Tv(s=43){const{c:n,ctx:i}=bn(96,96),r=Gn(s);i.fillStyle="#161514",i.fillRect(0,0,96,96);const a=32;for(let o=0;o<96;o+=a)for(let l=0;l<96;l+=a){const c=40+Math.floor(r()*20);i.fillStyle=`rgb(${c},${c*.98|0},${c*.94|0})`,i.fillRect(l+2,o+2,a-4,a-4),i.fillStyle="rgba(0,0,0,0.4)",i.fillRect(l+2,o+a-4,a-4,2),i.fillStyle="rgba(255,255,255,0.05)",i.fillRect(l+2,o+2,a-4,1),r()<.3&&(i.strokeStyle="rgba(0,0,0,0.35)",i.lineWidth=1,i.beginPath(),i.moveTo(l+6+r()*10,o+6),i.lineTo(l+8+r()*12,o+a-6),i.stroke())}return tr(n)}function Gr(s=61){return An(mv)}function xa(s=63){return An(pv)}function Ch(s=65){const{c:n,ctx:i}=bn(128,300);i.clearRect(0,0,128,300);const r=Gn(s),a=128/2,o=r()<.35,l=(r()-.5)*12,c=300*.8;i.beginPath(),i.moveTo(a-8,300),i.lineTo(a-5,c),i.lineTo(a+5,c),i.lineTo(a+8,300),i.closePath();const h=i.createLinearGradient(a-8,0,a+8,0);h.addColorStop(0,"#2a1c0f"),h.addColorStop(.5,"#553a20"),h.addColorStop(1,"#20150a"),i.fillStyle=h,i.fill();const d=7,u=300*.04,f=300*.84;for(let g=0;g<d;g++){const _=g/(d-1),m=u+(f-u)*_,p=10+_*(128*.46),y=(f-u)/d*2.1,v=30+l;i.fillStyle=`rgb(${v*.55|0},${v+22|0},${v*.5|0})`,i.beginPath(),i.moveTo(a,m-y*.25);const x=7;for(let E=0;E<=x;E++){const S=a+p*(E/x),A=(E%2===0?.86:1)*y;i.lineTo(S,m+A)}for(let E=x;E>=0;E--){const S=a-p*(E/x),A=(E%2===0?.86:1)*y;i.lineTo(S,m+A)}i.closePath(),i.fill()}for(let g=0;g<d;g++){const _=g/(d-1),m=u+(f-u)*_+2,p=(10+_*(128*.46))*.82,y=(f-u)/d*1.9,v=62+Math.floor(r()*20)+l;i.fillStyle=`rgb(${v*.5|0},${v+30|0},${v*.45|0})`,i.beginPath(),i.moveTo(a,m),i.lineTo(a+p,m+y*.92),i.lineTo(a-p,m+y*.92),i.closePath(),i.fill(),i.fillStyle=`rgba(${v*.7|0},${v+60|0},${v*.5|0},0.5)`,i.beginPath(),i.moveTo(a,m),i.lineTo(a-p*.7,m+y*.8),i.lineTo(a-p*.1,m+y*.8),i.closePath(),i.fill();for(let x=0;x<12;x++){const E=r()<.5?-1:1,S=p*(.4+r()*.62);i.fillStyle=`rgba(${v*.45|0},${v+14|0},${v*.4|0},0.85)`,i.beginPath(),i.arc(a+E*S,m+y*(.55+r()*.4),1.4+r()*2.4,0,Math.PI*2),i.fill()}o&&(i.fillStyle="rgba(238,244,255,0.8)",i.beginPath(),i.moveTo(a,m+1),i.lineTo(a+p*.3,m+y*.34),i.lineTo(a-p*.3,m+y*.34),i.closePath(),i.fill())}return us(n)}function Ev(s=75){const{c:n,ctx:i}=bn(128,96);i.clearRect(0,0,128,96);const r=Gn(s),a=128/2,o=96*.98,l=9+(r()*5|0);for(let c=0;c<l;c++){const h=-Math.PI/2+(c/(l-1)-.5)*1.7+(r()-.5)*.2,d=96*(.5+r()*.45),u=60+Math.floor(r()*40);i.strokeStyle=`rgb(${u*.42|0},${u},${u*.34|0})`,i.lineWidth=2.4;const f=a+Math.cos(h)*d,g=o+Math.sin(h)*d,_=a+Math.cos(h)*d*.5+(r()-.5)*8,m=o+Math.sin(h)*d*.5;i.beginPath(),i.moveTo(a,o),i.quadraticCurveTo(_,m,f,g),i.stroke(),i.lineWidth=1;for(let p=.25;p<1;p+=.16){const y=a+(f-a)*p,v=o+(g-o)*p;i.beginPath(),i.moveTo(y,v),i.lineTo(y-5,v-3),i.moveTo(y,v),i.lineTo(y+5,v-3),i.stroke()}}return us(n)}function Av(s=67){const{c:n,ctx:i}=bn(128,96);i.clearRect(0,0,128,96);const r=Gn(s),a=128/2,o=96*.94,l=12;for(let c=0;c<l;c++){const h=a+(r()-.5)*128*.8,d=o-r()*96*.72,u=12+r()*18,f=54+Math.floor(r()*40),g=i.createRadialGradient(h,d-u*.3,u*.2,h,d,u);g.addColorStop(0,`rgb(${f*.6|0},${f+40},${f*.5|0})`),g.addColorStop(1,`rgb(${f*.4|0},${f*.8|0},${f*.4|0})`),i.fillStyle=g,i.beginPath(),i.arc(h,d,u,0,Math.PI*2),i.fill()}for(let c=0;c<5;c++)i.fillStyle="rgba(150,40,50,0.8)",i.beginPath(),i.arc(a+(r()-.5)*128*.6,o-r()*96*.5,1.6,0,Math.PI*2),i.fill();return us(n)}function Lh(s=69){const{c:n,ctx:i}=bn(128,96);i.clearRect(0,0,128,96);const r=Gn(s),a=(o,l,c)=>{i.fillStyle="#e7e2d2",i.beginPath(),i.ellipse(o,l,c,c*.9,0,0,Math.PI*2),i.fill(),i.fillStyle="#d8d2c0",i.beginPath(),i.ellipse(o,l+c*.7,c*.6,c*.4,0,0,Math.PI*2),i.fill(),i.fillStyle="#2a2620",i.beginPath(),i.ellipse(o-c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.ellipse(o+c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.fill(),i.beginPath(),i.moveTo(o,l+c*.1),i.lineTo(o-c*.12,l+c*.4),i.lineTo(o+c*.12,l+c*.4),i.fill()};i.strokeStyle="#d5cfbe",i.lineWidth=3;for(let o=0;o<6;o++){const l=20+r()*88,c=96*.7+r()*96*.22;i.beginPath(),i.moveTo(l,c),i.lineTo(l+(r()-.5)*34,c+(r()-.5)*10),i.stroke()}return a(128*.5,96*.72,15),a(128*.32,96*.8,12),a(128*.68,96*.8,12),a(128*.46,96*.5,13),us(n)}function Ph(s=47){const{c:n,ctx:i}=bn(96,96),r=Gn(s);i.fillStyle="#0f0e0d",i.fillRect(0,0,96,96);const a=18;for(let o=0,l=0;o<96;o+=a,l++){const c=l%2?18:0;for(let h=-18;h<96;h+=36){const d=h+c,u=44+Math.floor(r()*20);i.fillStyle=`rgb(${u*.9|0},${u},${u*.86|0})`,i.fillRect(d+1,o+1,34,a-2),i.fillStyle="rgba(0,0,0,0.45)",i.fillRect(d+1,o+a-3,34,2),i.fillStyle="rgba(255,255,255,0.06)",i.fillRect(d+1,o+1,34,1),r()<.35&&(i.fillStyle=`rgba(70,90,50,${.18+r()*.2})`,i.beginPath(),i.ellipse(d+6+r()*20,o+4+r()*8,5,3,0,0,Math.PI*2),i.fill())}}return tr(n)}const Rv=""+new URL("wpn_sword-CpsgndpE.png",import.meta.url).href,Cv=""+new URL("wpn_greatsword-C2mQEgxH.png",import.meta.url).href,Lv=""+new URL("wpn_axe-CvCTYMUq.png",import.meta.url).href,Pv=""+new URL("wpn_dagger-BBXQkEIm.png",import.meta.url).href,Uv=""+new URL("wpn_rapier-dNk4ndjW.png",import.meta.url).href,Dv=""+new URL("wpn_maul-DbliXABw.png",import.meta.url).href,Iv=""+new URL("wpn_mace-tTLR-MzC.png",import.meta.url).href,kv=""+new URL("wpn_staff-DGpAnpDH.png",import.meta.url).href,Nv=""+new URL("wpn_shield-Bw_-3z5v.png",import.meta.url).href,Fv=""+new URL("wpn_orb-BsomjHDA.png",import.meta.url).href,Uh={ry:0,rx:0,rz:16,tx:0,ty:2,s:1},Ov={slash:{wind:{ry:44,rx:-8,rz:36,tx:12,ty:4,s:.96},hit:{ry:-42,rx:16,rz:-42,tx:-26,ty:-8,s:1.18},follow:{ry:-16,rx:7,rz:-24,tx:-12,ty:-2,s:1.02},windup:105,strike:190,recover:190,cooldown:560,weight:1,fx:"arc"},quickslash:{wind:{ry:44,rx:-8,rz:36,tx:12,ty:4,s:.94},hit:{ry:-42,rx:16,rz:-42,tx:-26,ty:-8,s:1.16},follow:{ry:-16,rx:7,rz:-24,tx:-12,ty:-2,s:1},windup:45,strike:100,recover:95,cooldown:300,weight:.85,fx:"arc"},chop:{wind:{ry:-22,rx:-26,rz:22,tx:6,ty:-2,s:.96},hit:{ry:18,rx:40,rz:-18,tx:-12,ty:9,s:1.22},follow:{ry:8,rx:17,rz:-10,tx:-6,ty:8,s:1.05},windup:150,strike:230,recover:220,cooldown:820,weight:1.6,fx:"arcBig"},smash:{wind:{ry:-16,rx:-32,rz:16,tx:2,ty:0,s:.98},hit:{ry:12,rx:50,rz:-6,tx:-6,ty:13,s:1.36},follow:{ry:6,rx:21,rz:-2,tx:-2,ty:9,s:1.08},windup:220,strike:320,recover:300,cooldown:1200,weight:2.4,fx:"smashwave"},lunge:{wind:{ry:6,rx:-10,rz:4,tx:9,ty:17,s:.8},hit:{ry:-4,rx:42,rz:-22,tx:-15,ty:-16,s:1.46},follow:{ry:-2,rx:24,rz:-14,tx:-9,ty:-6,s:1.18},windup:110,strike:85,recover:155,cooldown:420,weight:.9,fx:"streak"},swipe:{wind:{ry:40,rx:-8,rz:44,tx:12,ty:4,s:.96},hit:{ry:-42,rx:12,rz:-50,tx:-26,ty:-4,s:1.16},follow:{ry:-14,rx:4,rz:-24,tx:-10,ty:0,s:1},windup:120,strike:205,recover:200,cooldown:640,weight:1.1,fx:"arc"},axeChop:{wind:{ry:6,rx:-14,rz:14,tx:5,ty:-22,s:.94},hit:{ry:-12,rx:22,rz:-20,tx:-9,ty:24,s:1.18},follow:{ry:-8,rx:14,rz:-14,tx:-5,ty:16,s:1.06},windup:150,strike:230,recover:220,cooldown:820,weight:1.6,fx:"arcBig",imgSpin:{wind:34,hit:-76,follow:-34}},maulSmash:{wind:{ry:6,rx:-16,rz:12,tx:4,ty:-24,s:.96},hit:{ry:-12,rx:24,rz:-18,tx:-7,ty:28,s:1.3},follow:{ry:-8,rx:15,rz:-12,tx:-4,ty:18,s:1.08},windup:220,strike:320,recover:300,cooldown:1200,weight:2.4,fx:"smashwave",imgSpin:{wind:30,hit:-56,follow:-26}}},xi=[{id:"sword",name:"Espada",url:Rv,slot:"main",grip:"1h",style:"slash",scale:1,dmg:1,cls:"Guerreiro"},{id:"greatsword",name:"Espadão",url:Cv,slot:"main",grip:"2h",style:"smash",scale:1.2,dmg:3,cls:"Guerreiro",cooldown:1150},{id:"axe",name:"Machado",url:Lv,slot:"main",grip:"1h",style:"axeChop",scale:1,dmg:2,cls:"Guerreiro"},{id:"dagger",name:"Adaga",url:Pv,slot:"main",grip:"1h",style:"quickslash",scale:.64,dmg:1,cls:"Ladino",cooldown:280},{id:"rapier",name:"Rapieira",url:Uv,slot:"main",grip:"1h",style:"lunge",scale:1.05,dmg:1,cls:"Ladino",cooldown:420},{id:"maul",name:"Marreta",url:Dv,slot:"main",grip:"2h",style:"maulSmash",scale:1.12,dmg:3,cls:"Clérigo",cooldown:1260},{id:"mace",name:"Maça",url:Iv,slot:"main",grip:"1h",style:"chop",scale:.96,dmg:2,cls:"Clérigo"},{id:"staff",name:"Cajado",url:kv,slot:"main",grip:"2h",style:"swipe",scale:1.06,dmg:1,cls:"Mago",tint:"arcane"},{id:"shield",name:"Escudo",url:Nv,slot:"off",grip:"1h",style:"slash",scale:.9,dmg:0,cls:"Guerreiro"},{id:"orb",name:"Orbe",url:Fv,slot:"off",grip:"1h",style:"swipe",scale:.8,dmg:0,cls:"Mago",tint:"arcane"}],zv=Object.fromEntries(xi.map(s=>[s.id,s])),Dd=""+new URL("sk_clerigo_01-m02oqn3i.png",import.meta.url).href,Id=""+new URL("sk_clerigo_02-gPq2kyAZ.png",import.meta.url).href,kd=""+new URL("sk_clerigo_03-BC61m31x.png",import.meta.url).href,Nd=""+new URL("sk_clerigo_04-DkEHRfvV.png",import.meta.url).href,Fd=""+new URL("sk_clerigo_05-dnCPnZU3.png",import.meta.url).href,Od=""+new URL("sk_clerigo_06-BSo7ILHo.png",import.meta.url).href,zd=""+new URL("sk_clerigo_07-CjoSnkTy.png",import.meta.url).href,Bd=""+new URL("sk_clerigo_08-DCl_nzII.png",import.meta.url).href,Hd=""+new URL("sk_clerigo_09-Ba1vsp2b.png",import.meta.url).href,Gd=""+new URL("sk_clerigo_10-mdVYVSAr.png",import.meta.url).href,Vd=""+new URL("sk_clerigo_11-CjethmxR.png",import.meta.url).href,Wd=""+new URL("sk_clerigo_12-C7S2ppC_.png",import.meta.url).href,Xd=""+new URL("sk_clerigo_13-2ncy5aSV.png",import.meta.url).href,qd=""+new URL("sk_clerigo_14-848kFmaR.png",import.meta.url).href,$d=""+new URL("sk_clerigo_15-DcclFDYX.png",import.meta.url).href,Yd=""+new URL("sk_guerreiro_01-D_DvW5ng.png",import.meta.url).href,jd=""+new URL("sk_guerreiro_02-FBO4q1oa.png",import.meta.url).href,Zd=""+new URL("sk_guerreiro_03-CUWaFsIC.png",import.meta.url).href,Kd=""+new URL("sk_guerreiro_04-DV0sbKF9.png",import.meta.url).href,Jd=""+new URL("sk_guerreiro_05-rJJiQi-5.png",import.meta.url).href,Qd=""+new URL("sk_guerreiro_06-Bx2EDwMO.png",import.meta.url).href,tu=""+new URL("sk_guerreiro_07-97R_0COd.png",import.meta.url).href,eu=""+new URL("sk_guerreiro_08-UGcmyoGh.png",import.meta.url).href,nu=""+new URL("sk_guerreiro_09-CDQwpzrD.png",import.meta.url).href,iu=""+new URL("sk_guerreiro_10-BZXnW6l3.png",import.meta.url).href,su=""+new URL("sk_guerreiro_11-CSJNGa0I.png",import.meta.url).href,ru=""+new URL("sk_guerreiro_12-CWNNgDQ8.png",import.meta.url).href,ou=""+new URL("sk_guerreiro_13-oyA7SeL2.png",import.meta.url).href,au=""+new URL("sk_guerreiro_14-CDK00urm.png",import.meta.url).href,lu=""+new URL("sk_guerreiro_15-vYbsrG8W.png",import.meta.url).href,cu=""+new URL("sk_ladino_01-D7vColft.png",import.meta.url).href,hu=""+new URL("sk_ladino_02-4cW8vrhW.png",import.meta.url).href,du=""+new URL("sk_ladino_03-BrcSubEV.png",import.meta.url).href,uu=""+new URL("sk_ladino_04-GxMm6DeJ.png",import.meta.url).href,fu=""+new URL("sk_ladino_05-BrLAnd-q.png",import.meta.url).href,pu=""+new URL("sk_ladino_06-D1z7SCpz.png",import.meta.url).href,mu=""+new URL("sk_ladino_07-B7RhJ0wt.png",import.meta.url).href,gu=""+new URL("sk_ladino_08-D4FbpQ9F.png",import.meta.url).href,_u=""+new URL("sk_ladino_09-faeULULl.png",import.meta.url).href,xu=""+new URL("sk_ladino_10-cZSfMIhT.png",import.meta.url).href,vu=""+new URL("sk_ladino_11-CDqqIQHS.png",import.meta.url).href,bu=""+new URL("sk_ladino_12-CZDoISs5.png",import.meta.url).href,Mu=""+new URL("sk_ladino_13-DsM2ayWP.png",import.meta.url).href,wu=""+new URL("sk_ladino_14-D3917R8E.png",import.meta.url).href,yu=""+new URL("sk_ladino_15-B5aZcXUE.png",import.meta.url).href,Su=""+new URL("sk_mago_01-CXK3NXsg.png",import.meta.url).href,Tu=""+new URL("sk_mago_02-wMfvdygl.png",import.meta.url).href,Eu=""+new URL("sk_mago_03-DuqDF8qS.png",import.meta.url).href,Au=""+new URL("sk_mago_04-FHIO0qBl.png",import.meta.url).href,Ru=""+new URL("sk_mago_05-D3v0cqW2.png",import.meta.url).href,Cu=""+new URL("sk_mago_06-BifuIDkE.png",import.meta.url).href,Lu=""+new URL("sk_mago_07-DVhdUIDL.png",import.meta.url).href,Pu=""+new URL("sk_mago_08-DODapwyo.png",import.meta.url).href,Uu=""+new URL("sk_mago_09-B1FddkFu.png",import.meta.url).href,Du=""+new URL("sk_mago_10-BJROR30h.png",import.meta.url).href,Iu=""+new URL("sk_mago_11-DgeCLkpn.png",import.meta.url).href,ku=""+new URL("sk_mago_12-DNW7MwiE.png",import.meta.url).href,Nu=""+new URL("sk_mago_13-B3xLYzpF.png",import.meta.url).href,Fu=""+new URL("sk_mago_14-BkU-TOV-.png",import.meta.url).href,Ou=""+new URL("sk_mago_15-B9MA9n-l.png",import.meta.url).href,zu=""+new URL("sk_passive_01-BybXLWP1.png",import.meta.url).href,Bu=""+new URL("sk_passive_02-yMe2uQlm.png",import.meta.url).href,Hu=""+new URL("sk_passive_03-CfLR3Po9.png",import.meta.url).href,Gu=""+new URL("sk_passive_04-BxwW4T3S.png",import.meta.url).href,Vu=""+new URL("sk_passive_05-aKrH619S.png",import.meta.url).href,Wu=""+new URL("sk_passive_06-C8qd30Xb.png",import.meta.url).href,Xu=""+new URL("sk_passive_07-C4-U9Z10.png",import.meta.url).href,qu=""+new URL("sk_passive_08-Ql7Qlb7A.png",import.meta.url).href,$u=""+new URL("sk_passive_09-DuzOFh2V.png",import.meta.url).href,Yu=""+new URL("sk_passive_10-BEytT8Z3.png",import.meta.url).href,ju=""+new URL("sk_passive_11-BNx9pVVc.png",import.meta.url).href,Zu=""+new URL("sk_passive_12-ChLS0a2U.png",import.meta.url).href,Ku=""+new URL("sk_passive_13-Db0gOpKs.png",import.meta.url).href,Ju=""+new URL("sk_passive_14-Dgyd0quO.png",import.meta.url).href,Qu=""+new URL("sk_passive_15-B_UeHSwf.png",import.meta.url).href,tf=""+new URL("sk_passive_16-TWzCSpNO.png",import.meta.url).href,Bv=""+new URL("bg_guerreiro-DWgmGaUG.jpg",import.meta.url).href,Hv=""+new URL("bg_ladino-B6L4a-g-.jpg",import.meta.url).href,Gv=""+new URL("bg_mago-Bct2J94D.jpg",import.meta.url).href,Vv=""+new URL("bg_clerigo-BUhJVnRj.jpg",import.meta.url).href,Wv=Object.assign({"../assets/ui/skills/sk_clerigo_01.png":Dd,"../assets/ui/skills/sk_clerigo_02.png":Id,"../assets/ui/skills/sk_clerigo_03.png":kd,"../assets/ui/skills/sk_clerigo_04.png":Nd,"../assets/ui/skills/sk_clerigo_05.png":Fd,"../assets/ui/skills/sk_clerigo_06.png":Od,"../assets/ui/skills/sk_clerigo_07.png":zd,"../assets/ui/skills/sk_clerigo_08.png":Bd,"../assets/ui/skills/sk_clerigo_09.png":Hd,"../assets/ui/skills/sk_clerigo_10.png":Gd,"../assets/ui/skills/sk_clerigo_11.png":Vd,"../assets/ui/skills/sk_clerigo_12.png":Wd,"../assets/ui/skills/sk_clerigo_13.png":Xd,"../assets/ui/skills/sk_clerigo_14.png":qd,"../assets/ui/skills/sk_clerigo_15.png":$d,"../assets/ui/skills/sk_guerreiro_01.png":Yd,"../assets/ui/skills/sk_guerreiro_02.png":jd,"../assets/ui/skills/sk_guerreiro_03.png":Zd,"../assets/ui/skills/sk_guerreiro_04.png":Kd,"../assets/ui/skills/sk_guerreiro_05.png":Jd,"../assets/ui/skills/sk_guerreiro_06.png":Qd,"../assets/ui/skills/sk_guerreiro_07.png":tu,"../assets/ui/skills/sk_guerreiro_08.png":eu,"../assets/ui/skills/sk_guerreiro_09.png":nu,"../assets/ui/skills/sk_guerreiro_10.png":iu,"../assets/ui/skills/sk_guerreiro_11.png":su,"../assets/ui/skills/sk_guerreiro_12.png":ru,"../assets/ui/skills/sk_guerreiro_13.png":ou,"../assets/ui/skills/sk_guerreiro_14.png":au,"../assets/ui/skills/sk_guerreiro_15.png":lu,"../assets/ui/skills/sk_ladino_01.png":cu,"../assets/ui/skills/sk_ladino_02.png":hu,"../assets/ui/skills/sk_ladino_03.png":du,"../assets/ui/skills/sk_ladino_04.png":uu,"../assets/ui/skills/sk_ladino_05.png":fu,"../assets/ui/skills/sk_ladino_06.png":pu,"../assets/ui/skills/sk_ladino_07.png":mu,"../assets/ui/skills/sk_ladino_08.png":gu,"../assets/ui/skills/sk_ladino_09.png":_u,"../assets/ui/skills/sk_ladino_10.png":xu,"../assets/ui/skills/sk_ladino_11.png":vu,"../assets/ui/skills/sk_ladino_12.png":bu,"../assets/ui/skills/sk_ladino_13.png":Mu,"../assets/ui/skills/sk_ladino_14.png":wu,"../assets/ui/skills/sk_ladino_15.png":yu,"../assets/ui/skills/sk_mago_01.png":Su,"../assets/ui/skills/sk_mago_02.png":Tu,"../assets/ui/skills/sk_mago_03.png":Eu,"../assets/ui/skills/sk_mago_04.png":Au,"../assets/ui/skills/sk_mago_05.png":Ru,"../assets/ui/skills/sk_mago_06.png":Cu,"../assets/ui/skills/sk_mago_07.png":Lu,"../assets/ui/skills/sk_mago_08.png":Pu,"../assets/ui/skills/sk_mago_09.png":Uu,"../assets/ui/skills/sk_mago_10.png":Du,"../assets/ui/skills/sk_mago_11.png":Iu,"../assets/ui/skills/sk_mago_12.png":ku,"../assets/ui/skills/sk_mago_13.png":Nu,"../assets/ui/skills/sk_mago_14.png":Fu,"../assets/ui/skills/sk_mago_15.png":Ou,"../assets/ui/skills/sk_passive_01.png":zu,"../assets/ui/skills/sk_passive_02.png":Bu,"../assets/ui/skills/sk_passive_03.png":Hu,"../assets/ui/skills/sk_passive_04.png":Gu,"../assets/ui/skills/sk_passive_05.png":Vu,"../assets/ui/skills/sk_passive_06.png":Wu,"../assets/ui/skills/sk_passive_07.png":Xu,"../assets/ui/skills/sk_passive_08.png":qu,"../assets/ui/skills/sk_passive_09.png":$u,"../assets/ui/skills/sk_passive_10.png":Yu,"../assets/ui/skills/sk_passive_11.png":ju,"../assets/ui/skills/sk_passive_12.png":Zu,"../assets/ui/skills/sk_passive_13.png":Ku,"../assets/ui/skills/sk_passive_14.png":Ju,"../assets/ui/skills/sk_passive_15.png":Qu,"../assets/ui/skills/sk_passive_16.png":tf}),ql=s=>Wv[`../assets/ui/skills/${s}.png`],Xv=["dmg","mdmg","life","mana","def","mres","prec","crit","critd","eva","aspd","leech","poison","regen","cdr","block"],$l={};Xv.forEach((s,t)=>{const e=ql(`sk_passive_${String(t+1).padStart(2,"0")}`);e&&($l[s]=e)});$l.rage=ql("sk_passive_02");const Dh={dmg:{sym:"⚔",color:"#d9694c",label:"Dano Físico"},mdmg:{sym:"✦",color:"#8a6cff",label:"Dano Mágico"},life:{sym:"❤",color:"#e0564c",label:"Vida"},mana:{sym:"◆",color:"#4f9be0",label:"Mana"},def:{sym:"🛡",color:"#9fb0c4",label:"Defesa"},mres:{sym:"◈",color:"#7fa0d8",label:"Resist. Mágica"},prec:{sym:"◎",color:"#d8c86a",label:"Precisão"},crit:{sym:"✸",color:"#e0b84c",label:"Chance Crítica"},critd:{sym:"✷",color:"#e08a3c",label:"Dano Crítico"},eva:{sym:"≈",color:"#9fd8c0",label:"Evasão"},aspd:{sym:"⚡",color:"#e6d24a",label:"Vel. de Ataque"},leech:{sym:"❦",color:"#c0463c",label:"Roubo de Vida"},poison:{sym:"☣",color:"#7fc04c",label:"Veneno"},regen:{sym:"✚",color:"#7fd08a",label:"Regeneração"},cdr:{sym:"⧗",color:"#c0a0e0",label:"Redução de Recarga"},block:{sym:"⬡",color:"#b8c0cc",label:"Bloqueio"},rage:{sym:"🔥",color:"#e06a3c",label:"Fúria"}},qv={dmg:.03,mdmg:.03,life:.05,mana:.05,def:2,mres:2,prec:2,crit:.02,critd:.06,eva:.02,aspd:.03,leech:.02,poison:.04,regen:1,cdr:.03,block:.02,rage:.04};function $v(s){const t={};for(const e of Object.values(ls))if(e)for(const n of e.branches)for(const i of n.skills){const r=s[i.id]||0;r<=0||i.kind!=="passive"||!i.stat||(t[i.stat]=(t[i.stat]||0)+r*qv[i.stat])}return t}const Lt=(s,t,e,n,i=1)=>({id:s,name:t,kind:"active",desc:n,maxRank:i,icon:ql(e)}),ne=(s,t,e,n,i=5)=>({id:s,name:t,kind:"passive",desc:n,maxRank:i,stat:e}),Yv={classId:"guerreiro",bg:Bv,branches:[{id:"armas",name:"Armas",color:"#d9a34a",skills:[Lt("g_golpe_poderoso","Golpe Poderoso","sk_guerreiro_01","Um golpe forte que causa dano bruto no alvo.",5),ne("g_afiacao","Afiação","dmg","+3% Dano Físico por rank."),Lt("g_investida","Investida","sk_guerreiro_02","Avança até o inimigo e o atordoa por um instante.",3),ne("g_precisao","Mira de Guerra","prec","+2 Precisão por rank."),Lt("g_golpe_giratorio","Golpe Giratório","sk_guerreiro_03","Gira a arma acertando todos ao redor.",5),ne("g_gume","Gume Cruel","crit","+2% Chance Crítica por rank."),Lt("g_quebra_armadura","Quebra-Armadura","sk_guerreiro_04","Reduz a defesa do alvo por alguns segundos.",3),ne("g_brutalidade","Brutalidade","critd","+8% Dano Crítico por rank."),Lt("g_decapitar","Decapitar","sk_guerreiro_05","Executa alvos com pouca vida, dano massivo.",3)]},{id:"baluarte",name:"Baluarte",color:"#9fb0c4",skills:[ne("g_pele_ferro","Pele de Ferro","def","+3 Defesa por rank."),Lt("g_provocar","Provocar","sk_guerreiro_06","Força o inimigo a atacar você (aggro).",3),ne("g_vigor","Vigor","life","+5% Vida por rank."),Lt("g_muro_escudo","Muro de Escudo","sk_guerreiro_07","Aumenta muito o bloqueio por um tempo.",5),ne("g_fortaleza","Fortaleza","mres","+2 Resist. Mágica por rank."),Lt("g_reflexao","Reflexão","sk_guerreiro_08","Ao bloquear, reflete parte do dano.",3),ne("g_guarda","Guarda Firme","block","+3% Bloqueio por rank."),Lt("g_aco_absoluto","Aço Absoluto","sk_guerreiro_09","Fica imune a dano por um breve instante.",3),Lt("g_ultimo_suspiro","Último Suspiro","sk_guerreiro_10","Cura ao chegar perto da morte (com recarga).",3)]},{id:"furia",name:"Fúria",color:"#e0623c",skills:[ne("g_furia_batalha","Fúria de Batalha","rage","+4% Dano quanto menor a Vida (por rank)."),Lt("g_grito_guerra","Grito de Guerra","sk_guerreiro_11","Grito que aumenta o dano do herói.",5),ne("g_sede_sangue","Sede de Sangue","leech","+2% Roubo de Vida por rank."),Lt("g_frenesi","Frenesi","sk_guerreiro_12","Aumenta a velocidade de ataque temporariamente.",5),ne("g_adrenalina","Adrenalina","aspd","+3% Vel. de Ataque por rank."),Lt("g_investida_brutal","Investida Brutal","sk_guerreiro_13","Avança causando dano e empurrando o alvo.",3),ne("g_folego","Fôlego","regen","+1% Vida regenerada por rank."),Lt("g_terremoto","Terremoto","sk_guerreiro_14","Pisada que atordoa e fere em área.",3),Lt("g_golpe_final","Golpe Final","sk_guerreiro_15","Golpe devastador de recarga longa.",3)]}]},jv={classId:"ladino",bg:Hv,branches:[{id:"assassino",name:"Assassino",color:"#d94c6a",skills:[Lt("l_apunhalar","Apunhalar","sk_ladino_01","Golpe pelas costas com dano crítico garantido.",5),ne("l_precisao_letal","Precisão Letal","crit","+2% Chance Crítica por rank."),Lt("l_rajada_laminas","Rajada de Lâminas","sk_ladino_02","Vários golpes rápidos em sequência.",5),ne("l_execucao","Execução","critd","+8% Dano Crítico por rank."),Lt("l_golpe_sombras","Golpe nas Sombras","sk_ladino_03","Teleporta atrás do alvo e ataca.",3),ne("l_ponto_fraco","Ponto Fraco","dmg","+3% Dano em alvos com vida cheia (por rank)."),Lt("l_estocada","Estocada Perfurante","sk_ladino_04","Estocada que ignora parte da defesa.",3),Lt("l_execucao_a","Golpe Mortal","sk_ladino_05","Executa alvos com pouca vida.",3)]},{id:"sombra",name:"Sombra",color:"#7fb08a",skills:[ne("l_reflexos","Reflexos","eva","+2% Evasão por rank."),Lt("l_passo_sombrio","Passo Sombrio","sk_ladino_06","Esquiva rápida reposicionando o herói.",3),ne("l_lamina_env","Lâmina Envenenada","poison","+3% Dano de Veneno por rank."),Lt("l_bomba_fumaca","Bomba de Fumaça","sk_ladino_07","Solta fumaça e aumenta a evasão.",3),ne("l_camuflagem","Camuflagem","eva","+2% Evasão ao ficar parado (por rank)."),Lt("l_nuvem_toxica","Nuvem Tóxica","sk_ladino_08","Nuvem venenosa que fere em área.",5),Lt("l_desaparecer","Desaparecer","sk_ladino_09","Some por um instante e zera a ameaça.",3),Lt("l_toxina","Toxina","sk_ladino_10","Aplica um veneno forte no alvo.",5)]},{id:"precisao",name:"Precisão",color:"#d8c86a",skills:[ne("l_agilidade","Agilidade","aspd","+3% Vel. de Ataque por rank."),Lt("l_rajada_dupla","Rajada Dupla","sk_ladino_11","Dois golpes rápidos num só toque.",5),ne("l_maos_rapidas","Mãos Rápidas","cdr","−2% Recarga por rank."),Lt("l_arremesso","Arremesso de Adaga","sk_ladino_12","Lança uma adaga à distância.",5),ne("l_passos_leves","Passos Leves","eva","+2% Evasão ao se mover (por rank)."),Lt("l_contra_ataque","Contra-Ataque","sk_ladino_13","Revida ao esquivar de um golpe.",3),ne("l_olhar","Olhar Aguçado","prec","+2 Precisão por rank."),Lt("l_danca_laminas","Dança das Lâminas","sk_ladino_14","Gira acertando vários alvos ao redor.",5),Lt("l_marca_mortal","Marca Mortal","sk_ladino_15","Marca o alvo: ele recebe mais dano.",3)]}]},Zv={classId:"mago",bg:Gv,branches:[{id:"chamas",name:"Chamas",color:"#e0672c",skills:[Lt("m_bola_fogo","Bola de Fogo","sk_mago_01","Lança um projétil flamejante no alvo.",5),ne("m_piromania","Piromania","mdmg","+3% Dano de Fogo por rank."),Lt("m_explosao_fogo","Explosão de Fogo","sk_mago_02","Explosão que fere em área.",5),ne("m_combustao","Combustão","crit","+2% chance de magia crítica por rank."),Lt("m_meteoro","Meteoro","sk_mago_03","Invoca um meteoro devastador em área.",3),ne("m_chama_persist","Chama Persistente","poison","+3% Dano de queimadura por rank."),Lt("m_muralha_fogo","Muralha de Fogo","sk_mago_04","Cria uma zona de fogo contínua.",3),Lt("m_imolacao","Imolação","sk_mago_05","Aura ardente que queima inimigos próximos.",5)]},{id:"gelo_arcano",name:"Gelo & Arcano",color:"#4f9be0",skills:[ne("m_frieza","Frieza","mres","+2 Resist. Mágica por rank."),Lt("m_nova_gelo","Nova de Gelo","sk_mago_06","Congela os inimigos ao redor.",5),ne("m_foco_arcano","Foco Arcano","cdr","−2% Recarga por rank."),Lt("m_lanca_gelo","Lança de Gelo","sk_mago_07","Estilhaço de gelo que perfura.",5),ne("m_barreira","Barreira","def","+2 Defesa por rank."),Lt("m_escudo_arcano","Escudo Arcano","sk_mago_08","Escudo que absorve dano por um tempo.",5),Lt("m_teleporte","Teleporte","sk_mago_09","Reposiciona instantaneamente.",3),Lt("m_prisao_gelo","Prisão de Gelo","sk_mago_10","Prende o alvo num bloco de gelo.",3)]},{id:"tempestade",name:"Tempestade",color:"#9a6cff",skills:[Lt("m_raio_arcano","Raio Arcano","sk_mago_11","Raio que atinge o alvo em linha.",5),ne("m_conducao","Condução","mdmg","+3% Dano de Raio por rank."),Lt("m_corrente","Corrente","sk_mago_12","Raio que salta entre vários inimigos.",5),ne("m_estatica","Estática","crit","+2% chance de atordoar por rank."),Lt("m_tempestade","Tempestade","sk_mago_13","Tempestade que fere em área continuamente.",3),ne("m_energia","Energia","mana","+5% Mana por rank."),Lt("m_descarga","Descarga","sk_mago_14","Explosão de energia instantânea.",3),Lt("m_nova_arcana","Nova Arcana","sk_mago_15","Nova arcana que arrasa tudo em volta.",3)]}]},Kv={classId:"clerigo",bg:Vv,branches:[{id:"luz",name:"Luz",color:"#e6d38a",skills:[Lt("c_cura","Cura","sk_clerigo_01","Restaura vida do herói.",5),ne("c_fe","Fé","regen","+3% Poder de Cura por rank."),Lt("c_cura_area","Cura em Área","sk_clerigo_02","Cura em volta do herói.",5),ne("c_graca","Graça","mana","+4% Regeneração de Mana por rank."),Lt("c_bencao","Bênção","sk_clerigo_03","Abençoa o herói, aumentando atributos.",3),ne("c_vigor_divino","Vigor Divino","life","+4% Vida por rank."),Lt("c_aura_protecao","Aura de Proteção","sk_clerigo_04","Reduz o dano recebido por um tempo.",3),Lt("c_renovacao","Renovação","sk_clerigo_05","Cura contínua ao longo do tempo.",5)]},{id:"julgamento",name:"Julgamento",color:"#e0a63c",skills:[Lt("c_martelo_sagrado","Martelo Sagrado","sk_clerigo_06","Golpe de dano sagrado no alvo.",5),ne("c_zelo","Zelo","mdmg","+3% Dano Sagrado por rank."),Lt("c_punicao","Punição","sk_clerigo_07","Fere e reduz a cura do alvo.",5),ne("c_conviccao","Convicção","dmg","+3% Dano com a vida cheia (por rank)."),Lt("c_luz_radiante","Luz Radiante","sk_clerigo_08","Explosão de luz que fere em área.",5),ne("c_fervor","Fervor","aspd","+3% Vel. de conjuração por rank."),Lt("c_selo_sagrado","Selo Sagrado","sk_clerigo_09","Selo que explode após alguns segundos.",3),Lt("c_condenacao","Condenação","sk_clerigo_10","Pilar de luz sagrada de grande dano.",3)]},{id:"fe",name:"Fé",color:"#cbb8e0",skills:[ne("c_devocao","Devoção","mres","+2 Resist. Mágica por rank."),Lt("c_escudo_divino","Escudo Divino","sk_clerigo_11","Fica imune a dano por um breve instante.",3),ne("c_perseveranca","Perseverança","regen","+1% Vida regenerada por rank."),Lt("c_repreensao","Repreensão","sk_clerigo_12","Clarão que atordoa os inimigos.",3),ne("c_martir","Mártir","leech","+2% do dano causado vira cura (por rank)."),Lt("c_intervencao","Intervenção","sk_clerigo_13","Cura forte + escudo instantâneo.",3),Lt("c_ressurreicao","Ressurreição","sk_clerigo_14","Revive automaticamente uma vez (recarga longa).",1),Lt("c_aura_fe","Aura de Fé","sk_clerigo_15","Aura que fortalece o herói continuamente.",5)]}]},ls={guerreiro:Yv,ladino:jv,mago:Zv,clerigo:Kv},Be=(s,t,e)=>({target:"enemy",melee:!0,range:1,effect:"dmg",magic:!1,power:s,mana:t,cd:e}),we=(s,t,e,n,i=!0)=>({target:"enemy",melee:!1,range:t,effect:"dmg",magic:i,power:s,mana:e,cd:n}),qi=(s,t,e)=>({target:"self",melee:!1,range:0,effect:"heal",magic:!0,power:s,mana:t,cd:e}),ze=s=>({target:"self",melee:!1,range:0,effect:"buff",magic:!1,power:0,mana:s.mana,cd:s.cd,atkMul:s.atkMul,defReduc:s.defReduc,dur:s.dur}),Jv={g_golpe_poderoso:Be(16,12,4e3),g_investida:Be(12,10,6e3),g_golpe_giratorio:Be(16,14,6e3),g_quebra_armadura:Be(12,10,7e3),g_decapitar:Be(26,18,1e4),g_provocar:ze({defReduc:.25,dur:6e3,mana:8,cd:1e4}),g_muro_escudo:ze({defReduc:.5,dur:6e3,mana:14,cd:14e3}),g_reflexao:ze({defReduc:.3,dur:6e3,mana:12,cd:12e3}),g_aco_absoluto:ze({defReduc:.9,dur:3e3,mana:20,cd:2e4}),g_ultimo_suspiro:qi(90,20,16e3),g_grito_guerra:ze({atkMul:1.5,dur:8e3,mana:14,cd:14e3}),g_frenesi:ze({atkMul:1.35,dur:8e3,mana:12,cd:12e3}),g_investida_brutal:Be(18,14,8e3),g_terremoto:Be(24,18,11e3),g_golpe_final:Be(40,30,18e3),l_apunhalar:Be(18,12,4e3),l_rajada_laminas:Be(16,14,6e3),l_golpe_sombras:Be(18,14,7e3),l_estocada:Be(14,10,6e3),l_execucao_a:Be(26,18,1e4),l_passo_sombrio:ze({defReduc:.4,dur:4e3,mana:8,cd:9e3}),l_bomba_fumaca:ze({defReduc:.5,dur:5e3,mana:12,cd:12e3}),l_nuvem_toxica:we(12,3,14,8e3,!1),l_desaparecer:ze({defReduc:.8,dur:2500,mana:16,cd:16e3}),l_toxina:we(10,2,10,7e3,!1),l_rajada_dupla:Be(14,10,4e3),l_arremesso:we(16,4,12,5e3,!1),l_contra_ataque:ze({atkMul:1.3,dur:6e3,mana:10,cd:1e4}),l_danca_laminas:Be(18,16,8e3),l_marca_mortal:we(10,4,10,9e3,!1),m_bola_fogo:we(18,5,12,3500),m_explosao_fogo:we(18,4,14,6e3),m_meteoro:we(40,5,30,16e3),m_muralha_fogo:we(16,4,16,9e3),m_imolacao:we(12,2,12,7e3),m_nova_gelo:we(16,3,14,6e3),m_lanca_gelo:we(18,5,12,4500),m_escudo_arcano:ze({defReduc:.5,dur:6e3,mana:14,cd:12e3}),m_teleporte:ze({defReduc:.3,dur:2e3,mana:10,cd:1e4}),m_prisao_gelo:we(12,4,12,9e3),m_raio_arcano:we(18,5,12,4e3),m_corrente:we(16,4,14,6e3),m_tempestade:we(26,4,20,11e3),m_descarga:we(18,3,14,6e3),m_nova_arcana:we(40,4,30,16e3),c_cura:qi(50,12,6e3),c_cura_area:qi(70,18,9e3),c_bencao:ze({atkMul:1.4,dur:1e4,mana:14,cd:14e3}),c_aura_protecao:ze({defReduc:.4,dur:8e3,mana:14,cd:12e3}),c_renovacao:qi(60,16,11e3),c_martelo_sagrado:we(18,4,12,4e3),c_punicao:we(16,4,12,6e3),c_luz_radiante:we(18,3,14,6e3),c_selo_sagrado:we(24,4,18,9e3),c_condenacao:we(38,5,28,15e3),c_escudo_divino:ze({defReduc:.9,dur:3e3,mana:20,cd:2e4}),c_repreensao:we(12,3,12,9e3),c_intervencao:qi(90,22,14e3),c_ressurreicao:qi(150,30,6e4),c_aura_fe:ze({atkMul:1.3,dur:1e4,mana:14,cd:12e3})};function bl(s){return Jv[s]??Be(12,8,4e3)}function Qv(s){for(const t in ls){const e=ls[t];if(e){for(const n of e.branches)for(const i of n.skills)if(i.id===s)return i.name}}return""}function t1(s,t){const e=ls[s];if(!e)return[];const n=[];for(const i of e.branches)for(const r of i.skills){if(r.kind!=="active")continue;const a=t[r.id]||0;a<=0||n.push({id:r.id,name:r.name,icon:r.icon,rank:a,combat:bl(r.id)})}return n}const e1=""+new URL("hud_plate-B2ygb4FP.png",import.meta.url).href,Ih=""+new URL("eq_frame-d-QhyRgX.png",import.meta.url).href,kh=""+new URL("eq_slot-DS9kMsLx.png",import.meta.url).href,ef=""+new URL("eq_container-84uusXC9.png",import.meta.url).href,Vr=""+new URL("btn_base-wlebnyD3.png",import.meta.url).href,n1=""+new URL("dpad-3wZIZEqb.png",import.meta.url).href,i1=""+new URL("ico_attack-CbdvrLXs.png",import.meta.url).href,s1=""+new URL("ico_action-BRbeFgHL.png",import.meta.url).href,r1=""+new URL("ico_inventory-B_-_sjLB.png",import.meta.url).href,va=""+new URL("coin-CsF22FSK.png",import.meta.url).href,Ti=""+new URL("load_sword-Bhnb8m09.png",import.meta.url).href,ba=""+new URL("map_frame-B4piWonF.png",import.meta.url).href,o1=""+new URL("clock_sun-DO5hSXa1.png",import.meta.url).href,a1=""+new URL("clock_moon-D1xrN5yT.png",import.meta.url).href,l1=""+new URL("forge_fill-CEHhln-Z.mp3",import.meta.url).href,c1=""+new URL("forge_fail-CL0qEXHN.mp3",import.meta.url).href,h1=""+new URL("forge_success-0H6fEkkB.wav",import.meta.url).href,uo=new Audio(l1),Yl=new Audio(c1),jl=new Audio(h1);uo.preload="auto";Yl.preload="auto";jl.preload="auto";uo.volume=.85;Yl.volume=.9;jl.volume=.9;function Ml(s){try{s.currentTime=0,s.play().catch(()=>{})}catch{}}function d1(s){try{s.pause(),s.currentTime=0}catch{}}const u1=6e3;function f1(s,t){const e=s.querySelector(".gh-sm-sword-fill"),n=s.querySelector(".gh-sm-sword-base");s.classList.remove("gh-forge-ok","gh-forge-fail"),s.classList.add("gh-forging"),e.style.transition="none",e.style.width="0%",Ml(uo);const i=performance.now(),r=a=>{const o=Math.min(1,(a-i)/u1),l=o<.5?2*o*o:1-Math.pow(-2*o+2,2)/2;e.style.width=(l*100).toFixed(2)+"%",s.style.setProperty("--fk",l.toFixed(3)),n.style.filter=`brightness(${(.24+l*.5).toFixed(2)}) saturate(${(.3+l*1.4).toFixed(2)}) sepia(${(l*.5).toFixed(2)}) drop-shadow(0 2px 4px #000)`,o<1?requestAnimationFrame(r):(d1(uo),t())};requestAnimationFrame(r)}const p1={smith:"⚒️",tavern:"🍺",store:"🛒",alchemist:"⚗️",npc:"🧑",dungeon:"💀",forest:"🌲",exit:"🚪",home:"🏠",well:"🪣",stair:"🪜",gate:"⛓️",sanctuary:"🌀",sign:"📜"},m1={smith:"#ff9a4d",tavern:"#ffcf5a",store:"#6fd3ff",alchemist:"#b98cff",npc:"#8fe07a",dungeon:"#ff6b5a",forest:"#7fd06a",exit:"#ffd964",home:"#d8b06a",well:"#6fb8ff",stair:"#ffd964",gate:"#ff8a5a",sanctuary:"#c79bff",sign:"#e8dcc0"},g1=new Set(["smith","tavern","store","alchemist","dungeon","forest","exit","gate","sanctuary","npc"]);function _1(s,t,e,n,i,r,a,o,l,c,h){const d={};for(const b of i??[])d[b.id]=b;let u=null;const f={ArrowUp:"forward",KeyW:"forward",ArrowDown:"back",KeyS:"back",ArrowLeft:"turnLeft",KeyA:"turnLeft",ArrowRight:"turnRight",KeyD:"turnRight",KeyQ:"strafeLeft",KeyE:"strafeRight",Space:"interact",Enter:"interact",KeyF:"interact",KeyJ:"attack",KeyK:"attack"};window.addEventListener("keydown",b=>{const R=f[b.code];R&&(b.preventDefault(),t(R))});let g=null,_=null,m=null,p=null,y=null,v=null,x=!1;const E=[];g=document.createElement("div"),g.id="gh-weapon-rig",_=document.createElement("img"),_.id="gh-weapon",_.src=e,_.alt="",g.appendChild(_),m=document.createElement("div"),m.id="gh-slash",m.innerHTML='<svg viewBox="0 0 240 200" preserveAspectRatio="none"><defs><linearGradient id="ghslashg" x1="0" y1="0" x2="1" y2="0.5"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.5" stop-color="#eaf6ff" stop-opacity="0.95"/><stop offset="1" stop-color="#bfe3ff" stop-opacity="0"/></linearGradient></defs><path d="M18,64 C82,20 172,30 226,112 C162,70 92,74 26,90 Z" fill="url(#ghslashg)"/><path d="M28,68 C88,30 168,42 214,104" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85"/></svg>',g.appendChild(m),s.appendChild(g),p=document.createElement("div"),p.id="gh-impact",s.appendChild(p),y=document.createElement("div"),y.id="gh-shock",s.appendChild(y),v=document.createElement("div"),v.id="gh-screenflash",s.appendChild(v);let S=null;const A=document.createElement("div");A.id="gh-hud",A.innerHTML='<div class="gh-hud-bar gh-hud-hp"><div class="gh-hud-fill gh-hud-hp-fill"></div></div><div class="gh-hud-bar gh-hud-mp"><div class="gh-hud-fill gh-hud-mp-fill"></div></div>',s.appendChild(A);const C=A.querySelector(".gh-hud-hp-fill"),M=A.querySelector(".gh-hud-mp-fill"),w=document.createElement("div");w.id="gh-map";const P=document.createElement("canvas");P.id="gh-map-canvas",P.width=132,P.height=132,w.appendChild(P);const I=document.createElement("button");I.id="gh-map-expand",I.title="Expandir mapa (M)",I.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',w.appendChild(I),s.appendChild(w);const N=P.getContext("2d"),H=4,X=document.createElement("div");X.id="gh-bigmap",X.className="gh-bigmap-hidden",X.innerHTML='<div id="gh-bigmap-win"><button id="gh-bigmap-close" title="Fechar (Esc/M)">✕</button><canvas id="gh-bigmap-canvas" width="720" height="720"></canvas></div>',s.appendChild(X);const q=X.querySelector("#gh-bigmap-canvas"),it=q.getContext("2d");let j=null,gt=0;const yt=()=>!X.classList.contains("gh-bigmap-hidden"),Ct=(b,R,G,O,Y)=>{b.save(),b.translate(R,G),b.rotate(Y),b.beginPath(),b.moveTo(O,0),b.lineTo(-O*.7,O*.62),b.lineTo(-O*.7,-O*.62),b.closePath(),b.fillStyle="#ffd964",b.shadowColor="rgba(255,210,90,.9)",b.shadowBlur=5,b.fill(),b.restore()},Vt=(b,R,G,O,Y,K,ot)=>{const ht=m1[Y.kind]??"#e8dcc0";if(g1.has(Y.kind)){const Z=(K*1.6+(Y.c+Y.r)*.35)%1;b.save(),b.globalAlpha=(1-Z)*.55,b.strokeStyle=ht,b.lineWidth=Math.max(1,O*.09),b.beginPath(),b.arc(R,G,O*(.5+Z*.7),0,Math.PI*2),b.stroke(),b.restore()}if(b.save(),b.beginPath(),b.arc(R,G,O*.52,0,Math.PI*2),b.fillStyle="rgba(10,10,14,.82)",b.fill(),b.lineWidth=Math.max(1,O*.1),b.strokeStyle=ht,b.shadowColor=ht,b.shadowBlur=O*.5,b.stroke(),b.restore(),b.save(),b.font=`${Math.round(O*.82)}px "Segoe UI Emoji","Noto Color Emoji",serif`,b.textAlign="center",b.textBaseline="middle",b.fillText(p1[Y.kind]??"•",R,G+O*.04),b.restore(),ot&&Y.label){const Z=Y.kind==="npc";b.save(),b.font=`600 ${Math.max(9,Math.round(O*(Z?.46:.56)))}px "Cinzel",serif`,b.textAlign="center",b.textBaseline="top";const xt=G+O*.6;b.lineWidth=3.5,b.strokeStyle="rgba(0,0,0,.9)",b.strokeText(Y.label,R,xt),b.fillStyle=Z?"#c8d6ea":"#f7e9c4",b.fillText(Y.label,R,xt),b.restore()}},ae=(b,R,G,O)=>{b.save();const Y=b.createLinearGradient(0,0,0,O);Y.addColorStop(0,"rgba(8,8,12,.9)"),Y.addColorStop(1,"rgba(8,8,12,0)"),b.fillStyle=Y,b.fillRect(0,0,R,O),G&&(b.font=`700 ${Math.round(O*.5)}px "Cinzel",serif`,b.textAlign="center",b.textBaseline="middle",b.fillStyle="#f4d873",b.shadowColor="#000",b.shadowBlur=4,b.fillText(G,R/2,O*.52)),b.shadowBlur=0,b.font=`700 ${Math.round(O*.44)}px "Cinzel",serif`,b.textAlign="left",b.textBaseline="middle",b.fillStyle="#9fb4d6",b.fillText("N",5,O*.52),b.restore()},tt=b=>{const R=N;if(!R)return;const G=window.devicePixelRatio||1,O=Math.round(P.clientWidth*G);O>0&&P.width!==O&&(P.width=O,P.height=O);const Y=P.width,K=P.height;R.clearRect(0,0,Y,K),R.fillStyle="#0b0d12",R.fillRect(0,0,Y,K);const ot=H,ht=2*ot+1,Z=Math.floor(Y/ht),xt=Math.floor((Y-Z*ht)/2);for(let se=-ot;se<=ot;se++)for(let zt=-ot;zt<=ot;zt++){const nt=b.col+zt,ue=b.row+se,te=nt>=0&&nt<b.cols&&ue>=0&&ue<b.rows;R.fillStyle=te?b.cells[ue*b.cols+nt]?"#54606f":"#171b22":"#0b0d12",R.fillRect(xt+(zt+ot)*Z,xt+(se+ot)*Z,Z-1,Z-1)}if(b.pois)for(const se of b.pois){const zt=se.c-b.col,nt=se.r-b.row;if(Math.abs(zt)>ot||Math.abs(nt)>ot)continue;const ue=xt+(zt+ot)*Z+Z/2,te=xt+(nt+ot)*Z+Z/2;Vt(R,ue,te,Z*1.05,se,gt,!1)}const Ot=xt+ot*Z+Math.floor(Z/2),Ft=gt*1.1%1;R.save(),R.globalAlpha=(1-Ft)*.5,R.strokeStyle="#ffe08a",R.lineWidth=2,R.beginPath(),R.arc(Ot,Ot,Z*(.4+Ft*.6),0,Math.PI*2),R.stroke(),R.restore(),Ct(R,Ot,Ot,Math.max(4,Z*.42),Math.atan2(b.dr,b.dc)),ae(R,Y,b.locName,Math.round(K*.16))},dt=b=>{const R=it;if(!R)return;const G=q.width,O=q.height;R.clearRect(0,0,G,O),R.fillStyle="#0b0d12",R.fillRect(0,0,G,O);const Y=40,K=Math.max(3,Math.floor(Math.min((G-2*Y)/b.cols,(O-2*Y)/b.rows))),ot=K*b.cols,ht=K*b.rows,Z=Math.round((G-ot)/2),xt=Math.round((O-ht)/2);for(let Ot=0;Ot<b.rows;Ot++)for(let Ft=0;Ft<b.cols;Ft++)R.fillStyle=b.cells[Ot*b.cols+Ft]?"#5a6675":"#171b22",R.fillRect(Z+Ft*K,xt+Ot*K,K-1,K-1);if(b.pois){const Ot=Math.max(15,K*1.15),Ft=[...b.pois].sort((se,zt)=>(se.kind==="npc"?0:1)-(zt.kind==="npc"?0:1));for(const se of Ft)Vt(R,Z+se.c*K+K/2,xt+se.r*K+K/2,se.kind==="npc"?Ot*.78:Ot,se,gt,!0)}Ct(R,Z+b.col*K+K/2,xt+b.row*K+K/2,Math.max(8,K*.8),Math.atan2(b.dr,b.dc)),ae(R,G,b.locName,40)},Rt=()=>{X.classList.remove("gh-bigmap-hidden"),j&&dt(j)},_t=()=>X.classList.add("gh-bigmap-hidden");I.addEventListener("click",b=>{b.preventDefault(),Rt()}),X.querySelector("#gh-bigmap-close").addEventListener("click",b=>{b.preventDefault(),_t()}),X.addEventListener("click",b=>{b.target===X&&_t()}),window.addEventListener("keydown",b=>{b.code==="KeyM"?(b.preventDefault(),yt()?_t():Rt()):b.code==="Escape"&&_t()});let Nt=0;const Gt=b=>{requestAnimationFrame(Gt),!(b-Nt<55)&&(Nt=b,gt=b/1e3,!(!j||document.hidden)&&(yt()?dt(j):P.clientWidth>0&&tt(j)))};requestAnimationFrame(Gt);const Bt=document.createElement("div");Bt.id="gh-clock",Bt.innerHTML=`<img class="gh-sun" src="${o1}" alt="" draggable="false"/><img class="gh-moon" src="${a1}" alt="" draggable="false"/>`,s.appendChild(Bt);const re=Bt.querySelector(".gh-sun"),Wt=Bt.querySelector(".gh-moon"),oe=document.createElement("button");oe.id="gh-char-btn",oe.title="Personagem (C)",oe.innerHTML=`<img class="gh-char-ico" src="${r1}" alt=""/>`,s.appendChild(oe);const z=[{key:"main",label:"Arma",gc:"1 / 3",gr:"1 / 5"},{key:"off",label:"Secundária",gc:"7 / 9",gr:"1 / 5"},{key:"head",label:"Elmo",gc:"4 / 6",gr:"1 / 3"},{key:"amulet",label:"Amul.",gc:"6 / 7",gr:"2 / 3"},{key:"chest",label:"Peitoral",gc:"4 / 6",gr:"3 / 6"},{key:"ring1",label:"Anel",gc:"3 / 4",gr:"4 / 5"},{key:"ring2",label:"Anel",gc:"6 / 7",gr:"4 / 5"},{key:"hands",label:"Luvas",gc:"2 / 4",gr:"5 / 7"},{key:"belt",label:"Cinto",gc:"4 / 6",gr:"6 / 7"},{key:"feet",label:"Botas",gc:"6 / 8",gr:"5 / 7"}],Ce=b=>`<div class="gh-slot" data-slot="${b.key}" title="${b.label}" style="grid-column:${b.gc};grid-row:${b.gr}"></div>`,Kt=20,Jt=Array.from({length:Kt},(b,R)=>`<div class="gh-bag-slot" data-bag="${R}"></div>`).join(""),Mt=document.createElement("div");Mt.id="gh-eq",Mt.className="gh-eq-hidden",Mt.innerHTML='<div id="gh-eq-win"><button id="gh-eq-close" title="Fechar (Esc)">✕</button><div id="gh-eq-inner"><div class="gh-eq-title">Personagem</div><div class="gh-eq-tabs"><button class="gh-tab gh-tab-on" data-tab="equip">Equipamento</button><button class="gh-tab" data-tab="stats">Atributos</button><button class="gh-tab" data-tab="skills">Habilidades</button></div><div class="gh-eq-body"><div class="gh-tabpane" data-pane="equip"><div class="gh-section"><div class="gh-sec-head">Equipamentos</div><div class="gh-eq-doll">'+z.map(Ce).join("")+`</div></div><div class="gh-section"><div class="gh-sec-head gh-sec-inv">Inventário<span class="gh-gold" id="gh-gold"><img src="${va}" alt=""/><b>0</b></span></div><div class="gh-bag">${Jt}</div></div></div><div class="gh-tabpane gh-pane-hidden" data-pane="stats"><div class="gh-eq-stats" id="gh-eq-stats"></div></div><div class="gh-tabpane gh-pane-hidden" data-pane="skills"><div id="gh-skills"></div></div></div></div></div>`,s.appendChild(Mt);const Qt=document.createElement("div");Qt.id="gh-sm",Qt.className="gh-eq-hidden",Qt.innerHTML='<div id="gh-sm-win"><button id="gh-sm-close" title="Fechar">✕</button><div id="gh-sm-body"></div><div id="gh-sm-flash"></div></div>',s.appendChild(Qt);const Pt=Qt.querySelector("#gh-sm-body"),U=Qt.querySelector("#gh-sm-flash");Qt.querySelector("#gh-sm-close").addEventListener("click",b=>{b.preventDefault(),Qt.classList.add("gh-eq-hidden")});const T=(b,R)=>{U.textContent=b,U.className="",U.offsetWidth,U.classList.add("gh-flash-show",R?"gh-flash-ok":"gh-flash-fail"),window.setTimeout(()=>{U.className=""},1600)},W=b=>{const R=(ht,Z,xt,Ot,Ft=!1)=>{const se=xt>=Z,zt=Ft?`<img src="${va}" alt=""/>`:ht;return`<div class="gh-sm-mat"><div class="gh-sm-mslot${Ft?" gh-sm-mgold":""}">${zt}</div><div class="gh-sm-mnum ${se?"gh-ok":"gh-no"}">${Z}<span class="gh-sm-mhave">/${xt}</span></div><div class="gh-sm-cap">${Ot}</div></div>`},G=(ht,Z,xt=!1)=>`<div class="gh-sm-slotwrap"><div class="gh-slot gh-sm-slot${xt?" gh-sm-res":""}"><img class="gh-item-ico" src="${ht}"/></div><span class="gh-sm-tier${xt?" gh-sm-tier-up":""}">+${Z}</span></div>`,O=b.sel;let Y;if(!O)Y='<div class="gh-sm-empty">Escolha um item no inventário abaixo para aprimorar.</div>';else if(O.max||!O.next)Y='<div class="gh-sm-forge"><div class="gh-sm-col"><div class="gh-sm-lbl">ITEM</div>'+G(O.icon,O.lvl)+`<div class="gh-sm-nm">${O.name} +${O.lvl}</div><div class="gh-sm-dmg">Dano ${O.dmg}</div></div></div><div class="gh-sm-max">Reforço máximo atingido.</div>`;else{const ht=O.next,Z=b.gold>=ht.gold,xt=b.mats.madeira>=ht.madeira&&b.mats.minerio>=ht.minerio&&b.mats.reforco>=ht.reforco&&Z;Y='<div class="gh-sm-forge"><div class="gh-sm-col"><div class="gh-sm-lbl">ITEM</div>'+G(O.icon,O.lvl)+`<div class="gh-sm-nm">${O.name}${O.lvl?" +"+O.lvl:""}</div><div class="gh-sm-dmg">Dano ${O.dmg}</div></div><div class="gh-sm-anvil" id="gh-sm-anvil" style="--fk:0"><img class="gh-sm-sword-base" src="${Ti}" alt=""/><div class="gh-sm-sword-fill"><div class="gh-sm-sword-lava"></div><span class="gh-sm-front"></span></div><img class="gh-sm-sword-glow" src="${Ti}" alt=""/><div class="gh-sm-embers"><i></i><i></i><i></i><i></i><i></i><i></i></div></div><div class="gh-sm-col"><div class="gh-sm-lbl">RESULTADO</div>`+G(O.icon,O.lvl+1,!0)+`<div class="gh-sm-nm gh-up">${O.name} +${O.lvl+1}</div><div class="gh-sm-dmg">Dano <span class="gh-g">${ht.dmg} ▲</span></div></div></div><div class="gh-sm-mats-h">MATERIAIS NECESSÁRIOS</div><div class="gh-sm-mats">`+R("🪵",ht.madeira,b.mats.madeira,"Madeira")+R("🪨",ht.minerio,b.mats.minerio,"Minério")+R("🔶",ht.reforco,b.mats.reforco,"Pedra de Reforço")+R("",ht.gold,b.gold,"Ouro",!0)+`</div><button class="gh-sm-btn${xt?"":" gh-sm-dim"}" id="gh-sm-up"${xt?"":" disabled"}>${xt?"APRIMORAR":"FALTAM MATERIAIS"}</button>`}const K=[];for(let ht=0;ht<Kt;ht++){const Z=b.items[ht];if(!Z){K.push('<div class="gh-bag-slot gh-sm-cell"></div>');continue}K.push(`<div class="gh-bag-slot gh-sm-cell ${O&&Z.id===O.id?"gh-sm-sel":""}" data-sid="${Z.id}"><img class="gh-item-ico" src="${Z.icon}" title="${Z.name}"/>${Z.lvl?`<span class="gh-sm-badge">+${Z.lvl}</span>`:""}</div>`)}Pt.innerHTML=`<div class="gh-eq-title gh-sm-title">Ferreiro — A Bigorna</div><div class="gh-section gh-sm-sec">${Y}</div><div class="gh-section gh-sm-sec gh-sm-sec-inv"><div class="gh-sec-head gh-sec-inv">Inventário<span class="gh-gold"><img src="${va}" alt=""/><b>${b.gold}</b></span></div><div class="gh-bag gh-sm-bag">${K.join("")}</div></div>`,Pt.querySelectorAll("[data-sid]").forEach(ht=>{ht.onclick=()=>c?.(ht.dataset.sid)});const ot=Pt.querySelector("#gh-sm-up");ot&&!ot.disabled&&(ot.onclick=()=>{const ht=Pt.querySelector("#gh-sm-anvil");if(!ht||ot.classList.contains("gh-sm-busy"))return;ot.classList.add("gh-sm-busy");const Z=h?.();if(!Z){ot.classList.remove("gh-sm-busy");return}f1(ht,()=>{const xt=ht.querySelector(".gh-sm-sword-fill"),Ot=ht.querySelector(".gh-sm-sword-base");ht.classList.remove("gh-forging"),Z.success?(Ml(jl),T("SUCESSO!",!0),Ot.style.filter="",ht.classList.add("gh-forge-ok"),setTimeout(()=>W(Z.data),1200)):(Ml(Yl),T("FALHOU!",!1),ht.classList.add("gh-forge-fail"),Ot.style.filter="brightness(.24) saturate(.3) drop-shadow(0 2px 4px #000)",xt.style.transition="width .5s ease-in",xt.style.width="0%",setTimeout(()=>W(Z.data),1300))})})};Mt.querySelectorAll(".gh-tab").forEach(b=>b.addEventListener("click",R=>{R.preventDefault();const G=b.dataset.tab;Mt.querySelectorAll(".gh-tab").forEach(O=>O.classList.toggle("gh-tab-on",O===b)),Mt.querySelectorAll(".gh-tabpane").forEach(O=>O.classList.toggle("gh-pane-hidden",O.dataset.pane!==G))}));const st=Mt.querySelector("#gh-eq-stats");st.addEventListener("click",b=>{const R=b.target.closest(".gh-pm");if(!R||R.hasAttribute("disabled"))return;b.preventDefault();const G=R.dataset.attr,O=Number(R.dataset.d||"0");G&&O&&l?.(G,O)});const at=Mt.querySelector("#gh-gold b"),et=Array.from(Mt.querySelectorAll(".gh-bag-slot")),Tt=Mt.querySelector("#gh-skills");let vt="",St=0;const $t={};let ct=null;const Et=()=>Object.values($t).reduce((b,R)=>b+R,0),Dt=b=>{const R=ls[vt];if(!R)return null;for(const G of R.branches){const O=G.skills.findIndex(Y=>Y.id===b);if(O>=0){const Y=G.skills[O],K=O>0?G.skills[O-1]:null,ot=!K||($t[K.id]||0)>=1,ht=$t[b]||0,Z=ht>=Y.maxRank,xt=St-Et();return{sk:Y,unlocked:ot,rank:ht,maxed:Z,canBuy:ot&&!Z&&xt>0}}}return null},Ut=()=>{const b=ls[vt];if(!b){Tt.innerHTML='<div class="gh-sk-soon">A árvore de habilidades desta classe chega em breve.</div>';return}const R=St-Et(),G=b.branches.map(ot=>{const ht=ot.skills.map((Z,xt)=>{const Ot=$t[Z.id]||0,Ft=xt>0?ot.skills[xt-1]:null,se=!Ft||($t[Ft.id]||0)>=1,zt=Ot>=Z.maxRank,nt=se&&!zt&&R>0,ue=Z.kind==="active"?"gh-sk-active":"gh-sk-passive",te=[Ot>0?"gh-sk-on":"",se?"":"gh-sk-locked",nt?"gh-sk-buy":"",Z.id===ct?"gh-sk-sel":""].join(" "),Ze=Z.stat?$l[Z.stat]:void 0,Vn=Z.kind==="active"&&Z.icon?`<img src="${Z.icon}" alt=""/>`:Ze?`<img src="${Ze}" alt=""/>`:`<span class="gh-sk-sym" style="color:${Z.stat?Dh[Z.stat].color:"#ccc"}">${Z.stat?Dh[Z.stat].sym:"?"}</span>`;return`${xt>0?`<div class="gh-sk-line" style="background:${ot.color}"></div>`:""}<button class="gh-sk-node ${ue} ${te}" data-sk="${Z.id}">${Vn}<span class="gh-sk-rank">${Ot}/${Z.maxRank}</span></button>`}).join("");return`<div class="gh-sk-branch"><div class="gh-sk-bhead" style="color:${ot.color}">${ot.name}</div>${ht}</div>`}).join("");let O='<div class="gh-sk-thint">Toque num nó pra ver os detalhes; depois confirme para gastar o ponto.</div>';const Y=ct?Dt(ct):null;if(Y){const{sk:ot,unlocked:ht,rank:Z,maxed:xt,canBuy:Ot}=Y;let Ft;xt?Ft='<span class="gh-sk-cbtn gh-sk-cdim">No máximo</span>':ht?Ot?Ft=`<button class="gh-sk-cbtn gh-sk-cbuy" id="gh-sk-confirm">${Z>0?`Melhorar → ${Z+1}/${ot.maxRank}`:"Aprender"} · 1 ponto</button>`:Ft='<span class="gh-sk-cbtn gh-sk-cdim">Sem pontos</span>':Ft='<span class="gh-sk-cbtn gh-sk-cdim">Requer o nó acima</span>',O=`<div class="gh-sk-tname"><b>${ot.name}</b> <i>${ot.kind==="active"?"Ativa":"Passiva"} · ${Z}/${ot.maxRank}</i></div><div class="gh-sk-tdesc">${ot.desc}</div>${Ft}`}Tt.innerHTML=`<div class="gh-sk-top">Pontos: <b class="${R>0?"gh-sk-pts":""}">${R}</b></div><div class="gh-sk-cols">${G}</div><div class="gh-sk-tip" id="gh-sk-tip">${O}</div>`,b.bg?(Tt.style.backgroundImage=`linear-gradient(rgba(7,7,11,.66), rgba(7,7,11,.66)), url(${b.bg})`,Tt.style.backgroundSize="cover",Tt.style.backgroundPosition="center top",Tt.style.backgroundRepeat="no-repeat"):Tt.style.backgroundImage="",Tt.querySelectorAll(".gh-sk-node").forEach(ot=>{ot.addEventListener("click",()=>{ct=ot.dataset.sk,Ut()})});const K=Tt.querySelector("#gh-sk-confirm");K&&K.addEventListener("click",()=>{const ot=ct?Dt(ct):null;ot&&ot.canBuy&&($t[ot.sk.id]=ot.rank+1,Ut(),a?.($t))})},At=()=>Mt.classList.remove("gh-eq-hidden"),Yt=()=>Mt.classList.add("gh-eq-hidden"),Xt=()=>Mt.classList.contains("gh-eq-hidden")?At():Yt();oe.addEventListener("click",b=>{b.preventDefault(),Xt()}),Mt.querySelector("#gh-eq-close").addEventListener("click",b=>{b.preventDefault(),Yt()}),Mt.addEventListener("click",b=>{b.target===Mt&&Yt()}),window.addEventListener("keydown",b=>{b.code==="KeyC"?(b.preventDefault(),Xt()):b.code==="Escape"&&Yt()});const le=document.createElement("div");le.id="gh-dmg",s.appendChild(le);const F=document.createElement("div");F.id="gh-toast",s.appendChild(F);const pt=document.createElement("div");pt.id="gh-cast",pt.innerHTML='<span class="gh-cast-name"></span><span class="gh-cast-frame"><span class="gh-cast-track"><i class="gh-cast-fill"></i></span></span>',s.appendChild(pt);const J=pt.querySelector(".gh-cast-name"),V=pt.querySelector(".gh-cast-fill");let rt=0;const lt=document.createElement("div");lt.id="gh-float",s.appendChild(lt);const mt=document.createElement("div");mt.id="pad",s.appendChild(mt);const Ht=b=>`<img class="gh-btn-ico" src="${b}" alt="" draggable="false"/>`,ie=(b,R)=>{let G;const O=K=>{K.preventDefault(),t(R),G=window.setInterval(()=>t(R),Ud)},Y=()=>{G&&window.clearInterval(G),G=void 0};b.addEventListener("pointerdown",O),b.addEventListener("pointerup",Y),b.addEventListener("pointerleave",Y),b.addEventListener("pointercancel",Y),b.addEventListener("contextmenu",K=>K.preventDefault())},jt=document.createElement("div");jt.className="gh-cluster gh-move";const de=(b,R)=>{const G=document.createElement("button");return G.className="gh-dtap "+R,ie(G,b),G};jt.appendChild(de("forward","gh-dup")),jt.appendChild(de("back","gh-ddown")),jt.appendChild(de("turnLeft","gh-dleft")),jt.appendChild(de("turnRight","gh-dright")),mt.appendChild(jt);const Me=document.createElement("button");Me.className="gh-btn gh-act",Me.innerHTML=Ht(s1);const Mn=b=>{b.preventDefault(),t("interact")};Me.addEventListener("pointerdown",Mn),Me.addEventListener("contextmenu",b=>b.preventDefault()),mt.appendChild(Me);let qe=null;{qe=document.createElement("button"),qe.className="gh-btn gh-atk",qe.innerHTML=Ht(i1);const b=R=>{R.preventDefault(),t("attack")};qe.addEventListener("pointerdown",b),qe.addEventListener("contextmenu",R=>R.preventDefault()),mt.appendChild(qe)}const Te=document.createElement("div");Te.id="gh-actbar",mt.appendChild(Te);const ke=46,cn=47,er=51,Ei=116,nr=176,ci=(b,R,G=Ei,O=nr)=>{const Y=[];for(let K=0;K<b;K++){const ht=(b===1?(G+O)/2:G+(O-G)*K/(b-1))*Math.PI/180,Z=cn+R*-Math.cos(ht),xt=er+R*Math.sin(ht);Y.push({right:Math.round(Z-ke/2),bottom:Math.round(xt-ke/2)})}return Y},ir=b=>{const R=Math.ceil(b/2);return[...ci(R,98),...ci(b-R,150)]},sr=6,rr=b=>{const R=sr,G=ir(R);let O="";for(let Y=0;Y<R;Y++){const K=G[Y]??{right:47,bottom:51},ot=b[Y];ot?O+=`<button class="gh-sslot" data-skill="${ot.id}" title="${ot.name}" style="right:${K.right}px;bottom:${K.bottom}px">`+(ot.icon?`<img src="${ot.icon}" alt=""/>`:'<span class="gh-ss-x">✦</span>')+'<span class="gh-ss-cool"></span><span class="gh-ss-cd"></span></button>':O+=`<span class="gh-sslot gh-ss-empty" style="right:${K.right}px;bottom:${K.bottom}px"><span class="gh-ss-rune">◈</span></span>`}Te.innerHTML=O,Te.style.display="block",Te.querySelectorAll(".gh-sslot[data-skill]").forEach(Y=>{Y.addEventListener("pointerdown",K=>{K.preventDefault();const ot=Y.dataset.skill;ot&&o?.(ot)}),Y.addEventListener("contextmenu",K=>K.preventDefault())})};rr([]);const Rn=document.createElement("div");Rn.id="gh-prompt",Rn.style.display="none",mt.appendChild(Rn);const sn=document.createElement("div");sn.id="gh-dialogue",sn.style.display="none",sn.innerHTML='<img class="gh-dlg-portrait" alt="" /><div class="gh-dlg-body"><div class="gh-dlg-name"></div><div class="gh-dlg-text"></div><div class="gh-dlg-hint">toque para continuar ▸</div></div>',sn.addEventListener("pointerdown",b=>{b.preventDefault(),t("interact")}),mt.appendChild(sn);const L=sn.querySelector(".gh-dlg-name"),B=sn.querySelector(".gh-dlg-text"),$=sn.querySelector(".gh-dlg-portrait");return x1(),{setPrompt(b){b?(Rn.textContent=b,Rn.style.display="block",Me.classList.add("gh-act-on")):(Rn.style.display="none",Me.classList.remove("gh-act-on"))},showDialogue(b,R,G){L.textContent=b,B.textContent=R,G?($.src=G,$.style.display="block"):($.removeAttribute("src"),$.style.display="none"),sn.style.display="flex",Rn.style.display="none"},hideDialogue(){sn.style.display="none"},setHealth(b){const R=Math.max(0,Math.min(1,b));C.style.width=R*100+"%",C.style.background=R>.5?"linear-gradient(#e35d4c,#b3241a)":R>.25?"linear-gradient(#e08a2c,#9a4a10)":"linear-gradient(#c23a24,#7a1610)"},setMana(b){const R=Math.max(0,Math.min(1,b));M.style.width=R*100+"%"},setStats(b){at&&(at.textContent=`${b.gold}`);const R=b.xpMax>0?Math.max(0,Math.min(1,b.xp/b.xpMax)):0,G=(Y,K,ot,ht)=>{const Z=ot<=ht||b.points<0?" disabled":"",xt=b.points<=0?" disabled":"";return`<div class="gh-prow"><span>${Y}</span><span class="gh-pstep"><button class="gh-pm" data-attr="${K}" data-d="-1"${Z}>−</button><b>${ot}</b><button class="gh-pm" data-attr="${K}" data-d="1"${xt}>＋</button></span></div>`},O=(Y,K)=>`<div class="gh-sec-row"><span>${Y}</span><b>${K}</b></div>`;st.innerHTML=`<div class="gh-eq-lvl">Nível ${b.level}<div class="gh-xp"><div class="gh-xp-fill" style="width:${R*100}%"></div></div></div><div class="gh-alloc-pts${b.points>0?" gh-pts-on":""}">Pontos a distribuir: <b>${b.points}</b></div><div class="gh-prim-box">`+G("Força","str",b.str,b.strMin)+G("Destreza","dex",b.dex,b.dexMin)+G("Inteligência","int",b.int,b.intMin)+'</div><div class="gh-sec-blocks"><div class="gh-sec-col"><h4>⚔️ Ofensivo</h4>'+O("Atq. Físico",b.atk)+O("Atq. Mágico",b.atkMag)+O("Crítico",b.crit+"%")+O("Dano Crít.",b.critDmg+"%")+O("Precisão",b.precision+"%")+'</div><div class="gh-sec-col"><h4>🛡️ Defensivo</h4>'+O("Vida",`${b.hp}/${b.hpMax}`)+O("Defesa",b.def)+O("Res. Mágica",b.magRes)+O("Evasão",b.evasion+"%")+'</div><div class="gh-sec-col"><h4>🔷 Recursos</h4>'+O("Mana",`${b.mp}/${b.mpMax}`)+O("Ouro",b.gold)+"</div></div>"},flashDamage(){le.style.animation="none",le.offsetWidth,le.style.animation="gh-dmg 360ms ease-out"},swingWeapon(){if(!_||!u||u.slot!=="main"||x)return-1;x=!0,E.forEach(nt=>window.clearTimeout(nt)),E.length=0,S||(S=s.querySelector("canvas"));const b=g,R=Ov[u.style],G=R.windup+R.strike+R.recover,O=u.cooldown??R.cooldown,Y=Math.round(R.windup+R.strike*.45),K=R.windup/G,ot=Y/G,ht=(R.windup+R.strike)/G,Z=R.weight,xt=nt=>`perspective(760px) rotateY(${nt.ry}deg) rotateX(${nt.rx}deg) rotateZ(${nt.rz}deg) translate(${nt.tx}%,${nt.ty}%) scale(${nt.s})`,Ot="drop-shadow(-6px 2px 8px rgba(0,0,0,0.45))",Ft=nt=>`${Ot} blur(${nt}px)`;if(b.getAnimations?.().forEach(nt=>nt.cancel()),b.animate([{transform:xt(Uh),filter:Ft(0),offset:0},{transform:xt(R.wind),filter:Ft(0),offset:K},{transform:xt(R.hit),filter:Ft(Math.min(3,1.6*Z)),offset:ot},{transform:xt(R.follow),filter:Ft(.3),offset:ht},{transform:xt(Uh),filter:Ft(0),offset:1}],{duration:G,easing:"ease-out",fill:"both"}),R.imgSpin&&_){_.getAnimations?.().forEach(te=>te.cancel());const nt=R.imgSpin,ue=te=>`perspective(620px) rotateY(${te}deg)`;_.animate([{transform:ue(0),offset:0},{transform:ue(nt.wind),offset:K},{transform:ue(nt.hit),offset:ot},{transform:ue(nt.follow),offset:ht},{transform:ue(0),offset:1}],{duration:G,easing:"ease-out",fill:"both"})}const se=R.fx==="arcBig"||R.fx==="smashwave",zt=R.fx==="smashwave";return E.push(window.setTimeout(()=>{if(m)if(m.getAnimations?.().forEach(nt=>nt.cancel()),R.fx==="streak")m.animate([{opacity:0,transform:"rotate(-4deg) scaleX(0.35) scaleY(0.5)"},{opacity:.9,transform:"rotate(-4deg) scaleX(1.15) scaleY(0.62)",offset:.3},{opacity:0,transform:"rotate(-4deg) scaleX(1.35) scaleY(0.66)"}],{duration:190,easing:"ease-out"});else if(zt)m.animate([{opacity:0,transform:"rotate(-8deg) scale(0.9)"},{opacity:.5,transform:"rotate(-8deg) scale(1.5) translateY(6%)",offset:.28},{opacity:0,transform:"rotate(-8deg) scale(1.75) translateY(10%)"}],{duration:230,easing:"ease-out"});else{const nt=R.fx==="arcBig"?1.34:1;m.animate([{opacity:0,transform:`rotate(-8deg) scale(${.7*nt})`},{opacity:.98,transform:`rotate(-8deg) scale(${1*nt})`,offset:.26},{opacity:0,transform:`rotate(-8deg) scale(${1.14*nt})`}],{duration:220,easing:"ease-out"})}if(y&&se){y.getAnimations?.().forEach(ue=>ue.cancel());const nt=zt?1.55:1.05;y.animate([{opacity:0,transform:"translate(-50%,-50%) scale(0.2)"},{opacity:zt?.95:.8,transform:`translate(-50%,-50%) scale(${.72*nt})`,offset:.22},{opacity:0,transform:`translate(-50%,-50%) scale(${1.4*nt})`}],{duration:Math.round(240+Z*80),easing:"ease-out"})}if(p){p.getAnimations?.().forEach(ue=>ue.cancel());const nt=Math.max(.85,.7+.42*(Z-1)+.42);p.animate([{opacity:0,transform:"scale(0.4)"},{opacity:Math.min(1,.66+.16*Z),transform:`scale(${nt})`,offset:.26},{opacity:0,transform:`scale(${1.5*(.9+.18*Z)})`}],{duration:Math.round(190+Z*60),easing:"ease-out"})}if(v&&zt&&(v.getAnimations?.().forEach(nt=>nt.cancel()),v.animate([{opacity:0},{opacity:.55,offset:.18},{opacity:0}],{duration:220,easing:"ease-out"})),S){S.getAnimations?.().forEach(ue=>ue.cancel());const nt=Z;zt?S.animate([{transform:"translate(0,0) scale(1)"},{transform:`translate(${-1.1*nt}%,${1.3*nt}%) scale(${1+.024*nt}) rotate(${-.6*nt}deg)`,offset:.14},{transform:`translate(${.7*nt}%,${-.6*nt}%) scale(${1+.012*nt}) rotate(${.4*nt}deg)`,offset:.34},{transform:`translate(${-.5*nt}%,${.5*nt}%) scale(${1+.006*nt}) rotate(${-.2*nt}deg)`,offset:.56},{transform:"translate(0,0) scale(1)"}],{duration:Math.round(280+Z*55),easing:"ease-out"}):S.animate([{transform:"translate(0,0) scale(1)"},{transform:`translate(${-.8*nt}%,${1*nt}%) scale(${1+.018*nt}) rotate(${-.45*nt}deg)`,offset:.18},{transform:`translate(${.45*nt}%,${-.35*nt}%) scale(${1+.005*nt}) rotate(${.18*nt}deg)`,offset:.46},{transform:"translate(0,0) scale(1)"}],{duration:Math.round(200+Z*45),easing:"ease-out"})}},Y)),E.push(window.setTimeout(()=>x=!1,O)),Y},setInventory(b){et.forEach((R,G)=>{const O=b[G];R.onclick=null,O&&d[O]?(R.dataset.wid=O,R.innerHTML=`<img class="gh-item-ico" src="${d[O].url}" alt="" title="${d[O].name}"/>`,R.onclick=()=>this.equipWeapon(O)):(delete R.dataset.wid,R.innerHTML="")})},equipWeapon(b){const R=d[b];if(!R)return;const G=Y=>{const K=Mt.querySelector(`.gh-slot[data-slot="${Y}"]`);K&&(K.innerHTML=`<img class="gh-item-ico" src="${R.url}" alt="" title="${R.name}"/>`)};R.slot==="off"?G("off"):(u=R,x=!1,E.forEach(Y=>window.clearTimeout(Y)),E.length=0,g?.getAnimations?.().forEach(Y=>Y.cancel()),_?.getAnimations?.().forEach(Y=>Y.cancel()),_.style.transform="",_.src=R.url,g&&(g.style.height=`${(62*R.scale).toFixed(1)}vh`,g.style.maxHeight=`${Math.round(640*R.scale)}px`),s.classList.toggle("gh-wpn-arcane",R.tint==="arcane"),G("main"),r?.(R)),et.forEach(Y=>Y.classList.remove("gh-slot-pulse"));const O=Mt.querySelector(`.gh-bag-slot[data-wid="${b}"]`);O&&(O.classList.remove("gh-slot-pulse"),O.offsetWidth,O.classList.add("gh-slot-pulse"))},openSmith(b){W(b),Qt.classList.remove("gh-eq-hidden")},closeSmith(){Qt.classList.add("gh-eq-hidden")},updateMinimap(b){j=b,tt(b),yt()&&dt(b)},setSkillInfo(b,R){vt=b,St=R,Ut()},setActionBar(b){rr(b)},setSkillCooldown(b,R,G){const O=Te.querySelector(`.gh-sslot[data-skill="${b}"]`);if(!O)return;const Y=O.querySelector(".gh-ss-cool"),K=O.querySelector(".gh-ss-cd");if(R<=0){Y&&(Y.style.opacity="0",Y.style.setProperty("--gh-cd","0deg")),K&&(K.textContent="");return}Y&&(Y.style.opacity="1",Y.style.setProperty("--gh-cd",(Math.max(0,Math.min(1,R))*360).toFixed(1)+"deg")),K&&(K.textContent=String(G))},skillManaFloat(b,R){const G=Te.querySelector(`.gh-sslot[data-skill="${b}"]`);if(!G)return;const O=G.getBoundingClientRect();this.floatText(O.left+O.width/2,O.top-2,`-${R}`,"mana")},floatText(b,R,G,O){const Y=document.createElement("div");Y.className="gh-float-n gh-fl-"+O,Y.textContent=G;const K=Math.abs(b*7+R*13)%24-12|0;Y.style.left=b+K+"px",Y.style.top=R+"px",lt.appendChild(Y),window.setTimeout(()=>Y.remove(),1e3)},toast(b){F.textContent=b,F.style.animation="none",F.offsetWidth,F.style.animation="gh-toast 1.8s ease-out"},castBar(b,R){rt&&window.clearTimeout(rt),J.textContent=b,pt.classList.add("gh-cast-on"),V.style.transition="none",V.style.width="0%",V.offsetWidth,V.style.transition=`width ${R}ms linear`,V.style.width="100%",rt=window.setTimeout(()=>{pt.classList.remove("gh-cast-on"),rt=0},R)},cancelCast(){rt&&window.clearTimeout(rt),rt=0,pt.classList.remove("gh-cast-on")},setClock(b,R){const G=(b-.25)*Math.PI*2,O=33,Y=(ot,ht)=>{const Z=Math.sin(ht),xt=-Math.cos(ht);ot.style.left=50+Z*O+"%",ot.style.top=50+xt*O+"%"};Y(re,G),Y(Wt,G+Math.PI);const K=Math.max(0,Math.min(1,R));re.style.opacity=(.28+.72*K).toFixed(3),Wt.style.opacity=(.28+.72*(1-K)).toFixed(3),re.style.filter=`drop-shadow(0 0 ${(3+7*K).toFixed(1)}px rgba(240,180,70,${(.5*K+.15).toFixed(2)}))`,Wt.style.filter=`drop-shadow(0 0 ${(3+7*(1-K)).toFixed(1)}px rgba(150,190,255,${(.5*(1-K)+.15).toFixed(2)}))`}}}function x1(){if(document.getElementById("gh-style"))return;const s=document.createElement("style");s.id="gh-style",s.textContent=`
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
    background:url(${e1}) no-repeat center / 100% 100%;
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
    border-image:url(${ba}) 130 repeat;
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
    border-image:url(${ba}) 130 repeat;
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
    background:url(${Vr}) no-repeat center / 100% 100%;
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
    border-image:url(${Ih}) 90 fill;
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
    border:clamp(22px,3.4vh,34px) solid transparent; border-image:url(${Ih}) 90 fill;
    filter:drop-shadow(0 6px 20px rgba(0,0,0,.6));
  }
  @media (max-width:640px){ #gh-sm-win { width:100vw; height:100dvh; border-width:clamp(15px,2.6vh,24px); } }
  #gh-sm-close { position:absolute; right:6px; top:6px; z-index:2; width:34px; height:34px; border-radius:8px; cursor:pointer; font-size:16px; background:rgba(20,16,11,.66); color:#e8d9b0; border:2px solid rgba(201,162,39,.55); }
  /* TUDO numa janela só, SEM rolagem (mobile mostra os 20 slots de uma vez) */
  #gh-sm-body { width:100%; height:100%; display:flex; flex-direction:column; gap:1.4%; color:#e8dcc0; overflow:hidden; }
  .gh-sm-title { flex:0 0 auto; position:relative; padding:0 8px; }
  .gh-sm-sec { flex:0 0 auto; padding:2% 3.5% 2.6%; }
  .gh-sm-forge { display:flex; align-items:flex-start; justify-content:center; gap:2%; }
  .gh-sm-col { display:flex; flex-direction:column; align-items:center; gap:3px; width:42%; }
  .gh-sm-lbl { font-size:clamp(10px,1.5vh,12px); letter-spacing:1px; color:#b39a63; font-family:"Cinzel",serif; }
  /* slot da forja num WRAPPER que NÃO corta → o selo +N fica fora, inteiro */
  .gh-sm-slotwrap { position:relative; width:clamp(58px,10vh,84px); height:clamp(58px,10vh,84px); overflow:visible; }
  .gh-sm-slot { width:100%; height:100%; }
  .gh-sm-tier { position:absolute; top:-9px; right:-11px; z-index:3; font-family:"Cinzel",serif; font-size:clamp(11px,1.7vh,14px); font-weight:700; color:#12100a; background:linear-gradient(#e9cf72,#b7862a); border-radius:7px; padding:1px 7px; border:1px solid #6b4f18; box-shadow:0 1px 4px #000; }
  .gh-sm-tier-up { background:linear-gradient(#8fe07a,#3f9a2e); border-color:#215016; box-shadow:0 0 8px rgba(120,240,110,.6); }
  .gh-sm-res { box-shadow:0 0 16px 3px rgba(244,216,115,.5); border-radius:8px; }
  .gh-sm-res .gh-item-ico { filter:drop-shadow(0 0 8px rgba(255,224,130,.9)); }
  .gh-sm-nm { font-size:clamp(12px,1.7vh,14px); color:#efe2c0; text-align:center; line-height:1.12; min-height:2.3em; margin-top:6px; }
  .gh-sm-nm.gh-up { color:#f6ead0; }
  .gh-sm-dmg { font-size:clamp(11px,1.6vh,13px); color:#c7b789; }
  .gh-sm-dmg .gh-g { color:#8fdf7a; font-weight:700; }
  /* NO LUGAR DA SETINHA: a espada do loading, apagada; enche esq→dir ao aprimorar.
     Efeito rico: frente derretida, brasas subindo, brilho e lâmina esquentando.
     margin-top centraliza a espada na ALTURA dos dois slots. --fk (0→1) = progresso. */
  .gh-sm-anvil { position:relative; align-self:flex-start; flex:0 0 auto; overflow:visible;
    width:clamp(44px,8.6vh,72px); aspect-ratio:332/81;
    margin-top:calc(clamp(10px,1.5vh,12px) + 3px + (clamp(58px,10vh,84px) - clamp(44px,8.6vh,72px) * 0.244) / 2); }
  .gh-sm-sword-base { position:relative; z-index:1; width:100%; height:100%; display:block; filter:brightness(.24) saturate(.3) drop-shadow(0 2px 4px #000); transition:filter .3s; }
  .gh-sm-sword-fill { position:absolute; left:0; top:0; bottom:0; width:0%; overflow:hidden; z-index:2; }
  .gh-sm-sword-lava {
    position:absolute; left:0; top:0; height:100%; width:clamp(44px,8.6vh,72px);
    -webkit-mask:url(${Ti}) left center / 100% 100% no-repeat;
    mask:url(${Ti}) left center / 100% 100% no-repeat;
    background:
      radial-gradient(55% 150% at 20% 30%, rgba(255,248,200,.75), transparent 55%),
      radial-gradient(48% 160% at 55% 72%, rgba(255,160,50,.72), transparent 60%),
      radial-gradient(42% 150% at 84% 40%, rgba(255,110,26,.68), transparent 62%),
      linear-gradient(90deg,#5c1604 0,#c23a0c 30%,#f4700f 56%,#ffb23e 78%,#ffe487 92%,#fff8d6 100%);
    background-size:170% 210%,200% 240%,220% 200%,100% 100%; background-repeat:no-repeat;
  }
  /* frente incandescente que viaja com o nível de preenchimento (borda direita) */
  .gh-sm-front { position:absolute; top:0; bottom:0; right:0; width:9px; opacity:0; pointer-events:none;
    background:linear-gradient(90deg, transparent, rgba(255,196,80,.85) 45%, #fff7d6);
    filter:blur(1.5px); }
  /* bloom aditivo sobre a lâmina inteira, cresce com o progresso */
  .gh-sm-sword-glow { position:absolute; inset:0; z-index:3; width:100%; height:100%; pointer-events:none;
    opacity:0; mix-blend-mode:screen;
    filter:brightness(1.7) sepia(1) saturate(6) hue-rotate(-18deg) drop-shadow(0 0 6px rgba(255,150,40,.9)); }
  /* brasas subindo da lâmina */
  .gh-sm-embers { position:absolute; inset:0; z-index:4; pointer-events:none; overflow:visible; opacity:0; }
  .gh-sm-embers i { position:absolute; bottom:34%; width:3px; height:3px; border-radius:50%;
    background:radial-gradient(circle, #fff3c4, #ff8a2b 60%, transparent); opacity:0;
    filter:drop-shadow(0 0 3px rgba(255,150,40,.95)); }
  .gh-sm-embers i:nth-child(1){ left:10%; } .gh-sm-embers i:nth-child(2){ left:26%; }
  .gh-sm-embers i:nth-child(3){ left:42%; } .gh-sm-embers i:nth-child(4){ left:58%; }
  .gh-sm-embers i:nth-child(5){ left:74%; } .gh-sm-embers i:nth-child(6){ left:88%; }
  /* ---- estados ---- */
  .gh-sm-anvil.gh-forging { animation:gh-smpulse 1.1s ease-in-out infinite;
    filter:drop-shadow(0 0 calc(4px + var(--fk,0) * 22px) rgba(255,150,50, calc(.35 + var(--fk,0) * .6)))
           drop-shadow(0 0 calc(2px + var(--fk,0) * 7px) rgba(255,238,150,.95)); }
  .gh-sm-anvil.gh-forging .gh-sm-sword-lava { animation:gh-smlava 1.8s ease-in-out infinite; }
  .gh-sm-anvil.gh-forging .gh-sm-front { opacity:1; }
  .gh-sm-anvil.gh-forging .gh-sm-sword-glow { opacity:calc(var(--fk,0) * .55); }
  .gh-sm-anvil.gh-forging .gh-sm-embers { opacity:1; }
  .gh-sm-anvil.gh-forging .gh-sm-embers i { animation:gh-ember 1.3s ease-out infinite; }
  .gh-sm-embers i:nth-child(1){ animation-delay:0s; } .gh-sm-embers i:nth-child(2){ animation-delay:.5s; }
  .gh-sm-embers i:nth-child(3){ animation-delay:.9s; } .gh-sm-embers i:nth-child(4){ animation-delay:.3s; }
  .gh-sm-embers i:nth-child(5){ animation-delay:1.1s; } .gh-sm-embers i:nth-child(6){ animation-delay:.7s; }
  .gh-sm-anvil.gh-forge-ok { animation:gh-smflash .8s ease-out 1;
    filter:drop-shadow(0 0 20px rgba(255,180,70,1)) drop-shadow(0 0 8px rgba(255,244,170,1)); }
  .gh-sm-anvil.gh-forge-ok .gh-sm-sword-base { filter:brightness(1.05) saturate(1.3) drop-shadow(0 0 9px rgba(255,206,110,.95)); }
  .gh-sm-anvil.gh-forge-fail { animation:gh-smshake .45s ease-in-out 1; }
  @keyframes gh-smlava {
    0%   { background-position:10% 28%, 82% 72%, 38% 50%, 0 0; }
    50%  { background-position:52% 70%, 40% 30%, 76% 60%, 0 0; }
    100% { background-position:10% 28%, 82% 72%, 38% 50%, 0 0; }
  }
  @keyframes gh-ember {
    0%   { transform:translate(0,0) scale(.5); opacity:0; }
    18%  { opacity:1; }
    100% { transform:translate(4px,-24px) scale(1.15); opacity:0; }
  }
  @keyframes gh-smpulse { 0%,100%{ transform:scale(1); } 50%{ transform:scale(1.05); } }
  @keyframes gh-smflash { 0%{ transform:scale(1.2); filter:brightness(1.9) drop-shadow(0 0 32px #fff); } 100%{ transform:scale(1); } }
  @keyframes gh-smshake { 0%,100%{ transform:translateX(0); } 20%{ transform:translateX(-3px); } 60%{ transform:translateX(3px); } }
  .gh-sm-mats-h { text-align:center; font-size:clamp(11px,1.5vh,12px); color:#b39a63; letter-spacing:1px; margin:2.6% 0 1.8%; font-family:"Cinzel",serif; border-top:1px solid rgba(201,162,39,.28); padding-top:2.4%; }
  .gh-sm-mats { display:flex; justify-content:center; gap:3%; }
  .gh-sm-mat { width:23%; display:flex; flex-direction:column; align-items:center; gap:2px; }
  .gh-sm-mslot { width:clamp(40px,6.8vh,54px); height:clamp(40px,6.8vh,54px); display:flex; align-items:center; justify-content:center; border:8px solid transparent; border-image:url(${kh}) 89 fill; font-size:clamp(19px,3vh,25px); }
  .gh-sm-mslot img { width:62%; height:62%; }
  /* números FORA do slot: "precisa/tem" (verde ou vermelho) */
  .gh-sm-mnum { font-size:clamp(13px,1.9vh,16px); font-weight:700; font-family:"Cinzel",serif; line-height:1; margin-top:1px; }
  .gh-sm-mhave { font-size:clamp(9px,1.35vh,11px); font-weight:400; color:#a89468; }
  .gh-ok { color:#8fdf7a; } .gh-no { color:#e17b6b; }
  .gh-sm-cap { font-size:clamp(9px,1.25vh,11px); color:#a89468; text-align:center; line-height:1.05; }
  /* BOTÃO = a placa "APRIMORAR" (btn_base), igual ao resto da HUD */
  .gh-sm-btn { display:block; margin:2.8% auto 0.4%; width:78%; max-width:280px; min-height:clamp(42px,6.6vh,52px); cursor:pointer;
    font-family:"Cinzel",serif; font-weight:700; font-size:clamp(15px,2.2vh,19px); letter-spacing:2px; color:#12100a;
    border:clamp(12px,1.9vh,15px) solid transparent; border-image:url(${Vr}) 40 fill; background:transparent;
    text-shadow:0 1px 0 rgba(255,235,180,.5); }
  .gh-sm-btn:active { filter:brightness(1.16); transform:scale(.97); }
  .gh-sm-btn.gh-sm-dim { filter:grayscale(.72) brightness(.6); cursor:default; font-size:clamp(11px,1.7vh,13px); letter-spacing:1px; }
  .gh-sm-btn.gh-sm-busy { pointer-events:none; filter:brightness(1.12); }
  .gh-sm-max, .gh-sm-empty { text-align:center; color:#c7b789; padding:6% 4%; font-size:clamp(12px,1.7vh,14px); }
  /* INVENTÁRIO (20 slots, 5 col). Células QUADRADAS de tamanho FIXO (--cell) em
     linha E coluna — não depende de aspect-ratio/flex (que quebrava em alguns
     aparelhos deixando as células "esticadas"). As separações vêm só do "gap"
     dourado. Seletor composto .gh-bag.gh-sm-bag p/ vencer o .gh-bag padrão. */
  .gh-sm-sec-inv { flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:flex-start; }
  /* A grade (5×4) escala como UM bloco de proporção 5:4 p/ caber inteira no
     espaço disponível — TODOS os 20 slots sempre visíveis, sem cortar, e as
     células ficam quadradas em qualquer aparelho (largura OU altura manda). */
  .gh-bag.gh-sm-bag {
    grid-template-columns:repeat(5,1fr); grid-template-rows:repeat(4,1fr);
    aspect-ratio:5/4; flex:0 1 auto; min-height:0; min-width:0;
    max-width:100%; max-height:100%; width:auto; height:auto;
    align-self:center; margin-block:auto;
    gap:3px; background:rgba(212,175,55,.7); border:2px solid rgba(212,175,55,.6); }
  .gh-bag.gh-sm-bag .gh-sm-cell { aspect-ratio:auto; width:auto; height:auto; min-width:0; min-height:0; cursor:pointer; }
  .gh-sm-badge { position:absolute; right:2px; bottom:1px; font-family:"Cinzel",serif; font-size:clamp(9px,1.35vh,12px); font-weight:700; color:#12100a; background:linear-gradient(#e9cf72,#b7862a); border-radius:5px; padding:0 4px; line-height:1.25; box-shadow:0 1px 2px #000; }
  .gh-sm-sel { background:rgba(40,32,16,.95); box-shadow:inset 0 0 0 2px #f4d873, 0 0 12px 2px rgba(244,216,115,.7); }
  /* LETREIRO garrafal SUCESSO!/FALHOU! após a forja (aparece breve e some) */
  #gh-sm-flash { position:absolute; inset:0; z-index:12; display:flex; align-items:center; justify-content:center;
    pointer-events:none; opacity:0; font-family:"Cinzel",serif; font-weight:700; letter-spacing:2px;
    font-size:clamp(30px,7.6vh,54px); text-transform:uppercase; text-align:center; white-space:nowrap;
    overflow:hidden; -webkit-text-stroke:1.5px rgba(0,0,0,.55); }
  #gh-sm-flash.gh-flash-show { animation:gh-flash-pop 1.6s cubic-bezier(.18,1.3,.32,1) 1; }
  #gh-sm-flash.gh-flash-ok { color:#93ec7c; text-shadow:0 0 24px rgba(120,240,110,.95), 0 0 8px rgba(200,255,180,.9), 0 4px 8px #000; }
  #gh-sm-flash.gh-flash-fail { color:#f56a55; text-shadow:0 0 24px rgba(240,70,50,.95), 0 0 8px rgba(255,150,130,.85), 0 4px 8px #000; }
  @keyframes gh-flash-pop {
    0%   { opacity:0; transform:scale(.35) rotate(-7deg); }
    14%  { opacity:1; transform:scale(1.22) rotate(-2deg); }
    28%  { transform:scale(.96) rotate(0deg); }
    40%  { transform:scale(1.02); }
    72%  { opacity:1; transform:scale(1); }
    100% { opacity:0; transform:scale(1.08); }
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
    border-image:url(${ef}) 88 fill;
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
    border-image:url(${kh}) 89 fill;
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
    border-image:url(${ba}) 130 repeat;
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
    background:url(${Vr}) no-repeat center / 100% 100%;
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
    background:url(${n1}) no-repeat center / 100% 100%;
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
    background:url(${Vr}) no-repeat center / 100% 100%;
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
  `,document.head.appendChild(s)}const wo=["#######","#..N..#","#.....#","#.....#","#.....#","#..P..#","###X###"],fo=wo.length,wl=wo[0].length,Cs={tavern:{name:"TAVERNA",npc:"Bruno, o Taverneiro",seed:11,lines:["Bem-vindo à Taverna do Javali! Eu sou o Bruno.","Sente-se e descanse — logo você poderá pagar por um quarto e recuperar as forças."]},store:{name:"MERCADOR",npc:"Rosa, a Mercadora",seed:2,lines:["Tenho de tudo um pouco, aventureiro. Sou a Rosa.","Em breve abriremos o comércio: poções, cordas, tochas e mais."]},smith:{name:"FERREIRO",npc:"Brandt, o Ferreiro",seed:23,lines:["O fogo está quente e a bigorna, pronta. Brandt, ao seu dispor.","Traga minério e ouro que eu aprimoro suas armas e armaduras."]},alchemist:{name:"ALQUIMISTA",npc:"Isolde, a Alquimista",seed:31,lines:["Cuidado com o que respira aqui dentro... sou Isolde.","Elixires e poções logo estarão à venda na minha bancada."]}};function $i(s){for(let t=0;t<fo;t++){const e=wo[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:1,row:1}}function eo(s,t){return t<0||t>=fo||s<0||s>=wl?"#":wo[t][s]}function Ma(s,t){return".PX".includes(eo(s,t))}const v1=""+new URL("taverneiro-Ba4UKFJq.png",import.meta.url).href,b1=""+new URL("mercadora-B8RulStP.png",import.meta.url).href,M1=""+new URL("ferreiro-BdN9Klhc.png",import.meta.url).href,w1=""+new URL("alquimista-ssXsgGLn.png",import.meta.url).href,nf=""+new URL("pip-rEDWa-7w.png",import.meta.url).href,sf=""+new URL("wilma-DI_QNtI6.png",import.meta.url).href,y1=""+new URL("fazendeiro-CLjUAd1g.png",import.meta.url).href,S1=""+new URL("camponesa-CrL0OA2Y.png",import.meta.url).href,T1=""+new URL("lenhador-B54mx8Mi.png",import.meta.url).href,rf=""+new URL("hedda-Buaz2cmx.png",import.meta.url).href,E1=""+new URL("costureira-Br8zMBee.png",import.meta.url).href,A1=""+new URL("gunther-D_2fJfLI.png",import.meta.url).href,R1=""+new URL("anselmo-a5GEbqfY.png",import.meta.url).href,C1=""+new URL("tam-BlgWIVim.png",import.meta.url).href,L1=""+new URL("lyle-gu11Pcfp.png",import.meta.url).href,P1=""+new URL("pine1-Cx-eXiFP.png",import.meta.url).href,U1=""+new URL("pine2-CUzpurmt.png",import.meta.url).href,D1=""+new URL("pine3-SLpwxU-f.png",import.meta.url).href,I1=""+new URL("pine4-D2rjz_P9.png",import.meta.url).href,k1=""+new URL("cluster1-CDwqmovY.png",import.meta.url).href,N1=""+new URL("cluster2-C0czRdHN.png",import.meta.url).href,F1=""+new URL("sign_tavern-DPGpN59J.png",import.meta.url).href,O1=""+new URL("sign_store-C8OmR8-U.png",import.meta.url).href,z1=""+new URL("sign_smith-B08qmnbc.png",import.meta.url).href,B1=""+new URL("sign_alch-CZuh7kJW.png",import.meta.url).href,H1=""+new URL("prop_lamp-D_-YfjKt.png",import.meta.url).href,G1=""+new URL("prop_notice-Bo5C5meg.png",import.meta.url).href,V1=""+new URL("enemy_skeleton-BcZFeUKH.png",import.meta.url).href,W1=""+new URL("death_poof-BE-q7e2_.png",import.meta.url).href,X1=""+new URL("dec_window-DrwRbTKE.png",import.meta.url).href,q1=""+new URL("dec_door-B5wowGxb.png",import.meta.url).href,wa=""+new URL("dec_torch-CtkBMXz7.png",import.meta.url).href,$1=""+new URL("dec_ivy-D9e2Lu2_.png",import.meta.url).href,Y1=""+new URL("dec_banner-UBOZSe9G.png",import.meta.url).href,Nh=""+new URL("dec_cracks-DKSsqxx2.png",import.meta.url).href,j1=""+new URL("dec_gate_frame-DQaCQl80.png",import.meta.url).href,Z1=""+new URL("dec_gate_bars-B6YqUV4L.png",import.meta.url).href,K1=""+new URL("fx_fireball-CNUxOMXZ.png",import.meta.url).href,J1=""+new URL("fx_ice-DGJxZKsy.png",import.meta.url).href,Q1=""+new URL("fx_ice_lance-DCxKutbL.png",import.meta.url).href,tb=""+new URL("fx_ray-BukWo5qE.png",import.meta.url).href,eb=""+new URL("fx_meteoro-DywgnSdp.png",import.meta.url).href,nb=""+new URL("fx_muralha-yiXxe2Yc.png",import.meta.url).href,ib=""+new URL("fx_imolacao-C-a5dtuo.png",import.meta.url).href,sb=""+new URL("fx_prisao-BDhoA-oK.png",import.meta.url).href,rb=""+new URL("fx_corrente-CI-yrk7e.png",import.meta.url).href,ob=""+new URL("fx_tempestade-DS9uv2Z_.png",import.meta.url).href,ab=""+new URL("fx_descarga-IY9gTcyD.png",import.meta.url).href,lb=""+new URL("fx_l_apunhalar-BRQuzQIj.png",import.meta.url).href,cb=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,hb=""+new URL("fx_l_sombras-fe3usKIe.png",import.meta.url).href,db=""+new URL("fx_l_estocada-hJYwlzLR.png",import.meta.url).href,ub=""+new URL("fx_l_mortal-DuYG-M3q.png",import.meta.url).href,fb=""+new URL("fx_l_dupla-C6r_wn6L.png",import.meta.url).href,pb=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,mb=""+new URL("fx_l_arremesso-rtDW0ow6.png",import.meta.url).href,gb=""+new URL("fx_l_nuvem-B2qmk_tl.png",import.meta.url).href,_b=""+new URL("fx_l_toxina-Bu3f7mn-.png",import.meta.url).href,xb=""+new URL("sword-Cnq9dXJw.png",import.meta.url).href,vb=""+new URL("class_guerreiro-DQxwW6XE.png",import.meta.url).href,bb=""+new URL("class_ladino-CBY8tWR5.png",import.meta.url).href,Mb=""+new URL("class_mago-BCWgBU8E.png",import.meta.url).href,wb=""+new URL("class_clerigo-Bv6kp9nE.png",import.meta.url).href,zs=[{id:"guerreiro",name:"Guerreiro",emoji:"⚔️",tag:"Tanque / corpo-a-corpo",desc:"Mestre das lâminas. Encara o perigo de frente, com espada e escudo ou uma arma de duas mãos. Muita vida e dano físico.",attr:{str:8,dex:4,int:3},hp:120,mp:40,weapons:["sword","greatsword","axe","shield"],startWeapon:"sword",portrait:vb},{id:"ladino",name:"Ladino",emoji:"🗡️",tag:"Dano rápido / crítico",desc:"Ágil e furtivo. Golpeia rápido com adaga e rapieira, buscando os pontos fracos. Frágil, mas letal e veloz.",attr:{str:4,dex:8,int:3},hp:90,mp:50,weapons:["dagger","rapier"],startWeapon:"dagger",portrait:bb},{id:"mago",name:"Mago",emoji:"🔮",tag:"Dano à distância / elemental",desc:"Canaliza fogo, gelo e raio pelo cajado e pelo orbe. Devastador à distância, mas de corpo frágil. Muita mana.",attr:{str:3,dex:4,int:8},hp:75,mp:110,weapons:["staff","orb"],startWeapon:"staff",portrait:Mb},{id:"clerigo",name:"Clérigo",emoji:"🕯️",tag:"Suporte / cura",desc:"Fé feita arma. Cura os aliados e esmaga o mal com maça, martelo e escudo. Equilibrado, resistente e devoto.",attr:{str:5,dex:3,int:7},hp:95,mp:90,weapons:["mace","maul","shield","staff"],startWeapon:"mace",portrait:wb}],yl=Object.fromEntries(zs.map(s=>[s.id,s])),Fh=5,yb=3;function no(s,t,e){return{atkPhys:Math.round(2+s.str*1.2+s.dex*.6),atkMag:Math.round(1+s.int*1.4),crit:Math.round(3+s.dex*.8),critDmg:150+Math.round(s.dex*1),precision:Math.min(99,Math.round(85+s.dex*.6)),hp:t+s.str*2,def:Math.round(1+s.str*.5),magRes:Math.round(s.int*.5),evasion:Math.round(2+s.dex*.7),mp:e+s.int*3}}const Oh=[P1,U1,I1],Sb=[D1],Tb=.625,Wr=[{url:k1,aspect:1.96},{url:N1,aspect:1.72}],Eb={tavern:v1,store:b1,smith:M1,alchemist:w1},Ab={tavern:F1,store:O1,smith:z1,alchemist:B1},Rb=2.6,yn=[[0,-1],[1,0],[0,1],[-1,0]],Qn={c:7,r:10},Xr=10,zh={url:K1,frames:17},Cb={url:J1,frames:6},Lb={url:Q1,frames:12},Bh={url:tb,frames:16},Pb={url:eb,frames:15},Ub={url:nb,frames:16},Db={url:ib,frames:15},Ib={url:sb,frames:17},kb={url:rb,frames:19},Nb={url:ob,frames:20},Fb={url:ab,frames:11},Ob={url:lb,frames:5},zb={url:cb,frames:20},Bb={url:hb,frames:7},Hb={url:db,frames:11},Gb={url:ub,frames:6},Vb={url:fb,frames:8},Wb={url:pb,frames:20},Xb={url:mb,frames:14},qb={url:gb,frames:7},$b={url:_b,frames:19},Is={m_bola_fogo:zh,m_explosao_fogo:zh,m_meteoro:Pb,m_muralha_fogo:Ub,m_imolacao:Db,m_nova_gelo:Cb,m_lanca_gelo:Lb,m_prisao_gelo:Ib,m_raio_arcano:Bh,m_corrente:kb,m_tempestade:Nb,m_descarga:Fb,m_nova_arcana:Bh,l_apunhalar:Ob,l_rajada_laminas:zb,l_golpe_sombras:Bb,l_estocada:Hb,l_execucao_a:Gb,l_rajada_dupla:Vb,l_danca_laminas:Wb,l_arremesso:Xb,l_nuvem_toxica:qb,l_toxina:$b},Yb=1200,Hh=s=>{const t=Is[s];return t?Math.min(2100,Math.max(900,Math.round(t.frames*115))):Yb},jb=new Set(["m_meteoro","m_tempestade","m_prisao_gelo"]),Zb=new Set(["m_muralha_fogo","m_descarga"]),Gh=s=>100,Kb=620,qr=3.2,ya=[{c:5,r:5,dc:0,dr:1,kind:"tavern"},{c:9,r:5,dc:0,dr:1,kind:"store"},{c:1,r:9,dc:1,dr:0,kind:"smith"},{c:13,r:9,dc:-1,dr:0,kind:"alchemist"}],Sa=[{c:7,r:5,dc:0,dr:1,id:"irmaos"},{c:1,r:7,dc:1,dr:0,id:"hedda"},{c:13,r:11,dc:-1,dr:0,id:"elspethhome"}],Jb=[{id:"elspeth",c:8,r:6,night:[12,11],seed:1,name:"Elspeth, a Camponesa",lines:["Bom dia! Colhi legumes fresquinhos hoje cedo.","O poço da praça nunca seca, pode beber à vontade."]},{id:"corvin",c:10,r:6,night:[5,6],seed:2,name:"Corvin, o Lenhador",lines:["Cortar lenha é honesto, mas o bosque anda estranho ultimamente.","Dizem que há algo à espreita naquela montanha ao norte..."]},{id:"wren",c:12,r:10,night:[2,7],seed:3,name:"Wren, a Costureira",lines:["Precisa remendar essa capa? Faço um preço justo.","Roupa boa aquece o corpo — e o frio lá embaixo é de rachar."]},{id:"alard",c:2,r:11,night:[5,6],seed:5,name:"Alard, o Velho Fazendeiro",lines:["Cuidado, jovem. A escada sob a montanha leva às profundezas.","Equipe-se bem antes de descer. Já vi muitos partirem e nenhum voltar."]},{id:"gunther",c:8,r:13,night:[11,7],seed:9,name:"Gunther, o Vigia",lines:["Mantenha a paz por aqui, forasteiro.","Enquanto eu montar guarda, o vilarejo dorme tranquilo."]},{id:"anselmo",c:3,r:6,night:[2,6],seed:7,name:"Frei Anselmo",lines:["Que a luz o acompanhe nas trevas, viajante.","Reze antes de descer àquela masmorra. Vai precisar."]},{id:"tam",c:9,r:12,night:[7,6],seed:10,name:"Velho Tam",lines:["Uma moedinha para um pobre velho?","Já fui aventureiro como você... até a montanha levar tudo de mim."]},{id:"lyle",c:2,r:8,night:[5,6],seed:12,name:"Lyle, o Bardo",lines:["Ei! Quer ouvir a balada do herói que desceu à masmorra?","Faça feitos grandiosos e eu comporei uma canção sobre você!"]}],Qb={pip:nf,wilma:sf,alard:y1,elspeth:S1,corvin:T1,hedda:rf,wren:E1,gunther:A1,anselmo:R1,tam:C1,lyle:L1},tM={},Ta={irmaos:{name:"Casa dos Irmãos",residents:[{col:2,row:2,seed:4,scale:.7,name:"Pip",art:nf,lines:["Essa é a nossa casa! Eu e a Wilma somos irmãos.","Um dia vou ser aventureiro igual você — a Wilma que fica de babá!"]},{col:4,row:2,seed:6,scale:.66,name:"Wilma",art:sf,lines:["O Pip vive fugindo pra praça. Alguém tem que cuidar dele!","À noite dá pra ouvir barulhos vindo da montanha... eu tranco a porta."]}]},hedda:{name:"Casa de Hedda",residents:[{col:3,row:2,seed:8,name:"Hedda, a Matriarca",art:rf,lines:["Entre, entre. Minha casa é modesta, mas aquecida.","Já vi muitos invernos passarem por Grimhollow. Sente-se, tome um chá."]}]},elspethhome:{name:"Casa de Elspeth",residents:[]}},eM=96;function Ea(s,t=eM){const e=[];for(const n of s){if(n.length<=t){e.push(n);continue}const i=n.split(/\s+/);let r="";for(const a of i)r&&r.length+1+a.length>t?(e.push(r+" …"),r=a):r=r?r+" "+a:a;r&&e.push(r)}return e}const ei=class ei{constructor(t,e,n){ut(this,"renderer");ut(this,"scene",new cx);ut(this,"camera");ut(this,"container");ut(this,"foliageFx");ut(this,"col");ut(this,"row");ut(this,"facing",0);ut(this,"anim",null);ut(this,"showIdx",0);ut(this,"showcaseReturn",null);ut(this,"world",new Ie);ut(this,"blocked",new Set);ut(this,"gates",new Map);ut(this,"gateAnims",[]);ut(this,"now",0);ut(this,"motes",[]);ut(this,"moteTexCache");ut(this,"fogPuffs",[]);ut(this,"softPuffCache");ut(this,"cloudTexCache");ut(this,"fogDome");ut(this,"smokeTexes",[]);ut(this,"npcs",[]);ut(this,"flames",[]);ut(this,"lampFlames",[]);ut(this,"lampGlows",[]);ut(this,"glowTex");ut(this,"dayNightLights",[]);ut(this,"outdoor",!1);ut(this,"_sky",new kt);ut(this,"_cA",new kt);ut(this,"_cB",new kt);ut(this,"waterGlint");ut(this,"smoke",[]);ut(this,"billboardProps",[]);ut(this,"playerMaxHp",100);ut(this,"playerHp",100);ut(this,"playerMaxMp",100);ut(this,"playerMp",100);ut(this,"stats",{level:1,xp:0,xpMax:100,atk:8,def:2,str:5,dex:5,int:5,gold:0});ut(this,"reinforce",{});ut(this,"materials",{madeira:8,minerio:5,reforco:3});ut(this,"smithSel","sword");ut(this,"prim",{str:5,dex:5,int:5});ut(this,"baseAttr",{str:5,dex:5,int:5});ut(this,"clsHp",100);ut(this,"clsMp",100);ut(this,"sec",no({str:5,dex:5,int:5},100,100));ut(this,"unspent",0);ut(this,"passive",{});ut(this,"skillRanks",{});ut(this,"target",null);ut(this,"cooldownUntil",{});ut(this,"coolingSkills",new Set);ut(this,"buff",null);ut(this,"reticle",null);ut(this,"raycaster",new jx);ut(this,"lastTickMs",0);ut(this,"buffActive",!1);ut(this,"currentWeapon",null);ut(this,"playerName","Herói");ut(this,"classId","guerreiro");ut(this,"enemy",null);ut(this,"poofs",[]);ut(this,"poofTex");ut(this,"projectiles",[]);ut(this,"fxTexCache",{});ut(this,"_smokeTex");ut(this,"ui");ut(this,"location","village");ut(this,"doorMap",new Map);ut(this,"homeDoorMap",new Map);ut(this,"npcMap",new Map);ut(this,"returnTo",{col:0,row:0,facing:0});ut(this,"dialogue",null);ut(this,"lastPrompt"," ");ut(this,"artCache",new Map);ut(this,"_shadowTex");ut(this,"animTex",[]);ut(this,"walkers",[]);ut(this,"npcNight",!1);ut(this,"startAt");ut(this,"miniGrid",null);this.container=t,this.startAt=n;const i=e?yl[e.classId]:null;i&&e&&(this.playerName=e.name,this.classId=i.id,this.prim={...e.attr??i.attr},this.baseAttr={...e.attr??i.attr},this.clsHp=i.hp,this.clsMp=i.mp,this.sec=no(this.prim,this.clsHp,this.clsMp),this.stats.str=this.prim.str,this.stats.dex=this.prim.dex,this.stats.int=this.prim.int,this.playerMaxHp=this.sec.hp,this.playerHp=this.sec.hp,this.playerMaxMp=this.sec.mp,this.playerMp=this.sec.mp),this.renderer=new lx({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.appendChild(this.renderer.domElement);const r=document.createElement("div");r.style.cssText="position:absolute;inset:0;pointer-events:none;opacity:0;z-index:5;background:radial-gradient(ellipse at center,rgba(30,55,25,0) 42%,rgba(24,46,20,0.55) 78%,rgba(16,32,14,0.8) 100%);",getComputedStyle(t).position==="static"&&(t.style.position="relative"),t.appendChild(r),this.foliageFx=r,this.scene.background=new kt(Ts),this.camera=new en(78,1,.05,400),this.camera.rotation.order="YXZ",this.scene.add(this.world),this.col=0,this.row=0,this.ui=_1(t,l=>this.onAction(l),xb,void 0,xi,l=>this.onEquip(l),l=>this.applyPassives(l),l=>this.useSkill(l),(l,c)=>this.allocAttr(l,c),l=>{this.smithSel=l,this.ui.openSmith(this.buildSmithData())},()=>this.smithUpgrade()),this.renderer.domElement.addEventListener("pointerdown",l=>this.onCanvasPointer(l)),this.ui.setInventory(xi.map(l=>l.id)),this.ui.equipWeapon(i?.startWeapon??"sword"),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.ui.setMana(this.playerMp/this.playerMaxMp),this.ui.setSkillInfo(this.classId,Gh(this.stats.level)),this.refreshStats(),this.preloadFx();const a=fh();this.startAt==="showcase"?(this.returnTo={col:a.col,row:a.row,facing:0},this.enterLocation("showcase",0,0,0)):this.enterLocation("village",a.col,a.row,0),window.addEventListener("resize",()=>this.resize()),this.resize(),this.renderer.setAnimationLoop(l=>this.tick(l));const o=document.fonts;o?.ready&&o.ready.then(()=>{this.dialogue||this.enterLocation(this.location,this.col,this.row,this.facing)}),window.__game=this}enterLocation(t,e,n,i){this.clearWorld(),this.location=t,this.outdoor=t==="village"||t==="forest",this.dialogue=null,this.ui.hideDialogue(),t==="village"?(this.scene.fog=new Mi(Ts,D*2.6,D*11),this.scene.background=new kt(Ts),this.addVillageLights(),this.buildVillage()):t==="forest"?(this.scene.fog=new Mi(Ts,D*3.5,D*18),this.scene.background=new kt(Ts),this.addForestLights(),this.buildForest()):t==="dungeon"?(this.scene.fog=new Mi(3817033,D*2.5,D*13),this.scene.background=new kt(3093052),this.addDungeonLights(),this.buildDungeon()):t==="showcase"?(this.scene.fog=new Nl(8160144,.062),this.scene.background=new kt(8160144),this.addShowcaseLights(),this.buildShowcase()):t in Ta?(this.scene.fog=new Mi(2365968,D*4,D*12),this.scene.background=new kt(1445640),this.addInteriorLights(),this.buildHome(t)):(this.scene.fog=new Mi(1709069,D*4,D*12),this.scene.background=new kt(1183241),this.addInteriorLights(),this.buildInterior(t)),this.col=e,this.row=n,this.facing=i,this.location==="showcase"?(this.showIdx=0,this.applyShowcasePose()):(this.camera.position.set(e*D,this.floorYAt(e,n)+kr,n*D),this.camera.rotation.y=-i*(Math.PI/2)),this.anim=null,this.lastPrompt=" ",this.ui.setPrompt(null),this.buildMiniGrid(),this.pushMinimap()}clearWorld(){this.world.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const n=e.material;Array.isArray(n)?n.forEach(i=>i.dispose()):n&&n.dispose()}),this.world.clear(),this.blocked.clear(),this.gates.clear(),this.gateAnims=[],this.motes=[],this.fogPuffs=[],this.fogDome=void 0,this.npcs=[],this.flames=[],this.lampFlames=[],this.lampGlows=[],this.dayNightLights=[],this.animTex=[],this.walkers=[],this.smoke=[],this.billboardProps=[],this.enemy=null,this.reticle=null,this.clearTarget(),this.projectiles=[],this.poofs=[],this.waterGlint=void 0,this.doorMap.clear(),this.homeDoorMap.clear(),this.npcMap.clear()}addVillageLights(){const t=new Ss(9081506,.75),e=new ws(10135224,3812380,.7),n=new oa(16771008,.55);n.position.set(-6,12,4),this.world.add(t),this.world.add(e),this.world.add(n),this.registerDayLight(t,3820138,.46),this.registerDayLight(e,2899038,.5),this.registerDayLight(n,5596832,.14)}registerDayLight(t,e,n){this.dayNightLights.push({light:t,dayI:t.intensity,dayColor:t.color.clone(),nightColor:new kt(e),nightMul:n})}daylight(t){const e=Math.sin((t-.25)*Math.PI*2);return Math.max(0,Math.min(1,e*1.15))}atmosColor(t,e){const n=ei.SKY_KEYS;let i=n[0],r=n[n.length-1];for(let o=0;o<n.length-1;o++)if(t>=n[o][0]&&t<=n[o+1][0]){i=n[o],r=n[o+1];break}const a=(t-i[0])/(r[0]-i[0]||1);e.copy(this._cA.set(i[1])).lerp(this._cB.set(r[1]),a)}updateDayNight(t){if(!this.outdoor)return;const e=(t/Fr+Or)%1,n=this.daylight(e);this.atmosColor(e,this._sky),this.scene.fog&&this.scene.fog.color.copy(this._sky),this.scene.background.copy(this._sky);for(const r of this.dayNightLights){const a=r.nightMul+(1-r.nightMul)*n;r.light.intensity=r.dayI*a,r.light.color.copy(r.nightColor).lerp(r.dayColor,n)}const i=Math.max(0,Math.min(1,(.5-n)/.35));for(const r of this.lampFlames){const a=r.base+Math.sin(t*.011+r.base)*.8+Math.sin(t*.027)*.5;r.light.intensity=Math.max(0,a)*i}for(const r of this.lampGlows){const a=.88+Math.sin(t*.011)*.08+Math.sin(t*.027)*.04;r.material.opacity=i*a}}addInteriorLights(){this.world.add(new Ss(12888176,1.15)),this.world.add(new ws(10521184,3813408,.75))}buildVillage(){const t=new ft({map:Eh(7)}),e=(m,p)=>new ft({map:m,color:new kt(p)}),n=[new ft({map:In(31)}),new ft({map:wv()})],i=[e(Rs(3),15323543),e(Rs(3),12820582),e(Rs(3),11179640)];i.forEach(m=>m.side=qt);const r=this.decalMat(q1,.4),a=this.decalMat(X1,.4),o=this.decalMat(wa,.1),l=this.decalMat(Y1,.4),c=this.decalMat($1,.4),h=this.decalMat(Nh,.08),d=(m,p,y=0)=>Math.sin(m*12.9+p*78.2+y*3.1)*43758.5%1,u=new It(D,D);for(let m=0;m<He;m++)for(let p=0;p<tn;p++){if(uh(p,m))continue;const y=new Q(u,t);y.rotation.x=-Math.PI/2;const v=Math.floor(Math.abs(d(p,m,5))*4)%4;y.rotation.z=v*Math.PI/2,y.position.set(p*D,0,m*D),this.world.add(y)}const f=new fe(D,Jn,D),g=new Set([...ya.map(m=>`${m.c},${m.r},${m.dc},${m.dr}`),...Sa.map(m=>`${m.c},${m.r},${m.dc},${m.dr}`)]),_=new Set;for(let m=0;m<He;m++)for(let p=0;p<tn;p++){if(be(p,m)!=="building")continue;const y=yn.filter(([E,S])=>{const A=be(p+E,m+S);return A==="street"||A==="barrel"});if(y.length===0)continue;const v=n[Math.floor(Math.abs(d(p,m))*997)%n.length],x=new Q(f,v);x.position.set(p*D,Jn/2,m*D),this.world.add(x);for(const[E,S]of y){if(g.has(`${p},${m},${E},${S}`)){_.add(`${p},${m},${E},${S}`);continue}const A=Math.abs(d(p,m,E*7+S*3))%1,C=p*D+E*(D/2+.05),M=m*D+S*(D/2+.05);A<.4?this.addWallDecal(p,m,E,S,a,1.9,1.9,1.75):A<.5?(this.addWallDecal(p,m,E,S,o,.95,1.55,2.15),this.glowLight(C+E*.25,2.35,M+S*.25,16752704,3,9)):A<.71?this.addWallDecal(p,m,E,S,c,2.3,1.5,1.05):A<.87&&this.addWallDecal(p,m,E,S,h,1.8,1.6,1.6)}}this.buildRoofs(i),this.buildMountain(),this.buildTunnel(),this.buildDungeonEnemy(),this.buildWell(),this.buildEstablishments(r,l),this.buildHomes(r),this.buildVillageForestGate(),this.buildVillageProps(),this.buildChimneySmoke(),this.buildNPCs()}buildVillageProps(){this.addLampPost(4,7),this.addLampPost(10,7),this.addLampPost(4,11),this.addLampPost(10,11),this.addWallProp(2,10,G1,2.7,"W")}makeGlowTex(){if(this.glowTex)return this.glowTex;const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255,244,214,1)"),n.addColorStop(.28,"rgba(255,207,138,0.72)"),n.addColorStop(1,"rgba(255,190,120,0)"),e.fillStyle=n,e.fillRect(0,0,64,64),this.glowTex=new pn(t),this.glowTex}addLampPost(t,e,n=0,i=0){const r=t*D+n,a=e*D+i;this.addPropBillboard(t,e,H1,3.4,n,i);const o=2.95,l=new fn(16764810,4.2,17,2);l.position.set(r,o,a),this.world.add(l),this.lampFlames.push({light:l,base:4.2});const c=new ta(new to({map:this.makeGlowTex(),transparent:!0,opacity:0,depthWrite:!1,blending:so}));c.position.set(r,o,a),c.scale.set(2.6,2.6,1),this.world.add(c),this.lampGlows.push(c)}addPropBillboard(t,e,n,i,r=0,a=0){const o=new ft({transparent:!0,opacity:0,alphaTest:.4,side:qt}),l=new Q(new It(i,i),o);l.position.set(t*D+r,i/2,e*D+a),this.world.add(l),this.billboardProps.push(l),this.loadArt(n,c=>{const h=c.image,d=h&&h.width&&h.height?h.width/h.height:1;l.geometry.dispose(),l.geometry=new It(i*d,i),l.position.y=i/2,o.map=c,o.opacity=1,o.needsUpdate=!0})}addWallProp(t,e,n,i,r){const a=new ft({transparent:!0,opacity:0,alphaTest:.4,side:qt}),o=new Q(new It(i,i),a),l=D/2-.2;let c=0,h=0,d=0;r==="N"?(d=0,h=-l):r==="S"?(d=Math.PI,h=l):r==="W"?(d=Math.PI/2,c=-l):(d=-Math.PI/2,c=l),o.rotation.y=d,o.position.set(t*D+c,i/2,e*D+h),this.world.add(o),this.loadArt(n,u=>{const f=u.image,g=f&&f.width&&f.height?f.width/f.height:1;o.geometry.dispose(),o.geometry=new It(i*g,i),o.position.y=i/2,a.map=u,a.opacity=1,a.needsUpdate=!0})}buildDungeonEnemy(t=2,e=4){const n=Math.max(1,this.stats.level+(Math.floor(Math.random()*3)-1)),i=26+(n-1)*8,r=2.6,a=new ft({transparent:!0,opacity:0,alphaTest:.4,side:qt}),o=new Q(new It(r*.47,r),a);o.position.set(t*D,r/2,e*D),this.world.add(o),this.billboardProps.push(o),this.blocked.add(`${t},${e}`);const l=1.3,c=new Ie,h=new Q(new It(l+.12,.26),new Ae({color:1182986,transparent:!0,opacity:.85})),d=new Q(new It(l,.16),new Ae({color:13777454}));d.position.z=.01,c.add(h),c.add(d),c.position.set(t*D,r+.45,e*D),this.world.add(c),this.billboardProps.push(c),this.enemy={mesh:o,mat:a,c:t,r:e,bx:t*D,bz:e*D,hp:i,maxHp:i,elevel:n,hitAt:0,dyingAt:0,atkAt:0,hitApplied:!1,nextAtk:0,bar:c,barFill:d};const u=new fn(6987984,.55,5,2);u.position.set(t*D,1.7,e*D),this.world.add(u),this.poofTex||this.loadArt(W1,f=>this.poofTex=this.fxFilter(f)),this.loadArt(V1,f=>{const g=f.image,_=g&&g.width&&g.height?g.width/g.height:.47;o.geometry.dispose(),o.geometry=new It(r*_,r),o.position.y=r/2,a.map=f,a.opacity=1,a.needsUpdate=!0})}onEquip(t){this.currentWeapon=t,this.recomputeDerived()}smithCost(t){return{madeira:0,minerio:0,reforco:0,gold:0}}smithDmg(t,e){return Math.round(this.atkWithBonus(this.sec.atkPhys+t.dmg+e)*this.buffAtkMul())}buildSmithData(){const t=xi.map(a=>({id:a.id,name:a.name,icon:a.url,lvl:this.reinforce[a.id]??0})),e=xi.find(a=>a.id===this.smithSel)??xi[0],n=this.reinforce[e.id]??0,i={id:e.id,name:e.name,icon:e.url,lvl:n,dmg:this.smithDmg(e,n)},r=n>=ei.SMITH_MAX?{...i,max:!0}:{...i,max:!1,next:{dmg:this.smithDmg(e,n+1),...this.smithCost(n)}};return{gold:this.stats.gold,mats:{...this.materials},items:t,sel:r}}smithChance(t){return Math.max(.25,Math.min(.92,.92-t*.07))}smithUpgrade(){const t=xi.find(r=>r.id===this.smithSel);if(!t)return null;const e=this.reinforce[t.id]??0;if(e>=ei.SMITH_MAX)return null;const n=this.smithCost(e);if(this.materials.madeira<n.madeira||this.materials.minerio<n.minerio||this.materials.reforco<n.reforco||this.stats.gold<n.gold)return this.ui.toast("Faltam materiais ou ouro."),null;this.materials.madeira-=n.madeira,this.materials.minerio-=n.minerio,this.materials.reforco-=n.reforco,this.stats.gold-=n.gold;const i=Math.random()<this.smithChance(e);return i?(this.reinforce[t.id]=e+1,this.currentWeapon?.id===t.id&&this.recomputeDerived(),this.ui.toast(`${t.name} reforçada para +${e+1}!`)):this.ui.toast(`O reforço de ${t.name} falhou!`),{success:i,data:this.buildSmithData()}}atkWithBonus(t){const e=(this.passive.dmg??0)+(this.passive.mdmg??0);return Math.round(t*(1+e))}applyPassives(t){this.skillRanks={...t},this.refreshActionBar(),this.passive=$v(t),this.recomputeDerived()}allocAttr(t,e){if(e>0){if(this.unspent<=0)return;this.prim[t]+=1,this.unspent-=1}else{if(this.prim[t]<=this.baseAttr[t])return;this.prim[t]-=1,this.unspent+=1}this.recomputeDerived()}recomputeDerived(){this.sec=no(this.prim,this.clsHp,this.clsMp);const t=this.playerMaxHp>0?this.playerHp/this.playerMaxHp:1,e=this.playerMaxMp>0?this.playerMp/this.playerMaxMp:1;this.playerMaxHp=Math.round(this.sec.hp*(1+(this.passive.life??0))),this.playerMaxMp=Math.round(this.sec.mp*(1+(this.passive.mana??0))),this.playerHp=Math.max(1,Math.round(this.playerMaxHp*t)),this.playerMp=Math.round(this.playerMaxMp*e),this.stats.str=this.prim.str,this.stats.dex=this.prim.dex,this.stats.int=this.prim.int,this.stats.def=this.sec.def+Math.round((this.passive.def??0)+(this.passive.mres??0));const n=this.currentWeapon?this.reinforce[this.currentWeapon.id]??0:0,i=(this.currentWeapon?.dmg??0)+n;this.stats.atk=Math.round(this.atkWithBonus(this.sec.atkPhys+i)*this.buffAtkMul()),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.ui.setMana(this.playerMp/this.playerMaxMp),this.refreshStats()}rollDamage(t,e){const n=e?this.passive.mdmg??0:this.passive.dmg??0;let i=t*(1+n)*this.buffAtkMul();const r=Math.random()*100<this.sec.crit;return r&&(i*=this.sec.critDmg/100),{dmg:Math.max(1,Math.round(i)),crit:r}}projectToScreen(t,e,n){const i=new k(t,e,n).project(this.camera),r=this.renderer.domElement.getBoundingClientRect();return{x:r.left+(i.x+1)/2*r.width,y:r.top+(1-i.y)/2*r.height}}tryHitEnemy(){const t=this.enemy;if(!t||t.dyingAt)return;const[e,n]=yn[this.facing];if(this.col+e!==t.c||this.row+n!==t.r)return;const i=this.sec.atkPhys+(this.currentWeapon?.dmg??0),r=this.rollDamage(i,!1);this.dealDamageToEnemy(t,r.dmg,r.crit)}dealDamageToEnemy(t,e,n=!1){if(t.dyingAt)return;const i=Math.max(1,Math.round(e));t.hp-=i,t.hitAt=performance.now();const r=Math.max(1e-4,t.hp/t.maxHp);t.barFill.scale.x=r,t.barFill.position.x=-(1-r)*1.3/2;const a=this.projectToScreen(t.bx,1.8,t.bz);if(this.ui.floatText(a.x,a.y,n?`${i}!`:`${i}`,n?"crit":"hit"),t.hp<=0){t.dyingAt=t.hitAt,this.blocked.delete(`${t.c},${t.r}`),this.spawnPoof(t.bx,t.bz),this.target===t&&this.clearTarget();const o=t.elevel,l=4+o*3+Math.floor(Math.random()*(3+o*2));this.stats.gold+=l,this.gainXp(30+o*15),this.ui.toast(`+${l} ouro`)}}cellDist(t){return Math.max(Math.abs(this.col-t.c),Math.abs(this.row-t.r))}buffAtkMul(){return this.buff&&performance.now()<this.buff.until?this.buff.atkMul:1}buffDefReduc(){return this.buff&&performance.now()<this.buff.until?this.buff.defReduc:0}refreshActionBar(){const t=t1(this.classId,this.skillRanks);this.ui.setActionBar(t.map(e=>({id:e.id,name:e.name,icon:e.icon,mana:e.combat.mana})))}useSkill(t){const e=this.skillRanks[t]||0;if(e<=0)return;const n=bl(t),i=performance.now();if((this.cooldownUntil[t]??0)>i){this.ui.toast("Recarregando…");return}if(this.playerMp<n.mana){this.ui.toast("Mana insuficiente");return}if(n.target==="enemy"){(!this.target||this.target.dyingAt)&&this.enemy&&!this.enemy.dyingAt&&this.setTarget(this.enemy);const r=this.target;if(!r||r.dyingAt){this.ui.toast("Sem alvo");return}const a=this.cellDist(r),o=n.melee?1:n.range;if(a>o){this.ui.toast(n.melee?"Muito longe (corpo-a-corpo)":"Fora de alcance");return}}if(this.playerMp=Math.max(0,this.playerMp-n.mana),this.ui.setMana(this.playerMp/this.playerMaxMp),this.ui.skillManaFloat(t,n.mana),this.cooldownUntil[t]=i+n.cd,this.coolingSkills.add(t),n.effect==="dmg"&&this.target){const r=this.target.bx,a=this.target.bz,o=this.target,l=n.power*(1+.25*(e-1)),c=!n.melee&&n.magic?360:0;c>0&&this.ui.castBar(Qv(t),c);const h=Hh(t),d=jb.has(t),u=()=>{if(this.enemy===o&&!o.dyingAt){const g=this.rollDamage(l,n.magic);this.dealDamageToEnemy(o,g.dmg,g.crit)}},f=()=>{Is[t]&&this.spawnEffect(t,r,a),d?window.setTimeout(u,h):u()};c>0?window.setTimeout(f,c):f(),n.melee&&this.ui.swingWeapon()}else if(n.effect==="heal"){const r=Math.round(n.power*(1+.25*(e-1))),a=this.playerHp;this.playerHp=Math.min(this.playerMaxHp,this.playerHp+r),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.refreshStats();const o=this.playerHp-a;this.ui.floatText(window.innerWidth/2,window.innerHeight*.46,`+${o}`,"heal"),this.ui.toast(`+${r} vida`)}else n.effect==="buff"&&(this.buff={atkMul:n.atkMul??1,defReduc:n.defReduc??0,until:i+(n.dur??6e3)},this.recomputeDerived(),this.ui.toast("Fortalecido!"))}setTarget(t){this.target=t,this.ensureReticle(),this.reticle&&(this.reticle.visible=!0)}clearTarget(){this.target=null,this.reticle&&(this.reticle.visible=!1)}ensureReticle(){if(this.reticle)return;const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d"),n=64;e.shadowColor="rgba(0,0,0,.5)",e.shadowBlur=5,e.strokeStyle="rgba(255,228,150,.9)",e.lineWidth=4,e.beginPath(),e.arc(n,n,50,0,Math.PI*2),e.stroke(),e.lineCap="round",e.lineWidth=5;const i=l=>{const c=Math.cos(l),h=Math.sin(l);e.beginPath(),e.moveTo(n+c*44,n+h*44),e.lineTo(n+c*56,n+h*56),e.stroke()};i(-Math.PI/2),i(Math.PI/2),i(0),i(Math.PI);const r=new pn(t);r.colorSpace=Re;const a=new Ae({map:r,transparent:!0,opacity:.9,depthTest:!0,depthWrite:!1}),o=new Q(new It(1.15,1.15),a);o.renderOrder=999,o.visible=!1,this.reticle=o,this.world.add(o),this.billboardProps.push(o)}onCanvasPointer(t){const e=this.enemy;if(!e||e.dyingAt)return;const n=this.renderer.domElement.getBoundingClientRect(),i=(t.clientX-n.left)/n.width*2-1,r=-((t.clientY-n.top)/n.height)*2+1;this.raycaster.setFromCamera(new wt(i,r),this.camera),this.raycaster.intersectObject(e.mesh,!1).length&&this.setTarget(e)}spawnPoof(t,e){if(!this.poofTex)return;const n=this.poofTex.clone();n.needsUpdate=!0,n.repeat.set(1/Xr,1),n.offset.set(0,0);const i=new Ae({map:n,transparent:!0,depthWrite:!1,side:qt}),r=new Q(new It(3.8,2.85),i);r.position.set(t,1.5,e),this.world.add(r),this.poofs.push({mesh:r,mat:i,tex:n,born:performance.now()})}updatePoofs(t){if(this.poofs.length===0)return;const e=this.camera.position.x,n=this.camera.position.z;for(let i=this.poofs.length-1;i>=0;i--){const r=this.poofs[i],a=(t-r.born)/Kb;if(a>=1){this.world.remove(r.mesh),r.mesh.geometry.dispose(),r.mat.dispose(),r.tex.dispose(),this.poofs.splice(i,1);continue}const o=Math.min(Xr-1,Math.floor(a*Xr));r.tex.offset.x=o/Xr,r.mesh.rotation.y=Math.atan2(e-r.mesh.position.x,n-r.mesh.position.z)}}preloadFx(){for(const t in Is){const e=Is[t].url;this.fxTexCache[e]||this.loadArt(e,n=>this.fxTexCache[e]=this.fxFilter(n))}}fxFilter(t){return t.minFilter=We,t.magFilter=We,t.generateMipmaps=!1,t.needsUpdate=!0,t}spawnEffect(t,e,n){const i=Is[t];if(!i)return;const r=this.fxTexCache[i.url];if(!r){this.loadArt(i.url,m=>this.fxTexCache[i.url]=this.fxFilter(m));return}const a=i.frames,o=r.clone();this.fxFilter(o),o.repeat.set(1/a,1),o.offset.set(0,0);const l=r.image,c=l&&l.height?l.width/a/l.height:1,h=new Ae({map:o,transparent:!0,depthWrite:!1,depthTest:!1,side:qt}),d=2.8,u=c>=1?d:d*c,f=c>=1?d/c:d,g=new Q(new It(u,f),h),_=Zb.has(t)?f/2:1.5;g.position.set(e,_,n),g.renderOrder=20,this.world.add(g),this.projectiles.push({mesh:g,mat:h,tex:o,frames:a,born:performance.now(),ms:Hh(t),fromX:e,fromZ:n,toX:e,toZ:n})}updateProjectiles(t){if(this.projectiles.length===0)return;const e=this.camera.position.x,n=this.camera.position.z;for(let i=this.projectiles.length-1;i>=0;i--){const r=this.projectiles[i],a=(t-r.born)/r.ms;if(a>=1){this.world.remove(r.mesh),r.mesh.geometry.dispose(),r.mat.dispose(),r.tex.dispose(),this.projectiles.splice(i,1);continue}const o=Math.min(r.frames-1,Math.max(0,Math.floor(a*r.frames)));r.tex.offset.x=o/r.frames,r.mesh.rotation.y=Math.atan2(e-r.mesh.position.x,n-r.mesh.position.z)}}nextXpMax(t){return Math.round(100+(t-1)*60)}gainXp(t){if(this.stats.level>=100)return;this.stats.xp+=t;let e=0;for(;this.stats.level<100&&this.stats.xp>=this.stats.xpMax;)this.stats.xp-=this.stats.xpMax,this.stats.level++,this.stats.xpMax=this.nextXpMax(this.stats.level),e++;this.stats.level>=100&&(this.stats.xp=0),e>0&&(this.playerHp=this.playerMaxHp,this.playerMp=this.playerMaxMp,this.unspent+=e*yb,this.ui.setHealth(1),this.ui.setMana(1),this.ui.setSkillInfo(this.classId,Gh(this.stats.level)),this.ui.toast(`Nível ${this.stats.level}!`)),this.refreshStats()}refreshStats(){this.ui.setStats({level:this.stats.level,xp:this.stats.xp,xpMax:this.stats.xpMax,hp:this.playerHp,hpMax:this.playerMaxHp,mp:this.playerMp,mpMax:this.playerMaxMp,atk:this.stats.atk,def:this.stats.def,str:this.stats.str,dex:this.stats.dex,int:this.stats.int,gold:this.stats.gold,points:this.unspent,strMin:this.baseAttr.str,dexMin:this.baseAttr.dex,intMin:this.baseAttr.int,atkMag:this.atkWithBonus(this.sec.atkMag),crit:this.sec.crit,critDmg:this.sec.critDmg,precision:this.sec.precision,magRes:this.sec.magRes,evasion:this.sec.evasion})}damagePlayer(t){if(this.playerHp<=0)return;const e=t*(1-this.buffDefReduc()),n=Math.max(1,Math.round(e));this.playerHp=Math.max(0,this.playerHp-n),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.refreshStats(),this.ui.flashDamage(),this.ui.floatText(window.innerWidth/2,window.innerHeight*.58,`-${n}`,"player"),this.playerHp<=0&&window.setTimeout(()=>{this.playerHp=this.playerMaxHp,this.ui.setHealth(1),this.refreshStats();const i=fh();this.enterLocation("village",i.col,i.row,0)},800)}buildChimneySmoke(){const t=this.smokeTex(),e=[[5,5],[9,5],[1,9],[13,9],[7,5],[1,7]];for(const[n,i]of e)for(let r=0;r<4;r++){const a=new Q(new It(1.4,1.4),new Ae({map:t,transparent:!0,depthWrite:!1,opacity:0}));a.position.set(n*D+.4,Jn+aa,i*D),a.userData={phase:(n*3.1+i*1.7+r*1.3)%4,baseX:n*D+.4,baseZ:i*D},this.world.add(a),this.smoke.push(a)}}smokeTex(){if(this._smokeTex)return this._smokeTex;const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,2,32,32,30);n.addColorStop(0,"rgba(220,220,224,0.9)"),n.addColorStop(1,"rgba(220,220,224,0)"),e.fillStyle=n,e.beginPath(),e.arc(32,32,30,0,Math.PI*2),e.fill();const i=new pn(t);return i.colorSpace=Re,this._smokeTex=i,i}buildVillageForestGate(){const t=ph(),e=t.col*D,n=t.row*D,i=new ft({map:Oe(5)}),r=new ft({map:xa(63)}),a=new It(D,D);for(let g=0;g<=2;g++){const _=new Q(a,r);_.rotation.x=-Math.PI/2,_.rotation.z=g%2*Math.PI/2,_.position.set(e,.02,(t.row-g)*D),this.world.add(_)}const o=new Ie,l=new fe(.36,3.4,.36);for(const g of[-1.5,1.5]){const _=new Q(l,i);_.position.set(g,1.7,0),o.add(_)}const c=new Q(new fe(3.7,.36,.4),i);c.position.set(0,3.35,0),o.add(c);for(const g of[-1,1]){const _=new Q(new fe(.7,.16,.16),i);_.position.set(g*1.05,3,0),_.rotation.z=g*(Math.PI/4),o.add(_)}const h=new Q(new It(1.7,.6),new Ae({map:ga("Floresta"),transparent:!0,side:qt}));h.position.set(0,2.72,0),h.rotation.y=Math.PI,o.add(h);const d=new ft({color:3815994});for(const g of[-.7,.7]){const _=new Q(new _e(.02,.02,.4,5),d);_.position.set(g,3.05,0),o.add(_)}o.position.set(e,0,n),this.world.add(o);const u=new ft({map:Gr(61)});u.map.repeat.set(8,5);const f=new Q(new It(8*D,5*D),u);f.rotation.x=-Math.PI/2,f.position.set(e,-.02,(t.row+2.5)*D),this.world.add(f);for(let g=1;g<=3;g++){const _=new Q(a,r);_.rotation.x=-Math.PI/2,_.rotation.z=g%2*Math.PI/2,_.position.set(e,.02,(t.row+g)*D),this.world.add(_)}this.buildTreelineBackdrop(e,(t.row+3.4)*D,Math.PI)}makeClusterMats(){return Wr.map(t=>{const e=new ft({transparent:!0,opacity:0,side:qt});return this.loadArt(t.url,n=>{e.map=n,e.alphaTest=.35,e.opacity=1,e.needsUpdate=!0}),{mat:e,aspect:t.aspect}})}buildTreelineBackdrop(t,e,n){if(Wr.length===0)return;const i=this.makeClusterMats(),r=13;let a=t-r*1.9;for(let o=0;o<3;o++){const l=i[o%i.length],c=r*l.aspect,h=new Q(new It(c,r),l.mat);h.position.set(a+c/2,r/2-1,e),h.rotation.y=n,o===1&&(h.scale.x=-1),this.world.add(h),a+=c*.92}}buildMountain(){const t=new ft({map:_a(41)});let e=tn,n=He;for(let r=0;r<He;r++)for(let a=0;a<tn;a++)be(a,r)==="mountain"&&(e=Math.min(e,a),n=Math.min(n,r));const i=(r,a)=>{const o=r-e,l=a-n,c=Math.sqrt(o*o+l*l);return Math.max(Jn+2.5,Jn+11-c*1.7+this.mHash(r,a)*2)};for(let r=0;r<He;r++)for(let a=0;a<tn;a++){const o=be(a,r),l=o==="tunnel"||o==="stairs";if(o!=="mountain"&&!l)continue;const c=i(a,r),h=l?qr:0,d=c-h;if(d<=.2)continue;const u=new Q(new fe(D,d,D),t);if(u.position.set(a*D,h+d/2,r*D),this.world.add(u),!l&&this.mHash(a,r,2)>.35){const f=1.6+this.mHash(a,r,3)*1.8,g=new Q(new fe(f,f,f),t);g.position.set(a*D+(this.mHash(a,r,4)-.5)*2.4,c+f*.25,r*D+(this.mHash(a,r,5)-.5)*2.4),g.rotation.y=this.mHash(a,r,6)*Math.PI,this.world.add(g)}}}mHash(t,e,n=0){const i=Math.sin(t*41.3+e*17.7+n*7.13)*9871.2;return i-Math.floor(i)}buildBarrels(t,e,n){const i=new _e(.4,.34,1.05,14),r=new _e(.41,.41,.08,14);for(let a=0;a<He;a++)for(let o=0;o<tn;o++){if(be(o,a)!=="barrel")continue;const l=yn.filter(([x,E])=>be(o+x,a+E)==="building");if(l.length===0)continue;const c=l.find(([x,E])=>!e.has(`${o+x},${a+E},${-x},${-E}`))||l[0],[h,d]=c;let u=0,f=0;const g=1.05;h!==0?f=(be(o,a-1)==="building"?-1:be(o,a+1)==="building"||n(o,a)>0?1:-1)*g:u=(be(o-1,a)==="building"?-1:be(o+1,a)==="building"||n(o,a)>0?1:-1)*g;const _=o*D+h*(D/2-.5)+u,m=a*D+d*(D/2-.5)+f,p=new Ie,y=new Q(i,t);y.position.y=.52,p.add(y);const v=new Q(r,t);if(v.position.y=1.05,p.add(v),n(o,a,5)>.15){const x=new Q(i,t);x.scale.set(.82,.82,.82),x.position.set(-u*.5-h*.1,.42,-f*.5-d*.1),p.add(x)}p.position.set(_,0,m),this.world.add(p)}}buildWell(){const t=Qn.c*D,e=Qn.r*D;this.blocked.add(`${Qn.c},${Qn.r}`);const n=new ft({map:In(31)}),i=new ft({map:Oe(5)}),r=new ft({map:Rs(3),side:qt}),a=new Ie,o=new Q(new _e(1.15,1.25,1.05,24,1,!0),n);o.position.y=.52,a.add(o);const l=new Q(new _e(.98,.98,1.05,24,1,!0),new ft({color:1512208,side:je}));l.position.y=.52,a.add(l);const c=new Q(new Hl(.98,1.16,24),new ft({color:9274231,side:qt}));c.rotation.x=-Math.PI/2,c.position.y=1.045,a.add(c);const h=new Q(new _e(.97,.97,.05,28),new Vx({color:3109512,specular:12578559,shininess:100,transparent:!0,opacity:.95}));h.position.y=.86,a.add(h);const d=new Q(new Fs(.6,24),new Ae({color:12577525,transparent:!0,opacity:.25}));d.rotation.x=-Math.PI/2,d.position.set(-.12,.87,-.08),a.add(d),this.waterGlint=d;const u=new fe(.16,2,.16);for(const p of[-1,1]){const y=new Q(u,i);y.position.set(p*.95,1.55,0),a.add(y)}const f=new Q(new fe(2.2,.14,.14),i);f.position.y=2.5,a.add(f);const g=new Q(new _e(.025,.025,.72,6),new ft({color:7034422}));g.position.set(.2,2.08,0),a.add(g);const _=new Q(new _e(.24,.2,.34,12),i);_.position.set(.2,1.7,0),a.add(_);const m=new Q(new Nn(1.7,.95,4),r);m.position.y=3.05,m.rotation.y=Math.PI/4,a.add(m),a.position.set(t,0,e),this.world.add(a)}buildTunnel(){const t=new ft({map:Tv(43),side:qt}),e=new ft({map:Ph(47),side:qt}),n=new ft({map:Ph(51),side:qt}),i=new ft({map:In(31)});let r=null;for(let a=0;a<He;a++)for(let o=0;o<tn;o++){if(!uh(o,a))continue;const l=o*D,c=a*D,h=be(o,a)==="stairs",d=new Q(new It(D,D),n);if(d.rotation.x=Math.PI/2,d.position.set(l,qr,c),this.world.add(d),!h){const u=new Q(new It(D,D),t);u.rotation.x=-Math.PI/2,u.position.set(l,.03,c),this.world.add(u)}for(const[u,f]of yn){const g=be(o+u,a+f);g==="street"?r=[o,a]:(g==="mountain"||g==="building")&&!h&&this.addWall(l,c,u,f,0,qr,e)}h&&this.buildStairs(o,a,l,c,e,i)}if(r){const[a,o]=r,l=a*D,c=o*D,h=new Ae({color:16757322});for(const u of[-1,1]){const f=new Q(new _e(.05,.05,1.1,8),new ft({color:2759696}));f.position.set(l+u*(D/2-.25),1.9,c),this.world.add(f);const g=new Q(new Vl(.18,10,10),h);g.position.set(l+u*(D/2-.25),2.55,c),this.world.add(g)}const d=new fn(16752704,7,16,2);d.position.set(l,2.4,c+.5),this.world.add(d),this.flames.push({light:d,base:6})}}addDungeonLights(){this.world.add(new Ss(7762307,1.05)),this.world.add(new ws(9143960,2104617,.72))}addShowcaseLights(){this.world.add(new Ss(6975874,.55)),this.world.add(new ws(10465480,2762272,.5));const t=new oa(14674687,1.3);t.position.set(fa,es+30,pa),t.target.position.set(fa,es,pa),this.world.add(t.target),this.world.add(t)}moteTex(){if(this.moteTexCache)return this.moteTexCache;const t=document.createElement("canvas");t.width=t.height=32;const e=t.getContext("2d"),n=e.createRadialGradient(16,16,0,16,16,16);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.4,"rgba(255,255,255,0.5)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,32,32);const i=new pn(t);return this.moteTexCache=i,i}spawnMotes(t,e,n,i,r,a,o,l,c,h=.0016){const d=new Float32Array(o*3),u=new Float32Array(o);for(let m=0;m<o;m++)d[m*3]=t+(Math.random()-.5)*n,d[m*3+1]=r+Math.random()*(a-r),d[m*3+2]=e+(Math.random()-.5)*i,u[m]=.12+Math.random()*.5;const f=new Se;f.setAttribute("position",new Ve(d,3));const g=new Md({color:l,size:c,map:this.moteTex(),transparent:!0,opacity:.72,depthWrite:!1,sizeAttenuation:!0,blending:so}),_=new dx(f,g);_.renderOrder=8,this.world.add(_),this.motes.push({pts:_,sp:u,y0:r,y1:a,sway:h})}applyHeightFog(t,e,n,i){const r=new kt(i);t.onBeforeCompile=a=>{a.uniforms.hfColor={value:r},a.uniforms.hfClear={value:e},a.uniforms.hfFull={value:n},a.vertexShader=`varying float vWorldY;
`+a.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
  vWorldY = (modelMatrix * vec4(transformed, 1.0)).y;`),a.fragmentShader=`uniform vec3 hfColor;
uniform float hfClear;
uniform float hfFull;
varying float vWorldY;
`+a.fragmentShader.replace("#include <fog_fragment>",`#include <fog_fragment>
  float hf = clamp((vWorldY - hfClear) / (hfFull - hfClear), 0.0, 1.0);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, hfColor, hf);`)},t.needsUpdate=!0}softPuffTex(){if(this.softPuffCache)return this.softPuffCache;const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=e.createRadialGradient(64,64,0,64,64,64);n.addColorStop(0,"rgba(255,255,255,0.9)"),n.addColorStop(.5,"rgba(255,255,255,0.35)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,128,128);const i=new pn(t);return this.softPuffCache=i,i}cloudDomeTex(){if(this.cloudTexCache)return this.cloudTexCache;const t=512,e=256,n=document.createElement("canvas");n.width=t,n.height=e;const i=n.getContext("2d"),r=i.createImageData(t,e);for(let o=0;o<e;o++){const l=o/(e-1),c=Math.min(1,Math.max(0,(.7-l)/.7));for(let h=0;h<t;h++){const d=this.fbm(h*.02,o*.05,3.3),u=Math.min(1,Math.max(0,(d-.34)*2.3));let f=c*(.4+.6*u);l<.14&&(f=Math.max(f,(.14-l)/.14));const g=(o*t+h)*4;r.data[g]=r.data[g+1]=r.data[g+2]=255,r.data[g+3]=Math.round(Math.min(1,f)*255)}}i.putImageData(r,0,0);const a=new pn(n);return a.wrapS=nn,a.flipY=!1,this.cloudTexCache=a,a}fogSmokeTex(t){if(this.smokeTexes[t])return this.smokeTexes[t];const e=128,n=document.createElement("canvas");n.width=n.height=e;const i=n.getContext("2d"),r=i.createImageData(e,e),a=t*17.3;for(let l=0;l<e;l++)for(let c=0;c<e;c++){const h=c/e-.5,d=l/e-.5,u=Math.sqrt(h*h+d*d)*2,f=Math.max(0,1-u),g=f*f,_=this.fbm(c*.05+a,l*.05+a,t*4.7),m=g*(.45+.55*_),p=(l*e+c)*4;r.data[p]=r.data[p+1]=r.data[p+2]=255,r.data[p+3]=Math.round(Math.min(1,m)*255)}i.putImageData(r,0,0);const o=new pn(n);return this.smokeTexes[t]=o,o}spawnFogPuffs(t,e,n,i,r,a,o,l,c=.3,h=1.1,d=.16,u=8,f=18){const g=new kt(o),_=new kt(l);for(let m=0;m<n;m++){const p=g.clone().lerp(_,Math.random()),y=new to({map:this.fogSmokeTex(m%4),color:p,transparent:!0,opacity:d,depthWrite:!1,fog:!1,rotation:Math.random()*Math.PI*2}),v=new ta(y),x=u+Math.random()*(f-u);v.scale.set(x,x,1);const E=Math.random()*Math.PI*2,S=a*(c+Math.random()*(h-c)),A=t+Math.cos(E)*S,C=e+Math.sin(E)*S,M=i+Math.random()*(r-i);v.position.set(A,M,C),v.renderOrder=9,this.world.add(v),this.fogPuffs.push({s:v,bx:A,bz:C,by:M,ph:Math.random()*6.28,rad:1.2+Math.random()*2.6,baseOp:d*(.7+Math.random()*.6),rotSp:(Math.random()-.5)*.04,rise:.3+Math.random()*.7})}}buildShowcase(){const t=lo,e=co,n=nv,i=iv,r=es,a=r+32,o=8160144,l=r+4,c=r+26,h=(V,rt,lt)=>{const mt=In(31);return mt.wrapS=mt.wrapT=nn,mt.repeat.set(V,rt),new ft({map:mt,color:lt??16777215,side:qt})},d=h(1.4,1.4),u=h(1.4,.5,13092807),f=h(1,1),g=h(5,3,12105912),_=h(2,2),m=h(3,2),p=Ah();p.wrapS=p.wrapT=nn,p.repeat.set(1,1);const y=new ft({map:p,side:qt}),v=Gr(61);v.wrapS=v.wrapT=nn,v.repeat.set(4,4);const x=new ft({map:v,side:qt});for(const V of[f,g,d,u,y])this.applyHeightFog(V,l,c,o);const E=(V,rt,lt,mt,Ht,ie,jt)=>{const de=V.length/3;V.push(...mt,...Ht,...ie,...jt),rt.push(0,0,1,0,1,1,0,1),lt.push(de,de+1,de+2,de,de+2,de+3)},S=Mo.slice(0,$s+1),A=V=>Math.atan2(V.z-e,V.x-t),C=A(S[1])-A(S[0]),M=[],w=[],P=[],I=[],N=[],H=[],X=(V,rt,lt)=>[t+rt*Math.cos(V),lt,e+rt*Math.sin(V)];for(let V=0;V<S.length;V++){const rt=A(S[V]),lt=S[V].y,mt=rt-C/2,Ht=rt+C/2;if(E(M,w,P,X(mt,n,lt),X(Ht,n,lt),X(Ht,i,lt),X(mt,i,lt)),V>0){const ie=S[V-1].y;E(I,N,H,X(mt,n,ie),X(mt,i,ie),X(mt,i,lt),X(mt,n,lt))}}const q=(V,rt,lt,mt)=>{const Ht=new Se;Ht.setAttribute("position",new he(V,3)),Ht.setAttribute("uv",new he(rt,2)),Ht.setIndex(lt),Ht.computeVertexNormals();const ie=new Q(Ht,mt);return this.world.add(ie),ie};q(M,w,P,d),q(I,N,H,u);const it=new Q(new _e(n,n,r,32,1,!0),g);it.position.set(t,r/2,e),this.world.add(it);const j=new Q(new Fs(i,40),d);j.rotation.x=-Math.PI/2,j.position.set(t,.02,e),this.world.add(j);const gt=Math.atan2(Es-e,-Math.sqrt(Math.max(0,i*i-(Es-e)**2))),yt=.36,Ct=r-1,Vt=r+4.5,ae=(V,rt)=>Math.abs(Math.atan2(Math.sin(V-rt),Math.cos(V-rt))),tt=60,dt=[[0,Ct],[Ct,Vt],[Vt,a]],Rt=[],_t=[],Nt=[],Gt=i*2*Math.PI/tt/4;for(const[V,rt]of dt){const lt=V===Ct;for(let mt=0;mt<tt;mt++){const Ht=mt/tt*Math.PI*2,ie=(mt+1)/tt*Math.PI*2;if(lt&&ae((Ht+ie)/2,gt)<yt)continue;const jt=t+i*Math.cos(Ht),de=e+i*Math.sin(Ht),Me=t+i*Math.cos(ie),Mn=e+i*Math.sin(ie),qe=mt*Gt,Te=(mt+1)*Gt,ke=Rt.length/3;Rt.push(jt,V,de,Me,V,Mn,Me,rt,Mn,jt,rt,de),_t.push(qe,V/4,Te,V/4,Te,rt/4,qe,rt/4),Nt.push(ke,ke+1,ke+2,ke,ke+2,ke+3)}}const Bt=new Se;Bt.setAttribute("position",new he(Rt,3)),Bt.setAttribute("uv",new he(_t,2)),Bt.setIndex(Nt),Bt.computeVertexNormals(),this.world.add(new Q(Bt,f));const re=fa,Wt=pa,oe=cv+1.8,z=2,Ce=3.4,Kt=re+oe-.2,Jt=Sh-Kt,Mt=(Sh+Kt)/2,Qt=new Q(new It(Jt,z*2),_);Qt.rotation.x=-Math.PI/2,Qt.position.set(Mt,r+.02,Es),this.world.add(Qt);for(const V of[-1,1]){const rt=new Q(new It(Jt,Ce),m);rt.position.set(Mt,r+Ce/2,Es+V*z),this.world.add(rt)}const Pt=new Q(new It(Jt,z*2),m);Pt.rotation.x=Math.PI/2,Pt.position.set(Mt,r+Ce,Es),this.world.add(Pt);const U=oe,T=new It(D,D);for(const[V,rt]of lv()){const lt=new Q(T,x);lt.rotation.x=-Math.PI/2,lt.position.set(V*D,r+.02,rt*D),this.world.add(lt)}const W=new Q(new Fs(U,44),x);W.rotation.x=-Math.PI/2,W.position.set(re,r+.05,Wt),this.world.add(W);const st=Math.asin(Math.min(.98,z/oe))-.03,at=72,et=r-2,Tt=r+Ce,vt=r-2+a,St=oe*2*Math.PI/at/4,$t=[[et,Tt,!0],[Tt,vt,!1]],ct=[],Et=[],Dt=[];for(const[V,rt,lt]of $t)for(let mt=0;mt<at;mt++){const Ht=mt/at*Math.PI*2,ie=(mt+1)/at*Math.PI*2,jt=Math.atan2(Math.sin((Ht+ie)/2),Math.cos((Ht+ie)/2));if(lt&&Math.abs(jt)<st)continue;const de=re+oe*Math.cos(Ht),Me=Wt+oe*Math.sin(Ht),Mn=re+oe*Math.cos(ie),qe=Wt+oe*Math.sin(ie),Te=mt*St,ke=(mt+1)*St,cn=ct.length/3;ct.push(de,V,Me,Mn,V,qe,Mn,rt,qe,de,rt,Me),Et.push(Te,V/4,ke,V/4,ke,rt/4,Te,rt/4),Dt.push(cn,cn+1,cn+2,cn,cn+2,cn+3)}const Ut=new Se;Ut.setAttribute("position",new he(ct,3)),Ut.setAttribute("uv",new he(Et,2)),Ut.setIndex(Dt),Ut.computeVertexNormals(),this.world.add(new Q(Ut,y)),this.blocked.add(`${ai.col},${ai.row}`);const At=yh.x,Yt=yh.z,Xt=new ft({map:Rh(),side:qt}),le=new Q(new _e(.9,1.1,.7,16),Xt);le.position.set(At,r+.4,Yt),this.world.add(le);const F=new ft({color:14080479,emissive:2041137}),pt=new Q(new _e(.4,.55,2.4,6),F);pt.position.set(At,r+.75+1.2,Yt),this.world.add(pt),this.glowLight(At,r+1.9,Yt,13625087,3.6,13),this.glowLight(re,r+13,Wt,14674687,4.5,34);const J=this.decalMat(wa,.1);for(let V=2;V<S.length;V+=4){const rt=A(S[V]),lt=S[V].y+2,mt=t+(i-.25)*Math.cos(rt),Ht=e+(i-.25)*Math.sin(rt),ie=new Q(new It(.9,1.4),J);ie.position.set(mt,lt,Ht),ie.rotation.y=Math.atan2(t-mt,e-Ht),this.world.add(ie),this.glowLight(mt,lt+.2,Ht,16752704,5,10)}for(const V of[Math.PI*.6,Math.PI*1.4])this.glowLight(re+Math.cos(V)*(U-1),r+2.4,Wt+Math.sin(V)*(U-1),16752704,2.6,9);this.spawnMotes(re,Wt,U*2,U*2,r+.2,r+6,60,14673650,.09,.0022),this.spawnFogPuffs(re,Wt,24,r+.6,r+10,U*.55,7370886,11186880,0,1,.05,16,34),this.spawnFogPuffs(t,e,10,1,r-1,n+.5,7370886,10134192,0,.7,.04,14,26)}vnoise(t,e,n){const i=(x,E,S)=>{const A=Math.sin(x*127.1+E*311.7+S*74.7)*43758.5453;return A-Math.floor(A)},r=Math.floor(t),a=Math.floor(e),o=Math.floor(n),l=t-r,c=e-a,h=n-o,d=x=>x*x*(3-2*x),u=d(l),f=d(c),g=d(h),_=(x,E,S)=>x+(E-x)*S,m=_(i(r,a,o),i(r+1,a,o),u),p=_(i(r,a+1,o),i(r+1,a+1,o),u),y=_(i(r,a,o+1),i(r+1,a,o+1),u),v=_(i(r,a+1,o+1),i(r+1,a+1,o+1),u);return _(_(m,p,f),_(y,v,f),g)}fbm(t,e,n){return this.vnoise(t,e,n)*.6+this.vnoise(t*2.1,e*2.1,n*2.1)*.3+this.vnoise(t*4.4,e*4.4,n*4.4)*.1}caveMesh(t,e,n,i,r,a,o,l,c=1,h=1){const d=[],u=[],f=[];for(let m=0;m<=a;m++)for(let p=0;p<=r;p++){const y=p/r,v=m/a;let x=t[0]+e[0]*y+n[0]*v,E=t[1]+e[1]*y+n[1]*v,S=t[2]+e[2]*y+n[2]*v;const A=Math.sin(Math.PI*y)*Math.sin(Math.PI*v),C=o*(this.fbm(x*.32,E*.32,S*.32)-.5)*A;x+=i[0]*C,E+=i[1]*C,S+=i[2]*C,d.push(x,E,S),u.push(y*c,v*h)}for(let m=0;m<a;m++)for(let p=0;p<r;p++){const y=m*(r+1)+p,v=y+1,x=y+r+1,E=x+1;f.push(y,x,v,v,x,E)}const g=new Se;g.setAttribute("position",new he(d,3)),g.setAttribute("uv",new he(u,2)),g.setIndex(f),g.computeVertexNormals();const _=new Q(g,l);return this.world.add(_),_}rockSpire(t,e,n,i,r,a){const o=new Nn(r,Math.abs(i-n),7,4),l=o.attributes.position;for(let h=0;h<l.count;h++){const d=l.getX(h),u=l.getY(h),f=l.getZ(h),g=this.fbm(d*2+t,u*2,f*2+e)-.5;l.setXYZ(h,d+g*r*.7,u,f+g*r*.7)}o.computeVertexNormals();const c=new Q(o,a);return c.position.set(t,(n+i)/2,e),i<n&&(c.rotation.z=Math.PI),this.world.add(c),c}buildDungeon(){const t=ao,e=qs,n=8.5,i=D/2,r=(P,I,N=0)=>Math.abs(Math.sin(P*12.9+I*78.2+N*3.1)*43758.5%1),a=new ft({map:Ah(),side:qt}),o=new ft({map:Rh(),side:qt}),l=new ft({map:yv(),side:qt}),c=this.decalMat(wa,.1),h=this.decalMat(Nh,.08),d=new ft({map:Lh(69),transparent:!0,alphaTest:.5,side:qt}),u=new ft({map:Oe(5)}),f=new ft({color:2564893}),g=new ft({map:ma(17)}),_=(P,I)=>{const N=an(P,I);return N==="wall"||N==="secret"?!1:zr(P-1,I)&&zr(P+1,I)||zr(P,I-1)&&zr(P,I+1)};let m=0;for(let P=0;P<e;P++)for(let I=0;I<t;I++){const N=an(I,P);if(N==="wall")continue;const H=I*D,X=P*D,q=N==="secret";this.caveMesh([H-i,0,X-i],[D,0,0],[0,0,D],[0,1,0],3,3,.12,o,1,1),this.caveMesh([H-i,n,X-i],[D,0,0],[0,0,D],[0,-1,0],5,5,3.4,l,1,1);for(const[it,j]of yn){const gt=an(I+it,P+j),yt=gt==="wall",Ct=q&&gt!=="secret"&&_(I+it,P+j);if(yt||Ct){const Vt=H+it*i,ae=X+j*i,tt=it!==0?[0,0,D]:[D,0,0],dt=it!==0?[Vt,0,ae-i]:[Vt-i,0,ae];this.caveMesh(dt,tt,[0,n,0],[it,0,j],4,6,.9,a,1,2.4),Ct&&this.addWallDecal(I,P,it,j,h,1.9,1.8,1.7)}gt==="wall"&&!q&&m<30&&r(I,P,it*5+j)<.2&&(this.addWallDecal(I,P,it,j,c,.85,1.4,2.1),this.glowLight(H+it*.3,2.3,X+j*.3,16752704,4.4,12),m++)}if(N==="bones"){const it=new Q(new It(1.7,1.3),d);it.rotation.x=-Math.PI/2,it.position.set(H,.05,X),this.world.add(it)}else if(N==="barrel"){const it=new Q(new _e(.42,.46,.95,12),g);it.position.set(H,.48,X),this.world.add(it),this.blocked.add(`${I},${P}`)}else N==="chest"&&(this.buildChest(H,X,u,f),this.blocked.add(`${I},${P}`),this.glowLight(H,.9,X,16761703,1.5,6.5))}const p=this.decalMat(j1,.4),y=this.decalMat(Z1,.4),v=4.7,x=1.5,E=2.6,S=[[22,12,0,1],[17,35,1,0]];for(const[P,I,N,H]of S){if(an(P,I)!=="gate")continue;this.addArchWall(P,I,N,H,a,x,E,n),this.addWallDecal(P,I,N,H,p,D,v,v/2);const{pivotL:X,pivotR:q}=this.buildSwingGate(P,I,N,H,y,D,v);this.glowLight(P*D+N*.4,2.4,I*D+H*.4,16757850,3.4,9),this.glowLight((P-N)*D,1.8,(I-H)*D,16760690,2.2,9),this.blocked.add(`${P},${I}`),this.gates.set(`${P},${I}`,{pivotL:X,pivotR:q})}const A=Xi("L")[0];A&&(this.addArchWall(A.col,A.row,-1,0,a,x,E,n),this.addWallDecal(A.col,A.row,-1,0,p,D,v,v/2),this.addWallDecal(A.col,A.row,-1,0,y,D,v,v/2),this.glowLight(A.col*D+-1*.4,2.4,A.row*D,16757850,3,8),this.blocked.add(`${A.col},${A.row}`));const C=Xi("A")[0];if(C){const P=new ft({map:In(31),side:qt}),I=C.col*D-D*.4,N=C.row*D,H=9;for(let X=0;X<H;X++){const q=.15+(X+1)*.42,it=new Q(new fe(.66,q,3),P);it.position.set(I+X*.6,q/2,N),this.world.add(it)}for(const X of[-1,1]){const q=new Q(new It(D*1.5,n),a);q.position.set(I+D*.6,n/2,N+X*1.5),q.rotation.y=X>0?Math.PI:0,this.world.add(q)}this.glowLight(I+.4,2.4,N,16760938,4.6,11),this.glowLight(I+2.6,3.4,N,16757850,2.6,8)}const M=gh("U"),w=new fn(12574975,3.2,13,2);w.position.set(M.col*D,2.7,M.row*D),this.world.add(w),this.spawnDungeonEnemy()}buildChest(t,e,n,i){const r=new Q(new fe(1,.6,.7),n);r.position.set(t,.3,e),this.world.add(r);const a=new Q(new fe(1.03,.3,.73),n);a.position.set(t,.73,e),this.world.add(a);const o=new Q(new fe(1.05,.95,.14),i);o.position.set(t,.46,e),this.world.add(o);const l=new fn(16764794,1.4,5,2);l.position.set(t,1.1,e),this.world.add(l)}spawnDungeonEnemy(){const t=Xi("E").filter(i=>!(i.col===this.col&&i.row===this.row));if(!t.length)return;let e=t[0],n=1/0;for(const i of t){const r=Math.abs(i.col-this.col)+Math.abs(i.row-this.row);r<n&&(n=r,e=i)}this.buildDungeonEnemy(e.col,e.row)}addWall(t,e,n,i,r,a,o){const l=new Q(new It(D,a-r),o);return l.position.set(t+n*(D/2),(r+a)/2,e+i*(D/2)),n===1?l.rotation.y=-Math.PI/2:n===-1?l.rotation.y=Math.PI/2:i===1?l.rotation.y=Math.PI:l.rotation.y=0,this.world.add(l),l}addArchWall(t,e,n,i,r,a,o,l){const c=D/2,h=new Ed;h.moveTo(-c,0),h.lineTo(c,0),h.lineTo(c,l),h.lineTo(-c,l),h.closePath();const d=new ml;d.moveTo(-a,0),d.lineTo(a,0),d.lineTo(a,o),d.absarc(0,o,a,0,Math.PI,!1),d.lineTo(-a,0),h.holes.push(d);const u=new Gl(h,20),f=u.attributes.uv;for(let _=0;_<f.count;_++)f.setXY(_,f.getX(_)*.18,f.getY(_)*.18);const g=new Q(u,r);return g.position.set(t*D+n*(D/2),0,e*D+i*(D/2)),n===1?g.rotation.y=-Math.PI/2:n===-1?g.rotation.y=Math.PI/2:i===1?g.rotation.y=Math.PI:g.rotation.y=0,g.renderOrder=3,this.world.add(g),g}halfPlaneGeo(t,e,n){const i=new It(t,e),r=i.attributes.uv;for(let a=0;a<r.count;a++)r.setX(a,r.getX(a)*.5+n*.5);return i}buildSwingGate(t,e,n,i,r,a,o){const l=new Ie;l.position.set(t*D+n*(D/2+.06),0,e*D+i*(D/2+.06)),l.rotation.y=n===1?Math.PI/2:n===-1?-Math.PI/2:i===1?0:Math.PI;const c=new Ie;c.position.set(-a/2,0,0);const h=new Q(this.halfPlaneGeo(a/2,o,0),r);h.position.set(a/4,o/2,0),h.renderOrder=4,c.add(h);const d=new Ie;d.position.set(a/2,0,0);const u=new Q(this.halfPlaneGeo(a/2,o,1),r);return u.position.set(-a/4,o/2,0),u.renderOrder=4,d.add(u),l.add(c),l.add(d),this.world.add(l),{pivotL:c,pivotR:d}}buildStairs(t,e,n,i,r,a){const c=i+D/2,h=D/5,d=-5*.8;for(const[_,m]of yn){const p=be(t+_,e+m);(p==="mountain"||p==="building")&&this.addWall(n,i,_,m,d,qr,r)}for(let _=0;_<5;_++){const m=-_*.8,p=c-(_+.5)*h,y=m-d,v=new Q(new fe(D,y,h+.02),a);v.position.set(n,m-y/2,p),this.world.add(v)}const u=new Q(new It(D,D),new Ae({color:328966}));u.rotation.x=-Math.PI/2,u.position.set(n,d+.02,i),this.world.add(u);const f=new fn(16760688,6,13,2);f.position.set(n,2.6,i+D/2-.3),this.world.add(f);const g=new fn(16752720,3.5,8,2);g.position.set(n,.4,i-.6),this.world.add(g)}buildEstablishments(t,e){for(const n of ya){const{c:i,r,dc:a,dr:o,kind:l}=n;this.addDecal(i,r,a,o,t,"door"),this.doorMap.set(`${i},${r},${a},${o}`,l);const c=i*D+a*(D/2+.06),h=r*D+o*(D/2+.06),d=new Q(new It(1.05,1.75),e);d.position.set(c-o*1.3,2.05,h+a*1.3),d.rotation.y=a===1?Math.PI/2:a===-1?-Math.PI/2:o===1?0:Math.PI,d.renderOrder=4,this.world.add(d);const u=new Ie,f=.46,g=new ft({map:ga(Cs[l].name),transparent:!0,side:qt}),_=new Q(new It(f*Rb,f),g);_.position.set(0,1.74,.03),u.add(_);const m=Ab[l];m&&this.loadArt(m,E=>{g.map=E,g.needsUpdate=!0;const S=E.image;if(S&&S.width&&S.height){const A=S.width/S.height;_.geometry.dispose(),_.geometry=new It(f*A,f)}});const p=i*D+a*(D/2+.16),y=r*D+o*(D/2+.16),v=o,x=-a;u.position.set(p+v*1.5,0,y+x*1.5),u.rotation.y=a===1?Math.PI/2:a===-1?-Math.PI/2:o===1?0:Math.PI,this.world.add(u)}}buildHomes(t){for(const e of Sa){const{c:n,r:i,dc:r,dr:a,id:o}=e;this.addDecal(n,i,r,a,t,"door"),this.homeDoorMap.set(`${n},${i},${r},${a}`,o)}}addNPC(t,e,n,i,r,a,o=1,l,c){const h=Sv(n),d=!!a,u=new ft({map:h,transparent:!0,alphaTest:.5,side:qt}),f=(d?2.4:2.15)*o,g=(d?f*.671:1.3)*(d?1:o),_=d?f/2-f*.015+.06:1.1*o,m=new Q(new It(g*.95,g*.55),new Ae({map:this.shadowTex(),transparent:!0,depthWrite:!1,opacity:.55})),p=c?this.wallLean(t,e):{x:0,z:0},y=t*D+p.x,v=e*D+p.z;m.rotation.x=-Math.PI/2,m.position.set(y,.03,v),m.renderOrder=1,this.world.add(m);const x=new Q(new It(g,f),u);x.position.set(y,_,v),x.userData={baseY:_,h:f,ph:(t*12.9+e*7.3)%(Math.PI*2)},this.world.add(x);const E=this.makeNameTag(i.split(",")[0].trim());E.position.set(y,_+f/2+.18,v),this.world.add(E),this.npcs.push(x);const S=`${t},${e}`,A={name:i,lines:r,tex:h,art:!1,frames:1,portrait:void 0};this.npcMap.set(S,A),a&&this.loadArt(a,C=>{l&&(C.repeat.set(1/l.frames,1),C.offset.set(0,0),this.animTex.push({tex:C,frames:l.frames,fps:l.fps})),u.map=C,u.needsUpdate=!0,A.tex=C,A.art=!0,A.frames=l?.frames??1,A.portrait=void 0}),c&&this.walkers.push({mesh:x,shadow:m,tag:E,baseY:_,cur:{c:t,r:e},dayCell:{c:c.day[0],r:c.day[1]},nightCell:{c:c.night[0],r:c.night[1]},key:S,moving:!1,t0:0,from:{c:t,r:e},to:{c:t,r:e},fromX:y,fromZ:v,toX:y,toZ:v,waitUntil:0,inside:!1,doorDir:void 0,trans:null})}makeNameTag(t){const i='bold 40px "Cinzel", "MedievalSharp", system-ui, serif',r=document.createElement("canvas").getContext("2d");r.font=i;const o=Math.ceil(r.measureText(t).width)+36,l=58,c=document.createElement("canvas");c.width=o,c.height=l;const h=c.getContext("2d"),d=l/2;h.beginPath(),h.moveTo(d,0),h.arcTo(o,0,o,l,d),h.arcTo(o,l,0,l,d),h.arcTo(0,l,0,0,d),h.arcTo(0,0,o,0,d),h.closePath(),h.fillStyle="rgba(16,12,8,0.74)",h.fill(),h.lineWidth=3,h.strokeStyle="rgba(201,162,39,0.7)",h.stroke(),h.font=i,h.textAlign="center",h.textBaseline="middle",h.lineWidth=5,h.strokeStyle="rgba(0,0,0,0.85)",h.strokeText(t,o/2,l/2+1),h.fillStyle="#f0dca2",h.fillText(t,o/2,l/2+1);const u=new pn(c);u.colorSpace=Re,u.magFilter=We,u.minFilter=gn,u.generateMipmaps=!0;const f=new ta(new to({map:u,transparent:!0,depthWrite:!1})),g=.4;return f.scale.set(g*(o/l),g,1),f}shadowTex(){if(!this._shadowTex){const e=document.createElement("canvas");e.width=64,e.height=64;const n=e.getContext("2d"),i=n.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);i.addColorStop(0,"rgba(0,0,0,0.6)"),i.addColorStop(.6,"rgba(0,0,0,0.32)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,64,64);const r=new pn(e);r.colorSpace=Re,this._shadowTex=r}return this._shadowTex}loadArt(t,e){const n=this.artCache.get(t);if(n){e(n);return}new Ld().load(t,i=>{i.colorSpace=Re,i.magFilter=We,i.minFilter=gn,i.generateMipmaps=!0,i.anisotropy=8,i.wrapS=mn,i.wrapT=mn,this.artCache.set(t,i),e(i)},void 0,()=>{})}buildNPCs(){const t=(performance.now()/Fr+Or)%1;this.npcNight=this.daylight(t)<.3;for(const e of Jb){const n=tM[e.id],i=n?n.url:Qb[e.id],[r,a]=this.npcNight?e.night:[e.c,e.r];this.addNPC(r,a,e.seed,e.name,e.lines,i,e.scale??1,n?{frames:n.frames,fps:n.fps}:void 0,{day:[e.c,e.r],night:e.night})}}makePortrait(t,e=1){const n=t;if(!n)return null;const i=Math.floor((n.naturalWidth||n.width||0)/e),r=n.naturalHeight||n.height||0;if(!i||!r)return null;const a=132,o=document.createElement("canvas");o.width=a,o.height=a;const l=o.getContext("2d");if(!l)return null;l.imageSmoothingQuality="high";let c=i*.5-r*.09,h=r*.05,d=r*.18;try{const u=document.createElement("canvas");u.width=i,u.height=r;const f=u.getContext("2d");if(f){f.drawImage(t,0,0);const g=f.getImageData(0,0,i,r).data,_=40,m=v=>{let x=0,E=0,S=-1;for(let A=0;A<=i;A++)if(A<i&&g[(v*i+A)*4+3]>_)S<0&&(S=A);else if(S>=0){const M=A-S;M>x&&(x=M,E=S),S=-1}return{w:x,cx:E+x/2}};let p=-1,y=-1;for(let v=0;v<r&&p<0;v++)for(let x=0;x<i;x++)if(g[(v*i+x)*4+3]>_){p=v;break}for(let v=r-1;v>=0&&y<0;v--)for(let x=0;x<i;x++)if(g[(v*i+x)*4+3]>_){y=v;break}if(p>=0&&y>p){const v=y-p+1;let x=p;for(let C=p;C<p+v*.3;C++)if(m(C).w>i*.06){x=C;break}let E=0,S=i/2;const A=Math.round(v*.14);for(let C=x;C<x+A;C++){const M=m(C);M.w>E&&(E=M.w,S=M.cx)}d=Math.max(v*.13,Math.min(E*1.55,v*.3,r*.55)),c=S-d/2,h=x-d*.12}}}catch{}c=Math.max(0,Math.min(c,i-d)),h=Math.max(0,Math.min(h,r-d)),d=Math.min(d,i,r);try{return l.drawImage(t,c,h,d,d,0,0,a,a),o.toDataURL("image/png")}catch{return null}}portraitFor(t){const e=this.npcMap.get(t);if(!e)return null;if(e.portrait!==void 0)return e.portrait;const n=e.tex.image;if(!n)return null;const i=this.makePortrait(n,e.frames??1);return i&&(e.portrait=i),i}addForestLights(){const t=new Ss(10134706,.72),e=new ws(10464188,4214830,.85),n=new oa(14673644,.5);n.position.set(-8,16,5),this.world.add(t),this.world.add(e),this.world.add(n),this.registerDayLight(t,3557482,.44),this.registerDayLight(e,2899038,.5),this.registerDayLight(n,6714797,.14)}buildForest(){const t=Us,e=ts,n=da("s"),i=(E,S,A=0)=>{const C=Math.sin(E*41.3+S*17.7+A*7.13)*4213.1;return C-Math.floor(C)},r=new ft({map:Gr(61)});r.map.repeat.set(t+10,e+10);const a=new Q(new It((t+10)*D,(e+10)*D),r);a.rotation.x=-Math.PI/2,a.position.set((t/2-.5)*D,0,(e/2-.5)*D),this.world.add(a);const o=new ft({map:xa(63)}),l=new It(D,D);for(let E=0;E<e;E++)for(let S=0;S<t;S++){const A=ti(S,E);if(A==="path"||A==="gate"||A==="spawn"||A==="sign"){const C=new Q(l,o);C.rotation.x=-Math.PI/2,C.rotation.z=Math.floor(i(S,E,9)*4)*Math.PI/2,C.position.set(S*D,.02,E*D),this.world.add(C)}}const c=Oh.length>0,h=(c?Oh:[65,66,67,71,79]).map((E,S)=>{const A=new ft({map:Ch(65+S*6),transparent:!0,alphaTest:.4,side:qt});return c&&this.loadArt(E,C=>{A.map=C,A.needsUpdate=!0}),A}),d=Sb.map((E,S)=>{const A=new ft({map:Ch(83+S*4),transparent:!0,alphaTest:.4,side:qt});return this.loadArt(E,C=>{A.map=C,A.needsUpdate=!0}),A}),u=[67,73].map(E=>new ft({map:Av(E),transparent:!0,alphaTest:.4,side:qt})),f=[75,77].map(E=>new ft({map:Ev(E),transparent:!0,alphaTest:.35,side:qt})),g=new ft({map:_a(41)}),_=new ft({map:Lh(69),transparent:!0,alphaTest:.4,side:qt}),m=new ft({map:Oe(5)}),p=new ft({map:Oe(7)}),y=(E,S,A,C,M,w=!1)=>{const P=new It(A,C),I=w?-1:1,N=new Q(P,M);N.position.set(E,C/2,S),N.scale.x=I;const H=new Q(P,M);H.position.set(E,C/2,S),H.rotation.y=Math.PI/2,H.scale.x=I,this.world.add(N),this.world.add(H)},v=c?Tb:.44,x=(E,S,A,C,M)=>{const P=d.length>0&&i(C,M,17)<.12?d:h,I=P[Math.floor(i(C,M,4)*P.length)%P.length];y(E,S,A*v,A,I,i(C,M,16)>.5)};for(let E=0;E<e;E++)for(let S=0;S<t;S++){const A=ti(S,E),C=S*D,M=E*D;if(A==="tree"||A==="edge"){const w=A==="edge",P=(w?8:5.4)+i(S,E,1)*2.2,I=(i(S,E,2)-.5)*D*.45,N=(i(S,E,3)-.5)*D*.45;x(C+I,M+N,P,S,E),i(S,E,12)>.5&&y(C+I,M+N,2,1.1,f[Math.floor(i(S,E,13)*f.length)%f.length]),w&&this.blocked.add(`${S},${E}`)}else if(A==="bush"){const w=2.4+i(S,E,5)*.8,P=1.4+i(S,E,6)*.5,I=u[Math.floor(i(S,E,7)*u.length)%u.length];y(C,M,w,P,I),this.blocked.add(`${S},${E}`)}else if(A==="rock"){const w=1.1+i(S,E,8)*.8,P=new Q(new Bl(w),g);P.position.set(C,w*.55,M),P.rotation.set(i(S,E,9)*3,i(S,E,10)*3,.2),P.scale.y=.7,this.world.add(P),this.blocked.add(`${S},${E}`)}else if(A==="foliage"){const w=1.8+i(S,E,5)*.8,P=.9+i(S,E,6)*.5;y(C+(i(S,E,2)-.5)*D*.4,M+(i(S,E,3)-.5)*D*.4,w,P,f[Math.floor(i(S,E,7)*f.length)%f.length])}else if(A==="skull")y(C,M,2,1.4,_);else if(A==="sign"){const P=S===n.col&&E===n.row?[0,1]:this.forestSignFacing(S,E);this.buildForestSign(C,M,m,P),this.blocked.add(`${S},${E}`)}if(A==="grass"&&i(S,E,14)>.9){const w=new Q(new _e(.28,.32,2.4,8),p);w.rotation.set(0,i(S,E,15)*Math.PI,Math.PI/2),w.position.set(C,.28,M),this.world.add(w)}}if(Wr.length>0){const E=this.makeClusterMats(),S=(M,w,P,I)=>{const N=15+i(I,0,2)*3,H=E[Math.floor(i(I,0,4)*E.length)%E.length],X=N*H.aspect,q=new Q(new It(X,N),H.mat);q.position.set(M,N/2-1,w),q.rotation.y=P,i(I,0,5)>.5&&(q.scale.x=-1),this.world.add(q)},A=15*1.85*.72;let C=0;for(let M=-D;M<=(t+1)*D;M+=A)S(M,-1.5*D,0,C++);for(let M=-D;M<=e*D;M+=A)S(-1.5*D,M,Math.PI/2,C++),S((t+.5)*D,M,-Math.PI/2,C++)}else{for(let E=-2;E<t+2;E+=2)x(E*D+1,-2*D,10+i(E,-3,1)*3,E,-3);for(let E=-1;E<e-2;E+=2)x(-2*D,E*D,9+i(-3,E,1)*3,-3,E),x((t+1)*D,E*D,9+i(t+2,E,1)*3,t+2,E)}this.buildForestBackdrop(),this.buildForestVillageBackdrop()}buildForestVillageBackdrop(){const t=da("V"),e=t.col*D,n=t.row*D,i=n+9*D,r=.6,a=new ft({map:Gr(61)});a.map.repeat.set(20,16);const o=new Q(new It(22*D,16*D),a);o.rotation.x=-Math.PI/2,o.position.set(e,-.02,n+6*D),this.world.add(o);const l=new ft({map:xa(63)}),c=new It(D,D);for(let E=n+1*D;E<i-2*D;E+=D){const S=new Q(c,l);S.rotation.x=-Math.PI/2,S.rotation.z=Math.round((E-n)/D)%2*(Math.PI/2),S.position.set(e,.02,E),this.world.add(S)}if(Wr.length>0){const E=this.makeClusterMats(),S=13,A=(C,M,w,P)=>{const I=E[P%E.length],N=new Q(new It(S*I.aspect,S),I.mat);N.position.set(C,S/2-1,M),N.rotation.y=Math.PI,w&&(N.scale.x=-1),this.world.add(N)};A(e-13,i+2*D,!1,0),A(e+13,i+2*D,!0,1),A(e-20,i-1*D,!1,1),A(e+20,i-1*D,!0,0)}const h=new Ie,d=new ft({map:Oe(3)}),u=new ft({map:Rs(3),side:qt}),f=new ft({map:Oe(5)}),g=new ft({map:_a(41)}),_=new ft({map:In(31)}),m=new ft({map:Eh(7)}),p=new ft({color:2102288});m.map.repeat.set(6,5);const y=new Q(new It(24,18),m);y.rotation.x=-Math.PI/2,y.position.set(0,.06,2),h.add(y);const v=new Q(new fe(34,9,7),g);v.position.set(-2,3.5,13),h.add(v);for(const[E,S,A,C]of[[-4,0,11,13],[1,-.5,10,15],[5.5,.5,9,11],[-9,.8,8,10]]){const M=new Q(new Nn(A,C,7),g);M.position.set(E*1.5,C/2+1.5,13+S),M.rotation.y=E,h.add(M)}const x=(E,S,A,C,M)=>{const w=new Q(new fe(A,C,A),d);w.position.set(E,C/2,S),h.add(w);const P=new Q(new Nn(A*.82,C*.6,4),u);P.position.set(E,C+C*.28,S),P.rotation.y=Math.PI/4,h.add(P);const I=E+M[0]*(A/2+.03),N=S+M[1]*(A/2+.03),H=Math.atan2(M[0],M[1]),X=new Q(new It(A*.26,C*.5),p);X.position.set(I,C*.25,N),X.rotation.y=H,h.add(X);for(const q of[-1,1]){const it=new Q(new It(A*.16,C*.2),p);it.position.set(I+q*M[1]*A*.26,C*.62,N-q*M[0]*A*.26),it.rotation.y=H,h.add(it)}};{for(const[P,I,N]of[[-6,3,3.2],[-2,3.2,3.4],[2,3,3.1],[6,3.2,3.3]])x(P,7,I,N,[0,-1]);for(const P of[2.5,5])x(-8,P,3,3.1,[1,0]);for(const P of[2.5,5])x(8,P,3,3.1,[-1,0]);const E=new Ie,S=new Q(new _e(.85,.95,1,16),_);S.position.y=.5,E.add(S);for(const P of[-.75,.75]){const I=new Q(new fe(.14,1.9,.14),f);I.position.set(P,1.45,0),E.add(I)}const A=new Q(new Nn(1.25,.7,4),u);A.position.y=2.5,A.rotation.y=Math.PI/4,E.add(A),E.position.set(0,0,2.5),h.add(E);const C=new Ie,M=new fe(.36,3.4,.36);for(const P of[-1.6,1.6]){const I=new Q(M,f);I.position.set(P,1.7,0),C.add(I)}const w=new Q(new fe(3.9,.36,.4),f);w.position.set(0,3.35,0),C.add(w),C.position.set(0,0,-3.5),h.add(C)}h.scale.setScalar(r),h.position.set(e,0,i),this.world.add(h)}forestSignFacing(t,e){const n=[[0,1],[1,0],[0,-1],[-1,0]];let i=[0,1];for(const[r,a]of n){if(ti(t+r,e+a)==="path")return[r,a];ha(t+r,e+a)&&(i=[r,a])}return i}buildForestSign(t,e,n,i){const r=new Ie,a=new fe(.16,2.3,.16);for(const c of[-.62,.62]){const h=new Q(a,n);h.position.set(c,1.15,0),r.add(h)}const o=new Q(new fe(1.75,.66,.09),n);o.position.set(0,1.78,.02),r.add(o);const l=new Q(new fe(1.85,.76,.06),new ft({color:2759696}));l.position.set(0,1.78,-.01),r.add(l),r.position.set(t,0,e),r.rotation.y=Math.atan2(i[0],i[1]),this.world.add(r)}buildForestBackdrop(){const t=new Ae({color:7305349}),e=new Ae({color:12108495}),n=(Us/2-.5)*D,i=-7*D;[-2.4,-1.2,-.1,1,2.2].forEach((a,o)=>{const l=30+o*37%13,c=17+o*53%8,h=n+a*24,d=i-o*31%8,u=new Q(new Nn(c,l,5),t);u.position.set(h,l/2-3,d),u.rotation.y=o,this.world.add(u);const f=new Q(new Nn(c*.4,l*.32,5),e);f.position.set(h,l-l*.18-3,d),f.rotation.y=o,this.world.add(f)})}canWalk(t,e){return(this.location==="village"?ca(t,e):this.location==="forest"?ha(t,e):this.location==="dungeon"?mh(t,e):this.location==="showcase"?wh(t,e):Ma(t,e))&&!this.blocked.has(`${t},${e}`)}floorYAt(t,e){return this.location==="showcase"?ua:0}applyShowcasePose(){const t=As(this.showIdx);this.camera.position.set(t.x,t.y+kr,t.z),this.camera.rotation.y=t.yaw}stationStep(t,e){const n=As(this.showIdx),i=As(t);this.showIdx=t;const r=e>0?i.yaw:i.yaw+Math.PI;let a=this.camera.rotation.y,o=r;for(;o-a>Math.PI;)o-=Math.PI*2;for(;o-a<-Math.PI;)o+=Math.PI*2;this.anim={kind:"move",t0:performance.now(),fromX:n.x,fromZ:n.z,toX:i.x,toZ:i.z,fromY:n.y,toY:i.y,fromYaw:a,toYaw:o},this.pushMinimap()}showcaseStationMove(t){t==="forward"?this.showIdx<Zi?this.stationStep(this.showIdx+1,1):this.enterTerraceFromStairs():t==="back"&&(this.showIdx>0?this.stationStep(this.showIdx-1,-1):this.exitShowcase())}enterTerraceFromStairs(){const t=As(Zi);this.showIdx=-1,this.col=Br.c,this.row=Br.r,this.facing=3;let e=this.camera.rotation.y,n=bh;for(;n-e>Math.PI;)n-=Math.PI*2;for(;n-e<-Math.PI;)n+=Math.PI*2;this.anim={kind:"move",t0:performance.now(),fromX:t.x,fromZ:t.z,toX:Br.c*D,toZ:Br.r*D,fromY:t.y,toY:ua,fromYaw:e,toYaw:n},this.pushMinimap()}enterStairsFromTerrace(){const t=As(Zi);this.showIdx=Zi;let e=this.camera.rotation.y,n=bh+Math.PI;for(;n-e>Math.PI;)n-=Math.PI*2;for(;n-e<-Math.PI;)n+=Math.PI*2;this.anim={kind:"move",t0:performance.now(),fromX:this.col*D,fromZ:this.row*D,toX:t.x,toZ:t.z,fromY:ua,toY:t.y,fromYaw:e,toYaw:n},this.pushMinimap()}exitShowcase(){const t=this.showcaseReturn;if(t)this.showcaseReturn=null,this.enterLocation(t.loc,t.col,t.row,t.facing);else{const e=this.returnTo;this.enterLocation("village",e.col,e.row,e.facing)}}buildMiniGrid(){let t,e,n;this.location==="village"?(t=tn,e=He,n=ca):this.location==="forest"?(t=Us,e=ts,n=ha):this.location==="dungeon"?(t=ao,e=qs,n=mh):this.location==="showcase"?(t=6,e=10,n=wh):(t=wl,e=fo,n=Ma);const i=new Uint8Array(t*e);for(let r=0;r<e;r++)for(let a=0;a<t;a++)i[r*t+a]=n(a,r)?1:0;this.miniGrid={cols:t,rows:e,cells:i}}miniLocName(){switch(this.location){case"village":return"Vilarejo";case"forest":return"Floresta Sussurrante";case"dungeon":return"Masmorra";case"showcase":return"Santuário";case"tavern":return"Taverna";case"store":return"Mercador";case"smith":return"Ferreiro";case"alchemist":return"Alquimista";default:return"Casa"}}buildMiniPois(){const t=[],e=n=>n.charAt(0)+n.slice(1).toLowerCase();if(this.location==="village"){for(const n of ya){const i=n.kind==="store"?"store":n.kind==="tavern"?"tavern":n.kind==="alchemist"?"alchemist":"smith";t.push({c:n.c,r:n.r,kind:i,label:e(Cs[n.kind].name)})}for(const n of Sa)t.push({c:n.c,r:n.r,kind:"home",label:"Casa"});t.push({c:Qn.c,r:Qn.r,kind:"well",label:"Poço"});for(let n=0;n<He;n++)for(let i=0;i<tn;i++){const r=be(i,n);r==="stairs"?t.push({c:i,r:n,kind:"dungeon",label:"Masmorra"}):r==="forestgate"&&t.push({c:i,r:n,kind:"forest",label:"Floresta"})}for(const[n,i]of this.npcMap){const[r,a]=n.split(",").map(Number);t.push({c:r,r:a,kind:"npc",label:i.name.split(/[ ,]/)[0]})}}else if(this.location==="forest")for(let n=0;n<ts;n++)for(let i=0;i<Us;i++){const r=ti(i,n);r==="gate"?t.push({c:i,r:n,kind:"exit",label:"Vilarejo"}):r==="sign"&&t.push({c:i,r:n,kind:"sign",label:"Placa"})}else if(this.location==="dungeon"){for(const n of Xi("S"))t.push({c:n.col,r:n.row,kind:"stair",label:"Saída"});for(const n of Xi("A"))t.push({c:n.col,r:n.row,kind:"sanctuary",label:"Escadaria"});for(const n of Xi("L"))t.push({c:n.col,r:n.row,kind:"gate",label:"Portão Selado"});for(const n of this.gates.keys()){const[i,r]=n.split(",").map(Number);t.push({c:i,r,kind:"gate",label:"Grade"})}}else if(this.location!=="showcase"){const n=$i("N"),i=$i("X"),r=this.location==="tavern"||this.location==="store"||this.location==="smith"||this.location==="alchemist"?Cs[this.location].npc.split(/[ ,]/)[0]:"Morador";t.push({c:n.col,r:n.row,kind:"npc",label:r}),t.push({c:i.col,r:i.row,kind:"exit",label:"Sair"})}return t}pushMinimap(){this.miniGrid||this.buildMiniGrid();const t=this.miniGrid,[e,n]=yn[this.facing];this.ui.updateMinimap({cols:t.cols,rows:t.rows,cells:t.cells,col:this.col,row:this.row,dc:e,dr:n,pois:this.buildMiniPois(),locName:this.miniLocName()})}doInteract(){const t=this.facingTarget();if(t){if(t.kind==="enter"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=$i("P");this.enterLocation(t.estab,e.col,e.row,0)}else if(t.kind==="enterhome"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=$i("P");this.enterLocation(t.id,e.col,e.row,0)}else if(t.kind==="exit"){const{col:e,row:n,facing:i}=this.returnTo;this.enterLocation("village",e,n,i)}else if(t.kind==="talk"){const e=Ea(t.lines),n=this.portraitFor(t.key);this.dialogue={name:t.name,lines:e,idx:0,portrait:n},this.ui.showDialogue(t.name,e[0],n)}else if(t.kind==="dungeon"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=gh("S");this.enterLocation("dungeon",e.col,e.row,0)}else if(t.kind==="gate")this.openGate(t.key);else if(t.kind==="lockgate"){const e=Ea(["Um portão de ferro antigo, coberto de selos.","Uma força além da tua o mantém trancado. Ainda não há como passar..."]);this.dialogue={name:"Portão Selado",lines:e,idx:0,portrait:null},this.ui.showDialogue("Portão Selado",e[0],null)}else if(t.kind==="sanctuary")this.showcaseReturn={loc:"dungeon",col:this.col,row:this.row,facing:(this.facing+2)%4},this.enterLocation("showcase",0,0,0);else if(t.kind==="smithshop")this.ui.openSmith(this.buildSmithData());else if(t.kind==="toforest"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=da("P");this.enterLocation("forest",e.col,e.row,0)}else if(t.kind==="tovillage"){const e=ph();this.enterLocation("village",e.col,e.row-1,0)}else if(t.kind==="sign"){const e=Ea(t.lines);this.dialogue={name:"Placa",lines:e,idx:0,portrait:null},this.ui.showDialogue("Placa",e[0],null)}}}openGate(t){const e=this.gates.get(t);e&&(this.gateAnims.push({pivotL:e.pivotL,pivotR:e.pivotR,t0:this.now,dur:620,to:1.05}),this.gates.delete(t),this.blocked.delete(t))}advanceDialogue(){this.dialogue&&(this.dialogue.idx++,this.dialogue.idx>=this.dialogue.lines.length?(this.dialogue=null,this.ui.hideDialogue()):this.ui.showDialogue(this.dialogue.name,this.dialogue.lines[this.dialogue.idx],this.dialogue.portrait??null))}box(t,e,n,i,r,a,o){const l=new Q(new fe(i,r,a),o);return l.position.set(t,e,n),this.world.add(l),l}buildRoomShell(t=9,e=2,n=4864038){const r=new ft({map:Oe(t)}),a=new ft({map:Oe(e),side:qt}),o=new ft({color:n,side:qt}),l=new ft({map:Mv(11),side:qt}),c=new It(D,D);for(let f=0;f<fo;f++)for(let g=0;g<wl;g++){if(!Ma(g,f))continue;const _=new Q(c,r);_.rotation.x=-Math.PI/2,_.position.set(g*D,0,f*D),this.world.add(_);const m=new Q(c,o);m.rotation.x=Math.PI/2,m.position.set(g*D,3,f*D),this.world.add(m);for(const[p,y]of yn)eo(g+p,f+y)==="#"&&this.addWall(g*D,f*D,p,y,0,3,a)}const h=$i("X"),d=new Q(new It(dh,Nr),l);d.position.set(h.col*D,Nr/2,h.row*D+D/2-.06),d.rotation.y=Math.PI,this.world.add(d);const u=new Q(new It(1.7,.6),new ft({map:ga("SAÍDA"),transparent:!0,side:qt}));u.position.set(h.col*D,Nr+.5,h.row*D+D/2-.08),u.rotation.y=Math.PI,this.world.add(u)}buildHome(t){this.buildRoomShell(9,6,3943450);const n=new ft({map:Oe(5)}),i=new ft({map:Oe(7)}),r=new ft({map:In(31)}),a=new ft({color:7161136}),o=new ft({color:13350025});this.wallCell(1,3,[-1,0],(g,_)=>{this.box(g,1.2,_,.5,2.4,2,r),this.box(g+.42,.55,_,.34,.7,1.1,new Ae({color:16742942})),this.glowLight(g+1.4,1,_,16747054,4.2,10)});const l=3*D,c=3*D;this.blocked.add("3,3"),this.box(l,.95,c,1.7,.12,1.1,n);for(const[g,_]of[[-.7,0],[.7,0],[0,-.5],[0,.5]])this.box(l+g*.9,.42,c+_,.16,.84,.16,i);this.box(l,.45,c-.95,1.4,.12,.4,i),this.box(l,.45,c+.95,1.4,.12,.4,i),this.box(l-.4,1.06,c,.22,.1,.22,o);const h=new Q(new _e(.16,.13,.22,12),i);h.position.set(l+.35,1.11,c),this.world.add(h);const d=Ta[t].residents.length>=2?[[5,2],[5,4]]:[[5,3]];for(const[g,_]of d)this.wallCell(g,_,[1,0],(m,p)=>{this.box(m,.35,p,.9,.5,1.9,i),this.box(m,.66,p,.86,.16,1.8,o),this.box(m,.78,p-.7,.7,.18,.4,a)});this.wallCell(2,1,[0,-1],(g,_)=>{this.box(g,1.7,_,1.6,.1,.4,n);for(let m=-1;m<=1;m++){const p=new Q(new _e(.12,.1,.28,10),m===0?i:o);p.position.set(g+m*.45,1.9,_),this.world.add(p)}});const u=new Q(new It(2.2,1.6),new ft({color:8010538}));u.rotation.x=-Math.PI/2,u.position.set(3*D,.02,3*D+.2),this.world.add(u);const f=new fn(16769192,5.5,30,2);f.position.set(3*D,3-.4,3*D),this.world.add(f);for(const g of Ta[t].residents)this.addNPC(g.col,g.row,g.seed,g.name,g.lines,g.art,g.scale??1)}buildInterior(t){const n=new ft({map:Oe(5)});this.buildRoomShell(9,2,4864038);const i=$i("N"),r=i.col*D,a=i.row*D+D/2+.2;this.box(r,.55,a,D*2.4,1.1,.7,n),this.box(r,1.12,a,D*2.4+.2,.14,.95,n);const o=Cs[t];this.addNPC(i.col,i.row,o.seed,o.npc,o.lines,Eb[t]);const l=new fn(16766106,4.5,15,2);l.position.set(r,2.5,i.row*D+1.6),this.world.add(l);const c=new fn(16769192,8,34,2);c.position.set(3*D,3-.3,3*D),this.world.add(c),this.box(3*D,3-.25,3*D,.4,.3,.4,new Ae({color:16758874})),t==="tavern"?this.propsTavern():t==="store"?this.propsStore():t==="smith"?this.propsSmith():this.propsAlchemist()}glowLight(t,e,n,i,r,a){const o=new fn(i,r,a,2);o.position.set(t,e,n),this.world.add(o),this.flames.push({light:o,base:r})}wallCell(t,e,n,i){const r=t*D+n[0]*(D/2-.75),a=e*D+n[1]*(D/2-.75);i(r,a),this.blocked.add(`${t},${e}`)}propsTavern(){const t=new ft({map:Oe(5)}),e=new ft({map:In(31)}),n=new ft({map:ma(17)}),i=new ft({color:13279818});this.wallCell(1,3,[-1,0],(r,a)=>{this.box(r,1.1,a,.5,2.2,2.2,e),this.box(r+.4,.6,a,.35,.8,1.2,new Ae({color:16742942})),this.glowLight(r+1.3,1,a,16747054,5,11)}),this.wallCell(1,2,[-1,0],(r,a)=>{const o=new Q(new _e(.5,.44,1.3,14),n);o.position.set(r,.65,a),this.world.add(o)});for(const r of[2,4])this.wallCell(5,r,[1,0],(a,o)=>{this.box(a,.9,o,.2,1,.2,t);const l=new Q(new _e(.8,.8,.15,16),t);l.position.set(a,1.45,o),this.world.add(l);const c=new Q(new _e(.14,.12,.28,10),i);c.position.set(a,1.66,o),this.world.add(c)})}propsStore(){const t=new ft({map:Oe(3)}),e=[9058874,3824266,5208634,11569712,8010362];let n=0;const i=(r,a,o)=>{this.box(r,1.05,a,.5,2.1,2.4,t);for(const l of[.7,1.4])for(const c of[-.7,.7]){const h=new ft({color:e[n++%e.length]});this.box(r-o*.35,l,a+c,.4,.5,.5,h)}};for(const r of[2,3,4])this.wallCell(1,r,[-1,0],(a,o)=>i(a,o,-1));for(const r of[2,3,4])this.wallCell(5,r,[1,0],(a,o)=>i(a,o,1))}propsSmith(){const t=new ft({color:4869716}),e=new ft({map:In(31)}),n=new ft({map:Oe(5)}),i=new ft({map:ma(17)});this.wallCell(1,3,[-1,0],(r,a)=>{this.box(r,1,a,.6,2,2.2,e),this.box(r+.45,1,a,.35,.5,1.2,new Ae({color:16738834})),this.glowLight(r+1.3,1.1,a,16742942,5.5,11)}),this.wallCell(1,4,[-1,0],(r,a)=>{this.box(r,.45,a,.6,.9,.6,n),this.box(r,1.05,a,.5,.35,1,t)}),this.wallCell(1,2,[-1,0],(r,a)=>{const o=new Q(new _e(.5,.44,1.2,14),i);o.position.set(r,.6,a),this.world.add(o)});for(const r of[2,3,4])this.wallCell(5,r,[1,0],(a,o)=>{this.box(a,1,o,.25,2,1.4,n);for(const l of[-.4,.4]){const c=new Q(new fe(.08,1.5,.22),t);c.position.set(a-.2,1.4,o+l),this.world.add(c)}})}propsAlchemist(){const t=new ft({map:Oe(3)}),e=new ft({color:3817028}),n=[4239472,5267648,12599408,12623920,9453760];let i=0;const r=(a,o,l)=>{this.box(a,1.05,o,.5,2.1,2.4,t);for(const c of[.7,1.35,2])for(const h of[-.7,0,.7]){const d=new ft({color:n[i++%n.length]}),u=new Q(new _e(.11,.13,.36,8),d);u.position.set(a-l*.32,c,o+h),this.world.add(u)}};for(const a of[2,3])this.wallCell(1,a,[-1,0],(o,l)=>r(o,l,-1));for(const a of[2,3])this.wallCell(5,a,[1,0],(o,l)=>r(o,l,1));this.wallCell(1,4,[-1,0],(a,o)=>{const l=new Q(new _e(.6,.48,.85,16),e);l.position.set(a,.5,o),this.world.add(l);const c=new Q(new _e(.53,.53,.1,16),new Ae({color:7077792}));c.position.set(a,.92,o),this.world.add(c),this.glowLight(a+.9,1.2,o,5308314,3.2,8)}),this.wallCell(5,4,[1,0],(a,o)=>{this.box(a,.8,o,.9,.15,1.6,t),this.box(a,.98,o+.3,.5,.16,.6,new ft({color:6961706}))})}buildRoofs(t){const e=(i,r)=>t[Math.floor(Math.abs(this.mHash(i,r,9))*997)%t.length],n=(i,r,a,o)=>{if(be(i,r)!=="building")return!1;const l=be(i+a,r+o);return l==="street"||l==="barrel"};for(const i of[1,-1])for(let r=0;r<tn;r++){let a=0;for(;a<He;)if(n(r,a,i,0)){let o=a;for(;o+1<He&&n(r,o+1,i,0);)o++;let l=la;for(let c=a;c<=o;c++)l=Math.min(l,this.depthInto(r,c,-i,0));this.addRoofRun(r,a,r,o,i,0,l,e(r,a)),a=o+1}else a++}for(const i of[1,-1])for(let r=0;r<He;r++){let a=0;for(;a<tn;)if(n(a,r,0,i)){let o=a;for(;o+1<tn&&n(o+1,r,0,i);)o++;let l=la;for(let c=a;c<=o;c++)l=Math.min(l,this.depthInto(c,r,0,-i));this.addRoofRun(a,r,o,r,0,i,l,e(a,r)),a=o+1}else a++}}depthInto(t,e,n,i){let r=0;for(;r<la&&be(t+n*r,e+i*r)==="building";)r++;return Math.max(1,r)}addRoofRun(t,e,n,i,r,a,o,l){const c=Jn-.15,h=Jn+aa,d=new k,u=new k,f=new k,g=new k,_=new k,m=new k;let p,y,v;const x=o*D-D/2;if(r!==0){const C=t*D+r*(D/2)+r*ch,M=t*D-r*x,w=(C+M)/2,P=e*D-D/2,I=i*D+D/2;d.set(C,c,P),u.set(C,c,I),f.set(w,h,P),g.set(w,h,I),_.set(M,c,P),m.set(M,c,I),p=i-e+1,y=Math.abs(C-w)/D+.5,v=Math.abs(w-M)/D+.5}else{const C=e*D+a*(D/2)+a*ch,M=e*D-a*x,w=(C+M)/2,P=t*D-D/2,I=n*D+D/2;d.set(P,c,C),u.set(I,c,C),f.set(P,h,w),g.set(I,h,w),_.set(P,c,M),m.set(I,c,M),p=n-t+1,y=Math.abs(C-w)/D+.5,v=Math.abs(w-M)/D+.5}this.world.add(this.quad(d,u,g,f,l,p,y)),this.world.add(this.quad(f,g,m,_,l,p,v)),this.world.add(this.tri(d,f,_,l)),this.world.add(this.tri(u,m,g,l));const E=d.clone();E.y-=hh;const S=u.clone();S.y-=hh,this.world.add(this.quad(E,S,u,d,l,p,.3))}tri(t,e,n,i){const r=new Se;return r.setAttribute("position",new Ve(new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z]),3)),r.setAttribute("uv",new Ve(new Float32Array([0,0,1,0,.5,1]),2)),r.setIndex([0,1,2]),r.computeVertexNormals(),new Q(r,i)}decalMat(t,e=.35){const n=new ft({transparent:!0,alphaTest:e,side:qt});return n.colorWrite=!1,n.depthWrite=!1,this.loadArt(t,i=>{n.map=i,n.colorWrite=!0,n.depthWrite=!0,n.needsUpdate=!0}),n}addWallDecal(t,e,n,i,r,a,o,l){const c=new Q(new It(a,o),r);return c.position.set(t*D+n*(D/2+.05),l,e*D+i*(D/2+.05)),c.rotation.y=n===1?Math.PI/2:n===-1?-Math.PI/2:i===1?0:Math.PI,c.renderOrder=4,this.world.add(c),c}addDecal(t,e,n,i,r,a){const o=a==="door"?dh:Zx,l=a==="door"?Nr:Kx,c=a==="door"?l/2+.02:Jx,h=new Q(new It(o,l),r),d=t*D+n*(D/2+.04),u=e*D+i*(D/2+.04);h.position.set(d,c,u),n===1?h.rotation.y=Math.PI/2:n===-1?h.rotation.y=-Math.PI/2:i===1?h.rotation.y=0:h.rotation.y=Math.PI,this.world.add(h)}quad(t,e,n,i,r,a=1,o=1){const l=new Se,c=new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z,i.x,i.y,i.z]);return l.setAttribute("position",new Ve(c,3)),l.setAttribute("uv",new Ve(new Float32Array([0,0,a,0,a,o,0,o]),2)),l.setIndex([0,1,2,0,2,3]),l.computeVertexNormals(),new Q(l,r)}onAction(t){if(this.dialogue){t==="interact"&&this.advanceDialogue();return}if(t==="interact"){this.doInteract();return}if(t==="attack"){const o=this.ui.swingWeapon();o>=0&&window.setTimeout(()=>this.tryHitEnemy(),o);return}if(this.anim)return;if(this.location==="showcase"&&this.showIdx>=0){this.showcaseStationMove(t);return}if(t==="turnLeft"||t==="turnRight"){const o=t==="turnLeft"?1:-1;this.facing=(this.facing+(o===1?3:1))%4,this.pushMinimap(),this.anim={kind:"turn",t0:performance.now(),fromY:this.camera.rotation.y,toY:this.camera.rotation.y+Math.PI/2*o};return}let e=this.facing;t==="back"?e=(e+2)%4:t==="strafeLeft"?e=(e+3)%4:t==="strafeRight"&&(e=(e+1)%4);const[n,i]=yn[e],r=this.col+n,a=this.row+i;if(this.location==="showcase"&&av(r,a)){this.enterStairsFromTerrace();return}if(this.location==="dungeon"&&an(r,a)==="sanctuary"&&this.canWalk(r,a)){this.showcaseReturn={loc:"dungeon",col:this.col,row:this.row,facing:this.facing},this.enterLocation("showcase",0,0,0);return}this.canWalk(r,a)&&(this.anim={kind:"move",t0:performance.now(),fromX:this.col*D,fromZ:this.row*D,toX:r*D,toZ:a*D,fromY:this.floorYAt(this.col,this.row),toY:this.floorYAt(r,a)},this.col=r,this.row=a,this.pushMinimap(),this.location==="forest"&&ti(r,a)==="tree"&&this.brushFoliage())}brushFoliage(){const t=this.foliageFx;t&&(t.style.transition="none",t.style.opacity="0.55",t.offsetWidth,t.style.transition="opacity 620ms ease-out",t.style.opacity="0")}updateNpcPhase(t){const e=(t/Fr+Or)%1,n=this.daylight(e);return!this.npcNight&&n<.26?(this.npcNight=!0,this.staggerDepart(t)):this.npcNight&&n>.44&&(this.npcNight=!1,this.staggerDepart(t)),this.npcNight}staggerDepart(t){this.walkers.forEach((e,n)=>{e.waitUntil=Math.max(e.waitUntil,t+n*650)})}wallLean(t,e){const i=[[-1,0],[1,0],[0,-1],[0,1]];for(const[r,a]of i){const o=be(t+r,e+a);if(o==="building"||o==="mountain")return{x:r*1.3,z:a*1.3}}return{x:0,z:0}}nightDoorDir(t){const e=[[-1,0],[1,0],[0,-1],[0,1]];for(const[n,i]of e){const r=t.c+n,a=t.r+i;if(be(r,a)!=="building")continue;const o=`${r},${a},${-n},${-i}`;if(this.doorMap.has(o)||this.homeDoorMap.has(o))return{dc:n,dr:i}}return null}setWalkerOpacity(t,e){const n=t.mesh.material,i=e>=.99?.5:.02;n.alphaTest!==i&&(n.alphaTest=i,n.needsUpdate=!0),n.opacity=e,t.shadow.material.opacity=.55*e,t.tag.material.opacity=e}setWalkerVisible(t,e){t.mesh.visible=e,t.shadow.visible=e,t.tag.visible=e}plazaWalkable(t,e){if(t===Qn.c&&e===Qn.r)return!1;const n=e>=6&&e<=12&&t>=2&&t<=12,i=e>=13&&e<=14&&t>=6&&t<=8;return!n&&!i?!1:ca(t,e)}cellFreeForWalker(t,e,n){if(!this.plazaWalkable(t,e)||t===this.col&&e===this.row)return!1;for(const i of this.walkers)if(i!==n&&!i.inside&&(i.cur.c===t&&i.cur.r===e||i.moving&&i.to.c===t&&i.to.r===e))return!1;return!0}bfsNextStep(t,e){const n=(h,d)=>h+","+d;if(t.c===e.c&&t.r===e.r)return null;const i=new Map;i.set(n(t.c,t.r),null);const r=[t];let a=0;const o=[[0,-1],[1,0],[0,1],[-1,0]];let l=!1;for(;a<r.length;){const h=r[a++];if(h.c===e.c&&h.r===e.r){l=!0;break}for(const[d,u]of o){const f=h.c+d,g=h.r+u,_=n(f,g);i.has(_)||!(f===e.c&&g===e.r)&&!this.plazaWalkable(f,g)||(i.set(_,h),r.push({c:f,r:g}))}}if(!l&&!i.has(n(e.c,e.r)))return null;let c=e;for(let h=0;h<400;h++){const d=i.get(n(c.c,c.r));if(!d)return null;if(d.c===t.c&&d.r===t.r)return c;c=d}return null}updateWalkers(t){if(this.walkers.length===0||this.dialogue)return;const e=900,n=640,i=this.updateNpcPhase(t);for(const r of this.walkers){if(r.trans){const a=Math.min(1,(t-r.trans.t0)/n),o=a*a*(3-2*a),l=r.trans.fromX+(r.trans.toX-r.trans.fromX)*o,c=r.trans.fromZ+(r.trans.toZ-r.trans.fromZ)*o;r.mesh.position.x=l,r.mesh.position.z=c,r.shadow.position.x=l,r.shadow.position.z=c,r.tag.position.x=l,r.tag.position.z=c,this.setWalkerOpacity(r,r.trans.kind==="enter"?1-o:o),a>=1&&(r.trans.kind==="enter"?(r.inside=!0,this.setWalkerVisible(r,!1)):(this.setWalkerOpacity(r,1),r.mesh.position.set(r.toX,r.baseY,r.toZ),r.shadow.position.set(r.toX,.03,r.toZ)),r.trans=null);continue}if(r.inside){if(!i){const a=r.doorDir??this.nightDoorDir(r.nightCell),o=this.wallLean(r.nightCell.c,r.nightCell.r),l=r.nightCell.c*D+o.x,c=r.nightCell.r*D+o.z,h=r.nightCell.c*D+(a?.dc??0)*(D/2+.2),d=r.nightCell.r*D+(a?.dr??0)*(D/2+.2);this.setWalkerVisible(r,!0),this.setWalkerOpacity(r,0),r.mesh.position.set(h,r.baseY,d),r.trans={kind:"exit",t0:t,fromX:h,fromZ:d,toX:l,toZ:c}}continue}if(r.moving){const a=Math.min(1,(t-r.t0)/e),o=a*a*(3-2*a),l=r.fromX+(r.toX-r.fromX)*o,c=r.fromZ+(r.toZ-r.fromZ)*o;r.mesh.position.x=l,r.mesh.position.z=c,r.mesh.position.y=r.baseY+Math.sin(a*Math.PI)*.05,r.shadow.position.x=l,r.shadow.position.z=c,r.tag.position.x=l,r.tag.position.z=c,a>=1&&(r.moving=!1,r.mesh.position.y=r.baseY,r.waitUntil=t+240+(r.cur.c*37+r.cur.r*17)%220)}else if(t>=r.waitUntil){const a=i?r.nightCell:r.dayCell;if(r.cur.c===a.c&&r.cur.r===a.r){if(i&&(r.doorDir===void 0&&(r.doorDir=this.nightDoorDir(r.nightCell)),r.doorDir)){const u=r.nightCell.c*D+r.doorDir.dc*(D/2+.2),f=r.nightCell.r*D+r.doorDir.dr*(D/2+.2);r.trans={kind:"enter",t0:t,fromX:r.mesh.position.x,fromZ:r.mesh.position.z,toX:u,toZ:f};continue}r.waitUntil=t+500;continue}const o=this.bfsNextStep(r.cur,a);if(!o){r.waitUntil=t+500;continue}if(!this.cellFreeForWalker(o.c,o.r,r)){r.waitUntil=t+300;continue}const l=`${o.c},${o.r}`,c=this.npcMap.get(r.key);c&&(this.npcMap.delete(r.key),this.npcMap.set(l,c));const d=o.c===a.c&&o.r===a.r?this.wallLean(o.c,o.r):{x:0,z:0};r.fromX=r.mesh.position.x,r.fromZ=r.mesh.position.z,r.toX=o.c*D+d.x,r.toZ=o.r*D+d.z,r.from={c:r.cur.c,r:r.cur.r},r.to=o,r.cur=o,r.key=l,r.moving=!0,r.t0=t}}}tick(t){this.now=t;const e=this.anim;if(e)if(e.kind==="move"){const c=Math.min(1,(t-e.t0)/Ud),h=c*c*(3-2*c);this.camera.position.x=e.fromX+(e.toX-e.fromX)*h,this.camera.position.z=e.fromZ+(e.toZ-e.fromZ)*h;const d=e.fromY+(e.toY-e.fromY)*h;this.camera.position.y=d+kr+Math.sin(c*Math.PI)*.07,e.fromYaw!==void 0&&e.toYaw!==void 0&&(this.camera.rotation.y=e.fromYaw+(e.toYaw-e.fromYaw)*h),c>=1&&(this.camera.position.y=e.toY+kr,e.toYaw!==void 0&&(this.camera.rotation.y=e.toYaw),this.anim=null)}else{const c=Math.min(1,(t-e.t0)/Qx),h=c*c*(3-2*c);this.camera.rotation.y=e.fromY+(e.toY-e.fromY)*h,c>=1&&(this.anim=null)}const n=this.camera.position.x,i=this.camera.position.z;for(const c of this.npcs){c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z);const h=c.userData;if(h&&h.h){const d=1+Math.sin(t*.0016+h.ph)*.014;c.scale.y=d,c.position.y=h.baseY+(d-1)*h.h/2,c.rotation.z=Math.sin(t*.0011+h.ph*1.7)*.007}}for(const c of this.billboardProps)c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z);if(this.reticle&&this.target&&!this.target.dyingAt){this.reticle.visible=!0;let c=n-this.target.bx,h=i-this.target.bz;const d=Math.hypot(c,h)||1;c/=d,h/=d,this.reticle.position.set(this.target.bx+c*.3,1.35,this.target.bz+h*.3)}else this.reticle&&(this.reticle.visible=!1);const r=this.lastTickMs?Math.min(.1,(t-this.lastTickMs)/1e3):0;this.lastTickMs=t,r>0&&this.playerMp<this.playerMaxMp&&(this.playerMp=Math.min(this.playerMaxMp,this.playerMp+this.playerMaxMp*.03*r+1.5*r),this.ui.setMana(this.playerMp/this.playerMaxMp));const a=!!this.buff&&t<this.buff.until;if(this.buffActive&&!a&&(this.buff=null,this.recomputeDerived()),this.buffActive=a,this.coolingSkills.size)for(const c of this.coolingSkills){const d=(this.cooldownUntil[c]??0)-t;if(d<=0)this.ui.setSkillCooldown(c,0,0),this.coolingSkills.delete(c);else{const u=bl(c).cd;this.ui.setSkillCooldown(c,d/u,Math.ceil(d/1e3))}}const o=this.enemy;if(o){const c=o.mesh.geometry.parameters.height;let h=n-o.bx,d=i-o.bz;const u=Math.hypot(h,d)||1;h/=u,d/=u;let f=0,g=1,_=0,m=0,p=0,y=0;const v=t-o.hitAt;if(o.dyingAt){const x=(t-o.dyingAt)/650;o.mat.opacity=Math.max(0,1-x*3),o.mesh.rotation.z=-x*1.6;const E=Math.max(.12,1-x*.55);if(o.mesh.scale.set(1+x*.35,E,1),o.mesh.position.y=c/2-x*.75,o.bar.visible=!1,x>=1){for(const S of[o.mesh,o.bar]){this.world.remove(S);const A=this.billboardProps.indexOf(S);A>=0&&this.billboardProps.splice(A,1)}o.mesh.geometry.dispose(),o.mat.dispose(),this.enemy=null,window.setTimeout(()=>{this.enemy||(this.location==="village"?this.buildDungeonEnemy():this.location==="dungeon"&&this.spawnDungeonEnemy())},5e3)}}else{const x=Math.abs(this.col-o.c)+Math.abs(this.row-o.r)===1;if(!o.atkAt&&x&&t>=o.nextAtk&&(o.atkAt=t),o.atkAt){const E=(t-o.atkAt)/700;if(E<.4){const S=E/.4;f=-.35*S,g=1-.05*S}else if(E<.6){const S=(E-.4)/.2;f=-.35+1.25*S,g=.95+.27*S}else{const S=(E-.6)/.4;f=.9*(1-S),g=1.22-.22*S}!o.hitApplied&&E>.52&&(o.hitApplied=!0,x&&this.damagePlayer(12)),E>=1&&(o.atkAt=0,o.hitApplied=!1,o.nextAtk=t+1100)}if(v<240){const E=v/240,S=Math.sin((1-E)*Math.PI);f-=S*.6;const A=1-E*.7;m=A,p=A*.2,y=A*.16,_=S*.14}o.mesh.position.set(o.bx+h*f,c/2,o.bz+d*f),o.mesh.scale.set(g,g,1),o.mesh.rotation.z=_}o.mat.emissive.setRGB(m,p,y)}this.updatePoofs(t),this.updateProjectiles(t),this.updateDayNight(t);const l=(t/Fr+Or)%1;if(this.ui.setClock(l,this.daylight(l)),this.gateAnims.length){for(const c of this.gateAnims){const h=Math.min(1,(t-c.t0)/c.dur),d=h*h*(3-2*h);c.pivotL.rotation.y=c.to*d,c.pivotR.rotation.y=-c.to*d}this.gateAnims=this.gateAnims.filter(c=>t-c.t0<c.dur)}for(const c of this.motes){const h=c.pts.geometry.attributes.position,d=h.array;for(let u=0;u<c.sp.length;u++){let f=d[u*3+1]+c.sp[u]*.012;d[u*3]+=Math.sin(t*6e-4+u*1.7)*c.sway,f>c.y1&&(f=c.y0),d[u*3+1]=f}h.needsUpdate=!0}for(const c of this.fogPuffs){const h=t*9e-5;c.s.position.x=c.bx+Math.cos(h+c.ph)*c.rad,c.s.position.z=c.bz+Math.sin(h*.8+c.ph)*c.rad,c.s.position.y=c.by+Math.sin(h*1.1+c.ph)*c.rise;const d=c.s.material;d.rotation+=c.rotSp*.016,d.opacity=c.baseOp*(.6+.4*Math.sin(h*2+c.ph))}this.fogDome&&(this.fogDome.rotation.y=t*2e-5);for(const c of this.flames)c.light.intensity=c.base+Math.sin(t*.011+c.base)*.8+Math.sin(t*.027)*.5;for(const c of this.animTex)c.tex.offset.x=Math.floor(t/1e3*c.fps)%c.frames/c.frames;this.updateWalkers(t);for(const c of this.smoke){const h=c.userData,d=(t*28e-5+h.phase)%4/4,u=d*4.2;c.position.set(h.baseX+Math.sin(t*6e-4+h.phase)*.5,Jn+aa+u,h.baseZ);const f=.6+d*1.6;c.scale.set(f,f,f),c.material.opacity=Math.sin(d*Math.PI)*.42,c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z)}if(this.waterGlint){const c=this.waterGlint.material;c.opacity=.18+(Math.sin(t*.0016)+1)*.11;const h=1+Math.sin(t*.0013+1)*.08;this.waterGlint.scale.set(h,h,h)}this.anim||this.updatePrompt(),this.renderer.render(this.scene,this.camera)}updatePrompt(){const t=this.facingTarget();let e=" ";t&&(t.kind==="enter"?e=`Entrar — ${Cs[t.estab].name}`:t.kind==="enterhome"?e="Entrar na casa":t.kind==="exit"?e="Sair":t.kind==="talk"?e=`Falar com ${t.name}`:t.kind==="dungeon"?e="Descer à masmorra":t.kind==="toforest"?e="Ir para a Floresta":t.kind==="tovillage"?e="Voltar ao Vilarejo":t.kind==="sign"?e="Ler a placa":t.kind==="lockgate"?e="Portão selado":t.kind==="sanctuary"?e="Subir a escadaria":t.kind==="smithshop"&&(e="Ferreiro — Aprimorar")),e!==this.lastPrompt&&(this.lastPrompt=e,this.ui.setPrompt(e===" "?null:e))}facingTarget(){const[t,e]=yn[this.facing],n=this.col+t,i=this.row+e,r=this.npcMap.get(`${n},${i}`);if(r&&this.location==="smith")return{kind:"smithshop"};if(r)return{kind:"talk",name:r.name,lines:r.lines,key:`${n},${i}`};if(this.location==="village"){const a=this.doorMap.get(`${n},${i},${-t},${-e}`);if(a)return{kind:"enter",estab:a};const o=this.homeDoorMap.get(`${n},${i},${-t},${-e}`);if(o)return{kind:"enterhome",id:o};if(be(n,i)==="stairs")return{kind:"dungeon"};if(be(n,i)==="forestgate"||be(this.col,this.row)==="forestgate")return{kind:"toforest"}}else if(this.location==="forest"){const a=ti(n,i);if(a==="gate"||ti(this.col,this.row)==="gate")return{kind:"tovillage"};if(a==="sign")return{kind:"sign",lines:tv(n,i)}}else if(this.location==="dungeon"){if(an(n,i)==="stairs"||an(this.col,this.row)==="stairs")return{kind:"exit"};const a=`${n},${i}`;if(this.gates.has(a))return{kind:"gate",key:a};if(an(n,i)==="lockgate")return{kind:"lockgate"};if(an(n,i)==="sanctuary"||an(this.col,this.row)==="sanctuary")return{kind:"sanctuary"}}else if(this.location==="showcase"){if(this.showIdx===0)return{kind:"exit"}}else if(eo(n,i)==="X"||eo(this.col,this.row)==="X")return{kind:"exit"};return null}resize(){const t=this.container.clientWidth||window.innerWidth,e=this.container.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}};ut(ei,"SMITH_MAX",10),ut(ei,"SKY_KEYS",[[0,1186355],[.2,1581630],[.25,3750234],[.29,13601368],[.37,9542054],[.5,8884384],[.66,9736345],[.72,13464642],[.78,4863560],[.85,2239564],[1,1186355]]),ut(ei,"SMITH_FREE",!0);let Bs=ei;const nM=""+new URL("cluster1-CDwqmovY.png",import.meta.url).href,iM=""+new URL("cluster2-C0czRdHN.png",import.meta.url).href,sM=""+new URL("death_poof-BE-q7e2_.png",import.meta.url).href,rM=""+new URL("dec_banner-UBOZSe9G.png",import.meta.url).href,oM=""+new URL("dec_cracks-DKSsqxx2.png",import.meta.url).href,aM=""+new URL("dec_door-B5wowGxb.png",import.meta.url).href,lM=""+new URL("dec_gate-D08IdObB.png",import.meta.url).href,cM=""+new URL("dec_gate_bars-B6YqUV4L.png",import.meta.url).href,hM=""+new URL("dec_gate_frame-DQaCQl80.png",import.meta.url).href,dM=""+new URL("dec_ivy-D9e2Lu2_.png",import.meta.url).href,uM=""+new URL("dec_torch-CtkBMXz7.png",import.meta.url).href,fM=""+new URL("dec_window-DrwRbTKE.png",import.meta.url).href,pM=""+new URL("enemy_skeleton-BcZFeUKH.png",import.meta.url).href,mM=""+new URL("pine1-Cx-eXiFP.png",import.meta.url).href,gM=""+new URL("pine2-CUzpurmt.png",import.meta.url).href,_M=""+new URL("pine3-SLpwxU-f.png",import.meta.url).href,xM=""+new URL("pine4-D2rjz_P9.png",import.meta.url).href,vM=""+new URL("prop_lamp-D_-YfjKt.png",import.meta.url).href,bM=""+new URL("prop_notice-Bo5C5meg.png",import.meta.url).href,MM=""+new URL("sign_alch-CZuh7kJW.png",import.meta.url).href,wM=""+new URL("sign_smith-B08qmnbc.png",import.meta.url).href,yM=""+new URL("sign_store-C8OmR8-U.png",import.meta.url).href,SM=""+new URL("sign_tavern-DPGpN59J.png",import.meta.url).href,TM=""+new URL("sword-Cnq9dXJw.png",import.meta.url).href,EM=""+new URL("sword_atk-BUeBP5dr.png",import.meta.url).href,AM=""+new URL("tex_caveceil-Dh6eDyCo.jpg",import.meta.url).href,RM=""+new URL("tex_cavefloor-CIzR_jPs.jpg",import.meta.url).href,CM=""+new URL("tex_cavewall-DQwg9sDl.jpg",import.meta.url).href,LM=""+new URL("tex_cobble-DXMPAwZE.jpg",import.meta.url).href,PM=""+new URL("tex_dirt-BHcbB_Wz.jpg",import.meta.url).href,UM=""+new URL("tex_grass-C2Q1l28q.jpg",import.meta.url).href,DM=""+new URL("tex_mosswall-DpaqdZvP.jpg",import.meta.url).href,IM=""+new URL("tex_stonewall-BFmowWy6.jpg",import.meta.url).href,kM=""+new URL("tex_thatch-DdJMnyvF.jpg",import.meta.url).href,NM=""+new URL("tex_wood-B0jCHZZA.jpg",import.meta.url).href,FM=""+new URL("wpn_axe-CvCTYMUq.png",import.meta.url).href,OM=""+new URL("wpn_dagger-BBXQkEIm.png",import.meta.url).href,zM=""+new URL("wpn_greatsword-C2mQEgxH.png",import.meta.url).href,BM=""+new URL("wpn_mace-tTLR-MzC.png",import.meta.url).href,HM=""+new URL("wpn_maul-DbliXABw.png",import.meta.url).href,GM=""+new URL("wpn_orb-BsomjHDA.png",import.meta.url).href,VM=""+new URL("wpn_rapier-dNk4ndjW.png",import.meta.url).href,WM=""+new URL("wpn_shield-Bw_-3z5v.png",import.meta.url).href,XM=""+new URL("wpn_staff-DGpAnpDH.png",import.meta.url).href,qM=""+new URL("wpn_sword-CpsgndpE.png",import.meta.url).href,$M=""+new URL("alquimista-ssXsgGLn.png",import.meta.url).href,YM=""+new URL("anselmo-a5GEbqfY.png",import.meta.url).href,jM=""+new URL("camponesa-CrL0OA2Y.png",import.meta.url).href,ZM=""+new URL("costureira-Br8zMBee.png",import.meta.url).href,KM=""+new URL("fazendeiro-CLjUAd1g.png",import.meta.url).href,JM=""+new URL("ferreiro-BdN9Klhc.png",import.meta.url).href,QM=""+new URL("gunther-D_2fJfLI.png",import.meta.url).href,tw=""+new URL("hedda-Buaz2cmx.png",import.meta.url).href,ew=""+new URL("lenhador-B54mx8Mi.png",import.meta.url).href,nw=""+new URL("lyle-gu11Pcfp.png",import.meta.url).href,iw=""+new URL("mercadora-B8RulStP.png",import.meta.url).href,sw=""+new URL("pip-rEDWa-7w.png",import.meta.url).href,rw=""+new URL("tam-BlgWIVim.png",import.meta.url).href,ow=""+new URL("taverneiro-Ba4UKFJq.png",import.meta.url).href,aw=""+new URL("wilma-DI_QNtI6.png",import.meta.url).href,lw=""+new URL("btn_base-wlebnyD3.png",import.meta.url).href,cw=""+new URL("class_clerigo-Bv6kp9nE.png",import.meta.url).href,hw=""+new URL("class_guerreiro-DQxwW6XE.png",import.meta.url).href,dw=""+new URL("class_icon_clerigo-DoeXMn4k.png",import.meta.url).href,uw=""+new URL("class_icon_guerreiro-C0eBl5F1.png",import.meta.url).href,fw=""+new URL("class_icon_ladino-D8WBB-2i.png",import.meta.url).href,pw=""+new URL("class_icon_mago-CqEgdtDo.png",import.meta.url).href,mw=""+new URL("class_ladino-CBY8tWR5.png",import.meta.url).href,gw=""+new URL("class_mago-BCWgBU8E.png",import.meta.url).href,_w=""+new URL("clock_moon-D1xrN5yT.png",import.meta.url).href,xw=""+new URL("clock_sun-DO5hSXa1.png",import.meta.url).href,vw=""+new URL("coin-CsF22FSK.png",import.meta.url).href,bw=""+new URL("create_bg-B2uN_HVG.png",import.meta.url).href,Mw=""+new URL("dpad-3wZIZEqb.png",import.meta.url).href,ww=""+new URL("eq_container-84uusXC9.png",import.meta.url).href,yw=""+new URL("eq_frame-d-QhyRgX.png",import.meta.url).href,Sw=""+new URL("eq_slot-DS9kMsLx.png",import.meta.url).href,Tw=""+new URL("fx_corrente-CI-yrk7e.png",import.meta.url).href,Ew=""+new URL("fx_descarga-IY9gTcyD.png",import.meta.url).href,Aw=""+new URL("fx_fireball-CNUxOMXZ.png",import.meta.url).href,Rw=""+new URL("fx_ice-DGJxZKsy.png",import.meta.url).href,Cw=""+new URL("fx_ice_lance-DCxKutbL.png",import.meta.url).href,Lw=""+new URL("fx_imolacao-C-a5dtuo.png",import.meta.url).href,Pw=""+new URL("fx_l_apunhalar-BRQuzQIj.png",import.meta.url).href,Uw=""+new URL("fx_l_arremesso-rtDW0ow6.png",import.meta.url).href,Dw=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,Iw=""+new URL("fx_l_dupla-C6r_wn6L.png",import.meta.url).href,kw=""+new URL("fx_l_estocada-hJYwlzLR.png",import.meta.url).href,Nw=""+new URL("fx_l_mortal-DuYG-M3q.png",import.meta.url).href,Fw=""+new URL("fx_l_nuvem-B2qmk_tl.png",import.meta.url).href,Ow=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,zw=""+new URL("fx_l_sombras-fe3usKIe.png",import.meta.url).href,Bw=""+new URL("fx_l_toxina-Bu3f7mn-.png",import.meta.url).href,Hw=""+new URL("fx_meteoro-DywgnSdp.png",import.meta.url).href,Gw=""+new URL("fx_muralha-yiXxe2Yc.png",import.meta.url).href,Vw=""+new URL("fx_prisao-BDhoA-oK.png",import.meta.url).href,Ww=""+new URL("fx_ray-BukWo5qE.png",import.meta.url).href,Xw=""+new URL("fx_tempestade-DS9uv2Z_.png",import.meta.url).href,qw=""+new URL("hud_plate-B2ygb4FP.png",import.meta.url).href,$w=""+new URL("ico_action-BRbeFgHL.png",import.meta.url).href,Yw=""+new URL("ico_attack-CbdvrLXs.png",import.meta.url).href,jw=""+new URL("ico_inventory-B_-_sjLB.png",import.meta.url).href,Zw=""+new URL("load_sword-Bhnb8m09.png",import.meta.url).href,Kw=""+new URL("logo_plate-CK0-uVl1.png",import.meta.url).href,Jw=""+new URL("map_frame-B4piWonF.png",import.meta.url).href,Qw=""+new URL("menu_plate-_kr3JKFU.png",import.meta.url).href,ty=""+new URL("bg_clerigo-BUhJVnRj.jpg",import.meta.url).href,ey=""+new URL("bg_guerreiro-DWgmGaUG.jpg",import.meta.url).href,ny=""+new URL("bg_ladino-B6L4a-g-.jpg",import.meta.url).href,iy=""+new URL("bg_mago-Bct2J94D.jpg",import.meta.url).href,sy=""+new URL("title_bg-DAPsvtIp.png",import.meta.url).href,ry=""+new URL("title_bg-DAPsvtIp.png",import.meta.url).href,oy=""+new URL("create_bg-B2uN_HVG.png",import.meta.url).href,ay=""+new URL("menu_plate-_kr3JKFU.png",import.meta.url).href,ly=""+new URL("logo_plate-CK0-uVl1.png",import.meta.url).href,cy=""+new URL("class_icon_guerreiro-C0eBl5F1.png",import.meta.url).href,hy=""+new URL("class_icon_ladino-D8WBB-2i.png",import.meta.url).href,dy=""+new URL("class_icon_mago-CqEgdtDo.png",import.meta.url).href,uy=""+new URL("class_icon_clerigo-DoeXMn4k.png",import.meta.url).href,fy=ry,Zl={guerreiro:cy,ladino:hy,mago:dy,clerigo:uy};function py(s){return My(),new Promise(t=>{const e=document.createElement("div");e.id="gh-intro",s.appendChild(e);const n=o=>{e.remove(),t(o)},i=(o,l)=>gy(e,o,l,n,()=>Vh(e,i,o.id,l));let r=0;const a=by(vy(),o=>r=o);xy(e,()=>r,a,900,()=>my(e,()=>Vh(e,i)))})}function my(s,t){s.innerHTML=`
    <div class="gh-screen gh-title"${` style="background-image:url(${fy})"`}>
      <div class="gh-veil"></div>
      <div class="gh-title-inner">
        <img class="gh-logo-img" src="${ly}" alt="Nethergloam" />
        <div class="gh-flourish"><svg viewBox="0 0 260 14" preserveAspectRatio="xMidYMid meet"><g fill="#c9a24a"><circle cx="7" cy="7" r="2.6"/><rect x="15" y="6.1" width="97" height="1.8" rx="0.9"/><path d="M130 1 L138 7 L130 13 L122 7 Z"/><rect x="148" y="6.1" width="97" height="1.8" rx="0.9"/><circle cx="253" cy="7" r="2.6"/></g></svg></div>
        <p class="gh-tagline">Desça ao Nethergloam. As trevas aguardam.</p>
      </div>
      <div class="gh-menu">
        <button class="gh-menu-btn" id="gh-btn-new">Novo Jogo</button>
        <button class="gh-menu-btn gh-disabled" disabled title="Em breve">Continuar</button>
      </div>
    </div>`,s.querySelector("#gh-btn-new").addEventListener("click",t)}function Vh(s,t,e,n){let i=e&&yl[e]||zs[0];s.innerHTML=`
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Crie seu Herói</h2>
      <div class="gh-class-tabs">
        ${zs.map(h=>`<button class="gh-class-tab${h.id===i.id?" on":""}" data-id="${h.id}"><img class="gh-tab-ico" src="${Zl[h.id]}" alt=""/><span>${h.name}</span></button>`).join("")}
      </div>
      <div class="gh-class-main" id="gh-class-main"></div>
      <div class="gh-create-foot">
        <input class="gh-name-input" id="gh-name" maxlength="18" placeholder="Nome do herói" value="${n?n.replace(/"/g,"&quot;"):""}" />
        <button class="gh-menu-btn" id="gh-btn-start">Continuar ▸</button>
      </div>
    </div>`;const r=s.querySelector("#gh-class-main"),a=h=>r.innerHTML=io(h);a(i);const o=()=>{r.style.minHeight="0";let h=0;for(const d of zs)r.innerHTML=io(d),h=Math.max(h,r.getBoundingClientRect().height);r.innerHTML=io(i),r.style.minHeight=Math.ceil(h)+"px"};o();const l=document.fonts;l?.ready&&l.ready.then(()=>{r.isConnected&&o()});const c=()=>{r.isConnected&&o()};window.addEventListener("resize",c),s.querySelectorAll(".gh-class-tab").forEach(h=>h.addEventListener("click",()=>{s.querySelectorAll(".gh-class-tab").forEach(d=>d.classList.toggle("on",d===h)),i=yl[h.dataset.id],a(i)})),s.querySelector("#gh-btn-start").addEventListener("click",()=>{const d=s.querySelector("#gh-name").value.trim()||"Herói";window.removeEventListener("resize",c),t(i,d)})}function gy(s,t,e,n,i){const r={...t.attr},a={...t.attr};s.innerHTML=`
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Distribua os Atributos</h2>
      <div class="gh-class-main" id="gh-alloc-main"></div>
      <div class="gh-create-foot">
        <button class="gh-menu-btn gh-menu-btn-sec" id="gh-back">◂ Voltar</button>
        <button class="gh-menu-btn" id="gh-start">Iniciar Jornada ▸</button>
      </div>
    </div>`;const o=s.querySelector("#gh-alloc-main"),l=()=>a.str-r.str+(a.dex-r.dex)+(a.int-r.int),c=()=>{o.innerHTML=_y(t,a,r,Fh-l()),o.querySelectorAll(".gh-pm").forEach(f=>f.addEventListener("click",()=>{const g=f.dataset.k,_=Number(f.dataset.d);_<0&&a[g]<=r[g]||_>0&&l()>=Fh||(a[g]+=_,c())}))},h=()=>{const f=o.getBoundingClientRect().width,g=document.createElement("div");g.className="gh-class-main",g.style.cssText=`position:absolute; left:-9999px; top:0; visibility:hidden; pointer-events:none; height:auto; width:${f}px;`,o.parentElement.appendChild(g);let _=0;for(const m of zs)g.innerHTML=io(m),_=Math.max(_,g.getBoundingClientRect().height);g.remove(),o.style.height=Math.ceil(_)+"px",c()};h();const d=document.fonts;d?.ready&&d.ready.then(()=>{o.isConnected&&h()});const u=()=>{o.isConnected&&h()};window.addEventListener("resize",u),s.querySelector("#gh-back").addEventListener("click",()=>{window.removeEventListener("resize",u),i()}),s.querySelector("#gh-start").addEventListener("click",()=>{window.removeEventListener("resize",u),n({name:e,classId:t.id,attr:{...a}})})}function _y(s,t,e,n){const i=s.portrait?`<img class="gh-class-portrait" src="${s.portrait}" alt="" />`:`<div class="gh-class-ph"><div class="gh-ph-emoji">${s.emoji}</div></div>`,r=no(t,s.hp,s.mp),a=(l,c)=>{const h=t[c],d=h-e[c],u=h<=e[c]?" disabled":"",f=n<=0?" disabled":"";return`<div class="gh-prim-row">
      <span class="gh-prim-name">${l}</span>
      <span class="gh-prim-step">
        <button class="gh-pm" data-k="${c}" data-d="-1"${u}>−</button>
        <b class="gh-prim-val">${h}${d?`<i class="gh-prim-up">+${d}</i>`:""}</b>
        <button class="gh-pm" data-k="${c}" data-d="1"${f}>＋</button>
      </span>
    </div>`},o=(l,c)=>`<div class="gh-sec-row"><span>${l}</span><b>${c}</b></div>`;return`
    <div class="gh-class-art">${i}</div>
    <div class="gh-class-info gh-alloc">
      <div class="gh-class-name"><img class="gh-name-ico" src="${Zl[s.id]}" alt=""/>${s.name}</div>
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
    </div>`}function io(s){const t=s.portrait?`<img class="gh-class-portrait" src="${s.portrait}" alt="" />`:`<div class="gh-class-ph"><div class="gh-ph-emoji">${s.emoji}</div><div class="gh-ph-txt">arte em breve</div></div>`,e=(i,r)=>`<div class="gh-attr"><span>${i}</span><div class="gh-attr-bar"><i style="width:${r*10}%"></i></div><b>${r}</b></div>`,n=s.weapons.map(i=>zv[i]?.name).filter(Boolean).join(" · ");return`
    <div class="gh-class-art">${t}</div>
    <div class="gh-class-info">
      <div class="gh-class-name"><img class="gh-name-ico" src="${Zl[s.id]}" alt=""/>${s.name}</div>
      <div class="gh-class-tag">${s.tag}</div>
      <p class="gh-class-desc">${s.desc}</p>
      <div class="gh-attrs">
        ${e("Força",s.attr.str)}
        ${e("Destreza",s.attr.dex)}
        ${e("Inteligência",s.attr.int)}
      </div>
      <div class="gh-vitals"><span>❤ Vida ${s.hp}</span><span>✦ Mana ${s.mp}</span></div>
      <div class="gh-class-weapons"><b>Armas:</b> ${n}</div>
    </div>`}function xy(s,t,e,n,i){s.innerHTML=`
    <div class="gh-screen gh-boot">
      <div class="gh-boot-corner">
        <div class="gh-boot-sword" id="gh-boot-sword" style="--p:0%">
          <img class="gh-bs-base" src="${Ti}" alt="" />
          <div class="gh-bs-fill"><div class="gh-bs-lava"></div></div>
        </div>
        <div class="gh-boot-txt" id="gh-boot-txt">Forjando o mundo… 0%</div>
      </div>
    </div>`;const r=s.querySelector("#gh-boot-sword"),a=s.querySelector("#gh-boot-txt"),o=performance.now();let l=0;const c=()=>{const h=Math.round(t()*100);r.style.setProperty("--p",h+"%"),a.textContent=`Forjando o mundo… ${h}%`,l=requestAnimationFrame(c)};c(),e.then(async()=>{const h=performance.now()-o;h<n&&await new Promise(d=>setTimeout(d,n-h)),cancelAnimationFrame(l),r.style.setProperty("--p","100%"),a.textContent="Pronto",await new Promise(d=>setTimeout(d,160)),i()})}function vy(){const s=Object.assign({"../assets/env/cluster1.png":nM,"../assets/env/cluster2.png":iM,"../assets/env/death_poof.png":sM,"../assets/env/dec_banner.png":rM,"../assets/env/dec_cracks.png":oM,"../assets/env/dec_door.png":aM,"../assets/env/dec_gate.png":lM,"../assets/env/dec_gate_bars.png":cM,"../assets/env/dec_gate_frame.png":hM,"../assets/env/dec_ivy.png":dM,"../assets/env/dec_torch.png":uM,"../assets/env/dec_window.png":fM,"../assets/env/enemy_skeleton.png":pM,"../assets/env/pine1.png":mM,"../assets/env/pine2.png":gM,"../assets/env/pine3.png":_M,"../assets/env/pine4.png":xM,"../assets/env/prop_lamp.png":vM,"../assets/env/prop_notice.png":bM,"../assets/env/sign_alch.png":MM,"../assets/env/sign_smith.png":wM,"../assets/env/sign_store.png":yM,"../assets/env/sign_tavern.png":SM,"../assets/env/sword.png":TM,"../assets/env/sword_atk.png":EM,"../assets/env/tex_caveceil.jpg":AM,"../assets/env/tex_cavefloor.jpg":RM,"../assets/env/tex_cavewall.jpg":CM,"../assets/env/tex_cobble.jpg":LM,"../assets/env/tex_dirt.jpg":PM,"../assets/env/tex_grass.jpg":UM,"../assets/env/tex_mosswall.jpg":DM,"../assets/env/tex_stonewall.jpg":IM,"../assets/env/tex_thatch.jpg":kM,"../assets/env/tex_wood.jpg":NM,"../assets/env/wpn_axe.png":FM,"../assets/env/wpn_dagger.png":OM,"../assets/env/wpn_greatsword.png":zM,"../assets/env/wpn_mace.png":BM,"../assets/env/wpn_maul.png":HM,"../assets/env/wpn_orb.png":GM,"../assets/env/wpn_rapier.png":VM,"../assets/env/wpn_shield.png":WM,"../assets/env/wpn_staff.png":XM,"../assets/env/wpn_sword.png":qM,"../assets/npc/alquimista.png":$M,"../assets/npc/anselmo.png":YM,"../assets/npc/camponesa.png":jM,"../assets/npc/costureira.png":ZM,"../assets/npc/fazendeiro.png":KM,"../assets/npc/ferreiro.png":JM,"../assets/npc/gunther.png":QM,"../assets/npc/hedda.png":tw,"../assets/npc/lenhador.png":ew,"../assets/npc/lyle.png":nw,"../assets/npc/mercadora.png":iw,"../assets/npc/pip.png":sw,"../assets/npc/tam.png":rw,"../assets/npc/taverneiro.png":ow,"../assets/npc/wilma.png":aw,"../assets/ui/btn_base.png":lw,"../assets/ui/class_clerigo.png":cw,"../assets/ui/class_guerreiro.png":hw,"../assets/ui/class_icon_clerigo.png":dw,"../assets/ui/class_icon_guerreiro.png":uw,"../assets/ui/class_icon_ladino.png":fw,"../assets/ui/class_icon_mago.png":pw,"../assets/ui/class_ladino.png":mw,"../assets/ui/class_mago.png":gw,"../assets/ui/clock_moon.png":_w,"../assets/ui/clock_sun.png":xw,"../assets/ui/coin.png":vw,"../assets/ui/create_bg.png":bw,"../assets/ui/dpad.png":Mw,"../assets/ui/eq_container.png":ww,"../assets/ui/eq_frame.png":yw,"../assets/ui/eq_slot.png":Sw,"../assets/ui/fx/fx_corrente.png":Tw,"../assets/ui/fx/fx_descarga.png":Ew,"../assets/ui/fx/fx_fireball.png":Aw,"../assets/ui/fx/fx_ice.png":Rw,"../assets/ui/fx/fx_ice_lance.png":Cw,"../assets/ui/fx/fx_imolacao.png":Lw,"../assets/ui/fx/fx_l_apunhalar.png":Pw,"../assets/ui/fx/fx_l_arremesso.png":Uw,"../assets/ui/fx/fx_l_danca.png":Dw,"../assets/ui/fx/fx_l_dupla.png":Iw,"../assets/ui/fx/fx_l_estocada.png":kw,"../assets/ui/fx/fx_l_mortal.png":Nw,"../assets/ui/fx/fx_l_nuvem.png":Fw,"../assets/ui/fx/fx_l_rajada.png":Ow,"../assets/ui/fx/fx_l_sombras.png":zw,"../assets/ui/fx/fx_l_toxina.png":Bw,"../assets/ui/fx/fx_meteoro.png":Hw,"../assets/ui/fx/fx_muralha.png":Gw,"../assets/ui/fx/fx_prisao.png":Vw,"../assets/ui/fx/fx_ray.png":Ww,"../assets/ui/fx/fx_tempestade.png":Xw,"../assets/ui/hud_plate.png":qw,"../assets/ui/ico_action.png":$w,"../assets/ui/ico_attack.png":Yw,"../assets/ui/ico_inventory.png":jw,"../assets/ui/load_sword.png":Zw,"../assets/ui/logo_plate.png":Kw,"../assets/ui/map_frame.png":Jw,"../assets/ui/menu_plate.png":Qw,"../assets/ui/skills/bg_clerigo.jpg":ty,"../assets/ui/skills/bg_guerreiro.jpg":ey,"../assets/ui/skills/bg_ladino.jpg":ny,"../assets/ui/skills/bg_mago.jpg":iy,"../assets/ui/skills/sk_clerigo_01.png":Dd,"../assets/ui/skills/sk_clerigo_02.png":Id,"../assets/ui/skills/sk_clerigo_03.png":kd,"../assets/ui/skills/sk_clerigo_04.png":Nd,"../assets/ui/skills/sk_clerigo_05.png":Fd,"../assets/ui/skills/sk_clerigo_06.png":Od,"../assets/ui/skills/sk_clerigo_07.png":zd,"../assets/ui/skills/sk_clerigo_08.png":Bd,"../assets/ui/skills/sk_clerigo_09.png":Hd,"../assets/ui/skills/sk_clerigo_10.png":Gd,"../assets/ui/skills/sk_clerigo_11.png":Vd,"../assets/ui/skills/sk_clerigo_12.png":Wd,"../assets/ui/skills/sk_clerigo_13.png":Xd,"../assets/ui/skills/sk_clerigo_14.png":qd,"../assets/ui/skills/sk_clerigo_15.png":$d,"../assets/ui/skills/sk_guerreiro_01.png":Yd,"../assets/ui/skills/sk_guerreiro_02.png":jd,"../assets/ui/skills/sk_guerreiro_03.png":Zd,"../assets/ui/skills/sk_guerreiro_04.png":Kd,"../assets/ui/skills/sk_guerreiro_05.png":Jd,"../assets/ui/skills/sk_guerreiro_06.png":Qd,"../assets/ui/skills/sk_guerreiro_07.png":tu,"../assets/ui/skills/sk_guerreiro_08.png":eu,"../assets/ui/skills/sk_guerreiro_09.png":nu,"../assets/ui/skills/sk_guerreiro_10.png":iu,"../assets/ui/skills/sk_guerreiro_11.png":su,"../assets/ui/skills/sk_guerreiro_12.png":ru,"../assets/ui/skills/sk_guerreiro_13.png":ou,"../assets/ui/skills/sk_guerreiro_14.png":au,"../assets/ui/skills/sk_guerreiro_15.png":lu,"../assets/ui/skills/sk_ladino_01.png":cu,"../assets/ui/skills/sk_ladino_02.png":hu,"../assets/ui/skills/sk_ladino_03.png":du,"../assets/ui/skills/sk_ladino_04.png":uu,"../assets/ui/skills/sk_ladino_05.png":fu,"../assets/ui/skills/sk_ladino_06.png":pu,"../assets/ui/skills/sk_ladino_07.png":mu,"../assets/ui/skills/sk_ladino_08.png":gu,"../assets/ui/skills/sk_ladino_09.png":_u,"../assets/ui/skills/sk_ladino_10.png":xu,"../assets/ui/skills/sk_ladino_11.png":vu,"../assets/ui/skills/sk_ladino_12.png":bu,"../assets/ui/skills/sk_ladino_13.png":Mu,"../assets/ui/skills/sk_ladino_14.png":wu,"../assets/ui/skills/sk_ladino_15.png":yu,"../assets/ui/skills/sk_mago_01.png":Su,"../assets/ui/skills/sk_mago_02.png":Tu,"../assets/ui/skills/sk_mago_03.png":Eu,"../assets/ui/skills/sk_mago_04.png":Au,"../assets/ui/skills/sk_mago_05.png":Ru,"../assets/ui/skills/sk_mago_06.png":Cu,"../assets/ui/skills/sk_mago_07.png":Lu,"../assets/ui/skills/sk_mago_08.png":Pu,"../assets/ui/skills/sk_mago_09.png":Uu,"../assets/ui/skills/sk_mago_10.png":Du,"../assets/ui/skills/sk_mago_11.png":Iu,"../assets/ui/skills/sk_mago_12.png":ku,"../assets/ui/skills/sk_mago_13.png":Nu,"../assets/ui/skills/sk_mago_14.png":Fu,"../assets/ui/skills/sk_mago_15.png":Ou,"../assets/ui/skills/sk_passive_01.png":zu,"../assets/ui/skills/sk_passive_02.png":Bu,"../assets/ui/skills/sk_passive_03.png":Hu,"../assets/ui/skills/sk_passive_04.png":Gu,"../assets/ui/skills/sk_passive_05.png":Vu,"../assets/ui/skills/sk_passive_06.png":Wu,"../assets/ui/skills/sk_passive_07.png":Xu,"../assets/ui/skills/sk_passive_08.png":qu,"../assets/ui/skills/sk_passive_09.png":$u,"../assets/ui/skills/sk_passive_10.png":Yu,"../assets/ui/skills/sk_passive_11.png":ju,"../assets/ui/skills/sk_passive_12.png":Zu,"../assets/ui/skills/sk_passive_13.png":Ku,"../assets/ui/skills/sk_passive_14.png":Ju,"../assets/ui/skills/sk_passive_15.png":Qu,"../assets/ui/skills/sk_passive_16.png":tf,"../assets/ui/title_bg.png":sy});return Array.from(new Set(Object.values(s)))}async function by(s,t){if(s.length===0){t(1);return}let e=0;await Promise.all(s.map(n=>new Promise(i=>{const r=new Image,a=()=>{e++,t(e/s.length),i()};r.onload=a,r.onerror=a,r.src=n})))}function My(){if(document.getElementById("gh-intro-style"))return;const s=document.createElement("style");s.id="gh-intro-style",s.textContent=`
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
    border-image:url(${ay}) 150 165 fill;
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
    background:#0a0b10 center/cover no-repeat; background-image:url(${oy});
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
    border:clamp(16px,3vw,24px) solid transparent; border-image:url(${ef}) 88 fill;
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
    -webkit-mask:url(${Ti}) left center / 100% 100% no-repeat;
    mask:url(${Ti}) left center / 100% 100% no-repeat;
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
  `,document.head.appendChild(s)}document.documentElement.dataset.ghBuild="2026-07-25c";const $r=document.getElementById("app"),Wh=new URLSearchParams(location.search);Wh.has("show")?new Bs($r,{name:"Test",classId:"mago"},"showcase"):Wh.has("test")?new Bs($r,{name:"Test",classId:"mago"}):py($r).then(s=>{new Bs($r,s)});
