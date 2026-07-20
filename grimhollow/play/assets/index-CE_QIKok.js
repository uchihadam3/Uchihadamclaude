var Nc=Object.defineProperty;var Fc=(r,t,e)=>t in r?Nc(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var Lt=(r,t,e)=>Fc(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ka="170",Oc=0,wo=1,Bc=2,Yl=1,zc=2,xn=3,On=0,De=1,$t=2,In=0,wi=1,na=2,To=3,Eo=4,kc=5,jn=100,Hc=101,Gc=102,Vc=103,Wc=104,Xc=200,qc=201,$c=202,Yc=203,ia=204,ra=205,jc=206,Zc=207,Kc=208,Jc=209,Qc=210,th=211,eh=212,nh=213,ih=214,sa=0,aa=1,oa=2,Ai=3,la=4,ca=5,ha=6,da=7,Qr=0,rh=1,sh=2,Nn=0,ah=1,oh=2,lh=3,ch=4,hh=5,dh=6,uh=7,jl=300,Ri=301,Ci=302,ua=303,fa=304,ts=306,Ki=1e3,tn=1001,pa=1002,rn=1003,fh=1004,lr=1005,ze=1006,as=1007,en=1008,yn=1009,Zl=1010,Kl=1011,Ji=1012,Ja=1013,Kn=1014,vn=1015,er=1016,Qa=1017,to=1018,Pi=1020,Jl=35902,Ql=1021,tc=1022,nn=1023,ec=1024,nc=1025,Ti=1026,Li=1027,ic=1028,eo=1029,rc=1030,no=1031,io=1033,kr=33776,Hr=33777,Gr=33778,Vr=33779,ma=35840,ga=35841,_a=35842,xa=35843,va=36196,Ma=37492,ba=37496,ya=37808,Sa=37809,wa=37810,Ta=37811,Ea=37812,Aa=37813,Ra=37814,Ca=37815,Pa=37816,La=37817,Ua=37818,Da=37819,Ia=37820,Na=37821,Wr=36492,Fa=36494,Oa=36495,sc=36283,Ba=36284,za=36285,ka=36286,ph=3200,mh=3201,ro=0,gh=1,Dn="",ye="srgb",Di="srgb-linear",es="linear",ee="srgb",ei=7680,Ao=519,_h=512,xh=513,vh=514,ac=515,Mh=516,bh=517,yh=518,Sh=519,Ha=35044,Ro="300 es",Mn=2e3,jr=2001;class Ii{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Ee=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],os=Math.PI/180,Ga=180/Math.PI;function Fn(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ee[r&255]+Ee[r>>8&255]+Ee[r>>16&255]+Ee[r>>24&255]+"-"+Ee[t&255]+Ee[t>>8&255]+"-"+Ee[t>>16&15|64]+Ee[t>>24&255]+"-"+Ee[e&63|128]+Ee[e>>8&255]+"-"+Ee[e>>16&255]+Ee[e>>24&255]+Ee[n&255]+Ee[n>>8&255]+Ee[n>>16&255]+Ee[n>>24&255]).toLowerCase()}function Be(r,t,e){return Math.max(t,Math.min(e,r))}function wh(r,t){return(r%t+t)%t}function ls(r,t,e){return(1-e)*r+e*t}function ln(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ne(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Dt{constructor(t=0,e=0){Dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kt{constructor(t,e,n,i,s,o,a,l,c){kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],b=i[1],y=i[4],v=i[7],E=i[2],w=i[5],R=i[8];return s[0]=o*_+a*b+l*E,s[3]=o*m+a*y+l*w,s[6]=o*f+a*v+l*R,s[1]=c*_+h*b+d*E,s[4]=c*m+h*y+d*w,s[7]=c*f+h*v+d*R,s[2]=u*_+p*b+g*E,s[5]=u*m+p*y+g*w,s[8]=u*f+p*v+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*s,p=c*s-o*l,g=e*d+n*u+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*s-a*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(cs.makeScale(t,e)),this}rotate(t){return this.premultiply(cs.makeRotation(-t)),this}translate(t,e){return this.premultiply(cs.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const cs=new kt;function oc(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Qi(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Th(){const r=Qi("canvas");return r.style.display="block",r}const Co={};function Yi(r){r in Co||(Co[r]=!0,console.warn(r))}function Eh(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function Ah(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Rh(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const jt={enabled:!0,workingColorSpace:Di,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ee&&(r.r=bn(r.r),r.g=bn(r.g),r.b=bn(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ee&&(r.r=Ei(r.r),r.g=Ei(r.g),r.b=Ei(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Dn?es:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function bn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ei(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Po=[.64,.33,.3,.6,.15,.06],Lo=[.2126,.7152,.0722],Uo=[.3127,.329],Do=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Io=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[Di]:{primaries:Po,whitePoint:Uo,transfer:es,toXYZ:Do,fromXYZ:Io,luminanceCoefficients:Lo,workingColorSpaceConfig:{unpackColorSpace:ye},outputColorSpaceConfig:{drawingBufferColorSpace:ye}},[ye]:{primaries:Po,whitePoint:Uo,transfer:ee,toXYZ:Do,fromXYZ:Io,luminanceCoefficients:Lo,outputColorSpaceConfig:{drawingBufferColorSpace:ye}}});let ni;class Ch{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ni===void 0&&(ni=Qi("canvas")),ni.width=t.width,ni.height=t.height;const n=ni.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ni}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Qi("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=bn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(bn(e[n]/255)*255):e[n]=bn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ph=0;class lc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ph++}),this.uuid=Fn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(hs(i[o].image)):s.push(hs(i[o]))}else s=hs(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function hs(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ch.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Lh=0;class Re extends Ii{constructor(t=Re.DEFAULT_IMAGE,e=Re.DEFAULT_MAPPING,n=tn,i=tn,s=ze,o=en,a=nn,l=yn,c=Re.DEFAULT_ANISOTROPY,h=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lh++}),this.uuid=Fn(),this.name="",this.source=new lc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==jl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ki:t.x=t.x-Math.floor(t.x);break;case tn:t.x=t.x<0?0:1;break;case pa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ki:t.y=t.y-Math.floor(t.y);break;case tn:t.y=t.y<0?0:1;break;case pa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Re.DEFAULT_IMAGE=null;Re.DEFAULT_MAPPING=jl;Re.DEFAULT_ANISOTROPY=1;class ie{constructor(t=0,e=0,n=0,i=1){ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,v=(p+1)/2,E=(f+1)/2,w=(h+u)/4,R=(d+_)/4,A=(g+m)/4;return y>v&&y>E?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=w/n,s=R/n):v>E?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=w/i,s=A/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=R/s,i=A/s),this.set(n,i,s,e),this}let b=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-_)/b,this.z=(u-h)/b,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Uh extends Ii{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Re(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new lc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jn extends Uh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class cc extends Re{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Dh extends Re{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nr{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==p||h!==g){let m=1-a;const f=l*u+c*p+h*g+d*_,b=f>=0?1:-1,y=1-f*f;if(y>Number.EPSILON){const E=Math.sqrt(y),w=Math.atan2(E,f*b);m=Math.sin(m*w)/E,a=Math.sin(a*w)/E}const v=a*b;if(l=l*m+u*v,c=c*m+p*v,h=h*m+g*v,d=d*m+_*v,m===1-a){const E=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=E,c*=E,h*=E,d*=E}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=s[o],u=s[o+1],p=s[o+2],g=s[o+3];return t[e]=a*g+h*d+l*p-c*u,t[e+1]=l*g+h*u+c*d-a*p,t[e+2]=c*g+h*p+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(s/2),u=l(n/2),p=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-i)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(s-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(o-i)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Be(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(No.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(No.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),d=2*(s*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-s*d,this.z=i+l*d+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ds.copy(this).projectOnVector(t),this.sub(ds)}reflect(t){return this.sub(ds.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ds=new N,No=new nr;class ir{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ke.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ke.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ke.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ke):Ke.fromBufferAttribute(s,o),Ke.applyMatrix4(t.matrixWorld),this.expandByPoint(Ke);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),cr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cr.copy(n.boundingBox)),cr.applyMatrix4(t.matrixWorld),this.union(cr)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ke),Ke.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zi),hr.subVectors(this.max,zi),ii.subVectors(t.a,zi),ri.subVectors(t.b,zi),si.subVectors(t.c,zi),Tn.subVectors(ri,ii),En.subVectors(si,ri),kn.subVectors(ii,si);let e=[0,-Tn.z,Tn.y,0,-En.z,En.y,0,-kn.z,kn.y,Tn.z,0,-Tn.x,En.z,0,-En.x,kn.z,0,-kn.x,-Tn.y,Tn.x,0,-En.y,En.x,0,-kn.y,kn.x,0];return!us(e,ii,ri,si,hr)||(e=[1,0,0,0,1,0,0,0,1],!us(e,ii,ri,si,hr))?!1:(dr.crossVectors(Tn,En),e=[dr.x,dr.y,dr.z],us(e,ii,ri,si,hr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ke).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ke).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const dn=[new N,new N,new N,new N,new N,new N,new N,new N],Ke=new N,cr=new ir,ii=new N,ri=new N,si=new N,Tn=new N,En=new N,kn=new N,zi=new N,hr=new N,dr=new N,Hn=new N;function us(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Hn.fromArray(r,s);const a=i.x*Math.abs(Hn.x)+i.y*Math.abs(Hn.y)+i.z*Math.abs(Hn.z),l=t.dot(Hn),c=e.dot(Hn),h=n.dot(Hn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Ih=new ir,ki=new N,fs=new N;class so{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ih.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ki.subVectors(t,this.center);const e=ki.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ki,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fs.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ki.copy(t.center).add(fs)),this.expandByPoint(ki.copy(t.center).sub(fs))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const un=new N,ps=new N,ur=new N,An=new N,ms=new N,fr=new N,gs=new N;class Nh{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(un.copy(this.origin).addScaledVector(this.direction,e),un.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){ps.copy(t).add(e).multiplyScalar(.5),ur.copy(e).sub(t).normalize(),An.copy(this.origin).sub(ps);const s=t.distanceTo(e)*.5,o=-this.direction.dot(ur),a=An.dot(this.direction),l=-An.dot(ur),c=An.lengthSq(),h=Math.abs(1-o*o);let d,u,p,g;if(h>0)if(d=o*l-a,u=o*a-l,g=s*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,p=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(ps).addScaledVector(ur,u),p}intersectSphere(t,e){un.subVectors(t.center,this.origin);const n=un.dot(this.direction),i=un.dot(un)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(s=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,un)!==null}intersectTriangle(t,e,n,i,s){ms.subVectors(e,t),fr.subVectors(n,t),gs.crossVectors(ms,fr);let o=this.direction.dot(gs),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;An.subVectors(this.origin,t);const l=a*this.direction.dot(fr.crossVectors(An,fr));if(l<0)return null;const c=a*this.direction.dot(ms.cross(An));if(c<0||l+c>o)return null;const h=-a*An.dot(gs);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,i,s,o,a,l,c,h,d,u,p,g,_,m){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,d,u,p,g,_,m)}set(t,e,n,i,s,o,a,l,c,h,d,u,p,g,_,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ai.setFromMatrixColumn(t,0).length(),s=1/ai.setFromMatrixColumn(t,1).length(),o=1/ai.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=o*h,p=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=p+g*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const u=l*h,p=l*d,g=c*h,_=c*d;e[0]=u+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){const u=l*h,p=l*d,g=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const u=o*h,p=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=g*c-p,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const u=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+p,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*d+g,e[10]=u-_*d}else if(t.order==="XZY"){const u=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=p*d-g,e[2]=g*d-p,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Fh,t,Oh)}lookAt(t,e,n){const i=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),Rn.crossVectors(n,He),Rn.lengthSq()===0&&(Math.abs(n.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),Rn.crossVectors(n,He)),Rn.normalize(),pr.crossVectors(He,Rn),i[0]=Rn.x,i[4]=pr.x,i[8]=He.x,i[1]=Rn.y,i[5]=pr.y,i[9]=He.y,i[2]=Rn.z,i[6]=pr.z,i[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],b=n[3],y=n[7],v=n[11],E=n[15],w=i[0],R=i[4],A=i[8],M=i[12],x=i[1],C=i[5],I=i[9],F=i[13],V=i[2],Q=i[6],$=i[10],it=i[14],j=i[3],ct=i[7],gt=i[11],Et=i[15];return s[0]=o*w+a*x+l*V+c*j,s[4]=o*R+a*C+l*Q+c*ct,s[8]=o*A+a*I+l*$+c*gt,s[12]=o*M+a*F+l*it+c*Et,s[1]=h*w+d*x+u*V+p*j,s[5]=h*R+d*C+u*Q+p*ct,s[9]=h*A+d*I+u*$+p*gt,s[13]=h*M+d*F+u*it+p*Et,s[2]=g*w+_*x+m*V+f*j,s[6]=g*R+_*C+m*Q+f*ct,s[10]=g*A+_*I+m*$+f*gt,s[14]=g*M+_*F+m*it+f*Et,s[3]=b*w+y*x+v*V+E*j,s[7]=b*R+y*C+v*Q+E*ct,s[11]=b*A+y*I+v*$+E*gt,s[15]=b*M+y*F+v*it+E*Et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+s*l*d-i*c*d-s*a*u+n*c*u+i*a*p-n*l*p)+_*(+e*l*p-e*c*u+s*o*u-i*o*p+i*c*h-s*l*h)+m*(+e*c*d-e*a*p-s*o*d+n*o*p+s*a*h-n*c*h)+f*(-i*a*h-e*l*d+e*a*u+i*o*d-n*o*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],b=d*m*c-_*u*c+_*l*p-a*m*p-d*l*f+a*u*f,y=g*u*c-h*m*c-g*l*p+o*m*p+h*l*f-o*u*f,v=h*_*c-g*d*c+g*a*p-o*_*p-h*a*f+o*d*f,E=g*d*l-h*_*l-g*a*u+o*_*u+h*a*m-o*d*m,w=e*b+n*y+i*v+s*E;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return t[0]=b*R,t[1]=(_*u*s-d*m*s-_*i*p+n*m*p+d*i*f-n*u*f)*R,t[2]=(a*m*s-_*l*s+_*i*c-n*m*c-a*i*f+n*l*f)*R,t[3]=(d*l*s-a*u*s-d*i*c+n*u*c+a*i*p-n*l*p)*R,t[4]=y*R,t[5]=(h*m*s-g*u*s+g*i*p-e*m*p-h*i*f+e*u*f)*R,t[6]=(g*l*s-o*m*s-g*i*c+e*m*c+o*i*f-e*l*f)*R,t[7]=(o*u*s-h*l*s+h*i*c-e*u*c-o*i*p+e*l*p)*R,t[8]=v*R,t[9]=(g*d*s-h*_*s-g*n*p+e*_*p+h*n*f-e*d*f)*R,t[10]=(o*_*s-g*a*s+g*n*c-e*_*c-o*n*f+e*a*f)*R,t[11]=(h*a*s-o*d*s-h*n*c+e*d*c+o*n*p-e*a*p)*R,t[12]=E*R,t[13]=(h*_*i-g*d*i+g*n*u-e*_*u-h*n*m+e*d*m)*R,t[14]=(g*a*i-o*_*i-g*n*l+e*_*l+o*n*m-e*a*m)*R,t[15]=(o*d*i-h*a*i+h*n*l-e*d*l-o*n*u+e*a*u)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,d=a+a,u=s*c,p=s*h,g=s*d,_=o*h,m=o*d,f=a*d,b=l*c,y=l*h,v=l*d,E=n.x,w=n.y,R=n.z;return i[0]=(1-(_+f))*E,i[1]=(p+v)*E,i[2]=(g-y)*E,i[3]=0,i[4]=(p-v)*w,i[5]=(1-(u+f))*w,i[6]=(m+b)*w,i[7]=0,i[8]=(g+y)*R,i[9]=(m-b)*R,i[10]=(1-(u+_))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=ai.set(i[0],i[1],i[2]).length();const o=ai.set(i[4],i[5],i[6]).length(),a=ai.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Je.copy(this);const c=1/s,h=1/o,d=1/a;return Je.elements[0]*=c,Je.elements[1]*=c,Je.elements[2]*=c,Je.elements[4]*=h,Je.elements[5]*=h,Je.elements[6]*=h,Je.elements[8]*=d,Je.elements[9]*=d,Je.elements[10]*=d,e.setFromRotationMatrix(Je),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Mn){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let p,g;if(a===Mn)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===jr)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Mn){const l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(o-s),u=(e+t)*c,p=(n+i)*h;let g,_;if(a===Mn)g=(o+s)*d,_=-2*d;else if(a===jr)g=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ai=new N,Je=new he,Fh=new N(0,0,0),Oh=new N(1,1,1),Rn=new N,pr=new N,He=new N,Fo=new he,Oo=new nr;class sn{constructor(t=0,e=0,n=0,i=sn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Be(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Be(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Fo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Oo.setFromEuler(this),this.setFromQuaternion(Oo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sn.DEFAULT_ORDER="XYZ";class hc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Bh=0;const Bo=new N,oi=new nr,fn=new he,mr=new N,Hi=new N,zh=new N,kh=new nr,zo=new N(1,0,0),ko=new N(0,1,0),Ho=new N(0,0,1),Go={type:"added"},Hh={type:"removed"},li={type:"childadded",child:null},_s={type:"childremoved",child:null};class Se extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=Fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Se.DEFAULT_UP.clone();const t=new N,e=new sn,n=new nr,i=new N(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new he},normalMatrix:{value:new kt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=Se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return oi.setFromAxisAngle(t,e),this.quaternion.multiply(oi),this}rotateOnWorldAxis(t,e){return oi.setFromAxisAngle(t,e),this.quaternion.premultiply(oi),this}rotateX(t){return this.rotateOnAxis(zo,t)}rotateY(t){return this.rotateOnAxis(ko,t)}rotateZ(t){return this.rotateOnAxis(Ho,t)}translateOnAxis(t,e){return Bo.copy(t).applyQuaternion(this.quaternion),this.position.add(Bo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zo,t)}translateY(t){return this.translateOnAxis(ko,t)}translateZ(t){return this.translateOnAxis(Ho,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?mr.copy(t):mr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Hi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(Hi,mr,this.up):fn.lookAt(mr,Hi,this.up),this.quaternion.setFromRotationMatrix(fn),i&&(fn.extractRotation(i.matrixWorld),oi.setFromRotationMatrix(fn),this.quaternion.premultiply(oi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Go),li.child=t,this.dispatchEvent(li),li.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Hh),_s.child=t,this.dispatchEvent(_s),_s.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Go),li.child=t,this.dispatchEvent(li),li.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,t,zh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,kh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Se.DEFAULT_UP=new N(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qe=new N,pn=new N,xs=new N,mn=new N,ci=new N,hi=new N,Vo=new N,vs=new N,Ms=new N,bs=new N,ys=new ie,Ss=new ie,ws=new ie;class $e{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Qe.subVectors(t,e),i.cross(Qe);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Qe.subVectors(i,e),pn.subVectors(n,e),xs.subVectors(t,e);const o=Qe.dot(Qe),a=Qe.dot(pn),l=Qe.dot(xs),c=pn.dot(pn),h=pn.dot(xs),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,p=(c*l-a*h)*u,g=(o*h-a*l)*u;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,mn.x),l.addScaledVector(o,mn.y),l.addScaledVector(a,mn.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return ys.setScalar(0),Ss.setScalar(0),ws.setScalar(0),ys.fromBufferAttribute(t,e),Ss.fromBufferAttribute(t,n),ws.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(ys,s.x),o.addScaledVector(Ss,s.y),o.addScaledVector(ws,s.z),o}static isFrontFacing(t,e,n,i){return Qe.subVectors(n,e),pn.subVectors(t,e),Qe.cross(pn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qe.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),Qe.cross(pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return $e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return $e.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return $e.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return $e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return $e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;ci.subVectors(i,n),hi.subVectors(s,n),vs.subVectors(t,n);const l=ci.dot(vs),c=hi.dot(vs);if(l<=0&&c<=0)return e.copy(n);Ms.subVectors(t,i);const h=ci.dot(Ms),d=hi.dot(Ms);if(h>=0&&d<=h)return e.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(ci,o);bs.subVectors(t,s);const p=ci.dot(bs),g=hi.dot(bs);if(g>=0&&p<=g)return e.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(hi,a);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Vo.subVectors(s,i),a=(d-h)/(d-h+(p-g)),e.copy(i).addScaledVector(Vo,a);const f=1/(m+_+u);return o=_*f,a=u*f,e.copy(n).addScaledVector(ci,o).addScaledVector(hi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const dc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cn={h:0,s:0,l:0},gr={h:0,s:0,l:0};function Ts(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Ut{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ye){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=wh(t,1),e=Be(e,0,1),n=Be(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Ts(o,s,t+1/3),this.g=Ts(o,s,t),this.b=Ts(o,s,t-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(t,e=ye){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ye){const n=dc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=bn(t.r),this.g=bn(t.g),this.b=bn(t.b),this}copyLinearToSRGB(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ye){return jt.fromWorkingColorSpace(Ae.copy(this),t),Math.round(Be(Ae.r*255,0,255))*65536+Math.round(Be(Ae.g*255,0,255))*256+Math.round(Be(Ae.b*255,0,255))}getHexString(t=ye){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(Ae.copy(this),e);const n=Ae.r,i=Ae.g,s=Ae.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(Ae.copy(this),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=ye){jt.fromWorkingColorSpace(Ae.copy(this),t);const e=Ae.r,n=Ae.g,i=Ae.b;return t!==ye?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Cn),this.setHSL(Cn.h+t,Cn.s+e,Cn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Cn),t.getHSL(gr);const n=ls(Cn.h,gr.h,e),i=ls(Cn.s,gr.s,e),s=ls(Cn.l,gr.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ae=new Ut;Ut.NAMES=dc;let Gh=0;class Qn extends Ii{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=Fn(),this.name="",this.blending=wi,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ia,this.blendDst=ra,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ut(0,0,0),this.blendAlpha=0,this.depthFunc=Ai,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ao,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ei,this.stencilZFail=ei,this.stencilZPass=ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==wi&&(n.blending=this.blending),this.side!==On&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ia&&(n.blendSrc=this.blendSrc),this.blendDst!==ra&&(n.blendDst=this.blendDst),this.blendEquation!==jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ai&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ao&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class be extends Qn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=Qr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ge=new N,_r=new Dt;class Ue{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ha,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)_r.fromBufferAttribute(this,e),_r.applyMatrix3(t),this.setXY(e,_r.x,_r.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array),s=ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ha&&(t.usage=this.usage),t}}class uc extends Ue{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class fc extends Ue{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class pe extends Ue{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Vh=0;const Xe=new he,Es=new Se,di=new N,Ge=new ir,Gi=new ir,ve=new N;class Ie extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vh++}),this.uuid=Fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(oc(t)?fc:uc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new kt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Xe.makeRotationFromQuaternion(t),this.applyMatrix4(Xe),this}rotateX(t){return Xe.makeRotationX(t),this.applyMatrix4(Xe),this}rotateY(t){return Xe.makeRotationY(t),this.applyMatrix4(Xe),this}rotateZ(t){return Xe.makeRotationZ(t),this.applyMatrix4(Xe),this}translate(t,e,n){return Xe.makeTranslation(t,e,n),this.applyMatrix4(Xe),this}scale(t,e,n){return Xe.makeScale(t,e,n),this.applyMatrix4(Xe),this}lookAt(t){return Es.lookAt(t),Es.updateMatrix(),this.applyMatrix4(Es.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(di).negate(),this.translate(di.x,di.y,di.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pe(n,3))}else{for(let n=0,i=e.count;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ir);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Ge.setFromBufferAttribute(s),this.morphTargetsRelative?(ve.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(ve),ve.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(ve)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new so);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Gi.setFromBufferAttribute(a),this.morphTargetsRelative?(ve.addVectors(Ge.min,Gi.min),Ge.expandByPoint(ve),ve.addVectors(Ge.max,Gi.max),Ge.expandByPoint(ve)):(Ge.expandByPoint(Gi.min),Ge.expandByPoint(Gi.max))}Ge.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)ve.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(ve));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)ve.fromBufferAttribute(a,c),l&&(di.fromBufferAttribute(t,c),ve.add(di)),i=Math.max(i,n.distanceToSquared(ve))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ue(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<n.count;A++)a[A]=new N,l[A]=new N;const c=new N,h=new N,d=new N,u=new Dt,p=new Dt,g=new Dt,_=new N,m=new N;function f(A,M,x){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,x),u.fromBufferAttribute(s,A),p.fromBufferAttribute(s,M),g.fromBufferAttribute(s,x),h.sub(c),d.sub(c),p.sub(u),g.sub(u);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(C),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(C),a[A].add(_),a[M].add(_),a[x].add(_),l[A].add(m),l[M].add(m),l[x].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let A=0,M=b.length;A<M;++A){const x=b[A],C=x.start,I=x.count;for(let F=C,V=C+I;F<V;F+=3)f(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const y=new N,v=new N,E=new N,w=new N;function R(A){E.fromBufferAttribute(i,A),w.copy(E);const M=a[A];y.copy(M),y.sub(E.multiplyScalar(E.dot(M))).normalize(),v.crossVectors(w,M);const C=v.dot(l[A])<0?-1:1;o.setXYZW(A,y.x,y.y,y.z,C)}for(let A=0,M=b.length;A<M;++A){const x=b[A],C=x.start,I=x.count;for(let F=C,V=C+I;F<V;F+=3)R(t.getX(F+0)),R(t.getX(F+1)),R(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ue(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const i=new N,s=new N,o=new N,a=new N,l=new N,c=new N,h=new N,d=new N;if(t)for(let u=0,p=t.count;u<p;u+=3){const g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ve.fromBufferAttribute(t,e),ve.normalize(),t.setXYZ(e,ve.x,ve.y,ve.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new Ue(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ie,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=t(u,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wo=new he,Gn=new Nh,xr=new so,Xo=new N,vr=new N,Mr=new N,br=new N,As=new N,yr=new N,qo=new N,Sr=new N;class nt extends Se{constructor(t=new Ie,e=new be){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){yr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],d=s[l];h!==0&&(As.fromBufferAttribute(d,t),o?yr.addScaledVector(As,h):yr.addScaledVector(As.sub(e),h))}e.add(yr)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(s),Gn.copy(t.ray).recast(t.near),!(xr.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(xr,Xo)===null||Gn.origin.distanceToSquared(Xo)>(t.far-t.near)**2))&&(Wo.copy(s).invert(),Gn.copy(t.ray).applyMatrix4(Wo),!(n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Gn)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=o[m.materialIndex],b=Math.max(m.start,p.start),y=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=b,E=y;v<E;v+=3){const w=a.getX(v),R=a.getX(v+1),A=a.getX(v+2);i=wr(this,f,t,n,c,h,d,w,R,A),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const b=a.getX(m),y=a.getX(m+1),v=a.getX(m+2);i=wr(this,o,t,n,c,h,d,b,y,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=o[m.materialIndex],b=Math.max(m.start,p.start),y=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=b,E=y;v<E;v+=3){const w=v,R=v+1,A=v+2;i=wr(this,f,t,n,c,h,d,w,R,A),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const b=m,y=m+1,v=m+2;i=wr(this,o,t,n,c,h,d,b,y,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Wh(r,t,e,n,i,s,o,a){let l;if(t.side===De?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===On,a),l===null)return null;Sr.copy(a),Sr.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Sr);return c<e.near||c>e.far?null:{distance:c,point:Sr.clone(),object:r}}function wr(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,vr),r.getVertexPosition(l,Mr),r.getVertexPosition(c,br);const h=Wh(r,t,e,n,vr,Mr,br,qo);if(h){const d=new N;$e.getBarycoord(qo,vr,Mr,br,d),i&&(h.uv=$e.getInterpolatedAttribute(i,a,l,c,d,new Dt)),s&&(h.uv1=$e.getInterpolatedAttribute(s,a,l,c,d,new Dt)),o&&(h.normal=$e.getInterpolatedAttribute(o,a,l,c,d,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new N,materialIndex:0};$e.getNormal(vr,Mr,br,u.normal),h.face=u,h.barycoord=d}return h}class ce extends Ie{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(d,2));function g(_,m,f,b,y,v,E,w,R,A,M){const x=v/R,C=E/A,I=v/2,F=E/2,V=w/2,Q=R+1,$=A+1;let it=0,j=0;const ct=new N;for(let gt=0;gt<$;gt++){const Et=gt*C-F;for(let Ot=0;Ot<Q;Ot++){const Yt=Ot*x-I;ct[_]=Yt*b,ct[m]=Et*y,ct[f]=V,c.push(ct.x,ct.y,ct.z),ct[_]=0,ct[m]=0,ct[f]=w>0?1:-1,h.push(ct.x,ct.y,ct.z),d.push(Ot/R),d.push(1-gt/A),it+=1}}for(let gt=0;gt<A;gt++)for(let Et=0;Et<R;Et++){const Ot=u+Et+Q*gt,Yt=u+Et+Q*(gt+1),J=u+(Et+1)+Q*(gt+1),rt=u+(Et+1)+Q*gt;l.push(Ot,Yt,rt),l.push(Yt,J,rt),j+=6}a.addGroup(p,j,M),p+=j,u+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ce(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ui(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Pe(r){const t={};for(let e=0;e<r.length;e++){const n=Ui(r[e]);for(const i in n)t[i]=n[i]}return t}function Xh(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function pc(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const qh={clone:Ui,merge:Pe};var $h=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bn extends Qn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$h,this.fragmentShader=Yh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ui(t.uniforms),this.uniformsGroups=Xh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class mc extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=Mn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pn=new N,$o=new Dt,Yo=new Dt;class Ve extends mc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ga*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(os*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ga*2*Math.atan(Math.tan(os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Pn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Pn.x,Pn.y).multiplyScalar(-t/Pn.z),Pn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pn.x,Pn.y).multiplyScalar(-t/Pn.z)}getViewSize(t,e){return this.getViewBounds(t,$o,Yo),e.subVectors(Yo,$o)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(os*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ui=-90,fi=1;class jh extends Se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ve(ui,fi,t,e);i.layers=this.layers,this.add(i);const s=new Ve(ui,fi,t,e);s.layers=this.layers,this.add(s);const o=new Ve(ui,fi,t,e);o.layers=this.layers,this.add(o);const a=new Ve(ui,fi,t,e);a.layers=this.layers,this.add(a);const l=new Ve(ui,fi,t,e);l.layers=this.layers,this.add(l);const c=new Ve(ui,fi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===jr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class gc extends Re{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Ri,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Zh extends Jn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new gc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ze}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ce(5,5,5),s=new Bn({name:"CubemapFromEquirect",uniforms:Ui(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:De,blending:In});s.uniforms.tEquirect.value=e;const o=new nt(i,s),a=e.minFilter;return e.minFilter===en&&(e.minFilter=ze),new jh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const Rs=new N,Kh=new N,Jh=new kt;class qn{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Rs.subVectors(n,e).cross(Kh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Rs),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Jh.getNormalMatrix(t),i=this.coplanarPoint(Rs).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vn=new so,Tr=new N;class ao{constructor(t=new qn,e=new qn,n=new qn,i=new qn,s=new qn,o=new qn){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Mn){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],p=i[8],g=i[9],_=i[10],m=i[11],f=i[12],b=i[13],y=i[14],v=i[15];if(n[0].setComponents(l-s,u-c,m-p,v-f).normalize(),n[1].setComponents(l+s,u+c,m+p,v+f).normalize(),n[2].setComponents(l+o,u+h,m+g,v+b).normalize(),n[3].setComponents(l-o,u-h,m-g,v-b).normalize(),n[4].setComponents(l-a,u-d,m-_,v-y).normalize(),e===Mn)n[5].setComponents(l+a,u+d,m+_,v+y).normalize();else if(e===jr)n[5].setComponents(a,d,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(t){return Vn.center.set(0,0,0),Vn.radius=.7071067811865476,Vn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Tr.x=i.normal.x>0?t.max.x:t.min.x,Tr.y=i.normal.y>0?t.max.y:t.min.y,Tr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Tr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function _c(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Qh(r){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=r.HALF_FLOAT:p=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=r.SHORT;else if(c instanceof Uint32Array)p=r.UNSIGNED_INT;else if(c instanceof Int32Array)p=r.INT;else if(c instanceof Int8Array)p=r.BYTE;else if(c instanceof Uint8Array)p=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const h=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}class Ft extends Ie{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const b=f*u-o;for(let y=0;y<c;y++){const v=y*d-s;g.push(v,-b,0),_.push(0,0,1),m.push(y/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let b=0;b<a;b++){const y=b+c*f,v=b+c*(f+1),E=b+1+c*(f+1),w=b+1+c*f;p.push(y,v,w),p.push(v,E,w)}this.setIndex(p),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(_,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ft(t.width,t.height,t.widthSegments,t.heightSegments)}}var td=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ed=`#ifdef USE_ALPHAHASH
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
#endif`,nd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,id=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ad=`#ifdef USE_AOMAP
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
#endif`,od=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ld=`#ifdef USE_BATCHING
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
#endif`,cd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ud=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fd=`#ifdef USE_IRIDESCENCE
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
#endif`,pd=`#ifdef USE_BUMPMAP
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
#endif`,md=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,gd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Md=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Sd=`#define PI 3.141592653589793
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
} // validated`,wd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Td=`vec3 transformedNormal = objectNormal;
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
#endif`,Ed=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ad=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ld=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ud=`#ifdef USE_ENVMAP
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
#endif`,Dd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Id=`#ifdef USE_ENVMAP
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
#endif`,Nd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fd=`#ifdef USE_ENVMAP
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
#endif`,Od=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hd=`#ifdef USE_GRADIENTMAP
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
}`,Gd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xd=`uniform bool receiveShadow;
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
#endif`,qd=`#ifdef USE_ENVMAP
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
#endif`,$d=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kd=`PhysicalMaterial material;
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
#endif`,Jd=`struct PhysicalMaterial {
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
}`,Qd=`
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
#endif`,tu=`#if defined( RE_IndirectDiffuse )
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
#endif`,eu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,iu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ru=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,su=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,au=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ou=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cu=`#if defined( USE_POINTS_UV )
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
#endif`,hu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,du=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mu=`#ifdef USE_MORPHTARGETS
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
#endif`,gu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_u=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,xu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yu=`#ifdef USE_NORMALMAP
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
#endif`,Su=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Eu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Au=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ru=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Cu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Uu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Du=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Iu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ou=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Bu=`float getShadowMask() {
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
}`,zu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ku=`#ifdef USE_SKINNING
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
#endif`,Hu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gu=`#ifdef USE_SKINNING
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
#endif`,Vu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$u=`#ifdef USE_TRANSMISSION
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
#endif`,Yu=`#ifdef USE_TRANSMISSION
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
#endif`,ju=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ku=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ju=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tf=`uniform sampler2D t2D;
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
}`,ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,rf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,af=`#include <common>
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
}`,of=`#if DEPTH_PACKING == 3200
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
}`,lf=`#define DISTANCE
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
}`,cf=`#define DISTANCE
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
}`,hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,df=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uf=`uniform float scale;
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
}`,ff=`uniform vec3 diffuse;
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
}`,pf=`#include <common>
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
}`,mf=`uniform vec3 diffuse;
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
}`,gf=`#define LAMBERT
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
}`,_f=`#define LAMBERT
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
}`,xf=`#define MATCAP
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
}`,vf=`#define MATCAP
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
}`,Mf=`#define NORMAL
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
}`,bf=`#define NORMAL
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
}`,yf=`#define PHONG
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
}`,Sf=`#define PHONG
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
}`,wf=`#define STANDARD
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
}`,Tf=`#define STANDARD
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
}`,Ef=`#define TOON
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
}`,Af=`#define TOON
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
}`,Rf=`uniform float size;
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
}`,Cf=`uniform vec3 diffuse;
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
}`,Pf=`#include <common>
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
}`,Lf=`uniform vec3 color;
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
}`,Uf=`uniform float rotation;
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
}`,Df=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:td,alphahash_pars_fragment:ed,alphamap_fragment:nd,alphamap_pars_fragment:id,alphatest_fragment:rd,alphatest_pars_fragment:sd,aomap_fragment:ad,aomap_pars_fragment:od,batching_pars_vertex:ld,batching_vertex:cd,begin_vertex:hd,beginnormal_vertex:dd,bsdfs:ud,iridescence_fragment:fd,bumpmap_pars_fragment:pd,clipping_planes_fragment:md,clipping_planes_pars_fragment:gd,clipping_planes_pars_vertex:_d,clipping_planes_vertex:xd,color_fragment:vd,color_pars_fragment:Md,color_pars_vertex:bd,color_vertex:yd,common:Sd,cube_uv_reflection_fragment:wd,defaultnormal_vertex:Td,displacementmap_pars_vertex:Ed,displacementmap_vertex:Ad,emissivemap_fragment:Rd,emissivemap_pars_fragment:Cd,colorspace_fragment:Pd,colorspace_pars_fragment:Ld,envmap_fragment:Ud,envmap_common_pars_fragment:Dd,envmap_pars_fragment:Id,envmap_pars_vertex:Nd,envmap_physical_pars_fragment:qd,envmap_vertex:Fd,fog_vertex:Od,fog_pars_vertex:Bd,fog_fragment:zd,fog_pars_fragment:kd,gradientmap_pars_fragment:Hd,lightmap_pars_fragment:Gd,lights_lambert_fragment:Vd,lights_lambert_pars_fragment:Wd,lights_pars_begin:Xd,lights_toon_fragment:$d,lights_toon_pars_fragment:Yd,lights_phong_fragment:jd,lights_phong_pars_fragment:Zd,lights_physical_fragment:Kd,lights_physical_pars_fragment:Jd,lights_fragment_begin:Qd,lights_fragment_maps:tu,lights_fragment_end:eu,logdepthbuf_fragment:nu,logdepthbuf_pars_fragment:iu,logdepthbuf_pars_vertex:ru,logdepthbuf_vertex:su,map_fragment:au,map_pars_fragment:ou,map_particle_fragment:lu,map_particle_pars_fragment:cu,metalnessmap_fragment:hu,metalnessmap_pars_fragment:du,morphinstance_vertex:uu,morphcolor_vertex:fu,morphnormal_vertex:pu,morphtarget_pars_vertex:mu,morphtarget_vertex:gu,normal_fragment_begin:_u,normal_fragment_maps:xu,normal_pars_fragment:vu,normal_pars_vertex:Mu,normal_vertex:bu,normalmap_pars_fragment:yu,clearcoat_normal_fragment_begin:Su,clearcoat_normal_fragment_maps:wu,clearcoat_pars_fragment:Tu,iridescence_pars_fragment:Eu,opaque_fragment:Au,packing:Ru,premultiplied_alpha_fragment:Cu,project_vertex:Pu,dithering_fragment:Lu,dithering_pars_fragment:Uu,roughnessmap_fragment:Du,roughnessmap_pars_fragment:Iu,shadowmap_pars_fragment:Nu,shadowmap_pars_vertex:Fu,shadowmap_vertex:Ou,shadowmask_pars_fragment:Bu,skinbase_vertex:zu,skinning_pars_vertex:ku,skinning_vertex:Hu,skinnormal_vertex:Gu,specularmap_fragment:Vu,specularmap_pars_fragment:Wu,tonemapping_fragment:Xu,tonemapping_pars_fragment:qu,transmission_fragment:$u,transmission_pars_fragment:Yu,uv_pars_fragment:ju,uv_pars_vertex:Zu,uv_vertex:Ku,worldpos_vertex:Ju,background_vert:Qu,background_frag:tf,backgroundCube_vert:ef,backgroundCube_frag:nf,cube_vert:rf,cube_frag:sf,depth_vert:af,depth_frag:of,distanceRGBA_vert:lf,distanceRGBA_frag:cf,equirect_vert:hf,equirect_frag:df,linedashed_vert:uf,linedashed_frag:ff,meshbasic_vert:pf,meshbasic_frag:mf,meshlambert_vert:gf,meshlambert_frag:_f,meshmatcap_vert:xf,meshmatcap_frag:vf,meshnormal_vert:Mf,meshnormal_frag:bf,meshphong_vert:yf,meshphong_frag:Sf,meshphysical_vert:wf,meshphysical_frag:Tf,meshtoon_vert:Ef,meshtoon_frag:Af,points_vert:Rf,points_frag:Cf,shadow_vert:Pf,shadow_frag:Lf,sprite_vert:Uf,sprite_frag:Df},dt={common:{diffuse:{value:new Ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Ut(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},on={basic:{uniforms:Pe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:Pe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:Pe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ut(0)},specular:{value:new Ut(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:Pe([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:Pe([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:Pe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:Pe([dt.points,dt.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:Pe([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:Pe([dt.common,dt.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:Pe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:Pe([dt.sprite,dt.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distanceRGBA:{uniforms:Pe([dt.common,dt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distanceRGBA_vert,fragmentShader:Gt.distanceRGBA_frag},shadow:{uniforms:Pe([dt.lights,dt.fog,{color:{value:new Ut(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};on.physical={uniforms:Pe([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Ut(0)},specularColor:{value:new Ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const Er={r:0,b:0,g:0},Wn=new sn,If=new he;function Nf(r,t,e,n,i,s,o){const a=new Ut(0);let l=s===!0?0:1,c,h,d=null,u=0,p=null;function g(b){let y=b.isScene===!0?b.background:null;return y&&y.isTexture&&(y=(b.backgroundBlurriness>0?e:t).get(y)),y}function _(b){let y=!1;const v=g(b);v===null?f(a,l):v&&v.isColor&&(f(v,1),y=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(b,y){const v=g(y);v&&(v.isCubeTexture||v.mapping===ts)?(h===void 0&&(h=new nt(new ce(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:Ui(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:De,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Wn.copy(y.backgroundRotation),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(If.makeRotationFromEuler(Wn)),h.material.toneMapped=jt.getTransfer(v.colorSpace)!==ee,(d!==v||u!==v.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,d=v,u=v.version,p=r.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new nt(new Ft(2,2),new Bn({name:"BackgroundMaterial",uniforms:Ui(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=jt.getTransfer(v.colorSpace)!==ee,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||u!==v.version||p!==r.toneMapping)&&(c.material.needsUpdate=!0,d=v,u=v.version,p=r.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function f(b,y){b.getRGB(Er,pc(r)),n.buffers.color.setClear(Er.r,Er.g,Er.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(b,y=1){a.set(b),l=y,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,f(a,l)},render:_,addToRenderList:m}}function Ff(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,o=!1;function a(x,C,I,F,V){let Q=!1;const $=d(F,I,C);s!==$&&(s=$,c(s.object)),Q=p(x,F,I,V),Q&&g(x,F,I,V),V!==null&&t.update(V,r.ELEMENT_ARRAY_BUFFER),(Q||o)&&(o=!1,v(x,C,I,F),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return r.createVertexArray()}function c(x){return r.bindVertexArray(x)}function h(x){return r.deleteVertexArray(x)}function d(x,C,I){const F=I.wireframe===!0;let V=n[x.id];V===void 0&&(V={},n[x.id]=V);let Q=V[C.id];Q===void 0&&(Q={},V[C.id]=Q);let $=Q[F];return $===void 0&&($=u(l()),Q[F]=$),$}function u(x){const C=[],I=[],F=[];for(let V=0;V<e;V++)C[V]=0,I[V]=0,F[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:I,attributeDivisors:F,object:x,attributes:{},index:null}}function p(x,C,I,F){const V=s.attributes,Q=C.attributes;let $=0;const it=I.getAttributes();for(const j in it)if(it[j].location>=0){const gt=V[j];let Et=Q[j];if(Et===void 0&&(j==="instanceMatrix"&&x.instanceMatrix&&(Et=x.instanceMatrix),j==="instanceColor"&&x.instanceColor&&(Et=x.instanceColor)),gt===void 0||gt.attribute!==Et||Et&&gt.data!==Et.data)return!0;$++}return s.attributesNum!==$||s.index!==F}function g(x,C,I,F){const V={},Q=C.attributes;let $=0;const it=I.getAttributes();for(const j in it)if(it[j].location>=0){let gt=Q[j];gt===void 0&&(j==="instanceMatrix"&&x.instanceMatrix&&(gt=x.instanceMatrix),j==="instanceColor"&&x.instanceColor&&(gt=x.instanceColor));const Et={};Et.attribute=gt,gt&&gt.data&&(Et.data=gt.data),V[j]=Et,$++}s.attributes=V,s.attributesNum=$,s.index=F}function _(){const x=s.newAttributes;for(let C=0,I=x.length;C<I;C++)x[C]=0}function m(x){f(x,0)}function f(x,C){const I=s.newAttributes,F=s.enabledAttributes,V=s.attributeDivisors;I[x]=1,F[x]===0&&(r.enableVertexAttribArray(x),F[x]=1),V[x]!==C&&(r.vertexAttribDivisor(x,C),V[x]=C)}function b(){const x=s.newAttributes,C=s.enabledAttributes;for(let I=0,F=C.length;I<F;I++)C[I]!==x[I]&&(r.disableVertexAttribArray(I),C[I]=0)}function y(x,C,I,F,V,Q,$){$===!0?r.vertexAttribIPointer(x,C,I,V,Q):r.vertexAttribPointer(x,C,I,F,V,Q)}function v(x,C,I,F){_();const V=F.attributes,Q=I.getAttributes(),$=C.defaultAttributeValues;for(const it in Q){const j=Q[it];if(j.location>=0){let ct=V[it];if(ct===void 0&&(it==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),it==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor)),ct!==void 0){const gt=ct.normalized,Et=ct.itemSize,Ot=t.get(ct);if(Ot===void 0)continue;const Yt=Ot.buffer,J=Ot.type,rt=Ot.bytesPerElement,bt=J===r.INT||J===r.UNSIGNED_INT||ct.gpuType===Ja;if(ct.isInterleavedBufferAttribute){const pt=ct.data,xt=pt.stride,It=ct.offset;if(pt.isInstancedInterleavedBuffer){for(let Ht=0;Ht<j.locationSize;Ht++)f(j.location+Ht,pt.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let Ht=0;Ht<j.locationSize;Ht++)m(j.location+Ht);r.bindBuffer(r.ARRAY_BUFFER,Yt);for(let Ht=0;Ht<j.locationSize;Ht++)y(j.location+Ht,Et/j.locationSize,J,gt,xt*rt,(It+Et/j.locationSize*Ht)*rt,bt)}else{if(ct.isInstancedBufferAttribute){for(let pt=0;pt<j.locationSize;pt++)f(j.location+pt,ct.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let pt=0;pt<j.locationSize;pt++)m(j.location+pt);r.bindBuffer(r.ARRAY_BUFFER,Yt);for(let pt=0;pt<j.locationSize;pt++)y(j.location+pt,Et/j.locationSize,J,gt,Et*rt,Et/j.locationSize*pt*rt,bt)}}else if($!==void 0){const gt=$[it];if(gt!==void 0)switch(gt.length){case 2:r.vertexAttrib2fv(j.location,gt);break;case 3:r.vertexAttrib3fv(j.location,gt);break;case 4:r.vertexAttrib4fv(j.location,gt);break;default:r.vertexAttrib1fv(j.location,gt)}}}}b()}function E(){A();for(const x in n){const C=n[x];for(const I in C){const F=C[I];for(const V in F)h(F[V].object),delete F[V];delete C[I]}delete n[x]}}function w(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const I in C){const F=C[I];for(const V in F)h(F[V].object),delete F[V];delete C[I]}delete n[x.id]}function R(x){for(const C in n){const I=n[C];if(I[x.id]===void 0)continue;const F=I[x.id];for(const V in F)h(F[V].object),delete F[V];delete I[x.id]}}function A(){M(),o=!0,s!==i&&(s=i,c(s.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:A,resetDefaultState:M,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function Of(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,d){d!==0&&(r.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];e.update(p,n,1)}function l(c,h,d,u){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];e.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Bf(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(R){return!(R!==nn&&n.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const A=R===er&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==yn&&n.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==vn&&!A)}function l(R){if(R==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),f=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,w=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:b,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:E,maxSamples:w}}function zf(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new qn,a=new kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||i;return i=u,n=d.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=r.get(d);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{const b=s?0:n,y=b*4;let v=f.clippingState||null;l.value=v,v=h(g,u,y,p);for(let E=0;E!==y;++E)v[E]=e[E];f.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,b=u.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,v=p;y!==_;++y,v+=4)o.copy(d[y]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function kf(r){let t=new WeakMap;function e(o,a){return a===ua?o.mapping=Ri:a===fa&&(o.mapping=Ci),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ua||a===fa)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Zh(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class xc extends mc{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const bi=4,jo=[.125,.215,.35,.446,.526,.582],Zn=20,Cs=new xc,Zo=new Ut;let Ps=null,Ls=0,Us=0,Ds=!1;const $n=(1+Math.sqrt(5))/2,pi=1/$n,Ko=[new N(-$n,pi,0),new N($n,pi,0),new N(-pi,0,$n),new N(pi,0,$n),new N(0,$n,-pi),new N(0,$n,pi),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Jo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Ps=this._renderer.getRenderTarget(),Ls=this._renderer.getActiveCubeFace(),Us=this._renderer.getActiveMipmapLevel(),Ds=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=el(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ps,Ls,Us),this._renderer.xr.enabled=Ds,t.scissorTest=!1,Ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ri||t.mapping===Ci?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ps=this._renderer.getRenderTarget(),Ls=this._renderer.getActiveCubeFace(),Us=this._renderer.getActiveMipmapLevel(),Ds=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ze,minFilter:ze,generateMipmaps:!1,type:er,format:nn,colorSpace:Di,depthBuffer:!1},i=Qo(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qo(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hf(s)),this._blurMaterial=Gf(s,t,e)}return i}_compileMaterial(t){const e=new nt(this._lodPlanes[0],t);this._renderer.compile(e,Cs)}_sceneToCubeUV(t,e,n,i){const a=new Ve(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Zo),h.toneMapping=Nn,h.autoClear=!1;const p=new be({name:"PMREM.Background",side:De,depthWrite:!1,depthTest:!1}),g=new nt(new ce,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Zo),_=!0);for(let f=0;f<6;f++){const b=f%3;b===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):b===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const y=this._cubeSize;Ar(i,b*y,f>2?y:0,y,y),h.setRenderTarget(i),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Ri||t.mapping===Ci;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=el()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tl());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new nt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Ar(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Cs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Ko[(i-s-1)%Ko.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new nt(this._lodPlanes[i],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Zn-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):Zn;m>Zn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Zn}`);const f=[];let b=0;for(let R=0;R<Zn;++R){const A=R/_,M=Math.exp(-A*A/2);f.push(M),R===0?b+=M:R<m&&(b+=2*M)}for(let R=0;R<f.length;R++)f[R]=f[R]/b;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:y}=this;u.dTheta.value=g,u.mipInt.value=y-n;const v=this._sizeLods[i],E=3*v*(i>y-bi?i-y+bi:0),w=4*(this._cubeSize-v);Ar(e,E,w,3*v,2*v),l.setRenderTarget(e),l.render(d,Cs)}}function Hf(r){const t=[],e=[],n=[];let i=r;const s=r-bi+1+jo.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-bi?l=jo[o-r+bi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,_=3,m=2,f=1,b=new Float32Array(_*g*p),y=new Float32Array(m*g*p),v=new Float32Array(f*g*p);for(let w=0;w<p;w++){const R=w%3*2/3-1,A=w>2?0:-1,M=[R,A,0,R+2/3,A,0,R+2/3,A+1,0,R,A,0,R+2/3,A+1,0,R,A+1,0];b.set(M,_*g*w),y.set(u,m*g*w);const x=[w,w,w,w,w,w];v.set(x,f*g*w)}const E=new Ie;E.setAttribute("position",new Ue(b,_)),E.setAttribute("uv",new Ue(y,m)),E.setAttribute("faceIndex",new Ue(v,f)),t.push(E),i>bi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Qo(r,t,e){const n=new Jn(r,t,e);return n.texture.mapping=ts,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ar(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Gf(r,t,e){const n=new Float32Array(Zn),i=new N(0,1,0);return new Bn({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:oo(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function tl(){return new Bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oo(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function el(){return new Bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function oo(){return`

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
	`}function Vf(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ua||l===fa,h=l===Ri||l===Ci;if(c||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Jo(r)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new Jo(r)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Wf(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Yi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Xf(r,t,e,n){const i={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)t.remove(_[m])}u.removeEventListener("dispose",o),delete i[u.id];const p=s.get(u);p&&(t.remove(p),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],r.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)t.update(_[m],r.ARRAY_BUFFER)}}function c(d){const u=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const b=p.array;_=p.version;for(let y=0,v=b.length;y<v;y+=3){const E=b[y+0],w=b[y+1],R=b[y+2];u.push(E,w,w,R,R,E)}}else if(g!==void 0){const b=g.array;_=g.version;for(let y=0,v=b.length/3-1;y<v;y+=3){const E=y+0,w=y+1,R=y+2;u.push(E,w,w,R,R,E)}}else return;const m=new(oc(u)?fc:uc)(u,1);m.version=_;const f=s.get(d);f&&t.remove(f),s.set(d,m)}function h(d){const u=s.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function qf(r,t,e){let n;function i(u){n=u}let s,o;function a(u){s=u.type,o=u.bytesPerElement}function l(u,p){r.drawElements(n,p,s,u*o),e.update(p,n,1)}function c(u,p,g){g!==0&&(r.drawElementsInstanced(n,p,s,u*o,g),e.update(p,n,g))}function h(u,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function d(u,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)c(u[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,u,0,_,0,g);let f=0;for(let b=0;b<g;b++)f+=p[b]*_[b];e.update(f,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function $f(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Yf(r,t,e){const n=new WeakMap,i=new ie;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let M=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let y=0;p===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let v=a.attributes.position.count*y,E=1;v>t.maxTextureSize&&(E=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const w=new Float32Array(v*E*4*d),R=new cc(w,v,E,d);R.type=vn,R.needsUpdate=!0;const A=y*4;for(let x=0;x<d;x++){const C=m[x],I=f[x],F=b[x],V=v*E*4*x;for(let Q=0;Q<C.count;Q++){const $=Q*A;p===!0&&(i.fromBufferAttribute(C,Q),w[V+$+0]=i.x,w[V+$+1]=i.y,w[V+$+2]=i.z,w[V+$+3]=0),g===!0&&(i.fromBufferAttribute(I,Q),w[V+$+4]=i.x,w[V+$+5]=i.y,w[V+$+6]=i.z,w[V+$+7]=0),_===!0&&(i.fromBufferAttribute(F,Q),w[V+$+8]=i.x,w[V+$+9]=i.y,w[V+$+10]=i.z,w[V+$+11]=F.itemSize===4?i.w:1)}}u={count:d,texture:R,size:new Dt(v,E)},n.set(a,u),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];const g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function jf(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class vc extends Re{constructor(t,e,n,i,s,o,a,l,c,h=Ti){if(h!==Ti&&h!==Li)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ti&&(n=Kn),n===void 0&&h===Li&&(n=Pi),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:rn,this.minFilter=l!==void 0?l:rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Mc=new Re,nl=new vc(1,1),bc=new cc,yc=new Dh,Sc=new gc,il=[],rl=[],sl=new Float32Array(16),al=new Float32Array(9),ol=new Float32Array(4);function Ni(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=il[i];if(s===void 0&&(s=new Float32Array(i),il[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function _e(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function xe(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function ns(r,t){let e=rl[t];e===void 0&&(e=new Int32Array(t),rl[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Zf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Kf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;r.uniform2fv(this.addr,t),xe(e,t)}}function Jf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;r.uniform3fv(this.addr,t),xe(e,t)}}function Qf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;r.uniform4fv(this.addr,t),xe(e,t)}}function tp(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(_e(e,n))return;ol.set(n),r.uniformMatrix2fv(this.addr,!1,ol),xe(e,n)}}function ep(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(_e(e,n))return;al.set(n),r.uniformMatrix3fv(this.addr,!1,al),xe(e,n)}}function np(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(_e(e,n))return;sl.set(n),r.uniformMatrix4fv(this.addr,!1,sl),xe(e,n)}}function ip(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function rp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;r.uniform2iv(this.addr,t),xe(e,t)}}function sp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;r.uniform3iv(this.addr,t),xe(e,t)}}function ap(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;r.uniform4iv(this.addr,t),xe(e,t)}}function op(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function lp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;r.uniform2uiv(this.addr,t),xe(e,t)}}function cp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;r.uniform3uiv(this.addr,t),xe(e,t)}}function hp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;r.uniform4uiv(this.addr,t),xe(e,t)}}function dp(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(nl.compareFunction=ac,s=nl):s=Mc,e.setTexture2D(t||s,i)}function up(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||yc,i)}function fp(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Sc,i)}function pp(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||bc,i)}function mp(r){switch(r){case 5126:return Zf;case 35664:return Kf;case 35665:return Jf;case 35666:return Qf;case 35674:return tp;case 35675:return ep;case 35676:return np;case 5124:case 35670:return ip;case 35667:case 35671:return rp;case 35668:case 35672:return sp;case 35669:case 35673:return ap;case 5125:return op;case 36294:return lp;case 36295:return cp;case 36296:return hp;case 35678:case 36198:case 36298:case 36306:case 35682:return dp;case 35679:case 36299:case 36307:return up;case 35680:case 36300:case 36308:case 36293:return fp;case 36289:case 36303:case 36311:case 36292:return pp}}function gp(r,t){r.uniform1fv(this.addr,t)}function _p(r,t){const e=Ni(t,this.size,2);r.uniform2fv(this.addr,e)}function xp(r,t){const e=Ni(t,this.size,3);r.uniform3fv(this.addr,e)}function vp(r,t){const e=Ni(t,this.size,4);r.uniform4fv(this.addr,e)}function Mp(r,t){const e=Ni(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function bp(r,t){const e=Ni(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function yp(r,t){const e=Ni(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Sp(r,t){r.uniform1iv(this.addr,t)}function wp(r,t){r.uniform2iv(this.addr,t)}function Tp(r,t){r.uniform3iv(this.addr,t)}function Ep(r,t){r.uniform4iv(this.addr,t)}function Ap(r,t){r.uniform1uiv(this.addr,t)}function Rp(r,t){r.uniform2uiv(this.addr,t)}function Cp(r,t){r.uniform3uiv(this.addr,t)}function Pp(r,t){r.uniform4uiv(this.addr,t)}function Lp(r,t,e){const n=this.cache,i=t.length,s=ns(e,i);_e(n,s)||(r.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Mc,s[o])}function Up(r,t,e){const n=this.cache,i=t.length,s=ns(e,i);_e(n,s)||(r.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||yc,s[o])}function Dp(r,t,e){const n=this.cache,i=t.length,s=ns(e,i);_e(n,s)||(r.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Sc,s[o])}function Ip(r,t,e){const n=this.cache,i=t.length,s=ns(e,i);_e(n,s)||(r.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||bc,s[o])}function Np(r){switch(r){case 5126:return gp;case 35664:return _p;case 35665:return xp;case 35666:return vp;case 35674:return Mp;case 35675:return bp;case 35676:return yp;case 5124:case 35670:return Sp;case 35667:case 35671:return wp;case 35668:case 35672:return Tp;case 35669:case 35673:return Ep;case 5125:return Ap;case 36294:return Rp;case 36295:return Cp;case 36296:return Pp;case 35678:case 36198:case 36298:case 36306:case 35682:return Lp;case 35679:case 36299:case 36307:return Up;case 35680:case 36300:case 36308:case 36293:return Dp;case 36289:case 36303:case 36311:case 36292:return Ip}}class Fp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=mp(e.type)}}class Op{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Np(e.type)}}class Bp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const Is=/(\w+)(\])?(\[|\.)?/g;function ll(r,t){r.seq.push(t),r.map[t.id]=t}function zp(r,t,e){const n=r.name,i=n.length;for(Is.lastIndex=0;;){const s=Is.exec(n),o=Is.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){ll(e,c===void 0?new Fp(a,r,t):new Op(a,r,t));break}else{let d=e.map[a];d===void 0&&(d=new Bp(a),ll(e,d)),e=d}}}class Xr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);zp(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function cl(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const kp=37297;let Hp=0;function Gp(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const hl=new kt;function Vp(r){jt._getMatrix(hl,jt.workingColorSpace,r);const t=`mat3( ${hl.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(r)){case es:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function dl(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Gp(r.getShaderSource(t),o)}else return i}function Wp(r,t){const e=Vp(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Xp(r,t){let e;switch(t){case ah:e="Linear";break;case oh:e="Reinhard";break;case lh:e="Cineon";break;case ch:e="ACESFilmic";break;case dh:e="AgX";break;case uh:e="Neutral";break;case hh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Rr=new N;function qp(){jt.getLuminanceCoefficients(Rr);const r=Rr.x.toFixed(4),t=Rr.y.toFixed(4),e=Rr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $p(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ji).join(`
`)}function Yp(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function jp(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function ji(r){return r!==""}function ul(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fl(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Zp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Va(r){return r.replace(Zp,Jp)}const Kp=new Map;function Jp(r,t){let e=Gt[t];if(e===void 0){const n=Kp.get(t);if(n!==void 0)e=Gt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Va(e)}const Qp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pl(r){return r.replace(Qp,tm)}function tm(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function ml(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function em(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Yl?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===zc?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===xn&&(t="SHADOWMAP_TYPE_VSM"),t}function nm(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ri:case Ci:t="ENVMAP_TYPE_CUBE";break;case ts:t="ENVMAP_TYPE_CUBE_UV";break}return t}function im(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ci:t="ENVMAP_MODE_REFRACTION";break}return t}function rm(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Qr:t="ENVMAP_BLENDING_MULTIPLY";break;case rh:t="ENVMAP_BLENDING_MIX";break;case sh:t="ENVMAP_BLENDING_ADD";break}return t}function sm(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function am(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=em(e),c=nm(e),h=im(e),d=rm(e),u=sm(e),p=$p(e),g=Yp(s),_=i.createProgram();let m,f,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ji).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ji).join(`
`),f.length>0&&(f+=`
`)):(m=[ml(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ji).join(`
`),f=[ml(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Nn?"#define TONE_MAPPING":"",e.toneMapping!==Nn?Gt.tonemapping_pars_fragment:"",e.toneMapping!==Nn?Xp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,Wp("linearToOutputTexel",e.outputColorSpace),qp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ji).join(`
`)),o=Va(o),o=ul(o,e),o=fl(o,e),a=Va(a),a=ul(a,e),a=fl(a,e),o=pl(o),a=pl(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Ro?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ro?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=b+m+o,v=b+f+a,E=cl(i,i.VERTEX_SHADER,y),w=cl(i,i.FRAGMENT_SHADER,v);i.attachShader(_,E),i.attachShader(_,w),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function R(C){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(_).trim(),F=i.getShaderInfoLog(E).trim(),V=i.getShaderInfoLog(w).trim();let Q=!0,$=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,E,w);else{const it=dl(i,E,"vertex"),j=dl(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+I+`
`+it+`
`+j)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(F===""||V==="")&&($=!1);$&&(C.diagnostics={runnable:Q,programLog:I,vertexShader:{log:F,prefix:m},fragmentShader:{log:V,prefix:f}})}i.deleteShader(E),i.deleteShader(w),A=new Xr(i,_),M=jp(i,_)}let A;this.getUniforms=function(){return A===void 0&&R(this),A};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(_,kp)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Hp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=w,this}let om=0;class lm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new cm(t),e.set(t,n)),n}}class cm{constructor(t){this.id=om++,this.code=t,this.usedTimes=0}}function hm(r,t,e,n,i,s,o){const a=new hc,l=new lm,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,x,C,I,F){const V=I.fog,Q=F.geometry,$=M.isMeshStandardMaterial?I.environment:null,it=(M.isMeshStandardMaterial?e:t).get(M.envMap||$),j=it&&it.mapping===ts?it.image.height:null,ct=g[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const gt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Et=gt!==void 0?gt.length:0;let Ot=0;Q.morphAttributes.position!==void 0&&(Ot=1),Q.morphAttributes.normal!==void 0&&(Ot=2),Q.morphAttributes.color!==void 0&&(Ot=3);let Yt,J,rt,bt;if(ct){const te=on[ct];Yt=te.vertexShader,J=te.fragmentShader}else Yt=M.vertexShader,J=M.fragmentShader,l.update(M),rt=l.getVertexShaderID(M),bt=l.getFragmentShaderID(M);const pt=r.getRenderTarget(),xt=r.state.buffers.depth.getReversed(),It=F.isInstancedMesh===!0,Ht=F.isBatchedMesh===!0,se=!!M.map,Vt=!!M.matcap,le=!!it,O=!!M.aoMap,me=!!M.lightMap,Wt=!!M.bumpMap,qt=!!M.normalMap,At=!!M.displacementMap,Kt=!!M.emissiveMap,yt=!!M.metalnessMap,P=!!M.roughnessMap,S=M.anisotropy>0,k=M.clearcoat>0,Z=M.dispersion>0,tt=M.iridescence>0,K=M.sheen>0,vt=M.transmission>0,L=S&&!!M.anisotropyMap,G=k&&!!M.clearcoatMap,at=k&&!!M.clearcoatNormalMap,Y=k&&!!M.clearcoatRoughnessMap,et=tt&&!!M.iridescenceMap,lt=tt&&!!M.iridescenceThicknessMap,Mt=K&&!!M.sheenColorMap,ht=K&&!!M.sheenRoughnessMap,Pt=!!M.specularMap,Ct=!!M.specularColorMap,Xt=!!M.specularIntensityMap,U=vt&&!!M.transmissionMap,ut=vt&&!!M.thicknessMap,q=!!M.gradientMap,H=!!M.alphaMap,ot=M.alphaTest>0,ft=!!M.alphaHash,Bt=!!M.extensions;let ue=Nn;M.toneMapped&&(pt===null||pt.isXRRenderTarget===!0)&&(ue=r.toneMapping);const Te={shaderID:ct,shaderType:M.type,shaderName:M.name,vertexShader:Yt,fragmentShader:J,defines:M.defines,customVertexShaderID:rt,customFragmentShaderID:bt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ht,batchingColor:Ht&&F._colorsTexture!==null,instancing:It,instancingColor:It&&F.instanceColor!==null,instancingMorph:It&&F.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:pt===null?r.outputColorSpace:pt.isXRRenderTarget===!0?pt.texture.colorSpace:Di,alphaToCoverage:!!M.alphaToCoverage,map:se,matcap:Vt,envMap:le,envMapMode:le&&it.mapping,envMapCubeUVHeight:j,aoMap:O,lightMap:me,bumpMap:Wt,normalMap:qt,displacementMap:u&&At,emissiveMap:Kt,normalMapObjectSpace:qt&&M.normalMapType===gh,normalMapTangentSpace:qt&&M.normalMapType===ro,metalnessMap:yt,roughnessMap:P,anisotropy:S,anisotropyMap:L,clearcoat:k,clearcoatMap:G,clearcoatNormalMap:at,clearcoatRoughnessMap:Y,dispersion:Z,iridescence:tt,iridescenceMap:et,iridescenceThicknessMap:lt,sheen:K,sheenColorMap:Mt,sheenRoughnessMap:ht,specularMap:Pt,specularColorMap:Ct,specularIntensityMap:Xt,transmission:vt,transmissionMap:U,thicknessMap:ut,gradientMap:q,opaque:M.transparent===!1&&M.blending===wi&&M.alphaToCoverage===!1,alphaMap:H,alphaTest:ot,alphaHash:ft,combine:M.combine,mapUv:se&&_(M.map.channel),aoMapUv:O&&_(M.aoMap.channel),lightMapUv:me&&_(M.lightMap.channel),bumpMapUv:Wt&&_(M.bumpMap.channel),normalMapUv:qt&&_(M.normalMap.channel),displacementMapUv:At&&_(M.displacementMap.channel),emissiveMapUv:Kt&&_(M.emissiveMap.channel),metalnessMapUv:yt&&_(M.metalnessMap.channel),roughnessMapUv:P&&_(M.roughnessMap.channel),anisotropyMapUv:L&&_(M.anisotropyMap.channel),clearcoatMapUv:G&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:at&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:ht&&_(M.sheenRoughnessMap.channel),specularMapUv:Pt&&_(M.specularMap.channel),specularColorMapUv:Ct&&_(M.specularColorMap.channel),specularIntensityMapUv:Xt&&_(M.specularIntensityMap.channel),transmissionMapUv:U&&_(M.transmissionMap.channel),thicknessMapUv:ut&&_(M.thicknessMap.channel),alphaMapUv:H&&_(M.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(qt||S),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Q.attributes.uv&&(se||H),fog:!!V,useFog:M.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:xt,skinning:F.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Ot,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:ue,decodeVideoTexture:se&&M.map.isVideoTexture===!0&&jt.getTransfer(M.map.colorSpace)===ee,decodeVideoTextureEmissive:Kt&&M.emissiveMap.isVideoTexture===!0&&jt.getTransfer(M.emissiveMap.colorSpace)===ee,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===$t,flipSided:M.side===De,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Bt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&M.extensions.multiDraw===!0||Ht)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Te.vertexUv1s=c.has(1),Te.vertexUv2s=c.has(2),Te.vertexUv3s=c.has(3),c.clear(),Te}function f(M){const x=[];if(M.shaderID?x.push(M.shaderID):(x.push(M.customVertexShaderID),x.push(M.customFragmentShaderID)),M.defines!==void 0)for(const C in M.defines)x.push(C),x.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(b(x,M),y(x,M),x.push(r.outputColorSpace)),x.push(M.customProgramCacheKey),x.join()}function b(M,x){M.push(x.precision),M.push(x.outputColorSpace),M.push(x.envMapMode),M.push(x.envMapCubeUVHeight),M.push(x.mapUv),M.push(x.alphaMapUv),M.push(x.lightMapUv),M.push(x.aoMapUv),M.push(x.bumpMapUv),M.push(x.normalMapUv),M.push(x.displacementMapUv),M.push(x.emissiveMapUv),M.push(x.metalnessMapUv),M.push(x.roughnessMapUv),M.push(x.anisotropyMapUv),M.push(x.clearcoatMapUv),M.push(x.clearcoatNormalMapUv),M.push(x.clearcoatRoughnessMapUv),M.push(x.iridescenceMapUv),M.push(x.iridescenceThicknessMapUv),M.push(x.sheenColorMapUv),M.push(x.sheenRoughnessMapUv),M.push(x.specularMapUv),M.push(x.specularColorMapUv),M.push(x.specularIntensityMapUv),M.push(x.transmissionMapUv),M.push(x.thicknessMapUv),M.push(x.combine),M.push(x.fogExp2),M.push(x.sizeAttenuation),M.push(x.morphTargetsCount),M.push(x.morphAttributeCount),M.push(x.numDirLights),M.push(x.numPointLights),M.push(x.numSpotLights),M.push(x.numSpotLightMaps),M.push(x.numHemiLights),M.push(x.numRectAreaLights),M.push(x.numDirLightShadows),M.push(x.numPointLightShadows),M.push(x.numSpotLightShadows),M.push(x.numSpotLightShadowsWithMaps),M.push(x.numLightProbes),M.push(x.shadowMapType),M.push(x.toneMapping),M.push(x.numClippingPlanes),M.push(x.numClipIntersection),M.push(x.depthPacking)}function y(M,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){const x=g[M.type];let C;if(x){const I=on[x];C=qh.clone(I.uniforms)}else C=M.uniforms;return C}function E(M,x){let C;for(let I=0,F=h.length;I<F;I++){const V=h[I];if(V.cacheKey===x){C=V,++C.usedTimes;break}}return C===void 0&&(C=new am(r,x,M,s),h.push(C)),C}function w(M){if(--M.usedTimes===0){const x=h.indexOf(M);h[x]=h[h.length-1],h.pop(),M.destroy()}}function R(M){l.remove(M)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:E,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:A}}function dm(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function um(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function gl(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function _l(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,p,g,_,m){let f=r[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},r[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=m),t++,f}function a(d,u,p,g,_,m){const f=o(d,u,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function l(d,u,p,g,_,m){const f=o(d,u,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function c(d,u){e.length>1&&e.sort(d||um),n.length>1&&n.sort(u||gl),i.length>1&&i.sort(u||gl)}function h(){for(let d=t,u=r.length;d<u;d++){const p=r[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function fm(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new _l,r.set(n,[o])):i>=s.length?(o=new _l,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function pm(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Ut};break;case"SpotLight":e={position:new N,direction:new N,color:new Ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Ut,groundColor:new Ut};break;case"RectAreaLight":e={color:new Ut,position:new N,halfWidth:new N,halfHeight:new N};break}return r[t.id]=e,e}}}function mm(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let gm=0;function _m(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function xm(r){const t=new pm,e=mm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);const i=new N,s=new he,o=new he;function a(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,b=0,y=0,v=0,E=0,w=0,R=0;c.sort(_m);for(let M=0,x=c.length;M<x;M++){const C=c[M],I=C.color,F=C.intensity,V=C.distance,Q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=I.r*F,d+=I.g*F,u+=I.b*F;else if(C.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(C.sh.coefficients[$],F);R++}else if(C.isDirectionalLight){const $=t.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const it=C.shadow,j=e.get(C);j.shadowIntensity=it.intensity,j.shadowBias=it.bias,j.shadowNormalBias=it.normalBias,j.shadowRadius=it.radius,j.shadowMapSize=it.mapSize,n.directionalShadow[p]=j,n.directionalShadowMap[p]=Q,n.directionalShadowMatrix[p]=C.shadow.matrix,b++}n.directional[p]=$,p++}else if(C.isSpotLight){const $=t.get(C);$.position.setFromMatrixPosition(C.matrixWorld),$.color.copy(I).multiplyScalar(F),$.distance=V,$.coneCos=Math.cos(C.angle),$.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),$.decay=C.decay,n.spot[_]=$;const it=C.shadow;if(C.map&&(n.spotLightMap[E]=C.map,E++,it.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[_]=it.matrix,C.castShadow){const j=e.get(C);j.shadowIntensity=it.intensity,j.shadowBias=it.bias,j.shadowNormalBias=it.normalBias,j.shadowRadius=it.radius,j.shadowMapSize=it.mapSize,n.spotShadow[_]=j,n.spotShadowMap[_]=Q,v++}_++}else if(C.isRectAreaLight){const $=t.get(C);$.color.copy(I).multiplyScalar(F),$.halfWidth.set(C.width*.5,0,0),$.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=$,m++}else if(C.isPointLight){const $=t.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity),$.distance=C.distance,$.decay=C.decay,C.castShadow){const it=C.shadow,j=e.get(C);j.shadowIntensity=it.intensity,j.shadowBias=it.bias,j.shadowNormalBias=it.normalBias,j.shadowRadius=it.radius,j.shadowMapSize=it.mapSize,j.shadowCameraNear=it.camera.near,j.shadowCameraFar=it.camera.far,n.pointShadow[g]=j,n.pointShadowMap[g]=Q,n.pointShadowMatrix[g]=C.shadow.matrix,y++}n.point[g]=$,g++}else if(C.isHemisphereLight){const $=t.get(C);$.skyColor.copy(C.color).multiplyScalar(F),$.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[f]=$,f++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const A=n.hash;(A.directionalLength!==p||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==f||A.numDirectionalShadows!==b||A.numPointShadows!==y||A.numSpotShadows!==v||A.numSpotMaps!==E||A.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+E-w,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,A.directionalLength=p,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=f,A.numDirectionalShadows=b,A.numPointShadows=y,A.numSpotShadows=v,A.numSpotMaps=E,A.numLightProbes=R,n.version=gm++)}function l(c,h){let d=0,u=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,b=c.length;f<b;f++){const y=c[f];if(y.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(y.isSpotLight){const v=n.spot[p];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),p++}else if(y.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const v=n.point[u];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),u++}else if(y.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function xl(r){const t=new xm(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function vm(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new xl(r),t.set(i,[a])):s>=o.length?(a=new xl(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Mm extends Qn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ph,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class bm extends Qn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const ym=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sm=`uniform sampler2D shadow_pass;
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
}`;function wm(r,t,e){let n=new ao;const i=new Dt,s=new Dt,o=new ie,a=new Mm({depthPacking:mh}),l=new bm,c={},h=e.maxTextureSize,d={[On]:De,[De]:On,[$t]:$t},u=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:ym,fragmentShader:Sm}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ie;g.setAttribute("position",new Ue(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new nt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yl;let f=this.type;this.render=function(w,R,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const M=r.getRenderTarget(),x=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),I=r.state;I.setBlending(In),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=f!==xn&&this.type===xn,V=f===xn&&this.type!==xn;for(let Q=0,$=w.length;Q<$;Q++){const it=w[Q],j=it.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;i.copy(j.mapSize);const ct=j.getFrameExtents();if(i.multiply(ct),s.copy(j.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ct.x),i.x=s.x*ct.x,j.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ct.y),i.y=s.y*ct.y,j.mapSize.y=s.y)),j.map===null||F===!0||V===!0){const Et=this.type!==xn?{minFilter:rn,magFilter:rn}:{};j.map!==null&&j.map.dispose(),j.map=new Jn(i.x,i.y,Et),j.map.texture.name=it.name+".shadowMap",j.camera.updateProjectionMatrix()}r.setRenderTarget(j.map),r.clear();const gt=j.getViewportCount();for(let Et=0;Et<gt;Et++){const Ot=j.getViewport(Et);o.set(s.x*Ot.x,s.y*Ot.y,s.x*Ot.z,s.y*Ot.w),I.viewport(o),j.updateMatrices(it,Et),n=j.getFrustum(),v(R,A,j.camera,it,this.type)}j.isPointLightShadow!==!0&&this.type===xn&&b(j,A),j.needsUpdate=!1}f=this.type,m.needsUpdate=!1,r.setRenderTarget(M,x,C)};function b(w,R){const A=t.update(_);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Jn(i.x,i.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(R,null,A,u,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(R,null,A,p,_,null)}function y(w,R,A,M){let x=null;const C=A.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)x=C;else if(x=A.isPointLight===!0?l:a,r.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const I=x.uuid,F=R.uuid;let V=c[I];V===void 0&&(V={},c[I]=V);let Q=V[F];Q===void 0&&(Q=x.clone(),V[F]=Q,R.addEventListener("dispose",E)),x=Q}if(x.visible=R.visible,x.wireframe=R.wireframe,M===xn?x.side=R.shadowSide!==null?R.shadowSide:R.side:x.side=R.shadowSide!==null?R.shadowSide:d[R.side],x.alphaMap=R.alphaMap,x.alphaTest=R.alphaTest,x.map=R.map,x.clipShadows=R.clipShadows,x.clippingPlanes=R.clippingPlanes,x.clipIntersection=R.clipIntersection,x.displacementMap=R.displacementMap,x.displacementScale=R.displacementScale,x.displacementBias=R.displacementBias,x.wireframeLinewidth=R.wireframeLinewidth,x.linewidth=R.linewidth,A.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const I=r.properties.get(x);I.light=A}return x}function v(w,R,A,M,x){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===xn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,w.matrixWorld);const F=t.update(w),V=w.material;if(Array.isArray(V)){const Q=F.groups;for(let $=0,it=Q.length;$<it;$++){const j=Q[$],ct=V[j.materialIndex];if(ct&&ct.visible){const gt=y(w,ct,M,x);w.onBeforeShadow(r,w,R,A,F,gt,j),r.renderBufferDirect(A,null,F,gt,w,j),w.onAfterShadow(r,w,R,A,F,gt,j)}}}else if(V.visible){const Q=y(w,V,M,x);w.onBeforeShadow(r,w,R,A,F,Q,null),r.renderBufferDirect(A,null,F,Q,w,null),w.onAfterShadow(r,w,R,A,F,Q,null)}}const I=w.children;for(let F=0,V=I.length;F<V;F++)v(I[F],R,A,M,x)}function E(w){w.target.removeEventListener("dispose",E);for(const A in c){const M=c[A],x=w.target.uuid;x in M&&(M[x].dispose(),delete M[x])}}}const Tm={[sa]:aa,[oa]:ha,[la]:da,[Ai]:ca,[aa]:sa,[ha]:oa,[da]:la,[ca]:Ai};function Em(r,t){function e(){let U=!1;const ut=new ie;let q=null;const H=new ie(0,0,0,0);return{setMask:function(ot){q!==ot&&!U&&(r.colorMask(ot,ot,ot,ot),q=ot)},setLocked:function(ot){U=ot},setClear:function(ot,ft,Bt,ue,Te){Te===!0&&(ot*=ue,ft*=ue,Bt*=ue),ut.set(ot,ft,Bt,ue),H.equals(ut)===!1&&(r.clearColor(ot,ft,Bt,ue),H.copy(ut))},reset:function(){U=!1,q=null,H.set(-1,0,0,0)}}}function n(){let U=!1,ut=!1,q=null,H=null,ot=null;return{setReversed:function(ft){if(ut!==ft){const Bt=t.get("EXT_clip_control");ut?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT);const ue=ot;ot=null,this.setClear(ue)}ut=ft},getReversed:function(){return ut},setTest:function(ft){ft?pt(r.DEPTH_TEST):xt(r.DEPTH_TEST)},setMask:function(ft){q!==ft&&!U&&(r.depthMask(ft),q=ft)},setFunc:function(ft){if(ut&&(ft=Tm[ft]),H!==ft){switch(ft){case sa:r.depthFunc(r.NEVER);break;case aa:r.depthFunc(r.ALWAYS);break;case oa:r.depthFunc(r.LESS);break;case Ai:r.depthFunc(r.LEQUAL);break;case la:r.depthFunc(r.EQUAL);break;case ca:r.depthFunc(r.GEQUAL);break;case ha:r.depthFunc(r.GREATER);break;case da:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}H=ft}},setLocked:function(ft){U=ft},setClear:function(ft){ot!==ft&&(ut&&(ft=1-ft),r.clearDepth(ft),ot=ft)},reset:function(){U=!1,q=null,H=null,ot=null,ut=!1}}}function i(){let U=!1,ut=null,q=null,H=null,ot=null,ft=null,Bt=null,ue=null,Te=null;return{setTest:function(te){U||(te?pt(r.STENCIL_TEST):xt(r.STENCIL_TEST))},setMask:function(te){ut!==te&&!U&&(r.stencilMask(te),ut=te)},setFunc:function(te,je,cn){(q!==te||H!==je||ot!==cn)&&(r.stencilFunc(te,je,cn),q=te,H=je,ot=cn)},setOp:function(te,je,cn){(ft!==te||Bt!==je||ue!==cn)&&(r.stencilOp(te,je,cn),ft=te,Bt=je,ue=cn)},setLocked:function(te){U=te},setClear:function(te){Te!==te&&(r.clearStencil(te),Te=te)},reset:function(){U=!1,ut=null,q=null,H=null,ot=null,ft=null,Bt=null,ue=null,Te=null}}}const s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,p=[],g=null,_=!1,m=null,f=null,b=null,y=null,v=null,E=null,w=null,R=new Ut(0,0,0),A=0,M=!1,x=null,C=null,I=null,F=null,V=null;const Q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,it=0;const j=r.getParameter(r.VERSION);j.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(j)[1]),$=it>=1):j.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),$=it>=2);let ct=null,gt={};const Et=r.getParameter(r.SCISSOR_BOX),Ot=r.getParameter(r.VIEWPORT),Yt=new ie().fromArray(Et),J=new ie().fromArray(Ot);function rt(U,ut,q,H){const ot=new Uint8Array(4),ft=r.createTexture();r.bindTexture(U,ft),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Bt=0;Bt<q;Bt++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(ut,0,r.RGBA,1,1,H,0,r.RGBA,r.UNSIGNED_BYTE,ot):r.texImage2D(ut+Bt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ot);return ft}const bt={};bt[r.TEXTURE_2D]=rt(r.TEXTURE_2D,r.TEXTURE_2D,1),bt[r.TEXTURE_CUBE_MAP]=rt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),bt[r.TEXTURE_2D_ARRAY]=rt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),bt[r.TEXTURE_3D]=rt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),pt(r.DEPTH_TEST),o.setFunc(Ai),Wt(!1),qt(wo),pt(r.CULL_FACE),O(In);function pt(U){h[U]!==!0&&(r.enable(U),h[U]=!0)}function xt(U){h[U]!==!1&&(r.disable(U),h[U]=!1)}function It(U,ut){return d[U]!==ut?(r.bindFramebuffer(U,ut),d[U]=ut,U===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=ut),U===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=ut),!0):!1}function Ht(U,ut){let q=p,H=!1;if(U){q=u.get(ut),q===void 0&&(q=[],u.set(ut,q));const ot=U.textures;if(q.length!==ot.length||q[0]!==r.COLOR_ATTACHMENT0){for(let ft=0,Bt=ot.length;ft<Bt;ft++)q[ft]=r.COLOR_ATTACHMENT0+ft;q.length=ot.length,H=!0}}else q[0]!==r.BACK&&(q[0]=r.BACK,H=!0);H&&r.drawBuffers(q)}function se(U){return g!==U?(r.useProgram(U),g=U,!0):!1}const Vt={[jn]:r.FUNC_ADD,[Hc]:r.FUNC_SUBTRACT,[Gc]:r.FUNC_REVERSE_SUBTRACT};Vt[Vc]=r.MIN,Vt[Wc]=r.MAX;const le={[Xc]:r.ZERO,[qc]:r.ONE,[$c]:r.SRC_COLOR,[ia]:r.SRC_ALPHA,[Qc]:r.SRC_ALPHA_SATURATE,[Kc]:r.DST_COLOR,[jc]:r.DST_ALPHA,[Yc]:r.ONE_MINUS_SRC_COLOR,[ra]:r.ONE_MINUS_SRC_ALPHA,[Jc]:r.ONE_MINUS_DST_COLOR,[Zc]:r.ONE_MINUS_DST_ALPHA,[th]:r.CONSTANT_COLOR,[eh]:r.ONE_MINUS_CONSTANT_COLOR,[nh]:r.CONSTANT_ALPHA,[ih]:r.ONE_MINUS_CONSTANT_ALPHA};function O(U,ut,q,H,ot,ft,Bt,ue,Te,te){if(U===In){_===!0&&(xt(r.BLEND),_=!1);return}if(_===!1&&(pt(r.BLEND),_=!0),U!==kc){if(U!==m||te!==M){if((f!==jn||v!==jn)&&(r.blendEquation(r.FUNC_ADD),f=jn,v=jn),te)switch(U){case wi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case na:r.blendFunc(r.ONE,r.ONE);break;case To:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Eo:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case wi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case na:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case To:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Eo:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,y=null,E=null,w=null,R.set(0,0,0),A=0,m=U,M=te}return}ot=ot||ut,ft=ft||q,Bt=Bt||H,(ut!==f||ot!==v)&&(r.blendEquationSeparate(Vt[ut],Vt[ot]),f=ut,v=ot),(q!==b||H!==y||ft!==E||Bt!==w)&&(r.blendFuncSeparate(le[q],le[H],le[ft],le[Bt]),b=q,y=H,E=ft,w=Bt),(ue.equals(R)===!1||Te!==A)&&(r.blendColor(ue.r,ue.g,ue.b,Te),R.copy(ue),A=Te),m=U,M=!1}function me(U,ut){U.side===$t?xt(r.CULL_FACE):pt(r.CULL_FACE);let q=U.side===De;ut&&(q=!q),Wt(q),U.blending===wi&&U.transparent===!1?O(In):O(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const H=U.stencilWrite;a.setTest(H),H&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Kt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?pt(r.SAMPLE_ALPHA_TO_COVERAGE):xt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(U){x!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),x=U)}function qt(U){U!==Oc?(pt(r.CULL_FACE),U!==C&&(U===wo?r.cullFace(r.BACK):U===Bc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):xt(r.CULL_FACE),C=U}function At(U){U!==I&&($&&r.lineWidth(U),I=U)}function Kt(U,ut,q){U?(pt(r.POLYGON_OFFSET_FILL),(F!==ut||V!==q)&&(r.polygonOffset(ut,q),F=ut,V=q)):xt(r.POLYGON_OFFSET_FILL)}function yt(U){U?pt(r.SCISSOR_TEST):xt(r.SCISSOR_TEST)}function P(U){U===void 0&&(U=r.TEXTURE0+Q-1),ct!==U&&(r.activeTexture(U),ct=U)}function S(U,ut,q){q===void 0&&(ct===null?q=r.TEXTURE0+Q-1:q=ct);let H=gt[q];H===void 0&&(H={type:void 0,texture:void 0},gt[q]=H),(H.type!==U||H.texture!==ut)&&(ct!==q&&(r.activeTexture(q),ct=q),r.bindTexture(U,ut||bt[U]),H.type=U,H.texture=ut)}function k(){const U=gt[ct];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Z(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function vt(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function L(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function G(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function at(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function et(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function lt(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(U){Yt.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),Yt.copy(U))}function ht(U){J.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),J.copy(U))}function Pt(U,ut){let q=c.get(ut);q===void 0&&(q=new WeakMap,c.set(ut,q));let H=q.get(U);H===void 0&&(H=r.getUniformBlockIndex(ut,U.name),q.set(U,H))}function Ct(U,ut){const H=c.get(ut).get(U);l.get(ut)!==H&&(r.uniformBlockBinding(ut,H,U.__bindingPointIndex),l.set(ut,H))}function Xt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},ct=null,gt={},d={},u=new WeakMap,p=[],g=null,_=!1,m=null,f=null,b=null,y=null,v=null,E=null,w=null,R=new Ut(0,0,0),A=0,M=!1,x=null,C=null,I=null,F=null,V=null,Yt.set(0,0,r.canvas.width,r.canvas.height),J.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:pt,disable:xt,bindFramebuffer:It,drawBuffers:Ht,useProgram:se,setBlending:O,setMaterial:me,setFlipSided:Wt,setCullFace:qt,setLineWidth:At,setPolygonOffset:Kt,setScissorTest:yt,activeTexture:P,bindTexture:S,unbindTexture:k,compressedTexImage2D:Z,compressedTexImage3D:tt,texImage2D:et,texImage3D:lt,updateUBOMapping:Pt,uniformBlockBinding:Ct,texStorage2D:at,texStorage3D:Y,texSubImage2D:K,texSubImage3D:vt,compressedTexSubImage2D:L,compressedTexSubImage3D:G,scissor:Mt,viewport:ht,reset:Xt}}function vl(r,t,e,n){const i=Am(n);switch(e){case Ql:return r*t;case ec:return r*t;case nc:return r*t*2;case ic:return r*t/i.components*i.byteLength;case eo:return r*t/i.components*i.byteLength;case rc:return r*t*2/i.components*i.byteLength;case no:return r*t*2/i.components*i.byteLength;case tc:return r*t*3/i.components*i.byteLength;case nn:return r*t*4/i.components*i.byteLength;case io:return r*t*4/i.components*i.byteLength;case kr:case Hr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Gr:case Vr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ga:case xa:return Math.max(r,16)*Math.max(t,8)/4;case ma:case _a:return Math.max(r,8)*Math.max(t,8)/2;case va:case Ma:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ba:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ya:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Sa:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case wa:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Ea:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Aa:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Ra:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Ca:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Pa:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case La:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Ua:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Da:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Ia:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Na:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Wr:case Fa:case Oa:return Math.ceil(r/4)*Math.ceil(t/4)*16;case sc:case Ba:return Math.ceil(r/4)*Math.ceil(t/4)*8;case za:case ka:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Am(r){switch(r){case yn:case Zl:return{byteLength:1,components:1};case Ji:case Kl:case er:return{byteLength:2,components:1};case Qa:case to:return{byteLength:2,components:4};case Kn:case Ja:case vn:return{byteLength:4,components:1};case Jl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function Rm(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Dt,h=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,S){return p?new OffscreenCanvas(P,S):Qi("canvas")}function _(P,S,k){let Z=1;const tt=yt(P);if((tt.width>k||tt.height>k)&&(Z=k/Math.max(tt.width,tt.height)),Z<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const K=Math.floor(Z*tt.width),vt=Math.floor(Z*tt.height);d===void 0&&(d=g(K,vt));const L=S?g(K,vt):d;return L.width=K,L.height=vt,L.getContext("2d").drawImage(P,0,0,K,vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+K+"x"+vt+")."),L}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),P;return P}function m(P){return P.generateMipmaps}function f(P){r.generateMipmap(P)}function b(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(P,S,k,Z,tt=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let K=S;if(S===r.RED&&(k===r.FLOAT&&(K=r.R32F),k===r.HALF_FLOAT&&(K=r.R16F),k===r.UNSIGNED_BYTE&&(K=r.R8)),S===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.R8UI),k===r.UNSIGNED_SHORT&&(K=r.R16UI),k===r.UNSIGNED_INT&&(K=r.R32UI),k===r.BYTE&&(K=r.R8I),k===r.SHORT&&(K=r.R16I),k===r.INT&&(K=r.R32I)),S===r.RG&&(k===r.FLOAT&&(K=r.RG32F),k===r.HALF_FLOAT&&(K=r.RG16F),k===r.UNSIGNED_BYTE&&(K=r.RG8)),S===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RG8UI),k===r.UNSIGNED_SHORT&&(K=r.RG16UI),k===r.UNSIGNED_INT&&(K=r.RG32UI),k===r.BYTE&&(K=r.RG8I),k===r.SHORT&&(K=r.RG16I),k===r.INT&&(K=r.RG32I)),S===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RGB8UI),k===r.UNSIGNED_SHORT&&(K=r.RGB16UI),k===r.UNSIGNED_INT&&(K=r.RGB32UI),k===r.BYTE&&(K=r.RGB8I),k===r.SHORT&&(K=r.RGB16I),k===r.INT&&(K=r.RGB32I)),S===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(K=r.RGBA16UI),k===r.UNSIGNED_INT&&(K=r.RGBA32UI),k===r.BYTE&&(K=r.RGBA8I),k===r.SHORT&&(K=r.RGBA16I),k===r.INT&&(K=r.RGBA32I)),S===r.RGB&&k===r.UNSIGNED_INT_5_9_9_9_REV&&(K=r.RGB9_E5),S===r.RGBA){const vt=tt?es:jt.getTransfer(Z);k===r.FLOAT&&(K=r.RGBA32F),k===r.HALF_FLOAT&&(K=r.RGBA16F),k===r.UNSIGNED_BYTE&&(K=vt===ee?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT_4_4_4_4&&(K=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(K=r.RGB5_A1)}return(K===r.R16F||K===r.R32F||K===r.RG16F||K===r.RG32F||K===r.RGBA16F||K===r.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function v(P,S){let k;return P?S===null||S===Kn||S===Pi?k=r.DEPTH24_STENCIL8:S===vn?k=r.DEPTH32F_STENCIL8:S===Ji&&(k=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Kn||S===Pi?k=r.DEPTH_COMPONENT24:S===vn?k=r.DEPTH_COMPONENT32F:S===Ji&&(k=r.DEPTH_COMPONENT16),k}function E(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==rn&&P.minFilter!==ze?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function w(P){const S=P.target;S.removeEventListener("dispose",w),A(S),S.isVideoTexture&&h.delete(S)}function R(P){const S=P.target;S.removeEventListener("dispose",R),x(S)}function A(P){const S=n.get(P);if(S.__webglInit===void 0)return;const k=P.source,Z=u.get(k);if(Z){const tt=Z[S.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&M(P),Object.keys(Z).length===0&&u.delete(k)}n.remove(P)}function M(P){const S=n.get(P);r.deleteTexture(S.__webglTexture);const k=P.source,Z=u.get(k);delete Z[S.__cacheKey],o.memory.textures--}function x(P){const S=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let tt=0;tt<S.__webglFramebuffer[Z].length;tt++)r.deleteFramebuffer(S.__webglFramebuffer[Z][tt]);else r.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)r.deleteFramebuffer(S.__webglFramebuffer[Z]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=P.textures;for(let Z=0,tt=k.length;Z<tt;Z++){const K=n.get(k[Z]);K.__webglTexture&&(r.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(k[Z])}n.remove(P)}let C=0;function I(){C=0}function F(){const P=C;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),C+=1,P}function V(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function Q(P,S){const k=n.get(P);if(P.isVideoTexture&&At(P),P.isRenderTargetTexture===!1&&P.version>0&&k.__version!==P.version){const Z=P.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(k,P,S);return}}e.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+S)}function $(P,S){const k=n.get(P);if(P.version>0&&k.__version!==P.version){J(k,P,S);return}e.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+S)}function it(P,S){const k=n.get(P);if(P.version>0&&k.__version!==P.version){J(k,P,S);return}e.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+S)}function j(P,S){const k=n.get(P);if(P.version>0&&k.__version!==P.version){rt(k,P,S);return}e.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+S)}const ct={[Ki]:r.REPEAT,[tn]:r.CLAMP_TO_EDGE,[pa]:r.MIRRORED_REPEAT},gt={[rn]:r.NEAREST,[fh]:r.NEAREST_MIPMAP_NEAREST,[lr]:r.NEAREST_MIPMAP_LINEAR,[ze]:r.LINEAR,[as]:r.LINEAR_MIPMAP_NEAREST,[en]:r.LINEAR_MIPMAP_LINEAR},Et={[_h]:r.NEVER,[Sh]:r.ALWAYS,[xh]:r.LESS,[ac]:r.LEQUAL,[vh]:r.EQUAL,[yh]:r.GEQUAL,[Mh]:r.GREATER,[bh]:r.NOTEQUAL};function Ot(P,S){if(S.type===vn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===ze||S.magFilter===as||S.magFilter===lr||S.magFilter===en||S.minFilter===ze||S.minFilter===as||S.minFilter===lr||S.minFilter===en)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,ct[S.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,ct[S.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,ct[S.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,gt[S.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,gt[S.minFilter]),S.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,Et[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===rn||S.minFilter!==lr&&S.minFilter!==en||S.type===vn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");r.texParameterf(P,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Yt(P,S){let k=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",w));const Z=S.source;let tt=u.get(Z);tt===void 0&&(tt={},u.set(Z,tt));const K=V(S);if(K!==P.__cacheKey){tt[K]===void 0&&(tt[K]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,k=!0),tt[K].usedTimes++;const vt=tt[P.__cacheKey];vt!==void 0&&(tt[P.__cacheKey].usedTimes--,vt.usedTimes===0&&M(S)),P.__cacheKey=K,P.__webglTexture=tt[K].texture}return k}function J(P,S,k){let Z=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=r.TEXTURE_3D);const tt=Yt(P,S),K=S.source;e.bindTexture(Z,P.__webglTexture,r.TEXTURE0+k);const vt=n.get(K);if(K.version!==vt.__version||tt===!0){e.activeTexture(r.TEXTURE0+k);const L=jt.getPrimaries(jt.workingColorSpace),G=S.colorSpace===Dn?null:jt.getPrimaries(S.colorSpace),at=S.colorSpace===Dn||L===G?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,at);let Y=_(S.image,!1,i.maxTextureSize);Y=Kt(S,Y);const et=s.convert(S.format,S.colorSpace),lt=s.convert(S.type);let Mt=y(S.internalFormat,et,lt,S.colorSpace,S.isVideoTexture);Ot(Z,S);let ht;const Pt=S.mipmaps,Ct=S.isVideoTexture!==!0,Xt=vt.__version===void 0||tt===!0,U=K.dataReady,ut=E(S,Y);if(S.isDepthTexture)Mt=v(S.format===Li,S.type),Xt&&(Ct?e.texStorage2D(r.TEXTURE_2D,1,Mt,Y.width,Y.height):e.texImage2D(r.TEXTURE_2D,0,Mt,Y.width,Y.height,0,et,lt,null));else if(S.isDataTexture)if(Pt.length>0){Ct&&Xt&&e.texStorage2D(r.TEXTURE_2D,ut,Mt,Pt[0].width,Pt[0].height);for(let q=0,H=Pt.length;q<H;q++)ht=Pt[q],Ct?U&&e.texSubImage2D(r.TEXTURE_2D,q,0,0,ht.width,ht.height,et,lt,ht.data):e.texImage2D(r.TEXTURE_2D,q,Mt,ht.width,ht.height,0,et,lt,ht.data);S.generateMipmaps=!1}else Ct?(Xt&&e.texStorage2D(r.TEXTURE_2D,ut,Mt,Y.width,Y.height),U&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Y.width,Y.height,et,lt,Y.data)):e.texImage2D(r.TEXTURE_2D,0,Mt,Y.width,Y.height,0,et,lt,Y.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ct&&Xt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ut,Mt,Pt[0].width,Pt[0].height,Y.depth);for(let q=0,H=Pt.length;q<H;q++)if(ht=Pt[q],S.format!==nn)if(et!==null)if(Ct){if(U)if(S.layerUpdates.size>0){const ot=vl(ht.width,ht.height,S.format,S.type);for(const ft of S.layerUpdates){const Bt=ht.data.subarray(ft*ot/ht.data.BYTES_PER_ELEMENT,(ft+1)*ot/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,ft,ht.width,ht.height,1,et,Bt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,ht.width,ht.height,Y.depth,et,ht.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,q,Mt,ht.width,ht.height,Y.depth,0,ht.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ct?U&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,ht.width,ht.height,Y.depth,et,lt,ht.data):e.texImage3D(r.TEXTURE_2D_ARRAY,q,Mt,ht.width,ht.height,Y.depth,0,et,lt,ht.data)}else{Ct&&Xt&&e.texStorage2D(r.TEXTURE_2D,ut,Mt,Pt[0].width,Pt[0].height);for(let q=0,H=Pt.length;q<H;q++)ht=Pt[q],S.format!==nn?et!==null?Ct?U&&e.compressedTexSubImage2D(r.TEXTURE_2D,q,0,0,ht.width,ht.height,et,ht.data):e.compressedTexImage2D(r.TEXTURE_2D,q,Mt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ct?U&&e.texSubImage2D(r.TEXTURE_2D,q,0,0,ht.width,ht.height,et,lt,ht.data):e.texImage2D(r.TEXTURE_2D,q,Mt,ht.width,ht.height,0,et,lt,ht.data)}else if(S.isDataArrayTexture)if(Ct){if(Xt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ut,Mt,Y.width,Y.height,Y.depth),U)if(S.layerUpdates.size>0){const q=vl(Y.width,Y.height,S.format,S.type);for(const H of S.layerUpdates){const ot=Y.data.subarray(H*q/Y.data.BYTES_PER_ELEMENT,(H+1)*q/Y.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,H,Y.width,Y.height,1,et,lt,ot)}S.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,et,lt,Y.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Mt,Y.width,Y.height,Y.depth,0,et,lt,Y.data);else if(S.isData3DTexture)Ct?(Xt&&e.texStorage3D(r.TEXTURE_3D,ut,Mt,Y.width,Y.height,Y.depth),U&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,et,lt,Y.data)):e.texImage3D(r.TEXTURE_3D,0,Mt,Y.width,Y.height,Y.depth,0,et,lt,Y.data);else if(S.isFramebufferTexture){if(Xt)if(Ct)e.texStorage2D(r.TEXTURE_2D,ut,Mt,Y.width,Y.height);else{let q=Y.width,H=Y.height;for(let ot=0;ot<ut;ot++)e.texImage2D(r.TEXTURE_2D,ot,Mt,q,H,0,et,lt,null),q>>=1,H>>=1}}else if(Pt.length>0){if(Ct&&Xt){const q=yt(Pt[0]);e.texStorage2D(r.TEXTURE_2D,ut,Mt,q.width,q.height)}for(let q=0,H=Pt.length;q<H;q++)ht=Pt[q],Ct?U&&e.texSubImage2D(r.TEXTURE_2D,q,0,0,et,lt,ht):e.texImage2D(r.TEXTURE_2D,q,Mt,et,lt,ht);S.generateMipmaps=!1}else if(Ct){if(Xt){const q=yt(Y);e.texStorage2D(r.TEXTURE_2D,ut,Mt,q.width,q.height)}U&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,et,lt,Y)}else e.texImage2D(r.TEXTURE_2D,0,Mt,et,lt,Y);m(S)&&f(Z),vt.__version=K.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function rt(P,S,k){if(S.image.length!==6)return;const Z=Yt(P,S),tt=S.source;e.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+k);const K=n.get(tt);if(tt.version!==K.__version||Z===!0){e.activeTexture(r.TEXTURE0+k);const vt=jt.getPrimaries(jt.workingColorSpace),L=S.colorSpace===Dn?null:jt.getPrimaries(S.colorSpace),G=S.colorSpace===Dn||vt===L?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,G);const at=S.isCompressedTexture||S.image[0].isCompressedTexture,Y=S.image[0]&&S.image[0].isDataTexture,et=[];for(let H=0;H<6;H++)!at&&!Y?et[H]=_(S.image[H],!0,i.maxCubemapSize):et[H]=Y?S.image[H].image:S.image[H],et[H]=Kt(S,et[H]);const lt=et[0],Mt=s.convert(S.format,S.colorSpace),ht=s.convert(S.type),Pt=y(S.internalFormat,Mt,ht,S.colorSpace),Ct=S.isVideoTexture!==!0,Xt=K.__version===void 0||Z===!0,U=tt.dataReady;let ut=E(S,lt);Ot(r.TEXTURE_CUBE_MAP,S);let q;if(at){Ct&&Xt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ut,Pt,lt.width,lt.height);for(let H=0;H<6;H++){q=et[H].mipmaps;for(let ot=0;ot<q.length;ot++){const ft=q[ot];S.format!==nn?Mt!==null?Ct?U&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,ot,0,0,ft.width,ft.height,Mt,ft.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,ot,Pt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ct?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,ot,0,0,ft.width,ft.height,Mt,ht,ft.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,ot,Pt,ft.width,ft.height,0,Mt,ht,ft.data)}}}else{if(q=S.mipmaps,Ct&&Xt){q.length>0&&ut++;const H=yt(et[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,ut,Pt,H.width,H.height)}for(let H=0;H<6;H++)if(Y){Ct?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,et[H].width,et[H].height,Mt,ht,et[H].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,Pt,et[H].width,et[H].height,0,Mt,ht,et[H].data);for(let ot=0;ot<q.length;ot++){const Bt=q[ot].image[H].image;Ct?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,ot+1,0,0,Bt.width,Bt.height,Mt,ht,Bt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,ot+1,Pt,Bt.width,Bt.height,0,Mt,ht,Bt.data)}}else{Ct?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,Mt,ht,et[H]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,Pt,Mt,ht,et[H]);for(let ot=0;ot<q.length;ot++){const ft=q[ot];Ct?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,ot+1,0,0,Mt,ht,ft.image[H]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+H,ot+1,Pt,Mt,ht,ft.image[H])}}}m(S)&&f(r.TEXTURE_CUBE_MAP),K.__version=tt.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function bt(P,S,k,Z,tt,K){const vt=s.convert(k.format,k.colorSpace),L=s.convert(k.type),G=y(k.internalFormat,vt,L,k.colorSpace),at=n.get(S),Y=n.get(k);if(Y.__renderTarget=S,!at.__hasExternalTextures){const et=Math.max(1,S.width>>K),lt=Math.max(1,S.height>>K);tt===r.TEXTURE_3D||tt===r.TEXTURE_2D_ARRAY?e.texImage3D(tt,K,G,et,lt,S.depth,0,vt,L,null):e.texImage2D(tt,K,G,et,lt,0,vt,L,null)}e.bindFramebuffer(r.FRAMEBUFFER,P),qt(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Z,tt,Y.__webglTexture,0,Wt(S)):(tt===r.TEXTURE_2D||tt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Z,tt,Y.__webglTexture,K),e.bindFramebuffer(r.FRAMEBUFFER,null)}function pt(P,S,k){if(r.bindRenderbuffer(r.RENDERBUFFER,P),S.depthBuffer){const Z=S.depthTexture,tt=Z&&Z.isDepthTexture?Z.type:null,K=v(S.stencilBuffer,tt),vt=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,L=Wt(S);qt(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,L,K,S.width,S.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,L,K,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,K,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,vt,r.RENDERBUFFER,P)}else{const Z=S.textures;for(let tt=0;tt<Z.length;tt++){const K=Z[tt],vt=s.convert(K.format,K.colorSpace),L=s.convert(K.type),G=y(K.internalFormat,vt,L,K.colorSpace),at=Wt(S);k&&qt(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,at,G,S.width,S.height):qt(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,at,G,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,G,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function xt(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(S.depthTexture);Z.__renderTarget=S,(!Z.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Q(S.depthTexture,0);const tt=Z.__webglTexture,K=Wt(S);if(S.depthTexture.format===Ti)qt(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0);else if(S.depthTexture.format===Li)qt(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function It(P){const S=n.get(P),k=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){const Z=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Z){const tt=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Z.removeEventListener("dispose",tt)};Z.addEventListener("dispose",tt),S.__depthDisposeCallback=tt}S.__boundDepthTexture=Z}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");xt(S.__webglFramebuffer,P)}else if(k){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]===void 0)S.__webglDepthbuffer[Z]=r.createRenderbuffer(),pt(S.__webglDepthbuffer[Z],P,!1);else{const tt=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer[Z];r.bindRenderbuffer(r.RENDERBUFFER,K),r.framebufferRenderbuffer(r.FRAMEBUFFER,tt,r.RENDERBUFFER,K)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),pt(S.__webglDepthbuffer,P,!1);else{const Z=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,tt=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,tt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,tt)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Ht(P,S,k){const Z=n.get(P);S!==void 0&&bt(Z.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&It(P)}function se(P){const S=P.texture,k=n.get(P),Z=n.get(S);P.addEventListener("dispose",R);const tt=P.textures,K=P.isWebGLCubeRenderTarget===!0,vt=tt.length>1;if(vt||(Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture()),Z.__version=S.version,o.memory.textures++),K){k.__webglFramebuffer=[];for(let L=0;L<6;L++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[L]=[];for(let G=0;G<S.mipmaps.length;G++)k.__webglFramebuffer[L][G]=r.createFramebuffer()}else k.__webglFramebuffer[L]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let L=0;L<S.mipmaps.length;L++)k.__webglFramebuffer[L]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(vt)for(let L=0,G=tt.length;L<G;L++){const at=n.get(tt[L]);at.__webglTexture===void 0&&(at.__webglTexture=r.createTexture(),o.memory.textures++)}if(P.samples>0&&qt(P)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let L=0;L<tt.length;L++){const G=tt[L];k.__webglColorRenderbuffer[L]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[L]);const at=s.convert(G.format,G.colorSpace),Y=s.convert(G.type),et=y(G.internalFormat,at,Y,G.colorSpace,P.isXRRenderTarget===!0),lt=Wt(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,lt,et,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+L,r.RENDERBUFFER,k.__webglColorRenderbuffer[L])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),pt(k.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(K){e.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),Ot(r.TEXTURE_CUBE_MAP,S);for(let L=0;L<6;L++)if(S.mipmaps&&S.mipmaps.length>0)for(let G=0;G<S.mipmaps.length;G++)bt(k.__webglFramebuffer[L][G],P,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+L,G);else bt(k.__webglFramebuffer[L],P,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+L,0);m(S)&&f(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let L=0,G=tt.length;L<G;L++){const at=tt[L],Y=n.get(at);e.bindTexture(r.TEXTURE_2D,Y.__webglTexture),Ot(r.TEXTURE_2D,at),bt(k.__webglFramebuffer,P,at,r.COLOR_ATTACHMENT0+L,r.TEXTURE_2D,0),m(at)&&f(r.TEXTURE_2D)}e.unbindTexture()}else{let L=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(L=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(L,Z.__webglTexture),Ot(L,S),S.mipmaps&&S.mipmaps.length>0)for(let G=0;G<S.mipmaps.length;G++)bt(k.__webglFramebuffer[G],P,S,r.COLOR_ATTACHMENT0,L,G);else bt(k.__webglFramebuffer,P,S,r.COLOR_ATTACHMENT0,L,0);m(S)&&f(L),e.unbindTexture()}P.depthBuffer&&It(P)}function Vt(P){const S=P.textures;for(let k=0,Z=S.length;k<Z;k++){const tt=S[k];if(m(tt)){const K=b(P),vt=n.get(tt).__webglTexture;e.bindTexture(K,vt),f(K),e.unbindTexture()}}}const le=[],O=[];function me(P){if(P.samples>0){if(qt(P)===!1){const S=P.textures,k=P.width,Z=P.height;let tt=r.COLOR_BUFFER_BIT;const K=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,vt=n.get(P),L=S.length>1;if(L)for(let G=0;G<S.length;G++)e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+G,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+G,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let G=0;G<S.length;G++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(tt|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(tt|=r.STENCIL_BUFFER_BIT)),L){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,vt.__webglColorRenderbuffer[G]);const at=n.get(S[G]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,at,0)}r.blitFramebuffer(0,0,k,Z,0,0,k,Z,tt,r.NEAREST),l===!0&&(le.length=0,O.length=0,le.push(r.COLOR_ATTACHMENT0+G),P.depthBuffer&&P.resolveDepthBuffer===!1&&(le.push(K),O.push(K),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,O)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,le))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),L)for(let G=0;G<S.length;G++){e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+G,r.RENDERBUFFER,vt.__webglColorRenderbuffer[G]);const at=n.get(S[G]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+G,r.TEXTURE_2D,at,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const S=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function Wt(P){return Math.min(i.maxSamples,P.samples)}function qt(P){const S=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function At(P){const S=o.render.frame;h.get(P)!==S&&(h.set(P,S),P.update())}function Kt(P,S){const k=P.colorSpace,Z=P.format,tt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||k!==Di&&k!==Dn&&(jt.getTransfer(k)===ee?(Z!==nn||tt!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}function yt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=I,this.setTexture2D=Q,this.setTexture2DArray=$,this.setTexture3D=it,this.setTextureCube=j,this.rebindTextures=Ht,this.setupRenderTarget=se,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=qt}function Cm(r,t){function e(n,i=Dn){let s;const o=jt.getTransfer(i);if(n===yn)return r.UNSIGNED_BYTE;if(n===Qa)return r.UNSIGNED_SHORT_4_4_4_4;if(n===to)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Jl)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Zl)return r.BYTE;if(n===Kl)return r.SHORT;if(n===Ji)return r.UNSIGNED_SHORT;if(n===Ja)return r.INT;if(n===Kn)return r.UNSIGNED_INT;if(n===vn)return r.FLOAT;if(n===er)return r.HALF_FLOAT;if(n===Ql)return r.ALPHA;if(n===tc)return r.RGB;if(n===nn)return r.RGBA;if(n===ec)return r.LUMINANCE;if(n===nc)return r.LUMINANCE_ALPHA;if(n===Ti)return r.DEPTH_COMPONENT;if(n===Li)return r.DEPTH_STENCIL;if(n===ic)return r.RED;if(n===eo)return r.RED_INTEGER;if(n===rc)return r.RG;if(n===no)return r.RG_INTEGER;if(n===io)return r.RGBA_INTEGER;if(n===kr||n===Hr||n===Gr||n===Vr)if(o===ee)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===kr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Vr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===kr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Vr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ma||n===ga||n===_a||n===xa)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ma)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ga)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_a)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===va||n===Ma||n===ba)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===va||n===Ma)return o===ee?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ba)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ya||n===Sa||n===wa||n===Ta||n===Ea||n===Aa||n===Ra||n===Ca||n===Pa||n===La||n===Ua||n===Da||n===Ia||n===Na)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ya)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sa)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wa)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ta)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ea)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Aa)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ra)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ca)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pa)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===La)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ua)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Da)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ia)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Na)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Wr||n===Fa||n===Oa)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Wr)return o===ee?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Oa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sc||n===Ba||n===za||n===ka)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Wr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ba)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===za)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ka)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Pi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class Pm extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Oe extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Lm={type:"move"};class Ns{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Lm)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Oe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Um=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dm=`
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

}`;class Im{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Re,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Bn({vertexShader:Um,fragmentShader:Dm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new nt(new Ft(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Nm extends Ii{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null;const _=new Im,m=e.getContextAttributes();let f=null,b=null;const y=[],v=[],E=new Dt;let w=null;const R=new Ve;R.viewport=new ie;const A=new Ve;A.viewport=new ie;const M=[R,A],x=new Pm;let C=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let rt=y[J];return rt===void 0&&(rt=new Ns,y[J]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(J){let rt=y[J];return rt===void 0&&(rt=new Ns,y[J]=rt),rt.getGripSpace()},this.getHand=function(J){let rt=y[J];return rt===void 0&&(rt=new Ns,y[J]=rt),rt.getHandSpace()};function F(J){const rt=v.indexOf(J.inputSource);if(rt===-1)return;const bt=y[rt];bt!==void 0&&(bt.update(J.inputSource,J.frame,c||o),bt.dispatchEvent({type:J.type,data:J.inputSource}))}function V(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",Q);for(let J=0;J<y.length;J++){const rt=v[J];rt!==null&&(v[J]=null,y[J].disconnect(rt))}C=null,I=null,_.reset(),t.setRenderTarget(f),p=null,u=null,d=null,i=null,b=null,Yt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(f=t.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",V),i.addEventListener("inputsourceschange",Q),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(E),i.renderState.layers===void 0){const rt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,e,rt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Jn(p.framebufferWidth,p.framebufferHeight,{format:nn,type:yn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let rt=null,bt=null,pt=null;m.depth&&(pt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=m.stencil?Li:Ti,bt=m.stencil?Pi:Kn);const xt={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:s};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(xt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new Jn(u.textureWidth,u.textureHeight,{format:nn,type:yn,depthTexture:new vc(u.textureWidth,u.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Yt.setContext(i),Yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Q(J){for(let rt=0;rt<J.removed.length;rt++){const bt=J.removed[rt],pt=v.indexOf(bt);pt>=0&&(v[pt]=null,y[pt].disconnect(bt))}for(let rt=0;rt<J.added.length;rt++){const bt=J.added[rt];let pt=v.indexOf(bt);if(pt===-1){for(let It=0;It<y.length;It++)if(It>=v.length){v.push(bt),pt=It;break}else if(v[It]===null){v[It]=bt,pt=It;break}if(pt===-1)break}const xt=y[pt];xt&&xt.connect(bt)}}const $=new N,it=new N;function j(J,rt,bt){$.setFromMatrixPosition(rt.matrixWorld),it.setFromMatrixPosition(bt.matrixWorld);const pt=$.distanceTo(it),xt=rt.projectionMatrix.elements,It=bt.projectionMatrix.elements,Ht=xt[14]/(xt[10]-1),se=xt[14]/(xt[10]+1),Vt=(xt[9]+1)/xt[5],le=(xt[9]-1)/xt[5],O=(xt[8]-1)/xt[0],me=(It[8]+1)/It[0],Wt=Ht*O,qt=Ht*me,At=pt/(-O+me),Kt=At*-O;if(rt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Kt),J.translateZ(At),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),xt[10]===-1)J.projectionMatrix.copy(rt.projectionMatrix),J.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const yt=Ht+At,P=se+At,S=Wt-Kt,k=qt+(pt-Kt),Z=Vt*se/P*yt,tt=le*se/P*yt;J.projectionMatrix.makePerspective(S,k,Z,tt,yt,P),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ct(J,rt){rt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(rt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let rt=J.near,bt=J.far;_.texture!==null&&(_.depthNear>0&&(rt=_.depthNear),_.depthFar>0&&(bt=_.depthFar)),x.near=A.near=R.near=rt,x.far=A.far=R.far=bt,(C!==x.near||I!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,I=x.far),R.layers.mask=J.layers.mask|2,A.layers.mask=J.layers.mask|4,x.layers.mask=R.layers.mask|A.layers.mask;const pt=J.parent,xt=x.cameras;ct(x,pt);for(let It=0;It<xt.length;It++)ct(xt[It],pt);xt.length===2?j(x,R,A):x.projectionMatrix.copy(R.projectionMatrix),gt(J,x,pt)};function gt(J,rt,bt){bt===null?J.matrix.copy(rt.matrixWorld):(J.matrix.copy(bt.matrixWorld),J.matrix.invert(),J.matrix.multiply(rt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(rt.projectionMatrix),J.projectionMatrixInverse.copy(rt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ga*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let Et=null;function Ot(J,rt){if(h=rt.getViewerPose(c||o),g=rt,h!==null){const bt=h.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let pt=!1;bt.length!==x.cameras.length&&(x.cameras.length=0,pt=!0);for(let It=0;It<bt.length;It++){const Ht=bt[It];let se=null;if(p!==null)se=p.getViewport(Ht);else{const le=d.getViewSubImage(u,Ht);se=le.viewport,It===0&&(t.setRenderTargetTextures(b,le.colorTexture,u.ignoreDepthValues?void 0:le.depthStencilTexture),t.setRenderTarget(b))}let Vt=M[It];Vt===void 0&&(Vt=new Ve,Vt.layers.enable(It),Vt.viewport=new ie,M[It]=Vt),Vt.matrix.fromArray(Ht.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Ht.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(se.x,se.y,se.width,se.height),It===0&&(x.matrix.copy(Vt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),pt===!0&&x.cameras.push(Vt)}const xt=i.enabledFeatures;if(xt&&xt.includes("depth-sensing")){const It=d.getDepthInformation(bt[0]);It&&It.isValid&&It.texture&&_.init(t,It,i.renderState)}}for(let bt=0;bt<y.length;bt++){const pt=v[bt],xt=y[bt];pt!==null&&xt!==void 0&&xt.update(pt,rt,c||o)}Et&&Et(J,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),g=null}const Yt=new _c;Yt.setAnimationLoop(Ot),this.setAnimationLoop=function(J){Et=J},this.dispose=function(){}}}const Xn=new sn,Fm=new he;function Om(r,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,pc(r)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,b,y,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,b,y):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===De&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===De&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const b=t.get(f),y=b.envMap,v=b.envMapRotation;y&&(m.envMap.value=y,Xn.copy(v),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),m.envMapRotation.value.setFromMatrix4(Fm.makeRotationFromEuler(Xn)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,b,y){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*b,m.scale.value=y*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,b){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===De&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const b=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Bm(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,y){const v=y.program;n.uniformBlockBinding(b,v)}function c(b,y){let v=i[b.id];v===void 0&&(g(b),v=h(b),i[b.id]=v,b.addEventListener("dispose",m));const E=y.program;n.updateUBOMapping(b,E);const w=t.render.frame;s[b.id]!==w&&(u(b),s[b.id]=w)}function h(b){const y=d();b.__bindingPointIndex=y;const v=r.createBuffer(),E=b.__size,w=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,E,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,v),v}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){const y=i[b.id],v=b.uniforms,E=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let w=0,R=v.length;w<R;w++){const A=Array.isArray(v[w])?v[w]:[v[w]];for(let M=0,x=A.length;M<x;M++){const C=A[M];if(p(C,w,M,E)===!0){const I=C.__offset,F=Array.isArray(C.value)?C.value:[C.value];let V=0;for(let Q=0;Q<F.length;Q++){const $=F[Q],it=_($);typeof $=="number"||typeof $=="boolean"?(C.__data[0]=$,r.bufferSubData(r.UNIFORM_BUFFER,I+V,C.__data)):$.isMatrix3?(C.__data[0]=$.elements[0],C.__data[1]=$.elements[1],C.__data[2]=$.elements[2],C.__data[3]=0,C.__data[4]=$.elements[3],C.__data[5]=$.elements[4],C.__data[6]=$.elements[5],C.__data[7]=0,C.__data[8]=$.elements[6],C.__data[9]=$.elements[7],C.__data[10]=$.elements[8],C.__data[11]=0):($.toArray(C.__data,V),V+=it.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(b,y,v,E){const w=b.value,R=y+"_"+v;if(E[R]===void 0)return typeof w=="number"||typeof w=="boolean"?E[R]=w:E[R]=w.clone(),!0;{const A=E[R];if(typeof w=="number"||typeof w=="boolean"){if(A!==w)return E[R]=w,!0}else if(A.equals(w)===!1)return A.copy(w),!0}return!1}function g(b){const y=b.uniforms;let v=0;const E=16;for(let R=0,A=y.length;R<A;R++){const M=Array.isArray(y[R])?y[R]:[y[R]];for(let x=0,C=M.length;x<C;x++){const I=M[x],F=Array.isArray(I.value)?I.value:[I.value];for(let V=0,Q=F.length;V<Q;V++){const $=F[V],it=_($),j=v%E,ct=j%it.boundary,gt=j+ct;v+=ct,gt!==0&&E-gt<it.storage&&(v+=E-gt),I.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=it.storage}}}const w=v%E;return w>0&&(v+=E-w),b.__size=v,b.__cache={},this}function _(b){const y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),y}function m(b){const y=b.target;y.removeEventListener("dispose",m);const v=o.indexOf(y.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function f(){for(const b in i)r.deleteBuffer(i[b]);o=[],i={},s={}}return{bind:l,update:c,dispose:f}}class zm{constructor(t={}){const{canvas:e=Th(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const b=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ye,this.toneMapping=Nn,this.toneMappingExposure=1;const v=this;let E=!1,w=0,R=0,A=null,M=-1,x=null;const C=new ie,I=new ie;let F=null;const V=new Ut(0);let Q=0,$=e.width,it=e.height,j=1,ct=null,gt=null;const Et=new ie(0,0,$,it),Ot=new ie(0,0,$,it);let Yt=!1;const J=new ao;let rt=!1,bt=!1;const pt=new he,xt=new he,It=new N,Ht=new ie,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Vt=!1;function le(){return A===null?j:1}let O=n;function me(T,B){return e.getContext(T,B)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ka}`),e.addEventListener("webglcontextlost",H,!1),e.addEventListener("webglcontextrestored",ot,!1),e.addEventListener("webglcontextcreationerror",ft,!1),O===null){const B="webgl2";if(O=me(B,T),O===null)throw me(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Wt,qt,At,Kt,yt,P,S,k,Z,tt,K,vt,L,G,at,Y,et,lt,Mt,ht,Pt,Ct,Xt,U;function ut(){Wt=new Wf(O),Wt.init(),Ct=new Cm(O,Wt),qt=new Bf(O,Wt,t,Ct),At=new Em(O,Wt),qt.reverseDepthBuffer&&u&&At.buffers.depth.setReversed(!0),Kt=new $f(O),yt=new dm,P=new Rm(O,Wt,At,yt,qt,Ct,Kt),S=new kf(v),k=new Vf(v),Z=new Qh(O),Xt=new Ff(O,Z),tt=new Xf(O,Z,Kt,Xt),K=new jf(O,tt,Z,Kt),Mt=new Yf(O,qt,P),Y=new zf(yt),vt=new hm(v,S,k,Wt,qt,Xt,Y),L=new Om(v,yt),G=new fm,at=new vm(Wt),lt=new Nf(v,S,k,At,K,p,l),et=new wm(v,K,qt),U=new Bm(O,Kt,qt,At),ht=new Of(O,Wt,Kt),Pt=new qf(O,Wt,Kt),Kt.programs=vt.programs,v.capabilities=qt,v.extensions=Wt,v.properties=yt,v.renderLists=G,v.shadowMap=et,v.state=At,v.info=Kt}ut();const q=new Nm(v,O);this.xr=q,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const T=Wt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Wt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(T){T!==void 0&&(j=T,this.setSize($,it,!1))},this.getSize=function(T){return T.set($,it)},this.setSize=function(T,B,W=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=T,it=B,e.width=Math.floor(T*j),e.height=Math.floor(B*j),W===!0&&(e.style.width=T+"px",e.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set($*j,it*j).floor()},this.setDrawingBufferSize=function(T,B,W){$=T,it=B,j=W,e.width=Math.floor(T*W),e.height=Math.floor(B*W),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(C)},this.getViewport=function(T){return T.copy(Et)},this.setViewport=function(T,B,W,X){T.isVector4?Et.set(T.x,T.y,T.z,T.w):Et.set(T,B,W,X),At.viewport(C.copy(Et).multiplyScalar(j).round())},this.getScissor=function(T){return T.copy(Ot)},this.setScissor=function(T,B,W,X){T.isVector4?Ot.set(T.x,T.y,T.z,T.w):Ot.set(T,B,W,X),At.scissor(I.copy(Ot).multiplyScalar(j).round())},this.getScissorTest=function(){return Yt},this.setScissorTest=function(T){At.setScissorTest(Yt=T)},this.setOpaqueSort=function(T){ct=T},this.setTransparentSort=function(T){gt=T},this.getClearColor=function(T){return T.copy(lt.getClearColor())},this.setClearColor=function(){lt.setClearColor.apply(lt,arguments)},this.getClearAlpha=function(){return lt.getClearAlpha()},this.setClearAlpha=function(){lt.setClearAlpha.apply(lt,arguments)},this.clear=function(T=!0,B=!0,W=!0){let X=0;if(T){let z=!1;if(A!==null){const st=A.texture.format;z=st===io||st===no||st===eo}if(z){const st=A.texture.type,_t=st===yn||st===Kn||st===Ji||st===Pi||st===Qa||st===to,St=lt.getClearColor(),wt=lt.getClearAlpha(),Nt=St.r,zt=St.g,Tt=St.b;_t?(g[0]=Nt,g[1]=zt,g[2]=Tt,g[3]=wt,O.clearBufferuiv(O.COLOR,0,g)):(_[0]=Nt,_[1]=zt,_[2]=Tt,_[3]=wt,O.clearBufferiv(O.COLOR,0,_))}else X|=O.COLOR_BUFFER_BIT}B&&(X|=O.DEPTH_BUFFER_BIT),W&&(X|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",H,!1),e.removeEventListener("webglcontextrestored",ot,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),G.dispose(),at.dispose(),yt.dispose(),S.dispose(),k.dispose(),K.dispose(),Xt.dispose(),U.dispose(),vt.dispose(),q.dispose(),q.removeEventListener("sessionstart",go),q.removeEventListener("sessionend",_o),zn.stop()};function H(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ot(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=Kt.autoReset,B=et.enabled,W=et.autoUpdate,X=et.needsUpdate,z=et.type;ut(),Kt.autoReset=T,et.enabled=B,et.autoUpdate=W,et.needsUpdate=X,et.type=z}function ft(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Bt(T){const B=T.target;B.removeEventListener("dispose",Bt),ue(B)}function ue(T){Te(T),yt.remove(T)}function Te(T){const B=yt.get(T).programs;B!==void 0&&(B.forEach(function(W){vt.releaseProgram(W)}),T.isShaderMaterial&&vt.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,W,X,z,st){B===null&&(B=se);const _t=z.isMesh&&z.matrixWorld.determinant()<0,St=Uc(T,B,W,X,z);At.setMaterial(X,_t);let wt=W.index,Nt=1;if(X.wireframe===!0){if(wt=tt.getWireframeAttribute(W),wt===void 0)return;Nt=2}const zt=W.drawRange,Tt=W.attributes.position;let Zt=zt.start*Nt,re=(zt.start+zt.count)*Nt;st!==null&&(Zt=Math.max(Zt,st.start*Nt),re=Math.min(re,(st.start+st.count)*Nt)),wt!==null?(Zt=Math.max(Zt,0),re=Math.min(re,wt.count)):Tt!=null&&(Zt=Math.max(Zt,0),re=Math.min(re,Tt.count));const ae=re-Zt;if(ae<0||ae===1/0)return;Xt.setup(z,X,St,W,wt);let Fe,Jt=ht;if(wt!==null&&(Fe=Z.get(wt),Jt=Pt,Jt.setIndex(Fe)),z.isMesh)X.wireframe===!0?(At.setLineWidth(X.wireframeLinewidth*le()),Jt.setMode(O.LINES)):Jt.setMode(O.TRIANGLES);else if(z.isLine){let Rt=X.linewidth;Rt===void 0&&(Rt=1),At.setLineWidth(Rt*le()),z.isLineSegments?Jt.setMode(O.LINES):z.isLineLoop?Jt.setMode(O.LINE_LOOP):Jt.setMode(O.LINE_STRIP)}else z.isPoints?Jt.setMode(O.POINTS):z.isSprite&&Jt.setMode(O.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)Jt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Wt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Rt=z._multiDrawStarts,hn=z._multiDrawCounts,Qt=z._multiDrawCount,Ze=wt?Z.get(wt).bytesPerElement:1,ti=yt.get(X).currentProgram.getUniforms();for(let ke=0;ke<Qt;ke++)ti.setValue(O,"_gl_DrawID",ke),Jt.render(Rt[ke]/Ze,hn[ke])}else if(z.isInstancedMesh)Jt.renderInstances(Zt,ae,z.count);else if(W.isInstancedBufferGeometry){const Rt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,hn=Math.min(W.instanceCount,Rt);Jt.renderInstances(Zt,ae,hn)}else Jt.render(Zt,ae)};function te(T,B,W){T.transparent===!0&&T.side===$t&&T.forceSinglePass===!1?(T.side=De,T.needsUpdate=!0,or(T,B,W),T.side=On,T.needsUpdate=!0,or(T,B,W),T.side=$t):or(T,B,W)}this.compile=function(T,B,W=null){W===null&&(W=T),f=at.get(W),f.init(B),y.push(f),W.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(f.pushLight(z),z.castShadow&&f.pushShadow(z))}),T!==W&&T.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(f.pushLight(z),z.castShadow&&f.pushShadow(z))}),f.setupLights();const X=new Set;return T.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const st=z.material;if(st)if(Array.isArray(st))for(let _t=0;_t<st.length;_t++){const St=st[_t];te(St,W,z),X.add(St)}else te(st,W,z),X.add(st)}),y.pop(),f=null,X},this.compileAsync=function(T,B,W=null){const X=this.compile(T,B,W);return new Promise(z=>{function st(){if(X.forEach(function(_t){yt.get(_t).currentProgram.isReady()&&X.delete(_t)}),X.size===0){z(T);return}setTimeout(st,10)}Wt.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let je=null;function cn(T){je&&je(T)}function go(){zn.stop()}function _o(){zn.start()}const zn=new _c;zn.setAnimationLoop(cn),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(T){je=T,q.setAnimationLoop(T),T===null?zn.stop():zn.start()},q.addEventListener("sessionstart",go),q.addEventListener("sessionend",_o),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(B),B=q.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,B,A),f=at.get(T,y.length),f.init(B),y.push(f),xt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),J.setFromProjectionMatrix(xt),bt=this.localClippingEnabled,rt=Y.init(this.clippingPlanes,bt),m=G.get(T,b.length),m.init(),b.push(m),q.enabled===!0&&q.isPresenting===!0){const st=v.xr.getDepthSensingMesh();st!==null&&ss(st,B,-1/0,v.sortObjects)}ss(T,B,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ct,gt),Vt=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Vt&&lt.addToRenderList(m,T),this.info.render.frame++,rt===!0&&Y.beginShadows();const W=f.state.shadowsArray;et.render(W,T,B),rt===!0&&Y.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,z=m.transmissive;if(f.setupLights(),B.isArrayCamera){const st=B.cameras;if(z.length>0)for(let _t=0,St=st.length;_t<St;_t++){const wt=st[_t];vo(X,z,T,wt)}Vt&&lt.render(T);for(let _t=0,St=st.length;_t<St;_t++){const wt=st[_t];xo(m,T,wt,wt.viewport)}}else z.length>0&&vo(X,z,T,B),Vt&&lt.render(T),xo(m,T,B);A!==null&&(P.updateMultisampleRenderTarget(A),P.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(v,T,B),Xt.resetDefaultState(),M=-1,x=null,y.pop(),y.length>0?(f=y[y.length-1],rt===!0&&Y.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function ss(T,B,W,X){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)f.pushLight(T),T.castShadow&&f.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||J.intersectsSprite(T)){X&&Ht.setFromMatrixPosition(T.matrixWorld).applyMatrix4(xt);const _t=K.update(T),St=T.material;St.visible&&m.push(T,_t,St,W,Ht.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||J.intersectsObject(T))){const _t=K.update(T),St=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ht.copy(T.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Ht.copy(_t.boundingSphere.center)),Ht.applyMatrix4(T.matrixWorld).applyMatrix4(xt)),Array.isArray(St)){const wt=_t.groups;for(let Nt=0,zt=wt.length;Nt<zt;Nt++){const Tt=wt[Nt],Zt=St[Tt.materialIndex];Zt&&Zt.visible&&m.push(T,_t,Zt,W,Ht.z,Tt)}}else St.visible&&m.push(T,_t,St,W,Ht.z,null)}}const st=T.children;for(let _t=0,St=st.length;_t<St;_t++)ss(st[_t],B,W,X)}function xo(T,B,W,X){const z=T.opaque,st=T.transmissive,_t=T.transparent;f.setupLightsView(W),rt===!0&&Y.setGlobalState(v.clippingPlanes,W),X&&At.viewport(C.copy(X)),z.length>0&&ar(z,B,W),st.length>0&&ar(st,B,W),_t.length>0&&ar(_t,B,W),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function vo(T,B,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[X.id]===void 0&&(f.state.transmissionRenderTarget[X.id]=new Jn(1,1,{generateMipmaps:!0,type:Wt.has("EXT_color_buffer_half_float")||Wt.has("EXT_color_buffer_float")?er:yn,minFilter:en,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const st=f.state.transmissionRenderTarget[X.id],_t=X.viewport||C;st.setSize(_t.z,_t.w);const St=v.getRenderTarget();v.setRenderTarget(st),v.getClearColor(V),Q=v.getClearAlpha(),Q<1&&v.setClearColor(16777215,.5),v.clear(),Vt&&lt.render(W);const wt=v.toneMapping;v.toneMapping=Nn;const Nt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),f.setupLightsView(X),rt===!0&&Y.setGlobalState(v.clippingPlanes,X),ar(T,W,X),P.updateMultisampleRenderTarget(st),P.updateRenderTargetMipmap(st),Wt.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let Tt=0,Zt=B.length;Tt<Zt;Tt++){const re=B[Tt],ae=re.object,Fe=re.geometry,Jt=re.material,Rt=re.group;if(Jt.side===$t&&ae.layers.test(X.layers)){const hn=Jt.side;Jt.side=De,Jt.needsUpdate=!0,Mo(ae,W,X,Fe,Jt,Rt),Jt.side=hn,Jt.needsUpdate=!0,zt=!0}}zt===!0&&(P.updateMultisampleRenderTarget(st),P.updateRenderTargetMipmap(st))}v.setRenderTarget(St),v.setClearColor(V,Q),Nt!==void 0&&(X.viewport=Nt),v.toneMapping=wt}function ar(T,B,W){const X=B.isScene===!0?B.overrideMaterial:null;for(let z=0,st=T.length;z<st;z++){const _t=T[z],St=_t.object,wt=_t.geometry,Nt=X===null?_t.material:X,zt=_t.group;St.layers.test(W.layers)&&Mo(St,B,W,wt,Nt,zt)}}function Mo(T,B,W,X,z,st){T.onBeforeRender(v,B,W,X,z,st),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),z.onBeforeRender(v,B,W,X,T,st),z.transparent===!0&&z.side===$t&&z.forceSinglePass===!1?(z.side=De,z.needsUpdate=!0,v.renderBufferDirect(W,B,X,z,T,st),z.side=On,z.needsUpdate=!0,v.renderBufferDirect(W,B,X,z,T,st),z.side=$t):v.renderBufferDirect(W,B,X,z,T,st),T.onAfterRender(v,B,W,X,z,st)}function or(T,B,W){B.isScene!==!0&&(B=se);const X=yt.get(T),z=f.state.lights,st=f.state.shadowsArray,_t=z.state.version,St=vt.getParameters(T,z.state,st,B,W),wt=vt.getProgramCacheKey(St);let Nt=X.programs;X.environment=T.isMeshStandardMaterial?B.environment:null,X.fog=B.fog,X.envMap=(T.isMeshStandardMaterial?k:S).get(T.envMap||X.environment),X.envMapRotation=X.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,Nt===void 0&&(T.addEventListener("dispose",Bt),Nt=new Map,X.programs=Nt);let zt=Nt.get(wt);if(zt!==void 0){if(X.currentProgram===zt&&X.lightsStateVersion===_t)return yo(T,St),zt}else St.uniforms=vt.getUniforms(T),T.onBeforeCompile(St,v),zt=vt.acquireProgram(St,wt),Nt.set(wt,zt),X.uniforms=St.uniforms;const Tt=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Tt.clippingPlanes=Y.uniform),yo(T,St),X.needsLights=Ic(T),X.lightsStateVersion=_t,X.needsLights&&(Tt.ambientLightColor.value=z.state.ambient,Tt.lightProbe.value=z.state.probe,Tt.directionalLights.value=z.state.directional,Tt.directionalLightShadows.value=z.state.directionalShadow,Tt.spotLights.value=z.state.spot,Tt.spotLightShadows.value=z.state.spotShadow,Tt.rectAreaLights.value=z.state.rectArea,Tt.ltc_1.value=z.state.rectAreaLTC1,Tt.ltc_2.value=z.state.rectAreaLTC2,Tt.pointLights.value=z.state.point,Tt.pointLightShadows.value=z.state.pointShadow,Tt.hemisphereLights.value=z.state.hemi,Tt.directionalShadowMap.value=z.state.directionalShadowMap,Tt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Tt.spotShadowMap.value=z.state.spotShadowMap,Tt.spotLightMatrix.value=z.state.spotLightMatrix,Tt.spotLightMap.value=z.state.spotLightMap,Tt.pointShadowMap.value=z.state.pointShadowMap,Tt.pointShadowMatrix.value=z.state.pointShadowMatrix),X.currentProgram=zt,X.uniformsList=null,zt}function bo(T){if(T.uniformsList===null){const B=T.currentProgram.getUniforms();T.uniformsList=Xr.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function yo(T,B){const W=yt.get(T);W.outputColorSpace=B.outputColorSpace,W.batching=B.batching,W.batchingColor=B.batchingColor,W.instancing=B.instancing,W.instancingColor=B.instancingColor,W.instancingMorph=B.instancingMorph,W.skinning=B.skinning,W.morphTargets=B.morphTargets,W.morphNormals=B.morphNormals,W.morphColors=B.morphColors,W.morphTargetsCount=B.morphTargetsCount,W.numClippingPlanes=B.numClippingPlanes,W.numIntersection=B.numClipIntersection,W.vertexAlphas=B.vertexAlphas,W.vertexTangents=B.vertexTangents,W.toneMapping=B.toneMapping}function Uc(T,B,W,X,z){B.isScene!==!0&&(B=se),P.resetTextureUnits();const st=B.fog,_t=X.isMeshStandardMaterial?B.environment:null,St=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Di,wt=(X.isMeshStandardMaterial?k:S).get(X.envMap||_t),Nt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,zt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Tt=!!W.morphAttributes.position,Zt=!!W.morphAttributes.normal,re=!!W.morphAttributes.color;let ae=Nn;X.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ae=v.toneMapping);const Fe=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Jt=Fe!==void 0?Fe.length:0,Rt=yt.get(X),hn=f.state.lights;if(rt===!0&&(bt===!0||T!==x)){const We=T===x&&X.id===M;Y.setState(X,T,We)}let Qt=!1;X.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==hn.state.version||Rt.outputColorSpace!==St||z.isBatchedMesh&&Rt.batching===!1||!z.isBatchedMesh&&Rt.batching===!0||z.isBatchedMesh&&Rt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Rt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Rt.instancing===!1||!z.isInstancedMesh&&Rt.instancing===!0||z.isSkinnedMesh&&Rt.skinning===!1||!z.isSkinnedMesh&&Rt.skinning===!0||z.isInstancedMesh&&Rt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Rt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Rt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Rt.instancingMorph===!1&&z.morphTexture!==null||Rt.envMap!==wt||X.fog===!0&&Rt.fog!==st||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==Y.numPlanes||Rt.numIntersection!==Y.numIntersection)||Rt.vertexAlphas!==Nt||Rt.vertexTangents!==zt||Rt.morphTargets!==Tt||Rt.morphNormals!==Zt||Rt.morphColors!==re||Rt.toneMapping!==ae||Rt.morphTargetsCount!==Jt)&&(Qt=!0):(Qt=!0,Rt.__version=X.version);let Ze=Rt.currentProgram;Qt===!0&&(Ze=or(X,B,z));let ti=!1,ke=!1,Oi=!1;const oe=Ze.getUniforms(),an=Rt.uniforms;if(At.useProgram(Ze.program)&&(ti=!0,ke=!0,Oi=!0),X.id!==M&&(M=X.id,ke=!0),ti||x!==T){At.buffers.depth.getReversed()?(pt.copy(T.projectionMatrix),Ah(pt),Rh(pt),oe.setValue(O,"projectionMatrix",pt)):oe.setValue(O,"projectionMatrix",T.projectionMatrix),oe.setValue(O,"viewMatrix",T.matrixWorldInverse);const Sn=oe.map.cameraPosition;Sn!==void 0&&Sn.setValue(O,It.setFromMatrixPosition(T.matrixWorld)),qt.logarithmicDepthBuffer&&oe.setValue(O,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&oe.setValue(O,"isOrthographic",T.isOrthographicCamera===!0),x!==T&&(x=T,ke=!0,Oi=!0)}if(z.isSkinnedMesh){oe.setOptional(O,z,"bindMatrix"),oe.setOptional(O,z,"bindMatrixInverse");const We=z.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),oe.setValue(O,"boneTexture",We.boneTexture,P))}z.isBatchedMesh&&(oe.setOptional(O,z,"batchingTexture"),oe.setValue(O,"batchingTexture",z._matricesTexture,P),oe.setOptional(O,z,"batchingIdTexture"),oe.setValue(O,"batchingIdTexture",z._indirectTexture,P),oe.setOptional(O,z,"batchingColorTexture"),z._colorsTexture!==null&&oe.setValue(O,"batchingColorTexture",z._colorsTexture,P));const Bi=W.morphAttributes;if((Bi.position!==void 0||Bi.normal!==void 0||Bi.color!==void 0)&&Mt.update(z,W,Ze),(ke||Rt.receiveShadow!==z.receiveShadow)&&(Rt.receiveShadow=z.receiveShadow,oe.setValue(O,"receiveShadow",z.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(an.envMap.value=wt,an.flipEnvMap.value=wt.isCubeTexture&&wt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&B.environment!==null&&(an.envMapIntensity.value=B.environmentIntensity),ke&&(oe.setValue(O,"toneMappingExposure",v.toneMappingExposure),Rt.needsLights&&Dc(an,Oi),st&&X.fog===!0&&L.refreshFogUniforms(an,st),L.refreshMaterialUniforms(an,X,j,it,f.state.transmissionRenderTarget[T.id]),Xr.upload(O,bo(Rt),an,P)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Xr.upload(O,bo(Rt),an,P),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&oe.setValue(O,"center",z.center),oe.setValue(O,"modelViewMatrix",z.modelViewMatrix),oe.setValue(O,"normalMatrix",z.normalMatrix),oe.setValue(O,"modelMatrix",z.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const We=X.uniformsGroups;for(let Sn=0,wn=We.length;Sn<wn;Sn++){const So=We[Sn];U.update(So,Ze),U.bind(So,Ze)}}return Ze}function Dc(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function Ic(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,B,W){yt.get(T.texture).__webglTexture=B,yt.get(T.depthTexture).__webglTexture=W;const X=yt.get(T);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||Wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,B){const W=yt.get(T);W.__webglFramebuffer=B,W.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,W=0){A=T,w=B,R=W;let X=!0,z=null,st=!1,_t=!1;if(T){const wt=yt.get(T);if(wt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(O.FRAMEBUFFER,null),X=!1;else if(wt.__webglFramebuffer===void 0)P.setupRenderTarget(T);else if(wt.__hasExternalTextures)P.rebindTextures(T,yt.get(T.texture).__webglTexture,yt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Tt=T.depthTexture;if(wt.__boundDepthTexture!==Tt){if(Tt!==null&&yt.has(Tt)&&(T.width!==Tt.image.width||T.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(T)}}const Nt=T.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(_t=!0);const zt=yt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(zt[B])?z=zt[B][W]:z=zt[B],st=!0):T.samples>0&&P.useMultisampledRTT(T)===!1?z=yt.get(T).__webglMultisampledFramebuffer:Array.isArray(zt)?z=zt[W]:z=zt,C.copy(T.viewport),I.copy(T.scissor),F=T.scissorTest}else C.copy(Et).multiplyScalar(j).floor(),I.copy(Ot).multiplyScalar(j).floor(),F=Yt;if(At.bindFramebuffer(O.FRAMEBUFFER,z)&&X&&At.drawBuffers(T,z),At.viewport(C),At.scissor(I),At.setScissorTest(F),st){const wt=yt.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+B,wt.__webglTexture,W)}else if(_t){const wt=yt.get(T.texture),Nt=B||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,wt.__webglTexture,W||0,Nt)}M=-1},this.readRenderTargetPixels=function(T,B,W,X,z,st,_t){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=yt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_t!==void 0&&(St=St[_t]),St){At.bindFramebuffer(O.FRAMEBUFFER,St);try{const wt=T.texture,Nt=wt.format,zt=wt.type;if(!qt.textureFormatReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-X&&W>=0&&W<=T.height-z&&O.readPixels(B,W,X,z,Ct.convert(Nt),Ct.convert(zt),st)}finally{const wt=A!==null?yt.get(A).__webglFramebuffer:null;At.bindFramebuffer(O.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(T,B,W,X,z,st,_t){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=yt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_t!==void 0&&(St=St[_t]),St){const wt=T.texture,Nt=wt.format,zt=wt.type;if(!qt.textureFormatReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=T.width-X&&W>=0&&W<=T.height-z){At.bindFramebuffer(O.FRAMEBUFFER,St);const Tt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Tt),O.bufferData(O.PIXEL_PACK_BUFFER,st.byteLength,O.STREAM_READ),O.readPixels(B,W,X,z,Ct.convert(Nt),Ct.convert(zt),0);const Zt=A!==null?yt.get(A).__webglFramebuffer:null;At.bindFramebuffer(O.FRAMEBUFFER,Zt);const re=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Eh(O,re,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Tt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,st),O.deleteBuffer(Tt),O.deleteSync(re),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,B=null,W=0){T.isTexture!==!0&&(Yi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,T=arguments[1]);const X=Math.pow(2,-W),z=Math.floor(T.image.width*X),st=Math.floor(T.image.height*X),_t=B!==null?B.x:0,St=B!==null?B.y:0;P.setTexture2D(T,0),O.copyTexSubImage2D(O.TEXTURE_2D,W,0,0,_t,St,z,st),At.unbindTexture()},this.copyTextureToTexture=function(T,B,W=null,X=null,z=0){T.isTexture!==!0&&(Yi("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,T=arguments[1],B=arguments[2],z=arguments[3]||0,W=null);let st,_t,St,wt,Nt,zt,Tt,Zt,re;const ae=T.isCompressedTexture?T.mipmaps[z]:T.image;W!==null?(st=W.max.x-W.min.x,_t=W.max.y-W.min.y,St=W.isBox3?W.max.z-W.min.z:1,wt=W.min.x,Nt=W.min.y,zt=W.isBox3?W.min.z:0):(st=ae.width,_t=ae.height,St=ae.depth||1,wt=0,Nt=0,zt=0),X!==null?(Tt=X.x,Zt=X.y,re=X.z):(Tt=0,Zt=0,re=0);const Fe=Ct.convert(B.format),Jt=Ct.convert(B.type);let Rt;B.isData3DTexture?(P.setTexture3D(B,0),Rt=O.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(P.setTexture2DArray(B,0),Rt=O.TEXTURE_2D_ARRAY):(P.setTexture2D(B,0),Rt=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,B.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,B.unpackAlignment);const hn=O.getParameter(O.UNPACK_ROW_LENGTH),Qt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ze=O.getParameter(O.UNPACK_SKIP_PIXELS),ti=O.getParameter(O.UNPACK_SKIP_ROWS),ke=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,ae.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ae.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,wt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Nt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,zt);const Oi=T.isDataArrayTexture||T.isData3DTexture,oe=B.isDataArrayTexture||B.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const an=yt.get(T),Bi=yt.get(B),We=yt.get(an.__renderTarget),Sn=yt.get(Bi.__renderTarget);At.bindFramebuffer(O.READ_FRAMEBUFFER,We.__webglFramebuffer),At.bindFramebuffer(O.DRAW_FRAMEBUFFER,Sn.__webglFramebuffer);for(let wn=0;wn<St;wn++)Oi&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,yt.get(T).__webglTexture,z,zt+wn),T.isDepthTexture?(oe&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,yt.get(B).__webglTexture,z,re+wn),O.blitFramebuffer(wt,Nt,st,_t,Tt,Zt,st,_t,O.DEPTH_BUFFER_BIT,O.NEAREST)):oe?O.copyTexSubImage3D(Rt,z,Tt,Zt,re+wn,wt,Nt,st,_t):O.copyTexSubImage2D(Rt,z,Tt,Zt,re+wn,wt,Nt,st,_t);At.bindFramebuffer(O.READ_FRAMEBUFFER,null),At.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else oe?T.isDataTexture||T.isData3DTexture?O.texSubImage3D(Rt,z,Tt,Zt,re,st,_t,St,Fe,Jt,ae.data):B.isCompressedArrayTexture?O.compressedTexSubImage3D(Rt,z,Tt,Zt,re,st,_t,St,Fe,ae.data):O.texSubImage3D(Rt,z,Tt,Zt,re,st,_t,St,Fe,Jt,ae):T.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,z,Tt,Zt,st,_t,Fe,Jt,ae.data):T.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,z,Tt,Zt,ae.width,ae.height,Fe,ae.data):O.texSubImage2D(O.TEXTURE_2D,z,Tt,Zt,st,_t,Fe,Jt,ae);O.pixelStorei(O.UNPACK_ROW_LENGTH,hn),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Qt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ze),O.pixelStorei(O.UNPACK_SKIP_ROWS,ti),O.pixelStorei(O.UNPACK_SKIP_IMAGES,ke),z===0&&B.generateMipmaps&&O.generateMipmap(Rt),At.unbindTexture()},this.copyTextureToTexture3D=function(T,B,W=null,X=null,z=0){return T.isTexture!==!0&&(Yi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,T=arguments[2],B=arguments[3],z=arguments[4]||0),Yi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,B,W,X,z)},this.initRenderTarget=function(T){yt.get(T).__webglFramebuffer===void 0&&P.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?P.setTextureCube(T,0):T.isData3DTexture?P.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?P.setTexture2DArray(T,0):P.setTexture2D(T,0),At.unbindTexture()},this.resetState=function(){w=0,R=0,A=null,At.reset(),Xt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}class yi{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ut(t),this.near=e,this.far=n}clone(){return new yi(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class km extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sn,this.environmentIntensity=1,this.environmentRotation=new sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Hm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ha,this.updateRanges=[],this.version=0,this.uuid=Fn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ce=new N;class Zr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix4(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyNormalMatrix(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.transformDirection(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ln(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array),s=ne(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new Ue(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Zr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Wa extends Qn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Ut(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let mi;const Vi=new N,gi=new N,_i=new N,xi=new Dt,Wi=new Dt,wc=new he,Cr=new N,Xi=new N,Pr=new N,Ml=new Dt,Fs=new Dt,bl=new Dt;class yl extends Se{constructor(t=new Wa){if(super(),this.isSprite=!0,this.type="Sprite",mi===void 0){mi=new Ie;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Hm(e,5);mi.setIndex([0,1,2,0,2,3]),mi.setAttribute("position",new Zr(n,3,0,!1)),mi.setAttribute("uv",new Zr(n,2,3,!1))}this.geometry=mi,this.material=t,this.center=new Dt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),gi.setFromMatrixScale(this.matrixWorld),wc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),_i.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&gi.multiplyScalar(-_i.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;Lr(Cr.set(-.5,-.5,0),_i,o,gi,i,s),Lr(Xi.set(.5,-.5,0),_i,o,gi,i,s),Lr(Pr.set(.5,.5,0),_i,o,gi,i,s),Ml.set(0,0),Fs.set(1,0),bl.set(1,1);let a=t.ray.intersectTriangle(Cr,Xi,Pr,!1,Vi);if(a===null&&(Lr(Xi.set(-.5,.5,0),_i,o,gi,i,s),Fs.set(0,1),a=t.ray.intersectTriangle(Cr,Pr,Xi,!1,Vi),a===null))return;const l=t.ray.origin.distanceTo(Vi);l<t.near||l>t.far||e.push({distance:l,point:Vi.clone(),uv:$e.getInterpolation(Vi,Cr,Xi,Pr,Ml,Fs,bl,new Dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Lr(r,t,e,n,i,s){xi.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Wi.x=s*xi.x-i*xi.y,Wi.y=i*xi.x+s*xi.y):Wi.copy(xi),r.copy(t),r.x+=Wi.x,r.y+=Wi.y,r.applyMatrix4(wc)}class Si extends Re{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class lo extends Ie{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new N,h=new Dt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const p=n+d/e*i;c.x=t*Math.cos(p),c.y=t*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new pe(o,3)),this.setAttribute("normal",new pe(a,3)),this.setAttribute("uv",new pe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class de extends Ie{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],d=[],u=[],p=[];let g=0;const _=[],m=n/2;let f=0;b(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new pe(d,3)),this.setAttribute("normal",new pe(u,3)),this.setAttribute("uv",new pe(p,2));function b(){const v=new N,E=new N;let w=0;const R=(e-t)/n;for(let A=0;A<=s;A++){const M=[],x=A/s,C=x*(e-t)+t;for(let I=0;I<=i;I++){const F=I/i,V=F*l+a,Q=Math.sin(V),$=Math.cos(V);E.x=C*Q,E.y=-x*n+m,E.z=C*$,d.push(E.x,E.y,E.z),v.set(Q,R,$).normalize(),u.push(v.x,v.y,v.z),p.push(F,1-x),M.push(g++)}_.push(M)}for(let A=0;A<i;A++)for(let M=0;M<s;M++){const x=_[M][A],C=_[M+1][A],I=_[M+1][A+1],F=_[M][A+1];(t>0||M!==0)&&(h.push(x,C,F),w+=3),(e>0||M!==s-1)&&(h.push(C,I,F),w+=3)}c.addGroup(f,w,0),f+=w}function y(v){const E=g,w=new Dt,R=new N;let A=0;const M=v===!0?t:e,x=v===!0?1:-1;for(let I=1;I<=i;I++)d.push(0,m*x,0),u.push(0,x,0),p.push(.5,.5),g++;const C=g;for(let I=0;I<=i;I++){const V=I/i*l+a,Q=Math.cos(V),$=Math.sin(V);R.x=M*$,R.y=m*x,R.z=M*Q,d.push(R.x,R.y,R.z),u.push(0,x,0),w.x=Q*.5+.5,w.y=$*.5*x+.5,p.push(w.x,w.y),g++}for(let I=0;I<i;I++){const F=E+I,V=C+I;v===!0?h.push(V,V+1,F):h.push(V+1,V,F),A+=3}c.addGroup(f,A,v===!0?1:2),f+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new de(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Un extends de{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Un(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class co extends Ie{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],o=[];a(i),c(n),h(),this.setAttribute("position",new pe(s,3)),this.setAttribute("normal",new pe(s.slice(),3)),this.setAttribute("uv",new pe(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const y=new N,v=new N,E=new N;for(let w=0;w<e.length;w+=3)p(e[w+0],y),p(e[w+1],v),p(e[w+2],E),l(y,v,E,b)}function l(b,y,v,E){const w=E+1,R=[];for(let A=0;A<=w;A++){R[A]=[];const M=b.clone().lerp(v,A/w),x=y.clone().lerp(v,A/w),C=w-A;for(let I=0;I<=C;I++)I===0&&A===w?R[A][I]=M:R[A][I]=M.clone().lerp(x,I/C)}for(let A=0;A<w;A++)for(let M=0;M<2*(w-A)-1;M++){const x=Math.floor(M/2);M%2===0?(u(R[A][x+1]),u(R[A+1][x]),u(R[A][x])):(u(R[A][x+1]),u(R[A+1][x+1]),u(R[A+1][x]))}}function c(b){const y=new N;for(let v=0;v<s.length;v+=3)y.x=s[v+0],y.y=s[v+1],y.z=s[v+2],y.normalize().multiplyScalar(b),s[v+0]=y.x,s[v+1]=y.y,s[v+2]=y.z}function h(){const b=new N;for(let y=0;y<s.length;y+=3){b.x=s[y+0],b.y=s[y+1],b.z=s[y+2];const v=m(b)/2/Math.PI+.5,E=f(b)/Math.PI+.5;o.push(v,1-E)}g(),d()}function d(){for(let b=0;b<o.length;b+=6){const y=o[b+0],v=o[b+2],E=o[b+4],w=Math.max(y,v,E),R=Math.min(y,v,E);w>.9&&R<.1&&(y<.2&&(o[b+0]+=1),v<.2&&(o[b+2]+=1),E<.2&&(o[b+4]+=1))}}function u(b){s.push(b.x,b.y,b.z)}function p(b,y){const v=b*3;y.x=t[v+0],y.y=t[v+1],y.z=t[v+2]}function g(){const b=new N,y=new N,v=new N,E=new N,w=new Dt,R=new Dt,A=new Dt;for(let M=0,x=0;M<s.length;M+=9,x+=6){b.set(s[M+0],s[M+1],s[M+2]),y.set(s[M+3],s[M+4],s[M+5]),v.set(s[M+6],s[M+7],s[M+8]),w.set(o[x+0],o[x+1]),R.set(o[x+2],o[x+3]),A.set(o[x+4],o[x+5]),E.copy(b).add(y).add(v).divideScalar(3);const C=m(E);_(w,x+0,b,C),_(R,x+2,y,C),_(A,x+4,v,C)}}function _(b,y,v,E){E<0&&b.x===1&&(o[y]=b.x-1),v.x===0&&v.z===0&&(o[y]=E/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function f(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new co(t.vertices,t.indices,t.radius,t.details)}}class ho extends co{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ho(t.radius,t.detail)}}class uo extends Ie{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let d=t;const u=(e-t)/i,p=new N,g=new Dt;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const f=s+m/n*o;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let _=0;_<i;_++){const m=_*(n+1);for(let f=0;f<n;f++){const b=f+m,y=b,v=b+n+1,E=b+n+2,w=b+1;a.push(y,v,w),a.push(v,E,w)}}this.setIndex(a),this.setAttribute("position",new pe(l,3)),this.setAttribute("normal",new pe(c,3)),this.setAttribute("uv",new pe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new uo(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class fo extends Ie{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new N,u=new N,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const b=[],y=f/n;let v=0;f===0&&o===0?v=.5/e:f===n&&l===Math.PI&&(v=-.5/e);for(let E=0;E<=e;E++){const w=E/e;d.x=-t*Math.cos(i+w*s)*Math.sin(o+y*a),d.y=t*Math.cos(o+y*a),d.z=t*Math.sin(i+w*s)*Math.sin(o+y*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(w+v,1-y),b.push(c++)}h.push(b)}for(let f=0;f<n;f++)for(let b=0;b<e;b++){const y=h[f][b+1],v=h[f][b],E=h[f+1][b],w=h[f+1][b+1];(f!==0||o>0)&&p.push(y,v,w),(f!==n-1||l<Math.PI)&&p.push(v,E,w)}this.setIndex(p),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(_,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fo(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Gm extends Qn{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Ut(16777215),this.specular=new Ut(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ro,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=Qr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class mt extends Qn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ro,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=Qr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Sl={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Vm{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const Wm=new Vm;class po{constructor(t){this.manager=t!==void 0?t:Wm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}po.DEFAULT_MATERIAL_NAME="__DEFAULT";class Xm extends po{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Sl.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=Qi("img");function l(){h(),Sl.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(d){h(),i&&i(d),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class qm extends po{constructor(t){super(t)}load(t,e,n,i){const s=new Re,o=new Xm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class is extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ut(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Os extends is{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ut(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Bs=new he,wl=new N,Tl=new N;class Tc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ao,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;wl.setFromMatrixPosition(t.matrixWorld),e.position.copy(wl),Tl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Tl),e.updateMatrixWorld(),Bs.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bs),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Bs)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const El=new he,qi=new N,zs=new N;class $m extends Tc{constructor(){super(new Ve(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Dt(4,2),this._viewportCount=6,this._viewports=[new ie(2,1,1,1),new ie(0,1,1,1),new ie(3,1,1,1),new ie(1,1,1,1),new ie(3,0,1,1),new ie(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),qi.setFromMatrixPosition(t.matrixWorld),n.position.copy(qi),zs.copy(n.position),zs.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(zs),n.updateMatrixWorld(),i.makeTranslation(-qi.x,-qi.y,-qi.z),El.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(El)}}class gn extends is{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new $m}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Ym extends Tc{constructor(){super(new xc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Al extends is{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new Ym}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ks extends is{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ka}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ka);const D=4,Ln=3.2,Hs=2,Gs=1.7,Rl=.6,Vs=2,Cl=.35,Pl=1.2,Ur=2.1,jm=1,Zm=1,Km=1.85,Ec=260,Jm=210,$i=8884384,Dr=6e5,Ir=.34,rr=["MMMMM##########","MMMMM##########","MMSMM##########","MMTMM##########","MMTMM##########","MMTMM##########","##.........####","##...........##","##...........##","##...........##","##...........##","##...........##","##...........##","######...######","######...######","######.P.######","#######F#######"],Le=rr.length,qe=rr[0].length;function fe(r,t){if(t<0||t>=Le||r<0||r>=qe)return"building";const e=rr[t][r];return e==="#"?"building":e==="o"?"barrel":e==="M"?"mountain":e==="T"?"tunnel":e==="S"?"stairs":e==="F"?"forestgate":"street"}function Ll(r,t){const e=fe(r,t);return e==="tunnel"||e==="stairs"}function Ws(r,t){const e=fe(r,t);return e==="street"||e==="barrel"||e==="tunnel"||e==="stairs"||e==="forestgate"}function Ul(){for(let r=0;r<Le;r++){const t=rr[r].indexOf("P");if(t>=0)return{col:t,row:r}}return{col:1,row:1}}function Dl(){for(let r=0;r<Le;r++){const t=rr[r].indexOf("F");if(t>=0)return{col:t,row:r}}return{col:7,row:Le-1}}const sr=["###################################","###################################","##T...f...TrTTbT.NTTTTTT.T...bf.T##","##T...TTTf.TTf..T===TTfT..Tr.TTTf##","##Tb.f.TTTT.......T==.TTTrTT...T.##","##f....T..T..TrT.bT==.b.TTTTT.T.T##","##.b..T..T..r.T.T.T=.T....TTTTTTT##","##......TT....T.rk.=TT..TfTb..T..##","##frT..TTT.T...T.rT===.bT..T.TT.T##","##.f.kT.TT.rT..rT.==r.TTfT.fTr..T##","##TT.TTTTrTTTTTT.==...TT..T.TTT.T##","##T..TTTbTT.bT....=.Tff..TbTf.TT.##","##T..Tfb..b.k.T..======.TTTT....f##","##.TTT.T....rTT..=..Tk..TT..T.T..##","##...TT......bkT.=.kT.f...r.T.TT.##","##...TfT...T.T.r==..TTTbT..k..TT.##","##.TTTT.T..r.bbT=T.T...r....TTb.T##","##.f.T..T..TTf..===.T.TT.....TrbT##","##..TTTbTT.bT.T===TTTT.bT.......T##","##.fk.T.T....TTT.=.....T...rT.TTT##","##...T..T.b.TTkT==.TT.TfTf...TT..##","##.rTT..TTT.Tr.=====rT....T..TT=E##","##r.TT.T..TT..T===TbTTbTT...T.r.=##","##.TT.TfT....TT.T=rf.rTT.T...T===##","##T....rf.T..bT..==..TfT..Tk=====##","##T..Tff.TrTTTT...==.TT..T..=Tk.T##","##T.TTb==========j===========..Tf##","##..TT==.TfTT.T.==...r.TTTTrTT.bb##","##T.b==TT.rr.Tr..==.TT.TTT.TT..Tb##","##T======.TTr..T.==T.T...k.f.T...##","##===.brb.....bTT=.TT.T..r.T.T..T##","##W==TT.T.r.rTr===....rf.ffb.TTTT##","##..T.T.....k..===.Tk.Tr.Tf.f..TT##","##TT..TTT.T.TT==TTTrTTk.r..T.T.r.##","##T......r..TT=T.TTT.TTT.rf...T.T##","##.r....T.T.TT=TTT..TTkr.T.T..bbT##","##rk....fT.T.T==.rrb..T..r.T..Tr.##","##TTTb..Tf....=TbTrT..T..TTrT..f.##","##...T.b....TT====fT..T.T..T.T...##","##T..........T...=..Tf.T.T..T..fk##","##r.T..Tf........=T.....T...TTb.T##","##TTT.TTbT.bTT...===.T.......TbT.##","##.T.T....TTTbT..==T.T......TTTTT##","##.T..T...TTTf.T====..k..T.b..krT##","##bT.TTT.kTr.....==.TT.T.TTb.T.r.##","##TT.TbrT....T..r==T...bb.f..T...##","##..b.TTTrT.rf=s.===TTf..T.TTT.rr##","##..rTT.TTTTTr.r.P...TTT..T..T.b.##","#################=#################","#################V#################"],tr=sr.length,qr=sr[0].length;function Yn(r,t){if(t<0||t>=tr||r<0||r>=qr)return"edge";switch(sr[t][r]){case".":return"grass";case"=":return"path";case"T":return"tree";case"b":return"bush";case"r":return"rock";case"f":return"foliage";case"k":return"skull";case"s":case"j":case"N":case"E":case"W":return"sign";case"V":return"gate";case"P":return"spawn";default:return"edge"}}function Xs(r,t){const e=Yn(r,t);return e==="grass"||e==="path"||e==="tree"||e==="foliage"||e==="skull"||e==="gate"||e==="spawn"}function Qm(r,t){switch(sr[t]?.[r]){case"s":return["Trilha da Mata Sussurrante.","A neblina nunca se levanta por aqui. Dizem que ela se lembra de quem passa.","Siga a trilha até a encruzilhada."];case"j":return["Encruzilhada da Mata.","Ao sul: Vilarejo de Grimhollow.","Norte: Montanhas Cinzentas · Leste: o Charco · Oeste: as Ruínas.","(Esses caminhos se abrirão em breve.)"];case"N":return["Trilha das Montanhas Cinzentas.","O caminho sobe rumo ao nevoeiro gelado.","(Bloqueado — em breve.)"];case"E":return["Trilha do Charco.","Um cheiro de água parada vem do leste.","(Bloqueado — em breve.)"];case"W":return["Trilha das Ruínas.","Pedras antigas espreitam entre as árvores a oeste.","(Bloqueado — em breve.)"];default:return["Uma placa de madeira, gasta pelo tempo."]}}function qs(r){for(let t=0;t<tr;t++){const e=sr[t].indexOf(r);if(e>=0)return{col:e,row:t}}return{col:8,row:tr-2}}const Nr=4;function we(r,t){const e=document.createElement("canvas");e.width=r*Nr,e.height=t*Nr;const n=e.getContext("2d");return n.scale(Nr,Nr),{c:e,ctx:n}}function Ye(r,t=1,e=1){const n=new Si(r);return n.magFilter=ze,n.minFilter=en,n.generateMipmaps=!0,n.anisotropy=8,n.wrapS=Ki,n.wrapT=Ki,n.repeat.set(t,e),n.colorSpace=ye,n}function Fi(r){const t=new Si(r);return t.magFilter=ze,t.minFilter=en,t.generateMipmaps=!0,t.anisotropy=8,t.wrapS=tn,t.wrapT=tn,t.colorSpace=ye,t}const Ne=r=>{let t=r>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}};function Me(r=1){const{c:n,ctx:i}=we(64,64),s=Ne(r),o=5,a=64/o;for(let l=0;l<o;l++){const c=92+Math.floor(s()*30),h=Math.round(l*a),d=Math.round((l+1)*a);for(let u=h;u<d;u++)for(let p=0;p<64;p++){const g=Math.sin(p*.4+l)*6+(s()-.5)*14,_=c+g;i.fillStyle=`rgb(${_|0},${_*.62|0},${_*.34|0})`,i.fillRect(u,p,1,1)}if(i.fillStyle="rgba(30,16,6,0.8)",i.fillRect(h,0,1,64),i.fillStyle="rgba(255,220,170,0.10)",i.fillRect(h+1,0,1,64),s()<.5){const u=Math.floor(s()*64);i.fillStyle="rgba(40,22,10,0.7)",i.beginPath(),i.arc(h+a/2,u,2,0,Math.PI*2),i.fill()}}return Ye(n)}function Il(r=7){const{c:n,ctx:i}=we(160,160),s=Ne(r);i.fillStyle="#4a4136",i.fillRect(0,0,160,160);for(let l=0;l<900;l++){const c=58+s()*26|0;i.fillStyle=`rgba(${c},${c*.88|0},${c*.72|0},0.4)`,i.fillRect(s()*160,s()*160,2,2)}const o=22,a=(l,c,h)=>{const d=6+Math.floor(s()*4),u=[];for(let v=0;v<d;v++){const E=v/d*Math.PI*2,w=h*(.78+s()*.3);u.push([l+Math.cos(E)*w,c+Math.sin(E)*w*.92])}const p=()=>{i.beginPath(),u.forEach((v,E)=>E?i.lineTo(v[0],v[1]):i.moveTo(v[0],v[1])),i.closePath()},g=120+Math.floor(s()*34),_=s();let m,f,b;_<.45?(m=g,f=g*.96|0,b=g*.9|0):_<.75?(m=g*.9|0,f=g*.93|0,b=g*.96|0):(m=Math.min(255,g*1|0),f=g*.92|0,b=g*.78|0),i.save(),i.translate(.6,1),p(),i.fillStyle="rgba(40,34,26,0.35)",i.fill(),i.restore(),p(),i.fillStyle=`rgb(${m},${f},${b})`,i.fill();const y=i.createLinearGradient(l,c-h,l,c+h);y.addColorStop(0,"rgba(255,250,236,0.1)"),y.addColorStop(.5,"rgba(255,255,255,0)"),y.addColorStop(1,"rgba(30,24,18,0.14)"),p(),i.fillStyle=y,i.fill()};for(let l=-1;l<160/o+1;l++)for(let c=-1;c<160/o+1;c++){const h=c*o+(l&1?o/2:0)+(s()-.5)*5,d=l*o+(s()-.5)*5;a(h,d,o*.52+s()*3)}return Ye(n)}function $s(r=3){const{c:n,ctx:i}=we(64,64);i.fillStyle="#6e5320",i.fillRect(0,0,64,64);const s=Ne(r);for(let o=0;o<900;o++){const a=Math.floor(s()*64),l=Math.floor(s()*64),c=3+Math.floor(s()*6),h=120+Math.floor(s()*90);i.strokeStyle=`rgb(${h},${h*.78|0},${h*.4|0})`,i.beginPath(),i.moveTo(a,l),i.lineTo(a+(s()-.5)*2,l+c),i.stroke()}i.fillStyle="rgba(30,20,6,0.35)";for(let o=0;o<64;o+=14)i.fillRect(0,o,64,2);return Ye(n)}function Nl(r=11){const{c:n,ctx:i}=we(48,64);i.fillStyle="#5a4a38",i.fillRect(0,0,48,64),i.fillStyle="#4a2f16",i.fillRect(6,6,36,58);for(let s=6;s<42;s+=8)i.fillStyle="rgba(20,10,4,0.7)",i.fillRect(s,6,1,58),i.fillStyle="rgba(120,80,40,0.25)",i.fillRect(s+1,6,1,58);return i.fillStyle="#20242a",i.fillRect(8,14,32,3),i.fillRect(8,46,32,3),i.fillStyle="#c9a227",i.fillRect(34,64/2,3,3),Ye(n)}function tg(r=13){const{c:n,ctx:i}=we(40,40);return i.clearRect(0,0,40,40),i.fillStyle="#3a2512",i.fillRect(4,4,32,32),i.fillStyle="#10161c",i.fillRect(8,8,24,24),i.fillStyle="rgba(120,150,170,0.25)",i.fillRect(9,9,6,22),i.fillStyle="#2a1a0c",i.fillRect(40/2-1,4,2,32),i.fillRect(4,40/2-1,32,2),Ye(n)}function Fl(r=17){const{c:n,ctx:i}=we(48,32),s=Ne(r);for(let o=0;o<48;o++){const a=96+Math.sin(o/48*Math.PI)*46+(s()-.5)*10;i.fillStyle=`rgb(${a|0},${a*.6|0},${a*.32|0})`,i.fillRect(o,0,1,32),o%6===0&&(i.fillStyle="rgba(20,10,4,0.6)",i.fillRect(o,0,1,32))}return i.fillStyle="#3a3f47",i.fillRect(0,3,48,3),i.fillRect(0,26,48,3),i.fillStyle="rgba(200,210,220,0.3)",i.fillRect(0,3,48,1),Ye(n)}function vi(r=31){const{c:n,ctx:i}=we(96,96),s=Ne(r);i.fillStyle="#3b3a38",i.fillRect(0,0,96,96);const o=16;for(let a=0,l=0;a<96;a+=o,l++){const c=l%2?16:0;for(let h=-16;h<96;h+=32){const d=h+c,u=96+Math.floor(s()*40);i.fillStyle=`rgb(${u},${u*.98|0},${u*.92|0})`,i.fillRect(d+1,a+1,30,o-2),i.fillStyle="rgba(0,0,0,0.28)",i.fillRect(d+1,a+o-3,30,2),i.fillStyle="rgba(255,255,255,0.12)",i.fillRect(d+1,a+1,30,1),s()<.4&&(i.fillStyle=`rgba(40,50,40,${.1+s()*.15})`,i.beginPath(),i.ellipse(d+8+s()*14,a+6+s()*6,4,3,0,0,Math.PI*2),i.fill())}}return Ye(n)}function eg(r=1){const{c:n,ctx:i}=we(76,128);i.clearRect(0,0,76,128),i.lineJoin="round",i.lineCap="round";const s=Ne(r),o="#241812",a=76/2,l=29,c=13,h=(A,M)=>{const x=parseInt(A.slice(1),16);let C=x>>16&255,I=x>>8&255,F=x&255;if(M<0){const V=1+M;C*=V,I*=V,F*=V}else C+=(255-C)*M,I+=(255-I)*M,F+=(255-F)*M;return`rgb(${C|0},${I|0},${F|0})`},d=(A,M,x=2.2)=>{i.beginPath(),A.forEach(([C,I],F)=>F?i.lineTo(C,I):i.moveTo(C,I)),i.closePath(),i.fillStyle=M,i.fill(),x&&(i.strokeStyle=o,i.lineWidth=x,i.stroke())},u=(A,M,x,C,I=2)=>{i.beginPath(),i.arc(A,M,x,0,Math.PI*2),i.fillStyle=C,i.fill(),I&&(i.strokeStyle=o,i.lineWidth=I,i.stroke())},p=(A,M,x,C,I,F,V=2)=>{i.beginPath(),Xa(i,A,M,x,C,I),i.fillStyle=F,i.fill(),V&&(i.strokeStyle=o,i.lineWidth=V,i.stroke())},g=(A,M)=>{i.save(),i.beginPath(),A.forEach(([x,C],I)=>I?i.lineTo(x,C):i.moveTo(x,C)),i.closePath(),i.clip(),i.fillStyle=M,i.fillRect(a+2,40,44,90),i.restore()},_=["#f4cc9c","#eab488","#d89a68"],m=_[Math.floor(s()*_.length)],f=h(m,-.16),b=Math.floor(s()*5);i.fillStyle="rgba(0,0,0,0.22)",i.beginPath(),i.ellipse(a,123,15,4.5,0,0,Math.PI*2),i.fill();const y=()=>{i.fillStyle=f,i.fillRect(a-4,36,8,12),u(a,l,c,m),i.save(),i.beginPath(),i.arc(a,l,c,0,Math.PI*2),i.clip(),i.fillStyle="rgba(0,0,0,0.10)",i.fillRect(a+3,l-c,c,2*c),i.restore();for(const A of[-1,1]){const M=a+A*4.6;i.fillStyle="#fff",i.beginPath(),i.ellipse(M,l-.3,2.3,3.6,0,0,Math.PI*2),i.fill(),i.fillStyle="#241812",i.beginPath(),i.ellipse(M+A*.3,l,1.6,3.1,0,0,Math.PI*2),i.fill(),i.fillStyle="#fff",i.beginPath(),i.arc(M-.7,l-1.8,.8,0,Math.PI*2),i.fill()}i.strokeStyle=o,i.lineWidth=1.6,i.beginPath(),i.moveTo(a-8,l-5.5),i.lineTo(a-2.5,l-6),i.moveTo(a+2.5,l-6),i.lineTo(a+8,l-5.5),i.stroke(),i.fillStyle=f,i.fillRect(a-.6,l+3,1.3,2.4),i.strokeStyle="#9c4a38",i.lineWidth=1.4,i.beginPath(),i.arc(a,l+6,2.2,.18*Math.PI,.82*Math.PI),i.stroke(),i.fillStyle="rgba(232,120,110,0.28)",i.beginPath(),i.arc(a-7.5,l+4,2,0,Math.PI*2),i.arc(a+7.5,l+4,2,0,Math.PI*2),i.fill()},v=A=>{i.beginPath(),i.arc(a,l-1,c+1,Math.PI*.98,Math.PI*2.02),i.lineTo(a+c,l+2),i.lineTo(a+8,l-3),i.lineTo(a+5,l-1),i.lineTo(a+2,l-4),i.lineTo(a-1,l-1),i.lineTo(a-4,l-4),i.lineTo(a-7,l-1),i.lineTo(a-c,l+2),i.closePath(),i.fillStyle=A,i.fill(),i.strokeStyle=o,i.lineWidth=2,i.stroke();const M=[-11,-7,-3,1,5,9,12];for(const x of M){const C=a+x*.9,I=Math.max(0,c*c-x*x),F=l-Math.sqrt(I)+3,V=a+x*1.7+(x>0?2:-2),Q=F-10-(12-Math.abs(x))*.5;d([[C-3.4,F],[V,Q],[C+3.4,F]],A,1.8)}i.strokeStyle=h(A,.35),i.lineWidth=1.3,i.beginPath(),i.moveTo(a-4,l-6),i.lineTo(a-2,l-c+1),i.moveTo(a+3,l-6),i.lineTo(a+5,l-c+2),i.stroke()},E=(A,M)=>{d([[a-12,48],[a-20,52],[a-18,74],[a-11,70]],A,2),d([[a+12,48],[a+20,52],[a+18,74],[a+11,70]],A,2),u(a-18,76,3.6,M,1.8),u(a+18,76,3.6,M,1.8)},w=(A,M)=>{d([[a-9,82],[a-1,82],[a-2,112],[a-9,112]],A,2),d([[a+1,82],[a+9,82],[a+9,112],[a+2,112]],A,2),p(a-11,110,10,11,3,M,2),p(a+1,110,10,11,3,M,2)},R=(A,M)=>{d(A,M,2.2),g(A,"rgba(0,0,0,0.16)")};if(b===0)w("#2f6f9a","#6a4526"),R([[a-12,46],[a+12,46],[a+14,84],[a-14,84]],"#37a34a"),d([[a-14,80],[a+14,80],[a+14,84],[a-14,84]],"#e8e0b0",1.4),E("#2f8f40","#e0b070"),p(a-14,79,28,5,2,"#5a3a1e",1.8),p(a-3,78,6,7,1.5,"#e6c040",1.4),y(),v("#f0d24a"),d([[a-c,l-6],[a+c,l-6],[a+5,l-c-13],[a-2,l-c-7]],"#2f8f3f",2),u(a+4,l-c-12,2.4,"#e6c040",1.4);else if(b===1)w("#33507e","#3a4656"),R([[a-13,46],[a+13,46],[a+14,82],[a-14,82]],"#8a5a2e"),d([[a-8,50],[a+8,50],[a+9,74],[a-9,74]],"#6f4522",1.8),i.strokeStyle="#e6c040",i.lineWidth=1.6,i.beginPath(),i.moveTo(a-7,56),i.lineTo(a+7,60),i.stroke(),E("#7a4d26","#3a4656"),u(a-15,49,5.5,"#9a6a38",2),u(a+15,49,5.5,"#9a6a38",2),p(a-14,78,28,5,2,"#4a2f18",1.8),y(),v("#e07028"),p(a-c-1,l-8,2*c+2,4.5,1.5,"#2f8f3f",1.8),d([[a+c-1,l-7],[a+c+6,l-2],[a+c+4,l-9]],"#2f8f3f",1.4);else if(b===2){const A=[[a-11,46],[a+11,46],[a+20,116],[a-20,116]];d(A,"#2a52b0",2.2),g(A,"rgba(0,0,0,0.16)"),d([[a-4,52],[a+4,52],[a+6,116],[a-6,116]],"#e6b83a",1.6),p(a-20,112,40,5,2,"#e6b83a",1.6),d([[a-11,48],[a-21,58],[a-17,84],[a-9,74]],"#2a52b0",2),d([[a+11,48],[a+21,58],[a+17,84],[a+9,74]],"#2a52b0",2),u(a-17,86,3.4,m,1.6),u(a+17,86,3.4,m,1.6),y(),v("#4aa8d8"),i.strokeStyle="#8a5a2e",i.lineWidth=3,i.beginPath(),i.moveTo(a+19,40),i.lineTo(a+19,118),i.stroke(),u(a+19,33,5,"#e6c040",2),u(a+19,33,2.2,"#fff6c0",0)}else if(b===3){const A=[[a-13,46],[a+13,46],[a+22,100],[a-22,100]];d(A,"#c0432a",2.2),g(A,"rgba(0,0,0,0.18)"),w("#2a2f45","#5a3a22"),R([[a-11,48],[a+11,48],[a+13,82],[a-13,82]],"#356ab8"),E("#2f5aa0","#d8a070"),p(a-13,78,26,5,2,"#4a3018",1.8),d([[a-12,46],[a-4,44],[a-6,52]],"#c0432a",1.6),d([[a+12,46],[a+4,44],[a+6,52]],"#c0432a",1.6),y(),v("#e8802a")}else{const A=[[a-11,46],[a+11,46],[a+18,116],[a-18,116]];d(A,"#dcd6c6",2.2),g(A,"rgba(0,0,0,0.12)"),p(a-18,112,36,5,2,"#c05a86",1.6),d([[a-5,46],[a+5,46],[a+3,74],[a-3,74]],"#c05a86",1.4),d([[a-11,48],[a-19,58],[a-15,82],[a-9,74]],"#dcd6c6",2),d([[a+11,48],[a+19,58],[a+15,82],[a+9,74]],"#dcd6c6",2),u(a-15,84,3.4,m,1.6),u(a+15,84,3.4,m,1.6),y();const M="#7a4a2a";d([[a-c-2,l-4],[a-c-3,l+26],[a-5,l+20],[a-4,l]],M,2),d([[a+c+2,l-4],[a+c+3,l+26],[a+5,l+20],[a+4,l]],M,2),i.beginPath(),i.arc(a,l-1,c+1,Math.PI*.92,Math.PI*2.08),i.lineTo(a+c-1,l+1),i.lineTo(a+7,l-2),i.lineTo(a+4,l+1),i.lineTo(a+1,l-3),i.lineTo(a-2,l+1),i.lineTo(a-5,l-2),i.lineTo(a-c+1,l+1),i.closePath(),i.fillStyle=M,i.fill(),i.strokeStyle=o,i.lineWidth=2,i.stroke()}return Fi(n)}function Xa(r,t,e,n,i,s){r.beginPath(),r.moveTo(t+s,e),r.arcTo(t+n,e,t+n,e+i,s),r.arcTo(t+n,e+i,t,e+i,s),r.arcTo(t,e+i,t,e,s),r.arcTo(t,e,t+n,e,s),r.closePath()}function Ys(r){const{c:n,ctx:i}=we(160,56);i.clearRect(0,0,160,56),i.fillStyle="#33220f",Xa(i,2,2,156,52,6),i.fill(),i.fillStyle="#59401f",Xa(i,6,6,148,44,5),i.fill(),i.strokeStyle="rgba(30,18,8,0.35)",i.lineWidth=1;for(let o=12;o<48;o+=6)i.beginPath(),i.moveTo(10,o),i.lineTo(150,o+1),i.stroke();i.fillStyle="#2a1a0a";for(const[o,a]of[[12,12],[148,12],[12,44],[148,44]])i.beginPath(),i.arc(o,a,2,0,Math.PI*2),i.fill();let s=26;for(i.fillStyle="#f2dda0",i.textAlign="center",i.textBaseline="middle",i.font=`bold ${s}px Georgia, "Times New Roman", serif`;i.measureText(r).width>138&&s>10;)s-=1,i.font=`bold ${s}px Georgia, "Times New Roman", serif`;return i.strokeStyle="rgba(0,0,0,0.55)",i.lineWidth=3,i.strokeText(r,160/2,56/2+1),i.fillText(r,160/2,56/2+1),Fi(n)}function js(r=41){const{c:n,ctx:i}=we(96,96),s=Ne(r);for(let o=0;o<96;o+=2)for(let a=0;a<96;a+=2){const l=78+Math.floor(s()*34);i.fillStyle=`rgb(${l},${l*.94|0},${l*.84|0})`,i.fillRect(a,o,2,2)}for(let o=0;o<26;o++){const a=s()*96,l=s()*96,c=10+s()*16,h=s()<.5?.22:-.18;i.fillStyle=h>0?`rgba(0,0,0,${h})`:`rgba(255,250,240,${-h})`,i.beginPath();const d=4+(s()*3|0);for(let u=0;u<=d;u++){const p=u/d*Math.PI*2+s()*.3,g=c*(.7+s()*.4),_=a+Math.cos(p)*g,m=l+Math.sin(p)*g*.8;u===0?i.moveTo(_,m):i.lineTo(_,m)}i.closePath(),i.fill()}i.strokeStyle="rgba(20,16,12,0.5)",i.lineWidth=1.4;for(let o=0;o<7;o++){i.beginPath();let a=s()*96,l=s()*96;i.moveTo(a,l);for(let c=0;c<5;c++)a+=(s()-.5)*26,l+=(s()-.5)*26,i.lineTo(a,l);i.stroke()}return Ye(n)}function ng(r=43){const{c:n,ctx:i}=we(96,96),s=Ne(r);i.fillStyle="#161514",i.fillRect(0,0,96,96);const o=32;for(let a=0;a<96;a+=o)for(let l=0;l<96;l+=o){const c=40+Math.floor(s()*20);i.fillStyle=`rgb(${c},${c*.98|0},${c*.94|0})`,i.fillRect(l+2,a+2,o-4,o-4),i.fillStyle="rgba(0,0,0,0.4)",i.fillRect(l+2,a+o-4,o-4,2),i.fillStyle="rgba(255,255,255,0.05)",i.fillRect(l+2,a+2,o-4,1),s()<.3&&(i.strokeStyle="rgba(0,0,0,0.35)",i.lineWidth=1,i.beginPath(),i.moveTo(l+6+s()*10,a+6),i.lineTo(l+8+s()*12,a+o-6),i.stroke())}return Ye(n)}function Zs(r=61){const{c:n,ctx:i}=we(64,64),s=Ne(r);for(let o=0;o<64;o++)for(let a=0;a<64;a++){const l=s(),c=96+Math.floor(l*46);i.fillStyle=`rgb(${c*.42|0},${c},${c*.36|0})`,i.fillRect(a,o,1,1)}for(let o=0;o<26;o++){const a=s()<.5;i.fillStyle=a?"rgba(30,52,24,0.28)":"rgba(150,190,90,0.22)",i.beginPath(),i.ellipse(s()*64,s()*64,3+s()*6,2+s()*4,s()*3,0,Math.PI*2),i.fill()}for(let o=0;o<130;o++){const a=s()*64,l=s()*64,c=2+s()*4,h=70+s()*90;i.strokeStyle=`rgba(${h*.4|0},${h|0},${h*.35|0},0.5)`,i.lineWidth=.8,i.beginPath(),i.moveTo(a,l),i.lineTo(a+(s()-.5)*1.5,l-c),i.stroke()}return Ye(n)}function Ks(r=63){const{c:n,ctx:i}=we(64,64),s=Ne(r);for(let o=0;o<64;o++)for(let a=0;a<64;a++){const l=s(),c=104+Math.floor(l*30);i.fillStyle=`rgb(${c},${c*.74|0},${c*.5|0})`,i.fillRect(a,o,1,1)}for(let o=0;o<34;o++){const a=120+s()*70;i.fillStyle=`rgba(${a|0},${a*.94|0},${a*.86|0},0.85)`,i.beginPath(),i.ellipse(s()*64,s()*64,1+s()*2.2,1+s()*1.6,s()*3,0,Math.PI*2),i.fill()}for(let o=0;o<14;o++)i.fillStyle="rgba(60,40,24,0.28)",i.beginPath(),i.ellipse(s()*64,s()*64,4+s()*7,2+s()*3,s()*3,0,Math.PI*2),i.fill();return Ye(n)}function Ol(r=65){const{c:n,ctx:i}=we(128,300);i.clearRect(0,0,128,300);const s=Ne(r),o=128/2,a=s()<.35,l=(s()-.5)*12,c=300*.8;i.beginPath(),i.moveTo(o-8,300),i.lineTo(o-5,c),i.lineTo(o+5,c),i.lineTo(o+8,300),i.closePath();const h=i.createLinearGradient(o-8,0,o+8,0);h.addColorStop(0,"#2a1c0f"),h.addColorStop(.5,"#553a20"),h.addColorStop(1,"#20150a"),i.fillStyle=h,i.fill();const d=7,u=300*.04,p=300*.84;for(let g=0;g<d;g++){const _=g/(d-1),m=u+(p-u)*_,f=10+_*(128*.46),b=(p-u)/d*2.1,y=30+l;i.fillStyle=`rgb(${y*.55|0},${y+22|0},${y*.5|0})`,i.beginPath(),i.moveTo(o,m-b*.25);const v=7;for(let E=0;E<=v;E++){const w=o+f*(E/v),R=(E%2===0?.86:1)*b;i.lineTo(w,m+R)}for(let E=v;E>=0;E--){const w=o-f*(E/v),R=(E%2===0?.86:1)*b;i.lineTo(w,m+R)}i.closePath(),i.fill()}for(let g=0;g<d;g++){const _=g/(d-1),m=u+(p-u)*_+2,f=(10+_*(128*.46))*.82,b=(p-u)/d*1.9,y=62+Math.floor(s()*20)+l;i.fillStyle=`rgb(${y*.5|0},${y+30|0},${y*.45|0})`,i.beginPath(),i.moveTo(o,m),i.lineTo(o+f,m+b*.92),i.lineTo(o-f,m+b*.92),i.closePath(),i.fill(),i.fillStyle=`rgba(${y*.7|0},${y+60|0},${y*.5|0},0.5)`,i.beginPath(),i.moveTo(o,m),i.lineTo(o-f*.7,m+b*.8),i.lineTo(o-f*.1,m+b*.8),i.closePath(),i.fill();for(let v=0;v<12;v++){const E=s()<.5?-1:1,w=f*(.4+s()*.62);i.fillStyle=`rgba(${y*.45|0},${y+14|0},${y*.4|0},0.85)`,i.beginPath(),i.arc(o+E*w,m+b*(.55+s()*.4),1.4+s()*2.4,0,Math.PI*2),i.fill()}a&&(i.fillStyle="rgba(238,244,255,0.8)",i.beginPath(),i.moveTo(o,m+1),i.lineTo(o+f*.3,m+b*.34),i.lineTo(o-f*.3,m+b*.34),i.closePath(),i.fill())}return Fi(n)}function ig(r=75){const{c:n,ctx:i}=we(128,96);i.clearRect(0,0,128,96);const s=Ne(r),o=128/2,a=96*.98,l=9+(s()*5|0);for(let c=0;c<l;c++){const h=-Math.PI/2+(c/(l-1)-.5)*1.7+(s()-.5)*.2,d=96*(.5+s()*.45),u=60+Math.floor(s()*40);i.strokeStyle=`rgb(${u*.42|0},${u},${u*.34|0})`,i.lineWidth=2.4;const p=o+Math.cos(h)*d,g=a+Math.sin(h)*d,_=o+Math.cos(h)*d*.5+(s()-.5)*8,m=a+Math.sin(h)*d*.5;i.beginPath(),i.moveTo(o,a),i.quadraticCurveTo(_,m,p,g),i.stroke(),i.lineWidth=1;for(let f=.25;f<1;f+=.16){const b=o+(p-o)*f,y=a+(g-a)*f;i.beginPath(),i.moveTo(b,y),i.lineTo(b-5,y-3),i.moveTo(b,y),i.lineTo(b+5,y-3),i.stroke()}}return Fi(n)}function rg(r=67){const{c:n,ctx:i}=we(128,96);i.clearRect(0,0,128,96);const s=Ne(r),o=128/2,a=96*.94,l=12;for(let c=0;c<l;c++){const h=o+(s()-.5)*128*.8,d=a-s()*96*.72,u=12+s()*18,p=54+Math.floor(s()*40),g=i.createRadialGradient(h,d-u*.3,u*.2,h,d,u);g.addColorStop(0,`rgb(${p*.6|0},${p+40},${p*.5|0})`),g.addColorStop(1,`rgb(${p*.4|0},${p*.8|0},${p*.4|0})`),i.fillStyle=g,i.beginPath(),i.arc(h,d,u,0,Math.PI*2),i.fill()}for(let c=0;c<5;c++)i.fillStyle="rgba(150,40,50,0.8)",i.beginPath(),i.arc(o+(s()-.5)*128*.6,a-s()*96*.5,1.6,0,Math.PI*2),i.fill();return Fi(n)}function sg(r=69){const{c:n,ctx:i}=we(128,96);i.clearRect(0,0,128,96);const s=Ne(r),o=(a,l,c)=>{i.fillStyle="#e7e2d2",i.beginPath(),i.ellipse(a,l,c,c*.9,0,0,Math.PI*2),i.fill(),i.fillStyle="#d8d2c0",i.beginPath(),i.ellipse(a,l+c*.7,c*.6,c*.4,0,0,Math.PI*2),i.fill(),i.fillStyle="#2a2620",i.beginPath(),i.ellipse(a-c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.ellipse(a+c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.fill(),i.beginPath(),i.moveTo(a,l+c*.1),i.lineTo(a-c*.12,l+c*.4),i.lineTo(a+c*.12,l+c*.4),i.fill()};i.strokeStyle="#d5cfbe",i.lineWidth=3;for(let a=0;a<6;a++){const l=20+s()*88,c=96*.7+s()*96*.22;i.beginPath(),i.moveTo(l,c),i.lineTo(l+(s()-.5)*34,c+(s()-.5)*10),i.stroke()}return o(128*.5,96*.72,15),o(128*.32,96*.8,12),o(128*.68,96*.8,12),o(128*.46,96*.5,13),Fi(n)}function Bl(r=47){const{c:n,ctx:i}=we(96,96),s=Ne(r);i.fillStyle="#0f0e0d",i.fillRect(0,0,96,96);const o=18;for(let a=0,l=0;a<96;a+=o,l++){const c=l%2?18:0;for(let h=-18;h<96;h+=36){const d=h+c,u=44+Math.floor(s()*20);i.fillStyle=`rgb(${u*.9|0},${u},${u*.86|0})`,i.fillRect(d+1,a+1,34,o-2),i.fillStyle="rgba(0,0,0,0.45)",i.fillRect(d+1,a+o-3,34,2),i.fillStyle="rgba(255,255,255,0.06)",i.fillRect(d+1,a+1,34,1),s()<.35&&(i.fillStyle=`rgba(70,90,50,${.18+s()*.2})`,i.beginPath(),i.ellipse(d+6+s()*20,a+4+s()*8,5,3,0,0,Math.PI*2),i.fill())}}return Ye(n)}const ag=""+new URL("wpn_sword-CpsgndpE.png",import.meta.url).href,og=""+new URL("wpn_greatsword-C2mQEgxH.png",import.meta.url).href,lg=""+new URL("wpn_axe-CvCTYMUq.png",import.meta.url).href,cg=""+new URL("wpn_dagger-BBXQkEIm.png",import.meta.url).href,hg=""+new URL("wpn_rapier-dNk4ndjW.png",import.meta.url).href,dg=""+new URL("wpn_maul-DbliXABw.png",import.meta.url).href,ug=""+new URL("wpn_mace-tTLR-MzC.png",import.meta.url).href,fg=""+new URL("wpn_staff-DGpAnpDH.png",import.meta.url).href,pg=""+new URL("wpn_shield-Bw_-3z5v.png",import.meta.url).href,mg=""+new URL("wpn_orb-BsomjHDA.png",import.meta.url).href,zl={ry:0,rx:0,rz:16,tx:0,ty:2,s:1},gg={slash:{wind:{ry:44,rx:-8,rz:36,tx:12,ty:4,s:.96},hit:{ry:-42,rx:16,rz:-42,tx:-26,ty:-8,s:1.18},follow:{ry:-16,rx:7,rz:-24,tx:-12,ty:-2,s:1.02},windup:105,strike:190,recover:190,cooldown:560,weight:1,fx:"arc"},quickslash:{wind:{ry:44,rx:-8,rz:36,tx:12,ty:4,s:.94},hit:{ry:-42,rx:16,rz:-42,tx:-26,ty:-8,s:1.16},follow:{ry:-16,rx:7,rz:-24,tx:-12,ty:-2,s:1},windup:45,strike:100,recover:95,cooldown:300,weight:.85,fx:"arc"},chop:{wind:{ry:-22,rx:-26,rz:22,tx:6,ty:-2,s:.96},hit:{ry:18,rx:40,rz:-18,tx:-12,ty:9,s:1.22},follow:{ry:8,rx:17,rz:-10,tx:-6,ty:8,s:1.05},windup:150,strike:230,recover:220,cooldown:820,weight:1.6,fx:"arcBig"},smash:{wind:{ry:-16,rx:-32,rz:16,tx:2,ty:0,s:.98},hit:{ry:12,rx:50,rz:-6,tx:-6,ty:13,s:1.36},follow:{ry:6,rx:21,rz:-2,tx:-2,ty:9,s:1.08},windup:220,strike:320,recover:300,cooldown:1200,weight:2.4,fx:"smashwave"},lunge:{wind:{ry:6,rx:-10,rz:4,tx:9,ty:17,s:.8},hit:{ry:-4,rx:42,rz:-22,tx:-15,ty:-16,s:1.46},follow:{ry:-2,rx:24,rz:-14,tx:-9,ty:-6,s:1.18},windup:110,strike:85,recover:155,cooldown:420,weight:.9,fx:"streak"},swipe:{wind:{ry:40,rx:-8,rz:44,tx:12,ty:4,s:.96},hit:{ry:-42,rx:12,rz:-50,tx:-26,ty:-4,s:1.16},follow:{ry:-14,rx:4,rz:-24,tx:-10,ty:0,s:1},windup:120,strike:205,recover:200,cooldown:640,weight:1.1,fx:"arc"},axeChop:{wind:{ry:6,rx:-14,rz:14,tx:5,ty:-22,s:.94},hit:{ry:-12,rx:22,rz:-20,tx:-9,ty:24,s:1.18},follow:{ry:-8,rx:14,rz:-14,tx:-5,ty:16,s:1.06},windup:150,strike:230,recover:220,cooldown:820,weight:1.6,fx:"arcBig",imgSpin:{wind:34,hit:-76,follow:-34}},maulSmash:{wind:{ry:6,rx:-16,rz:12,tx:4,ty:-24,s:.96},hit:{ry:-12,rx:24,rz:-18,tx:-7,ty:28,s:1.3},follow:{ry:-8,rx:15,rz:-12,tx:-4,ty:18,s:1.08},windup:220,strike:320,recover:300,cooldown:1200,weight:2.4,fx:"smashwave",imgSpin:{wind:30,hit:-56,follow:-26}}},qa=[{id:"sword",name:"Espada",url:ag,slot:"main",grip:"1h",style:"slash",scale:1,dmg:1,cls:"Guerreiro"},{id:"greatsword",name:"Espadão",url:og,slot:"main",grip:"2h",style:"smash",scale:1.2,dmg:3,cls:"Guerreiro",cooldown:1150},{id:"axe",name:"Machado",url:lg,slot:"main",grip:"1h",style:"axeChop",scale:1,dmg:2,cls:"Guerreiro"},{id:"dagger",name:"Adaga",url:cg,slot:"main",grip:"1h",style:"quickslash",scale:.64,dmg:1,cls:"Ladino",cooldown:280},{id:"rapier",name:"Rapieira",url:hg,slot:"main",grip:"1h",style:"lunge",scale:1.05,dmg:1,cls:"Ladino",cooldown:420},{id:"maul",name:"Marreta",url:dg,slot:"main",grip:"2h",style:"maulSmash",scale:1.12,dmg:3,cls:"Clérigo",cooldown:1260},{id:"mace",name:"Maça",url:ug,slot:"main",grip:"1h",style:"chop",scale:.96,dmg:2,cls:"Clérigo"},{id:"staff",name:"Cajado",url:fg,slot:"main",grip:"2h",style:"swipe",scale:1.06,dmg:1,cls:"Mago",tint:"arcane"},{id:"shield",name:"Escudo",url:pg,slot:"off",grip:"1h",style:"slash",scale:.9,dmg:0,cls:"Guerreiro"},{id:"orb",name:"Orbe",url:mg,slot:"off",grip:"1h",style:"swipe",scale:.8,dmg:0,cls:"Mago",tint:"arcane"}],_g=Object.fromEntries(qa.map(r=>[r.id,r])),xg=""+new URL("hud_plate-B2ygb4FP.png",import.meta.url).href,vg=""+new URL("eq_frame-d-QhyRgX.png",import.meta.url).href,Mg=""+new URL("eq_slot-DS9kMsLx.png",import.meta.url).href,Ac=""+new URL("eq_container-84uusXC9.png",import.meta.url).href,kl=""+new URL("btn_base-wlebnyD3.png",import.meta.url).href,bg=""+new URL("dpad-3wZIZEqb.png",import.meta.url).href,yg=""+new URL("ico_attack-CbdvrLXs.png",import.meta.url).href,Sg=""+new URL("ico_action-BRbeFgHL.png",import.meta.url).href,wg=""+new URL("ico_inventory-B_-_sjLB.png",import.meta.url).href,Hl=""+new URL("map_frame-B4piWonF.png",import.meta.url).href,Tg=""+new URL("clock_sun-DO5hSXa1.png",import.meta.url).href,Eg=""+new URL("clock_moon-D1xrN5yT.png",import.meta.url).href;function Ag(r,t,e,n,i,s){const o={};for(const L of i??[])o[L.id]=L;let a=null;const l={ArrowUp:"forward",KeyW:"forward",ArrowDown:"back",KeyS:"back",ArrowLeft:"turnLeft",KeyA:"turnLeft",ArrowRight:"turnRight",KeyD:"turnRight",KeyQ:"strafeLeft",KeyE:"strafeRight",Space:"interact",Enter:"interact",KeyF:"interact",KeyJ:"attack",KeyK:"attack"};window.addEventListener("keydown",L=>{const G=l[L.code];G&&(L.preventDefault(),t(G))});let c=null,h=null,d=null,u=null,p=null,g=null,_=!1;const m=[];c=document.createElement("div"),c.id="gh-weapon-rig",h=document.createElement("img"),h.id="gh-weapon",h.src=e,h.alt="",c.appendChild(h),d=document.createElement("div"),d.id="gh-slash",d.innerHTML='<svg viewBox="0 0 240 200" preserveAspectRatio="none"><defs><linearGradient id="ghslashg" x1="0" y1="0" x2="1" y2="0.5"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.5" stop-color="#eaf6ff" stop-opacity="0.95"/><stop offset="1" stop-color="#bfe3ff" stop-opacity="0"/></linearGradient></defs><path d="M18,64 C82,20 172,30 226,112 C162,70 92,74 26,90 Z" fill="url(#ghslashg)"/><path d="M28,68 C88,30 168,42 214,104" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85"/></svg>',c.appendChild(d),r.appendChild(c),u=document.createElement("div"),u.id="gh-impact",r.appendChild(u),p=document.createElement("div"),p.id="gh-shock",r.appendChild(p),g=document.createElement("div"),g.id="gh-screenflash",r.appendChild(g);let f=null;const b=document.createElement("div");b.id="gh-hud",b.innerHTML='<div class="gh-hud-bar gh-hud-hp"><div class="gh-hud-fill gh-hud-hp-fill"></div></div><div class="gh-hud-bar gh-hud-mp"><div class="gh-hud-fill gh-hud-mp-fill"></div></div>',r.appendChild(b);const y=b.querySelector(".gh-hud-hp-fill"),v=b.querySelector(".gh-hud-mp-fill"),E=document.createElement("div");E.id="gh-map";const w=document.createElement("canvas");w.id="gh-map-canvas",w.width=132,w.height=132,E.appendChild(w);const R=document.createElement("button");R.id="gh-map-expand",R.title="Expandir mapa (M)",R.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',E.appendChild(R),r.appendChild(E);const A=w.getContext("2d"),M=4,x=document.createElement("div");x.id="gh-bigmap",x.className="gh-bigmap-hidden",x.innerHTML='<div id="gh-bigmap-win"><button id="gh-bigmap-close" title="Fechar (Esc/M)">✕</button><canvas id="gh-bigmap-canvas" width="720" height="720"></canvas></div>',r.appendChild(x);const C=x.querySelector("#gh-bigmap-canvas"),I=C.getContext("2d");let F=null;const V=()=>!x.classList.contains("gh-bigmap-hidden"),Q=(L,G,at,Y,et)=>{L.save(),L.translate(G,at),L.rotate(et),L.beginPath(),L.moveTo(Y,0),L.lineTo(-Y*.7,Y*.62),L.lineTo(-Y*.7,-Y*.62),L.closePath(),L.fillStyle="#ffd964",L.shadowColor="rgba(255,210,90,.9)",L.shadowBlur=5,L.fill(),L.restore()},$=L=>{const G=A;if(!G)return;const at=w.width,Y=w.height;G.clearRect(0,0,at,Y),G.fillStyle="#0b0d12",G.fillRect(0,0,at,Y);const et=M,lt=2*et+1,Mt=at/lt;for(let ht=-et;ht<=et;ht++)for(let Pt=-et;Pt<=et;Pt++){const Ct=L.col+Pt,Xt=L.row+ht,U=Ct>=0&&Ct<L.cols&&Xt>=0&&Xt<L.rows;G.fillStyle=U?L.cells[Xt*L.cols+Ct]?"#54606f":"#171b22":"#0b0d12",G.fillRect(Math.round((Pt+et)*Mt),Math.round((ht+et)*Mt),Math.ceil(Mt)-1,Math.ceil(Mt)-1)}Q(G,at/2,Y/2,Math.max(4,Mt*.42),Math.atan2(L.dr,L.dc))},it=L=>{const G=I;if(!G)return;const at=C.width,Y=C.height;G.clearRect(0,0,at,Y),G.fillStyle="#0b0d12",G.fillRect(0,0,at,Y);const et=12,lt=Math.max(3,Math.floor(Math.min((at-2*et)/L.cols,(Y-2*et)/L.rows))),Mt=lt*L.cols,ht=lt*L.rows,Pt=Math.round((at-Mt)/2),Ct=Math.round((Y-ht)/2);for(let Xt=0;Xt<L.rows;Xt++)for(let U=0;U<L.cols;U++)G.fillStyle=L.cells[Xt*L.cols+U]?"#5a6675":"#171b22",G.fillRect(Pt+U*lt,Ct+Xt*lt,lt-1,lt-1);Q(G,Pt+L.col*lt+lt/2,Ct+L.row*lt+lt/2,Math.max(6,lt*.75),Math.atan2(L.dr,L.dc))},j=()=>{x.classList.remove("gh-bigmap-hidden"),F&&it(F)},ct=()=>x.classList.add("gh-bigmap-hidden");R.addEventListener("click",L=>{L.preventDefault(),j()}),x.querySelector("#gh-bigmap-close").addEventListener("click",L=>{L.preventDefault(),ct()}),x.addEventListener("click",L=>{L.target===x&&ct()}),window.addEventListener("keydown",L=>{L.code==="KeyM"?(L.preventDefault(),V()?ct():j()):L.code==="Escape"&&ct()});const gt=document.createElement("div");gt.id="gh-clock",gt.innerHTML=`<img class="gh-sun" src="${Tg}" alt="" draggable="false"/><img class="gh-moon" src="${Eg}" alt="" draggable="false"/>`,r.appendChild(gt);const Et=gt.querySelector(".gh-sun"),Ot=gt.querySelector(".gh-moon"),Yt=document.createElement("button");Yt.id="gh-char-btn",Yt.title="Personagem (C)",Yt.innerHTML=`<img class="gh-char-ico" src="${wg}" alt=""/>`,r.appendChild(Yt);const J=[{key:"main",label:"Arma",gc:"1 / 3",gr:"1 / 5"},{key:"off",label:"Secundária",gc:"7 / 9",gr:"1 / 5"},{key:"head",label:"Elmo",gc:"4 / 6",gr:"1 / 3"},{key:"amulet",label:"Amul.",gc:"6 / 7",gr:"2 / 3"},{key:"chest",label:"Peitoral",gc:"4 / 6",gr:"3 / 6"},{key:"ring1",label:"Anel",gc:"3 / 4",gr:"4 / 5"},{key:"ring2",label:"Anel",gc:"6 / 7",gr:"4 / 5"},{key:"hands",label:"Luvas",gc:"2 / 4",gr:"5 / 7"},{key:"belt",label:"Cinto",gc:"4 / 6",gr:"6 / 7"},{key:"feet",label:"Botas",gc:"6 / 8",gr:"5 / 7"}],rt=L=>`<div class="gh-slot" data-slot="${L.key}" title="${L.label}" style="grid-column:${L.gc};grid-row:${L.gr}"></div>`,pt=Array.from({length:20},(L,G)=>`<div class="gh-bag-slot" data-bag="${G}"></div>`).join(""),xt=document.createElement("div");xt.id="gh-eq",xt.className="gh-eq-hidden",xt.innerHTML='<div id="gh-eq-win"><button id="gh-eq-close" title="Fechar (Esc)">✕</button><div id="gh-eq-inner"><div class="gh-eq-title">Personagem</div><div class="gh-eq-tabs"><button class="gh-tab gh-tab-on" data-tab="equip">Equipamento</button><button class="gh-tab" data-tab="stats">Atributos</button></div><div class="gh-eq-body"><div class="gh-tabpane" data-pane="equip"><div class="gh-section"><div class="gh-sec-head">Equipamentos</div><div class="gh-eq-doll">'+J.map(rt).join("")+`</div></div><div class="gh-section"><div class="gh-sec-head">Inventário</div><div class="gh-bag">${pt}</div></div></div><div class="gh-tabpane gh-pane-hidden" data-pane="stats"><div class="gh-eq-stats" id="gh-eq-stats"></div></div></div></div></div>`,r.appendChild(xt),xt.querySelectorAll(".gh-tab").forEach(L=>L.addEventListener("click",G=>{G.preventDefault();const at=L.dataset.tab;xt.querySelectorAll(".gh-tab").forEach(Y=>Y.classList.toggle("gh-tab-on",Y===L)),xt.querySelectorAll(".gh-tabpane").forEach(Y=>Y.classList.toggle("gh-pane-hidden",Y.dataset.pane!==at))}));const It=xt.querySelector("#gh-eq-stats"),Ht=Array.from(xt.querySelectorAll(".gh-bag-slot")),se=()=>xt.classList.remove("gh-eq-hidden"),Vt=()=>xt.classList.add("gh-eq-hidden"),le=()=>xt.classList.contains("gh-eq-hidden")?se():Vt();Yt.addEventListener("click",L=>{L.preventDefault(),le()}),xt.querySelector("#gh-eq-close").addEventListener("click",L=>{L.preventDefault(),Vt()}),xt.addEventListener("click",L=>{L.target===xt&&Vt()}),window.addEventListener("keydown",L=>{L.code==="KeyC"?(L.preventDefault(),le()):L.code==="Escape"&&Vt()});const O=document.createElement("div");O.id="gh-dmg",r.appendChild(O);const me=document.createElement("div");me.id="pad",r.appendChild(me);const Wt=L=>`<img class="gh-btn-ico" src="${L}" alt="" draggable="false"/>`,qt=(L,G)=>{let at;const Y=lt=>{lt.preventDefault(),t(G),at=window.setInterval(()=>t(G),Ec)},et=()=>{at&&window.clearInterval(at),at=void 0};L.addEventListener("pointerdown",Y),L.addEventListener("pointerup",et),L.addEventListener("pointerleave",et),L.addEventListener("pointercancel",et),L.addEventListener("contextmenu",lt=>lt.preventDefault())},At=document.createElement("div");At.className="gh-cluster gh-move";const Kt=(L,G)=>{const at=document.createElement("button");return at.className="gh-dtap "+G,qt(at,L),at};At.appendChild(Kt("forward","gh-dup")),At.appendChild(Kt("back","gh-ddown")),At.appendChild(Kt("turnLeft","gh-dleft")),At.appendChild(Kt("turnRight","gh-dright")),me.appendChild(At);const yt=document.createElement("button");yt.className="gh-btn gh-act",yt.innerHTML=Wt(Sg);const P=L=>{L.preventDefault(),t("interact")};yt.addEventListener("pointerdown",P),yt.addEventListener("contextmenu",L=>L.preventDefault()),me.appendChild(yt);let S=null;{S=document.createElement("button"),S.className="gh-btn gh-atk",S.innerHTML=Wt(yg);const L=G=>{G.preventDefault(),t("attack")};S.addEventListener("pointerdown",L),S.addEventListener("contextmenu",G=>G.preventDefault()),me.appendChild(S)}const k=document.createElement("div");k.id="gh-prompt",k.style.display="none",me.appendChild(k);const Z=document.createElement("div");Z.id="gh-dialogue",Z.style.display="none",Z.innerHTML='<img class="gh-dlg-portrait" alt="" /><div class="gh-dlg-body"><div class="gh-dlg-name"></div><div class="gh-dlg-text"></div><div class="gh-dlg-hint">toque para continuar ▸</div></div>',Z.addEventListener("pointerdown",L=>{L.preventDefault(),t("interact")}),me.appendChild(Z);const tt=Z.querySelector(".gh-dlg-name"),K=Z.querySelector(".gh-dlg-text"),vt=Z.querySelector(".gh-dlg-portrait");return Rg(),{setPrompt(L){L?(k.textContent=L,k.style.display="block",yt.classList.add("gh-act-on")):(k.style.display="none",yt.classList.remove("gh-act-on"))},showDialogue(L,G,at){tt.textContent=L,K.textContent=G,at?(vt.src=at,vt.style.display="block"):(vt.removeAttribute("src"),vt.style.display="none"),Z.style.display="flex",k.style.display="none"},hideDialogue(){Z.style.display="none"},setHealth(L){const G=Math.max(0,Math.min(1,L));y.style.width=G*100+"%",y.style.background=G>.5?"linear-gradient(#e35d4c,#b3241a)":G>.25?"linear-gradient(#e08a2c,#9a4a10)":"linear-gradient(#c23a24,#7a1610)"},setMana(L){const G=Math.max(0,Math.min(1,L));v.style.width=G*100+"%"},setStats(L){const G=L.xpMax>0?Math.max(0,Math.min(1,L.xp/L.xpMax)):0,at=(Y,et)=>`<div class="gh-stat"><span>${Y}</span><b>${et}</b></div>`;It.innerHTML=`<div class="gh-eq-lvl">Nível ${L.level}<div class="gh-xp"><div class="gh-xp-fill" style="width:${G*100}%"></div></div></div><div class="gh-stat-cols">`+at("Vida",`${L.hp}/${L.hpMax}`)+at("Mana",`${L.mp}/${L.mpMax}`)+at("Ataque",`${L.atk}`)+at("Defesa",`${L.def}`)+at("Força",`${L.str}`)+at("Destreza",`${L.dex}`)+at("Inteligência",`${L.int}`)+at("Ouro",`${L.gold}`)+"</div>"},flashDamage(){O.style.animation="none",O.offsetWidth,O.style.animation="gh-dmg 360ms ease-out"},swingWeapon(){if(!h||!a||a.slot!=="main"||_)return-1;_=!0,m.forEach(H=>window.clearTimeout(H)),m.length=0,f||(f=r.querySelector("canvas"));const L=c,G=gg[a.style],at=G.windup+G.strike+G.recover,Y=a.cooldown??G.cooldown,et=Math.round(G.windup+G.strike*.45),lt=G.windup/at,Mt=et/at,ht=(G.windup+G.strike)/at,Pt=G.weight,Ct=H=>`perspective(760px) rotateY(${H.ry}deg) rotateX(${H.rx}deg) rotateZ(${H.rz}deg) translate(${H.tx}%,${H.ty}%) scale(${H.s})`,Xt="drop-shadow(-6px 2px 8px rgba(0,0,0,0.45))",U=H=>`${Xt} blur(${H}px)`;if(L.getAnimations?.().forEach(H=>H.cancel()),L.animate([{transform:Ct(zl),filter:U(0),offset:0},{transform:Ct(G.wind),filter:U(0),offset:lt},{transform:Ct(G.hit),filter:U(Math.min(3,1.6*Pt)),offset:Mt},{transform:Ct(G.follow),filter:U(.3),offset:ht},{transform:Ct(zl),filter:U(0),offset:1}],{duration:at,easing:"ease-out",fill:"both"}),G.imgSpin&&h){h.getAnimations?.().forEach(ft=>ft.cancel());const H=G.imgSpin,ot=ft=>`perspective(620px) rotateY(${ft}deg)`;h.animate([{transform:ot(0),offset:0},{transform:ot(H.wind),offset:lt},{transform:ot(H.hit),offset:Mt},{transform:ot(H.follow),offset:ht},{transform:ot(0),offset:1}],{duration:at,easing:"ease-out",fill:"both"})}const ut=G.fx==="arcBig"||G.fx==="smashwave",q=G.fx==="smashwave";return m.push(window.setTimeout(()=>{if(d)if(d.getAnimations?.().forEach(H=>H.cancel()),G.fx==="streak")d.animate([{opacity:0,transform:"rotate(-4deg) scaleX(0.35) scaleY(0.5)"},{opacity:.9,transform:"rotate(-4deg) scaleX(1.15) scaleY(0.62)",offset:.3},{opacity:0,transform:"rotate(-4deg) scaleX(1.35) scaleY(0.66)"}],{duration:190,easing:"ease-out"});else if(q)d.animate([{opacity:0,transform:"rotate(-8deg) scale(0.9)"},{opacity:.5,transform:"rotate(-8deg) scale(1.5) translateY(6%)",offset:.28},{opacity:0,transform:"rotate(-8deg) scale(1.75) translateY(10%)"}],{duration:230,easing:"ease-out"});else{const H=G.fx==="arcBig"?1.34:1;d.animate([{opacity:0,transform:`rotate(-8deg) scale(${.7*H})`},{opacity:.98,transform:`rotate(-8deg) scale(${1*H})`,offset:.26},{opacity:0,transform:`rotate(-8deg) scale(${1.14*H})`}],{duration:220,easing:"ease-out"})}if(p&&ut){p.getAnimations?.().forEach(ot=>ot.cancel());const H=q?1.55:1.05;p.animate([{opacity:0,transform:"translate(-50%,-50%) scale(0.2)"},{opacity:q?.95:.8,transform:`translate(-50%,-50%) scale(${.72*H})`,offset:.22},{opacity:0,transform:`translate(-50%,-50%) scale(${1.4*H})`}],{duration:Math.round(240+Pt*80),easing:"ease-out"})}if(u){u.getAnimations?.().forEach(ot=>ot.cancel());const H=Math.max(.85,.7+.42*(Pt-1)+.42);u.animate([{opacity:0,transform:"scale(0.4)"},{opacity:Math.min(1,.66+.16*Pt),transform:`scale(${H})`,offset:.26},{opacity:0,transform:`scale(${1.5*(.9+.18*Pt)})`}],{duration:Math.round(190+Pt*60),easing:"ease-out"})}if(g&&q&&(g.getAnimations?.().forEach(H=>H.cancel()),g.animate([{opacity:0},{opacity:.55,offset:.18},{opacity:0}],{duration:220,easing:"ease-out"})),f){f.getAnimations?.().forEach(ot=>ot.cancel());const H=Pt;q?f.animate([{transform:"translate(0,0) scale(1)"},{transform:`translate(${-1.1*H}%,${1.3*H}%) scale(${1+.024*H}) rotate(${-.6*H}deg)`,offset:.14},{transform:`translate(${.7*H}%,${-.6*H}%) scale(${1+.012*H}) rotate(${.4*H}deg)`,offset:.34},{transform:`translate(${-.5*H}%,${.5*H}%) scale(${1+.006*H}) rotate(${-.2*H}deg)`,offset:.56},{transform:"translate(0,0) scale(1)"}],{duration:Math.round(280+Pt*55),easing:"ease-out"}):f.animate([{transform:"translate(0,0) scale(1)"},{transform:`translate(${-.8*H}%,${1*H}%) scale(${1+.018*H}) rotate(${-.45*H}deg)`,offset:.18},{transform:`translate(${.45*H}%,${-.35*H}%) scale(${1+.005*H}) rotate(${.18*H}deg)`,offset:.46},{transform:"translate(0,0) scale(1)"}],{duration:Math.round(200+Pt*45),easing:"ease-out"})}},et)),m.push(window.setTimeout(()=>_=!1,Y)),et},setInventory(L){Ht.forEach((G,at)=>{const Y=L[at];G.onclick=null,Y&&o[Y]?(G.dataset.wid=Y,G.innerHTML=`<img class="gh-item-ico" src="${o[Y].url}" alt="" title="${o[Y].name}"/>`,G.onclick=()=>this.equipWeapon(Y)):(delete G.dataset.wid,G.innerHTML="")})},equipWeapon(L){const G=o[L];if(!G)return;const at=et=>{const lt=xt.querySelector(`.gh-slot[data-slot="${et}"]`);lt&&(lt.innerHTML=`<img class="gh-item-ico" src="${G.url}" alt="" title="${G.name}"/>`)};G.slot==="off"?at("off"):(a=G,_=!1,m.forEach(et=>window.clearTimeout(et)),m.length=0,c?.getAnimations?.().forEach(et=>et.cancel()),h?.getAnimations?.().forEach(et=>et.cancel()),h.style.transform="",h.src=G.url,c&&(c.style.height=`${(62*G.scale).toFixed(1)}vh`,c.style.maxHeight=`${Math.round(640*G.scale)}px`),r.classList.toggle("gh-wpn-arcane",G.tint==="arcane"),at("main"),s?.(G)),Ht.forEach(et=>et.classList.remove("gh-slot-pulse"));const Y=xt.querySelector(`.gh-bag-slot[data-wid="${L}"]`);Y&&(Y.classList.remove("gh-slot-pulse"),Y.offsetWidth,Y.classList.add("gh-slot-pulse"))},updateMinimap(L){F=L,$(L),V()&&it(L)},setClock(L,G){const at=(L-.25)*Math.PI*2,Y=33,et=(Mt,ht)=>{const Pt=Math.sin(ht),Ct=-Math.cos(ht);Mt.style.left=50+Pt*Y+"%",Mt.style.top=50+Ct*Y+"%"};et(Et,at),et(Ot,at+Math.PI);const lt=Math.max(0,Math.min(1,G));Et.style.opacity=(.28+.72*lt).toFixed(3),Ot.style.opacity=(.28+.72*(1-lt)).toFixed(3),Et.style.filter=`drop-shadow(0 0 ${(3+7*lt).toFixed(1)}px rgba(240,180,70,${(.5*lt+.15).toFixed(2)}))`,Ot.style.filter=`drop-shadow(0 0 ${(3+7*(1-lt)).toFixed(1)}px rgba(150,190,255,${(.5*(1-lt)+.15).toFixed(2)}))`}}}function Rg(){if(document.getElementById("gh-style"))return;const r=document.createElement("style");r.id="gh-style",r.textContent=`
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
    background:url(${xg}) no-repeat center / 100% 100%;
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
    border-image:url(${Hl}) 130 repeat;
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
    border-image:url(${Hl}) 130 repeat;
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
    top:2px; left:50%; transform:translateX(-50%);
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
    background:url(${kl}) no-repeat center / 100% 100%;
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
    border-image:url(${vg}) 90 fill;
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
  .gh-eq-body { flex:1; min-height:0; overflow-y:auto; overflow-x:hidden; padding-right:2px; }
  .gh-tabpane { display:flex; flex-direction:column; gap:2.4%; }
  .gh-pane-hidden { display:none; }
  /* CAIXAS que separam "Equipado" da "Mochila": painel pintado em 9-slice
     (cantos ornamentados fixos, interior de pedra escura esticando). */
  .gh-section {
    border:clamp(13px,2.2vh,24px) solid transparent;
    border-image:url(${Ac}) 88 fill;
    box-sizing:border-box; padding:1% 2% 2%;
  }
  .gh-sec-head {
    text-align:center; font-family:"Cinzel",serif; font-weight:600;
    font-size:clamp(12px,1.8vh,16px); color:#e0cf9e;
    letter-spacing:1px; margin:0 0 2.2%; text-shadow:0 1px 3px rgba(0,0,0,.8);
  }
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
    border-image:url(${Mg}) 89 fill;
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
    background:url(${kl}) no-repeat center / 100% 100%;
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
    background:url(${bg}) no-repeat center / 100% 100%;
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
  `,document.head.appendChild(r)}const rs=["#######","#..N..#","#.....#","#.....#","#.....#","#..P..#","###X###"],Kr=rs.length,$a=rs[0].length,Js={tavern:{name:"TAVERNA",npc:"Bruno, o Taverneiro",seed:11,lines:["Bem-vindo à Taverna do Javali! Eu sou o Bruno.","Sente-se e descanse — logo você poderá pagar por um quarto e recuperar as forças."]},store:{name:"MERCADOR",npc:"Rosa, a Mercadora",seed:2,lines:["Tenho de tudo um pouco, aventureiro. Sou a Rosa.","Em breve abriremos o comércio: poções, cordas, tochas e mais."]},smith:{name:"FERREIRO",npc:"Brandt, o Ferreiro",seed:23,lines:["O fogo está quente e a bigorna, pronta. Brandt, ao seu dispor.","Traga minério e ouro que eu aprimoro suas armas e armaduras."]},alchemist:{name:"ALQUIMISTA",npc:"Isolde, a Alquimista",seed:31,lines:["Cuidado com o que respira aqui dentro... sou Isolde.","Elixires e poções logo estarão à venda na minha bancada."]}};function Fr(r){for(let t=0;t<Kr;t++){const e=rs[t].indexOf(r);if(e>=0)return{col:e,row:t}}return{col:1,row:1}}function $r(r,t){return t<0||t>=Kr||r<0||r>=$a?"#":rs[t][r]}function Qs(r,t){return".PX".includes($r(r,t))}const Cg=""+new URL("taverneiro-Ba4UKFJq.png",import.meta.url).href,Pg=""+new URL("mercadora-B8RulStP.png",import.meta.url).href,Lg=""+new URL("ferreiro-BdN9Klhc.png",import.meta.url).href,Ug=""+new URL("alquimista-ssXsgGLn.png",import.meta.url).href,Rc=""+new URL("pip-rEDWa-7w.png",import.meta.url).href,Cc=""+new URL("wilma-DI_QNtI6.png",import.meta.url).href,Dg=""+new URL("fazendeiro-CLjUAd1g.png",import.meta.url).href,Ig=""+new URL("camponesa-CrL0OA2Y.png",import.meta.url).href,Ng=""+new URL("lenhador-B54mx8Mi.png",import.meta.url).href,Pc=""+new URL("hedda-Buaz2cmx.png",import.meta.url).href,Fg=""+new URL("costureira-Br8zMBee.png",import.meta.url).href,Og=""+new URL("gunther-D_2fJfLI.png",import.meta.url).href,Bg=""+new URL("anselmo-a5GEbqfY.png",import.meta.url).href,zg=""+new URL("tam-BlgWIVim.png",import.meta.url).href,kg=""+new URL("lyle-gu11Pcfp.png",import.meta.url).href,Hg=""+new URL("pine1-Cx-eXiFP.png",import.meta.url).href,Gg=""+new URL("pine2-CUzpurmt.png",import.meta.url).href,Vg=""+new URL("pine3-SLpwxU-f.png",import.meta.url).href,Wg=""+new URL("pine4-D2rjz_P9.png",import.meta.url).href,Xg=""+new URL("cluster1-CDwqmovY.png",import.meta.url).href,qg=""+new URL("cluster2-C0czRdHN.png",import.meta.url).href,$g=""+new URL("sign_tavern-DPGpN59J.png",import.meta.url).href,Yg=""+new URL("sign_store-C8OmR8-U.png",import.meta.url).href,jg=""+new URL("sign_smith-B08qmnbc.png",import.meta.url).href,Zg=""+new URL("sign_alch-CZuh7kJW.png",import.meta.url).href,Kg=""+new URL("prop_lamp-D_-YfjKt.png",import.meta.url).href,Jg=""+new URL("prop_notice-Bo5C5meg.png",import.meta.url).href,Qg=""+new URL("enemy_skeleton-BcZFeUKH.png",import.meta.url).href,t0=""+new URL("death_poof-Cty9ahVW.png",import.meta.url).href,e0=""+new URL("sword-Cnq9dXJw.png",import.meta.url).href,n0=""+new URL("class_guerreiro-DQxwW6XE.png",import.meta.url).href,i0=""+new URL("class_ladino-CBY8tWR5.png",import.meta.url).href,r0=""+new URL("class_mago-BCWgBU8E.png",import.meta.url).href,s0=""+new URL("class_clerigo-Bv6kp9nE.png",import.meta.url).href,Zi=[{id:"guerreiro",name:"Guerreiro",emoji:"⚔️",tag:"Tanque / corpo-a-corpo",desc:"Mestre das lâminas. Encara o perigo de frente, com espada e escudo ou uma arma de duas mãos. Muita vida e dano físico.",attr:{str:8,dex:4,int:3},hp:120,mp:40,weapons:["sword","greatsword","axe","shield"],startWeapon:"sword",portrait:n0},{id:"ladino",name:"Ladino",emoji:"🗡️",tag:"Dano rápido / crítico",desc:"Ágil e furtivo. Golpeia rápido com adaga e rapieira, buscando os pontos fracos. Frágil, mas letal e veloz.",attr:{str:4,dex:8,int:3},hp:90,mp:50,weapons:["dagger","rapier"],startWeapon:"dagger",portrait:i0},{id:"mago",name:"Mago",emoji:"🔮",tag:"Dano à distância / elemental",desc:"Canaliza fogo, gelo e raio pelo cajado e pelo orbe. Devastador à distância, mas de corpo frágil. Muita mana.",attr:{str:3,dex:4,int:8},hp:75,mp:110,weapons:["staff","orb"],startWeapon:"staff",portrait:r0},{id:"clerigo",name:"Clérigo",emoji:"🕯️",tag:"Suporte / cura",desc:"Fé feita arma. Cura os aliados e esmaga o mal com maça, martelo e escudo. Equilibrado, resistente e devoto.",attr:{str:5,dex:3,int:7},hp:95,mp:90,weapons:["mace","maul","shield","staff"],startWeapon:"mace",portrait:s0}],Ya=Object.fromEntries(Zi.map(r=>[r.id,r])),Gl=5;function Lc(r,t,e){return{atkPhys:Math.round(2+r.str*1.2+r.dex*.6),atkMag:Math.round(1+r.int*1.4),crit:Math.round(3+r.dex*.8),critDmg:150+Math.round(r.dex*1),precision:Math.min(99,Math.round(85+r.dex*.6)),hp:t+r.str*2,def:Math.round(1+r.str*.5),magRes:Math.round(r.int*.5),evasion:Math.round(2+r.dex*.7),mp:e+r.int*3}}const Vl=[Hg,Gg,Wg],a0=[Vg],o0=.625,Or=[{url:Xg,aspect:1.96},{url:qg,aspect:1.72}],l0={tavern:Cg,store:Pg,smith:Lg,alchemist:Ug},c0={tavern:$g,store:Yg,smith:jg,alchemist:Zg},h0=2.6,_n=[[0,-1],[1,0],[0,1],[-1,0]],Mi={c:7,r:10},Br=10,d0=620,zr=3.2,Wl=[{c:5,r:5,dc:0,dr:1,kind:"tavern"},{c:9,r:5,dc:0,dr:1,kind:"store"},{c:1,r:9,dc:1,dr:0,kind:"smith"},{c:13,r:9,dc:-1,dr:0,kind:"alchemist"}],Xl=[{c:7,r:5,dc:0,dr:1,id:"irmaos"},{c:1,r:7,dc:1,dr:0,id:"hedda"},{c:13,r:11,dc:-1,dr:0,id:"elspethhome"}],u0=[{id:"elspeth",c:8,r:6,night:[12,11],seed:1,name:"Elspeth, a Camponesa",lines:["Bom dia! Colhi legumes fresquinhos hoje cedo.","O poço da praça nunca seca, pode beber à vontade."]},{id:"corvin",c:10,r:6,night:[4,6],seed:2,name:"Corvin, o Lenhador",lines:["Cortar lenha é honesto, mas o bosque anda estranho ultimamente.","Dizem que há algo à espreita naquela montanha ao norte..."]},{id:"wren",c:12,r:10,night:[2,7],seed:3,name:"Wren, a Costureira",lines:["Precisa remendar essa capa? Faço um preço justo.","Roupa boa aquece o corpo — e o frio lá embaixo é de rachar."]},{id:"alard",c:2,r:11,night:[6,6],seed:5,name:"Alard, o Velho Fazendeiro",lines:["Cuidado, jovem. A escada sob a montanha leva às profundezas.","Equipe-se bem antes de descer. Já vi muitos partirem e nenhum voltar."]},{id:"gunther",c:8,r:13,night:[11,7],seed:9,name:"Gunther, o Vigia",lines:["Mantenha a paz por aqui, forasteiro.","Enquanto eu montar guarda, o vilarejo dorme tranquilo."]},{id:"anselmo",c:3,r:6,night:[2,6],seed:7,name:"Frei Anselmo",lines:["Que a luz o acompanhe nas trevas, viajante.","Reze antes de descer àquela masmorra. Vai precisar."]},{id:"tam",c:9,r:12,night:[8,6],seed:10,name:"Velho Tam",lines:["Uma moedinha para um pobre velho?","Já fui aventureiro como você... até a montanha levar tudo de mim."]},{id:"lyle",c:2,r:8,night:[5,6],seed:12,name:"Lyle, o Bardo",lines:["Ei! Quer ouvir a balada do herói que desceu à masmorra?","Faça feitos grandiosos e eu comporei uma canção sobre você!"]}],f0={pip:Rc,wilma:Cc,alard:Dg,elspeth:Ig,corvin:Ng,hedda:Pc,wren:Fg,gunther:Og,anselmo:Bg,tam:zg,lyle:kg},p0={},ta={irmaos:{name:"Casa dos Irmãos",residents:[{col:2,row:2,seed:4,scale:.7,name:"Pip",art:Rc,lines:["Essa é a nossa casa! Eu e a Wilma somos irmãos.","Um dia vou ser aventureiro igual você — a Wilma que fica de babá!"]},{col:4,row:2,seed:6,scale:.66,name:"Wilma",art:Cc,lines:["O Pip vive fugindo pra praça. Alguém tem que cuidar dele!","À noite dá pra ouvir barulhos vindo da montanha... eu tranco a porta."]}]},hedda:{name:"Casa de Hedda",residents:[{col:3,row:2,seed:8,name:"Hedda, a Matriarca",art:Pc,lines:["Entre, entre. Minha casa é modesta, mas aquecida.","Já vi muitos invernos passarem por Grimhollow. Sente-se, tome um chá."]}]},elspethhome:{name:"Casa de Elspeth",residents:[]}},m0=96;function ea(r,t=m0){const e=[];for(const n of r){if(n.length<=t){e.push(n);continue}const i=n.split(/\s+/);let s="";for(const o of i)s&&s.length+1+o.length>t?(e.push(s+" …"),s=o):s=s?s+" "+o:o;s&&e.push(s)}return e}const Jr=class Jr{constructor(t,e){Lt(this,"renderer");Lt(this,"scene",new km);Lt(this,"camera");Lt(this,"container");Lt(this,"foliageFx");Lt(this,"col");Lt(this,"row");Lt(this,"facing",0);Lt(this,"anim",null);Lt(this,"world",new Oe);Lt(this,"blocked",new Set);Lt(this,"npcs",[]);Lt(this,"flames",[]);Lt(this,"lampFlames",[]);Lt(this,"lampGlows",[]);Lt(this,"glowTex");Lt(this,"dayNightLights",[]);Lt(this,"outdoor",!1);Lt(this,"_sky",new Ut);Lt(this,"_cA",new Ut);Lt(this,"_cB",new Ut);Lt(this,"waterGlint");Lt(this,"smoke",[]);Lt(this,"billboardProps",[]);Lt(this,"playerMaxHp",100);Lt(this,"playerHp",100);Lt(this,"playerMaxMp",100);Lt(this,"playerMp",100);Lt(this,"stats",{level:1,xp:0,xpMax:100,atk:8,def:2,str:5,dex:5,int:5,gold:0});Lt(this,"currentWeapon",null);Lt(this,"playerName","Herói");Lt(this,"classId","guerreiro");Lt(this,"enemy",null);Lt(this,"poofs",[]);Lt(this,"poofTex");Lt(this,"_smokeTex");Lt(this,"ui");Lt(this,"location","village");Lt(this,"doorMap",new Map);Lt(this,"homeDoorMap",new Map);Lt(this,"npcMap",new Map);Lt(this,"returnTo",{col:0,row:0,facing:0});Lt(this,"dialogue",null);Lt(this,"lastPrompt"," ");Lt(this,"artCache",new Map);Lt(this,"_shadowTex");Lt(this,"animTex",[]);Lt(this,"walkers",[]);Lt(this,"npcNight",!1);Lt(this,"miniGrid",null);this.container=t;const n=e?Ya[e.classId]:null;if(n&&e){this.playerName=e.name,this.classId=n.id;const a=e.attr??n.attr,l=Lc(a,n.hp,n.mp);this.stats.str=a.str,this.stats.dex=a.dex,this.stats.int=a.int,this.playerMaxHp=l.hp,this.playerHp=l.hp,this.playerMaxMp=l.mp,this.playerMp=l.mp}this.renderer=new zm({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.appendChild(this.renderer.domElement);const i=document.createElement("div");i.style.cssText="position:absolute;inset:0;pointer-events:none;opacity:0;z-index:5;background:radial-gradient(ellipse at center,rgba(30,55,25,0) 42%,rgba(24,46,20,0.55) 78%,rgba(16,32,14,0.8) 100%);",getComputedStyle(t).position==="static"&&(t.style.position="relative"),t.appendChild(i),this.foliageFx=i,this.scene.background=new Ut($i),this.camera=new Ve(78,1,.05,400),this.camera.rotation.order="YXZ",this.scene.add(this.world),this.col=0,this.row=0,this.ui=Ag(t,a=>this.onAction(a),e0,void 0,qa,a=>this.onEquip(a)),this.ui.setInventory(qa.map(a=>a.id)),this.ui.equipWeapon(n?.startWeapon??"sword"),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.ui.setMana(this.playerMp/this.playerMaxMp),this.refreshStats();const s=Ul();this.enterLocation("village",s.col,s.row,0),window.addEventListener("resize",()=>this.resize()),this.resize(),this.renderer.setAnimationLoop(a=>this.tick(a));const o=document.fonts;o?.ready&&o.ready.then(()=>{this.dialogue||this.enterLocation(this.location,this.col,this.row,this.facing)})}enterLocation(t,e,n,i){this.clearWorld(),this.location=t,this.outdoor=t==="village"||t==="forest",this.dialogue=null,this.ui.hideDialogue(),t==="village"?(this.scene.fog=new yi($i,D*2.6,D*11),this.scene.background=new Ut($i),this.addVillageLights(),this.buildVillage()):t==="forest"?(this.scene.fog=new yi($i,D*3.5,D*18),this.scene.background=new Ut($i),this.addForestLights(),this.buildForest()):t in ta?(this.scene.fog=new yi(2365968,D*4,D*12),this.scene.background=new Ut(1445640),this.addInteriorLights(),this.buildHome(t)):(this.scene.fog=new yi(1709069,D*4,D*12),this.scene.background=new Ut(1183241),this.addInteriorLights(),this.buildInterior(t)),this.col=e,this.row=n,this.facing=i,this.camera.position.set(e*D,Gs,n*D),this.camera.rotation.y=-i*(Math.PI/2),this.anim=null,this.lastPrompt=" ",this.ui.setPrompt(null),this.buildMiniGrid(),this.pushMinimap()}clearWorld(){this.world.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const n=e.material;Array.isArray(n)?n.forEach(i=>i.dispose()):n&&n.dispose()}),this.world.clear(),this.blocked.clear(),this.npcs=[],this.flames=[],this.lampFlames=[],this.lampGlows=[],this.dayNightLights=[],this.animTex=[],this.walkers=[],this.smoke=[],this.billboardProps=[],this.enemy=null,this.poofs=[],this.waterGlint=void 0,this.doorMap.clear(),this.homeDoorMap.clear(),this.npcMap.clear()}addVillageLights(){const t=new ks(9081506,.75),e=new Os(10135224,3812380,.7),n=new Al(16771008,.55);n.position.set(-6,12,4),this.world.add(t),this.world.add(e),this.world.add(n),this.registerDayLight(t,3820138,.46),this.registerDayLight(e,2899038,.5),this.registerDayLight(n,5596832,.14)}registerDayLight(t,e,n){this.dayNightLights.push({light:t,dayI:t.intensity,dayColor:t.color.clone(),nightColor:new Ut(e),nightMul:n})}daylight(t){const e=Math.sin((t-.25)*Math.PI*2);return Math.max(0,Math.min(1,e*1.15))}atmosColor(t,e){const n=Jr.SKY_KEYS;let i=n[0],s=n[n.length-1];for(let a=0;a<n.length-1;a++)if(t>=n[a][0]&&t<=n[a+1][0]){i=n[a],s=n[a+1];break}const o=(t-i[0])/(s[0]-i[0]||1);e.copy(this._cA.set(i[1])).lerp(this._cB.set(s[1]),o)}updateDayNight(t){if(!this.outdoor)return;const e=(t/Dr+Ir)%1,n=this.daylight(e);this.atmosColor(e,this._sky),this.scene.fog&&this.scene.fog.color.copy(this._sky),this.scene.background.copy(this._sky);for(const s of this.dayNightLights){const o=s.nightMul+(1-s.nightMul)*n;s.light.intensity=s.dayI*o,s.light.color.copy(s.nightColor).lerp(s.dayColor,n)}const i=Math.max(0,Math.min(1,(.5-n)/.35));for(const s of this.lampFlames){const o=s.base+Math.sin(t*.011+s.base)*.8+Math.sin(t*.027)*.5;s.light.intensity=Math.max(0,o)*i}for(const s of this.lampGlows){const o=.88+Math.sin(t*.011)*.08+Math.sin(t*.027)*.04;s.material.opacity=i*o}}addInteriorLights(){this.world.add(new ks(12888176,1.15)),this.world.add(new Os(10521184,3813408,.75))}buildVillage(){const e=[Me(1),Me(5),Me(9)].map(u=>new mt({map:u})),n=new mt({map:Il(7)}),i=new mt({map:$s(3),side:$t}),s=new mt({map:Nl(11),side:$t}),o=new mt({map:tg(13),transparent:!0,side:$t}),a=(u,p,g=0)=>Math.sin(u*12.9+p*78.2+g*3.1)*43758.5%1,l=new Ft(D,D);for(let u=0;u<Le;u++)for(let p=0;p<qe;p++){if(Ll(p,u))continue;const g=new nt(l,n);g.rotation.x=-Math.PI/2;const _=Math.floor(Math.abs(a(p,u,5))*4)%4;g.rotation.z=_*Math.PI/2,g.position.set(p*D,0,u*D),this.world.add(g)}const c=new ce(D,Ln,D),h=new Set([...Wl.map(u=>`${u.c},${u.r},${u.dc},${u.dr}`),...Xl.map(u=>`${u.c},${u.r},${u.dc},${u.dr}`)]),d=new Set;for(let u=0;u<Le;u++)for(let p=0;p<qe;p++){if(fe(p,u)!=="building")continue;const g=_n.filter(([f,b])=>{const y=fe(p+f,u+b);return y==="street"||y==="barrel"});if(g.length===0)continue;const _=e[Math.floor(Math.abs(a(p,u))*3%3)],m=new nt(c,_);m.position.set(p*D,Ln/2,u*D),this.world.add(m);for(const[f,b]of g){if(h.has(`${p},${u},${f},${b}`)){d.add(`${p},${u},${f},${b}`);continue}Math.abs(a(p,u,f*2+b))<.5&&this.addDecal(p,u,f,b,o,"window")}}this.buildRoofs(i),this.buildMountain(),this.buildTunnel(),this.buildDungeonEnemy(),this.buildWell(),this.buildEstablishments(s),this.buildHomes(s),this.buildVillageForestGate(),this.buildVillageProps(),this.buildChimneySmoke(),this.buildNPCs()}buildVillageProps(){this.addLampPost(4,7),this.addLampPost(10,7),this.addLampPost(4,11),this.addLampPost(10,11),this.addWallProp(2,10,Jg,2.7,"W")}makeGlowTex(){if(this.glowTex)return this.glowTex;const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255,244,214,1)"),n.addColorStop(.28,"rgba(255,207,138,0.72)"),n.addColorStop(1,"rgba(255,190,120,0)"),e.fillStyle=n,e.fillRect(0,0,64,64),this.glowTex=new Si(t),this.glowTex}addLampPost(t,e,n=0,i=0){const s=t*D+n,o=e*D+i;this.addPropBillboard(t,e,Kg,3.4,n,i);const a=2.95,l=new gn(16764810,4.2,17,2);l.position.set(s,a,o),this.world.add(l),this.lampFlames.push({light:l,base:4.2});const c=new yl(new Wa({map:this.makeGlowTex(),transparent:!0,opacity:0,depthWrite:!1,blending:na}));c.position.set(s,a,o),c.scale.set(2.6,2.6,1),this.world.add(c),this.lampGlows.push(c)}addPropBillboard(t,e,n,i,s=0,o=0){const a=new mt({transparent:!0,opacity:0,alphaTest:.4,side:$t}),l=new nt(new Ft(i,i),a);l.position.set(t*D+s,i/2,e*D+o),this.world.add(l),this.billboardProps.push(l),this.loadArt(n,c=>{const h=c.image,d=h&&h.width&&h.height?h.width/h.height:1;l.geometry.dispose(),l.geometry=new Ft(i*d,i),l.position.y=i/2,a.map=c,a.opacity=1,a.needsUpdate=!0})}addWallProp(t,e,n,i,s){const o=new mt({transparent:!0,opacity:0,alphaTest:.4,side:$t}),a=new nt(new Ft(i,i),o),l=D/2-.2;let c=0,h=0,d=0;s==="N"?(d=0,h=-l):s==="S"?(d=Math.PI,h=l):s==="W"?(d=Math.PI/2,c=-l):(d=-Math.PI/2,c=l),a.rotation.y=d,a.position.set(t*D+c,i/2,e*D+h),this.world.add(a),this.loadArt(n,u=>{const p=u.image,g=p&&p.width&&p.height?p.width/p.height:1;a.geometry.dispose(),a.geometry=new Ft(i*g,i),a.position.y=i/2,o.map=u,o.opacity=1,o.needsUpdate=!0})}buildDungeonEnemy(){const i=new mt({transparent:!0,opacity:0,alphaTest:.4,side:$t}),s=new nt(new Ft(2.6*.47,2.6),i);s.position.set(2*D,2.6/2,4*D),this.world.add(s),this.billboardProps.push(s),this.blocked.add("2,4");const o=1.3,a=new Oe,l=new nt(new Ft(o+.12,.26),new be({color:1182986,transparent:!0,opacity:.85})),c=new nt(new Ft(o,.16),new be({color:13777454}));c.position.z=.01,a.add(l),a.add(c),a.position.set(2*D,2.6+.45,4*D),this.world.add(a),this.billboardProps.push(a),this.enemy={mesh:s,mat:i,c:2,r:4,bx:2*D,bz:4*D,hp:8,maxHp:8,hitAt:0,dyingAt:0,atkAt:0,hitApplied:!1,nextAtk:0,bar:a,barFill:c};const h=new gn(6987984,.55,5,2);h.position.set(2*D,1.7,4*D),this.world.add(h),this.poofTex||this.loadArt(t0,d=>this.poofTex=d),this.loadArt(Qg,d=>{const u=d.image,p=u&&u.width&&u.height?u.width/u.height:.47;s.geometry.dispose(),s.geometry=new Ft(2.6*p,2.6),s.position.y=2.6/2,i.map=d,i.opacity=1,i.needsUpdate=!0})}onEquip(t){this.currentWeapon=t,this.stats.atk=8+t.dmg,this.refreshStats()}tryHitEnemy(){const t=this.enemy;if(!t||t.dyingAt)return;const[e,n]=_n[this.facing];if(this.col+e!==t.c||this.row+n!==t.r)return;t.hp-=this.currentWeapon?.dmg??1,t.hitAt=performance.now();const i=Math.max(1e-4,t.hp/t.maxHp);t.barFill.scale.x=i,t.barFill.position.x=-(1-i)*1.3/2,t.hp<=0&&(t.dyingAt=t.hitAt,this.blocked.delete(`${t.c},${t.r}`),this.spawnPoof(t.bx,t.bz))}spawnPoof(t,e){if(!this.poofTex)return;const n=this.poofTex.clone();n.needsUpdate=!0,n.repeat.set(1/Br,1),n.offset.set(0,0);const i=new be({map:n,transparent:!0,depthWrite:!1,side:$t}),s=new nt(new Ft(3.8,2.85),i);s.position.set(t,1.5,e),this.world.add(s),this.poofs.push({mesh:s,mat:i,tex:n,born:performance.now()})}updatePoofs(t){if(this.poofs.length===0)return;const e=this.camera.position.x,n=this.camera.position.z;for(let i=this.poofs.length-1;i>=0;i--){const s=this.poofs[i],o=(t-s.born)/d0;if(o>=1){this.world.remove(s.mesh),s.mesh.geometry.dispose(),s.mat.dispose(),s.tex.dispose(),this.poofs.splice(i,1);continue}const a=Math.min(Br-1,Math.floor(o*Br));s.tex.offset.x=a/Br,s.mesh.rotation.y=Math.atan2(e-s.mesh.position.x,n-s.mesh.position.z)}}refreshStats(){this.ui.setStats({level:this.stats.level,xp:this.stats.xp,xpMax:this.stats.xpMax,hp:this.playerHp,hpMax:this.playerMaxHp,mp:this.playerMp,mpMax:this.playerMaxMp,atk:this.stats.atk,def:this.stats.def,str:this.stats.str,dex:this.stats.dex,int:this.stats.int,gold:this.stats.gold})}damagePlayer(t){this.playerHp<=0||(this.playerHp=Math.max(0,this.playerHp-t),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.refreshStats(),this.ui.flashDamage(),this.playerHp<=0&&window.setTimeout(()=>{this.playerHp=this.playerMaxHp,this.ui.setHealth(1),this.refreshStats();const e=Ul();this.enterLocation("village",e.col,e.row,0)},800))}buildChimneySmoke(){const t=this.smokeTex(),e=[[5,5],[9,5],[1,9],[13,9],[7,5],[1,7]];for(const[n,i]of e)for(let s=0;s<4;s++){const o=new nt(new Ft(1.4,1.4),new be({map:t,transparent:!0,depthWrite:!1,opacity:0}));o.position.set(n*D+.4,Ln+Hs,i*D),o.userData={phase:(n*3.1+i*1.7+s*1.3)%4,baseX:n*D+.4,baseZ:i*D},this.world.add(o),this.smoke.push(o)}}smokeTex(){if(this._smokeTex)return this._smokeTex;const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,2,32,32,30);n.addColorStop(0,"rgba(220,220,224,0.9)"),n.addColorStop(1,"rgba(220,220,224,0)"),e.fillStyle=n,e.beginPath(),e.arc(32,32,30,0,Math.PI*2),e.fill();const i=new Si(t);return i.colorSpace=ye,this._smokeTex=i,i}buildVillageForestGate(){const t=Dl(),e=t.col*D,n=t.row*D,i=new mt({map:Me(5)}),s=new mt({map:Ks(63)}),o=new Ft(D,D);for(let g=0;g<=2;g++){const _=new nt(o,s);_.rotation.x=-Math.PI/2,_.rotation.z=g%2*Math.PI/2,_.position.set(e,.02,(t.row-g)*D),this.world.add(_)}const a=new Oe,l=new ce(.36,3.4,.36);for(const g of[-1.5,1.5]){const _=new nt(l,i);_.position.set(g,1.7,0),a.add(_)}const c=new nt(new ce(3.7,.36,.4),i);c.position.set(0,3.35,0),a.add(c);for(const g of[-1,1]){const _=new nt(new ce(.7,.16,.16),i);_.position.set(g*1.05,3,0),_.rotation.z=g*(Math.PI/4),a.add(_)}const h=new nt(new Ft(1.7,.6),new be({map:Ys("Floresta"),transparent:!0,side:$t}));h.position.set(0,2.72,0),h.rotation.y=Math.PI,a.add(h);const d=new mt({color:3815994});for(const g of[-.7,.7]){const _=new nt(new de(.02,.02,.4,5),d);_.position.set(g,3.05,0),a.add(_)}a.position.set(e,0,n),this.world.add(a);const u=new mt({map:Zs(61)});u.map.repeat.set(8,5);const p=new nt(new Ft(8*D,5*D),u);p.rotation.x=-Math.PI/2,p.position.set(e,-.02,(t.row+2.5)*D),this.world.add(p);for(let g=1;g<=3;g++){const _=new nt(o,s);_.rotation.x=-Math.PI/2,_.rotation.z=g%2*Math.PI/2,_.position.set(e,.02,(t.row+g)*D),this.world.add(_)}this.buildTreelineBackdrop(e,(t.row+3.4)*D,Math.PI)}makeClusterMats(){return Or.map(t=>{const e=new mt({transparent:!0,opacity:0,side:$t});return this.loadArt(t.url,n=>{e.map=n,e.alphaTest=.35,e.opacity=1,e.needsUpdate=!0}),{mat:e,aspect:t.aspect}})}buildTreelineBackdrop(t,e,n){if(Or.length===0)return;const i=this.makeClusterMats(),s=13;let o=t-s*1.9;for(let a=0;a<3;a++){const l=i[a%i.length],c=s*l.aspect,h=new nt(new Ft(c,s),l.mat);h.position.set(o+c/2,s/2-1,e),h.rotation.y=n,a===1&&(h.scale.x=-1),this.world.add(h),o+=c*.92}}buildMountain(){const t=new mt({map:js(41)});let e=qe,n=Le;for(let s=0;s<Le;s++)for(let o=0;o<qe;o++)fe(o,s)==="mountain"&&(e=Math.min(e,o),n=Math.min(n,s));const i=(s,o)=>{const a=s-e,l=o-n,c=Math.sqrt(a*a+l*l);return Math.max(Ln+2.5,Ln+11-c*1.7+this.mHash(s,o)*2)};for(let s=0;s<Le;s++)for(let o=0;o<qe;o++){const a=fe(o,s),l=a==="tunnel"||a==="stairs";if(a!=="mountain"&&!l)continue;const c=i(o,s),h=l?zr:0,d=c-h;if(d<=.2)continue;const u=new nt(new ce(D,d,D),t);if(u.position.set(o*D,h+d/2,s*D),this.world.add(u),!l&&this.mHash(o,s,2)>.35){const p=1.6+this.mHash(o,s,3)*1.8,g=new nt(new ce(p,p,p),t);g.position.set(o*D+(this.mHash(o,s,4)-.5)*2.4,c+p*.25,s*D+(this.mHash(o,s,5)-.5)*2.4),g.rotation.y=this.mHash(o,s,6)*Math.PI,this.world.add(g)}}}mHash(t,e,n=0){const i=Math.sin(t*41.3+e*17.7+n*7.13)*9871.2;return i-Math.floor(i)}buildBarrels(t,e,n){const i=new de(.4,.34,1.05,14),s=new de(.41,.41,.08,14);for(let o=0;o<Le;o++)for(let a=0;a<qe;a++){if(fe(a,o)!=="barrel")continue;const l=_n.filter(([v,E])=>fe(a+v,o+E)==="building");if(l.length===0)continue;const c=l.find(([v,E])=>!e.has(`${a+v},${o+E},${-v},${-E}`))||l[0],[h,d]=c;let u=0,p=0;const g=1.05;h!==0?p=(fe(a,o-1)==="building"?-1:fe(a,o+1)==="building"||n(a,o)>0?1:-1)*g:u=(fe(a-1,o)==="building"?-1:fe(a+1,o)==="building"||n(a,o)>0?1:-1)*g;const _=a*D+h*(D/2-.5)+u,m=o*D+d*(D/2-.5)+p,f=new Oe,b=new nt(i,t);b.position.y=.52,f.add(b);const y=new nt(s,t);if(y.position.y=1.05,f.add(y),n(a,o,5)>.15){const v=new nt(i,t);v.scale.set(.82,.82,.82),v.position.set(-u*.5-h*.1,.42,-p*.5-d*.1),f.add(v)}f.position.set(_,0,m),this.world.add(f)}}buildWell(){const t=Mi.c*D,e=Mi.r*D;this.blocked.add(`${Mi.c},${Mi.r}`);const n=new mt({map:vi(31)}),i=new mt({map:Me(5)}),s=new mt({map:$s(3),side:$t}),o=new Oe,a=new nt(new de(1.15,1.25,1.05,24,1,!0),n);a.position.y=.52,o.add(a);const l=new nt(new de(.98,.98,1.05,24,1,!0),new mt({color:1512208,side:De}));l.position.y=.52,o.add(l);const c=new nt(new uo(.98,1.16,24),new mt({color:9274231,side:$t}));c.rotation.x=-Math.PI/2,c.position.y=1.045,o.add(c);const h=new nt(new de(.97,.97,.05,28),new Gm({color:3109512,specular:12578559,shininess:100,transparent:!0,opacity:.95}));h.position.y=.86,o.add(h);const d=new nt(new lo(.6,24),new be({color:12577525,transparent:!0,opacity:.25}));d.rotation.x=-Math.PI/2,d.position.set(-.12,.87,-.08),o.add(d),this.waterGlint=d;const u=new ce(.16,2,.16);for(const f of[-1,1]){const b=new nt(u,i);b.position.set(f*.95,1.55,0),o.add(b)}const p=new nt(new ce(2.2,.14,.14),i);p.position.y=2.5,o.add(p);const g=new nt(new de(.025,.025,.72,6),new mt({color:7034422}));g.position.set(.2,2.08,0),o.add(g);const _=new nt(new de(.24,.2,.34,12),i);_.position.set(.2,1.7,0),o.add(_);const m=new nt(new Un(1.7,.95,4),s);m.position.y=3.05,m.rotation.y=Math.PI/4,o.add(m),o.position.set(t,0,e),this.world.add(o)}buildTunnel(){const t=new mt({map:ng(43),side:$t}),e=new mt({map:Bl(47),side:$t}),n=new mt({map:Bl(51),side:$t}),i=new mt({map:vi(31)});let s=null;for(let o=0;o<Le;o++)for(let a=0;a<qe;a++){if(!Ll(a,o))continue;const l=a*D,c=o*D,h=fe(a,o)==="stairs",d=new nt(new Ft(D,D),n);if(d.rotation.x=Math.PI/2,d.position.set(l,zr,c),this.world.add(d),!h){const u=new nt(new Ft(D,D),t);u.rotation.x=-Math.PI/2,u.position.set(l,.03,c),this.world.add(u)}for(const[u,p]of _n){const g=fe(a+u,o+p);g==="street"?s=[a,o]:(g==="mountain"||g==="building")&&!h&&this.addWall(l,c,u,p,0,zr,e)}h&&this.buildStairs(a,o,l,c,e,i)}if(s){const[o,a]=s,l=o*D,c=a*D,h=new be({color:16757322});for(const u of[-1,1]){const p=new nt(new de(.05,.05,1.1,8),new mt({color:2759696}));p.position.set(l+u*(D/2-.25),1.9,c),this.world.add(p);const g=new nt(new fo(.18,10,10),h);g.position.set(l+u*(D/2-.25),2.55,c),this.world.add(g)}const d=new gn(16752704,7,16,2);d.position.set(l,2.4,c+.5),this.world.add(d),this.flames.push({light:d,base:6})}}addWall(t,e,n,i,s,o,a){const l=new nt(new Ft(D,o-s),a);l.position.set(t+n*(D/2),(s+o)/2,e+i*(D/2)),n===1?l.rotation.y=-Math.PI/2:n===-1?l.rotation.y=Math.PI/2:i===1?l.rotation.y=Math.PI:l.rotation.y=0,this.world.add(l)}buildStairs(t,e,n,i,s,o){const c=i+D/2,h=D/5,d=-5*.8;for(const[_,m]of _n){const f=fe(t+_,e+m);(f==="mountain"||f==="building")&&this.addWall(n,i,_,m,d,zr,s)}for(let _=0;_<5;_++){const m=-_*.8,f=c-(_+.5)*h,b=m-d,y=new nt(new ce(D,b,h+.02),o);y.position.set(n,m-b/2,f),this.world.add(y)}const u=new nt(new Ft(D,D),new be({color:328966}));u.rotation.x=-Math.PI/2,u.position.set(n,d+.02,i),this.world.add(u);const p=new gn(16760688,6,13,2);p.position.set(n,2.6,i+D/2-.3),this.world.add(p);const g=new gn(16752720,3.5,8,2);g.position.set(n,.4,i-.6),this.world.add(g)}buildEstablishments(t){for(const e of Wl){const{c:n,r:i,dc:s,dr:o,kind:a}=e;this.addDecal(n,i,s,o,t,"door"),this.doorMap.set(`${n},${i},${s},${o}`,a);const l=new Oe,c=.46,h=new mt({map:Ys(Js[a].name),transparent:!0,side:$t}),d=new nt(new Ft(c*h0,c),h);d.position.set(0,1.74,.03),l.add(d);const u=c0[a];u&&this.loadArt(u,f=>{h.map=f,h.needsUpdate=!0;const b=f.image;if(b&&b.width&&b.height){const y=b.width/b.height;d.geometry.dispose(),d.geometry=new Ft(c*y,c)}});const p=n*D+s*(D/2+.16),g=i*D+o*(D/2+.16),_=o,m=-s;l.position.set(p+_*1.5,0,g+m*1.5),l.rotation.y=s===1?Math.PI/2:s===-1?-Math.PI/2:o===1?0:Math.PI,this.world.add(l)}}buildHomes(t){for(const e of Xl){const{c:n,r:i,dc:s,dr:o,id:a}=e;this.addDecal(n,i,s,o,t,"door"),this.homeDoorMap.set(`${n},${i},${s},${o}`,a)}}addNPC(t,e,n,i,s,o,a=1,l,c){const h=eg(n),d=!!o,u=new mt({map:h,transparent:!0,alphaTest:.5,side:$t}),p=(d?2.4:2.15)*a,g=(d?p*.671:1.3)*(d?1:a),_=d?p/2-p*.015+.06:1.1*a,m=new nt(new Ft(g*.95,g*.55),new be({map:this.shadowTex(),transparent:!0,depthWrite:!1,opacity:.55})),f=c?this.wallLean(t,e):{x:0,z:0},b=t*D+f.x,y=e*D+f.z;m.rotation.x=-Math.PI/2,m.position.set(b,.03,y),m.renderOrder=1,this.world.add(m);const v=new nt(new Ft(g,p),u);v.position.set(b,_,y),v.userData={baseY:_,h:p,ph:(t*12.9+e*7.3)%(Math.PI*2)},this.world.add(v);const E=this.makeNameTag(i.split(",")[0].trim());E.position.set(b,_+p/2+.18,y),this.world.add(E),this.npcs.push(v);const w=`${t},${e}`,R={name:i,lines:s,tex:h,art:!1,frames:1,portrait:void 0};this.npcMap.set(w,R),o&&this.loadArt(o,A=>{l&&(A.repeat.set(1/l.frames,1),A.offset.set(0,0),this.animTex.push({tex:A,frames:l.frames,fps:l.fps})),u.map=A,u.needsUpdate=!0,R.tex=A,R.art=!0,R.frames=l?.frames??1,R.portrait=void 0}),c&&this.walkers.push({mesh:v,shadow:m,tag:E,baseY:_,cur:{c:t,r:e},dayCell:{c:c.day[0],r:c.day[1]},nightCell:{c:c.night[0],r:c.night[1]},key:w,moving:!1,t0:0,from:{c:t,r:e},to:{c:t,r:e},fromX:b,fromZ:y,toX:b,toZ:y,waitUntil:0})}makeNameTag(t){const i='bold 40px "Cinzel", "MedievalSharp", system-ui, serif',s=document.createElement("canvas").getContext("2d");s.font=i;const a=Math.ceil(s.measureText(t).width)+36,l=58,c=document.createElement("canvas");c.width=a,c.height=l;const h=c.getContext("2d"),d=l/2;h.beginPath(),h.moveTo(d,0),h.arcTo(a,0,a,l,d),h.arcTo(a,l,0,l,d),h.arcTo(0,l,0,0,d),h.arcTo(0,0,a,0,d),h.closePath(),h.fillStyle="rgba(16,12,8,0.74)",h.fill(),h.lineWidth=3,h.strokeStyle="rgba(201,162,39,0.7)",h.stroke(),h.font=i,h.textAlign="center",h.textBaseline="middle",h.lineWidth=5,h.strokeStyle="rgba(0,0,0,0.85)",h.strokeText(t,a/2,l/2+1),h.fillStyle="#f0dca2",h.fillText(t,a/2,l/2+1);const u=new Si(c);u.colorSpace=ye,u.magFilter=ze,u.minFilter=en,u.generateMipmaps=!0;const p=new yl(new Wa({map:u,transparent:!0,depthWrite:!1})),g=.4;return p.scale.set(g*(a/l),g,1),p}shadowTex(){if(!this._shadowTex){const e=document.createElement("canvas");e.width=64,e.height=64;const n=e.getContext("2d"),i=n.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);i.addColorStop(0,"rgba(0,0,0,0.6)"),i.addColorStop(.6,"rgba(0,0,0,0.32)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,64,64);const s=new Si(e);s.colorSpace=ye,this._shadowTex=s}return this._shadowTex}loadArt(t,e){const n=this.artCache.get(t);if(n){e(n);return}new qm().load(t,i=>{i.colorSpace=ye,i.magFilter=ze,i.minFilter=en,i.generateMipmaps=!0,i.anisotropy=8,i.wrapS=tn,i.wrapT=tn,this.artCache.set(t,i),e(i)},void 0,()=>{})}buildNPCs(){const t=(performance.now()/Dr+Ir)%1;this.npcNight=this.daylight(t)<.3;for(const e of u0){const n=p0[e.id],i=n?n.url:f0[e.id],[s,o]=this.npcNight?e.night:[e.c,e.r];this.addNPC(s,o,e.seed,e.name,e.lines,i,e.scale??1,n?{frames:n.frames,fps:n.fps}:void 0,{day:[e.c,e.r],night:e.night})}}makePortrait(t,e=1){const n=t;if(!n)return null;const i=Math.floor((n.naturalWidth||n.width||0)/e),s=n.naturalHeight||n.height||0;if(!i||!s)return null;const o=132,a=document.createElement("canvas");a.width=o,a.height=o;const l=a.getContext("2d");if(!l)return null;l.imageSmoothingQuality="high";let c=i*.5-s*.09,h=s*.05,d=s*.18;try{const u=document.createElement("canvas");u.width=i,u.height=s;const p=u.getContext("2d");if(p){p.drawImage(t,0,0);const g=p.getImageData(0,0,i,s).data,_=40,m=y=>{let v=0,E=0,w=-1;for(let R=0;R<=i;R++)if(R<i&&g[(y*i+R)*4+3]>_)w<0&&(w=R);else if(w>=0){const M=R-w;M>v&&(v=M,E=w),w=-1}return{w:v,cx:E+v/2}};let f=-1,b=-1;for(let y=0;y<s&&f<0;y++)for(let v=0;v<i;v++)if(g[(y*i+v)*4+3]>_){f=y;break}for(let y=s-1;y>=0&&b<0;y--)for(let v=0;v<i;v++)if(g[(y*i+v)*4+3]>_){b=y;break}if(f>=0&&b>f){const y=b-f+1;let v=f;for(let A=f;A<f+y*.3;A++)if(m(A).w>i*.06){v=A;break}let E=0,w=i/2;const R=Math.round(y*.14);for(let A=v;A<v+R;A++){const M=m(A);M.w>E&&(E=M.w,w=M.cx)}d=Math.max(y*.13,Math.min(E*1.55,y*.3,s*.55)),c=w-d/2,h=v-d*.12}}}catch{}c=Math.max(0,Math.min(c,i-d)),h=Math.max(0,Math.min(h,s-d)),d=Math.min(d,i,s);try{return l.drawImage(t,c,h,d,d,0,0,o,o),a.toDataURL("image/png")}catch{return null}}portraitFor(t){const e=this.npcMap.get(t);if(!e)return null;if(e.portrait!==void 0)return e.portrait;const n=e.tex.image;if(!n)return null;const i=this.makePortrait(n,e.frames??1);return i&&(e.portrait=i),i}addForestLights(){const t=new ks(10134706,.72),e=new Os(10464188,4214830,.85),n=new Al(14673644,.5);n.position.set(-8,16,5),this.world.add(t),this.world.add(e),this.world.add(n),this.registerDayLight(t,3557482,.44),this.registerDayLight(e,2899038,.5),this.registerDayLight(n,6714797,.14)}buildForest(){const t=qr,e=tr,n=qs("s"),i=(E,w,R=0)=>{const A=Math.sin(E*41.3+w*17.7+R*7.13)*4213.1;return A-Math.floor(A)},s=new mt({map:Zs(61)});s.map.repeat.set(t+10,e+10);const o=new nt(new Ft((t+10)*D,(e+10)*D),s);o.rotation.x=-Math.PI/2,o.position.set((t/2-.5)*D,0,(e/2-.5)*D),this.world.add(o);const a=new mt({map:Ks(63)}),l=new Ft(D,D);for(let E=0;E<e;E++)for(let w=0;w<t;w++){const R=Yn(w,E);if(R==="path"||R==="gate"||R==="spawn"||R==="sign"){const A=new nt(l,a);A.rotation.x=-Math.PI/2,A.rotation.z=Math.floor(i(w,E,9)*4)*Math.PI/2,A.position.set(w*D,.02,E*D),this.world.add(A)}}const c=Vl.length>0,h=(c?Vl:[65,66,67,71,79]).map((E,w)=>{const R=new mt({map:Ol(65+w*6),transparent:!0,alphaTest:.4,side:$t});return c&&this.loadArt(E,A=>{R.map=A,R.needsUpdate=!0}),R}),d=a0.map((E,w)=>{const R=new mt({map:Ol(83+w*4),transparent:!0,alphaTest:.4,side:$t});return this.loadArt(E,A=>{R.map=A,R.needsUpdate=!0}),R}),u=[67,73].map(E=>new mt({map:rg(E),transparent:!0,alphaTest:.4,side:$t})),p=[75,77].map(E=>new mt({map:ig(E),transparent:!0,alphaTest:.35,side:$t})),g=new mt({map:js(41)}),_=new mt({map:sg(69),transparent:!0,alphaTest:.4,side:$t}),m=new mt({map:Me(5)}),f=new mt({map:Me(7)}),b=(E,w,R,A,M,x=!1)=>{const C=new Ft(R,A),I=x?-1:1,F=new nt(C,M);F.position.set(E,A/2,w),F.scale.x=I;const V=new nt(C,M);V.position.set(E,A/2,w),V.rotation.y=Math.PI/2,V.scale.x=I,this.world.add(F),this.world.add(V)},y=c?o0:.44,v=(E,w,R,A,M)=>{const C=d.length>0&&i(A,M,17)<.12?d:h,I=C[Math.floor(i(A,M,4)*C.length)%C.length];b(E,w,R*y,R,I,i(A,M,16)>.5)};for(let E=0;E<e;E++)for(let w=0;w<t;w++){const R=Yn(w,E),A=w*D,M=E*D;if(R==="tree"||R==="edge"){const x=R==="edge",C=(x?8:5.4)+i(w,E,1)*2.2,I=(i(w,E,2)-.5)*D*.45,F=(i(w,E,3)-.5)*D*.45;v(A+I,M+F,C,w,E),i(w,E,12)>.5&&b(A+I,M+F,2,1.1,p[Math.floor(i(w,E,13)*p.length)%p.length]),x&&this.blocked.add(`${w},${E}`)}else if(R==="bush"){const x=2.4+i(w,E,5)*.8,C=1.4+i(w,E,6)*.5,I=u[Math.floor(i(w,E,7)*u.length)%u.length];b(A,M,x,C,I),this.blocked.add(`${w},${E}`)}else if(R==="rock"){const x=1.1+i(w,E,8)*.8,C=new nt(new ho(x),g);C.position.set(A,x*.55,M),C.rotation.set(i(w,E,9)*3,i(w,E,10)*3,.2),C.scale.y=.7,this.world.add(C),this.blocked.add(`${w},${E}`)}else if(R==="foliage"){const x=1.8+i(w,E,5)*.8,C=.9+i(w,E,6)*.5;b(A+(i(w,E,2)-.5)*D*.4,M+(i(w,E,3)-.5)*D*.4,x,C,p[Math.floor(i(w,E,7)*p.length)%p.length])}else if(R==="skull")b(A,M,2,1.4,_);else if(R==="sign"){const C=w===n.col&&E===n.row?[0,1]:this.forestSignFacing(w,E);this.buildForestSign(A,M,m,C),this.blocked.add(`${w},${E}`)}if(R==="grass"&&i(w,E,14)>.9){const x=new nt(new de(.28,.32,2.4,8),f);x.rotation.set(0,i(w,E,15)*Math.PI,Math.PI/2),x.position.set(A,.28,M),this.world.add(x)}}if(Or.length>0){const E=this.makeClusterMats(),w=(M,x,C,I)=>{const F=15+i(I,0,2)*3,V=E[Math.floor(i(I,0,4)*E.length)%E.length],Q=F*V.aspect,$=new nt(new Ft(Q,F),V.mat);$.position.set(M,F/2-1,x),$.rotation.y=C,i(I,0,5)>.5&&($.scale.x=-1),this.world.add($)},R=15*1.85*.72;let A=0;for(let M=-D;M<=(t+1)*D;M+=R)w(M,-1.5*D,0,A++);for(let M=-D;M<=e*D;M+=R)w(-1.5*D,M,Math.PI/2,A++),w((t+.5)*D,M,-Math.PI/2,A++)}else{for(let E=-2;E<t+2;E+=2)v(E*D+1,-2*D,10+i(E,-3,1)*3,E,-3);for(let E=-1;E<e-2;E+=2)v(-2*D,E*D,9+i(-3,E,1)*3,-3,E),v((t+1)*D,E*D,9+i(t+2,E,1)*3,t+2,E)}this.buildForestBackdrop(),this.buildForestVillageBackdrop()}buildForestVillageBackdrop(){const t=qs("V"),e=t.col*D,n=t.row*D,i=n+9*D,s=.6,o=new mt({map:Zs(61)});o.map.repeat.set(20,16);const a=new nt(new Ft(22*D,16*D),o);a.rotation.x=-Math.PI/2,a.position.set(e,-.02,n+6*D),this.world.add(a);const l=new mt({map:Ks(63)}),c=new Ft(D,D);for(let E=n+1*D;E<i-2*D;E+=D){const w=new nt(c,l);w.rotation.x=-Math.PI/2,w.rotation.z=Math.round((E-n)/D)%2*(Math.PI/2),w.position.set(e,.02,E),this.world.add(w)}if(Or.length>0){const E=this.makeClusterMats(),w=13,R=(A,M,x,C)=>{const I=E[C%E.length],F=new nt(new Ft(w*I.aspect,w),I.mat);F.position.set(A,w/2-1,M),F.rotation.y=Math.PI,x&&(F.scale.x=-1),this.world.add(F)};R(e-13,i+2*D,!1,0),R(e+13,i+2*D,!0,1),R(e-20,i-1*D,!1,1),R(e+20,i-1*D,!0,0)}const h=new Oe,d=new mt({map:Me(3)}),u=new mt({map:$s(3),side:$t}),p=new mt({map:Me(5)}),g=new mt({map:js(41)}),_=new mt({map:vi(31)}),m=new mt({map:Il(7)}),f=new mt({color:2102288});m.map.repeat.set(6,5);const b=new nt(new Ft(24,18),m);b.rotation.x=-Math.PI/2,b.position.set(0,.06,2),h.add(b);const y=new nt(new ce(34,9,7),g);y.position.set(-2,3.5,13),h.add(y);for(const[E,w,R,A]of[[-4,0,11,13],[1,-.5,10,15],[5.5,.5,9,11],[-9,.8,8,10]]){const M=new nt(new Un(R,A,7),g);M.position.set(E*1.5,A/2+1.5,13+w),M.rotation.y=E,h.add(M)}const v=(E,w,R,A,M)=>{const x=new nt(new ce(R,A,R),d);x.position.set(E,A/2,w),h.add(x);const C=new nt(new Un(R*.82,A*.6,4),u);C.position.set(E,A+A*.28,w),C.rotation.y=Math.PI/4,h.add(C);const I=E+M[0]*(R/2+.03),F=w+M[1]*(R/2+.03),V=Math.atan2(M[0],M[1]),Q=new nt(new Ft(R*.26,A*.5),f);Q.position.set(I,A*.25,F),Q.rotation.y=V,h.add(Q);for(const $ of[-1,1]){const it=new nt(new Ft(R*.16,A*.2),f);it.position.set(I+$*M[1]*R*.26,A*.62,F-$*M[0]*R*.26),it.rotation.y=V,h.add(it)}};{for(const[C,I,F]of[[-6,3,3.2],[-2,3.2,3.4],[2,3,3.1],[6,3.2,3.3]])v(C,7,I,F,[0,-1]);for(const C of[2.5,5])v(-8,C,3,3.1,[1,0]);for(const C of[2.5,5])v(8,C,3,3.1,[-1,0]);const E=new Oe,w=new nt(new de(.85,.95,1,16),_);w.position.y=.5,E.add(w);for(const C of[-.75,.75]){const I=new nt(new ce(.14,1.9,.14),p);I.position.set(C,1.45,0),E.add(I)}const R=new nt(new Un(1.25,.7,4),u);R.position.y=2.5,R.rotation.y=Math.PI/4,E.add(R),E.position.set(0,0,2.5),h.add(E);const A=new Oe,M=new ce(.36,3.4,.36);for(const C of[-1.6,1.6]){const I=new nt(M,p);I.position.set(C,1.7,0),A.add(I)}const x=new nt(new ce(3.9,.36,.4),p);x.position.set(0,3.35,0),A.add(x),A.position.set(0,0,-3.5),h.add(A)}h.scale.setScalar(s),h.position.set(e,0,i),this.world.add(h)}forestSignFacing(t,e){const n=[[0,1],[1,0],[0,-1],[-1,0]];let i=[0,1];for(const[s,o]of n){if(Yn(t+s,e+o)==="path")return[s,o];Xs(t+s,e+o)&&(i=[s,o])}return i}buildForestSign(t,e,n,i){const s=new Oe,o=new ce(.16,2.3,.16);for(const c of[-.62,.62]){const h=new nt(o,n);h.position.set(c,1.15,0),s.add(h)}const a=new nt(new ce(1.75,.66,.09),n);a.position.set(0,1.78,.02),s.add(a);const l=new nt(new ce(1.85,.76,.06),new mt({color:2759696}));l.position.set(0,1.78,-.01),s.add(l),s.position.set(t,0,e),s.rotation.y=Math.atan2(i[0],i[1]),this.world.add(s)}buildForestBackdrop(){const t=new be({color:7305349}),e=new be({color:12108495}),n=(qr/2-.5)*D,i=-7*D;[-2.4,-1.2,-.1,1,2.2].forEach((o,a)=>{const l=30+a*37%13,c=17+a*53%8,h=n+o*24,d=i-a*31%8,u=new nt(new Un(c,l,5),t);u.position.set(h,l/2-3,d),u.rotation.y=a,this.world.add(u);const p=new nt(new Un(c*.4,l*.32,5),e);p.position.set(h,l-l*.18-3,d),p.rotation.y=a,this.world.add(p)})}canWalk(t,e){return(this.location==="village"?Ws(t,e):this.location==="forest"?Xs(t,e):Qs(t,e))&&!this.blocked.has(`${t},${e}`)}buildMiniGrid(){let t,e,n;this.location==="village"?(t=qe,e=Le,n=Ws):this.location==="forest"?(t=qr,e=tr,n=Xs):(t=$a,e=Kr,n=Qs);const i=new Uint8Array(t*e);for(let s=0;s<e;s++)for(let o=0;o<t;o++)i[s*t+o]=n(o,s)?1:0;this.miniGrid={cols:t,rows:e,cells:i}}pushMinimap(){this.miniGrid||this.buildMiniGrid();const t=this.miniGrid,[e,n]=_n[this.facing];this.ui.updateMinimap({cols:t.cols,rows:t.rows,cells:t.cells,col:this.col,row:this.row,dc:e,dr:n})}doInteract(){const t=this.facingTarget();if(t){if(t.kind==="enter"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=Fr("P");this.enterLocation(t.estab,e.col,e.row,0)}else if(t.kind==="enterhome"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=Fr("P");this.enterLocation(t.id,e.col,e.row,0)}else if(t.kind==="exit"){const{col:e,row:n,facing:i}=this.returnTo;this.enterLocation("village",e,n,i)}else if(t.kind==="talk"){const e=ea(t.lines),n=this.portraitFor(t.key);this.dialogue={name:t.name,lines:e,idx:0,portrait:n},this.ui.showDialogue(t.name,e[0],n)}else if(t.kind==="dungeon"){const e=ea(["A escada de pedra desce para a escuridão.","(Em breve você poderá explorar a masmorra.)"]);this.dialogue={name:"Masmorra",lines:e,idx:0,portrait:null},this.ui.showDialogue("Masmorra",e[0],null)}else if(t.kind==="toforest"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=qs("P");this.enterLocation("forest",e.col,e.row,0)}else if(t.kind==="tovillage"){const e=Dl();this.enterLocation("village",e.col,e.row-1,0)}else if(t.kind==="sign"){const e=ea(t.lines);this.dialogue={name:"Placa",lines:e,idx:0,portrait:null},this.ui.showDialogue("Placa",e[0],null)}}}advanceDialogue(){this.dialogue&&(this.dialogue.idx++,this.dialogue.idx>=this.dialogue.lines.length?(this.dialogue=null,this.ui.hideDialogue()):this.ui.showDialogue(this.dialogue.name,this.dialogue.lines[this.dialogue.idx],this.dialogue.portrait??null))}box(t,e,n,i,s,o,a){const l=new nt(new ce(i,s,o),a);return l.position.set(t,e,n),this.world.add(l),l}buildRoomShell(t=9,e=2,n=4864038){const s=new mt({map:Me(t)}),o=new mt({map:Me(e),side:$t}),a=new mt({color:n,side:$t}),l=new mt({map:Nl(11),side:$t}),c=new Ft(D,D);for(let p=0;p<Kr;p++)for(let g=0;g<$a;g++){if(!Qs(g,p))continue;const _=new nt(c,s);_.rotation.x=-Math.PI/2,_.position.set(g*D,0,p*D),this.world.add(_);const m=new nt(c,a);m.rotation.x=Math.PI/2,m.position.set(g*D,3,p*D),this.world.add(m);for(const[f,b]of _n)$r(g+f,p+b)==="#"&&this.addWall(g*D,p*D,f,b,0,3,o)}const h=Fr("X"),d=new nt(new Ft(Pl,Ur),l);d.position.set(h.col*D,Ur/2,h.row*D+D/2-.06),d.rotation.y=Math.PI,this.world.add(d);const u=new nt(new Ft(1.7,.6),new mt({map:Ys("SAÍDA"),transparent:!0,side:$t}));u.position.set(h.col*D,Ur+.5,h.row*D+D/2-.08),u.rotation.y=Math.PI,this.world.add(u)}buildHome(t){this.buildRoomShell(9,6,3943450);const n=new mt({map:Me(5)}),i=new mt({map:Me(7)}),s=new mt({map:vi(31)}),o=new mt({color:7161136}),a=new mt({color:13350025});this.wallCell(1,3,[-1,0],(g,_)=>{this.box(g,1.2,_,.5,2.4,2,s),this.box(g+.42,.55,_,.34,.7,1.1,new be({color:16742942})),this.glowLight(g+1.4,1,_,16747054,4.2,10)});const l=3*D,c=3*D;this.blocked.add("3,3"),this.box(l,.95,c,1.7,.12,1.1,n);for(const[g,_]of[[-.7,0],[.7,0],[0,-.5],[0,.5]])this.box(l+g*.9,.42,c+_,.16,.84,.16,i);this.box(l,.45,c-.95,1.4,.12,.4,i),this.box(l,.45,c+.95,1.4,.12,.4,i),this.box(l-.4,1.06,c,.22,.1,.22,a);const h=new nt(new de(.16,.13,.22,12),i);h.position.set(l+.35,1.11,c),this.world.add(h);const d=ta[t].residents.length>=2?[[5,2],[5,4]]:[[5,3]];for(const[g,_]of d)this.wallCell(g,_,[1,0],(m,f)=>{this.box(m,.35,f,.9,.5,1.9,i),this.box(m,.66,f,.86,.16,1.8,a),this.box(m,.78,f-.7,.7,.18,.4,o)});this.wallCell(2,1,[0,-1],(g,_)=>{this.box(g,1.7,_,1.6,.1,.4,n);for(let m=-1;m<=1;m++){const f=new nt(new de(.12,.1,.28,10),m===0?i:a);f.position.set(g+m*.45,1.9,_),this.world.add(f)}});const u=new nt(new Ft(2.2,1.6),new mt({color:8010538}));u.rotation.x=-Math.PI/2,u.position.set(3*D,.02,3*D+.2),this.world.add(u);const p=new gn(16769192,5.5,30,2);p.position.set(3*D,3-.4,3*D),this.world.add(p);for(const g of ta[t].residents)this.addNPC(g.col,g.row,g.seed,g.name,g.lines,g.art,g.scale??1)}buildInterior(t){const n=new mt({map:Me(5)});this.buildRoomShell(9,2,4864038);const i=Fr("N"),s=i.col*D,o=i.row*D+D/2+.2;this.box(s,.55,o,D*2.4,1.1,.7,n),this.box(s,1.12,o,D*2.4+.2,.14,.95,n);const a=Js[t];this.addNPC(i.col,i.row,a.seed,a.npc,a.lines,l0[t]);const l=new gn(16766106,4.5,15,2);l.position.set(s,2.5,i.row*D+1.6),this.world.add(l);const c=new gn(16769192,8,34,2);c.position.set(3*D,3-.3,3*D),this.world.add(c),this.box(3*D,3-.25,3*D,.4,.3,.4,new be({color:16758874})),t==="tavern"?this.propsTavern():t==="store"?this.propsStore():t==="smith"?this.propsSmith():this.propsAlchemist()}glowLight(t,e,n,i,s,o){const a=new gn(i,s,o,2);a.position.set(t,e,n),this.world.add(a),this.flames.push({light:a,base:s})}wallCell(t,e,n,i){const s=t*D+n[0]*(D/2-.75),o=e*D+n[1]*(D/2-.75);i(s,o),this.blocked.add(`${t},${e}`)}propsTavern(){const t=new mt({map:Me(5)}),e=new mt({map:vi(31)}),n=new mt({map:Fl(17)}),i=new mt({color:13279818});this.wallCell(1,3,[-1,0],(s,o)=>{this.box(s,1.1,o,.5,2.2,2.2,e),this.box(s+.4,.6,o,.35,.8,1.2,new be({color:16742942})),this.glowLight(s+1.3,1,o,16747054,5,11)}),this.wallCell(1,2,[-1,0],(s,o)=>{const a=new nt(new de(.5,.44,1.3,14),n);a.position.set(s,.65,o),this.world.add(a)});for(const s of[2,4])this.wallCell(5,s,[1,0],(o,a)=>{this.box(o,.9,a,.2,1,.2,t);const l=new nt(new de(.8,.8,.15,16),t);l.position.set(o,1.45,a),this.world.add(l);const c=new nt(new de(.14,.12,.28,10),i);c.position.set(o,1.66,a),this.world.add(c)})}propsStore(){const t=new mt({map:Me(3)}),e=[9058874,3824266,5208634,11569712,8010362];let n=0;const i=(s,o,a)=>{this.box(s,1.05,o,.5,2.1,2.4,t);for(const l of[.7,1.4])for(const c of[-.7,.7]){const h=new mt({color:e[n++%e.length]});this.box(s-a*.35,l,o+c,.4,.5,.5,h)}};for(const s of[2,3,4])this.wallCell(1,s,[-1,0],(o,a)=>i(o,a,-1));for(const s of[2,3,4])this.wallCell(5,s,[1,0],(o,a)=>i(o,a,1))}propsSmith(){const t=new mt({color:4869716}),e=new mt({map:vi(31)}),n=new mt({map:Me(5)}),i=new mt({map:Fl(17)});this.wallCell(1,3,[-1,0],(s,o)=>{this.box(s,1,o,.6,2,2.2,e),this.box(s+.45,1,o,.35,.5,1.2,new be({color:16738834})),this.glowLight(s+1.3,1.1,o,16742942,5.5,11)}),this.wallCell(1,4,[-1,0],(s,o)=>{this.box(s,.45,o,.6,.9,.6,n),this.box(s,1.05,o,.5,.35,1,t)}),this.wallCell(1,2,[-1,0],(s,o)=>{const a=new nt(new de(.5,.44,1.2,14),i);a.position.set(s,.6,o),this.world.add(a)});for(const s of[2,3,4])this.wallCell(5,s,[1,0],(o,a)=>{this.box(o,1,a,.25,2,1.4,n);for(const l of[-.4,.4]){const c=new nt(new ce(.08,1.5,.22),t);c.position.set(o-.2,1.4,a+l),this.world.add(c)}})}propsAlchemist(){const t=new mt({map:Me(3)}),e=new mt({color:3817028}),n=[4239472,5267648,12599408,12623920,9453760];let i=0;const s=(o,a,l)=>{this.box(o,1.05,a,.5,2.1,2.4,t);for(const c of[.7,1.35,2])for(const h of[-.7,0,.7]){const d=new mt({color:n[i++%n.length]}),u=new nt(new de(.11,.13,.36,8),d);u.position.set(o-l*.32,c,a+h),this.world.add(u)}};for(const o of[2,3])this.wallCell(1,o,[-1,0],(a,l)=>s(a,l,-1));for(const o of[2,3])this.wallCell(5,o,[1,0],(a,l)=>s(a,l,1));this.wallCell(1,4,[-1,0],(o,a)=>{const l=new nt(new de(.6,.48,.85,16),e);l.position.set(o,.5,a),this.world.add(l);const c=new nt(new de(.53,.53,.1,16),new be({color:7077792}));c.position.set(o,.92,a),this.world.add(c),this.glowLight(o+.9,1.2,a,5308314,3.2,8)}),this.wallCell(5,4,[1,0],(o,a)=>{this.box(o,.8,a,.9,.15,1.6,t),this.box(o,.98,a+.3,.5,.16,.6,new mt({color:6961706}))})}buildRoofs(t){const e=(n,i,s,o)=>{if(fe(n,i)!=="building")return!1;const a=fe(n+s,i+o);return a==="street"||a==="barrel"};for(const n of[1,-1])for(let i=0;i<qe;i++){let s=0;for(;s<Le;)if(e(i,s,n,0)){let o=s;for(;o+1<Le&&e(i,o+1,n,0);)o++;let a=Vs;for(let l=s;l<=o;l++)a=Math.min(a,this.depthInto(i,l,-n,0));this.addRoofRun(i,s,i,o,n,0,a,t),s=o+1}else s++}for(const n of[1,-1])for(let i=0;i<Le;i++){let s=0;for(;s<qe;)if(e(s,i,0,n)){let o=s;for(;o+1<qe&&e(o+1,i,0,n);)o++;let a=Vs;for(let l=s;l<=o;l++)a=Math.min(a,this.depthInto(l,i,0,-n));this.addRoofRun(s,i,o,i,0,n,a,t),s=o+1}else s++}}depthInto(t,e,n,i){let s=0;for(;s<Vs&&fe(t+n*s,e+i*s)==="building";)s++;return Math.max(1,s)}addRoofRun(t,e,n,i,s,o,a,l){const c=Ln-.15,h=Ln+Hs,d=new N,u=new N,p=new N,g=new N,_=new N,m=new N;let f,b,y;const v=a*D-D/2;if(s!==0){const A=t*D+s*(D/2)+s*Rl,M=t*D-s*v,x=(A+M)/2,C=e*D-D/2,I=i*D+D/2;d.set(A,c,C),u.set(A,c,I),p.set(x,h,C),g.set(x,h,I),_.set(M,c,C),m.set(M,c,I),f=i-e+1,b=Math.abs(A-x)/D+.5,y=Math.abs(x-M)/D+.5}else{const A=e*D+o*(D/2)+o*Rl,M=e*D-o*v,x=(A+M)/2,C=t*D-D/2,I=n*D+D/2;d.set(C,c,A),u.set(I,c,A),p.set(C,h,x),g.set(I,h,x),_.set(C,c,M),m.set(I,c,M),f=n-t+1,b=Math.abs(A-x)/D+.5,y=Math.abs(x-M)/D+.5}this.world.add(this.quad(d,u,g,p,l,f,b)),this.world.add(this.quad(p,g,m,_,l,f,y)),this.world.add(this.tri(d,p,_,l)),this.world.add(this.tri(u,m,g,l));const E=d.clone();E.y-=Cl;const w=u.clone();w.y-=Cl,this.world.add(this.quad(E,w,u,d,l,f,.3))}tri(t,e,n,i){const s=new Ie;return s.setAttribute("position",new Ue(new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z]),3)),s.setAttribute("uv",new Ue(new Float32Array([0,0,1,0,.5,1]),2)),s.setIndex([0,1,2]),s.computeVertexNormals(),new nt(s,i)}addDecal(t,e,n,i,s,o){const a=o==="door"?Pl:jm,l=o==="door"?Ur:Zm,c=o==="door"?l/2+.02:Km,h=new nt(new Ft(a,l),s),d=t*D+n*(D/2+.04),u=e*D+i*(D/2+.04);h.position.set(d,c,u),n===1?h.rotation.y=Math.PI/2:n===-1?h.rotation.y=-Math.PI/2:i===1?h.rotation.y=0:h.rotation.y=Math.PI,this.world.add(h)}quad(t,e,n,i,s,o=1,a=1){const l=new Ie,c=new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z,i.x,i.y,i.z]);return l.setAttribute("position",new Ue(c,3)),l.setAttribute("uv",new Ue(new Float32Array([0,0,o,0,o,a,0,a]),2)),l.setIndex([0,1,2,0,2,3]),l.computeVertexNormals(),new nt(l,s)}onAction(t){if(this.dialogue){t==="interact"&&this.advanceDialogue();return}if(t==="interact"){this.doInteract();return}if(t==="attack"){const a=this.ui.swingWeapon();a>=0&&window.setTimeout(()=>this.tryHitEnemy(),a);return}if(this.anim)return;if(t==="turnLeft"||t==="turnRight"){const a=t==="turnLeft"?1:-1;this.facing=(this.facing+(a===1?3:1))%4,this.pushMinimap(),this.anim={kind:"turn",t0:performance.now(),fromY:this.camera.rotation.y,toY:this.camera.rotation.y+Math.PI/2*a};return}let e=this.facing;t==="back"?e=(e+2)%4:t==="strafeLeft"?e=(e+3)%4:t==="strafeRight"&&(e=(e+1)%4);const[n,i]=_n[e],s=this.col+n,o=this.row+i;this.canWalk(s,o)&&(this.anim={kind:"move",t0:performance.now(),fromX:this.col*D,fromZ:this.row*D,toX:s*D,toZ:o*D},this.col=s,this.row=o,this.pushMinimap(),this.location==="forest"&&Yn(s,o)==="tree"&&this.brushFoliage())}brushFoliage(){const t=this.foliageFx;t&&(t.style.transition="none",t.style.opacity="0.55",t.offsetWidth,t.style.transition="opacity 620ms ease-out",t.style.opacity="0")}updateNpcPhase(t){const e=(t/Dr+Ir)%1,n=this.daylight(e);return!this.npcNight&&n<.26?(this.npcNight=!0,this.staggerDepart(t)):this.npcNight&&n>.44&&(this.npcNight=!1,this.staggerDepart(t)),this.npcNight}staggerDepart(t){this.walkers.forEach((e,n)=>{e.waitUntil=Math.max(e.waitUntil,t+n*650)})}wallLean(t,e){const i=[[-1,0],[1,0],[0,-1],[0,1]];for(const[s,o]of i){const a=fe(t+s,e+o);if(a==="building"||a==="mountain")return{x:s*1.3,z:o*1.3}}return{x:0,z:0}}plazaWalkable(t,e){if(t===Mi.c&&e===Mi.r)return!1;const n=e>=6&&e<=12&&t>=2&&t<=12,i=e>=13&&e<=14&&t>=6&&t<=8;return!n&&!i?!1:Ws(t,e)}cellFreeForWalker(t,e,n){if(!this.plazaWalkable(t,e)||t===this.col&&e===this.row)return!1;for(const i of this.walkers)if(i!==n&&(i.cur.c===t&&i.cur.r===e||i.moving&&i.to.c===t&&i.to.r===e))return!1;return!0}bfsNextStep(t,e){const n=(h,d)=>h+","+d;if(t.c===e.c&&t.r===e.r)return null;const i=new Map;i.set(n(t.c,t.r),null);const s=[t];let o=0;const a=[[0,-1],[1,0],[0,1],[-1,0]];let l=!1;for(;o<s.length;){const h=s[o++];if(h.c===e.c&&h.r===e.r){l=!0;break}for(const[d,u]of a){const p=h.c+d,g=h.r+u,_=n(p,g);i.has(_)||!(p===e.c&&g===e.r)&&!this.plazaWalkable(p,g)||(i.set(_,h),s.push({c:p,r:g}))}}if(!l&&!i.has(n(e.c,e.r)))return null;let c=e;for(let h=0;h<400;h++){const d=i.get(n(c.c,c.r));if(!d)return null;if(d.c===t.c&&d.r===t.r)return c;c=d}return null}updateWalkers(t){if(this.walkers.length===0||this.dialogue)return;const e=900,n=this.updateNpcPhase(t);for(const i of this.walkers)if(i.moving){const s=Math.min(1,(t-i.t0)/e),o=s*s*(3-2*s),a=i.fromX+(i.toX-i.fromX)*o,l=i.fromZ+(i.toZ-i.fromZ)*o;i.mesh.position.x=a,i.mesh.position.z=l,i.mesh.position.y=i.baseY+Math.sin(s*Math.PI)*.05,i.shadow.position.x=a,i.shadow.position.z=l,i.tag.position.x=a,i.tag.position.z=l,s>=1&&(i.moving=!1,i.mesh.position.y=i.baseY,i.waitUntil=t+240+(i.cur.c*37+i.cur.r*17)%220)}else if(t>=i.waitUntil){const s=n?i.nightCell:i.dayCell;if(i.cur.c===s.c&&i.cur.r===s.r){i.waitUntil=t+500;continue}const o=this.bfsNextStep(i.cur,s);if(!o){i.waitUntil=t+500;continue}if(!this.cellFreeForWalker(o.c,o.r,i)){i.waitUntil=t+300;continue}const a=`${o.c},${o.r}`,l=this.npcMap.get(i.key);l&&(this.npcMap.delete(i.key),this.npcMap.set(a,l));const h=o.c===s.c&&o.r===s.r?this.wallLean(o.c,o.r):{x:0,z:0};i.fromX=i.mesh.position.x,i.fromZ=i.mesh.position.z,i.toX=o.c*D+h.x,i.toZ=o.r*D+h.z,i.from={c:i.cur.c,r:i.cur.r},i.to=o,i.cur=o,i.key=a,i.moving=!0,i.t0=t}}tick(t){const e=this.anim;if(e)if(e.kind==="move"){const a=Math.min(1,(t-e.t0)/Ec),l=a*a*(3-2*a);this.camera.position.x=e.fromX+(e.toX-e.fromX)*l,this.camera.position.z=e.fromZ+(e.toZ-e.fromZ)*l,this.camera.position.y=Gs+Math.sin(a*Math.PI)*.07,a>=1&&(this.camera.position.y=Gs,this.anim=null)}else{const a=Math.min(1,(t-e.t0)/Jm),l=a*a*(3-2*a);this.camera.rotation.y=e.fromY+(e.toY-e.fromY)*l,a>=1&&(this.anim=null)}const n=this.camera.position.x,i=this.camera.position.z;for(const a of this.npcs){a.rotation.y=Math.atan2(n-a.position.x,i-a.position.z);const l=a.userData;if(l&&l.h){const c=1+Math.sin(t*.0016+l.ph)*.014;a.scale.y=c,a.position.y=l.baseY+(c-1)*l.h/2,a.rotation.z=Math.sin(t*.0011+l.ph*1.7)*.007}}for(const a of this.billboardProps)a.rotation.y=Math.atan2(n-a.position.x,i-a.position.z);const s=this.enemy;if(s){const a=s.mesh.geometry.parameters.height;let l=n-s.bx,c=i-s.bz;const h=Math.hypot(l,c)||1;l/=h,c/=h;let d=0,u=1,p=0,g=0,_=0,m=0;const f=t-s.hitAt;if(s.dyingAt){const b=(t-s.dyingAt)/650;s.mat.opacity=Math.max(0,1-b*3),s.mesh.rotation.z=-b*1.6;const y=Math.max(.12,1-b*.55);if(s.mesh.scale.set(1+b*.35,y,1),s.mesh.position.y=a/2-b*.75,s.bar.visible=!1,g=_=m=Math.max(0,1-b*4),b>=1){for(const E of[s.mesh,s.bar]){this.world.remove(E);const w=this.billboardProps.indexOf(E);w>=0&&this.billboardProps.splice(w,1)}s.mesh.geometry.dispose(),s.mat.dispose(),this.enemy=null}}else{const b=Math.abs(this.col-s.c)+Math.abs(this.row-s.r)===1;if(!s.atkAt&&b&&t>=s.nextAtk&&(s.atkAt=t),s.atkAt){const y=(t-s.atkAt)/700;if(y<.4){const v=y/.4;d=-.35*v,u=1-.05*v}else if(y<.6){const v=(y-.4)/.2;d=-.35+1.25*v,u=.95+.27*v}else{const v=(y-.6)/.4;d=.9*(1-v),u=1.22-.22*v}!s.hitApplied&&y>.52&&(s.hitApplied=!0,b&&this.damagePlayer(12)),y>=1&&(s.atkAt=0,s.hitApplied=!1,s.nextAtk=t+1100)}if(f<240){const y=f/240,v=Math.sin((1-y)*Math.PI);d-=v*.6;const E=1-y*.7;g=E,_=E*.2,m=E*.16,p=v*.14}s.mesh.position.set(s.bx+l*d,a/2,s.bz+c*d),s.mesh.scale.set(u,u,1),s.mesh.rotation.z=p}s.mat.emissive.setRGB(g,_,m)}this.updatePoofs(t),this.updateDayNight(t);const o=(t/Dr+Ir)%1;this.ui.setClock(o,this.daylight(o));for(const a of this.flames)a.light.intensity=a.base+Math.sin(t*.011+a.base)*.8+Math.sin(t*.027)*.5;for(const a of this.animTex)a.tex.offset.x=Math.floor(t/1e3*a.fps)%a.frames/a.frames;this.updateWalkers(t);for(const a of this.smoke){const l=a.userData,c=(t*28e-5+l.phase)%4/4,h=c*4.2;a.position.set(l.baseX+Math.sin(t*6e-4+l.phase)*.5,Ln+Hs+h,l.baseZ);const d=.6+c*1.6;a.scale.set(d,d,d),a.material.opacity=Math.sin(c*Math.PI)*.42,a.rotation.y=Math.atan2(n-a.position.x,i-a.position.z)}if(this.waterGlint){const a=this.waterGlint.material;a.opacity=.18+(Math.sin(t*.0016)+1)*.11;const l=1+Math.sin(t*.0013+1)*.08;this.waterGlint.scale.set(l,l,l)}this.anim||this.updatePrompt(),this.renderer.render(this.scene,this.camera)}updatePrompt(){const t=this.facingTarget();let e=" ";t&&(t.kind==="enter"?e=`Entrar — ${Js[t.estab].name}`:t.kind==="enterhome"?e="Entrar na casa":t.kind==="exit"?e="Sair":t.kind==="talk"?e=`Falar com ${t.name}`:t.kind==="dungeon"?e="Descer à masmorra":t.kind==="toforest"?e="Ir para a Floresta":t.kind==="tovillage"?e="Voltar ao Vilarejo":t.kind==="sign"&&(e="Ler a placa")),e!==this.lastPrompt&&(this.lastPrompt=e,this.ui.setPrompt(e===" "?null:e))}facingTarget(){const[t,e]=_n[this.facing],n=this.col+t,i=this.row+e,s=this.npcMap.get(`${n},${i}`);if(s)return{kind:"talk",name:s.name,lines:s.lines,key:`${n},${i}`};if(this.location==="village"){const o=this.doorMap.get(`${n},${i},${-t},${-e}`);if(o)return{kind:"enter",estab:o};const a=this.homeDoorMap.get(`${n},${i},${-t},${-e}`);if(a)return{kind:"enterhome",id:a};if(fe(n,i)==="stairs")return{kind:"dungeon"};if(fe(n,i)==="forestgate"||fe(this.col,this.row)==="forestgate")return{kind:"toforest"}}else if(this.location==="forest"){const o=Yn(n,i);if(o==="gate"||Yn(this.col,this.row)==="gate")return{kind:"tovillage"};if(o==="sign")return{kind:"sign",lines:Qm(n,i)}}else if($r(n,i)==="X"||$r(this.col,this.row)==="X")return{kind:"exit"};return null}resize(){const t=this.container.clientWidth||window.innerWidth,e=this.container.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}};Lt(Jr,"SKY_KEYS",[[0,1186355],[.2,1581630],[.25,3750234],[.29,13601368],[.37,9542054],[.5,8884384],[.66,9736345],[.72,13464642],[.78,4863560],[.85,2239564],[1,1186355]]);let ja=Jr;const g0=""+new URL("cluster1-CDwqmovY.png",import.meta.url).href,_0=""+new URL("cluster2-C0czRdHN.png",import.meta.url).href,x0=""+new URL("death_poof-Cty9ahVW.png",import.meta.url).href,v0=""+new URL("enemy_skeleton-BcZFeUKH.png",import.meta.url).href,M0=""+new URL("pine1-Cx-eXiFP.png",import.meta.url).href,b0=""+new URL("pine2-CUzpurmt.png",import.meta.url).href,y0=""+new URL("pine3-SLpwxU-f.png",import.meta.url).href,S0=""+new URL("pine4-D2rjz_P9.png",import.meta.url).href,w0=""+new URL("prop_lamp-D_-YfjKt.png",import.meta.url).href,T0=""+new URL("prop_notice-Bo5C5meg.png",import.meta.url).href,E0=""+new URL("sign_alch-CZuh7kJW.png",import.meta.url).href,A0=""+new URL("sign_smith-B08qmnbc.png",import.meta.url).href,R0=""+new URL("sign_store-C8OmR8-U.png",import.meta.url).href,C0=""+new URL("sign_tavern-DPGpN59J.png",import.meta.url).href,P0=""+new URL("sword-Cnq9dXJw.png",import.meta.url).href,L0=""+new URL("sword_atk-BUeBP5dr.png",import.meta.url).href,U0=""+new URL("wpn_axe-CvCTYMUq.png",import.meta.url).href,D0=""+new URL("wpn_dagger-BBXQkEIm.png",import.meta.url).href,I0=""+new URL("wpn_greatsword-C2mQEgxH.png",import.meta.url).href,N0=""+new URL("wpn_mace-tTLR-MzC.png",import.meta.url).href,F0=""+new URL("wpn_maul-DbliXABw.png",import.meta.url).href,O0=""+new URL("wpn_orb-BsomjHDA.png",import.meta.url).href,B0=""+new URL("wpn_rapier-dNk4ndjW.png",import.meta.url).href,z0=""+new URL("wpn_shield-Bw_-3z5v.png",import.meta.url).href,k0=""+new URL("wpn_staff-DGpAnpDH.png",import.meta.url).href,H0=""+new URL("wpn_sword-CpsgndpE.png",import.meta.url).href,G0=""+new URL("alquimista-ssXsgGLn.png",import.meta.url).href,V0=""+new URL("anselmo-a5GEbqfY.png",import.meta.url).href,W0=""+new URL("camponesa-CrL0OA2Y.png",import.meta.url).href,X0=""+new URL("costureira-Br8zMBee.png",import.meta.url).href,q0=""+new URL("fazendeiro-CLjUAd1g.png",import.meta.url).href,$0=""+new URL("ferreiro-BdN9Klhc.png",import.meta.url).href,Y0=""+new URL("gunther-D_2fJfLI.png",import.meta.url).href,j0=""+new URL("hedda-Buaz2cmx.png",import.meta.url).href,Z0=""+new URL("lenhador-B54mx8Mi.png",import.meta.url).href,K0=""+new URL("lyle-gu11Pcfp.png",import.meta.url).href,J0=""+new URL("mercadora-B8RulStP.png",import.meta.url).href,Q0=""+new URL("pip-rEDWa-7w.png",import.meta.url).href,t_=""+new URL("tam-BlgWIVim.png",import.meta.url).href,e_=""+new URL("taverneiro-Ba4UKFJq.png",import.meta.url).href,n_=""+new URL("wilma-DI_QNtI6.png",import.meta.url).href,i_=""+new URL("btn_base-wlebnyD3.png",import.meta.url).href,r_=""+new URL("class_clerigo-Bv6kp9nE.png",import.meta.url).href,s_=""+new URL("class_guerreiro-DQxwW6XE.png",import.meta.url).href,a_=""+new URL("class_icon_clerigo-DoeXMn4k.png",import.meta.url).href,o_=""+new URL("class_icon_guerreiro-C0eBl5F1.png",import.meta.url).href,l_=""+new URL("class_icon_ladino-D8WBB-2i.png",import.meta.url).href,c_=""+new URL("class_icon_mago-CqEgdtDo.png",import.meta.url).href,h_=""+new URL("class_ladino-CBY8tWR5.png",import.meta.url).href,d_=""+new URL("class_mago-BCWgBU8E.png",import.meta.url).href,u_=""+new URL("clock_moon-D1xrN5yT.png",import.meta.url).href,f_=""+new URL("clock_sun-DO5hSXa1.png",import.meta.url).href,p_=""+new URL("create_bg-B2uN_HVG.png",import.meta.url).href,m_=""+new URL("dpad-3wZIZEqb.png",import.meta.url).href,g_=""+new URL("eq_container-84uusXC9.png",import.meta.url).href,__=""+new URL("eq_frame-d-QhyRgX.png",import.meta.url).href,x_=""+new URL("eq_slot-DS9kMsLx.png",import.meta.url).href,v_=""+new URL("hud_plate-B2ygb4FP.png",import.meta.url).href,M_=""+new URL("ico_action-BRbeFgHL.png",import.meta.url).href,b_=""+new URL("ico_attack-CbdvrLXs.png",import.meta.url).href,y_=""+new URL("ico_inventory-B_-_sjLB.png",import.meta.url).href,S_=""+new URL("load_sword-Bhnb8m09.png",import.meta.url).href,w_=""+new URL("logo_plate-CK0-uVl1.png",import.meta.url).href,T_=""+new URL("map_frame-B4piWonF.png",import.meta.url).href,E_=""+new URL("menu_plate-_kr3JKFU.png",import.meta.url).href,A_=""+new URL("title_bg-DAPsvtIp.png",import.meta.url).href,R_=""+new URL("title_bg-DAPsvtIp.png",import.meta.url).href,C_=""+new URL("create_bg-B2uN_HVG.png",import.meta.url).href,P_=""+new URL("menu_plate-_kr3JKFU.png",import.meta.url).href,L_=""+new URL("logo_plate-CK0-uVl1.png",import.meta.url).href,Za=""+new URL("load_sword-Bhnb8m09.png",import.meta.url).href,U_=""+new URL("class_icon_guerreiro-C0eBl5F1.png",import.meta.url).href,D_=""+new URL("class_icon_ladino-D8WBB-2i.png",import.meta.url).href,I_=""+new URL("class_icon_mago-CqEgdtDo.png",import.meta.url).href,N_=""+new URL("class_icon_clerigo-DoeXMn4k.png",import.meta.url).href,F_=R_,mo={guerreiro:U_,ladino:D_,mago:I_,clerigo:N_};function O_(r){return V_(),new Promise(t=>{const e=document.createElement("div");e.id="gh-intro",r.appendChild(e);const n=s=>{e.remove(),t(s)},i=(s,o)=>z_(e,s,o,n,()=>ql(e,i,s.id,o));H_(e,()=>B_(e,()=>ql(e,i)))})}function B_(r,t){r.innerHTML=`
    <div class="gh-screen gh-title"${` style="background-image:url(${F_})"`}>
      <div class="gh-veil"></div>
      <div class="gh-title-inner">
        <img class="gh-logo-img" src="${L_}" alt="Nethergloam" />
        <div class="gh-flourish"><svg viewBox="0 0 260 14" preserveAspectRatio="xMidYMid meet"><g fill="#c9a24a"><circle cx="7" cy="7" r="2.6"/><rect x="15" y="6.1" width="97" height="1.8" rx="0.9"/><path d="M130 1 L138 7 L130 13 L122 7 Z"/><rect x="148" y="6.1" width="97" height="1.8" rx="0.9"/><circle cx="253" cy="7" r="2.6"/></g></svg></div>
        <p class="gh-tagline">Desça ao Nethergloam. As trevas aguardam.</p>
      </div>
      <div class="gh-menu">
        <button class="gh-menu-btn" id="gh-btn-new">Novo Jogo</button>
        <button class="gh-menu-btn gh-disabled" disabled title="Em breve">Continuar</button>
      </div>
    </div>`,r.querySelector("#gh-btn-new").addEventListener("click",t)}function ql(r,t,e,n){let i=e&&Ya[e]||Zi[0];r.innerHTML=`
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Crie seu Herói</h2>
      <div class="gh-class-tabs">
        ${Zi.map(h=>`<button class="gh-class-tab${h.id===i.id?" on":""}" data-id="${h.id}"><img class="gh-tab-ico" src="${mo[h.id]}" alt=""/><span>${h.name}</span></button>`).join("")}
      </div>
      <div class="gh-class-main" id="gh-class-main"></div>
      <div class="gh-create-foot">
        <input class="gh-name-input" id="gh-name" maxlength="18" placeholder="Nome do herói" value="${n?n.replace(/"/g,"&quot;"):""}" />
        <button class="gh-menu-btn" id="gh-btn-start">Continuar ▸</button>
      </div>
    </div>`;const s=r.querySelector("#gh-class-main"),o=h=>s.innerHTML=Yr(h);o(i);const a=()=>{s.style.minHeight="0";let h=0;for(const d of Zi)s.innerHTML=Yr(d),h=Math.max(h,s.getBoundingClientRect().height);s.innerHTML=Yr(i),s.style.minHeight=Math.ceil(h)+"px"};a();const l=document.fonts;l?.ready&&l.ready.then(()=>{s.isConnected&&a()});const c=()=>{s.isConnected&&a()};window.addEventListener("resize",c),r.querySelectorAll(".gh-class-tab").forEach(h=>h.addEventListener("click",()=>{r.querySelectorAll(".gh-class-tab").forEach(d=>d.classList.toggle("on",d===h)),i=Ya[h.dataset.id],o(i)})),r.querySelector("#gh-btn-start").addEventListener("click",()=>{const d=r.querySelector("#gh-name").value.trim()||"Herói";window.removeEventListener("resize",c),t(i,d)})}function z_(r,t,e,n,i){const s={...t.attr},o={...t.attr};r.innerHTML=`
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Distribua os Atributos</h2>
      <div class="gh-class-main" id="gh-alloc-main"></div>
      <div class="gh-create-foot">
        <button class="gh-menu-btn gh-menu-btn-sec" id="gh-back">◂ Voltar</button>
        <button class="gh-menu-btn" id="gh-start">Iniciar Jornada ▸</button>
      </div>
    </div>`;const a=r.querySelector("#gh-alloc-main"),l=()=>o.str-s.str+(o.dex-s.dex)+(o.int-s.int),c=()=>{a.innerHTML=k_(t,o,s,Gl-l()),a.querySelectorAll(".gh-pm").forEach(p=>p.addEventListener("click",()=>{const g=p.dataset.k,_=Number(p.dataset.d);_<0&&o[g]<=s[g]||_>0&&l()>=Gl||(o[g]+=_,c())}))},h=()=>{const p=a.getBoundingClientRect().width,g=document.createElement("div");g.className="gh-class-main",g.style.cssText=`position:absolute; left:-9999px; top:0; visibility:hidden; pointer-events:none; height:auto; width:${p}px;`,a.parentElement.appendChild(g);let _=0;for(const m of Zi)g.innerHTML=Yr(m),_=Math.max(_,g.getBoundingClientRect().height);g.remove(),a.style.height=Math.ceil(_)+"px",c()};h();const d=document.fonts;d?.ready&&d.ready.then(()=>{a.isConnected&&h()});const u=()=>{a.isConnected&&h()};window.addEventListener("resize",u),r.querySelector("#gh-back").addEventListener("click",()=>{window.removeEventListener("resize",u),i()}),r.querySelector("#gh-start").addEventListener("click",()=>{window.removeEventListener("resize",u),n({name:e,classId:t.id,attr:{...o}})})}function k_(r,t,e,n){const i=r.portrait?`<img class="gh-class-portrait" src="${r.portrait}" alt="" />`:`<div class="gh-class-ph"><div class="gh-ph-emoji">${r.emoji}</div></div>`,s=Lc(t,r.hp,r.mp),o=(l,c)=>{const h=t[c],d=h-e[c],u=h<=e[c]?" disabled":"",p=n<=0?" disabled":"";return`<div class="gh-prim-row">
      <span class="gh-prim-name">${l}</span>
      <span class="gh-prim-step">
        <button class="gh-pm" data-k="${c}" data-d="-1"${u}>−</button>
        <b class="gh-prim-val">${h}${d?`<i class="gh-prim-up">+${d}</i>`:""}</b>
        <button class="gh-pm" data-k="${c}" data-d="1"${p}>＋</button>
      </span>
    </div>`},a=(l,c)=>`<div class="gh-sec-row"><span>${l}</span><b>${c}</b></div>`;return`
    <div class="gh-class-art">${i}</div>
    <div class="gh-class-info gh-alloc">
      <div class="gh-class-name"><img class="gh-name-ico" src="${mo[r.id]}" alt=""/>${r.name}</div>
      <div class="gh-alloc-points">Pontos a distribuir: <b class="${n>0?"gh-pts-on":""}">${n}</b></div>
      <div class="gh-prim">
        ${o("Força","str")}
        ${o("Destreza","dex")}
        ${o("Inteligência","int")}
      </div>
      <div class="gh-sec-blocks">
        <div class="gh-sec-col">
          <h4>⚔️ Ofensivo</h4>
          ${a("Atq. Físico",s.atkPhys)}
          ${a("Atq. Mágico",s.atkMag)}
          ${a("Crítico",s.crit+"%")}
          ${a("Dano Crít.",s.critDmg+"%")}
          ${a("Precisão",s.precision+"%")}
        </div>
        <div class="gh-sec-col">
          <h4>🛡️ Defensivo</h4>
          ${a("Vida",s.hp)}
          ${a("Defesa",s.def)}
          ${a("Res. Mágica",s.magRes)}
          ${a("Evasão",s.evasion+"%")}
        </div>
        <div class="gh-sec-col">
          <h4>🔷 Recursos</h4>
          ${a("Mana",s.mp)}
        </div>
      </div>
    </div>`}function Yr(r){const t=r.portrait?`<img class="gh-class-portrait" src="${r.portrait}" alt="" />`:`<div class="gh-class-ph"><div class="gh-ph-emoji">${r.emoji}</div><div class="gh-ph-txt">arte em breve</div></div>`,e=(i,s)=>`<div class="gh-attr"><span>${i}</span><div class="gh-attr-bar"><i style="width:${s*10}%"></i></div><b>${s}</b></div>`,n=r.weapons.map(i=>_g[i]?.name).filter(Boolean).join(" · ");return`
    <div class="gh-class-art">${t}</div>
    <div class="gh-class-info">
      <div class="gh-class-name"><img class="gh-name-ico" src="${mo[r.id]}" alt=""/>${r.name}</div>
      <div class="gh-class-tag">${r.tag}</div>
      <p class="gh-class-desc">${r.desc}</p>
      <div class="gh-attrs">
        ${e("Força",r.attr.str)}
        ${e("Destreza",r.attr.dex)}
        ${e("Inteligência",r.attr.int)}
      </div>
      <div class="gh-vitals"><span>❤ Vida ${r.hp}</span><span>✦ Mana ${r.mp}</span></div>
      <div class="gh-class-weapons"><b>Armas:</b> ${n}</div>
    </div>`}function H_(r,t){r.innerHTML=`
    <div class="gh-screen gh-boot">
      <div class="gh-boot-corner">
        <div class="gh-boot-sword" id="gh-boot-sword" style="--p:0%">
          <img class="gh-bs-base" src="${Za}" alt="" />
          <div class="gh-bs-fill"></div>
        </div>
        <div class="gh-boot-txt" id="gh-boot-txt">Forjando o mundo… 0%</div>
      </div>
    </div>`;const e=r.querySelector("#gh-boot-sword"),n=r.querySelector("#gh-boot-txt"),i=performance.now();G_(s=>{const o=Math.round(s*100);e.style.setProperty("--p",o+"%"),n.textContent=`Forjando o mundo… ${o}%`}).then(async()=>{const s=performance.now()-i;s<900&&await new Promise(o=>setTimeout(o,900-s)),e.style.setProperty("--p","100%"),n.textContent="Pronto",await new Promise(o=>setTimeout(o,220)),t()})}async function G_(r){const t=Object.assign({"../assets/env/cluster1.png":g0,"../assets/env/cluster2.png":_0,"../assets/env/death_poof.png":x0,"../assets/env/enemy_skeleton.png":v0,"../assets/env/pine1.png":M0,"../assets/env/pine2.png":b0,"../assets/env/pine3.png":y0,"../assets/env/pine4.png":S0,"../assets/env/prop_lamp.png":w0,"../assets/env/prop_notice.png":T0,"../assets/env/sign_alch.png":E0,"../assets/env/sign_smith.png":A0,"../assets/env/sign_store.png":R0,"../assets/env/sign_tavern.png":C0,"../assets/env/sword.png":P0,"../assets/env/sword_atk.png":L0,"../assets/env/wpn_axe.png":U0,"../assets/env/wpn_dagger.png":D0,"../assets/env/wpn_greatsword.png":I0,"../assets/env/wpn_mace.png":N0,"../assets/env/wpn_maul.png":F0,"../assets/env/wpn_orb.png":O0,"../assets/env/wpn_rapier.png":B0,"../assets/env/wpn_shield.png":z0,"../assets/env/wpn_staff.png":k0,"../assets/env/wpn_sword.png":H0,"../assets/npc/alquimista.png":G0,"../assets/npc/anselmo.png":V0,"../assets/npc/camponesa.png":W0,"../assets/npc/costureira.png":X0,"../assets/npc/fazendeiro.png":q0,"../assets/npc/ferreiro.png":$0,"../assets/npc/gunther.png":Y0,"../assets/npc/hedda.png":j0,"../assets/npc/lenhador.png":Z0,"../assets/npc/lyle.png":K0,"../assets/npc/mercadora.png":J0,"../assets/npc/pip.png":Q0,"../assets/npc/tam.png":t_,"../assets/npc/taverneiro.png":e_,"../assets/npc/wilma.png":n_,"../assets/ui/btn_base.png":i_,"../assets/ui/class_clerigo.png":r_,"../assets/ui/class_guerreiro.png":s_,"../assets/ui/class_icon_clerigo.png":a_,"../assets/ui/class_icon_guerreiro.png":o_,"../assets/ui/class_icon_ladino.png":l_,"../assets/ui/class_icon_mago.png":c_,"../assets/ui/class_ladino.png":h_,"../assets/ui/class_mago.png":d_,"../assets/ui/clock_moon.png":u_,"../assets/ui/clock_sun.png":f_,"../assets/ui/create_bg.png":p_,"../assets/ui/dpad.png":m_,"../assets/ui/eq_container.png":g_,"../assets/ui/eq_frame.png":__,"../assets/ui/eq_slot.png":x_,"../assets/ui/hud_plate.png":v_,"../assets/ui/ico_action.png":M_,"../assets/ui/ico_attack.png":b_,"../assets/ui/ico_inventory.png":y_,"../assets/ui/load_sword.png":S_,"../assets/ui/logo_plate.png":w_,"../assets/ui/map_frame.png":T_,"../assets/ui/menu_plate.png":E_,"../assets/ui/title_bg.png":A_}),e=Array.from(new Set(Object.values(t)));if(e.length===0)return r(1);let n=0;await Promise.all(e.map(i=>new Promise(s=>{const o=new Image,a=()=>{n++,r(n/e.length),s()};o.onload=a,o.onerror=a,o.src=i})))}function V_(){if(document.getElementById("gh-intro-style"))return;const r=document.createElement("style");r.id="gh-intro-style",r.textContent=`
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
    border-image:url(${P_}) 150 165 fill;
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
    background:#0a0b10 center/cover no-repeat; background-image:url(${C_});
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
    border:clamp(16px,3vw,24px) solid transparent; border-image:url(${Ac}) 88 fill;
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
  #gh-intro .gh-boot-sword { position:relative; width:min(300px,60vw); aspect-ratio:332/81; }
  /* base = a espada apagada (o "vazio") */
  #gh-intro .gh-bs-base {
    width:100%; height:100%; display:block;
    filter:brightness(.24) saturate(.3) drop-shadow(0 2px 4px #000);
  }
  /* miolo dourado revelado até --p, recortado pela silhueta da espada (máscara) */
  #gh-intro .gh-bs-fill {
    position:absolute; inset:0;
    -webkit-mask:url(${Za}) center/100% 100% no-repeat;
    mask:url(${Za}) center/100% 100% no-repeat;
    background:linear-gradient(90deg,
      #e0a63a 0, #ffcf6a calc(var(--p) - 6%), #fff2c8 var(--p), rgba(255,242,200,0) var(--p));
    filter:drop-shadow(0 0 9px rgba(240,190,80,.75));
    transition:background .25s linear;
  }
  #gh-intro .gh-boot-txt {
    font-family:"Cinzel",serif; letter-spacing:1px; font-size:12px;
    color:#cbb98a; text-shadow:0 1px 3px #000;
  }
  `,document.head.appendChild(r)}document.documentElement.dataset.ghBuild="2026-07-20v";const $l=document.getElementById("app");O_($l).then(r=>{new ja($l,r)});
