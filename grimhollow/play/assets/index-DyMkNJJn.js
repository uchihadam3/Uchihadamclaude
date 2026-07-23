var Nd=Object.defineProperty;var Fd=(s,t,e)=>t in s?Nd(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var gt=(s,t,e)=>Fd(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Co="170",Od=0,Ko=1,Bd=2,Lc=1,zd=2,Dn=3,ti=0,Ye=1,te=2,Kn=0,Wi=1,Ua=2,Jo=3,Qo=4,Hd=5,fi=100,Gd=101,Vd=102,Wd=103,Xd=104,qd=200,$d=201,Yd=202,jd=203,Da=204,Ia=205,Zd=206,Kd=207,Jd=208,Qd=209,tu=210,eu=211,nu=212,iu=213,su=214,ka=0,Na=1,Fa=2,$i=3,Oa=4,Ba=5,za=6,Ha=7,Lr=0,ru=1,au=2,Jn=0,ou=1,lu=2,cu=3,hu=4,du=5,uu=6,fu=7,Pc=300,Yi=301,ji=302,Ga=303,Va=304,Pr=306,kn=1e3,gn=1001,Wa=1002,vn=1003,pu=1004,Ds=1005,He=1006,Nr=1007,_n=1008,Bn=1009,Uc=1010,Dc=1011,ws=1012,Lo=1013,xi=1014,Nn=1015,Es=1016,Po=1017,Uo=1018,Zi=1020,Ic=35902,kc=1021,Nc=1022,xn=1023,Fc=1024,Oc=1025,Xi=1026,Ki=1027,Bc=1028,Do=1029,zc=1030,Io=1031,ko=1033,pr=33776,mr=33777,gr=33778,_r=33779,Xa=35840,qa=35841,$a=35842,Ya=35843,ja=36196,Za=37492,Ka=37496,Ja=37808,Qa=37809,to=37810,eo=37811,no=37812,io=37813,so=37814,ro=37815,ao=37816,oo=37817,lo=37818,co=37819,ho=37820,uo=37821,xr=36492,fo=36494,po=36495,Hc=36283,mo=36284,go=36285,_o=36286,mu=3200,gu=3201,No=0,_u=1,Zn="",Le="srgb",ts="srgb-linear",Ur="linear",ue="srgb",yi=7680,tl=519,xu=512,vu=513,bu=514,Gc=515,Mu=516,wu=517,yu=518,Su=519,xo=35044,el="300 es",Fn=2e3,Sr=2001;class es{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fr=Math.PI/180,vo=180/Math.PI;function Qn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[s&255]+Ne[s>>8&255]+Ne[s>>16&255]+Ne[s>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Ke(s,t,e){return Math.max(t,Math.min(e,s))}function Tu(s,t){return(s%t+t)%t}function Or(s,t,e){return(1-e)*s+e*t}function Tn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function fe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Ht{constructor(t=0,e=0){Ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ke(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class jt{constructor(t,e,n,i,r,o,a,l,c){jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],p=n[5],g=n[8],x=i[0],m=i[3],u=i[6],S=i[1],w=i[4],_=i[7],y=i[2],M=i[5],R=i[8];return r[0]=o*x+a*S+l*y,r[3]=o*m+a*w+l*M,r[6]=o*u+a*_+l*R,r[1]=c*x+h*S+d*y,r[4]=c*m+h*w+d*M,r[7]=c*u+h*_+d*R,r[2]=f*x+p*S+g*y,r[5]=f*m+p*w+g*M,r[8]=f*u+p*_+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,f=a*l-h*r,p=c*r-o*l,g=e*d+n*f+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(i*c-h*n)*x,t[2]=(a*n-i*o)*x,t[3]=f*x,t[4]=(h*e-i*l)*x,t[5]=(i*r-a*e)*x,t[6]=p*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Br.makeScale(t,e)),this}rotate(t){return this.premultiply(Br.makeRotation(-t)),this}translate(t,e){return this.premultiply(Br.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Br=new jt;function Vc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ys(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Eu(){const s=ys("canvas");return s.style.display="block",s}const nl={};function xs(s){s in nl||(nl[s]=!0,console.warn(s))}function Au(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Ru(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Cu(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ae={enabled:!0,workingColorSpace:ts,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ue&&(s.r=On(s.r),s.g=On(s.g),s.b=On(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ue&&(s.r=qi(s.r),s.g=qi(s.g),s.b=qi(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Zn?Ur:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function On(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function qi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const il=[.64,.33,.3,.6,.15,.06],sl=[.2126,.7152,.0722],rl=[.3127,.329],al=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ol=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ae.define({[ts]:{primaries:il,whitePoint:rl,transfer:Ur,toXYZ:al,fromXYZ:ol,luminanceCoefficients:sl,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:il,whitePoint:rl,transfer:ue,toXYZ:al,fromXYZ:ol,luminanceCoefficients:sl,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}});let Si;class Lu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Si===void 0&&(Si=ys("canvas")),Si.width=t.width,Si.height=t.height;const n=Si.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Si}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ys("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=On(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(On(e[n]/255)*255):e[n]=On(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Pu=0;class Wc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Pu++}),this.uuid=Qn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(zr(i[o].image)):r.push(zr(i[o]))}else r=zr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function zr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Lu.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Uu=0;class Ge extends es{constructor(t=Ge.DEFAULT_IMAGE,e=Ge.DEFAULT_MAPPING,n=gn,i=gn,r=He,o=_n,a=xn,l=Bn,c=Ge.DEFAULT_ANISOTROPY,h=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=Qn(),this.name="",this.source=new Wc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ht(0,0),this.repeat=new Ht(1,1),this.center=new Ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Pc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case kn:t.x=t.x-Math.floor(t.x);break;case gn:t.x=t.x<0?0:1;break;case Wa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case kn:t.y=t.y-Math.floor(t.y);break;case gn:t.y=t.y<0?0:1;break;case Wa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Pc;Ge.DEFAULT_ANISOTROPY=1;class pe{constructor(t=0,e=0,n=0,i=1){pe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],d=l[8],f=l[1],p=l[5],g=l[9],x=l[2],m=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,_=(p+1)/2,y=(u+1)/2,M=(h+f)/4,R=(d+x)/4,A=(g+m)/4;return w>_&&w>y?w<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(w),i=M/n,r=R/n):_>y?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=M/i,r=A/i):y<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(y),n=R/r,i=A/r),this.set(n,i,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-x)/S,this.z=(f-h)/S,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Du extends es{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:He,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ge(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Wc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vi extends Du{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Xc extends Ge{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=vn,this.minFilter=vn,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Iu extends Ge{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=vn,this.minFilter=vn,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class As{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const f=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(d!==x||l!==f||c!==p||h!==g){let m=1-a;const u=l*f+c*p+h*g+d*x,S=u>=0?1:-1,w=1-u*u;if(w>Number.EPSILON){const y=Math.sqrt(w),M=Math.atan2(y,u*S);m=Math.sin(m*M)/y,a=Math.sin(a*M)/y}const _=a*S;if(l=l*m+f*_,c=c*m+p*_,h=h*m+g*_,d=d*m+x*_,m===1-a){const y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*p-c*f,t[e+1]=l*g+h*f+c*d-a*p,t[e+2]=c*g+h*p+a*f-l*d,t[e+3]=h*g-a*d-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),f=l(n/2),p=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*d+c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d-f*p*g;break;case"YXZ":this._x=f*h*d+c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d+f*p*g;break;case"ZXY":this._x=f*h*d-c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d-f*p*g;break;case"ZYX":this._x=f*h*d-c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d+f*p*g;break;case"YZX":this._x=f*h*d+c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d-f*p*g;break;case"XZY":this._x=f*h*d-c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],f=n+a+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-i)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(r-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(o-i)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ke(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,n=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ll.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ll.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Hr.copy(this).projectOnVector(t),this.sub(Hr)}reflect(t){return this.sub(Hr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ke(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Hr=new F,ll=new As;class Rs{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,dn):dn.fromBufferAttribute(r,o),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Is.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Is.copy(n.boundingBox)),Is.applyMatrix4(t.matrixWorld),this.union(Is)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(os),ks.subVectors(this.max,os),Ti.subVectors(t.a,os),Ei.subVectors(t.b,os),Ai.subVectors(t.c,os),Vn.subVectors(Ei,Ti),Wn.subVectors(Ai,Ei),ii.subVectors(Ti,Ai);let e=[0,-Vn.z,Vn.y,0,-Wn.z,Wn.y,0,-ii.z,ii.y,Vn.z,0,-Vn.x,Wn.z,0,-Wn.x,ii.z,0,-ii.x,-Vn.y,Vn.x,0,-Wn.y,Wn.x,0,-ii.y,ii.x,0];return!Gr(e,Ti,Ei,Ai,ks)||(e=[1,0,0,0,1,0,0,0,1],!Gr(e,Ti,Ei,Ai,ks))?!1:(Ns.crossVectors(Vn,Wn),e=[Ns.x,Ns.y,Ns.z],Gr(e,Ti,Ei,Ai,ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Rn=[new F,new F,new F,new F,new F,new F,new F,new F],dn=new F,Is=new Rs,Ti=new F,Ei=new F,Ai=new F,Vn=new F,Wn=new F,ii=new F,os=new F,ks=new F,Ns=new F,si=new F;function Gr(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){si.fromArray(s,r);const a=i.x*Math.abs(si.x)+i.y*Math.abs(si.y)+i.z*Math.abs(si.z),l=t.dot(si),c=e.dot(si),h=n.dot(si);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const ku=new Rs,ls=new F,Vr=new F;class Fo{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ku.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ls.subVectors(t,this.center);const e=ls.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ls,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Vr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ls.copy(t.center).add(Vr)),this.expandByPoint(ls.copy(t.center).sub(Vr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Cn=new F,Wr=new F,Fs=new F,Xn=new F,Xr=new F,Os=new F,qr=new F;class qc{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Wr.copy(t).add(e).multiplyScalar(.5),Fs.copy(e).sub(t).normalize(),Xn.copy(this.origin).sub(Wr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Fs),a=Xn.dot(this.direction),l=-Xn.dot(Fs),c=Xn.lengthSq(),h=Math.abs(1-o*o);let d,f,p,g;if(h>0)if(d=o*l-a,f=o*a-l,g=r*h,d>=0)if(f>=-g)if(f<=g){const x=1/h;d*=x,f*=x,p=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Wr).addScaledVector(Fs,f),p}intersectSphere(t,e){Cn.subVectors(t.center,this.origin);const n=Cn.dot(this.direction),i=Cn.dot(Cn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(a=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,n,i,r){Xr.subVectors(e,t),Os.subVectors(n,t),qr.crossVectors(Xr,Os);let o=this.direction.dot(qr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Xn.subVectors(this.origin,t);const l=a*this.direction.dot(Os.crossVectors(Xn,Os));if(l<0)return null;const c=a*this.direction.dot(Xr.cross(Xn));if(c<0||l+c>o)return null;const h=-a*Xn.dot(qr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ve{constructor(t,e,n,i,r,o,a,l,c,h,d,f,p,g,x,m){ve.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,d,f,p,g,x,m)}set(t,e,n,i,r,o,a,l,c,h,d,f,p,g,x,m){const u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=i,u[1]=r,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=p,u[7]=g,u[11]=x,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ve().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ri.setFromMatrixColumn(t,0).length(),r=1/Ri.setFromMatrixColumn(t,1).length(),o=1/Ri.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const f=o*h,p=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=p+g*c,e[5]=f-x*c,e[9]=-a*l,e[2]=x-f*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,p=l*d,g=c*h,x=c*d;e[0]=f+x*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=x+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,p=l*d,g=c*h,x=c*d;e[0]=f-x*a,e[4]=-o*d,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=x-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,p=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=g*c-p,e[8]=f*c+x,e[1]=l*d,e[5]=x*c+f,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-f*d,e[8]=g*d+p,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*d+g,e[10]=f-x*d}else if(t.order==="XZY"){const f=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=f*d+x,e[5]=o*h,e[9]=p*d-g,e[2]=g*d-p,e[6]=a*h,e[10]=x*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Nu,t,Fu)}lookAt(t,e,n){const i=this.elements;return en.subVectors(t,e),en.lengthSq()===0&&(en.z=1),en.normalize(),qn.crossVectors(n,en),qn.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),qn.crossVectors(n,en)),qn.normalize(),Bs.crossVectors(en,qn),i[0]=qn.x,i[4]=Bs.x,i[8]=en.x,i[1]=qn.y,i[5]=Bs.y,i[9]=en.y,i[2]=qn.z,i[6]=Bs.z,i[10]=en.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],p=n[13],g=n[2],x=n[6],m=n[10],u=n[14],S=n[3],w=n[7],_=n[11],y=n[15],M=i[0],R=i[4],A=i[8],b=i[12],v=i[1],C=i[5],U=i[9],I=i[13],V=i[2],K=i[6],X=i[10],it=i[14],$=i[3],dt=i[7],_t=i[11],Pt=i[15];return r[0]=o*M+a*v+l*V+c*$,r[4]=o*R+a*C+l*K+c*dt,r[8]=o*A+a*U+l*X+c*_t,r[12]=o*b+a*I+l*it+c*Pt,r[1]=h*M+d*v+f*V+p*$,r[5]=h*R+d*C+f*K+p*dt,r[9]=h*A+d*U+f*X+p*_t,r[13]=h*b+d*I+f*it+p*Pt,r[2]=g*M+x*v+m*V+u*$,r[6]=g*R+x*C+m*K+u*dt,r[10]=g*A+x*U+m*X+u*_t,r[14]=g*b+x*I+m*it+u*Pt,r[3]=S*M+w*v+_*V+y*$,r[7]=S*R+w*C+_*K+y*dt,r[11]=S*A+w*U+_*X+y*_t,r[15]=S*b+w*I+_*it+y*Pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],f=t[10],p=t[14],g=t[3],x=t[7],m=t[11],u=t[15];return g*(+r*l*d-i*c*d-r*a*f+n*c*f+i*a*p-n*l*p)+x*(+e*l*p-e*c*f+r*o*f-i*o*p+i*c*h-r*l*h)+m*(+e*c*d-e*a*p-r*o*d+n*o*p+r*a*h-n*c*h)+u*(-i*a*h-e*l*d+e*a*f+i*o*d-n*o*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],f=t[10],p=t[11],g=t[12],x=t[13],m=t[14],u=t[15],S=d*m*c-x*f*c+x*l*p-a*m*p-d*l*u+a*f*u,w=g*f*c-h*m*c-g*l*p+o*m*p+h*l*u-o*f*u,_=h*x*c-g*d*c+g*a*p-o*x*p-h*a*u+o*d*u,y=g*d*l-h*x*l-g*a*f+o*x*f+h*a*m-o*d*m,M=e*S+n*w+i*_+r*y;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/M;return t[0]=S*R,t[1]=(x*f*r-d*m*r-x*i*p+n*m*p+d*i*u-n*f*u)*R,t[2]=(a*m*r-x*l*r+x*i*c-n*m*c-a*i*u+n*l*u)*R,t[3]=(d*l*r-a*f*r-d*i*c+n*f*c+a*i*p-n*l*p)*R,t[4]=w*R,t[5]=(h*m*r-g*f*r+g*i*p-e*m*p-h*i*u+e*f*u)*R,t[6]=(g*l*r-o*m*r-g*i*c+e*m*c+o*i*u-e*l*u)*R,t[7]=(o*f*r-h*l*r+h*i*c-e*f*c-o*i*p+e*l*p)*R,t[8]=_*R,t[9]=(g*d*r-h*x*r-g*n*p+e*x*p+h*n*u-e*d*u)*R,t[10]=(o*x*r-g*a*r+g*n*c-e*x*c-o*n*u+e*a*u)*R,t[11]=(h*a*r-o*d*r-h*n*c+e*d*c+o*n*p-e*a*p)*R,t[12]=y*R,t[13]=(h*x*i-g*d*i+g*n*f-e*x*f-h*n*m+e*d*m)*R,t[14]=(g*a*i-o*x*i-g*n*l+e*x*l+o*n*m-e*a*m)*R,t[15]=(o*d*i-h*a*i+h*n*l-e*d*l-o*n*f+e*a*f)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,f=r*c,p=r*h,g=r*d,x=o*h,m=o*d,u=a*d,S=l*c,w=l*h,_=l*d,y=n.x,M=n.y,R=n.z;return i[0]=(1-(x+u))*y,i[1]=(p+_)*y,i[2]=(g-w)*y,i[3]=0,i[4]=(p-_)*M,i[5]=(1-(f+u))*M,i[6]=(m+S)*M,i[7]=0,i[8]=(g+w)*R,i[9]=(m-S)*R,i[10]=(1-(f+x))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Ri.set(i[0],i[1],i[2]).length();const o=Ri.set(i[4],i[5],i[6]).length(),a=Ri.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],un.copy(this);const c=1/r,h=1/o,d=1/a;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=d,un.elements[9]*=d,un.elements[10]*=d,e.setFromRotationMatrix(un),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=Fn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),d=(e+t)/(e-t),f=(n+i)/(n-i);let p,g;if(a===Fn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Sr)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Fn){const l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(o-r),f=(e+t)*c,p=(n+i)*h;let g,x;if(a===Fn)g=(o+r)*d,x=-2*d;else if(a===Sr)g=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ri=new F,un=new ve,Nu=new F(0,0,0),Fu=new F(1,1,1),qn=new F,Bs=new F,en=new F,cl=new ve,hl=new As;class bn{constructor(t=0,e=0,n=0,i=bn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],f=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return cl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(cl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return hl.setFromEuler(this),this.setFromQuaternion(hl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bn.DEFAULT_ORDER="XYZ";class Oo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ou=0;const dl=new F,Ci=new As,Ln=new ve,zs=new F,cs=new F,Bu=new F,zu=new As,ul=new F(1,0,0),fl=new F(0,1,0),pl=new F(0,0,1),ml={type:"added"},Hu={type:"removed"},Li={type:"childadded",child:null},$r={type:"childremoved",child:null};class ke extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ou++}),this.uuid=Qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ke.DEFAULT_UP.clone();const t=new F,e=new bn,n=new As,i=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ve},normalMatrix:{value:new jt}}),this.matrix=new ve,this.matrixWorld=new ve,this.matrixAutoUpdate=ke.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.premultiply(Ci),this}rotateX(t){return this.rotateOnAxis(ul,t)}rotateY(t){return this.rotateOnAxis(fl,t)}rotateZ(t){return this.rotateOnAxis(pl,t)}translateOnAxis(t,e){return dl.copy(t).applyQuaternion(this.quaternion),this.position.add(dl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ul,t)}translateY(t){return this.translateOnAxis(fl,t)}translateZ(t){return this.translateOnAxis(pl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?zs.copy(t):zs.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(cs,zs,this.up):Ln.lookAt(zs,cs,this.up),this.quaternion.setFromRotationMatrix(Ln),i&&(Ln.extractRotation(i.matrixWorld),Ci.setFromRotationMatrix(Ln),this.quaternion.premultiply(Ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ml),Li.child=t,this.dispatchEvent(Li),Li.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Hu),$r.child=t,this.dispatchEvent($r),$r.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ml),Li.child=t,this.dispatchEvent(Li),Li.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,t,Bu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,zu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ke.DEFAULT_UP=new F(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new F,Pn=new F,Yr=new F,Un=new F,Pi=new F,Ui=new F,gl=new F,jr=new F,Zr=new F,Kr=new F,Jr=new pe,Qr=new pe,ta=new pe;class cn{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),fn.subVectors(t,e),i.cross(fn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){fn.subVectors(i,e),Pn.subVectors(n,e),Yr.subVectors(t,e);const o=fn.dot(fn),a=fn.dot(Pn),l=fn.dot(Yr),c=Pn.dot(Pn),h=Pn.dot(Yr),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const f=1/d,p=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Un.x),l.addScaledVector(o,Un.y),l.addScaledVector(a,Un.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return Jr.setScalar(0),Qr.setScalar(0),ta.setScalar(0),Jr.fromBufferAttribute(t,e),Qr.fromBufferAttribute(t,n),ta.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Jr,r.x),o.addScaledVector(Qr,r.y),o.addScaledVector(ta,r.z),o}static isFrontFacing(t,e,n,i){return fn.subVectors(n,e),Pn.subVectors(t,e),fn.cross(Pn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),fn.cross(Pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return cn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return cn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return cn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return cn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return cn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;Pi.subVectors(i,n),Ui.subVectors(r,n),jr.subVectors(t,n);const l=Pi.dot(jr),c=Ui.dot(jr);if(l<=0&&c<=0)return e.copy(n);Zr.subVectors(t,i);const h=Pi.dot(Zr),d=Ui.dot(Zr);if(h>=0&&d<=h)return e.copy(i);const f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Pi,o);Kr.subVectors(t,r);const p=Pi.dot(Kr),g=Ui.dot(Kr);if(g>=0&&p<=g)return e.copy(r);const x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ui,a);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return gl.subVectors(r,i),a=(d-h)/(d-h+(p-g)),e.copy(i).addScaledVector(gl,a);const u=1/(m+x+f);return o=x*u,a=f*u,e.copy(n).addScaledVector(Pi,o).addScaledVector(Ui,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const $c={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$n={h:0,s:0,l:0},Hs={h:0,s:0,l:0};function ea(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Ot{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ae.workingColorSpace){if(t=Tu(t,1),e=Ke(e,0,1),n=Ke(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ea(o,r,t+1/3),this.g=ea(o,r,t),this.b=ea(o,r,t-1/3)}return ae.toWorkingColorSpace(this,i),this}setStyle(t,e=Le){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){const n=$c[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=On(t.r),this.g=On(t.g),this.b=On(t.b),this}copyLinearToSRGB(t){return this.r=qi(t.r),this.g=qi(t.g),this.b=qi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return ae.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Ke(Fe.r*255,0,255))*65536+Math.round(Ke(Fe.g*255,0,255))*256+Math.round(Ke(Fe.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace(Fe.copy(this),e);const n=Fe.r,i=Fe.g,r=Fe.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Le){ae.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,i=Fe.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL($n),this.setHSL($n.h+t,$n.s+e,$n.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL($n),t.getHSL(Hs);const n=Or($n.h,Hs.h,e),i=Or($n.s,Hs.s,e),r=Or($n.l,Hs.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new Ot;Ot.NAMES=$c;let Gu=0;class bi extends es{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=Qn(),this.name="",this.blending=Wi,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Da,this.blendDst=Ia,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=$i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yi,this.stencilZFail=yi,this.stencilZPass=yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Wi&&(n.blending=this.blending),this.side!==ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Da&&(n.blendSrc=this.blendSrc),this.blendDst!==Ia&&(n.blendDst=this.blendDst),this.blendEquation!==fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==yi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==yi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==yi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ce extends bi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Lr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Re=new F,Gs=new Ht;class $e{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=xo,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Gs.fromBufferAttribute(this,e),Gs.applyMatrix3(t),this.setXY(e,Gs.x,Gs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix3(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix4(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyNormalMatrix(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.transformDirection(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=fe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Tn(e,this.array)),e}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Tn(e,this.array)),e}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Tn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Tn(e,this.array)),e}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),i=fe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),i=fe(i,this.array),r=fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==xo&&(t.usage=this.usage),t}}class Yc extends $e{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class jc extends $e{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Se extends $e{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Vu=0;const on=new ve,na=new ke,Di=new F,nn=new Rs,hs=new Rs,Ie=new F;class Ve extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=Qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Vc(t)?jc:Yc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,n){return on.makeTranslation(t,e,n),this.applyMatrix4(on),this}scale(t,e,n){return on.makeScale(t,e,n),this.applyMatrix4(on),this}lookAt(t){return na.lookAt(t),na.updateMatrix(),this.applyMatrix4(na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Se(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];hs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(nn.min,hs.min),nn.expandByPoint(Ie),Ie.addVectors(nn.max,hs.max),nn.expandByPoint(Ie)):(nn.expandByPoint(hs.min),nn.expandByPoint(hs.max))}nn.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ie.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ie));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ie.fromBufferAttribute(a,c),l&&(Di.fromBufferAttribute(t,c),Ie.add(Di)),i=Math.max(i,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<n.count;A++)a[A]=new F,l[A]=new F;const c=new F,h=new F,d=new F,f=new Ht,p=new Ht,g=new Ht,x=new F,m=new F;function u(A,b,v){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,b),d.fromBufferAttribute(n,v),f.fromBufferAttribute(r,A),p.fromBufferAttribute(r,b),g.fromBufferAttribute(r,v),h.sub(c),d.sub(c),p.sub(f),g.sub(f);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(C),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(C),a[A].add(x),a[b].add(x),a[v].add(x),l[A].add(m),l[b].add(m),l[v].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let A=0,b=S.length;A<b;++A){const v=S[A],C=v.start,U=v.count;for(let I=C,V=C+U;I<V;I+=3)u(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const w=new F,_=new F,y=new F,M=new F;function R(A){y.fromBufferAttribute(i,A),M.copy(y);const b=a[A];w.copy(b),w.sub(y.multiplyScalar(y.dot(b))).normalize(),_.crossVectors(M,b);const C=_.dot(l[A])<0?-1:1;o.setXYZW(A,w.x,w.y,w.z,C)}for(let A=0,b=S.length;A<b;++A){const v=S[A],C=v.start,U=v.count;for(let I=C,V=C+U;I<V;I+=3)R(t.getX(I+0)),R(t.getX(I+1)),R(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $e(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const i=new F,r=new F,o=new F,a=new F,l=new F,c=new F,h=new F,d=new F;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,d=a.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*h;for(let u=0;u<h;u++)f[g++]=c[p++]}return new $e(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ve,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const f=c[h],p=t(f,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let f=0,p=d.length;f<p;f++)h.push(d[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _l=new ve,ri=new qc,Vs=new Fo,xl=new F,Ws=new F,Xs=new F,qs=new F,ia=new F,$s=new F,vl=new F,Ys=new F;class tt extends ke{constructor(t=new Ve,e=new Ce){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){$s.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(ia.fromBufferAttribute(d,t),o?$s.addScaledVector(ia,h):$s.addScaledVector(ia.sub(e),h))}e.add($s)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(r),ri.copy(t.ray).recast(t.near),!(Vs.containsPoint(ri.origin)===!1&&(ri.intersectSphere(Vs,xl)===null||ri.origin.distanceToSquared(xl)>(t.far-t.near)**2))&&(_l.copy(r).invert(),ri.copy(t.ray).applyMatrix4(_l),!(n.boundingBox!==null&&ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ri)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],u=o[m.materialIndex],S=Math.max(m.start,p.start),w=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let _=S,y=w;_<y;_+=3){const M=a.getX(_),R=a.getX(_+1),A=a.getX(_+2);i=js(this,u,t,n,c,h,d,M,R,A),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,u=x;m<u;m+=3){const S=a.getX(m),w=a.getX(m+1),_=a.getX(m+2);i=js(this,o,t,n,c,h,d,S,w,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],u=o[m.materialIndex],S=Math.max(m.start,p.start),w=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=S,y=w;_<y;_+=3){const M=_,R=_+1,A=_+2;i=js(this,u,t,n,c,h,d,M,R,A),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,u=x;m<u;m+=3){const S=m,w=m+1,_=m+2;i=js(this,o,t,n,c,h,d,S,w,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Wu(s,t,e,n,i,r,o,a){let l;if(t.side===Ye?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===ti,a),l===null)return null;Ys.copy(a),Ys.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ys);return c<e.near||c>e.far?null:{distance:c,point:Ys.clone(),object:s}}function js(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,Ws),s.getVertexPosition(l,Xs),s.getVertexPosition(c,qs);const h=Wu(s,t,e,n,Ws,Xs,qs,vl);if(h){const d=new F;cn.getBarycoord(vl,Ws,Xs,qs,d),i&&(h.uv=cn.getInterpolatedAttribute(i,a,l,c,d,new Ht)),r&&(h.uv1=cn.getInterpolatedAttribute(r,a,l,c,d,new Ht)),o&&(h.normal=cn.getInterpolatedAttribute(o,a,l,c,d,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new F,materialIndex:0};cn.getNormal(Ws,Xs,qs,f.normal),h.face=f,h.barycoord=d}return h}class me extends Ve{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Se(c,3)),this.setAttribute("normal",new Se(h,3)),this.setAttribute("uv",new Se(d,2));function g(x,m,u,S,w,_,y,M,R,A,b){const v=_/R,C=y/A,U=_/2,I=y/2,V=M/2,K=R+1,X=A+1;let it=0,$=0;const dt=new F;for(let _t=0;_t<X;_t++){const Pt=_t*C-I;for(let qt=0;qt<K;qt++){const re=qt*v-U;dt[x]=re*S,dt[m]=Pt*w,dt[u]=V,c.push(dt.x,dt.y,dt.z),dt[x]=0,dt[m]=0,dt[u]=M>0?1:-1,h.push(dt.x,dt.y,dt.z),d.push(qt/R),d.push(1-_t/A),it+=1}}for(let _t=0;_t<A;_t++)for(let Pt=0;Pt<R;Pt++){const qt=f+Pt+K*_t,re=f+Pt+K*(_t+1),Z=f+(Pt+1)+K*(_t+1),st=f+(Pt+1)+K*_t;l.push(qt,re,st),l.push(re,Z,st),$+=6}a.addGroup(p,$,b),p+=$,f+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new me(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ji(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Xe(s){const t={};for(let e=0;e<s.length;e++){const n=Ji(s[e]);for(const i in n)t[i]=n[i]}return t}function Xu(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Zc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}const qu={clone:Ji,merge:Xe};var $u=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends bi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$u,this.fragmentShader=Yu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ji(t.uniforms),this.uniformsGroups=Xu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Kc extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ve,this.projectionMatrix=new ve,this.projectionMatrixInverse=new ve,this.coordinateSystem=Fn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new F,bl=new Ht,Ml=new Ht;class sn extends Kc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=vo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Fr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vo*2*Math.atan(Math.tan(Fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,bl,Ml),e.subVectors(Ml,bl)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Fr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ii=-90,ki=1;class ju extends ke{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new sn(Ii,ki,t,e);i.layers=this.layers,this.add(i);const r=new sn(Ii,ki,t,e);r.layers=this.layers,this.add(r);const o=new sn(Ii,ki,t,e);o.layers=this.layers,this.add(o);const a=new sn(Ii,ki,t,e);a.layers=this.layers,this.add(a);const l=new sn(Ii,ki,t,e);l.layers=this.layers,this.add(l);const c=new sn(Ii,ki,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Jc extends Ge{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Yi,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Zu extends vi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Jc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:He}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new me(5,5,5),r=new ei({name:"CubemapFromEquirect",uniforms:Ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:Kn});r.uniforms.tEquirect.value=e;const o=new tt(i,r),a=e.minFilter;return e.minFilter===_n&&(e.minFilter=He),new ju(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const sa=new F,Ku=new F,Ju=new jt;class hi{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=sa.subVectors(n,e).cross(Ku.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(sa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ju.getNormalMatrix(t),i=this.coplanarPoint(sa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ai=new Fo,Zs=new F;class Bo{constructor(t=new hi,e=new hi,n=new hi,i=new hi,r=new hi,o=new hi){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Fn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],d=i[6],f=i[7],p=i[8],g=i[9],x=i[10],m=i[11],u=i[12],S=i[13],w=i[14],_=i[15];if(n[0].setComponents(l-r,f-c,m-p,_-u).normalize(),n[1].setComponents(l+r,f+c,m+p,_+u).normalize(),n[2].setComponents(l+o,f+h,m+g,_+S).normalize(),n[3].setComponents(l-o,f-h,m-g,_-S).normalize(),n[4].setComponents(l-a,f-d,m-x,_-w).normalize(),e===Fn)n[5].setComponents(l+a,f+d,m+x,_+w).normalize();else if(e===Sr)n[5].setComponents(a,d,x,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(t){return ai.center.set(0,0,0),ai.radius=.7071067811865476,ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Zs.x=i.normal.x>0?t.max.x:t.min.x,Zs.y=i.normal.y>0?t.max.y:t.min.y,Zs.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Qc(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Qu(s){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,d=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<d.length;p++){const g=d[f],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,d[f]=x)}d.length=f+1;for(let p=0,g=d.length;p<g;p++){const x=d[p];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class Bt extends Ve{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,f=e/l,p=[],g=[],x=[],m=[];for(let u=0;u<h;u++){const S=u*f-o;for(let w=0;w<c;w++){const _=w*d-r;g.push(_,-S,0),x.push(0,0,1),m.push(w/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let S=0;S<a;S++){const w=S+c*u,_=S+c*(u+1),y=S+1+c*(u+1),M=S+1+c*u;p.push(w,_,M),p.push(_,y,M)}this.setIndex(p),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(x,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bt(t.width,t.height,t.widthSegments,t.heightSegments)}}var tf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ef=`#ifdef USE_ALPHAHASH
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
#endif`,nf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,af=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,of=`#ifdef USE_AOMAP
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
#endif`,lf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cf=`#ifdef USE_BATCHING
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
#endif`,hf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,df=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ff=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pf=`#ifdef USE_IRIDESCENCE
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
#endif`,mf=`#ifdef USE_BUMPMAP
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
#endif`,gf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Sf=`#define PI 3.141592653589793
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
} // validated`,Tf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ef=`vec3 transformedNormal = objectNormal;
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
#endif`,Af=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Uf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Df=`#ifdef USE_ENVMAP
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
#endif`,If=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kf=`#ifdef USE_ENVMAP
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
#endif`,Nf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ff=`#ifdef USE_ENVMAP
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
#endif`,Of=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gf=`#ifdef USE_GRADIENTMAP
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
}`,Vf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qf=`uniform bool receiveShadow;
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
#endif`,$f=`#ifdef USE_ENVMAP
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
#endif`,Yf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jf=`PhysicalMaterial material;
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
#endif`,Qf=`struct PhysicalMaterial {
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
}`,tp=`
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
#endif`,ep=`#if defined( RE_IndirectDiffuse )
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
#endif`,np=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ip=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ap=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,op=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hp=`#if defined( USE_POINTS_UV )
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
#endif`,dp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,up=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gp=`#ifdef USE_MORPHTARGETS
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
#endif`,_p=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yp=`#ifdef USE_NORMALMAP
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
#endif`,Sp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ep=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ap=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Lp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Up=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ip=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Np=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Op=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Bp=`float getShadowMask() {
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
}`,zp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hp=`#ifdef USE_SKINNING
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
#endif`,Gp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vp=`#ifdef USE_SKINNING
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
#endif`,Wp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$p=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yp=`#ifdef USE_TRANSMISSION
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
#endif`,jp=`#ifdef USE_TRANSMISSION
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
#endif`,Zp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,em=`uniform sampler2D t2D;
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
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,im=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,am=`#include <common>
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
}`,om=`#if DEPTH_PACKING == 3200
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
}`,lm=`#define DISTANCE
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
}`,cm=`#define DISTANCE
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
}`,hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,um=`uniform float scale;
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
}`,fm=`uniform vec3 diffuse;
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
}`,pm=`#include <common>
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
}`,mm=`uniform vec3 diffuse;
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
}`,gm=`#define LAMBERT
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
}`,_m=`#define LAMBERT
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
}`,xm=`#define MATCAP
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
}`,vm=`#define MATCAP
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
}`,bm=`#define NORMAL
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
}`,Mm=`#define NORMAL
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
}`,wm=`#define PHONG
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
}`,ym=`#define PHONG
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
}`,Sm=`#define STANDARD
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
}`,Tm=`#define STANDARD
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
}`,Em=`#define TOON
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
}`,Am=`#define TOON
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
}`,Rm=`uniform float size;
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
}`,Cm=`uniform vec3 diffuse;
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
}`,Lm=`#include <common>
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
}`,Pm=`uniform vec3 color;
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
}`,Um=`uniform float rotation;
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
}`,Dm=`uniform vec3 diffuse;
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
}`,Zt={alphahash_fragment:tf,alphahash_pars_fragment:ef,alphamap_fragment:nf,alphamap_pars_fragment:sf,alphatest_fragment:rf,alphatest_pars_fragment:af,aomap_fragment:of,aomap_pars_fragment:lf,batching_pars_vertex:cf,batching_vertex:hf,begin_vertex:df,beginnormal_vertex:uf,bsdfs:ff,iridescence_fragment:pf,bumpmap_pars_fragment:mf,clipping_planes_fragment:gf,clipping_planes_pars_fragment:_f,clipping_planes_pars_vertex:xf,clipping_planes_vertex:vf,color_fragment:bf,color_pars_fragment:Mf,color_pars_vertex:wf,color_vertex:yf,common:Sf,cube_uv_reflection_fragment:Tf,defaultnormal_vertex:Ef,displacementmap_pars_vertex:Af,displacementmap_vertex:Rf,emissivemap_fragment:Cf,emissivemap_pars_fragment:Lf,colorspace_fragment:Pf,colorspace_pars_fragment:Uf,envmap_fragment:Df,envmap_common_pars_fragment:If,envmap_pars_fragment:kf,envmap_pars_vertex:Nf,envmap_physical_pars_fragment:$f,envmap_vertex:Ff,fog_vertex:Of,fog_pars_vertex:Bf,fog_fragment:zf,fog_pars_fragment:Hf,gradientmap_pars_fragment:Gf,lightmap_pars_fragment:Vf,lights_lambert_fragment:Wf,lights_lambert_pars_fragment:Xf,lights_pars_begin:qf,lights_toon_fragment:Yf,lights_toon_pars_fragment:jf,lights_phong_fragment:Zf,lights_phong_pars_fragment:Kf,lights_physical_fragment:Jf,lights_physical_pars_fragment:Qf,lights_fragment_begin:tp,lights_fragment_maps:ep,lights_fragment_end:np,logdepthbuf_fragment:ip,logdepthbuf_pars_fragment:sp,logdepthbuf_pars_vertex:rp,logdepthbuf_vertex:ap,map_fragment:op,map_pars_fragment:lp,map_particle_fragment:cp,map_particle_pars_fragment:hp,metalnessmap_fragment:dp,metalnessmap_pars_fragment:up,morphinstance_vertex:fp,morphcolor_vertex:pp,morphnormal_vertex:mp,morphtarget_pars_vertex:gp,morphtarget_vertex:_p,normal_fragment_begin:xp,normal_fragment_maps:vp,normal_pars_fragment:bp,normal_pars_vertex:Mp,normal_vertex:wp,normalmap_pars_fragment:yp,clearcoat_normal_fragment_begin:Sp,clearcoat_normal_fragment_maps:Tp,clearcoat_pars_fragment:Ep,iridescence_pars_fragment:Ap,opaque_fragment:Rp,packing:Cp,premultiplied_alpha_fragment:Lp,project_vertex:Pp,dithering_fragment:Up,dithering_pars_fragment:Dp,roughnessmap_fragment:Ip,roughnessmap_pars_fragment:kp,shadowmap_pars_fragment:Np,shadowmap_pars_vertex:Fp,shadowmap_vertex:Op,shadowmask_pars_fragment:Bp,skinbase_vertex:zp,skinning_pars_vertex:Hp,skinning_vertex:Gp,skinnormal_vertex:Vp,specularmap_fragment:Wp,specularmap_pars_fragment:Xp,tonemapping_fragment:qp,tonemapping_pars_fragment:$p,transmission_fragment:Yp,transmission_pars_fragment:jp,uv_pars_fragment:Zp,uv_pars_vertex:Kp,uv_vertex:Jp,worldpos_vertex:Qp,background_vert:tm,background_frag:em,backgroundCube_vert:nm,backgroundCube_frag:im,cube_vert:sm,cube_frag:rm,depth_vert:am,depth_frag:om,distanceRGBA_vert:lm,distanceRGBA_frag:cm,equirect_vert:hm,equirect_frag:dm,linedashed_vert:um,linedashed_frag:fm,meshbasic_vert:pm,meshbasic_frag:mm,meshlambert_vert:gm,meshlambert_frag:_m,meshmatcap_vert:xm,meshmatcap_frag:vm,meshnormal_vert:bm,meshnormal_frag:Mm,meshphong_vert:wm,meshphong_frag:ym,meshphysical_vert:Sm,meshphysical_frag:Tm,meshtoon_vert:Em,meshtoon_frag:Am,points_vert:Rm,points_frag:Cm,shadow_vert:Lm,shadow_frag:Pm,sprite_vert:Um,sprite_frag:Dm},ht={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new Ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new Ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},Sn={basic:{uniforms:Xe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Xe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Xe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Xe([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Xe([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Xe([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Xe([ht.points,ht.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Xe([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Xe([ht.common,ht.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Xe([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Xe([ht.sprite,ht.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:Xe([ht.common,ht.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:Xe([ht.lights,ht.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};Sn.physical={uniforms:Xe([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new Ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new Ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new Ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const Ks={r:0,b:0,g:0},oi=new bn,Im=new ve;function km(s,t,e,n,i,r,o){const a=new Ot(0);let l=r===!0?0:1,c,h,d=null,f=0,p=null;function g(S){let w=S.isScene===!0?S.background:null;return w&&w.isTexture&&(w=(S.backgroundBlurriness>0?e:t).get(w)),w}function x(S){let w=!1;const _=g(S);_===null?u(a,l):_&&_.isColor&&(u(_,1),w=!0);const y=s.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||w)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(S,w){const _=g(w);_&&(_.isCubeTexture||_.mapping===Pr)?(h===void 0&&(h=new tt(new me(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:Ji(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(y,M,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),oi.copy(w.backgroundRotation),oi.x*=-1,oi.y*=-1,oi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Im.makeRotationFromEuler(oi)),h.material.toneMapped=ae.getTransfer(_.colorSpace)!==ue,(d!==_||f!==_.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,d=_,f=_.version,p=s.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new tt(new Bt(2,2),new ei({name:"BackgroundMaterial",uniforms:Ji(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=ae.getTransfer(_.colorSpace)!==ue,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||f!==_.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,d=_,f=_.version,p=s.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function u(S,w){S.getRGB(Ks,Zc(s)),n.buffers.color.setClear(Ks.r,Ks.g,Ks.b,w,o)}return{getClearColor:function(){return a},setClearColor:function(S,w=1){a.set(S),l=w,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,u(a,l)},render:x,addToRenderList:m}}function Nm(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,o=!1;function a(v,C,U,I,V){let K=!1;const X=d(I,U,C);r!==X&&(r=X,c(r.object)),K=p(v,I,U,V),K&&g(v,I,U,V),V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,_(v,C,U,I),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return s.createVertexArray()}function c(v){return s.bindVertexArray(v)}function h(v){return s.deleteVertexArray(v)}function d(v,C,U){const I=U.wireframe===!0;let V=n[v.id];V===void 0&&(V={},n[v.id]=V);let K=V[C.id];K===void 0&&(K={},V[C.id]=K);let X=K[I];return X===void 0&&(X=f(l()),K[I]=X),X}function f(v){const C=[],U=[],I=[];for(let V=0;V<e;V++)C[V]=0,U[V]=0,I[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:I,object:v,attributes:{},index:null}}function p(v,C,U,I){const V=r.attributes,K=C.attributes;let X=0;const it=U.getAttributes();for(const $ in it)if(it[$].location>=0){const _t=V[$];let Pt=K[$];if(Pt===void 0&&($==="instanceMatrix"&&v.instanceMatrix&&(Pt=v.instanceMatrix),$==="instanceColor"&&v.instanceColor&&(Pt=v.instanceColor)),_t===void 0||_t.attribute!==Pt||Pt&&_t.data!==Pt.data)return!0;X++}return r.attributesNum!==X||r.index!==I}function g(v,C,U,I){const V={},K=C.attributes;let X=0;const it=U.getAttributes();for(const $ in it)if(it[$].location>=0){let _t=K[$];_t===void 0&&($==="instanceMatrix"&&v.instanceMatrix&&(_t=v.instanceMatrix),$==="instanceColor"&&v.instanceColor&&(_t=v.instanceColor));const Pt={};Pt.attribute=_t,_t&&_t.data&&(Pt.data=_t.data),V[$]=Pt,X++}r.attributes=V,r.attributesNum=X,r.index=I}function x(){const v=r.newAttributes;for(let C=0,U=v.length;C<U;C++)v[C]=0}function m(v){u(v,0)}function u(v,C){const U=r.newAttributes,I=r.enabledAttributes,V=r.attributeDivisors;U[v]=1,I[v]===0&&(s.enableVertexAttribArray(v),I[v]=1),V[v]!==C&&(s.vertexAttribDivisor(v,C),V[v]=C)}function S(){const v=r.newAttributes,C=r.enabledAttributes;for(let U=0,I=C.length;U<I;U++)C[U]!==v[U]&&(s.disableVertexAttribArray(U),C[U]=0)}function w(v,C,U,I,V,K,X){X===!0?s.vertexAttribIPointer(v,C,U,V,K):s.vertexAttribPointer(v,C,U,I,V,K)}function _(v,C,U,I){x();const V=I.attributes,K=U.getAttributes(),X=C.defaultAttributeValues;for(const it in K){const $=K[it];if($.location>=0){let dt=V[it];if(dt===void 0&&(it==="instanceMatrix"&&v.instanceMatrix&&(dt=v.instanceMatrix),it==="instanceColor"&&v.instanceColor&&(dt=v.instanceColor)),dt!==void 0){const _t=dt.normalized,Pt=dt.itemSize,qt=t.get(dt);if(qt===void 0)continue;const re=qt.buffer,Z=qt.type,st=qt.bytesPerElement,St=Z===s.INT||Z===s.UNSIGNED_INT||dt.gpuType===Lo;if(dt.isInterleavedBufferAttribute){const ut=dt.data,Nt=ut.stride,Vt=dt.offset;if(ut.isInstancedInterleavedBuffer){for(let Jt=0;Jt<$.locationSize;Jt++)u($.location+Jt,ut.meshPerAttribute);v.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let Jt=0;Jt<$.locationSize;Jt++)m($.location+Jt);s.bindBuffer(s.ARRAY_BUFFER,re);for(let Jt=0;Jt<$.locationSize;Jt++)w($.location+Jt,Pt/$.locationSize,Z,_t,Nt*st,(Vt+Pt/$.locationSize*Jt)*st,St)}else{if(dt.isInstancedBufferAttribute){for(let ut=0;ut<$.locationSize;ut++)u($.location+ut,dt.meshPerAttribute);v.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let ut=0;ut<$.locationSize;ut++)m($.location+ut);s.bindBuffer(s.ARRAY_BUFFER,re);for(let ut=0;ut<$.locationSize;ut++)w($.location+ut,Pt/$.locationSize,Z,_t,Pt*st,Pt/$.locationSize*ut*st,St)}}else if(X!==void 0){const _t=X[it];if(_t!==void 0)switch(_t.length){case 2:s.vertexAttrib2fv($.location,_t);break;case 3:s.vertexAttrib3fv($.location,_t);break;case 4:s.vertexAttrib4fv($.location,_t);break;default:s.vertexAttrib1fv($.location,_t)}}}}S()}function y(){A();for(const v in n){const C=n[v];for(const U in C){const I=C[U];for(const V in I)h(I[V].object),delete I[V];delete C[U]}delete n[v]}}function M(v){if(n[v.id]===void 0)return;const C=n[v.id];for(const U in C){const I=C[U];for(const V in I)h(I[V].object),delete I[V];delete C[U]}delete n[v.id]}function R(v){for(const C in n){const U=n[C];if(U[v.id]===void 0)continue;const I=U[v.id];for(const V in I)h(I[V].object),delete I[V];delete U[v.id]}}function A(){b(),o=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:A,resetDefaultState:b,dispose:y,releaseStatesOfGeometry:M,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function Fm(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];e.update(p,n,1)}function l(c,h,d,f){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x]*f[x];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Om(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(R){return!(R!==xn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const A=R===Es&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Bn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Nn&&!A)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),u=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=g>0,M=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:_,vertexTextures:y,maxSamples:M}}function Bm(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new hi,a=new jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||n!==0||i;return i=f,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=h(d,f,0)},this.setState=function(d,f,p){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,u=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const S=r?0:n,w=S*4;let _=u.clippingState||null;l.value=_,_=h(g,f,w,p);for(let y=0;y!==w;++y)_[y]=e[y];u.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,f,p,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const u=p+x*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<u)&&(m=new Float32Array(u));for(let w=0,_=p;w!==x;++w,_+=4)o.copy(d[w]).applyMatrix4(S,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function zm(s){let t=new WeakMap;function e(o,a){return a===Ga?o.mapping=Yi:a===Va&&(o.mapping=ji),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ga||a===Va)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Zu(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class th extends Kc{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Vi=4,wl=[.125,.215,.35,.446,.526,.582],pi=20,ra=new th,yl=new Ot;let aa=null,oa=0,la=0,ca=!1;const di=(1+Math.sqrt(5))/2,Ni=1/di,Sl=[new F(-di,Ni,0),new F(di,Ni,0),new F(-Ni,0,di),new F(Ni,0,di),new F(0,di,-Ni),new F(0,di,Ni),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Tl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){aa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Al(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(aa,oa,la),this._renderer.xr.enabled=ca,t.scissorTest=!1,Js(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Yi||t.mapping===ji?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),aa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:He,minFilter:He,generateMipmaps:!1,type:Es,format:xn,colorSpace:ts,depthBuffer:!1},i=El(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=El(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hm(r)),this._blurMaterial=Gm(r,t,e)}return i}_compileMaterial(t){const e=new tt(this._lodPlanes[0],t);this._renderer.compile(e,ra)}_sceneToCubeUV(t,e,n,i){const a=new sn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(yl),h.toneMapping=Jn,h.autoClear=!1;const p=new Ce({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),g=new tt(new me,p);let x=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,x=!0):(p.color.copy(yl),x=!0);for(let u=0;u<6;u++){const S=u%3;S===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):S===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const w=this._cubeSize;Js(i,S*w,u>2?w:0,w,w),h.setRenderTarget(i),x&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Yi||t.mapping===ji;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Al());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new tt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Js(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ra)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Sl[(i-r-1)%Sl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new tt(this._lodPlanes[i],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*pi-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):pi;m>pi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${pi}`);const u=[];let S=0;for(let R=0;R<pi;++R){const A=R/x,b=Math.exp(-A*A/2);u.push(b),R===0?S+=b:R<m&&(S+=2*b)}for(let R=0;R<u.length;R++)u[R]=u[R]/S;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:w}=this;f.dTheta.value=g,f.mipInt.value=w-n;const _=this._sizeLods[i],y=3*_*(i>w-Vi?i-w+Vi:0),M=4*(this._cubeSize-_);Js(e,y,M,3*_,2*_),l.setRenderTarget(e),l.render(d,ra)}}function Hm(s){const t=[],e=[],n=[];let i=s;const r=s-Vi+1+wl.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>s-Vi?l=wl[o-s+Vi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,x=3,m=2,u=1,S=new Float32Array(x*g*p),w=new Float32Array(m*g*p),_=new Float32Array(u*g*p);for(let M=0;M<p;M++){const R=M%3*2/3-1,A=M>2?0:-1,b=[R,A,0,R+2/3,A,0,R+2/3,A+1,0,R,A,0,R+2/3,A+1,0,R,A+1,0];S.set(b,x*g*M),w.set(f,m*g*M);const v=[M,M,M,M,M,M];_.set(v,u*g*M)}const y=new Ve;y.setAttribute("position",new $e(S,x)),y.setAttribute("uv",new $e(w,m)),y.setAttribute("faceIndex",new $e(_,u)),t.push(y),i>Vi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function El(s,t,e){const n=new vi(s,t,e);return n.texture.mapping=Pr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Js(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Gm(s,t,e){const n=new Float32Array(pi),i=new F(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:pi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:zo(),fragmentShader:`

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
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function Al(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zo(),fragmentShader:`

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
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function Rl(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function zo(){return`

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
	`}function Vm(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ga||l===Va,h=l===Yi||l===ji;if(c||h){let d=t.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Tl(s)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new Tl(s)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Wm(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&xs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Xm(s,t,e,n){const i={},r=new WeakMap;function o(d){const f=d.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const x=f.morphAttributes[g];for(let m=0,u=x.length;m<u;m++)t.remove(x[m])}f.removeEventListener("dispose",o),delete i[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function l(d){const f=d.attributes;for(const g in f)t.update(f[g],s.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const x=p[g];for(let m=0,u=x.length;m<u;m++)t.update(x[m],s.ARRAY_BUFFER)}}function c(d){const f=[],p=d.index,g=d.attributes.position;let x=0;if(p!==null){const S=p.array;x=p.version;for(let w=0,_=S.length;w<_;w+=3){const y=S[w+0],M=S[w+1],R=S[w+2];f.push(y,M,M,R,R,y)}}else if(g!==void 0){const S=g.array;x=g.version;for(let w=0,_=S.length/3-1;w<_;w+=3){const y=w+0,M=w+1,R=w+2;f.push(y,M,M,R,R,y)}}else return;const m=new(Vc(f)?jc:Yc)(f,1);m.version=x;const u=r.get(d);u&&t.remove(u),r.set(d,m)}function h(d){const f=r.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function qm(s,t,e){let n;function i(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){s.drawElements(n,p,r,f*o),e.update(p,n,1)}function c(f,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,f*o,g),e.update(p,n,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let u=0;u<g;u++)m+=p[u];e.update(m,n,1)}function d(f,p,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<f.length;u++)c(f[u]/o,p[u],x[u]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,x,0,g);let u=0;for(let S=0;S<g;S++)u+=p[S]*x[S];e.update(u,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function $m(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Ym(s,t,e){const n=new WeakMap,i=new pe;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let b=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],u=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let w=0;p===!0&&(w=1),g===!0&&(w=2),x===!0&&(w=3);let _=a.attributes.position.count*w,y=1;_>t.maxTextureSize&&(y=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const M=new Float32Array(_*y*4*d),R=new Xc(M,_,y,d);R.type=Nn,R.needsUpdate=!0;const A=w*4;for(let v=0;v<d;v++){const C=m[v],U=u[v],I=S[v],V=_*y*4*v;for(let K=0;K<C.count;K++){const X=K*A;p===!0&&(i.fromBufferAttribute(C,K),M[V+X+0]=i.x,M[V+X+1]=i.y,M[V+X+2]=i.z,M[V+X+3]=0),g===!0&&(i.fromBufferAttribute(U,K),M[V+X+4]=i.x,M[V+X+5]=i.y,M[V+X+6]=i.z,M[V+X+7]=0),x===!0&&(i.fromBufferAttribute(I,K),M[V+X+8]=i.x,M[V+X+9]=i.y,M[V+X+10]=i.z,M[V+X+11]=I.itemSize===4?i.w:1)}}f={count:d,texture:R,size:new Ht(_,y)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];const g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function jm(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class eh extends Ge{constructor(t,e,n,i,r,o,a,l,c,h=Xi){if(h!==Xi&&h!==Ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Xi&&(n=xi),n===void 0&&h===Ki&&(n=Zi),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:vn,this.minFilter=l!==void 0?l:vn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const nh=new Ge,Cl=new eh(1,1),ih=new Xc,sh=new Iu,rh=new Jc,Ll=[],Pl=[],Ul=new Float32Array(16),Dl=new Float32Array(9),Il=new Float32Array(4);function ns(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Ll[i];if(r===void 0&&(r=new Float32Array(i),Ll[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Ue(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function De(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Dr(s,t){let e=Pl[t];e===void 0&&(e=new Int32Array(t),Pl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Zm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Km(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;s.uniform2fv(this.addr,t),De(e,t)}}function Jm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ue(e,t))return;s.uniform3fv(this.addr,t),De(e,t)}}function Qm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;s.uniform4fv(this.addr,t),De(e,t)}}function tg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Ue(e,n))return;Il.set(n),s.uniformMatrix2fv(this.addr,!1,Il),De(e,n)}}function eg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Ue(e,n))return;Dl.set(n),s.uniformMatrix3fv(this.addr,!1,Dl),De(e,n)}}function ng(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Ue(e,n))return;Ul.set(n),s.uniformMatrix4fv(this.addr,!1,Ul),De(e,n)}}function ig(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function sg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;s.uniform2iv(this.addr,t),De(e,t)}}function rg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;s.uniform3iv(this.addr,t),De(e,t)}}function ag(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;s.uniform4iv(this.addr,t),De(e,t)}}function og(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function lg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;s.uniform2uiv(this.addr,t),De(e,t)}}function cg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;s.uniform3uiv(this.addr,t),De(e,t)}}function hg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;s.uniform4uiv(this.addr,t),De(e,t)}}function dg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Cl.compareFunction=Gc,r=Cl):r=nh,e.setTexture2D(t||r,i)}function ug(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||sh,i)}function fg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||rh,i)}function pg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||ih,i)}function mg(s){switch(s){case 5126:return Zm;case 35664:return Km;case 35665:return Jm;case 35666:return Qm;case 35674:return tg;case 35675:return eg;case 35676:return ng;case 5124:case 35670:return ig;case 35667:case 35671:return sg;case 35668:case 35672:return rg;case 35669:case 35673:return ag;case 5125:return og;case 36294:return lg;case 36295:return cg;case 36296:return hg;case 35678:case 36198:case 36298:case 36306:case 35682:return dg;case 35679:case 36299:case 36307:return ug;case 35680:case 36300:case 36308:case 36293:return fg;case 36289:case 36303:case 36311:case 36292:return pg}}function gg(s,t){s.uniform1fv(this.addr,t)}function _g(s,t){const e=ns(t,this.size,2);s.uniform2fv(this.addr,e)}function xg(s,t){const e=ns(t,this.size,3);s.uniform3fv(this.addr,e)}function vg(s,t){const e=ns(t,this.size,4);s.uniform4fv(this.addr,e)}function bg(s,t){const e=ns(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Mg(s,t){const e=ns(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function wg(s,t){const e=ns(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function yg(s,t){s.uniform1iv(this.addr,t)}function Sg(s,t){s.uniform2iv(this.addr,t)}function Tg(s,t){s.uniform3iv(this.addr,t)}function Eg(s,t){s.uniform4iv(this.addr,t)}function Ag(s,t){s.uniform1uiv(this.addr,t)}function Rg(s,t){s.uniform2uiv(this.addr,t)}function Cg(s,t){s.uniform3uiv(this.addr,t)}function Lg(s,t){s.uniform4uiv(this.addr,t)}function Pg(s,t,e){const n=this.cache,i=t.length,r=Dr(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||nh,r[o])}function Ug(s,t,e){const n=this.cache,i=t.length,r=Dr(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||sh,r[o])}function Dg(s,t,e){const n=this.cache,i=t.length,r=Dr(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||rh,r[o])}function Ig(s,t,e){const n=this.cache,i=t.length,r=Dr(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||ih,r[o])}function kg(s){switch(s){case 5126:return gg;case 35664:return _g;case 35665:return xg;case 35666:return vg;case 35674:return bg;case 35675:return Mg;case 35676:return wg;case 5124:case 35670:return yg;case 35667:case 35671:return Sg;case 35668:case 35672:return Tg;case 35669:case 35673:return Eg;case 5125:return Ag;case 36294:return Rg;case 36295:return Cg;case 36296:return Lg;case 35678:case 36198:case 36298:case 36306:case 35682:return Pg;case 35679:case 36299:case 36307:return Ug;case 35680:case 36300:case 36308:case 36293:return Dg;case 36289:case 36303:case 36311:case 36292:return Ig}}class Ng{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=mg(e.type)}}class Fg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=kg(e.type)}}class Og{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const ha=/(\w+)(\])?(\[|\.)?/g;function kl(s,t){s.seq.push(t),s.map[t.id]=t}function Bg(s,t,e){const n=s.name,i=n.length;for(ha.lastIndex=0;;){const r=ha.exec(n),o=ha.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){kl(e,c===void 0?new Ng(a,s,t):new Fg(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new Og(a),kl(e,d)),e=d}}}class vr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Bg(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Nl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const zg=37297;let Hg=0;function Gg(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Fl=new jt;function Vg(s){ae._getMatrix(Fl,ae.workingColorSpace,s);const t=`mat3( ${Fl.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(s)){case Ur:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Ol(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Gg(s.getShaderSource(t),o)}else return i}function Wg(s,t){const e=Vg(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Xg(s,t){let e;switch(t){case ou:e="Linear";break;case lu:e="Reinhard";break;case cu:e="Cineon";break;case hu:e="ACESFilmic";break;case uu:e="AgX";break;case fu:e="Neutral";break;case du:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Qs=new F;function qg(){ae.getLuminanceCoefficients(Qs);const s=Qs.x.toFixed(4),t=Qs.y.toFixed(4),e=Qs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $g(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vs).join(`
`)}function Yg(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function jg(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function vs(s){return s!==""}function Bl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Zg=/^[ \t]*#include +<([\w\d./]+)>/gm;function bo(s){return s.replace(Zg,Jg)}const Kg=new Map;function Jg(s,t){let e=Zt[t];if(e===void 0){const n=Kg.get(t);if(n!==void 0)e=Zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return bo(e)}const Qg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(s){return s.replace(Qg,t0)}function t0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Gl(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function e0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Lc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===zd?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Dn&&(t="SHADOWMAP_TYPE_VSM"),t}function n0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Yi:case ji:t="ENVMAP_TYPE_CUBE";break;case Pr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function i0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ji:t="ENVMAP_MODE_REFRACTION";break}return t}function s0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Lr:t="ENVMAP_BLENDING_MULTIPLY";break;case ru:t="ENVMAP_BLENDING_MIX";break;case au:t="ENVMAP_BLENDING_ADD";break}return t}function r0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function a0(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=e0(e),c=n0(e),h=i0(e),d=s0(e),f=r0(e),p=$g(e),g=Yg(r),x=i.createProgram();let m,u,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vs).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vs).join(`
`),u.length>0&&(u+=`
`)):(m=[Gl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vs).join(`
`),u=[Gl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Jn?"#define TONE_MAPPING":"",e.toneMapping!==Jn?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Jn?Xg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,Wg("linearToOutputTexel",e.outputColorSpace),qg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(vs).join(`
`)),o=bo(o),o=Bl(o,e),o=zl(o,e),a=bo(a),a=Bl(a,e),a=zl(a,e),o=Hl(o),a=Hl(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",e.glslVersion===el?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===el?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const w=S+m+o,_=S+u+a,y=Nl(i,i.VERTEX_SHADER,w),M=Nl(i,i.FRAGMENT_SHADER,_);i.attachShader(x,y),i.attachShader(x,M),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function R(C){if(s.debug.checkShaderErrors){const U=i.getProgramInfoLog(x).trim(),I=i.getShaderInfoLog(y).trim(),V=i.getShaderInfoLog(M).trim();let K=!0,X=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(K=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,y,M);else{const it=Ol(i,y,"vertex"),$=Ol(i,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+U+`
`+it+`
`+$)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(I===""||V==="")&&(X=!1);X&&(C.diagnostics={runnable:K,programLog:U,vertexShader:{log:I,prefix:m},fragmentShader:{log:V,prefix:u}})}i.deleteShader(y),i.deleteShader(M),A=new vr(i,x),b=jg(i,x)}let A;this.getUniforms=function(){return A===void 0&&R(this),A};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(x,zg)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Hg++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=y,this.fragmentShader=M,this}let o0=0;class l0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new c0(t),e.set(t,n)),n}}class c0{constructor(t){this.id=o0++,this.code=t,this.usedTimes=0}}function h0(s,t,e,n,i,r,o){const a=new Oo,l=new l0,c=new Set,h=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,v,C,U,I){const V=U.fog,K=I.geometry,X=b.isMeshStandardMaterial?U.environment:null,it=(b.isMeshStandardMaterial?e:t).get(b.envMap||X),$=it&&it.mapping===Pr?it.image.height:null,dt=g[b.type];b.precision!==null&&(p=i.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const _t=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Pt=_t!==void 0?_t.length:0;let qt=0;K.morphAttributes.position!==void 0&&(qt=1),K.morphAttributes.normal!==void 0&&(qt=2),K.morphAttributes.color!==void 0&&(qt=3);let re,Z,st,St;if(dt){const ce=Sn[dt];re=ce.vertexShader,Z=ce.fragmentShader}else re=b.vertexShader,Z=b.fragmentShader,l.update(b),st=l.getVertexShaderID(b),St=l.getFragmentShaderID(b);const ut=s.getRenderTarget(),Nt=s.state.buffers.depth.getReversed(),Vt=I.isInstancedMesh===!0,Jt=I.isBatchedMesh===!0,Wt=!!b.map,ie=!!b.matcap,be=!!it,B=!!b.aoMap,Ae=!!b.lightMap,ee=!!b.bumpMap,ne=!!b.normalMap,Ct=!!b.displacementMap,oe=!!b.emissiveMap,It=!!b.metalnessMap,L=!!b.roughnessMap,E=b.anisotropy>0,H=b.clearcoat>0,J=b.dispersion>0,et=b.iridescence>0,j=b.sheen>0,Tt=b.transmission>0,ot=E&&!!b.anisotropyMap,vt=H&&!!b.clearcoatMap,Qt=H&&!!b.clearcoatNormalMap,nt=H&&!!b.clearcoatRoughnessMap,xt=et&&!!b.iridescenceMap,Lt=et&&!!b.iridescenceThicknessMap,Ft=j&&!!b.sheenColorMap,bt=j&&!!b.sheenRoughnessMap,Yt=!!b.specularMap,Gt=!!b.specularColorMap,se=!!b.specularIntensityMap,N=Tt&&!!b.transmissionMap,ct=Tt&&!!b.thicknessMap,q=!!b.gradientMap,Q=!!b.alphaMap,pt=b.alphaTest>0,ft=!!b.alphaHash,Xt=!!b.extensions;let Me=Jn;b.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(Me=s.toneMapping);const Pe={shaderID:dt,shaderType:b.type,shaderName:b.name,vertexShader:re,fragmentShader:Z,defines:b.defines,customVertexShaderID:st,customFragmentShaderID:St,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:Jt,batchingColor:Jt&&I._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&I.instanceColor!==null,instancingMorph:Vt&&I.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ut===null?s.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:ts,alphaToCoverage:!!b.alphaToCoverage,map:Wt,matcap:ie,envMap:be,envMapMode:be&&it.mapping,envMapCubeUVHeight:$,aoMap:B,lightMap:Ae,bumpMap:ee,normalMap:ne,displacementMap:f&&Ct,emissiveMap:oe,normalMapObjectSpace:ne&&b.normalMapType===_u,normalMapTangentSpace:ne&&b.normalMapType===No,metalnessMap:It,roughnessMap:L,anisotropy:E,anisotropyMap:ot,clearcoat:H,clearcoatMap:vt,clearcoatNormalMap:Qt,clearcoatRoughnessMap:nt,dispersion:J,iridescence:et,iridescenceMap:xt,iridescenceThicknessMap:Lt,sheen:j,sheenColorMap:Ft,sheenRoughnessMap:bt,specularMap:Yt,specularColorMap:Gt,specularIntensityMap:se,transmission:Tt,transmissionMap:N,thicknessMap:ct,gradientMap:q,opaque:b.transparent===!1&&b.blending===Wi&&b.alphaToCoverage===!1,alphaMap:Q,alphaTest:pt,alphaHash:ft,combine:b.combine,mapUv:Wt&&x(b.map.channel),aoMapUv:B&&x(b.aoMap.channel),lightMapUv:Ae&&x(b.lightMap.channel),bumpMapUv:ee&&x(b.bumpMap.channel),normalMapUv:ne&&x(b.normalMap.channel),displacementMapUv:Ct&&x(b.displacementMap.channel),emissiveMapUv:oe&&x(b.emissiveMap.channel),metalnessMapUv:It&&x(b.metalnessMap.channel),roughnessMapUv:L&&x(b.roughnessMap.channel),anisotropyMapUv:ot&&x(b.anisotropyMap.channel),clearcoatMapUv:vt&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:Qt&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:Lt&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:bt&&x(b.sheenRoughnessMap.channel),specularMapUv:Yt&&x(b.specularMap.channel),specularColorMapUv:Gt&&x(b.specularColorMap.channel),specularIntensityMapUv:se&&x(b.specularIntensityMap.channel),transmissionMapUv:N&&x(b.transmissionMap.channel),thicknessMapUv:ct&&x(b.thicknessMap.channel),alphaMapUv:Q&&x(b.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(ne||E),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!K.attributes.uv&&(Wt||Q),fog:!!V,useFog:b.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Nt,skinning:I.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Pt,morphTextureStride:qt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:Me,decodeVideoTexture:Wt&&b.map.isVideoTexture===!0&&ae.getTransfer(b.map.colorSpace)===ue,decodeVideoTextureEmissive:oe&&b.emissiveMap.isVideoTexture===!0&&ae.getTransfer(b.emissiveMap.colorSpace)===ue,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===te,flipSided:b.side===Ye,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Xt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&b.extensions.multiDraw===!0||Jt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function u(b){const v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(const C in b.defines)v.push(C),v.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(S(v,b),w(v,b),v.push(s.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function S(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function w(b,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){const v=g[b.type];let C;if(v){const U=Sn[v];C=qu.clone(U.uniforms)}else C=b.uniforms;return C}function y(b,v){let C;for(let U=0,I=h.length;U<I;U++){const V=h[U];if(V.cacheKey===v){C=V,++C.usedTimes;break}}return C===void 0&&(C=new a0(s,v,b,r),h.push(C)),C}function M(b){if(--b.usedTimes===0){const v=h.indexOf(b);h[v]=h[h.length-1],h.pop(),b.destroy()}}function R(b){l.remove(b)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:_,acquireProgram:y,releaseProgram:M,releaseShaderCache:R,programs:h,dispose:A}}function d0(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function u0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Vl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Wl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(d,f,p,g,x,m){let u=s[t];return u===void 0?(u={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},s[t]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=p,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=x,u.group=m),t++,u}function a(d,f,p,g,x,m){const u=o(d,f,p,g,x,m);p.transmission>0?n.push(u):p.transparent===!0?i.push(u):e.push(u)}function l(d,f,p,g,x,m){const u=o(d,f,p,g,x,m);p.transmission>0?n.unshift(u):p.transparent===!0?i.unshift(u):e.unshift(u)}function c(d,f){e.length>1&&e.sort(d||u0),n.length>1&&n.sort(f||Vl),i.length>1&&i.sort(f||Vl)}function h(){for(let d=t,f=s.length;d<f;d++){const p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function f0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new Wl,s.set(n,[o])):i>=r.length?(o=new Wl,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function p0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Ot};break;case"SpotLight":e={position:new F,direction:new F,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new F,halfWidth:new F,halfHeight:new F};break}return s[t.id]=e,e}}}function m0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let g0=0;function _0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function x0(s){const t=new p0,e=m0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);const i=new F,r=new ve,o=new ve;function a(c){let h=0,d=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,g=0,x=0,m=0,u=0,S=0,w=0,_=0,y=0,M=0,R=0;c.sort(_0);for(let b=0,v=c.length;b<v;b++){const C=c[b],U=C.color,I=C.intensity,V=C.distance,K=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=U.r*I,d+=U.g*I,f+=U.b*I;else if(C.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(C.sh.coefficients[X],I);R++}else if(C.isDirectionalLight){const X=t.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const it=C.shadow,$=e.get(C);$.shadowIntensity=it.intensity,$.shadowBias=it.bias,$.shadowNormalBias=it.normalBias,$.shadowRadius=it.radius,$.shadowMapSize=it.mapSize,n.directionalShadow[p]=$,n.directionalShadowMap[p]=K,n.directionalShadowMatrix[p]=C.shadow.matrix,S++}n.directional[p]=X,p++}else if(C.isSpotLight){const X=t.get(C);X.position.setFromMatrixPosition(C.matrixWorld),X.color.copy(U).multiplyScalar(I),X.distance=V,X.coneCos=Math.cos(C.angle),X.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),X.decay=C.decay,n.spot[x]=X;const it=C.shadow;if(C.map&&(n.spotLightMap[y]=C.map,y++,it.updateMatrices(C),C.castShadow&&M++),n.spotLightMatrix[x]=it.matrix,C.castShadow){const $=e.get(C);$.shadowIntensity=it.intensity,$.shadowBias=it.bias,$.shadowNormalBias=it.normalBias,$.shadowRadius=it.radius,$.shadowMapSize=it.mapSize,n.spotShadow[x]=$,n.spotShadowMap[x]=K,_++}x++}else if(C.isRectAreaLight){const X=t.get(C);X.color.copy(U).multiplyScalar(I),X.halfWidth.set(C.width*.5,0,0),X.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=X,m++}else if(C.isPointLight){const X=t.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),X.distance=C.distance,X.decay=C.decay,C.castShadow){const it=C.shadow,$=e.get(C);$.shadowIntensity=it.intensity,$.shadowBias=it.bias,$.shadowNormalBias=it.normalBias,$.shadowRadius=it.radius,$.shadowMapSize=it.mapSize,$.shadowCameraNear=it.camera.near,$.shadowCameraFar=it.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=C.shadow.matrix,w++}n.point[g]=X,g++}else if(C.isHemisphereLight){const X=t.get(C);X.skyColor.copy(C.color).multiplyScalar(I),X.groundColor.copy(C.groundColor).multiplyScalar(I),n.hemi[u]=X,u++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;const A=n.hash;(A.directionalLength!==p||A.pointLength!==g||A.spotLength!==x||A.rectAreaLength!==m||A.hemiLength!==u||A.numDirectionalShadows!==S||A.numPointShadows!==w||A.numSpotShadows!==_||A.numSpotMaps!==y||A.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=_+y-M,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=R,A.directionalLength=p,A.pointLength=g,A.spotLength=x,A.rectAreaLength=m,A.hemiLength=u,A.numDirectionalShadows=S,A.numPointShadows=w,A.numSpotShadows=_,A.numSpotMaps=y,A.numLightProbes=R,n.version=g0++)}function l(c,h){let d=0,f=0,p=0,g=0,x=0;const m=h.matrixWorldInverse;for(let u=0,S=c.length;u<S;u++){const w=c[u];if(w.isDirectionalLight){const _=n.directional[d];_.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),d++}else if(w.isSpotLight){const _=n.spot[p];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),p++}else if(w.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(w.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(w.width*.5,0,0),_.halfHeight.set(0,w.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(w.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function Xl(s){const t=new x0(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function v0(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new Xl(s),t.set(i,[a])):r>=o.length?(a=new Xl(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class b0 extends bi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=mu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class M0 extends bi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const w0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,y0=`uniform sampler2D shadow_pass;
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
}`;function S0(s,t,e){let n=new Bo;const i=new Ht,r=new Ht,o=new pe,a=new b0({depthPacking:gu}),l=new M0,c={},h=e.maxTextureSize,d={[ti]:Ye,[Ye]:ti,[te]:te},f=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ht},radius:{value:4}},vertexShader:w0,fragmentShader:y0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ve;g.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new tt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lc;let u=this.type;this.render=function(M,R,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const b=s.getRenderTarget(),v=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),U=s.state;U.setBlending(Kn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const I=u!==Dn&&this.type===Dn,V=u===Dn&&this.type!==Dn;for(let K=0,X=M.length;K<X;K++){const it=M[K],$=it.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;i.copy($.mapSize);const dt=$.getFrameExtents();if(i.multiply(dt),r.copy($.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/dt.x),i.x=r.x*dt.x,$.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/dt.y),i.y=r.y*dt.y,$.mapSize.y=r.y)),$.map===null||I===!0||V===!0){const Pt=this.type!==Dn?{minFilter:vn,magFilter:vn}:{};$.map!==null&&$.map.dispose(),$.map=new vi(i.x,i.y,Pt),$.map.texture.name=it.name+".shadowMap",$.camera.updateProjectionMatrix()}s.setRenderTarget($.map),s.clear();const _t=$.getViewportCount();for(let Pt=0;Pt<_t;Pt++){const qt=$.getViewport(Pt);o.set(r.x*qt.x,r.y*qt.y,r.x*qt.z,r.y*qt.w),U.viewport(o),$.updateMatrices(it,Pt),n=$.getFrustum(),_(R,A,$.camera,it,this.type)}$.isPointLightShadow!==!0&&this.type===Dn&&S($,A),$.needsUpdate=!1}u=this.type,m.needsUpdate=!1,s.setRenderTarget(b,v,C)};function S(M,R){const A=t.update(x);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new vi(i.x,i.y)),f.uniforms.shadow_pass.value=M.map.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,s.setRenderTarget(M.mapPass),s.clear(),s.renderBufferDirect(R,null,A,f,x,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,s.setRenderTarget(M.map),s.clear(),s.renderBufferDirect(R,null,A,p,x,null)}function w(M,R,A,b){let v=null;const C=A.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(C!==void 0)v=C;else if(v=A.isPointLight===!0?l:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const U=v.uuid,I=R.uuid;let V=c[U];V===void 0&&(V={},c[U]=V);let K=V[I];K===void 0&&(K=v.clone(),V[I]=K,R.addEventListener("dispose",y)),v=K}if(v.visible=R.visible,v.wireframe=R.wireframe,b===Dn?v.side=R.shadowSide!==null?R.shadowSide:R.side:v.side=R.shadowSide!==null?R.shadowSide:d[R.side],v.alphaMap=R.alphaMap,v.alphaTest=R.alphaTest,v.map=R.map,v.clipShadows=R.clipShadows,v.clippingPlanes=R.clippingPlanes,v.clipIntersection=R.clipIntersection,v.displacementMap=R.displacementMap,v.displacementScale=R.displacementScale,v.displacementBias=R.displacementBias,v.wireframeLinewidth=R.wireframeLinewidth,v.linewidth=R.linewidth,A.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const U=s.properties.get(v);U.light=A}return v}function _(M,R,A,b,v){if(M.visible===!1)return;if(M.layers.test(R.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&v===Dn)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,M.matrixWorld);const I=t.update(M),V=M.material;if(Array.isArray(V)){const K=I.groups;for(let X=0,it=K.length;X<it;X++){const $=K[X],dt=V[$.materialIndex];if(dt&&dt.visible){const _t=w(M,dt,b,v);M.onBeforeShadow(s,M,R,A,I,_t,$),s.renderBufferDirect(A,null,I,_t,M,$),M.onAfterShadow(s,M,R,A,I,_t,$)}}}else if(V.visible){const K=w(M,V,b,v);M.onBeforeShadow(s,M,R,A,I,K,null),s.renderBufferDirect(A,null,I,K,M,null),M.onAfterShadow(s,M,R,A,I,K,null)}}const U=M.children;for(let I=0,V=U.length;I<V;I++)_(U[I],R,A,b,v)}function y(M){M.target.removeEventListener("dispose",y);for(const A in c){const b=c[A],v=M.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}const T0={[ka]:Na,[Fa]:za,[Oa]:Ha,[$i]:Ba,[Na]:ka,[za]:Fa,[Ha]:Oa,[Ba]:$i};function E0(s,t){function e(){let N=!1;const ct=new pe;let q=null;const Q=new pe(0,0,0,0);return{setMask:function(pt){q!==pt&&!N&&(s.colorMask(pt,pt,pt,pt),q=pt)},setLocked:function(pt){N=pt},setClear:function(pt,ft,Xt,Me,Pe){Pe===!0&&(pt*=Me,ft*=Me,Xt*=Me),ct.set(pt,ft,Xt,Me),Q.equals(ct)===!1&&(s.clearColor(pt,ft,Xt,Me),Q.copy(ct))},reset:function(){N=!1,q=null,Q.set(-1,0,0,0)}}}function n(){let N=!1,ct=!1,q=null,Q=null,pt=null;return{setReversed:function(ft){if(ct!==ft){const Xt=t.get("EXT_clip_control");ct?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT);const Me=pt;pt=null,this.setClear(Me)}ct=ft},getReversed:function(){return ct},setTest:function(ft){ft?ut(s.DEPTH_TEST):Nt(s.DEPTH_TEST)},setMask:function(ft){q!==ft&&!N&&(s.depthMask(ft),q=ft)},setFunc:function(ft){if(ct&&(ft=T0[ft]),Q!==ft){switch(ft){case ka:s.depthFunc(s.NEVER);break;case Na:s.depthFunc(s.ALWAYS);break;case Fa:s.depthFunc(s.LESS);break;case $i:s.depthFunc(s.LEQUAL);break;case Oa:s.depthFunc(s.EQUAL);break;case Ba:s.depthFunc(s.GEQUAL);break;case za:s.depthFunc(s.GREATER);break;case Ha:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Q=ft}},setLocked:function(ft){N=ft},setClear:function(ft){pt!==ft&&(ct&&(ft=1-ft),s.clearDepth(ft),pt=ft)},reset:function(){N=!1,q=null,Q=null,pt=null,ct=!1}}}function i(){let N=!1,ct=null,q=null,Q=null,pt=null,ft=null,Xt=null,Me=null,Pe=null;return{setTest:function(ce){N||(ce?ut(s.STENCIL_TEST):Nt(s.STENCIL_TEST))},setMask:function(ce){ct!==ce&&!N&&(s.stencilMask(ce),ct=ce)},setFunc:function(ce,Je,rn){(q!==ce||Q!==Je||pt!==rn)&&(s.stencilFunc(ce,Je,rn),q=ce,Q=Je,pt=rn)},setOp:function(ce,Je,rn){(ft!==ce||Xt!==Je||Me!==rn)&&(s.stencilOp(ce,Je,rn),ft=ce,Xt=Je,Me=rn)},setLocked:function(ce){N=ce},setClear:function(ce){Pe!==ce&&(s.clearStencil(ce),Pe=ce)},reset:function(){N=!1,ct=null,q=null,Q=null,pt=null,ft=null,Xt=null,Me=null,Pe=null}}}const r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},d={},f=new WeakMap,p=[],g=null,x=!1,m=null,u=null,S=null,w=null,_=null,y=null,M=null,R=new Ot(0,0,0),A=0,b=!1,v=null,C=null,U=null,I=null,V=null;const K=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,it=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec($)[1]),X=it>=1):$.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),X=it>=2);let dt=null,_t={};const Pt=s.getParameter(s.SCISSOR_BOX),qt=s.getParameter(s.VIEWPORT),re=new pe().fromArray(Pt),Z=new pe().fromArray(qt);function st(N,ct,q,Q){const pt=new Uint8Array(4),ft=s.createTexture();s.bindTexture(N,ft),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Xt=0;Xt<q;Xt++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(ct,0,s.RGBA,1,1,Q,0,s.RGBA,s.UNSIGNED_BYTE,pt):s.texImage2D(ct+Xt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pt);return ft}const St={};St[s.TEXTURE_2D]=st(s.TEXTURE_2D,s.TEXTURE_2D,1),St[s.TEXTURE_CUBE_MAP]=st(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),St[s.TEXTURE_2D_ARRAY]=st(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),St[s.TEXTURE_3D]=st(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ut(s.DEPTH_TEST),o.setFunc($i),ee(!1),ne(Ko),ut(s.CULL_FACE),B(Kn);function ut(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function Nt(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function Vt(N,ct){return d[N]!==ct?(s.bindFramebuffer(N,ct),d[N]=ct,N===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ct),N===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ct),!0):!1}function Jt(N,ct){let q=p,Q=!1;if(N){q=f.get(ct),q===void 0&&(q=[],f.set(ct,q));const pt=N.textures;if(q.length!==pt.length||q[0]!==s.COLOR_ATTACHMENT0){for(let ft=0,Xt=pt.length;ft<Xt;ft++)q[ft]=s.COLOR_ATTACHMENT0+ft;q.length=pt.length,Q=!0}}else q[0]!==s.BACK&&(q[0]=s.BACK,Q=!0);Q&&s.drawBuffers(q)}function Wt(N){return g!==N?(s.useProgram(N),g=N,!0):!1}const ie={[fi]:s.FUNC_ADD,[Gd]:s.FUNC_SUBTRACT,[Vd]:s.FUNC_REVERSE_SUBTRACT};ie[Wd]=s.MIN,ie[Xd]=s.MAX;const be={[qd]:s.ZERO,[$d]:s.ONE,[Yd]:s.SRC_COLOR,[Da]:s.SRC_ALPHA,[tu]:s.SRC_ALPHA_SATURATE,[Jd]:s.DST_COLOR,[Zd]:s.DST_ALPHA,[jd]:s.ONE_MINUS_SRC_COLOR,[Ia]:s.ONE_MINUS_SRC_ALPHA,[Qd]:s.ONE_MINUS_DST_COLOR,[Kd]:s.ONE_MINUS_DST_ALPHA,[eu]:s.CONSTANT_COLOR,[nu]:s.ONE_MINUS_CONSTANT_COLOR,[iu]:s.CONSTANT_ALPHA,[su]:s.ONE_MINUS_CONSTANT_ALPHA};function B(N,ct,q,Q,pt,ft,Xt,Me,Pe,ce){if(N===Kn){x===!0&&(Nt(s.BLEND),x=!1);return}if(x===!1&&(ut(s.BLEND),x=!0),N!==Hd){if(N!==m||ce!==b){if((u!==fi||_!==fi)&&(s.blendEquation(s.FUNC_ADD),u=fi,_=fi),ce)switch(N){case Wi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ua:s.blendFunc(s.ONE,s.ONE);break;case Jo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Qo:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Wi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ua:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Jo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Qo:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}S=null,w=null,y=null,M=null,R.set(0,0,0),A=0,m=N,b=ce}return}pt=pt||ct,ft=ft||q,Xt=Xt||Q,(ct!==u||pt!==_)&&(s.blendEquationSeparate(ie[ct],ie[pt]),u=ct,_=pt),(q!==S||Q!==w||ft!==y||Xt!==M)&&(s.blendFuncSeparate(be[q],be[Q],be[ft],be[Xt]),S=q,w=Q,y=ft,M=Xt),(Me.equals(R)===!1||Pe!==A)&&(s.blendColor(Me.r,Me.g,Me.b,Pe),R.copy(Me),A=Pe),m=N,b=!1}function Ae(N,ct){N.side===te?Nt(s.CULL_FACE):ut(s.CULL_FACE);let q=N.side===Ye;ct&&(q=!q),ee(q),N.blending===Wi&&N.transparent===!1?B(Kn):B(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const Q=N.stencilWrite;a.setTest(Q),Q&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),oe(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ut(s.SAMPLE_ALPHA_TO_COVERAGE):Nt(s.SAMPLE_ALPHA_TO_COVERAGE)}function ee(N){v!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),v=N)}function ne(N){N!==Od?(ut(s.CULL_FACE),N!==C&&(N===Ko?s.cullFace(s.BACK):N===Bd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Nt(s.CULL_FACE),C=N}function Ct(N){N!==U&&(X&&s.lineWidth(N),U=N)}function oe(N,ct,q){N?(ut(s.POLYGON_OFFSET_FILL),(I!==ct||V!==q)&&(s.polygonOffset(ct,q),I=ct,V=q)):Nt(s.POLYGON_OFFSET_FILL)}function It(N){N?ut(s.SCISSOR_TEST):Nt(s.SCISSOR_TEST)}function L(N){N===void 0&&(N=s.TEXTURE0+K-1),dt!==N&&(s.activeTexture(N),dt=N)}function E(N,ct,q){q===void 0&&(dt===null?q=s.TEXTURE0+K-1:q=dt);let Q=_t[q];Q===void 0&&(Q={type:void 0,texture:void 0},_t[q]=Q),(Q.type!==N||Q.texture!==ct)&&(dt!==q&&(s.activeTexture(q),dt=q),s.bindTexture(N,ct||St[N]),Q.type=N,Q.texture=ct)}function H(){const N=_t[dt];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function J(){try{s.compressedTexImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function et(){try{s.compressedTexImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{s.texSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Tt(){try{s.texSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ot(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function vt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Qt(){try{s.texStorage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{s.texStorage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xt(){try{s.texImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Lt(){try{s.texImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ft(N){re.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),re.copy(N))}function bt(N){Z.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),Z.copy(N))}function Yt(N,ct){let q=c.get(ct);q===void 0&&(q=new WeakMap,c.set(ct,q));let Q=q.get(N);Q===void 0&&(Q=s.getUniformBlockIndex(ct,N.name),q.set(N,Q))}function Gt(N,ct){const Q=c.get(ct).get(N);l.get(ct)!==Q&&(s.uniformBlockBinding(ct,Q,N.__bindingPointIndex),l.set(ct,Q))}function se(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},dt=null,_t={},d={},f=new WeakMap,p=[],g=null,x=!1,m=null,u=null,S=null,w=null,_=null,y=null,M=null,R=new Ot(0,0,0),A=0,b=!1,v=null,C=null,U=null,I=null,V=null,re.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ut,disable:Nt,bindFramebuffer:Vt,drawBuffers:Jt,useProgram:Wt,setBlending:B,setMaterial:Ae,setFlipSided:ee,setCullFace:ne,setLineWidth:Ct,setPolygonOffset:oe,setScissorTest:It,activeTexture:L,bindTexture:E,unbindTexture:H,compressedTexImage2D:J,compressedTexImage3D:et,texImage2D:xt,texImage3D:Lt,updateUBOMapping:Yt,uniformBlockBinding:Gt,texStorage2D:Qt,texStorage3D:nt,texSubImage2D:j,texSubImage3D:Tt,compressedTexSubImage2D:ot,compressedTexSubImage3D:vt,scissor:Ft,viewport:bt,reset:se}}function ql(s,t,e,n){const i=A0(n);switch(e){case kc:return s*t;case Fc:return s*t;case Oc:return s*t*2;case Bc:return s*t/i.components*i.byteLength;case Do:return s*t/i.components*i.byteLength;case zc:return s*t*2/i.components*i.byteLength;case Io:return s*t*2/i.components*i.byteLength;case Nc:return s*t*3/i.components*i.byteLength;case xn:return s*t*4/i.components*i.byteLength;case ko:return s*t*4/i.components*i.byteLength;case pr:case mr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case gr:case _r:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case qa:case Ya:return Math.max(s,16)*Math.max(t,8)/4;case Xa:case $a:return Math.max(s,8)*Math.max(t,8)/2;case ja:case Za:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ka:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ja:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Qa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case to:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case eo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case no:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case io:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case so:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ro:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case ao:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case oo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case lo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case co:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case ho:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case uo:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case xr:case fo:case po:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Hc:case mo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case go:case _o:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function A0(s){switch(s){case Bn:case Uc:return{byteLength:1,components:1};case ws:case Dc:case Es:return{byteLength:2,components:1};case Po:case Uo:return{byteLength:2,components:4};case xi:case Lo:case Nn:return{byteLength:4,components:1};case Ic:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function R0(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ht,h=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,E){return p?new OffscreenCanvas(L,E):ys("canvas")}function x(L,E,H){let J=1;const et=It(L);if((et.width>H||et.height>H)&&(J=H/Math.max(et.width,et.height)),J<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const j=Math.floor(J*et.width),Tt=Math.floor(J*et.height);d===void 0&&(d=g(j,Tt));const ot=E?g(j,Tt):d;return ot.width=j,ot.height=Tt,ot.getContext("2d").drawImage(L,0,0,j,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+j+"x"+Tt+")."),ot}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),L;return L}function m(L){return L.generateMipmaps}function u(L){s.generateMipmap(L)}function S(L){return L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?s.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function w(L,E,H,J,et=!1){if(L!==null){if(s[L]!==void 0)return s[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let j=E;if(E===s.RED&&(H===s.FLOAT&&(j=s.R32F),H===s.HALF_FLOAT&&(j=s.R16F),H===s.UNSIGNED_BYTE&&(j=s.R8)),E===s.RED_INTEGER&&(H===s.UNSIGNED_BYTE&&(j=s.R8UI),H===s.UNSIGNED_SHORT&&(j=s.R16UI),H===s.UNSIGNED_INT&&(j=s.R32UI),H===s.BYTE&&(j=s.R8I),H===s.SHORT&&(j=s.R16I),H===s.INT&&(j=s.R32I)),E===s.RG&&(H===s.FLOAT&&(j=s.RG32F),H===s.HALF_FLOAT&&(j=s.RG16F),H===s.UNSIGNED_BYTE&&(j=s.RG8)),E===s.RG_INTEGER&&(H===s.UNSIGNED_BYTE&&(j=s.RG8UI),H===s.UNSIGNED_SHORT&&(j=s.RG16UI),H===s.UNSIGNED_INT&&(j=s.RG32UI),H===s.BYTE&&(j=s.RG8I),H===s.SHORT&&(j=s.RG16I),H===s.INT&&(j=s.RG32I)),E===s.RGB_INTEGER&&(H===s.UNSIGNED_BYTE&&(j=s.RGB8UI),H===s.UNSIGNED_SHORT&&(j=s.RGB16UI),H===s.UNSIGNED_INT&&(j=s.RGB32UI),H===s.BYTE&&(j=s.RGB8I),H===s.SHORT&&(j=s.RGB16I),H===s.INT&&(j=s.RGB32I)),E===s.RGBA_INTEGER&&(H===s.UNSIGNED_BYTE&&(j=s.RGBA8UI),H===s.UNSIGNED_SHORT&&(j=s.RGBA16UI),H===s.UNSIGNED_INT&&(j=s.RGBA32UI),H===s.BYTE&&(j=s.RGBA8I),H===s.SHORT&&(j=s.RGBA16I),H===s.INT&&(j=s.RGBA32I)),E===s.RGB&&H===s.UNSIGNED_INT_5_9_9_9_REV&&(j=s.RGB9_E5),E===s.RGBA){const Tt=et?Ur:ae.getTransfer(J);H===s.FLOAT&&(j=s.RGBA32F),H===s.HALF_FLOAT&&(j=s.RGBA16F),H===s.UNSIGNED_BYTE&&(j=Tt===ue?s.SRGB8_ALPHA8:s.RGBA8),H===s.UNSIGNED_SHORT_4_4_4_4&&(j=s.RGBA4),H===s.UNSIGNED_SHORT_5_5_5_1&&(j=s.RGB5_A1)}return(j===s.R16F||j===s.R32F||j===s.RG16F||j===s.RG32F||j===s.RGBA16F||j===s.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function _(L,E){let H;return L?E===null||E===xi||E===Zi?H=s.DEPTH24_STENCIL8:E===Nn?H=s.DEPTH32F_STENCIL8:E===ws&&(H=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===xi||E===Zi?H=s.DEPTH_COMPONENT24:E===Nn?H=s.DEPTH_COMPONENT32F:E===ws&&(H=s.DEPTH_COMPONENT16),H}function y(L,E){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==vn&&L.minFilter!==He?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function M(L){const E=L.target;E.removeEventListener("dispose",M),A(E),E.isVideoTexture&&h.delete(E)}function R(L){const E=L.target;E.removeEventListener("dispose",R),v(E)}function A(L){const E=n.get(L);if(E.__webglInit===void 0)return;const H=L.source,J=f.get(H);if(J){const et=J[E.__cacheKey];et.usedTimes--,et.usedTimes===0&&b(L),Object.keys(J).length===0&&f.delete(H)}n.remove(L)}function b(L){const E=n.get(L);s.deleteTexture(E.__webglTexture);const H=L.source,J=f.get(H);delete J[E.__cacheKey],o.memory.textures--}function v(L){const E=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let et=0;et<E.__webglFramebuffer[J].length;et++)s.deleteFramebuffer(E.__webglFramebuffer[J][et]);else s.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)s.deleteFramebuffer(E.__webglFramebuffer[J]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const H=L.textures;for(let J=0,et=H.length;J<et;J++){const j=n.get(H[J]);j.__webglTexture&&(s.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(H[J])}n.remove(L)}let C=0;function U(){C=0}function I(){const L=C;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),C+=1,L}function V(L){const E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.colorSpace),E.join()}function K(L,E){const H=n.get(L);if(L.isVideoTexture&&Ct(L),L.isRenderTargetTexture===!1&&L.version>0&&H.__version!==L.version){const J=L.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(H,L,E);return}}e.bindTexture(s.TEXTURE_2D,H.__webglTexture,s.TEXTURE0+E)}function X(L,E){const H=n.get(L);if(L.version>0&&H.__version!==L.version){Z(H,L,E);return}e.bindTexture(s.TEXTURE_2D_ARRAY,H.__webglTexture,s.TEXTURE0+E)}function it(L,E){const H=n.get(L);if(L.version>0&&H.__version!==L.version){Z(H,L,E);return}e.bindTexture(s.TEXTURE_3D,H.__webglTexture,s.TEXTURE0+E)}function $(L,E){const H=n.get(L);if(L.version>0&&H.__version!==L.version){st(H,L,E);return}e.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture,s.TEXTURE0+E)}const dt={[kn]:s.REPEAT,[gn]:s.CLAMP_TO_EDGE,[Wa]:s.MIRRORED_REPEAT},_t={[vn]:s.NEAREST,[pu]:s.NEAREST_MIPMAP_NEAREST,[Ds]:s.NEAREST_MIPMAP_LINEAR,[He]:s.LINEAR,[Nr]:s.LINEAR_MIPMAP_NEAREST,[_n]:s.LINEAR_MIPMAP_LINEAR},Pt={[xu]:s.NEVER,[Su]:s.ALWAYS,[vu]:s.LESS,[Gc]:s.LEQUAL,[bu]:s.EQUAL,[yu]:s.GEQUAL,[Mu]:s.GREATER,[wu]:s.NOTEQUAL};function qt(L,E){if(E.type===Nn&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===He||E.magFilter===Nr||E.magFilter===Ds||E.magFilter===_n||E.minFilter===He||E.minFilter===Nr||E.minFilter===Ds||E.minFilter===_n)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(L,s.TEXTURE_WRAP_S,dt[E.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,dt[E.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,dt[E.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,_t[E.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,_t[E.minFilter]),E.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,Pt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===vn||E.minFilter!==Ds&&E.minFilter!==_n||E.type===Nn&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");s.texParameterf(L,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function re(L,E){let H=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",M));const J=E.source;let et=f.get(J);et===void 0&&(et={},f.set(J,et));const j=V(E);if(j!==L.__cacheKey){et[j]===void 0&&(et[j]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,H=!0),et[j].usedTimes++;const Tt=et[L.__cacheKey];Tt!==void 0&&(et[L.__cacheKey].usedTimes--,Tt.usedTimes===0&&b(E)),L.__cacheKey=j,L.__webglTexture=et[j].texture}return H}function Z(L,E,H){let J=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(J=s.TEXTURE_3D);const et=re(L,E),j=E.source;e.bindTexture(J,L.__webglTexture,s.TEXTURE0+H);const Tt=n.get(j);if(j.version!==Tt.__version||et===!0){e.activeTexture(s.TEXTURE0+H);const ot=ae.getPrimaries(ae.workingColorSpace),vt=E.colorSpace===Zn?null:ae.getPrimaries(E.colorSpace),Qt=E.colorSpace===Zn||ot===vt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qt);let nt=x(E.image,!1,i.maxTextureSize);nt=oe(E,nt);const xt=r.convert(E.format,E.colorSpace),Lt=r.convert(E.type);let Ft=w(E.internalFormat,xt,Lt,E.colorSpace,E.isVideoTexture);qt(J,E);let bt;const Yt=E.mipmaps,Gt=E.isVideoTexture!==!0,se=Tt.__version===void 0||et===!0,N=j.dataReady,ct=y(E,nt);if(E.isDepthTexture)Ft=_(E.format===Ki,E.type),se&&(Gt?e.texStorage2D(s.TEXTURE_2D,1,Ft,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,Ft,nt.width,nt.height,0,xt,Lt,null));else if(E.isDataTexture)if(Yt.length>0){Gt&&se&&e.texStorage2D(s.TEXTURE_2D,ct,Ft,Yt[0].width,Yt[0].height);for(let q=0,Q=Yt.length;q<Q;q++)bt=Yt[q],Gt?N&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,bt.width,bt.height,xt,Lt,bt.data):e.texImage2D(s.TEXTURE_2D,q,Ft,bt.width,bt.height,0,xt,Lt,bt.data);E.generateMipmaps=!1}else Gt?(se&&e.texStorage2D(s.TEXTURE_2D,ct,Ft,nt.width,nt.height),N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,nt.width,nt.height,xt,Lt,nt.data)):e.texImage2D(s.TEXTURE_2D,0,Ft,nt.width,nt.height,0,xt,Lt,nt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Gt&&se&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ct,Ft,Yt[0].width,Yt[0].height,nt.depth);for(let q=0,Q=Yt.length;q<Q;q++)if(bt=Yt[q],E.format!==xn)if(xt!==null)if(Gt){if(N)if(E.layerUpdates.size>0){const pt=ql(bt.width,bt.height,E.format,E.type);for(const ft of E.layerUpdates){const Xt=bt.data.subarray(ft*pt/bt.data.BYTES_PER_ELEMENT,(ft+1)*pt/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,ft,bt.width,bt.height,1,xt,Xt)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,bt.width,bt.height,nt.depth,xt,bt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,q,Ft,bt.width,bt.height,nt.depth,0,bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?N&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,bt.width,bt.height,nt.depth,xt,Lt,bt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,q,Ft,bt.width,bt.height,nt.depth,0,xt,Lt,bt.data)}else{Gt&&se&&e.texStorage2D(s.TEXTURE_2D,ct,Ft,Yt[0].width,Yt[0].height);for(let q=0,Q=Yt.length;q<Q;q++)bt=Yt[q],E.format!==xn?xt!==null?Gt?N&&e.compressedTexSubImage2D(s.TEXTURE_2D,q,0,0,bt.width,bt.height,xt,bt.data):e.compressedTexImage2D(s.TEXTURE_2D,q,Ft,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?N&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,bt.width,bt.height,xt,Lt,bt.data):e.texImage2D(s.TEXTURE_2D,q,Ft,bt.width,bt.height,0,xt,Lt,bt.data)}else if(E.isDataArrayTexture)if(Gt){if(se&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ct,Ft,nt.width,nt.height,nt.depth),N)if(E.layerUpdates.size>0){const q=ql(nt.width,nt.height,E.format,E.type);for(const Q of E.layerUpdates){const pt=nt.data.subarray(Q*q/nt.data.BYTES_PER_ELEMENT,(Q+1)*q/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Q,nt.width,nt.height,1,xt,Lt,pt)}E.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,xt,Lt,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ft,nt.width,nt.height,nt.depth,0,xt,Lt,nt.data);else if(E.isData3DTexture)Gt?(se&&e.texStorage3D(s.TEXTURE_3D,ct,Ft,nt.width,nt.height,nt.depth),N&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,xt,Lt,nt.data)):e.texImage3D(s.TEXTURE_3D,0,Ft,nt.width,nt.height,nt.depth,0,xt,Lt,nt.data);else if(E.isFramebufferTexture){if(se)if(Gt)e.texStorage2D(s.TEXTURE_2D,ct,Ft,nt.width,nt.height);else{let q=nt.width,Q=nt.height;for(let pt=0;pt<ct;pt++)e.texImage2D(s.TEXTURE_2D,pt,Ft,q,Q,0,xt,Lt,null),q>>=1,Q>>=1}}else if(Yt.length>0){if(Gt&&se){const q=It(Yt[0]);e.texStorage2D(s.TEXTURE_2D,ct,Ft,q.width,q.height)}for(let q=0,Q=Yt.length;q<Q;q++)bt=Yt[q],Gt?N&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,xt,Lt,bt):e.texImage2D(s.TEXTURE_2D,q,Ft,xt,Lt,bt);E.generateMipmaps=!1}else if(Gt){if(se){const q=It(nt);e.texStorage2D(s.TEXTURE_2D,ct,Ft,q.width,q.height)}N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,xt,Lt,nt)}else e.texImage2D(s.TEXTURE_2D,0,Ft,xt,Lt,nt);m(E)&&u(J),Tt.__version=j.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function st(L,E,H){if(E.image.length!==6)return;const J=re(L,E),et=E.source;e.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+H);const j=n.get(et);if(et.version!==j.__version||J===!0){e.activeTexture(s.TEXTURE0+H);const Tt=ae.getPrimaries(ae.workingColorSpace),ot=E.colorSpace===Zn?null:ae.getPrimaries(E.colorSpace),vt=E.colorSpace===Zn||Tt===ot?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const Qt=E.isCompressedTexture||E.image[0].isCompressedTexture,nt=E.image[0]&&E.image[0].isDataTexture,xt=[];for(let Q=0;Q<6;Q++)!Qt&&!nt?xt[Q]=x(E.image[Q],!0,i.maxCubemapSize):xt[Q]=nt?E.image[Q].image:E.image[Q],xt[Q]=oe(E,xt[Q]);const Lt=xt[0],Ft=r.convert(E.format,E.colorSpace),bt=r.convert(E.type),Yt=w(E.internalFormat,Ft,bt,E.colorSpace),Gt=E.isVideoTexture!==!0,se=j.__version===void 0||J===!0,N=et.dataReady;let ct=y(E,Lt);qt(s.TEXTURE_CUBE_MAP,E);let q;if(Qt){Gt&&se&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,Yt,Lt.width,Lt.height);for(let Q=0;Q<6;Q++){q=xt[Q].mipmaps;for(let pt=0;pt<q.length;pt++){const ft=q[pt];E.format!==xn?Ft!==null?Gt?N&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,0,0,ft.width,ft.height,Ft,ft.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,Yt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Gt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,0,0,ft.width,ft.height,Ft,bt,ft.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,Yt,ft.width,ft.height,0,Ft,bt,ft.data)}}}else{if(q=E.mipmaps,Gt&&se){q.length>0&&ct++;const Q=It(xt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,Yt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(nt){Gt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,xt[Q].width,xt[Q].height,Ft,bt,xt[Q].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Yt,xt[Q].width,xt[Q].height,0,Ft,bt,xt[Q].data);for(let pt=0;pt<q.length;pt++){const Xt=q[pt].image[Q].image;Gt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,0,0,Xt.width,Xt.height,Ft,bt,Xt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,Yt,Xt.width,Xt.height,0,Ft,bt,Xt.data)}}else{Gt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ft,bt,xt[Q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Yt,Ft,bt,xt[Q]);for(let pt=0;pt<q.length;pt++){const ft=q[pt];Gt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,0,0,Ft,bt,ft.image[Q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,Yt,Ft,bt,ft.image[Q])}}}m(E)&&u(s.TEXTURE_CUBE_MAP),j.__version=et.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function St(L,E,H,J,et,j){const Tt=r.convert(H.format,H.colorSpace),ot=r.convert(H.type),vt=w(H.internalFormat,Tt,ot,H.colorSpace),Qt=n.get(E),nt=n.get(H);if(nt.__renderTarget=E,!Qt.__hasExternalTextures){const xt=Math.max(1,E.width>>j),Lt=Math.max(1,E.height>>j);et===s.TEXTURE_3D||et===s.TEXTURE_2D_ARRAY?e.texImage3D(et,j,vt,xt,Lt,E.depth,0,Tt,ot,null):e.texImage2D(et,j,vt,xt,Lt,0,Tt,ot,null)}e.bindFramebuffer(s.FRAMEBUFFER,L),ne(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,et,nt.__webglTexture,0,ee(E)):(et===s.TEXTURE_2D||et>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,et,nt.__webglTexture,j),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ut(L,E,H){if(s.bindRenderbuffer(s.RENDERBUFFER,L),E.depthBuffer){const J=E.depthTexture,et=J&&J.isDepthTexture?J.type:null,j=_(E.stencilBuffer,et),Tt=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ot=ee(E);ne(E)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ot,j,E.width,E.height):H?s.renderbufferStorageMultisample(s.RENDERBUFFER,ot,j,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,j,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Tt,s.RENDERBUFFER,L)}else{const J=E.textures;for(let et=0;et<J.length;et++){const j=J[et],Tt=r.convert(j.format,j.colorSpace),ot=r.convert(j.type),vt=w(j.internalFormat,Tt,ot,j.colorSpace),Qt=ee(E);H&&ne(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Qt,vt,E.width,E.height):ne(E)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Qt,vt,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,vt,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Nt(L,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(E.depthTexture);J.__renderTarget=E,(!J.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),K(E.depthTexture,0);const et=J.__webglTexture,j=ee(E);if(E.depthTexture.format===Xi)ne(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,et,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,et,0);else if(E.depthTexture.format===Ki)ne(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,et,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function Vt(L){const E=n.get(L),H=L.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==L.depthTexture){const J=L.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),J){const et=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,J.removeEventListener("dispose",et)};J.addEventListener("dispose",et),E.__depthDisposeCallback=et}E.__boundDepthTexture=J}if(L.depthTexture&&!E.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Nt(E.__webglFramebuffer,L)}else if(H){E.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[J]),E.__webglDepthbuffer[J]===void 0)E.__webglDepthbuffer[J]=s.createRenderbuffer(),ut(E.__webglDepthbuffer[J],L,!1);else{const et=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,j=E.__webglDepthbuffer[J];s.bindRenderbuffer(s.RENDERBUFFER,j),s.framebufferRenderbuffer(s.FRAMEBUFFER,et,s.RENDERBUFFER,j)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),ut(E.__webglDepthbuffer,L,!1);else{const J=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,et=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,et),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,et)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Jt(L,E,H){const J=n.get(L);E!==void 0&&St(J.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),H!==void 0&&Vt(L)}function Wt(L){const E=L.texture,H=n.get(L),J=n.get(E);L.addEventListener("dispose",R);const et=L.textures,j=L.isWebGLCubeRenderTarget===!0,Tt=et.length>1;if(Tt||(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=E.version,o.memory.textures++),j){H.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer[ot]=[];for(let vt=0;vt<E.mipmaps.length;vt++)H.__webglFramebuffer[ot][vt]=s.createFramebuffer()}else H.__webglFramebuffer[ot]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer=[];for(let ot=0;ot<E.mipmaps.length;ot++)H.__webglFramebuffer[ot]=s.createFramebuffer()}else H.__webglFramebuffer=s.createFramebuffer();if(Tt)for(let ot=0,vt=et.length;ot<vt;ot++){const Qt=n.get(et[ot]);Qt.__webglTexture===void 0&&(Qt.__webglTexture=s.createTexture(),o.memory.textures++)}if(L.samples>0&&ne(L)===!1){H.__webglMultisampledFramebuffer=s.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ot=0;ot<et.length;ot++){const vt=et[ot];H.__webglColorRenderbuffer[ot]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,H.__webglColorRenderbuffer[ot]);const Qt=r.convert(vt.format,vt.colorSpace),nt=r.convert(vt.type),xt=w(vt.internalFormat,Qt,nt,vt.colorSpace,L.isXRRenderTarget===!0),Lt=ee(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,Lt,xt,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.RENDERBUFFER,H.__webglColorRenderbuffer[ot])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&(H.__webglDepthRenderbuffer=s.createRenderbuffer(),ut(H.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(j){e.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),qt(s.TEXTURE_CUBE_MAP,E);for(let ot=0;ot<6;ot++)if(E.mipmaps&&E.mipmaps.length>0)for(let vt=0;vt<E.mipmaps.length;vt++)St(H.__webglFramebuffer[ot][vt],L,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,vt);else St(H.__webglFramebuffer[ot],L,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(E)&&u(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let ot=0,vt=et.length;ot<vt;ot++){const Qt=et[ot],nt=n.get(Qt);e.bindTexture(s.TEXTURE_2D,nt.__webglTexture),qt(s.TEXTURE_2D,Qt),St(H.__webglFramebuffer,L,Qt,s.COLOR_ATTACHMENT0+ot,s.TEXTURE_2D,0),m(Qt)&&u(s.TEXTURE_2D)}e.unbindTexture()}else{let ot=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ot=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ot,J.__webglTexture),qt(ot,E),E.mipmaps&&E.mipmaps.length>0)for(let vt=0;vt<E.mipmaps.length;vt++)St(H.__webglFramebuffer[vt],L,E,s.COLOR_ATTACHMENT0,ot,vt);else St(H.__webglFramebuffer,L,E,s.COLOR_ATTACHMENT0,ot,0);m(E)&&u(ot),e.unbindTexture()}L.depthBuffer&&Vt(L)}function ie(L){const E=L.textures;for(let H=0,J=E.length;H<J;H++){const et=E[H];if(m(et)){const j=S(L),Tt=n.get(et).__webglTexture;e.bindTexture(j,Tt),u(j),e.unbindTexture()}}}const be=[],B=[];function Ae(L){if(L.samples>0){if(ne(L)===!1){const E=L.textures,H=L.width,J=L.height;let et=s.COLOR_BUFFER_BIT;const j=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Tt=n.get(L),ot=E.length>1;if(ot)for(let vt=0;vt<E.length;vt++)e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let vt=0;vt<E.length;vt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(et|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(et|=s.STENCIL_BUFFER_BIT)),ot){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);const Qt=n.get(E[vt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Qt,0)}s.blitFramebuffer(0,0,H,J,0,0,H,J,et,s.NEAREST),l===!0&&(be.length=0,B.length=0,be.push(s.COLOR_ATTACHMENT0+vt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(be.push(j),B.push(j),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,B)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,be))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ot)for(let vt=0;vt<E.length;vt++){e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);const Qt=n.get(E[vt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,Qt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const E=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function ee(L){return Math.min(i.maxSamples,L.samples)}function ne(L){const E=n.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ct(L){const E=o.render.frame;h.get(L)!==E&&(h.set(L,E),L.update())}function oe(L,E){const H=L.colorSpace,J=L.format,et=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||H!==ts&&H!==Zn&&(ae.getTransfer(H)===ue?(J!==xn||et!==Bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),E}function It(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=U,this.setTexture2D=K,this.setTexture2DArray=X,this.setTexture3D=it,this.setTextureCube=$,this.rebindTextures=Jt,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=St,this.useMultisampledRTT=ne}function C0(s,t){function e(n,i=Zn){let r;const o=ae.getTransfer(i);if(n===Bn)return s.UNSIGNED_BYTE;if(n===Po)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Uo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ic)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Uc)return s.BYTE;if(n===Dc)return s.SHORT;if(n===ws)return s.UNSIGNED_SHORT;if(n===Lo)return s.INT;if(n===xi)return s.UNSIGNED_INT;if(n===Nn)return s.FLOAT;if(n===Es)return s.HALF_FLOAT;if(n===kc)return s.ALPHA;if(n===Nc)return s.RGB;if(n===xn)return s.RGBA;if(n===Fc)return s.LUMINANCE;if(n===Oc)return s.LUMINANCE_ALPHA;if(n===Xi)return s.DEPTH_COMPONENT;if(n===Ki)return s.DEPTH_STENCIL;if(n===Bc)return s.RED;if(n===Do)return s.RED_INTEGER;if(n===zc)return s.RG;if(n===Io)return s.RG_INTEGER;if(n===ko)return s.RGBA_INTEGER;if(n===pr||n===mr||n===gr||n===_r)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===pr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===pr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===gr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xa||n===qa||n===$a||n===Ya)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Xa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$a)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ya)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ja||n===Za||n===Ka)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ja||n===Za)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ka)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ja||n===Qa||n===to||n===eo||n===no||n===io||n===so||n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ja)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===to)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===eo)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===no)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===io)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===so)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ro)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ao)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===oo)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===lo)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===co)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ho)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===uo)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xr||n===fo||n===po)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===xr)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===po)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Hc||n===mo||n===go||n===_o)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===xr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===mo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===go)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===_o)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class L0 extends sn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ze extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}}const P0={type:"move"};class da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),u=this._getHandJoint(c,x);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(P0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ze;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const U0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,D0=`
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

}`;class I0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ge,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ei({vertexShader:U0,fragmentShader:D0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new tt(new Bt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class k0 extends es{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,f=null,p=null,g=null;const x=new I0,m=e.getContextAttributes();let u=null,S=null;const w=[],_=[],y=new Ht;let M=null;const R=new sn;R.viewport=new pe;const A=new sn;A.viewport=new pe;const b=[R,A],v=new L0;let C=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let st=w[Z];return st===void 0&&(st=new da,w[Z]=st),st.getTargetRaySpace()},this.getControllerGrip=function(Z){let st=w[Z];return st===void 0&&(st=new da,w[Z]=st),st.getGripSpace()},this.getHand=function(Z){let st=w[Z];return st===void 0&&(st=new da,w[Z]=st),st.getHandSpace()};function I(Z){const st=_.indexOf(Z.inputSource);if(st===-1)return;const St=w[st];St!==void 0&&(St.update(Z.inputSource,Z.frame,c||o),St.dispatchEvent({type:Z.type,data:Z.inputSource}))}function V(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",K);for(let Z=0;Z<w.length;Z++){const st=_[Z];st!==null&&(_[Z]=null,w[Z].disconnect(st))}C=null,U=null,x.reset(),t.setRenderTarget(u),p=null,f=null,d=null,i=null,S=null,re.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(y.width,y.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(u=t.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",V),i.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(y),i.renderState.layers===void 0){const st={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,st),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new vi(p.framebufferWidth,p.framebufferHeight,{format:xn,type:Bn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let st=null,St=null,ut=null;m.depth&&(ut=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=m.stencil?Ki:Xi,St=m.stencil?Zi:xi);const Nt={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:r};d=new XRWebGLBinding(i,e),f=d.createProjectionLayer(Nt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),S=new vi(f.textureWidth,f.textureHeight,{format:xn,type:Bn,depthTexture:new eh(f.textureWidth,f.textureHeight,St,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),re.setContext(i),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function K(Z){for(let st=0;st<Z.removed.length;st++){const St=Z.removed[st],ut=_.indexOf(St);ut>=0&&(_[ut]=null,w[ut].disconnect(St))}for(let st=0;st<Z.added.length;st++){const St=Z.added[st];let ut=_.indexOf(St);if(ut===-1){for(let Vt=0;Vt<w.length;Vt++)if(Vt>=_.length){_.push(St),ut=Vt;break}else if(_[Vt]===null){_[Vt]=St,ut=Vt;break}if(ut===-1)break}const Nt=w[ut];Nt&&Nt.connect(St)}}const X=new F,it=new F;function $(Z,st,St){X.setFromMatrixPosition(st.matrixWorld),it.setFromMatrixPosition(St.matrixWorld);const ut=X.distanceTo(it),Nt=st.projectionMatrix.elements,Vt=St.projectionMatrix.elements,Jt=Nt[14]/(Nt[10]-1),Wt=Nt[14]/(Nt[10]+1),ie=(Nt[9]+1)/Nt[5],be=(Nt[9]-1)/Nt[5],B=(Nt[8]-1)/Nt[0],Ae=(Vt[8]+1)/Vt[0],ee=Jt*B,ne=Jt*Ae,Ct=ut/(-B+Ae),oe=Ct*-B;if(st.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(oe),Z.translateZ(Ct),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Nt[10]===-1)Z.projectionMatrix.copy(st.projectionMatrix),Z.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const It=Jt+Ct,L=Wt+Ct,E=ee-oe,H=ne+(ut-oe),J=ie*Wt/L*It,et=be*Wt/L*It;Z.projectionMatrix.makePerspective(E,H,J,et,It,L),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function dt(Z,st){st===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(st.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let st=Z.near,St=Z.far;x.texture!==null&&(x.depthNear>0&&(st=x.depthNear),x.depthFar>0&&(St=x.depthFar)),v.near=A.near=R.near=st,v.far=A.far=R.far=St,(C!==v.near||U!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),C=v.near,U=v.far),R.layers.mask=Z.layers.mask|2,A.layers.mask=Z.layers.mask|4,v.layers.mask=R.layers.mask|A.layers.mask;const ut=Z.parent,Nt=v.cameras;dt(v,ut);for(let Vt=0;Vt<Nt.length;Vt++)dt(Nt[Vt],ut);Nt.length===2?$(v,R,A):v.projectionMatrix.copy(R.projectionMatrix),_t(Z,v,ut)};function _t(Z,st,St){St===null?Z.matrix.copy(st.matrixWorld):(Z.matrix.copy(St.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(st.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(st.projectionMatrix),Z.projectionMatrixInverse.copy(st.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=vo*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(v)};let Pt=null;function qt(Z,st){if(h=st.getViewerPose(c||o),g=st,h!==null){const St=h.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let ut=!1;St.length!==v.cameras.length&&(v.cameras.length=0,ut=!0);for(let Vt=0;Vt<St.length;Vt++){const Jt=St[Vt];let Wt=null;if(p!==null)Wt=p.getViewport(Jt);else{const be=d.getViewSubImage(f,Jt);Wt=be.viewport,Vt===0&&(t.setRenderTargetTextures(S,be.colorTexture,f.ignoreDepthValues?void 0:be.depthStencilTexture),t.setRenderTarget(S))}let ie=b[Vt];ie===void 0&&(ie=new sn,ie.layers.enable(Vt),ie.viewport=new pe,b[Vt]=ie),ie.matrix.fromArray(Jt.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(Jt.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(Wt.x,Wt.y,Wt.width,Wt.height),Vt===0&&(v.matrix.copy(ie.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ut===!0&&v.cameras.push(ie)}const Nt=i.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")){const Vt=d.getDepthInformation(St[0]);Vt&&Vt.isValid&&Vt.texture&&x.init(t,Vt,i.renderState)}}for(let St=0;St<w.length;St++){const ut=_[St],Nt=w[St];ut!==null&&Nt!==void 0&&Nt.update(ut,st,c||o)}Pt&&Pt(Z,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),g=null}const re=new Qc;re.setAnimationLoop(qt),this.setAnimationLoop=function(Z){Pt=Z},this.dispose=function(){}}}const li=new bn,N0=new ve;function F0(s,t){function e(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,Zc(s)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function i(m,u,S,w,_){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),d(m,u)):u.isMeshPhongMaterial?(r(m,u),h(m,u)):u.isMeshStandardMaterial?(r(m,u),f(m,u),u.isMeshPhysicalMaterial&&p(m,u,_)):u.isMeshMatcapMaterial?(r(m,u),g(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),x(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,S,w):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,e(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,e(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,e(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Ye&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,e(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Ye&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,e(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,e(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const S=t.get(u),w=S.envMap,_=S.envMapRotation;w&&(m.envMap.value=w,li.copy(_),li.x*=-1,li.y*=-1,li.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),m.envMapRotation.value.setFromMatrix4(N0.makeRotationFromEuler(li)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,e(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,S,w){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*S,m.scale.value=w*.5,u.map&&(m.map.value=u.map,e(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,e(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,e(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,e(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function h(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,S){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ye&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function x(m,u){const S=t.get(u).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function O0(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,w){const _=w.program;n.uniformBlockBinding(S,_)}function c(S,w){let _=i[S.id];_===void 0&&(g(S),_=h(S),i[S.id]=_,S.addEventListener("dispose",m));const y=w.program;n.updateUBOMapping(S,y);const M=t.render.frame;r[S.id]!==M&&(f(S),r[S.id]=M)}function h(S){const w=d();S.__bindingPointIndex=w;const _=s.createBuffer(),y=S.__size,M=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,y,M),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,_),_}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const w=i[S.id],_=S.uniforms,y=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let M=0,R=_.length;M<R;M++){const A=Array.isArray(_[M])?_[M]:[_[M]];for(let b=0,v=A.length;b<v;b++){const C=A[b];if(p(C,M,b,y)===!0){const U=C.__offset,I=Array.isArray(C.value)?C.value:[C.value];let V=0;for(let K=0;K<I.length;K++){const X=I[K],it=x(X);typeof X=="number"||typeof X=="boolean"?(C.__data[0]=X,s.bufferSubData(s.UNIFORM_BUFFER,U+V,C.__data)):X.isMatrix3?(C.__data[0]=X.elements[0],C.__data[1]=X.elements[1],C.__data[2]=X.elements[2],C.__data[3]=0,C.__data[4]=X.elements[3],C.__data[5]=X.elements[4],C.__data[6]=X.elements[5],C.__data[7]=0,C.__data[8]=X.elements[6],C.__data[9]=X.elements[7],C.__data[10]=X.elements[8],C.__data[11]=0):(X.toArray(C.__data,V),V+=it.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,U,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(S,w,_,y){const M=S.value,R=w+"_"+_;if(y[R]===void 0)return typeof M=="number"||typeof M=="boolean"?y[R]=M:y[R]=M.clone(),!0;{const A=y[R];if(typeof M=="number"||typeof M=="boolean"){if(A!==M)return y[R]=M,!0}else if(A.equals(M)===!1)return A.copy(M),!0}return!1}function g(S){const w=S.uniforms;let _=0;const y=16;for(let R=0,A=w.length;R<A;R++){const b=Array.isArray(w[R])?w[R]:[w[R]];for(let v=0,C=b.length;v<C;v++){const U=b[v],I=Array.isArray(U.value)?U.value:[U.value];for(let V=0,K=I.length;V<K;V++){const X=I[V],it=x(X),$=_%y,dt=$%it.boundary,_t=$+dt;_+=dt,_t!==0&&y-_t<it.storage&&(_+=y-_t),U.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=_,_+=it.storage}}}const M=_%y;return M>0&&(_+=y-M),S.__size=_,S.__cache={},this}function x(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),w}function m(S){const w=S.target;w.removeEventListener("dispose",m);const _=o.indexOf(w.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function u(){for(const S in i)s.deleteBuffer(i[S]);o=[],i={},r={}}return{bind:l,update:c,dispose:u}}class B0{constructor(t={}){const{canvas:e=Eu(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,u=null;const S=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Le,this.toneMapping=Jn,this.toneMappingExposure=1;const _=this;let y=!1,M=0,R=0,A=null,b=-1,v=null;const C=new pe,U=new pe;let I=null;const V=new Ot(0);let K=0,X=e.width,it=e.height,$=1,dt=null,_t=null;const Pt=new pe(0,0,X,it),qt=new pe(0,0,X,it);let re=!1;const Z=new Bo;let st=!1,St=!1;const ut=new ve,Nt=new ve,Vt=new F,Jt=new pe,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ie=!1;function be(){return A===null?$:1}let B=n;function Ae(T,D){return e.getContext(T,D)}try{const T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Co}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",ft,!1),B===null){const D="webgl2";if(B=Ae(D,T),B===null)throw Ae(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ee,ne,Ct,oe,It,L,E,H,J,et,j,Tt,ot,vt,Qt,nt,xt,Lt,Ft,bt,Yt,Gt,se,N;function ct(){ee=new Wm(B),ee.init(),Gt=new C0(B,ee),ne=new Om(B,ee,t,Gt),Ct=new E0(B,ee),ne.reverseDepthBuffer&&f&&Ct.buffers.depth.setReversed(!0),oe=new $m(B),It=new d0,L=new R0(B,ee,Ct,It,ne,Gt,oe),E=new zm(_),H=new Vm(_),J=new Qu(B),se=new Nm(B,J),et=new Xm(B,J,oe,se),j=new jm(B,et,J,oe),Ft=new Ym(B,ne,L),nt=new Bm(It),Tt=new h0(_,E,H,ee,ne,se,nt),ot=new F0(_,It),vt=new f0,Qt=new v0(ee),Lt=new km(_,E,H,Ct,j,p,l),xt=new S0(_,j,ne),N=new O0(B,oe,ne,Ct),bt=new Fm(B,ee,oe),Yt=new qm(B,ee,oe),oe.programs=Tt.programs,_.capabilities=ne,_.extensions=ee,_.properties=It,_.renderLists=vt,_.shadowMap=xt,_.state=Ct,_.info=oe}ct();const q=new k0(_,B);this.xr=q,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const T=ee.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ee.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(T){T!==void 0&&($=T,this.setSize(X,it,!1))},this.getSize=function(T){return T.set(X,it)},this.setSize=function(T,D,z=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=T,it=D,e.width=Math.floor(T*$),e.height=Math.floor(D*$),z===!0&&(e.style.width=T+"px",e.style.height=D+"px"),this.setViewport(0,0,T,D)},this.getDrawingBufferSize=function(T){return T.set(X*$,it*$).floor()},this.setDrawingBufferSize=function(T,D,z){X=T,it=D,$=z,e.width=Math.floor(T*z),e.height=Math.floor(D*z),this.setViewport(0,0,T,D)},this.getCurrentViewport=function(T){return T.copy(C)},this.getViewport=function(T){return T.copy(Pt)},this.setViewport=function(T,D,z,G){T.isVector4?Pt.set(T.x,T.y,T.z,T.w):Pt.set(T,D,z,G),Ct.viewport(C.copy(Pt).multiplyScalar($).round())},this.getScissor=function(T){return T.copy(qt)},this.setScissor=function(T,D,z,G){T.isVector4?qt.set(T.x,T.y,T.z,T.w):qt.set(T,D,z,G),Ct.scissor(U.copy(qt).multiplyScalar($).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(T){Ct.setScissorTest(re=T)},this.setOpaqueSort=function(T){dt=T},this.setTransparentSort=function(T){_t=T},this.getClearColor=function(T){return T.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(T=!0,D=!0,z=!0){let G=0;if(T){let k=!1;if(A!==null){const W=A.texture.format;k=W===ko||W===Io||W===Do}if(k){const W=A.texture.type,rt=W===Bn||W===xi||W===ws||W===Zi||W===Po||W===Uo,yt=Lt.getClearColor(),Et=Lt.getClearAlpha(),zt=yt.r,$t=yt.g,Rt=yt.b;rt?(g[0]=zt,g[1]=$t,g[2]=Rt,g[3]=Et,B.clearBufferuiv(B.COLOR,0,g)):(x[0]=zt,x[1]=$t,x[2]=Rt,x[3]=Et,B.clearBufferiv(B.COLOR,0,x))}else G|=B.COLOR_BUFFER_BIT}D&&(G|=B.DEPTH_BUFFER_BIT),z&&(G|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),vt.dispose(),Qt.dispose(),It.dispose(),E.dispose(),H.dispose(),j.dispose(),se.dispose(),N.dispose(),Tt.dispose(),q.dispose(),q.removeEventListener("sessionstart",wn),q.removeEventListener("sessionend",Qe),En.stop()};function Q(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const T=oe.autoReset,D=xt.enabled,z=xt.autoUpdate,G=xt.needsUpdate,k=xt.type;ct(),oe.autoReset=T,xt.enabled=D,xt.autoUpdate=z,xt.needsUpdate=G,xt.type=k}function ft(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Xt(T){const D=T.target;D.removeEventListener("dispose",Xt),Me(D)}function Me(T){Pe(T),It.remove(T)}function Pe(T){const D=It.get(T).programs;D!==void 0&&(D.forEach(function(z){Tt.releaseProgram(z)}),T.isShaderMaterial&&Tt.releaseShaderCache(T))}this.renderBufferDirect=function(T,D,z,G,k,W){D===null&&(D=Wt);const rt=k.isMesh&&k.matrixWorld.determinant()<0,yt=Dt(T,D,z,G,k);Ct.setMaterial(G,rt);let Et=z.index,zt=1;if(G.wireframe===!0){if(Et=et.getWireframeAttribute(z),Et===void 0)return;zt=2}const $t=z.drawRange,Rt=z.attributes.position;let le=$t.start*zt,ge=($t.start+$t.count)*zt;W!==null&&(le=Math.max(le,W.start*zt),ge=Math.min(ge,(W.start+W.count)*zt)),Et!==null?(le=Math.max(le,0),ge=Math.min(ge,Et.count)):Rt!=null&&(le=Math.max(le,0),ge=Math.min(ge,Rt.count));const _e=ge-le;if(_e<0||_e===1/0)return;se.setup(k,G,yt,z,Et);let je,he=bt;if(Et!==null&&(je=J.get(Et),he=Yt,he.setIndex(je)),k.isMesh)G.wireframe===!0?(Ct.setLineWidth(G.wireframeLinewidth*be()),he.setMode(B.LINES)):he.setMode(B.TRIANGLES);else if(k.isLine){let Ut=G.linewidth;Ut===void 0&&(Ut=1),Ct.setLineWidth(Ut*be()),k.isLineSegments?he.setMode(B.LINES):k.isLineLoop?he.setMode(B.LINE_LOOP):he.setMode(B.LINE_STRIP)}else k.isPoints?he.setMode(B.POINTS):k.isSprite&&he.setMode(B.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)he.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(ee.get("WEBGL_multi_draw"))he.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Ut=k._multiDrawStarts,An=k._multiDrawCounts,de=k._multiDrawCount,hn=Et?J.get(Et).bytesPerElement:1,wi=It.get(G).currentProgram.getUniforms();for(let tn=0;tn<de;tn++)wi.setValue(B,"_gl_DrawID",tn),he.render(Ut[tn]/hn,An[tn])}else if(k.isInstancedMesh)he.renderInstances(le,_e,k.count);else if(z.isInstancedBufferGeometry){const Ut=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,An=Math.min(z.instanceCount,Ut);he.renderInstances(le,_e,An)}else he.render(le,_e)};function ce(T,D,z){T.transparent===!0&&T.side===te&&T.forceSinglePass===!1?(T.side=Ye,T.needsUpdate=!0,at(T,D,z),T.side=ti,T.needsUpdate=!0,at(T,D,z),T.side=te):at(T,D,z)}this.compile=function(T,D,z=null){z===null&&(z=T),u=Qt.get(z),u.init(D),w.push(u),z.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(u.pushLight(k),k.castShadow&&u.pushShadow(k))}),T!==z&&T.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(u.pushLight(k),k.castShadow&&u.pushShadow(k))}),u.setupLights();const G=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const W=k.material;if(W)if(Array.isArray(W))for(let rt=0;rt<W.length;rt++){const yt=W[rt];ce(yt,z,k),G.add(yt)}else ce(W,z,k),G.add(W)}),w.pop(),u=null,G},this.compileAsync=function(T,D,z=null){const G=this.compile(T,D,z);return new Promise(k=>{function W(){if(G.forEach(function(rt){It.get(rt).currentProgram.isReady()&&G.delete(rt)}),G.size===0){k(T);return}setTimeout(W,10)}ee.get("KHR_parallel_shader_compile")!==null?W():setTimeout(W,10)})};let Je=null;function rn(T){Je&&Je(T)}function wn(){En.stop()}function Qe(){En.start()}const En=new Qc;En.setAnimationLoop(rn),typeof self<"u"&&En.setContext(self),this.setAnimationLoop=function(T){Je=T,q.setAnimationLoop(T),T===null?En.stop():En.start()},q.addEventListener("sessionstart",wn),q.addEventListener("sessionend",Qe),this.render=function(T,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(D),D=q.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,D,A),u=Qt.get(T,w.length),u.init(D),w.push(u),Nt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Z.setFromProjectionMatrix(Nt),St=this.localClippingEnabled,st=nt.init(this.clippingPlanes,St),m=vt.get(T,S.length),m.init(),S.push(m),q.enabled===!0&&q.isPresenting===!0){const W=_.xr.getDepthSensingMesh();W!==null&&ss(W,D,-1/0,_.sortObjects)}ss(T,D,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(dt,_t),ie=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,ie&&Lt.addToRenderList(m,T),this.info.render.frame++,st===!0&&nt.beginShadows();const z=u.state.shadowsArray;xt.render(z,T,D),st===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,k=m.transmissive;if(u.setupLights(),D.isArrayCamera){const W=D.cameras;if(k.length>0)for(let rt=0,yt=W.length;rt<yt;rt++){const Et=W[rt];O(G,k,T,Et)}ie&&Lt.render(T);for(let rt=0,yt=W.length;rt<yt;rt++){const Et=W[rt];ni(m,T,Et,Et.viewport)}}else k.length>0&&O(G,k,T,D),ie&&Lt.render(T),ni(m,T,D);A!==null&&(L.updateMultisampleRenderTarget(A),L.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(_,T,D),se.resetDefaultState(),b=-1,v=null,w.pop(),w.length>0?(u=w[w.length-1],st===!0&&nt.setGlobalState(_.clippingPlanes,u.state.camera)):u=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function ss(T,D,z,G){if(T.visible===!1)return;if(T.layers.test(D.layers)){if(T.isGroup)z=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(D);else if(T.isLight)u.pushLight(T),T.castShadow&&u.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Z.intersectsSprite(T)){G&&Jt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Nt);const rt=j.update(T),yt=T.material;yt.visible&&m.push(T,rt,yt,z,Jt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Z.intersectsObject(T))){const rt=j.update(T),yt=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Jt.copy(T.boundingSphere.center)):(rt.boundingSphere===null&&rt.computeBoundingSphere(),Jt.copy(rt.boundingSphere.center)),Jt.applyMatrix4(T.matrixWorld).applyMatrix4(Nt)),Array.isArray(yt)){const Et=rt.groups;for(let zt=0,$t=Et.length;zt<$t;zt++){const Rt=Et[zt],le=yt[Rt.materialIndex];le&&le.visible&&m.push(T,rt,le,z,Jt.z,Rt)}}else yt.visible&&m.push(T,rt,yt,z,Jt.z,null)}}const W=T.children;for(let rt=0,yt=W.length;rt<yt;rt++)ss(W[rt],D,z,G)}function ni(T,D,z,G){const k=T.opaque,W=T.transmissive,rt=T.transparent;u.setupLightsView(z),st===!0&&nt.setGlobalState(_.clippingPlanes,z),G&&Ct.viewport(C.copy(G)),k.length>0&&Y(k,D,z),W.length>0&&Y(W,D,z),rt.length>0&&Y(rt,D,z),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function O(T,D,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[G.id]===void 0&&(u.state.transmissionRenderTarget[G.id]=new vi(1,1,{generateMipmaps:!0,type:ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float")?Es:Bn,minFilter:_n,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ae.workingColorSpace}));const W=u.state.transmissionRenderTarget[G.id],rt=G.viewport||C;W.setSize(rt.z,rt.w);const yt=_.getRenderTarget();_.setRenderTarget(W),_.getClearColor(V),K=_.getClearAlpha(),K<1&&_.setClearColor(16777215,.5),_.clear(),ie&&Lt.render(z);const Et=_.toneMapping;_.toneMapping=Jn;const zt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),u.setupLightsView(G),st===!0&&nt.setGlobalState(_.clippingPlanes,G),Y(T,z,G),L.updateMultisampleRenderTarget(W),L.updateRenderTargetMipmap(W),ee.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Rt=0,le=D.length;Rt<le;Rt++){const ge=D[Rt],_e=ge.object,je=ge.geometry,he=ge.material,Ut=ge.group;if(he.side===te&&_e.layers.test(G.layers)){const An=he.side;he.side=Ye,he.needsUpdate=!0,Mt(_e,z,G,je,he,Ut),he.side=An,he.needsUpdate=!0,$t=!0}}$t===!0&&(L.updateMultisampleRenderTarget(W),L.updateRenderTargetMipmap(W))}_.setRenderTarget(yt),_.setClearColor(V,K),zt!==void 0&&(G.viewport=zt),_.toneMapping=Et}function Y(T,D,z){const G=D.isScene===!0?D.overrideMaterial:null;for(let k=0,W=T.length;k<W;k++){const rt=T[k],yt=rt.object,Et=rt.geometry,zt=G===null?rt.material:G,$t=rt.group;yt.layers.test(z.layers)&&Mt(yt,D,z,Et,zt,$t)}}function Mt(T,D,z,G,k,W){T.onBeforeRender(_,D,z,G,k,W),T.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(_,D,z,G,T,W),k.transparent===!0&&k.side===te&&k.forceSinglePass===!1?(k.side=Ye,k.needsUpdate=!0,_.renderBufferDirect(z,D,G,k,T,W),k.side=ti,k.needsUpdate=!0,_.renderBufferDirect(z,D,G,k,T,W),k.side=te):_.renderBufferDirect(z,D,G,k,T,W),T.onAfterRender(_,D,z,G,k,W)}function at(T,D,z){D.isScene!==!0&&(D=Wt);const G=It.get(T),k=u.state.lights,W=u.state.shadowsArray,rt=k.state.version,yt=Tt.getParameters(T,k.state,W,D,z),Et=Tt.getProgramCacheKey(yt);let zt=G.programs;G.environment=T.isMeshStandardMaterial?D.environment:null,G.fog=D.fog,G.envMap=(T.isMeshStandardMaterial?H:E).get(T.envMap||G.environment),G.envMapRotation=G.environment!==null&&T.envMap===null?D.environmentRotation:T.envMapRotation,zt===void 0&&(T.addEventListener("dispose",Xt),zt=new Map,G.programs=zt);let $t=zt.get(Et);if($t!==void 0){if(G.currentProgram===$t&&G.lightsStateVersion===rt)return wt(T,yt),$t}else yt.uniforms=Tt.getUniforms(T),T.onBeforeCompile(yt,_),$t=Tt.acquireProgram(yt,Et),zt.set(Et,$t),G.uniforms=yt.uniforms;const Rt=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Rt.clippingPlanes=nt.uniform),wt(T,yt),G.needsLights=kt(T),G.lightsStateVersion=rt,G.needsLights&&(Rt.ambientLightColor.value=k.state.ambient,Rt.lightProbe.value=k.state.probe,Rt.directionalLights.value=k.state.directional,Rt.directionalLightShadows.value=k.state.directionalShadow,Rt.spotLights.value=k.state.spot,Rt.spotLightShadows.value=k.state.spotShadow,Rt.rectAreaLights.value=k.state.rectArea,Rt.ltc_1.value=k.state.rectAreaLTC1,Rt.ltc_2.value=k.state.rectAreaLTC2,Rt.pointLights.value=k.state.point,Rt.pointLightShadows.value=k.state.pointShadow,Rt.hemisphereLights.value=k.state.hemi,Rt.directionalShadowMap.value=k.state.directionalShadowMap,Rt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Rt.spotShadowMap.value=k.state.spotShadowMap,Rt.spotLightMatrix.value=k.state.spotLightMatrix,Rt.spotLightMap.value=k.state.spotLightMap,Rt.pointShadowMap.value=k.state.pointShadowMap,Rt.pointShadowMatrix.value=k.state.pointShadowMatrix),G.currentProgram=$t,G.uniformsList=null,$t}function mt(T){if(T.uniformsList===null){const D=T.currentProgram.getUniforms();T.uniformsList=vr.seqWithValue(D.seq,T.uniforms)}return T.uniformsList}function wt(T,D){const z=It.get(T);z.outputColorSpace=D.outputColorSpace,z.batching=D.batching,z.batchingColor=D.batchingColor,z.instancing=D.instancing,z.instancingColor=D.instancingColor,z.instancingMorph=D.instancingMorph,z.skinning=D.skinning,z.morphTargets=D.morphTargets,z.morphNormals=D.morphNormals,z.morphColors=D.morphColors,z.morphTargetsCount=D.morphTargetsCount,z.numClippingPlanes=D.numClippingPlanes,z.numIntersection=D.numClipIntersection,z.vertexAlphas=D.vertexAlphas,z.vertexTangents=D.vertexTangents,z.toneMapping=D.toneMapping}function Dt(T,D,z,G,k){D.isScene!==!0&&(D=Wt),L.resetTextureUnits();const W=D.fog,rt=G.isMeshStandardMaterial?D.environment:null,yt=A===null?_.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ts,Et=(G.isMeshStandardMaterial?H:E).get(G.envMap||rt),zt=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,$t=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Rt=!!z.morphAttributes.position,le=!!z.morphAttributes.normal,ge=!!z.morphAttributes.color;let _e=Jn;G.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(_e=_.toneMapping);const je=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,he=je!==void 0?je.length:0,Ut=It.get(G),An=u.state.lights;if(st===!0&&(St===!0||T!==v)){const an=T===v&&G.id===b;nt.setState(G,T,an)}let de=!1;G.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==An.state.version||Ut.outputColorSpace!==yt||k.isBatchedMesh&&Ut.batching===!1||!k.isBatchedMesh&&Ut.batching===!0||k.isBatchedMesh&&Ut.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ut.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ut.instancing===!1||!k.isInstancedMesh&&Ut.instancing===!0||k.isSkinnedMesh&&Ut.skinning===!1||!k.isSkinnedMesh&&Ut.skinning===!0||k.isInstancedMesh&&Ut.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ut.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ut.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ut.instancingMorph===!1&&k.morphTexture!==null||Ut.envMap!==Et||G.fog===!0&&Ut.fog!==W||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==nt.numPlanes||Ut.numIntersection!==nt.numIntersection)||Ut.vertexAlphas!==zt||Ut.vertexTangents!==$t||Ut.morphTargets!==Rt||Ut.morphNormals!==le||Ut.morphColors!==ge||Ut.toneMapping!==_e||Ut.morphTargetsCount!==he)&&(de=!0):(de=!0,Ut.__version=G.version);let hn=Ut.currentProgram;de===!0&&(hn=at(G,D,k));let wi=!1,tn=!1,rs=!1;const xe=hn.getUniforms(),yn=Ut.uniforms;if(Ct.useProgram(hn.program)&&(wi=!0,tn=!0,rs=!0),G.id!==b&&(b=G.id,tn=!0),wi||v!==T){Ct.buffers.depth.getReversed()?(ut.copy(T.projectionMatrix),Ru(ut),Cu(ut),xe.setValue(B,"projectionMatrix",ut)):xe.setValue(B,"projectionMatrix",T.projectionMatrix),xe.setValue(B,"viewMatrix",T.matrixWorldInverse);const Hn=xe.map.cameraPosition;Hn!==void 0&&Hn.setValue(B,Vt.setFromMatrixPosition(T.matrixWorld)),ne.logarithmicDepthBuffer&&xe.setValue(B,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&xe.setValue(B,"isOrthographic",T.isOrthographicCamera===!0),v!==T&&(v=T,tn=!0,rs=!0)}if(k.isSkinnedMesh){xe.setOptional(B,k,"bindMatrix"),xe.setOptional(B,k,"bindMatrixInverse");const an=k.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),xe.setValue(B,"boneTexture",an.boneTexture,L))}k.isBatchedMesh&&(xe.setOptional(B,k,"batchingTexture"),xe.setValue(B,"batchingTexture",k._matricesTexture,L),xe.setOptional(B,k,"batchingIdTexture"),xe.setValue(B,"batchingIdTexture",k._indirectTexture,L),xe.setOptional(B,k,"batchingColorTexture"),k._colorsTexture!==null&&xe.setValue(B,"batchingColorTexture",k._colorsTexture,L));const as=z.morphAttributes;if((as.position!==void 0||as.normal!==void 0||as.color!==void 0)&&Ft.update(k,z,hn),(tn||Ut.receiveShadow!==k.receiveShadow)&&(Ut.receiveShadow=k.receiveShadow,xe.setValue(B,"receiveShadow",k.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(yn.envMap.value=Et,yn.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&D.environment!==null&&(yn.envMapIntensity.value=D.environmentIntensity),tn&&(xe.setValue(B,"toneMappingExposure",_.toneMappingExposure),Ut.needsLights&&we(yn,rs),W&&G.fog===!0&&ot.refreshFogUniforms(yn,W),ot.refreshMaterialUniforms(yn,G,$,it,u.state.transmissionRenderTarget[T.id]),vr.upload(B,mt(Ut),yn,L)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(vr.upload(B,mt(Ut),yn,L),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&xe.setValue(B,"center",k.center),xe.setValue(B,"modelViewMatrix",k.modelViewMatrix),xe.setValue(B,"normalMatrix",k.normalMatrix),xe.setValue(B,"modelMatrix",k.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const an=G.uniformsGroups;for(let Hn=0,Gn=an.length;Hn<Gn;Hn++){const Zo=an[Hn];N.update(Zo,hn),N.bind(Zo,hn)}}return hn}function we(T,D){T.ambientLightColor.needsUpdate=D,T.lightProbe.needsUpdate=D,T.directionalLights.needsUpdate=D,T.directionalLightShadows.needsUpdate=D,T.pointLights.needsUpdate=D,T.pointLightShadows.needsUpdate=D,T.spotLights.needsUpdate=D,T.spotLightShadows.needsUpdate=D,T.rectAreaLights.needsUpdate=D,T.hemisphereLights.needsUpdate=D}function kt(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,D,z){It.get(T.texture).__webglTexture=D,It.get(T.depthTexture).__webglTexture=z;const G=It.get(T);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=z===void 0,G.__autoAllocateDepthBuffer||ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,D){const z=It.get(T);z.__webglFramebuffer=D,z.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(T,D=0,z=0){A=T,M=D,R=z;let G=!0,k=null,W=!1,rt=!1;if(T){const Et=It.get(T);if(Et.__useDefaultFramebuffer!==void 0)Ct.bindFramebuffer(B.FRAMEBUFFER,null),G=!1;else if(Et.__webglFramebuffer===void 0)L.setupRenderTarget(T);else if(Et.__hasExternalTextures)L.rebindTextures(T,It.get(T.texture).__webglTexture,It.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Rt=T.depthTexture;if(Et.__boundDepthTexture!==Rt){if(Rt!==null&&It.has(Rt)&&(T.width!==Rt.image.width||T.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(T)}}const zt=T.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(rt=!0);const $t=It.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray($t[D])?k=$t[D][z]:k=$t[D],W=!0):T.samples>0&&L.useMultisampledRTT(T)===!1?k=It.get(T).__webglMultisampledFramebuffer:Array.isArray($t)?k=$t[z]:k=$t,C.copy(T.viewport),U.copy(T.scissor),I=T.scissorTest}else C.copy(Pt).multiplyScalar($).floor(),U.copy(qt).multiplyScalar($).floor(),I=re;if(Ct.bindFramebuffer(B.FRAMEBUFFER,k)&&G&&Ct.drawBuffers(T,k),Ct.viewport(C),Ct.scissor(U),Ct.setScissorTest(I),W){const Et=It.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+D,Et.__webglTexture,z)}else if(rt){const Et=It.get(T.texture),zt=D||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Et.__webglTexture,z||0,zt)}b=-1},this.readRenderTargetPixels=function(T,D,z,G,k,W,rt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=It.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&rt!==void 0&&(yt=yt[rt]),yt){Ct.bindFramebuffer(B.FRAMEBUFFER,yt);try{const Et=T.texture,zt=Et.format,$t=Et.type;if(!ne.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ne.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=T.width-G&&z>=0&&z<=T.height-k&&B.readPixels(D,z,G,k,Gt.convert(zt),Gt.convert($t),W)}finally{const Et=A!==null?It.get(A).__webglFramebuffer:null;Ct.bindFramebuffer(B.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(T,D,z,G,k,W,rt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=It.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&rt!==void 0&&(yt=yt[rt]),yt){const Et=T.texture,zt=Et.format,$t=Et.type;if(!ne.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ne.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=T.width-G&&z>=0&&z<=T.height-k){Ct.bindFramebuffer(B.FRAMEBUFFER,yt);const Rt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Rt),B.bufferData(B.PIXEL_PACK_BUFFER,W.byteLength,B.STREAM_READ),B.readPixels(D,z,G,k,Gt.convert(zt),Gt.convert($t),0);const le=A!==null?It.get(A).__webglFramebuffer:null;Ct.bindFramebuffer(B.FRAMEBUFFER,le);const ge=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Au(B,ge,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Rt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,W),B.deleteBuffer(Rt),B.deleteSync(ge),W}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,D=null,z=0){T.isTexture!==!0&&(xs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,T=arguments[1]);const G=Math.pow(2,-z),k=Math.floor(T.image.width*G),W=Math.floor(T.image.height*G),rt=D!==null?D.x:0,yt=D!==null?D.y:0;L.setTexture2D(T,0),B.copyTexSubImage2D(B.TEXTURE_2D,z,0,0,rt,yt,k,W),Ct.unbindTexture()},this.copyTextureToTexture=function(T,D,z=null,G=null,k=0){T.isTexture!==!0&&(xs("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,T=arguments[1],D=arguments[2],k=arguments[3]||0,z=null);let W,rt,yt,Et,zt,$t,Rt,le,ge;const _e=T.isCompressedTexture?T.mipmaps[k]:T.image;z!==null?(W=z.max.x-z.min.x,rt=z.max.y-z.min.y,yt=z.isBox3?z.max.z-z.min.z:1,Et=z.min.x,zt=z.min.y,$t=z.isBox3?z.min.z:0):(W=_e.width,rt=_e.height,yt=_e.depth||1,Et=0,zt=0,$t=0),G!==null?(Rt=G.x,le=G.y,ge=G.z):(Rt=0,le=0,ge=0);const je=Gt.convert(D.format),he=Gt.convert(D.type);let Ut;D.isData3DTexture?(L.setTexture3D(D,0),Ut=B.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(L.setTexture2DArray(D,0),Ut=B.TEXTURE_2D_ARRAY):(L.setTexture2D(D,0),Ut=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,D.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,D.unpackAlignment);const An=B.getParameter(B.UNPACK_ROW_LENGTH),de=B.getParameter(B.UNPACK_IMAGE_HEIGHT),hn=B.getParameter(B.UNPACK_SKIP_PIXELS),wi=B.getParameter(B.UNPACK_SKIP_ROWS),tn=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,_e.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,_e.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Et),B.pixelStorei(B.UNPACK_SKIP_ROWS,zt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,$t);const rs=T.isDataArrayTexture||T.isData3DTexture,xe=D.isDataArrayTexture||D.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const yn=It.get(T),as=It.get(D),an=It.get(yn.__renderTarget),Hn=It.get(as.__renderTarget);Ct.bindFramebuffer(B.READ_FRAMEBUFFER,an.__webglFramebuffer),Ct.bindFramebuffer(B.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let Gn=0;Gn<yt;Gn++)rs&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,It.get(T).__webglTexture,k,$t+Gn),T.isDepthTexture?(xe&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,It.get(D).__webglTexture,k,ge+Gn),B.blitFramebuffer(Et,zt,W,rt,Rt,le,W,rt,B.DEPTH_BUFFER_BIT,B.NEAREST)):xe?B.copyTexSubImage3D(Ut,k,Rt,le,ge+Gn,Et,zt,W,rt):B.copyTexSubImage2D(Ut,k,Rt,le,ge+Gn,Et,zt,W,rt);Ct.bindFramebuffer(B.READ_FRAMEBUFFER,null),Ct.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else xe?T.isDataTexture||T.isData3DTexture?B.texSubImage3D(Ut,k,Rt,le,ge,W,rt,yt,je,he,_e.data):D.isCompressedArrayTexture?B.compressedTexSubImage3D(Ut,k,Rt,le,ge,W,rt,yt,je,_e.data):B.texSubImage3D(Ut,k,Rt,le,ge,W,rt,yt,je,he,_e):T.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,k,Rt,le,W,rt,je,he,_e.data):T.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,k,Rt,le,_e.width,_e.height,je,_e.data):B.texSubImage2D(B.TEXTURE_2D,k,Rt,le,W,rt,je,he,_e);B.pixelStorei(B.UNPACK_ROW_LENGTH,An),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,de),B.pixelStorei(B.UNPACK_SKIP_PIXELS,hn),B.pixelStorei(B.UNPACK_SKIP_ROWS,wi),B.pixelStorei(B.UNPACK_SKIP_IMAGES,tn),k===0&&D.generateMipmaps&&B.generateMipmap(Ut),Ct.unbindTexture()},this.copyTextureToTexture3D=function(T,D,z=null,G=null,k=0){return T.isTexture!==!0&&(xs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,G=arguments[1]||null,T=arguments[2],D=arguments[3],k=arguments[4]||0),xs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,D,z,G,k)},this.initRenderTarget=function(T){It.get(T).__webglFramebuffer===void 0&&L.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?L.setTextureCube(T,0):T.isData3DTexture?L.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?L.setTexture2DArray(T,0):L.setTexture2D(T,0),Ct.unbindTexture()},this.resetState=function(){M=0,R=0,A=null,Ct.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}}class mi{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ot(t),this.near=e,this.far=n}clone(){return new mi(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class z0 extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class H0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=xo,this.updateRanges=[],this.version=0,this.uuid=Qn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const We=new F;class Tr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix4(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyNormalMatrix(t),this.setXYZ(e,We.x,We.y,We.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.transformDirection(t),this.setXYZ(e,We.x,We.y,We.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=fe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Tn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Tn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Tn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Tn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),i=fe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),i=fe(i,this.array),r=fe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new $e(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Tr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Mo extends bi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Fi;const ds=new F,Oi=new F,Bi=new F,zi=new Ht,us=new Ht,ah=new ve,tr=new F,fs=new F,er=new F,$l=new Ht,ua=new Ht,Yl=new Ht;class jl extends ke{constructor(t=new Mo){if(super(),this.isSprite=!0,this.type="Sprite",Fi===void 0){Fi=new Ve;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new H0(e,5);Fi.setIndex([0,1,2,0,2,3]),Fi.setAttribute("position",new Tr(n,3,0,!1)),Fi.setAttribute("uv",new Tr(n,2,3,!1))}this.geometry=Fi,this.material=t,this.center=new Ht(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Oi.setFromMatrixScale(this.matrixWorld),ah.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Bi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Oi.multiplyScalar(-Bi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;nr(tr.set(-.5,-.5,0),Bi,o,Oi,i,r),nr(fs.set(.5,-.5,0),Bi,o,Oi,i,r),nr(er.set(.5,.5,0),Bi,o,Oi,i,r),$l.set(0,0),ua.set(1,0),Yl.set(1,1);let a=t.ray.intersectTriangle(tr,fs,er,!1,ds);if(a===null&&(nr(fs.set(-.5,.5,0),Bi,o,Oi,i,r),ua.set(0,1),a=t.ray.intersectTriangle(tr,er,fs,!1,ds),a===null))return;const l=t.ray.origin.distanceTo(ds);l<t.near||l>t.far||e.push({distance:l,point:ds.clone(),uv:cn.getInterpolation(ds,tr,fs,er,$l,ua,Yl,new Ht),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function nr(s,t,e,n,i,r){zi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(us.x=r*zi.x-i*zi.y,us.y=i*zi.x+r*zi.y):us.copy(zi),s.copy(t),s.x+=us.x,s.y+=us.y,s.applyMatrix4(ah)}class gi extends Ge{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ho extends Ve{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new F,h=new Ht;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=e;d++,f+=3){const p=n+d/e*i;c.x=t*Math.cos(p),c.y=t*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Se(o,3)),this.setAttribute("normal",new Se(a,3)),this.setAttribute("uv",new Se(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ho(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ye extends Ve{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],f=[],p=[];let g=0;const x=[],m=n/2;let u=0;S(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new Se(d,3)),this.setAttribute("normal",new Se(f,3)),this.setAttribute("uv",new Se(p,2));function S(){const _=new F,y=new F;let M=0;const R=(e-t)/n;for(let A=0;A<=r;A++){const b=[],v=A/r,C=v*(e-t)+t;for(let U=0;U<=i;U++){const I=U/i,V=I*l+a,K=Math.sin(V),X=Math.cos(V);y.x=C*K,y.y=-v*n+m,y.z=C*X,d.push(y.x,y.y,y.z),_.set(K,R,X).normalize(),f.push(_.x,_.y,_.z),p.push(I,1-v),b.push(g++)}x.push(b)}for(let A=0;A<i;A++)for(let b=0;b<r;b++){const v=x[b][A],C=x[b+1][A],U=x[b+1][A+1],I=x[b][A+1];(t>0||b!==0)&&(h.push(v,C,I),M+=3),(e>0||b!==r-1)&&(h.push(C,U,I),M+=3)}c.addGroup(u,M,0),u+=M}function w(_){const y=g,M=new Ht,R=new F;let A=0;const b=_===!0?t:e,v=_===!0?1:-1;for(let U=1;U<=i;U++)d.push(0,m*v,0),f.push(0,v,0),p.push(.5,.5),g++;const C=g;for(let U=0;U<=i;U++){const V=U/i*l+a,K=Math.cos(V),X=Math.sin(V);R.x=b*X,R.y=m*v,R.z=b*K,d.push(R.x,R.y,R.z),f.push(0,v,0),M.x=K*.5+.5,M.y=X*.5*v+.5,p.push(M.x,M.y),g++}for(let U=0;U<i;U++){const I=y+U,V=C+U;_===!0?h.push(V,V+1,I):h.push(V+1,V,I),A+=3}c.addGroup(u,A,_===!0?1:2),u+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ye(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class In extends ye{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new In(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Go extends Ve{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Se(r,3)),this.setAttribute("normal",new Se(r.slice(),3)),this.setAttribute("uv",new Se(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const w=new F,_=new F,y=new F;for(let M=0;M<e.length;M+=3)p(e[M+0],w),p(e[M+1],_),p(e[M+2],y),l(w,_,y,S)}function l(S,w,_,y){const M=y+1,R=[];for(let A=0;A<=M;A++){R[A]=[];const b=S.clone().lerp(_,A/M),v=w.clone().lerp(_,A/M),C=M-A;for(let U=0;U<=C;U++)U===0&&A===M?R[A][U]=b:R[A][U]=b.clone().lerp(v,U/C)}for(let A=0;A<M;A++)for(let b=0;b<2*(M-A)-1;b++){const v=Math.floor(b/2);b%2===0?(f(R[A][v+1]),f(R[A+1][v]),f(R[A][v])):(f(R[A][v+1]),f(R[A+1][v+1]),f(R[A+1][v]))}}function c(S){const w=new F;for(let _=0;_<r.length;_+=3)w.x=r[_+0],w.y=r[_+1],w.z=r[_+2],w.normalize().multiplyScalar(S),r[_+0]=w.x,r[_+1]=w.y,r[_+2]=w.z}function h(){const S=new F;for(let w=0;w<r.length;w+=3){S.x=r[w+0],S.y=r[w+1],S.z=r[w+2];const _=m(S)/2/Math.PI+.5,y=u(S)/Math.PI+.5;o.push(_,1-y)}g(),d()}function d(){for(let S=0;S<o.length;S+=6){const w=o[S+0],_=o[S+2],y=o[S+4],M=Math.max(w,_,y),R=Math.min(w,_,y);M>.9&&R<.1&&(w<.2&&(o[S+0]+=1),_<.2&&(o[S+2]+=1),y<.2&&(o[S+4]+=1))}}function f(S){r.push(S.x,S.y,S.z)}function p(S,w){const _=S*3;w.x=t[_+0],w.y=t[_+1],w.z=t[_+2]}function g(){const S=new F,w=new F,_=new F,y=new F,M=new Ht,R=new Ht,A=new Ht;for(let b=0,v=0;b<r.length;b+=9,v+=6){S.set(r[b+0],r[b+1],r[b+2]),w.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),M.set(o[v+0],o[v+1]),R.set(o[v+2],o[v+3]),A.set(o[v+4],o[v+5]),y.copy(S).add(w).add(_).divideScalar(3);const C=m(y);x(M,v+0,S,C),x(R,v+2,w,C),x(A,v+4,_,C)}}function x(S,w,_,y){y<0&&S.x===1&&(o[w]=S.x-1),_.x===0&&_.z===0&&(o[w]=y/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function u(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Go(t.vertices,t.indices,t.radius,t.details)}}class Vo extends Go{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Vo(t.radius,t.detail)}}class Wo extends Ve{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let d=t;const f=(e-t)/i,p=new F,g=new Ht;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){const u=r+m/n*o;p.x=d*Math.cos(u),p.y=d*Math.sin(u),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}d+=f}for(let x=0;x<i;x++){const m=x*(n+1);for(let u=0;u<n;u++){const S=u+m,w=S,_=S+n+1,y=S+n+2,M=S+1;a.push(w,_,M),a.push(_,y,M)}}this.setIndex(a),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(c,3)),this.setAttribute("uv",new Se(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wo(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Xo extends Ve{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new F,f=new F,p=[],g=[],x=[],m=[];for(let u=0;u<=n;u++){const S=[],w=u/n;let _=0;u===0&&o===0?_=.5/e:u===n&&l===Math.PI&&(_=-.5/e);for(let y=0;y<=e;y++){const M=y/e;d.x=-t*Math.cos(i+M*r)*Math.sin(o+w*a),d.y=t*Math.cos(o+w*a),d.z=t*Math.sin(i+M*r)*Math.sin(o+w*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),m.push(M+_,1-w),S.push(c++)}h.push(S)}for(let u=0;u<n;u++)for(let S=0;S<e;S++){const w=h[u][S+1],_=h[u][S],y=h[u+1][S],M=h[u+1][S+1];(u!==0||o>0)&&p.push(w,_,M),(u!==n-1||l<Math.PI)&&p.push(_,y,M)}this.setIndex(p),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(x,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xo(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class G0 extends bi{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Ot(16777215),this.specular=new Ot(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=No,this.normalScale=new Ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Lr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class lt extends bi{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=No,this.normalScale=new Ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Lr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Zl={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class V0{constructor(t,e,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=c.length;d<f;d+=2){const p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const W0=new V0;class qo{constructor(t){this.manager=t!==void 0?t:W0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}qo.DEFAULT_MATERIAL_NAME="__DEFAULT";class X0 extends qo{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Zl.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=ys("img");function l(){h(),Zl.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(d){h(),i&&i(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class oh extends qo{constructor(t){super(t)}load(t,e,n,i){const r=new Ge,o=new X0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class Ir extends ke{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class ir extends Ir{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ot(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const fa=new ve,Kl=new F,Jl=new F;class lh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ht(512,512),this.map=null,this.mapPass=null,this.matrix=new ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bo,this._frameExtents=new Ht(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Kl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Kl),Jl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Jl),e.updateMatrixWorld(),fa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ql=new ve,ps=new F,pa=new F;class q0 extends lh{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ht(4,2),this._viewportCount=6,this._viewports=[new pe(2,1,1,1),new pe(0,1,1,1),new pe(3,1,1,1),new pe(1,1,1,1),new pe(3,0,1,1),new pe(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ps.setFromMatrixPosition(t.matrixWorld),n.position.copy(ps),pa.copy(n.position),pa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(pa),n.updateMatrixWorld(),i.makeTranslation(-ps.x,-ps.y,-ps.z),Ql.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ql)}}class pn extends Ir{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new q0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class $0 extends lh{constructor(){super(new th(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class tc extends Ir{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new $0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class sr extends Ir{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const ec=new ve;class Y0{constructor(t,e,n=0,i=1/0){this.ray=new qc(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Oo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ec.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ec),this}intersectObject(t,e=!0,n=[]){return wo(t,this,n,e),n.sort(nc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)wo(t[i],this,n,e);return n.sort(nc),n}}function nc(s,t){return s.distance-t.distance}function wo(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)wo(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Co}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Co);const P=4,jn=3.2,ma=2,ga=1.7,ic=.6,_a=2,sc=.35,rc=1.65,rr=2.7,j0=1,Z0=1,K0=1.85,ch=260,J0=210,ms=8884384,ar=6e5,or=.34,Cs=["MMMMM##########","MMMMM##########","MMSMM##########","MMTMM##########","MMTMM##########","MMTMM##########","##.........####","##...........##","##...........##","##...........##","##...........##","##...........##","##...........##","######...######","######...######","######.P.######","#######F#######"],qe=Cs.length,ln=Cs[0].length;function Ee(s,t){if(t<0||t>=qe||s<0||s>=ln)return"building";const e=Cs[t][s];return e==="#"?"building":e==="o"?"barrel":e==="M"?"mountain":e==="T"?"tunnel":e==="S"?"stairs":e==="F"?"forestgate":"street"}function ac(s,t){const e=Ee(s,t);return e==="tunnel"||e==="stairs"}function xa(s,t){const e=Ee(s,t);return e==="street"||e==="barrel"||e==="tunnel"||e==="stairs"||e==="forestgate"}function oc(){for(let s=0;s<qe;s++){const t=Cs[s].indexOf("P");if(t>=0)return{col:t,row:s}}return{col:1,row:1}}function lc(){for(let s=0;s<qe;s++){const t=Cs[s].indexOf("F");if(t>=0)return{col:t,row:s}}return{col:7,row:qe-1}}const Ls=["###################################","###################################","##T...f...TrTTbT.NTTTTTT.T...bf.T##","##T...TTTf.TTf..T===TTfT..Tr.TTTf##","##Tb.f.TTTT.......T==.TTTrTT...T.##","##f....T..T..TrT.bT==.b.TTTTT.T.T##","##.b..T..T..r.T.T.T=.T....TTTTTTT##","##......TT....T.rk.=TT..TfTb..T..##","##frT..TTT.T...T.rT===.bT..T.TT.T##","##.f.kT.TT.rT..rT.==r.TTfT.fTr..T##","##TT.TTTTrTTTTTT.==...TT..T.TTT.T##","##T..TTTbTT.bT....=.Tff..TbTf.TT.##","##T..Tfb..b.k.T..======.TTTT....f##","##.TTT.T....rTT..=..Tk..TT..T.T..##","##...TT......bkT.=.kT.f...r.T.TT.##","##...TfT...T.T.r==..TTTbT..k..TT.##","##.TTTT.T..r.bbT=T.T...r....TTb.T##","##.f.T..T..TTf..===.T.TT.....TrbT##","##..TTTbTT.bT.T===TTTT.bT.......T##","##.fk.T.T....TTT.=.....T...rT.TTT##","##...T..T.b.TTkT==.TT.TfTf...TT..##","##.rTT..TTT.Tr.=====rT....T..TT=E##","##r.TT.T..TT..T===TbTTbTT...T.r.=##","##.TT.TfT....TT.T=rf.rTT.T...T===##","##T....rf.T..bT..==..TfT..Tk=====##","##T..Tff.TrTTTT...==.TT..T..=Tk.T##","##T.TTb==========j===========..Tf##","##..TT==.TfTT.T.==...r.TTTTrTT.bb##","##T.b==TT.rr.Tr..==.TT.TTT.TT..Tb##","##T======.TTr..T.==T.T...k.f.T...##","##===.brb.....bTT=.TT.T..r.T.T..T##","##W==TT.T.r.rTr===....rf.ffb.TTTT##","##..T.T.....k..===.Tk.Tr.Tf.f..TT##","##TT..TTT.T.TT==TTTrTTk.r..T.T.r.##","##T......r..TT=T.TTT.TTT.rf...T.T##","##.r....T.T.TT=TTT..TTkr.T.T..bbT##","##rk....fT.T.T==.rrb..T..r.T..Tr.##","##TTTb..Tf....=TbTrT..T..TTrT..f.##","##...T.b....TT====fT..T.T..T.T...##","##T..........T...=..Tf.T.T..T..fk##","##r.T..Tf........=T.....T...TTb.T##","##TTT.TTbT.bTT...===.T.......TbT.##","##.T.T....TTTbT..==T.T......TTTTT##","##.T..T...TTTf.T====..k..T.b..krT##","##bT.TTT.kTr.....==.TT.T.TTb.T.r.##","##TT.TbrT....T..r==T...bb.f..T...##","##..b.TTTrT.rf=s.===TTf..T.TTT.rr##","##..rTT.TTTTTr.r.P...TTT..T..T.b.##","#################=#################","#################V#################"],Ss=Ls.length,br=Ls[0].length;function ui(s,t){if(t<0||t>=Ss||s<0||s>=br)return"edge";switch(Ls[t][s]){case".":return"grass";case"=":return"path";case"T":return"tree";case"b":return"bush";case"r":return"rock";case"f":return"foliage";case"k":return"skull";case"s":case"j":case"N":case"E":case"W":return"sign";case"V":return"gate";case"P":return"spawn";default:return"edge"}}function va(s,t){const e=ui(s,t);return e==="grass"||e==="path"||e==="tree"||e==="foliage"||e==="skull"||e==="gate"||e==="spawn"}function Q0(s,t){switch(Ls[t]?.[s]){case"s":return["Trilha da Mata Sussurrante.","A neblina nunca se levanta por aqui. Dizem que ela se lembra de quem passa.","Siga a trilha até a encruzilhada."];case"j":return["Encruzilhada da Mata.","Ao sul: Vilarejo de Grimhollow.","Norte: Montanhas Cinzentas · Leste: o Charco · Oeste: as Ruínas.","(Esses caminhos se abrirão em breve.)"];case"N":return["Trilha das Montanhas Cinzentas.","O caminho sobe rumo ao nevoeiro gelado.","(Bloqueado — em breve.)"];case"E":return["Trilha do Charco.","Um cheiro de água parada vem do leste.","(Bloqueado — em breve.)"];case"W":return["Trilha das Ruínas.","Pedras antigas espreitam entre as árvores a oeste.","(Bloqueado — em breve.)"];default:return["Uma placa de madeira, gasta pelo tempo."]}}function ba(s){for(let t=0;t<Ss;t++){const e=Ls[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:8,row:Ss-2}}const Ps=["############################################","############################################","############################################","############################################","####......#######..........#################","####..C...#######....C.....#################","####......#######...E......#################","####......#######.......E..#################","####..X...#######..........#################","######.##########..K.......#################","######.##########..........#################","######.###############.#####################","######.###############.#####################","###.........##########.#########.........###","###.........##########.#########.........###","###.........###..............###...E.....###","###...E.....###.K...........B###.........###","###.........###..........E...###......K..###","###......................................###","###.........###......E.......###.........###","###.........###..............###.........###","#######.#######..............#######.#######","#######.#######...E..........#######.#######","#######.#######.B..........K.#######.#######","#######.#######..............#######.#######","#######.#############..#############.#######","#######.#############..#############.#######","###.........#########..#########.........###","###.B.......#########..#########........B###","###...E.....#########..#########....E....###","###................##..###...............###","###..K......#########..#########..K......###","###.........#########..#########.........###","##################........##################","##################........##################","##################........##################","##################...S.U..##################","##################........##################","############################################","############################################"],Ts=Ps.length,Er=Ps[0].length;function t_(s,t){return t<0||t>=Ts||s<0||s>=Er?"#":Ps[t][s]}function _i(s,t){switch(t_(s,t)){case".":return"floor";case"S":return"spawn";case"U":return"stairs";case"E":return"enemy";case"C":return"chest";case"K":return"bones";case"B":return"barrel";case"X":return"secret";default:return"wall"}}function cc(s,t){return _i(s,t)!=="wall"}function gs(s,t){const e=_i(s,t);return e==="wall"||e==="secret"}function hc(s){for(let t=0;t<Ts;t++){const e=Ps[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:21,row:36}}function e_(s){const t=[];for(let e=0;e<Ts;e++)for(let n=0;n<Er;n++)Ps[e][n]===s&&t.push({col:n,row:e});return t}const n_=""+new URL("tex_cobble-DXMPAwZE.jpg",import.meta.url).href,i_=""+new URL("tex_stonewall-BFmowWy6.jpg",import.meta.url).href,s_=""+new URL("tex_thatch-DdJMnyvF.jpg",import.meta.url).href,r_=""+new URL("tex_wood-B0jCHZZA.jpg",import.meta.url).href,a_=""+new URL("tex_dirt-BHcbB_Wz.jpg",import.meta.url).href,o_=""+new URL("tex_grass-C2Q1l28q.jpg",import.meta.url).href,l_=""+new URL("tex_mosswall-DpaqdZvP.jpg",import.meta.url).href,dc=new Map,c_=new oh;function Mi(s,t=1,e=1){let n=dc.get(s);n||(n=c_.load(s),n.wrapS=kn,n.wrapT=kn,n.colorSpace=Le,n.anisotropy=8,dc.set(s,n));const i=n.clone();return i.wrapS=kn,i.wrapT=kn,i.repeat.set(t,e),i.needsUpdate=!0,i}const lr=4;function Mn(s,t){const e=document.createElement("canvas");e.width=s*lr,e.height=t*lr;const n=e.getContext("2d");return n.scale(lr,lr),{c:e,ctx:n}}function Us(s,t=1,e=1){const n=new gi(s);return n.magFilter=He,n.minFilter=_n,n.generateMipmaps=!0,n.anisotropy=8,n.wrapS=kn,n.wrapT=kn,n.repeat.set(t,e),n.colorSpace=Le,n}function is(s){const t=new gi(s);return t.magFilter=He,t.minFilter=_n,t.generateMipmaps=!0,t.anisotropy=8,t.wrapS=gn,t.wrapT=gn,t.colorSpace=Le,t}const zn=s=>{let t=s>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}};function Oe(s=1){return Mi(r_)}function uc(s=7){return Mi(n_)}function _s(s=3){return Mi(s_)}function h_(s=11){const{c:n,ctx:i}=Mn(48,64);i.fillStyle="#5a4a38",i.fillRect(0,0,48,64),i.fillStyle="#4a2f16",i.fillRect(6,6,36,58);for(let r=6;r<42;r+=8)i.fillStyle="rgba(20,10,4,0.7)",i.fillRect(r,6,1,58),i.fillStyle="rgba(120,80,40,0.25)",i.fillRect(r+1,6,1,58);return i.fillStyle="#20242a",i.fillRect(8,14,32,3),i.fillRect(8,46,32,3),i.fillStyle="#c9a227",i.fillRect(34,64/2,3,3),Us(n)}function Ma(s=17){const{c:n,ctx:i}=Mn(48,32),r=zn(s);for(let o=0;o<48;o++){const a=96+Math.sin(o/48*Math.PI)*46+(r()-.5)*10;i.fillStyle=`rgb(${a|0},${a*.6|0},${a*.32|0})`,i.fillRect(o,0,1,32),o%6===0&&(i.fillStyle="rgba(20,10,4,0.6)",i.fillRect(o,0,1,32))}return i.fillStyle="#3a3f47",i.fillRect(0,3,48,3),i.fillRect(0,26,48,3),i.fillStyle="rgba(200,210,220,0.3)",i.fillRect(0,3,48,1),Us(n)}function d_(s=32){return Mi(l_)}function ci(s=31){return Mi(i_)}function u_(s=1){const{c:n,ctx:i}=Mn(76,128);i.clearRect(0,0,76,128),i.lineJoin="round",i.lineCap="round";const r=zn(s),o="#241812",a=76/2,l=29,c=13,h=(A,b)=>{const v=parseInt(A.slice(1),16);let C=v>>16&255,U=v>>8&255,I=v&255;if(b<0){const V=1+b;C*=V,U*=V,I*=V}else C+=(255-C)*b,U+=(255-U)*b,I+=(255-I)*b;return`rgb(${C|0},${U|0},${I|0})`},d=(A,b,v=2.2)=>{i.beginPath(),A.forEach(([C,U],I)=>I?i.lineTo(C,U):i.moveTo(C,U)),i.closePath(),i.fillStyle=b,i.fill(),v&&(i.strokeStyle=o,i.lineWidth=v,i.stroke())},f=(A,b,v,C,U=2)=>{i.beginPath(),i.arc(A,b,v,0,Math.PI*2),i.fillStyle=C,i.fill(),U&&(i.strokeStyle=o,i.lineWidth=U,i.stroke())},p=(A,b,v,C,U,I,V=2)=>{i.beginPath(),yo(i,A,b,v,C,U),i.fillStyle=I,i.fill(),V&&(i.strokeStyle=o,i.lineWidth=V,i.stroke())},g=(A,b)=>{i.save(),i.beginPath(),A.forEach(([v,C],U)=>U?i.lineTo(v,C):i.moveTo(v,C)),i.closePath(),i.clip(),i.fillStyle=b,i.fillRect(a+2,40,44,90),i.restore()},x=["#f4cc9c","#eab488","#d89a68"],m=x[Math.floor(r()*x.length)],u=h(m,-.16),S=Math.floor(r()*5);i.fillStyle="rgba(0,0,0,0.22)",i.beginPath(),i.ellipse(a,123,15,4.5,0,0,Math.PI*2),i.fill();const w=()=>{i.fillStyle=u,i.fillRect(a-4,36,8,12),f(a,l,c,m),i.save(),i.beginPath(),i.arc(a,l,c,0,Math.PI*2),i.clip(),i.fillStyle="rgba(0,0,0,0.10)",i.fillRect(a+3,l-c,c,2*c),i.restore();for(const A of[-1,1]){const b=a+A*4.6;i.fillStyle="#fff",i.beginPath(),i.ellipse(b,l-.3,2.3,3.6,0,0,Math.PI*2),i.fill(),i.fillStyle="#241812",i.beginPath(),i.ellipse(b+A*.3,l,1.6,3.1,0,0,Math.PI*2),i.fill(),i.fillStyle="#fff",i.beginPath(),i.arc(b-.7,l-1.8,.8,0,Math.PI*2),i.fill()}i.strokeStyle=o,i.lineWidth=1.6,i.beginPath(),i.moveTo(a-8,l-5.5),i.lineTo(a-2.5,l-6),i.moveTo(a+2.5,l-6),i.lineTo(a+8,l-5.5),i.stroke(),i.fillStyle=u,i.fillRect(a-.6,l+3,1.3,2.4),i.strokeStyle="#9c4a38",i.lineWidth=1.4,i.beginPath(),i.arc(a,l+6,2.2,.18*Math.PI,.82*Math.PI),i.stroke(),i.fillStyle="rgba(232,120,110,0.28)",i.beginPath(),i.arc(a-7.5,l+4,2,0,Math.PI*2),i.arc(a+7.5,l+4,2,0,Math.PI*2),i.fill()},_=A=>{i.beginPath(),i.arc(a,l-1,c+1,Math.PI*.98,Math.PI*2.02),i.lineTo(a+c,l+2),i.lineTo(a+8,l-3),i.lineTo(a+5,l-1),i.lineTo(a+2,l-4),i.lineTo(a-1,l-1),i.lineTo(a-4,l-4),i.lineTo(a-7,l-1),i.lineTo(a-c,l+2),i.closePath(),i.fillStyle=A,i.fill(),i.strokeStyle=o,i.lineWidth=2,i.stroke();const b=[-11,-7,-3,1,5,9,12];for(const v of b){const C=a+v*.9,U=Math.max(0,c*c-v*v),I=l-Math.sqrt(U)+3,V=a+v*1.7+(v>0?2:-2),K=I-10-(12-Math.abs(v))*.5;d([[C-3.4,I],[V,K],[C+3.4,I]],A,1.8)}i.strokeStyle=h(A,.35),i.lineWidth=1.3,i.beginPath(),i.moveTo(a-4,l-6),i.lineTo(a-2,l-c+1),i.moveTo(a+3,l-6),i.lineTo(a+5,l-c+2),i.stroke()},y=(A,b)=>{d([[a-12,48],[a-20,52],[a-18,74],[a-11,70]],A,2),d([[a+12,48],[a+20,52],[a+18,74],[a+11,70]],A,2),f(a-18,76,3.6,b,1.8),f(a+18,76,3.6,b,1.8)},M=(A,b)=>{d([[a-9,82],[a-1,82],[a-2,112],[a-9,112]],A,2),d([[a+1,82],[a+9,82],[a+9,112],[a+2,112]],A,2),p(a-11,110,10,11,3,b,2),p(a+1,110,10,11,3,b,2)},R=(A,b)=>{d(A,b,2.2),g(A,"rgba(0,0,0,0.16)")};if(S===0)M("#2f6f9a","#6a4526"),R([[a-12,46],[a+12,46],[a+14,84],[a-14,84]],"#37a34a"),d([[a-14,80],[a+14,80],[a+14,84],[a-14,84]],"#e8e0b0",1.4),y("#2f8f40","#e0b070"),p(a-14,79,28,5,2,"#5a3a1e",1.8),p(a-3,78,6,7,1.5,"#e6c040",1.4),w(),_("#f0d24a"),d([[a-c,l-6],[a+c,l-6],[a+5,l-c-13],[a-2,l-c-7]],"#2f8f3f",2),f(a+4,l-c-12,2.4,"#e6c040",1.4);else if(S===1)M("#33507e","#3a4656"),R([[a-13,46],[a+13,46],[a+14,82],[a-14,82]],"#8a5a2e"),d([[a-8,50],[a+8,50],[a+9,74],[a-9,74]],"#6f4522",1.8),i.strokeStyle="#e6c040",i.lineWidth=1.6,i.beginPath(),i.moveTo(a-7,56),i.lineTo(a+7,60),i.stroke(),y("#7a4d26","#3a4656"),f(a-15,49,5.5,"#9a6a38",2),f(a+15,49,5.5,"#9a6a38",2),p(a-14,78,28,5,2,"#4a2f18",1.8),w(),_("#e07028"),p(a-c-1,l-8,2*c+2,4.5,1.5,"#2f8f3f",1.8),d([[a+c-1,l-7],[a+c+6,l-2],[a+c+4,l-9]],"#2f8f3f",1.4);else if(S===2){const A=[[a-11,46],[a+11,46],[a+20,116],[a-20,116]];d(A,"#2a52b0",2.2),g(A,"rgba(0,0,0,0.16)"),d([[a-4,52],[a+4,52],[a+6,116],[a-6,116]],"#e6b83a",1.6),p(a-20,112,40,5,2,"#e6b83a",1.6),d([[a-11,48],[a-21,58],[a-17,84],[a-9,74]],"#2a52b0",2),d([[a+11,48],[a+21,58],[a+17,84],[a+9,74]],"#2a52b0",2),f(a-17,86,3.4,m,1.6),f(a+17,86,3.4,m,1.6),w(),_("#4aa8d8"),i.strokeStyle="#8a5a2e",i.lineWidth=3,i.beginPath(),i.moveTo(a+19,40),i.lineTo(a+19,118),i.stroke(),f(a+19,33,5,"#e6c040",2),f(a+19,33,2.2,"#fff6c0",0)}else if(S===3){const A=[[a-13,46],[a+13,46],[a+22,100],[a-22,100]];d(A,"#c0432a",2.2),g(A,"rgba(0,0,0,0.18)"),M("#2a2f45","#5a3a22"),R([[a-11,48],[a+11,48],[a+13,82],[a-13,82]],"#356ab8"),y("#2f5aa0","#d8a070"),p(a-13,78,26,5,2,"#4a3018",1.8),d([[a-12,46],[a-4,44],[a-6,52]],"#c0432a",1.6),d([[a+12,46],[a+4,44],[a+6,52]],"#c0432a",1.6),w(),_("#e8802a")}else{const A=[[a-11,46],[a+11,46],[a+18,116],[a-18,116]];d(A,"#dcd6c6",2.2),g(A,"rgba(0,0,0,0.12)"),p(a-18,112,36,5,2,"#c05a86",1.6),d([[a-5,46],[a+5,46],[a+3,74],[a-3,74]],"#c05a86",1.4),d([[a-11,48],[a-19,58],[a-15,82],[a-9,74]],"#dcd6c6",2),d([[a+11,48],[a+19,58],[a+15,82],[a+9,74]],"#dcd6c6",2),f(a-15,84,3.4,m,1.6),f(a+15,84,3.4,m,1.6),w();const b="#7a4a2a";d([[a-c-2,l-4],[a-c-3,l+26],[a-5,l+20],[a-4,l]],b,2),d([[a+c+2,l-4],[a+c+3,l+26],[a+5,l+20],[a+4,l]],b,2),i.beginPath(),i.arc(a,l-1,c+1,Math.PI*.92,Math.PI*2.08),i.lineTo(a+c-1,l+1),i.lineTo(a+7,l-2),i.lineTo(a+4,l+1),i.lineTo(a+1,l-3),i.lineTo(a-2,l+1),i.lineTo(a-5,l-2),i.lineTo(a-c+1,l+1),i.closePath(),i.fillStyle=b,i.fill(),i.strokeStyle=o,i.lineWidth=2,i.stroke()}return is(n)}function yo(s,t,e,n,i,r){s.beginPath(),s.moveTo(t+r,e),s.arcTo(t+n,e,t+n,e+i,r),s.arcTo(t+n,e+i,t,e+i,r),s.arcTo(t,e+i,t,e,r),s.arcTo(t,e,t+n,e,r),s.closePath()}function wa(s){const{c:n,ctx:i}=Mn(160,56);i.clearRect(0,0,160,56),i.fillStyle="#33220f",yo(i,2,2,156,52,6),i.fill(),i.fillStyle="#59401f",yo(i,6,6,148,44,5),i.fill(),i.strokeStyle="rgba(30,18,8,0.35)",i.lineWidth=1;for(let o=12;o<48;o+=6)i.beginPath(),i.moveTo(10,o),i.lineTo(150,o+1),i.stroke();i.fillStyle="#2a1a0a";for(const[o,a]of[[12,12],[148,12],[12,44],[148,44]])i.beginPath(),i.arc(o,a,2,0,Math.PI*2),i.fill();let r=26;for(i.fillStyle="#f2dda0",i.textAlign="center",i.textBaseline="middle",i.font=`bold ${r}px Georgia, "Times New Roman", serif`;i.measureText(s).width>138&&r>10;)r-=1,i.font=`bold ${r}px Georgia, "Times New Roman", serif`;return i.strokeStyle="rgba(0,0,0,0.55)",i.lineWidth=3,i.strokeText(s,160/2,56/2+1),i.fillText(s,160/2,56/2+1),is(n)}function ya(s=41){const{c:n,ctx:i}=Mn(96,96),r=zn(s);for(let o=0;o<96;o+=2)for(let a=0;a<96;a+=2){const l=78+Math.floor(r()*34);i.fillStyle=`rgb(${l},${l*.94|0},${l*.84|0})`,i.fillRect(a,o,2,2)}for(let o=0;o<26;o++){const a=r()*96,l=r()*96,c=10+r()*16,h=r()<.5?.22:-.18;i.fillStyle=h>0?`rgba(0,0,0,${h})`:`rgba(255,250,240,${-h})`,i.beginPath();const d=4+(r()*3|0);for(let f=0;f<=d;f++){const p=f/d*Math.PI*2+r()*.3,g=c*(.7+r()*.4),x=a+Math.cos(p)*g,m=l+Math.sin(p)*g*.8;f===0?i.moveTo(x,m):i.lineTo(x,m)}i.closePath(),i.fill()}i.strokeStyle="rgba(20,16,12,0.5)",i.lineWidth=1.4;for(let o=0;o<7;o++){i.beginPath();let a=r()*96,l=r()*96;i.moveTo(a,l);for(let c=0;c<5;c++)a+=(r()-.5)*26,l+=(r()-.5)*26,i.lineTo(a,l);i.stroke()}return Us(n)}function fc(s=43){const{c:n,ctx:i}=Mn(96,96),r=zn(s);i.fillStyle="#161514",i.fillRect(0,0,96,96);const o=32;for(let a=0;a<96;a+=o)for(let l=0;l<96;l+=o){const c=40+Math.floor(r()*20);i.fillStyle=`rgb(${c},${c*.98|0},${c*.94|0})`,i.fillRect(l+2,a+2,o-4,o-4),i.fillStyle="rgba(0,0,0,0.4)",i.fillRect(l+2,a+o-4,o-4,2),i.fillStyle="rgba(255,255,255,0.05)",i.fillRect(l+2,a+2,o-4,1),r()<.3&&(i.strokeStyle="rgba(0,0,0,0.35)",i.lineWidth=1,i.beginPath(),i.moveTo(l+6+r()*10,a+6),i.lineTo(l+8+r()*12,a+o-6),i.stroke())}return Us(n)}function Sa(s=61){return Mi(o_)}function Ta(s=63){return Mi(a_)}function pc(s=65){const{c:n,ctx:i}=Mn(128,300);i.clearRect(0,0,128,300);const r=zn(s),o=128/2,a=r()<.35,l=(r()-.5)*12,c=300*.8;i.beginPath(),i.moveTo(o-8,300),i.lineTo(o-5,c),i.lineTo(o+5,c),i.lineTo(o+8,300),i.closePath();const h=i.createLinearGradient(o-8,0,o+8,0);h.addColorStop(0,"#2a1c0f"),h.addColorStop(.5,"#553a20"),h.addColorStop(1,"#20150a"),i.fillStyle=h,i.fill();const d=7,f=300*.04,p=300*.84;for(let g=0;g<d;g++){const x=g/(d-1),m=f+(p-f)*x,u=10+x*(128*.46),S=(p-f)/d*2.1,w=30+l;i.fillStyle=`rgb(${w*.55|0},${w+22|0},${w*.5|0})`,i.beginPath(),i.moveTo(o,m-S*.25);const _=7;for(let y=0;y<=_;y++){const M=o+u*(y/_),R=(y%2===0?.86:1)*S;i.lineTo(M,m+R)}for(let y=_;y>=0;y--){const M=o-u*(y/_),R=(y%2===0?.86:1)*S;i.lineTo(M,m+R)}i.closePath(),i.fill()}for(let g=0;g<d;g++){const x=g/(d-1),m=f+(p-f)*x+2,u=(10+x*(128*.46))*.82,S=(p-f)/d*1.9,w=62+Math.floor(r()*20)+l;i.fillStyle=`rgb(${w*.5|0},${w+30|0},${w*.45|0})`,i.beginPath(),i.moveTo(o,m),i.lineTo(o+u,m+S*.92),i.lineTo(o-u,m+S*.92),i.closePath(),i.fill(),i.fillStyle=`rgba(${w*.7|0},${w+60|0},${w*.5|0},0.5)`,i.beginPath(),i.moveTo(o,m),i.lineTo(o-u*.7,m+S*.8),i.lineTo(o-u*.1,m+S*.8),i.closePath(),i.fill();for(let _=0;_<12;_++){const y=r()<.5?-1:1,M=u*(.4+r()*.62);i.fillStyle=`rgba(${w*.45|0},${w+14|0},${w*.4|0},0.85)`,i.beginPath(),i.arc(o+y*M,m+S*(.55+r()*.4),1.4+r()*2.4,0,Math.PI*2),i.fill()}a&&(i.fillStyle="rgba(238,244,255,0.8)",i.beginPath(),i.moveTo(o,m+1),i.lineTo(o+u*.3,m+S*.34),i.lineTo(o-u*.3,m+S*.34),i.closePath(),i.fill())}return is(n)}function f_(s=75){const{c:n,ctx:i}=Mn(128,96);i.clearRect(0,0,128,96);const r=zn(s),o=128/2,a=96*.98,l=9+(r()*5|0);for(let c=0;c<l;c++){const h=-Math.PI/2+(c/(l-1)-.5)*1.7+(r()-.5)*.2,d=96*(.5+r()*.45),f=60+Math.floor(r()*40);i.strokeStyle=`rgb(${f*.42|0},${f},${f*.34|0})`,i.lineWidth=2.4;const p=o+Math.cos(h)*d,g=a+Math.sin(h)*d,x=o+Math.cos(h)*d*.5+(r()-.5)*8,m=a+Math.sin(h)*d*.5;i.beginPath(),i.moveTo(o,a),i.quadraticCurveTo(x,m,p,g),i.stroke(),i.lineWidth=1;for(let u=.25;u<1;u+=.16){const S=o+(p-o)*u,w=a+(g-a)*u;i.beginPath(),i.moveTo(S,w),i.lineTo(S-5,w-3),i.moveTo(S,w),i.lineTo(S+5,w-3),i.stroke()}}return is(n)}function p_(s=67){const{c:n,ctx:i}=Mn(128,96);i.clearRect(0,0,128,96);const r=zn(s),o=128/2,a=96*.94,l=12;for(let c=0;c<l;c++){const h=o+(r()-.5)*128*.8,d=a-r()*96*.72,f=12+r()*18,p=54+Math.floor(r()*40),g=i.createRadialGradient(h,d-f*.3,f*.2,h,d,f);g.addColorStop(0,`rgb(${p*.6|0},${p+40},${p*.5|0})`),g.addColorStop(1,`rgb(${p*.4|0},${p*.8|0},${p*.4|0})`),i.fillStyle=g,i.beginPath(),i.arc(h,d,f,0,Math.PI*2),i.fill()}for(let c=0;c<5;c++)i.fillStyle="rgba(150,40,50,0.8)",i.beginPath(),i.arc(o+(r()-.5)*128*.6,a-r()*96*.5,1.6,0,Math.PI*2),i.fill();return is(n)}function mc(s=69){const{c:n,ctx:i}=Mn(128,96);i.clearRect(0,0,128,96);const r=zn(s),o=(a,l,c)=>{i.fillStyle="#e7e2d2",i.beginPath(),i.ellipse(a,l,c,c*.9,0,0,Math.PI*2),i.fill(),i.fillStyle="#d8d2c0",i.beginPath(),i.ellipse(a,l+c*.7,c*.6,c*.4,0,0,Math.PI*2),i.fill(),i.fillStyle="#2a2620",i.beginPath(),i.ellipse(a-c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.ellipse(a+c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.fill(),i.beginPath(),i.moveTo(a,l+c*.1),i.lineTo(a-c*.12,l+c*.4),i.lineTo(a+c*.12,l+c*.4),i.fill()};i.strokeStyle="#d5cfbe",i.lineWidth=3;for(let a=0;a<6;a++){const l=20+r()*88,c=96*.7+r()*96*.22;i.beginPath(),i.moveTo(l,c),i.lineTo(l+(r()-.5)*34,c+(r()-.5)*10),i.stroke()}return o(128*.5,96*.72,15),o(128*.32,96*.8,12),o(128*.68,96*.8,12),o(128*.46,96*.5,13),is(n)}function cr(s=47){const{c:n,ctx:i}=Mn(96,96),r=zn(s);i.fillStyle="#0f0e0d",i.fillRect(0,0,96,96);const o=18;for(let a=0,l=0;a<96;a+=o,l++){const c=l%2?18:0;for(let h=-18;h<96;h+=36){const d=h+c,f=44+Math.floor(r()*20);i.fillStyle=`rgb(${f*.9|0},${f},${f*.86|0})`,i.fillRect(d+1,a+1,34,o-2),i.fillStyle="rgba(0,0,0,0.45)",i.fillRect(d+1,a+o-3,34,2),i.fillStyle="rgba(255,255,255,0.06)",i.fillRect(d+1,a+1,34,1),r()<.35&&(i.fillStyle=`rgba(70,90,50,${.18+r()*.2})`,i.beginPath(),i.ellipse(d+6+r()*20,a+4+r()*8,5,3,0,0,Math.PI*2),i.fill())}}return Us(n)}const m_=""+new URL("wpn_sword-CpsgndpE.png",import.meta.url).href,g_=""+new URL("wpn_greatsword-C2mQEgxH.png",import.meta.url).href,__=""+new URL("wpn_axe-CvCTYMUq.png",import.meta.url).href,x_=""+new URL("wpn_dagger-BBXQkEIm.png",import.meta.url).href,v_=""+new URL("wpn_rapier-dNk4ndjW.png",import.meta.url).href,b_=""+new URL("wpn_maul-DbliXABw.png",import.meta.url).href,M_=""+new URL("wpn_mace-tTLR-MzC.png",import.meta.url).href,w_=""+new URL("wpn_staff-DGpAnpDH.png",import.meta.url).href,y_=""+new URL("wpn_shield-Bw_-3z5v.png",import.meta.url).href,S_=""+new URL("wpn_orb-BsomjHDA.png",import.meta.url).href,gc={ry:0,rx:0,rz:16,tx:0,ty:2,s:1},T_={slash:{wind:{ry:44,rx:-8,rz:36,tx:12,ty:4,s:.96},hit:{ry:-42,rx:16,rz:-42,tx:-26,ty:-8,s:1.18},follow:{ry:-16,rx:7,rz:-24,tx:-12,ty:-2,s:1.02},windup:105,strike:190,recover:190,cooldown:560,weight:1,fx:"arc"},quickslash:{wind:{ry:44,rx:-8,rz:36,tx:12,ty:4,s:.94},hit:{ry:-42,rx:16,rz:-42,tx:-26,ty:-8,s:1.16},follow:{ry:-16,rx:7,rz:-24,tx:-12,ty:-2,s:1},windup:45,strike:100,recover:95,cooldown:300,weight:.85,fx:"arc"},chop:{wind:{ry:-22,rx:-26,rz:22,tx:6,ty:-2,s:.96},hit:{ry:18,rx:40,rz:-18,tx:-12,ty:9,s:1.22},follow:{ry:8,rx:17,rz:-10,tx:-6,ty:8,s:1.05},windup:150,strike:230,recover:220,cooldown:820,weight:1.6,fx:"arcBig"},smash:{wind:{ry:-16,rx:-32,rz:16,tx:2,ty:0,s:.98},hit:{ry:12,rx:50,rz:-6,tx:-6,ty:13,s:1.36},follow:{ry:6,rx:21,rz:-2,tx:-2,ty:9,s:1.08},windup:220,strike:320,recover:300,cooldown:1200,weight:2.4,fx:"smashwave"},lunge:{wind:{ry:6,rx:-10,rz:4,tx:9,ty:17,s:.8},hit:{ry:-4,rx:42,rz:-22,tx:-15,ty:-16,s:1.46},follow:{ry:-2,rx:24,rz:-14,tx:-9,ty:-6,s:1.18},windup:110,strike:85,recover:155,cooldown:420,weight:.9,fx:"streak"},swipe:{wind:{ry:40,rx:-8,rz:44,tx:12,ty:4,s:.96},hit:{ry:-42,rx:12,rz:-50,tx:-26,ty:-4,s:1.16},follow:{ry:-14,rx:4,rz:-24,tx:-10,ty:0,s:1},windup:120,strike:205,recover:200,cooldown:640,weight:1.1,fx:"arc"},axeChop:{wind:{ry:6,rx:-14,rz:14,tx:5,ty:-22,s:.94},hit:{ry:-12,rx:22,rz:-20,tx:-9,ty:24,s:1.18},follow:{ry:-8,rx:14,rz:-14,tx:-5,ty:16,s:1.06},windup:150,strike:230,recover:220,cooldown:820,weight:1.6,fx:"arcBig",imgSpin:{wind:34,hit:-76,follow:-34}},maulSmash:{wind:{ry:6,rx:-16,rz:12,tx:4,ty:-24,s:.96},hit:{ry:-12,rx:24,rz:-18,tx:-7,ty:28,s:1.3},follow:{ry:-8,rx:15,rz:-12,tx:-4,ty:18,s:1.08},windup:220,strike:320,recover:300,cooldown:1200,weight:2.4,fx:"smashwave",imgSpin:{wind:30,hit:-56,follow:-26}}},So=[{id:"sword",name:"Espada",url:m_,slot:"main",grip:"1h",style:"slash",scale:1,dmg:1,cls:"Guerreiro"},{id:"greatsword",name:"Espadão",url:g_,slot:"main",grip:"2h",style:"smash",scale:1.2,dmg:3,cls:"Guerreiro",cooldown:1150},{id:"axe",name:"Machado",url:__,slot:"main",grip:"1h",style:"axeChop",scale:1,dmg:2,cls:"Guerreiro"},{id:"dagger",name:"Adaga",url:x_,slot:"main",grip:"1h",style:"quickslash",scale:.64,dmg:1,cls:"Ladino",cooldown:280},{id:"rapier",name:"Rapieira",url:v_,slot:"main",grip:"1h",style:"lunge",scale:1.05,dmg:1,cls:"Ladino",cooldown:420},{id:"maul",name:"Marreta",url:b_,slot:"main",grip:"2h",style:"maulSmash",scale:1.12,dmg:3,cls:"Clérigo",cooldown:1260},{id:"mace",name:"Maça",url:M_,slot:"main",grip:"1h",style:"chop",scale:.96,dmg:2,cls:"Clérigo"},{id:"staff",name:"Cajado",url:w_,slot:"main",grip:"2h",style:"swipe",scale:1.06,dmg:1,cls:"Mago",tint:"arcane"},{id:"shield",name:"Escudo",url:y_,slot:"off",grip:"1h",style:"slash",scale:.9,dmg:0,cls:"Guerreiro"},{id:"orb",name:"Orbe",url:S_,slot:"off",grip:"1h",style:"swipe",scale:.8,dmg:0,cls:"Mago",tint:"arcane"}],E_=Object.fromEntries(So.map(s=>[s.id,s])),hh=""+new URL("sk_clerigo_01-m02oqn3i.png",import.meta.url).href,dh=""+new URL("sk_clerigo_02-gPq2kyAZ.png",import.meta.url).href,uh=""+new URL("sk_clerigo_03-BC61m31x.png",import.meta.url).href,fh=""+new URL("sk_clerigo_04-DkEHRfvV.png",import.meta.url).href,ph=""+new URL("sk_clerigo_05-dnCPnZU3.png",import.meta.url).href,mh=""+new URL("sk_clerigo_06-BSo7ILHo.png",import.meta.url).href,gh=""+new URL("sk_clerigo_07-CjoSnkTy.png",import.meta.url).href,_h=""+new URL("sk_clerigo_08-DCl_nzII.png",import.meta.url).href,xh=""+new URL("sk_clerigo_09-Ba1vsp2b.png",import.meta.url).href,vh=""+new URL("sk_clerigo_10-mdVYVSAr.png",import.meta.url).href,bh=""+new URL("sk_clerigo_11-CjethmxR.png",import.meta.url).href,Mh=""+new URL("sk_clerigo_12-C7S2ppC_.png",import.meta.url).href,wh=""+new URL("sk_clerigo_13-2ncy5aSV.png",import.meta.url).href,yh=""+new URL("sk_clerigo_14-848kFmaR.png",import.meta.url).href,Sh=""+new URL("sk_clerigo_15-DcclFDYX.png",import.meta.url).href,Th=""+new URL("sk_guerreiro_01-D_DvW5ng.png",import.meta.url).href,Eh=""+new URL("sk_guerreiro_02-FBO4q1oa.png",import.meta.url).href,Ah=""+new URL("sk_guerreiro_03-CUWaFsIC.png",import.meta.url).href,Rh=""+new URL("sk_guerreiro_04-DV0sbKF9.png",import.meta.url).href,Ch=""+new URL("sk_guerreiro_05-rJJiQi-5.png",import.meta.url).href,Lh=""+new URL("sk_guerreiro_06-Bx2EDwMO.png",import.meta.url).href,Ph=""+new URL("sk_guerreiro_07-97R_0COd.png",import.meta.url).href,Uh=""+new URL("sk_guerreiro_08-UGcmyoGh.png",import.meta.url).href,Dh=""+new URL("sk_guerreiro_09-CDQwpzrD.png",import.meta.url).href,Ih=""+new URL("sk_guerreiro_10-BZXnW6l3.png",import.meta.url).href,kh=""+new URL("sk_guerreiro_11-CSJNGa0I.png",import.meta.url).href,Nh=""+new URL("sk_guerreiro_12-CWNNgDQ8.png",import.meta.url).href,Fh=""+new URL("sk_guerreiro_13-oyA7SeL2.png",import.meta.url).href,Oh=""+new URL("sk_guerreiro_14-CDK00urm.png",import.meta.url).href,Bh=""+new URL("sk_guerreiro_15-vYbsrG8W.png",import.meta.url).href,zh=""+new URL("sk_ladino_01-D7vColft.png",import.meta.url).href,Hh=""+new URL("sk_ladino_02-4cW8vrhW.png",import.meta.url).href,Gh=""+new URL("sk_ladino_03-BrcSubEV.png",import.meta.url).href,Vh=""+new URL("sk_ladino_04-GxMm6DeJ.png",import.meta.url).href,Wh=""+new URL("sk_ladino_05-BrLAnd-q.png",import.meta.url).href,Xh=""+new URL("sk_ladino_06-D1z7SCpz.png",import.meta.url).href,qh=""+new URL("sk_ladino_07-B7RhJ0wt.png",import.meta.url).href,$h=""+new URL("sk_ladino_08-D4FbpQ9F.png",import.meta.url).href,Yh=""+new URL("sk_ladino_09-faeULULl.png",import.meta.url).href,jh=""+new URL("sk_ladino_10-cZSfMIhT.png",import.meta.url).href,Zh=""+new URL("sk_ladino_11-CDqqIQHS.png",import.meta.url).href,Kh=""+new URL("sk_ladino_12-CZDoISs5.png",import.meta.url).href,Jh=""+new URL("sk_ladino_13-DsM2ayWP.png",import.meta.url).href,Qh=""+new URL("sk_ladino_14-D3917R8E.png",import.meta.url).href,td=""+new URL("sk_ladino_15-B5aZcXUE.png",import.meta.url).href,ed=""+new URL("sk_mago_01-CXK3NXsg.png",import.meta.url).href,nd=""+new URL("sk_mago_02-wMfvdygl.png",import.meta.url).href,id=""+new URL("sk_mago_03-DuqDF8qS.png",import.meta.url).href,sd=""+new URL("sk_mago_04-FHIO0qBl.png",import.meta.url).href,rd=""+new URL("sk_mago_05-D3v0cqW2.png",import.meta.url).href,ad=""+new URL("sk_mago_06-BifuIDkE.png",import.meta.url).href,od=""+new URL("sk_mago_07-DVhdUIDL.png",import.meta.url).href,ld=""+new URL("sk_mago_08-DODapwyo.png",import.meta.url).href,cd=""+new URL("sk_mago_09-B1FddkFu.png",import.meta.url).href,hd=""+new URL("sk_mago_10-BJROR30h.png",import.meta.url).href,dd=""+new URL("sk_mago_11-DgeCLkpn.png",import.meta.url).href,ud=""+new URL("sk_mago_12-DNW7MwiE.png",import.meta.url).href,fd=""+new URL("sk_mago_13-B3xLYzpF.png",import.meta.url).href,pd=""+new URL("sk_mago_14-BkU-TOV-.png",import.meta.url).href,md=""+new URL("sk_mago_15-B9MA9n-l.png",import.meta.url).href,gd=""+new URL("sk_passive_01-BybXLWP1.png",import.meta.url).href,_d=""+new URL("sk_passive_02-yMe2uQlm.png",import.meta.url).href,xd=""+new URL("sk_passive_03-CfLR3Po9.png",import.meta.url).href,vd=""+new URL("sk_passive_04-BxwW4T3S.png",import.meta.url).href,bd=""+new URL("sk_passive_05-aKrH619S.png",import.meta.url).href,Md=""+new URL("sk_passive_06-C8qd30Xb.png",import.meta.url).href,wd=""+new URL("sk_passive_07-C4-U9Z10.png",import.meta.url).href,yd=""+new URL("sk_passive_08-Ql7Qlb7A.png",import.meta.url).href,Sd=""+new URL("sk_passive_09-DuzOFh2V.png",import.meta.url).href,Td=""+new URL("sk_passive_10-BEytT8Z3.png",import.meta.url).href,Ed=""+new URL("sk_passive_11-BNx9pVVc.png",import.meta.url).href,Ad=""+new URL("sk_passive_12-ChLS0a2U.png",import.meta.url).href,Rd=""+new URL("sk_passive_13-Db0gOpKs.png",import.meta.url).href,Cd=""+new URL("sk_passive_14-Dgyd0quO.png",import.meta.url).href,Ld=""+new URL("sk_passive_15-B_UeHSwf.png",import.meta.url).href,Pd=""+new URL("sk_passive_16-TWzCSpNO.png",import.meta.url).href,A_=""+new URL("bg_guerreiro-DWgmGaUG.jpg",import.meta.url).href,R_=""+new URL("bg_ladino-B6L4a-g-.jpg",import.meta.url).href,C_=""+new URL("bg_mago-Bct2J94D.jpg",import.meta.url).href,L_=""+new URL("bg_clerigo-BUhJVnRj.jpg",import.meta.url).href,P_=Object.assign({"../assets/ui/skills/sk_clerigo_01.png":hh,"../assets/ui/skills/sk_clerigo_02.png":dh,"../assets/ui/skills/sk_clerigo_03.png":uh,"../assets/ui/skills/sk_clerigo_04.png":fh,"../assets/ui/skills/sk_clerigo_05.png":ph,"../assets/ui/skills/sk_clerigo_06.png":mh,"../assets/ui/skills/sk_clerigo_07.png":gh,"../assets/ui/skills/sk_clerigo_08.png":_h,"../assets/ui/skills/sk_clerigo_09.png":xh,"../assets/ui/skills/sk_clerigo_10.png":vh,"../assets/ui/skills/sk_clerigo_11.png":bh,"../assets/ui/skills/sk_clerigo_12.png":Mh,"../assets/ui/skills/sk_clerigo_13.png":wh,"../assets/ui/skills/sk_clerigo_14.png":yh,"../assets/ui/skills/sk_clerigo_15.png":Sh,"../assets/ui/skills/sk_guerreiro_01.png":Th,"../assets/ui/skills/sk_guerreiro_02.png":Eh,"../assets/ui/skills/sk_guerreiro_03.png":Ah,"../assets/ui/skills/sk_guerreiro_04.png":Rh,"../assets/ui/skills/sk_guerreiro_05.png":Ch,"../assets/ui/skills/sk_guerreiro_06.png":Lh,"../assets/ui/skills/sk_guerreiro_07.png":Ph,"../assets/ui/skills/sk_guerreiro_08.png":Uh,"../assets/ui/skills/sk_guerreiro_09.png":Dh,"../assets/ui/skills/sk_guerreiro_10.png":Ih,"../assets/ui/skills/sk_guerreiro_11.png":kh,"../assets/ui/skills/sk_guerreiro_12.png":Nh,"../assets/ui/skills/sk_guerreiro_13.png":Fh,"../assets/ui/skills/sk_guerreiro_14.png":Oh,"../assets/ui/skills/sk_guerreiro_15.png":Bh,"../assets/ui/skills/sk_ladino_01.png":zh,"../assets/ui/skills/sk_ladino_02.png":Hh,"../assets/ui/skills/sk_ladino_03.png":Gh,"../assets/ui/skills/sk_ladino_04.png":Vh,"../assets/ui/skills/sk_ladino_05.png":Wh,"../assets/ui/skills/sk_ladino_06.png":Xh,"../assets/ui/skills/sk_ladino_07.png":qh,"../assets/ui/skills/sk_ladino_08.png":$h,"../assets/ui/skills/sk_ladino_09.png":Yh,"../assets/ui/skills/sk_ladino_10.png":jh,"../assets/ui/skills/sk_ladino_11.png":Zh,"../assets/ui/skills/sk_ladino_12.png":Kh,"../assets/ui/skills/sk_ladino_13.png":Jh,"../assets/ui/skills/sk_ladino_14.png":Qh,"../assets/ui/skills/sk_ladino_15.png":td,"../assets/ui/skills/sk_mago_01.png":ed,"../assets/ui/skills/sk_mago_02.png":nd,"../assets/ui/skills/sk_mago_03.png":id,"../assets/ui/skills/sk_mago_04.png":sd,"../assets/ui/skills/sk_mago_05.png":rd,"../assets/ui/skills/sk_mago_06.png":ad,"../assets/ui/skills/sk_mago_07.png":od,"../assets/ui/skills/sk_mago_08.png":ld,"../assets/ui/skills/sk_mago_09.png":cd,"../assets/ui/skills/sk_mago_10.png":hd,"../assets/ui/skills/sk_mago_11.png":dd,"../assets/ui/skills/sk_mago_12.png":ud,"../assets/ui/skills/sk_mago_13.png":fd,"../assets/ui/skills/sk_mago_14.png":pd,"../assets/ui/skills/sk_mago_15.png":md,"../assets/ui/skills/sk_passive_01.png":gd,"../assets/ui/skills/sk_passive_02.png":_d,"../assets/ui/skills/sk_passive_03.png":xd,"../assets/ui/skills/sk_passive_04.png":vd,"../assets/ui/skills/sk_passive_05.png":bd,"../assets/ui/skills/sk_passive_06.png":Md,"../assets/ui/skills/sk_passive_07.png":wd,"../assets/ui/skills/sk_passive_08.png":yd,"../assets/ui/skills/sk_passive_09.png":Sd,"../assets/ui/skills/sk_passive_10.png":Td,"../assets/ui/skills/sk_passive_11.png":Ed,"../assets/ui/skills/sk_passive_12.png":Ad,"../assets/ui/skills/sk_passive_13.png":Rd,"../assets/ui/skills/sk_passive_14.png":Cd,"../assets/ui/skills/sk_passive_15.png":Ld,"../assets/ui/skills/sk_passive_16.png":Pd}),$o=s=>P_[`../assets/ui/skills/${s}.png`],U_=["dmg","mdmg","life","mana","def","mres","prec","crit","critd","eva","aspd","leech","poison","regen","cdr","block"],Yo={};U_.forEach((s,t)=>{const e=$o(`sk_passive_${String(t+1).padStart(2,"0")}`);e&&(Yo[s]=e)});Yo.rage=$o("sk_passive_02");const _c={dmg:{sym:"⚔",color:"#d9694c",label:"Dano Físico"},mdmg:{sym:"✦",color:"#8a6cff",label:"Dano Mágico"},life:{sym:"❤",color:"#e0564c",label:"Vida"},mana:{sym:"◆",color:"#4f9be0",label:"Mana"},def:{sym:"🛡",color:"#9fb0c4",label:"Defesa"},mres:{sym:"◈",color:"#7fa0d8",label:"Resist. Mágica"},prec:{sym:"◎",color:"#d8c86a",label:"Precisão"},crit:{sym:"✸",color:"#e0b84c",label:"Chance Crítica"},critd:{sym:"✷",color:"#e08a3c",label:"Dano Crítico"},eva:{sym:"≈",color:"#9fd8c0",label:"Evasão"},aspd:{sym:"⚡",color:"#e6d24a",label:"Vel. de Ataque"},leech:{sym:"❦",color:"#c0463c",label:"Roubo de Vida"},poison:{sym:"☣",color:"#7fc04c",label:"Veneno"},regen:{sym:"✚",color:"#7fd08a",label:"Regeneração"},cdr:{sym:"⧗",color:"#c0a0e0",label:"Redução de Recarga"},block:{sym:"⬡",color:"#b8c0cc",label:"Bloqueio"},rage:{sym:"🔥",color:"#e06a3c",label:"Fúria"}},D_={dmg:.03,mdmg:.03,life:.05,mana:.05,def:2,mres:2,prec:2,crit:.02,critd:.06,eva:.02,aspd:.03,leech:.02,poison:.04,regen:1,cdr:.03,block:.02,rage:.04};function I_(s){const t={};for(const e of Object.values(Qi))if(e)for(const n of e.branches)for(const i of n.skills){const r=s[i.id]||0;r<=0||i.kind!=="passive"||!i.stat||(t[i.stat]=(t[i.stat]||0)+r*D_[i.stat])}return t}const At=(s,t,e,n,i=1)=>({id:s,name:t,kind:"active",desc:n,maxRank:i,icon:$o(e)}),Kt=(s,t,e,n,i=5)=>({id:s,name:t,kind:"passive",desc:n,maxRank:i,stat:e}),k_={classId:"guerreiro",bg:A_,branches:[{id:"armas",name:"Armas",color:"#d9a34a",skills:[At("g_golpe_poderoso","Golpe Poderoso","sk_guerreiro_01","Um golpe forte que causa dano bruto no alvo.",5),Kt("g_afiacao","Afiação","dmg","+3% Dano Físico por rank."),At("g_investida","Investida","sk_guerreiro_02","Avança até o inimigo e o atordoa por um instante.",3),Kt("g_precisao","Mira de Guerra","prec","+2 Precisão por rank."),At("g_golpe_giratorio","Golpe Giratório","sk_guerreiro_03","Gira a arma acertando todos ao redor.",5),Kt("g_gume","Gume Cruel","crit","+2% Chance Crítica por rank."),At("g_quebra_armadura","Quebra-Armadura","sk_guerreiro_04","Reduz a defesa do alvo por alguns segundos.",3),Kt("g_brutalidade","Brutalidade","critd","+8% Dano Crítico por rank."),At("g_decapitar","Decapitar","sk_guerreiro_05","Executa alvos com pouca vida, dano massivo.",3)]},{id:"baluarte",name:"Baluarte",color:"#9fb0c4",skills:[Kt("g_pele_ferro","Pele de Ferro","def","+3 Defesa por rank."),At("g_provocar","Provocar","sk_guerreiro_06","Força o inimigo a atacar você (aggro).",3),Kt("g_vigor","Vigor","life","+5% Vida por rank."),At("g_muro_escudo","Muro de Escudo","sk_guerreiro_07","Aumenta muito o bloqueio por um tempo.",5),Kt("g_fortaleza","Fortaleza","mres","+2 Resist. Mágica por rank."),At("g_reflexao","Reflexão","sk_guerreiro_08","Ao bloquear, reflete parte do dano.",3),Kt("g_guarda","Guarda Firme","block","+3% Bloqueio por rank."),At("g_aco_absoluto","Aço Absoluto","sk_guerreiro_09","Fica imune a dano por um breve instante.",3),At("g_ultimo_suspiro","Último Suspiro","sk_guerreiro_10","Cura ao chegar perto da morte (com recarga).",3)]},{id:"furia",name:"Fúria",color:"#e0623c",skills:[Kt("g_furia_batalha","Fúria de Batalha","rage","+4% Dano quanto menor a Vida (por rank)."),At("g_grito_guerra","Grito de Guerra","sk_guerreiro_11","Grito que aumenta o dano do herói.",5),Kt("g_sede_sangue","Sede de Sangue","leech","+2% Roubo de Vida por rank."),At("g_frenesi","Frenesi","sk_guerreiro_12","Aumenta a velocidade de ataque temporariamente.",5),Kt("g_adrenalina","Adrenalina","aspd","+3% Vel. de Ataque por rank."),At("g_investida_brutal","Investida Brutal","sk_guerreiro_13","Avança causando dano e empurrando o alvo.",3),Kt("g_folego","Fôlego","regen","+1% Vida regenerada por rank."),At("g_terremoto","Terremoto","sk_guerreiro_14","Pisada que atordoa e fere em área.",3),At("g_golpe_final","Golpe Final","sk_guerreiro_15","Golpe devastador de recarga longa.",3)]}]},N_={classId:"ladino",bg:R_,branches:[{id:"assassino",name:"Assassino",color:"#d94c6a",skills:[At("l_apunhalar","Apunhalar","sk_ladino_01","Golpe pelas costas com dano crítico garantido.",5),Kt("l_precisao_letal","Precisão Letal","crit","+2% Chance Crítica por rank."),At("l_rajada_laminas","Rajada de Lâminas","sk_ladino_02","Vários golpes rápidos em sequência.",5),Kt("l_execucao","Execução","critd","+8% Dano Crítico por rank."),At("l_golpe_sombras","Golpe nas Sombras","sk_ladino_03","Teleporta atrás do alvo e ataca.",3),Kt("l_ponto_fraco","Ponto Fraco","dmg","+3% Dano em alvos com vida cheia (por rank)."),At("l_estocada","Estocada Perfurante","sk_ladino_04","Estocada que ignora parte da defesa.",3),At("l_execucao_a","Golpe Mortal","sk_ladino_05","Executa alvos com pouca vida.",3)]},{id:"sombra",name:"Sombra",color:"#7fb08a",skills:[Kt("l_reflexos","Reflexos","eva","+2% Evasão por rank."),At("l_passo_sombrio","Passo Sombrio","sk_ladino_06","Esquiva rápida reposicionando o herói.",3),Kt("l_lamina_env","Lâmina Envenenada","poison","+3% Dano de Veneno por rank."),At("l_bomba_fumaca","Bomba de Fumaça","sk_ladino_07","Solta fumaça e aumenta a evasão.",3),Kt("l_camuflagem","Camuflagem","eva","+2% Evasão ao ficar parado (por rank)."),At("l_nuvem_toxica","Nuvem Tóxica","sk_ladino_08","Nuvem venenosa que fere em área.",5),At("l_desaparecer","Desaparecer","sk_ladino_09","Some por um instante e zera a ameaça.",3),At("l_toxina","Toxina","sk_ladino_10","Aplica um veneno forte no alvo.",5)]},{id:"precisao",name:"Precisão",color:"#d8c86a",skills:[Kt("l_agilidade","Agilidade","aspd","+3% Vel. de Ataque por rank."),At("l_rajada_dupla","Rajada Dupla","sk_ladino_11","Dois golpes rápidos num só toque.",5),Kt("l_maos_rapidas","Mãos Rápidas","cdr","−2% Recarga por rank."),At("l_arremesso","Arremesso de Adaga","sk_ladino_12","Lança uma adaga à distância.",5),Kt("l_passos_leves","Passos Leves","eva","+2% Evasão ao se mover (por rank)."),At("l_contra_ataque","Contra-Ataque","sk_ladino_13","Revida ao esquivar de um golpe.",3),Kt("l_olhar","Olhar Aguçado","prec","+2 Precisão por rank."),At("l_danca_laminas","Dança das Lâminas","sk_ladino_14","Gira acertando vários alvos ao redor.",5),At("l_marca_mortal","Marca Mortal","sk_ladino_15","Marca o alvo: ele recebe mais dano.",3)]}]},F_={classId:"mago",bg:C_,branches:[{id:"chamas",name:"Chamas",color:"#e0672c",skills:[At("m_bola_fogo","Bola de Fogo","sk_mago_01","Lança um projétil flamejante no alvo.",5),Kt("m_piromania","Piromania","mdmg","+3% Dano de Fogo por rank."),At("m_explosao_fogo","Explosão de Fogo","sk_mago_02","Explosão que fere em área.",5),Kt("m_combustao","Combustão","crit","+2% chance de magia crítica por rank."),At("m_meteoro","Meteoro","sk_mago_03","Invoca um meteoro devastador em área.",3),Kt("m_chama_persist","Chama Persistente","poison","+3% Dano de queimadura por rank."),At("m_muralha_fogo","Muralha de Fogo","sk_mago_04","Cria uma zona de fogo contínua.",3),At("m_imolacao","Imolação","sk_mago_05","Aura ardente que queima inimigos próximos.",5)]},{id:"gelo_arcano",name:"Gelo & Arcano",color:"#4f9be0",skills:[Kt("m_frieza","Frieza","mres","+2 Resist. Mágica por rank."),At("m_nova_gelo","Nova de Gelo","sk_mago_06","Congela os inimigos ao redor.",5),Kt("m_foco_arcano","Foco Arcano","cdr","−2% Recarga por rank."),At("m_lanca_gelo","Lança de Gelo","sk_mago_07","Estilhaço de gelo que perfura.",5),Kt("m_barreira","Barreira","def","+2 Defesa por rank."),At("m_escudo_arcano","Escudo Arcano","sk_mago_08","Escudo que absorve dano por um tempo.",5),At("m_teleporte","Teleporte","sk_mago_09","Reposiciona instantaneamente.",3),At("m_prisao_gelo","Prisão de Gelo","sk_mago_10","Prende o alvo num bloco de gelo.",3)]},{id:"tempestade",name:"Tempestade",color:"#9a6cff",skills:[At("m_raio_arcano","Raio Arcano","sk_mago_11","Raio que atinge o alvo em linha.",5),Kt("m_conducao","Condução","mdmg","+3% Dano de Raio por rank."),At("m_corrente","Corrente","sk_mago_12","Raio que salta entre vários inimigos.",5),Kt("m_estatica","Estática","crit","+2% chance de atordoar por rank."),At("m_tempestade","Tempestade","sk_mago_13","Tempestade que fere em área continuamente.",3),Kt("m_energia","Energia","mana","+5% Mana por rank."),At("m_descarga","Descarga","sk_mago_14","Explosão de energia instantânea.",3),At("m_nova_arcana","Nova Arcana","sk_mago_15","Nova arcana que arrasa tudo em volta.",3)]}]},O_={classId:"clerigo",bg:L_,branches:[{id:"luz",name:"Luz",color:"#e6d38a",skills:[At("c_cura","Cura","sk_clerigo_01","Restaura vida do herói.",5),Kt("c_fe","Fé","regen","+3% Poder de Cura por rank."),At("c_cura_area","Cura em Área","sk_clerigo_02","Cura em volta do herói.",5),Kt("c_graca","Graça","mana","+4% Regeneração de Mana por rank."),At("c_bencao","Bênção","sk_clerigo_03","Abençoa o herói, aumentando atributos.",3),Kt("c_vigor_divino","Vigor Divino","life","+4% Vida por rank."),At("c_aura_protecao","Aura de Proteção","sk_clerigo_04","Reduz o dano recebido por um tempo.",3),At("c_renovacao","Renovação","sk_clerigo_05","Cura contínua ao longo do tempo.",5)]},{id:"julgamento",name:"Julgamento",color:"#e0a63c",skills:[At("c_martelo_sagrado","Martelo Sagrado","sk_clerigo_06","Golpe de dano sagrado no alvo.",5),Kt("c_zelo","Zelo","mdmg","+3% Dano Sagrado por rank."),At("c_punicao","Punição","sk_clerigo_07","Fere e reduz a cura do alvo.",5),Kt("c_conviccao","Convicção","dmg","+3% Dano com a vida cheia (por rank)."),At("c_luz_radiante","Luz Radiante","sk_clerigo_08","Explosão de luz que fere em área.",5),Kt("c_fervor","Fervor","aspd","+3% Vel. de conjuração por rank."),At("c_selo_sagrado","Selo Sagrado","sk_clerigo_09","Selo que explode após alguns segundos.",3),At("c_condenacao","Condenação","sk_clerigo_10","Pilar de luz sagrada de grande dano.",3)]},{id:"fe",name:"Fé",color:"#cbb8e0",skills:[Kt("c_devocao","Devoção","mres","+2 Resist. Mágica por rank."),At("c_escudo_divino","Escudo Divino","sk_clerigo_11","Fica imune a dano por um breve instante.",3),Kt("c_perseveranca","Perseverança","regen","+1% Vida regenerada por rank."),At("c_repreensao","Repreensão","sk_clerigo_12","Clarão que atordoa os inimigos.",3),Kt("c_martir","Mártir","leech","+2% do dano causado vira cura (por rank)."),At("c_intervencao","Intervenção","sk_clerigo_13","Cura forte + escudo instantâneo.",3),At("c_ressurreicao","Ressurreição","sk_clerigo_14","Revive automaticamente uma vez (recarga longa).",1),At("c_aura_fe","Aura de Fé","sk_clerigo_15","Aura que fortalece o herói continuamente.",5)]}]},Qi={guerreiro:k_,ladino:N_,mago:F_,clerigo:O_},ze=(s,t,e)=>({target:"enemy",melee:!0,range:1,effect:"dmg",magic:!1,power:s,mana:t,cd:e}),Te=(s,t,e,n,i=!0)=>({target:"enemy",melee:!1,range:t,effect:"dmg",magic:i,power:s,mana:e,cd:n}),Hi=(s,t,e)=>({target:"self",melee:!1,range:0,effect:"heal",magic:!0,power:s,mana:t,cd:e}),Be=s=>({target:"self",melee:!1,range:0,effect:"buff",magic:!1,power:0,mana:s.mana,cd:s.cd,atkMul:s.atkMul,defReduc:s.defReduc,dur:s.dur}),B_={g_golpe_poderoso:ze(16,12,4e3),g_investida:ze(12,10,6e3),g_golpe_giratorio:ze(16,14,6e3),g_quebra_armadura:ze(12,10,7e3),g_decapitar:ze(26,18,1e4),g_provocar:Be({defReduc:.25,dur:6e3,mana:8,cd:1e4}),g_muro_escudo:Be({defReduc:.5,dur:6e3,mana:14,cd:14e3}),g_reflexao:Be({defReduc:.3,dur:6e3,mana:12,cd:12e3}),g_aco_absoluto:Be({defReduc:.9,dur:3e3,mana:20,cd:2e4}),g_ultimo_suspiro:Hi(90,20,16e3),g_grito_guerra:Be({atkMul:1.5,dur:8e3,mana:14,cd:14e3}),g_frenesi:Be({atkMul:1.35,dur:8e3,mana:12,cd:12e3}),g_investida_brutal:ze(18,14,8e3),g_terremoto:ze(24,18,11e3),g_golpe_final:ze(40,30,18e3),l_apunhalar:ze(18,12,4e3),l_rajada_laminas:ze(16,14,6e3),l_golpe_sombras:ze(18,14,7e3),l_estocada:ze(14,10,6e3),l_execucao_a:ze(26,18,1e4),l_passo_sombrio:Be({defReduc:.4,dur:4e3,mana:8,cd:9e3}),l_bomba_fumaca:Be({defReduc:.5,dur:5e3,mana:12,cd:12e3}),l_nuvem_toxica:Te(12,3,14,8e3,!1),l_desaparecer:Be({defReduc:.8,dur:2500,mana:16,cd:16e3}),l_toxina:Te(10,2,10,7e3,!1),l_rajada_dupla:ze(14,10,4e3),l_arremesso:Te(16,4,12,5e3,!1),l_contra_ataque:Be({atkMul:1.3,dur:6e3,mana:10,cd:1e4}),l_danca_laminas:ze(18,16,8e3),l_marca_mortal:Te(10,4,10,9e3,!1),m_bola_fogo:Te(18,5,12,3500),m_explosao_fogo:Te(18,4,14,6e3),m_meteoro:Te(40,5,30,16e3),m_muralha_fogo:Te(16,4,16,9e3),m_imolacao:Te(12,2,12,7e3),m_nova_gelo:Te(16,3,14,6e3),m_lanca_gelo:Te(18,5,12,4500),m_escudo_arcano:Be({defReduc:.5,dur:6e3,mana:14,cd:12e3}),m_teleporte:Be({defReduc:.3,dur:2e3,mana:10,cd:1e4}),m_prisao_gelo:Te(12,4,12,9e3),m_raio_arcano:Te(18,5,12,4e3),m_corrente:Te(16,4,14,6e3),m_tempestade:Te(26,4,20,11e3),m_descarga:Te(18,3,14,6e3),m_nova_arcana:Te(40,4,30,16e3),c_cura:Hi(50,12,6e3),c_cura_area:Hi(70,18,9e3),c_bencao:Be({atkMul:1.4,dur:1e4,mana:14,cd:14e3}),c_aura_protecao:Be({defReduc:.4,dur:8e3,mana:14,cd:12e3}),c_renovacao:Hi(60,16,11e3),c_martelo_sagrado:Te(18,4,12,4e3),c_punicao:Te(16,4,12,6e3),c_luz_radiante:Te(18,3,14,6e3),c_selo_sagrado:Te(24,4,18,9e3),c_condenacao:Te(38,5,28,15e3),c_escudo_divino:Be({defReduc:.9,dur:3e3,mana:20,cd:2e4}),c_repreensao:Te(12,3,12,9e3),c_intervencao:Hi(90,22,14e3),c_ressurreicao:Hi(150,30,6e4),c_aura_fe:Be({atkMul:1.3,dur:1e4,mana:14,cd:12e3})};function To(s){return B_[s]??ze(12,8,4e3)}function z_(s){for(const t in Qi){const e=Qi[t];if(e){for(const n of e.branches)for(const i of n.skills)if(i.id===s)return i.name}}return""}function H_(s,t){const e=Qi[s];if(!e)return[];const n=[];for(const i of e.branches)for(const r of i.skills){if(r.kind!=="active")continue;const o=t[r.id]||0;o<=0||n.push({id:r.id,name:r.name,icon:r.icon,rank:o,combat:To(r.id)})}return n}const G_=""+new URL("hud_plate-B2ygb4FP.png",import.meta.url).href,V_=""+new URL("eq_frame-d-QhyRgX.png",import.meta.url).href,W_=""+new URL("eq_slot-DS9kMsLx.png",import.meta.url).href,Ud=""+new URL("eq_container-84uusXC9.png",import.meta.url).href,Ea=""+new URL("btn_base-wlebnyD3.png",import.meta.url).href,X_=""+new URL("dpad-3wZIZEqb.png",import.meta.url).href,q_=""+new URL("ico_attack-CbdvrLXs.png",import.meta.url).href,$_=""+new URL("ico_action-BRbeFgHL.png",import.meta.url).href,Y_=""+new URL("ico_inventory-B_-_sjLB.png",import.meta.url).href,j_=""+new URL("coin-CsF22FSK.png",import.meta.url).href,Aa=""+new URL("map_frame-B4piWonF.png",import.meta.url).href,Z_=""+new URL("clock_sun-DO5hSXa1.png",import.meta.url).href,K_=""+new URL("clock_moon-D1xrN5yT.png",import.meta.url).href;function J_(s,t,e,n,i,r,o,a,l){const c={};for(const O of i??[])c[O.id]=O;let h=null;const d={ArrowUp:"forward",KeyW:"forward",ArrowDown:"back",KeyS:"back",ArrowLeft:"turnLeft",KeyA:"turnLeft",ArrowRight:"turnRight",KeyD:"turnRight",KeyQ:"strafeLeft",KeyE:"strafeRight",Space:"interact",Enter:"interact",KeyF:"interact",KeyJ:"attack",KeyK:"attack"};window.addEventListener("keydown",O=>{const Y=d[O.code];Y&&(O.preventDefault(),t(Y))});let f=null,p=null,g=null,x=null,m=null,u=null,S=!1;const w=[];f=document.createElement("div"),f.id="gh-weapon-rig",p=document.createElement("img"),p.id="gh-weapon",p.src=e,p.alt="",f.appendChild(p),g=document.createElement("div"),g.id="gh-slash",g.innerHTML='<svg viewBox="0 0 240 200" preserveAspectRatio="none"><defs><linearGradient id="ghslashg" x1="0" y1="0" x2="1" y2="0.5"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.5" stop-color="#eaf6ff" stop-opacity="0.95"/><stop offset="1" stop-color="#bfe3ff" stop-opacity="0"/></linearGradient></defs><path d="M18,64 C82,20 172,30 226,112 C162,70 92,74 26,90 Z" fill="url(#ghslashg)"/><path d="M28,68 C88,30 168,42 214,104" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85"/></svg>',f.appendChild(g),s.appendChild(f),x=document.createElement("div"),x.id="gh-impact",s.appendChild(x),m=document.createElement("div"),m.id="gh-shock",s.appendChild(m),u=document.createElement("div"),u.id="gh-screenflash",s.appendChild(u);let _=null;const y=document.createElement("div");y.id="gh-hud",y.innerHTML='<div class="gh-hud-bar gh-hud-hp"><div class="gh-hud-fill gh-hud-hp-fill"></div></div><div class="gh-hud-bar gh-hud-mp"><div class="gh-hud-fill gh-hud-mp-fill"></div></div>',s.appendChild(y);const M=y.querySelector(".gh-hud-hp-fill"),R=y.querySelector(".gh-hud-mp-fill"),A=document.createElement("div");A.id="gh-map";const b=document.createElement("canvas");b.id="gh-map-canvas",b.width=132,b.height=132,A.appendChild(b);const v=document.createElement("button");v.id="gh-map-expand",v.title="Expandir mapa (M)",v.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',A.appendChild(v),s.appendChild(A);const C=b.getContext("2d"),U=4,I=document.createElement("div");I.id="gh-bigmap",I.className="gh-bigmap-hidden",I.innerHTML='<div id="gh-bigmap-win"><button id="gh-bigmap-close" title="Fechar (Esc/M)">✕</button><canvas id="gh-bigmap-canvas" width="720" height="720"></canvas></div>',s.appendChild(I);const V=I.querySelector("#gh-bigmap-canvas"),K=V.getContext("2d");let X=null;const it=()=>!I.classList.contains("gh-bigmap-hidden"),$=(O,Y,Mt,at,mt)=>{O.save(),O.translate(Y,Mt),O.rotate(mt),O.beginPath(),O.moveTo(at,0),O.lineTo(-at*.7,at*.62),O.lineTo(-at*.7,-at*.62),O.closePath(),O.fillStyle="#ffd964",O.shadowColor="rgba(255,210,90,.9)",O.shadowBlur=5,O.fill(),O.restore()},dt=O=>{const Y=C;if(!Y)return;const Mt=window.devicePixelRatio||1,at=Math.round(b.clientWidth*Mt);at>0&&b.width!==at&&(b.width=at,b.height=at);const mt=b.width,wt=b.height;Y.clearRect(0,0,mt,wt),Y.fillStyle="#0b0d12",Y.fillRect(0,0,mt,wt);const Dt=U,we=2*Dt+1,kt=Math.floor(mt/we),T=Math.floor((mt-kt*we)/2);for(let z=-Dt;z<=Dt;z++)for(let G=-Dt;G<=Dt;G++){const k=O.col+G,W=O.row+z,rt=k>=0&&k<O.cols&&W>=0&&W<O.rows;Y.fillStyle=rt?O.cells[W*O.cols+k]?"#54606f":"#171b22":"#0b0d12",Y.fillRect(T+(G+Dt)*kt,T+(z+Dt)*kt,kt-1,kt-1)}const D=T+Dt*kt+Math.floor(kt/2);$(Y,D,D,Math.max(4,kt*.42),Math.atan2(O.dr,O.dc))},_t=O=>{const Y=K;if(!Y)return;const Mt=V.width,at=V.height;Y.clearRect(0,0,Mt,at),Y.fillStyle="#0b0d12",Y.fillRect(0,0,Mt,at);const mt=12,wt=Math.max(3,Math.floor(Math.min((Mt-2*mt)/O.cols,(at-2*mt)/O.rows))),Dt=wt*O.cols,we=wt*O.rows,kt=Math.round((Mt-Dt)/2),T=Math.round((at-we)/2);for(let D=0;D<O.rows;D++)for(let z=0;z<O.cols;z++)Y.fillStyle=O.cells[D*O.cols+z]?"#5a6675":"#171b22",Y.fillRect(kt+z*wt,T+D*wt,wt-1,wt-1);$(Y,kt+O.col*wt+wt/2,T+O.row*wt+wt/2,Math.max(6,wt*.75),Math.atan2(O.dr,O.dc))},Pt=()=>{I.classList.remove("gh-bigmap-hidden"),X&&_t(X)},qt=()=>I.classList.add("gh-bigmap-hidden");v.addEventListener("click",O=>{O.preventDefault(),Pt()}),I.querySelector("#gh-bigmap-close").addEventListener("click",O=>{O.preventDefault(),qt()}),I.addEventListener("click",O=>{O.target===I&&qt()}),window.addEventListener("keydown",O=>{O.code==="KeyM"?(O.preventDefault(),it()?qt():Pt()):O.code==="Escape"&&qt()});const re=document.createElement("div");re.id="gh-clock",re.innerHTML=`<img class="gh-sun" src="${Z_}" alt="" draggable="false"/><img class="gh-moon" src="${K_}" alt="" draggable="false"/>`,s.appendChild(re);const Z=re.querySelector(".gh-sun"),st=re.querySelector(".gh-moon"),St=document.createElement("button");St.id="gh-char-btn",St.title="Personagem (C)",St.innerHTML=`<img class="gh-char-ico" src="${Y_}" alt=""/>`,s.appendChild(St);const ut=[{key:"main",label:"Arma",gc:"1 / 3",gr:"1 / 5"},{key:"off",label:"Secundária",gc:"7 / 9",gr:"1 / 5"},{key:"head",label:"Elmo",gc:"4 / 6",gr:"1 / 3"},{key:"amulet",label:"Amul.",gc:"6 / 7",gr:"2 / 3"},{key:"chest",label:"Peitoral",gc:"4 / 6",gr:"3 / 6"},{key:"ring1",label:"Anel",gc:"3 / 4",gr:"4 / 5"},{key:"ring2",label:"Anel",gc:"6 / 7",gr:"4 / 5"},{key:"hands",label:"Luvas",gc:"2 / 4",gr:"5 / 7"},{key:"belt",label:"Cinto",gc:"4 / 6",gr:"6 / 7"},{key:"feet",label:"Botas",gc:"6 / 8",gr:"5 / 7"}],Nt=O=>`<div class="gh-slot" data-slot="${O.key}" title="${O.label}" style="grid-column:${O.gc};grid-row:${O.gr}"></div>`,Jt=Array.from({length:20},(O,Y)=>`<div class="gh-bag-slot" data-bag="${Y}"></div>`).join(""),Wt=document.createElement("div");Wt.id="gh-eq",Wt.className="gh-eq-hidden",Wt.innerHTML='<div id="gh-eq-win"><button id="gh-eq-close" title="Fechar (Esc)">✕</button><div id="gh-eq-inner"><div class="gh-eq-title">Personagem</div><div class="gh-eq-tabs"><button class="gh-tab gh-tab-on" data-tab="equip">Equipamento</button><button class="gh-tab" data-tab="stats">Atributos</button><button class="gh-tab" data-tab="skills">Habilidades</button></div><div class="gh-eq-body"><div class="gh-tabpane" data-pane="equip"><div class="gh-section"><div class="gh-sec-head">Equipamentos</div><div class="gh-eq-doll">'+ut.map(Nt).join("")+`</div></div><div class="gh-section"><div class="gh-sec-head gh-sec-inv">Inventário<span class="gh-gold" id="gh-gold"><img src="${j_}" alt=""/><b>0</b></span></div><div class="gh-bag">${Jt}</div></div></div><div class="gh-tabpane gh-pane-hidden" data-pane="stats"><div class="gh-eq-stats" id="gh-eq-stats"></div></div><div class="gh-tabpane gh-pane-hidden" data-pane="skills"><div id="gh-skills"></div></div></div></div></div>`,s.appendChild(Wt),Wt.querySelectorAll(".gh-tab").forEach(O=>O.addEventListener("click",Y=>{Y.preventDefault();const Mt=O.dataset.tab;Wt.querySelectorAll(".gh-tab").forEach(at=>at.classList.toggle("gh-tab-on",at===O)),Wt.querySelectorAll(".gh-tabpane").forEach(at=>at.classList.toggle("gh-pane-hidden",at.dataset.pane!==Mt))}));const ie=Wt.querySelector("#gh-eq-stats");ie.addEventListener("click",O=>{const Y=O.target.closest(".gh-pm");if(!Y||Y.hasAttribute("disabled"))return;O.preventDefault();const Mt=Y.dataset.attr,at=Number(Y.dataset.d||"0");Mt&&at&&l?.(Mt,at)});const be=Wt.querySelector("#gh-gold b"),B=Array.from(Wt.querySelectorAll(".gh-bag-slot")),Ae=Wt.querySelector("#gh-skills");let ee="",ne=0;const Ct={};let oe=null;const It=()=>Object.values(Ct).reduce((O,Y)=>O+Y,0),L=O=>{const Y=Qi[ee];if(!Y)return null;for(const Mt of Y.branches){const at=Mt.skills.findIndex(mt=>mt.id===O);if(at>=0){const mt=Mt.skills[at],wt=at>0?Mt.skills[at-1]:null,Dt=!wt||(Ct[wt.id]||0)>=1,we=Ct[O]||0,kt=we>=mt.maxRank,T=ne-It();return{sk:mt,unlocked:Dt,rank:we,maxed:kt,canBuy:Dt&&!kt&&T>0}}}return null},E=()=>{const O=Qi[ee];if(!O){Ae.innerHTML='<div class="gh-sk-soon">A árvore de habilidades desta classe chega em breve.</div>';return}const Y=ne-It(),Mt=O.branches.map(Dt=>{const we=Dt.skills.map((kt,T)=>{const D=Ct[kt.id]||0,z=T>0?Dt.skills[T-1]:null,G=!z||(Ct[z.id]||0)>=1,k=D>=kt.maxRank,W=G&&!k&&Y>0,rt=kt.kind==="active"?"gh-sk-active":"gh-sk-passive",yt=[D>0?"gh-sk-on":"",G?"":"gh-sk-locked",W?"gh-sk-buy":"",kt.id===oe?"gh-sk-sel":""].join(" "),Et=kt.stat?Yo[kt.stat]:void 0,zt=kt.kind==="active"&&kt.icon?`<img src="${kt.icon}" alt=""/>`:Et?`<img src="${Et}" alt=""/>`:`<span class="gh-sk-sym" style="color:${kt.stat?_c[kt.stat].color:"#ccc"}">${kt.stat?_c[kt.stat].sym:"?"}</span>`;return`${T>0?`<div class="gh-sk-line" style="background:${Dt.color}"></div>`:""}<button class="gh-sk-node ${rt} ${yt}" data-sk="${kt.id}">${zt}<span class="gh-sk-rank">${D}/${kt.maxRank}</span></button>`}).join("");return`<div class="gh-sk-branch"><div class="gh-sk-bhead" style="color:${Dt.color}">${Dt.name}</div>${we}</div>`}).join("");let at='<div class="gh-sk-thint">Toque num nó pra ver os detalhes; depois confirme para gastar o ponto.</div>';const mt=oe?L(oe):null;if(mt){const{sk:Dt,unlocked:we,rank:kt,maxed:T,canBuy:D}=mt;let z;T?z='<span class="gh-sk-cbtn gh-sk-cdim">No máximo</span>':we?D?z=`<button class="gh-sk-cbtn gh-sk-cbuy" id="gh-sk-confirm">${kt>0?`Melhorar → ${kt+1}/${Dt.maxRank}`:"Aprender"} · 1 ponto</button>`:z='<span class="gh-sk-cbtn gh-sk-cdim">Sem pontos</span>':z='<span class="gh-sk-cbtn gh-sk-cdim">Requer o nó acima</span>',at=`<div class="gh-sk-tname"><b>${Dt.name}</b> <i>${Dt.kind==="active"?"Ativa":"Passiva"} · ${kt}/${Dt.maxRank}</i></div><div class="gh-sk-tdesc">${Dt.desc}</div>${z}`}Ae.innerHTML=`<div class="gh-sk-top">Pontos: <b class="${Y>0?"gh-sk-pts":""}">${Y}</b></div><div class="gh-sk-cols">${Mt}</div><div class="gh-sk-tip" id="gh-sk-tip">${at}</div>`,O.bg?(Ae.style.backgroundImage=`linear-gradient(rgba(7,7,11,.66), rgba(7,7,11,.66)), url(${O.bg})`,Ae.style.backgroundSize="cover",Ae.style.backgroundPosition="center top",Ae.style.backgroundRepeat="no-repeat"):Ae.style.backgroundImage="",Ae.querySelectorAll(".gh-sk-node").forEach(Dt=>{Dt.addEventListener("click",()=>{oe=Dt.dataset.sk,E()})});const wt=Ae.querySelector("#gh-sk-confirm");wt&&wt.addEventListener("click",()=>{const Dt=oe?L(oe):null;Dt&&Dt.canBuy&&(Ct[Dt.sk.id]=Dt.rank+1,E(),o?.(Ct))})},H=()=>Wt.classList.remove("gh-eq-hidden"),J=()=>Wt.classList.add("gh-eq-hidden"),et=()=>Wt.classList.contains("gh-eq-hidden")?H():J();St.addEventListener("click",O=>{O.preventDefault(),et()}),Wt.querySelector("#gh-eq-close").addEventListener("click",O=>{O.preventDefault(),J()}),Wt.addEventListener("click",O=>{O.target===Wt&&J()}),window.addEventListener("keydown",O=>{O.code==="KeyC"?(O.preventDefault(),et()):O.code==="Escape"&&J()});const j=document.createElement("div");j.id="gh-dmg",s.appendChild(j);const Tt=document.createElement("div");Tt.id="gh-toast",s.appendChild(Tt);const ot=document.createElement("div");ot.id="gh-cast",ot.innerHTML='<span class="gh-cast-name"></span><span class="gh-cast-frame"><span class="gh-cast-track"><i class="gh-cast-fill"></i></span></span>',s.appendChild(ot);const vt=ot.querySelector(".gh-cast-name"),Qt=ot.querySelector(".gh-cast-fill");let nt=0;const xt=document.createElement("div");xt.id="gh-float",s.appendChild(xt);const Lt=document.createElement("div");Lt.id="pad",s.appendChild(Lt);const Ft=O=>`<img class="gh-btn-ico" src="${O}" alt="" draggable="false"/>`,bt=(O,Y)=>{let Mt;const at=wt=>{wt.preventDefault(),t(Y),Mt=window.setInterval(()=>t(Y),ch)},mt=()=>{Mt&&window.clearInterval(Mt),Mt=void 0};O.addEventListener("pointerdown",at),O.addEventListener("pointerup",mt),O.addEventListener("pointerleave",mt),O.addEventListener("pointercancel",mt),O.addEventListener("contextmenu",wt=>wt.preventDefault())},Yt=document.createElement("div");Yt.className="gh-cluster gh-move";const Gt=(O,Y)=>{const Mt=document.createElement("button");return Mt.className="gh-dtap "+Y,bt(Mt,O),Mt};Yt.appendChild(Gt("forward","gh-dup")),Yt.appendChild(Gt("back","gh-ddown")),Yt.appendChild(Gt("turnLeft","gh-dleft")),Yt.appendChild(Gt("turnRight","gh-dright")),Lt.appendChild(Yt);const se=document.createElement("button");se.className="gh-btn gh-act",se.innerHTML=Ft($_);const N=O=>{O.preventDefault(),t("interact")};se.addEventListener("pointerdown",N),se.addEventListener("contextmenu",O=>O.preventDefault()),Lt.appendChild(se);let ct=null;{ct=document.createElement("button"),ct.className="gh-btn gh-atk",ct.innerHTML=Ft(q_);const O=Y=>{Y.preventDefault(),t("attack")};ct.addEventListener("pointerdown",O),ct.addEventListener("contextmenu",Y=>Y.preventDefault()),Lt.appendChild(ct)}const q=document.createElement("div");q.id="gh-actbar",Lt.appendChild(q);const Q=46,pt=47,ft=51,Xt=116,Me=176,Pe=(O,Y,Mt=Xt,at=Me)=>{const mt=[];for(let wt=0;wt<O;wt++){const we=(O===1?(Mt+at)/2:Mt+(at-Mt)*wt/(O-1))*Math.PI/180,kt=pt+Y*-Math.cos(we),T=ft+Y*Math.sin(we);mt.push({right:Math.round(kt-Q/2),bottom:Math.round(T-Q/2)})}return mt},ce=O=>{const Y=Math.ceil(O/2);return[...Pe(Y,98),...Pe(O-Y,150)]},Je=6,rn=O=>{const Y=Je,Mt=ce(Y);let at="";for(let mt=0;mt<Y;mt++){const wt=Mt[mt]??{right:47,bottom:51},Dt=O[mt];Dt?at+=`<button class="gh-sslot" data-skill="${Dt.id}" title="${Dt.name}" style="right:${wt.right}px;bottom:${wt.bottom}px">`+(Dt.icon?`<img src="${Dt.icon}" alt=""/>`:'<span class="gh-ss-x">✦</span>')+'<span class="gh-ss-cool"></span><span class="gh-ss-cd"></span></button>':at+=`<span class="gh-sslot gh-ss-empty" style="right:${wt.right}px;bottom:${wt.bottom}px"><span class="gh-ss-rune">◈</span></span>`}q.innerHTML=at,q.style.display="block",q.querySelectorAll(".gh-sslot[data-skill]").forEach(mt=>{mt.addEventListener("pointerdown",wt=>{wt.preventDefault();const Dt=mt.dataset.skill;Dt&&a?.(Dt)}),mt.addEventListener("contextmenu",wt=>wt.preventDefault())})};rn([]);const wn=document.createElement("div");wn.id="gh-prompt",wn.style.display="none",Lt.appendChild(wn);const Qe=document.createElement("div");Qe.id="gh-dialogue",Qe.style.display="none",Qe.innerHTML='<img class="gh-dlg-portrait" alt="" /><div class="gh-dlg-body"><div class="gh-dlg-name"></div><div class="gh-dlg-text"></div><div class="gh-dlg-hint">toque para continuar ▸</div></div>',Qe.addEventListener("pointerdown",O=>{O.preventDefault(),t("interact")}),Lt.appendChild(Qe);const En=Qe.querySelector(".gh-dlg-name"),ss=Qe.querySelector(".gh-dlg-text"),ni=Qe.querySelector(".gh-dlg-portrait");return Q_(),{setPrompt(O){O?(wn.textContent=O,wn.style.display="block",se.classList.add("gh-act-on")):(wn.style.display="none",se.classList.remove("gh-act-on"))},showDialogue(O,Y,Mt){En.textContent=O,ss.textContent=Y,Mt?(ni.src=Mt,ni.style.display="block"):(ni.removeAttribute("src"),ni.style.display="none"),Qe.style.display="flex",wn.style.display="none"},hideDialogue(){Qe.style.display="none"},setHealth(O){const Y=Math.max(0,Math.min(1,O));M.style.width=Y*100+"%",M.style.background=Y>.5?"linear-gradient(#e35d4c,#b3241a)":Y>.25?"linear-gradient(#e08a2c,#9a4a10)":"linear-gradient(#c23a24,#7a1610)"},setMana(O){const Y=Math.max(0,Math.min(1,O));R.style.width=Y*100+"%"},setStats(O){be&&(be.textContent=`${O.gold}`);const Y=O.xpMax>0?Math.max(0,Math.min(1,O.xp/O.xpMax)):0,Mt=(mt,wt,Dt,we)=>{const kt=Dt<=we||O.points<0?" disabled":"",T=O.points<=0?" disabled":"";return`<div class="gh-prow"><span>${mt}</span><span class="gh-pstep"><button class="gh-pm" data-attr="${wt}" data-d="-1"${kt}>−</button><b>${Dt}</b><button class="gh-pm" data-attr="${wt}" data-d="1"${T}>＋</button></span></div>`},at=(mt,wt)=>`<div class="gh-sec-row"><span>${mt}</span><b>${wt}</b></div>`;ie.innerHTML=`<div class="gh-eq-lvl">Nível ${O.level}<div class="gh-xp"><div class="gh-xp-fill" style="width:${Y*100}%"></div></div></div><div class="gh-alloc-pts${O.points>0?" gh-pts-on":""}">Pontos a distribuir: <b>${O.points}</b></div><div class="gh-prim-box">`+Mt("Força","str",O.str,O.strMin)+Mt("Destreza","dex",O.dex,O.dexMin)+Mt("Inteligência","int",O.int,O.intMin)+'</div><div class="gh-sec-blocks"><div class="gh-sec-col"><h4>⚔️ Ofensivo</h4>'+at("Atq. Físico",O.atk)+at("Atq. Mágico",O.atkMag)+at("Crítico",O.crit+"%")+at("Dano Crít.",O.critDmg+"%")+at("Precisão",O.precision+"%")+'</div><div class="gh-sec-col"><h4>🛡️ Defensivo</h4>'+at("Vida",`${O.hp}/${O.hpMax}`)+at("Defesa",O.def)+at("Res. Mágica",O.magRes)+at("Evasão",O.evasion+"%")+'</div><div class="gh-sec-col"><h4>🔷 Recursos</h4>'+at("Mana",`${O.mp}/${O.mpMax}`)+at("Ouro",O.gold)+"</div></div>"},flashDamage(){j.style.animation="none",j.offsetWidth,j.style.animation="gh-dmg 360ms ease-out"},swingWeapon(){if(!p||!h||h.slot!=="main"||S)return-1;S=!0,w.forEach(W=>window.clearTimeout(W)),w.length=0,_||(_=s.querySelector("canvas"));const O=f,Y=T_[h.style],Mt=Y.windup+Y.strike+Y.recover,at=h.cooldown??Y.cooldown,mt=Math.round(Y.windup+Y.strike*.45),wt=Y.windup/Mt,Dt=mt/Mt,we=(Y.windup+Y.strike)/Mt,kt=Y.weight,T=W=>`perspective(760px) rotateY(${W.ry}deg) rotateX(${W.rx}deg) rotateZ(${W.rz}deg) translate(${W.tx}%,${W.ty}%) scale(${W.s})`,D="drop-shadow(-6px 2px 8px rgba(0,0,0,0.45))",z=W=>`${D} blur(${W}px)`;if(O.getAnimations?.().forEach(W=>W.cancel()),O.animate([{transform:T(gc),filter:z(0),offset:0},{transform:T(Y.wind),filter:z(0),offset:wt},{transform:T(Y.hit),filter:z(Math.min(3,1.6*kt)),offset:Dt},{transform:T(Y.follow),filter:z(.3),offset:we},{transform:T(gc),filter:z(0),offset:1}],{duration:Mt,easing:"ease-out",fill:"both"}),Y.imgSpin&&p){p.getAnimations?.().forEach(yt=>yt.cancel());const W=Y.imgSpin,rt=yt=>`perspective(620px) rotateY(${yt}deg)`;p.animate([{transform:rt(0),offset:0},{transform:rt(W.wind),offset:wt},{transform:rt(W.hit),offset:Dt},{transform:rt(W.follow),offset:we},{transform:rt(0),offset:1}],{duration:Mt,easing:"ease-out",fill:"both"})}const G=Y.fx==="arcBig"||Y.fx==="smashwave",k=Y.fx==="smashwave";return w.push(window.setTimeout(()=>{if(g)if(g.getAnimations?.().forEach(W=>W.cancel()),Y.fx==="streak")g.animate([{opacity:0,transform:"rotate(-4deg) scaleX(0.35) scaleY(0.5)"},{opacity:.9,transform:"rotate(-4deg) scaleX(1.15) scaleY(0.62)",offset:.3},{opacity:0,transform:"rotate(-4deg) scaleX(1.35) scaleY(0.66)"}],{duration:190,easing:"ease-out"});else if(k)g.animate([{opacity:0,transform:"rotate(-8deg) scale(0.9)"},{opacity:.5,transform:"rotate(-8deg) scale(1.5) translateY(6%)",offset:.28},{opacity:0,transform:"rotate(-8deg) scale(1.75) translateY(10%)"}],{duration:230,easing:"ease-out"});else{const W=Y.fx==="arcBig"?1.34:1;g.animate([{opacity:0,transform:`rotate(-8deg) scale(${.7*W})`},{opacity:.98,transform:`rotate(-8deg) scale(${1*W})`,offset:.26},{opacity:0,transform:`rotate(-8deg) scale(${1.14*W})`}],{duration:220,easing:"ease-out"})}if(m&&G){m.getAnimations?.().forEach(rt=>rt.cancel());const W=k?1.55:1.05;m.animate([{opacity:0,transform:"translate(-50%,-50%) scale(0.2)"},{opacity:k?.95:.8,transform:`translate(-50%,-50%) scale(${.72*W})`,offset:.22},{opacity:0,transform:`translate(-50%,-50%) scale(${1.4*W})`}],{duration:Math.round(240+kt*80),easing:"ease-out"})}if(x){x.getAnimations?.().forEach(rt=>rt.cancel());const W=Math.max(.85,.7+.42*(kt-1)+.42);x.animate([{opacity:0,transform:"scale(0.4)"},{opacity:Math.min(1,.66+.16*kt),transform:`scale(${W})`,offset:.26},{opacity:0,transform:`scale(${1.5*(.9+.18*kt)})`}],{duration:Math.round(190+kt*60),easing:"ease-out"})}if(u&&k&&(u.getAnimations?.().forEach(W=>W.cancel()),u.animate([{opacity:0},{opacity:.55,offset:.18},{opacity:0}],{duration:220,easing:"ease-out"})),_){_.getAnimations?.().forEach(rt=>rt.cancel());const W=kt;k?_.animate([{transform:"translate(0,0) scale(1)"},{transform:`translate(${-1.1*W}%,${1.3*W}%) scale(${1+.024*W}) rotate(${-.6*W}deg)`,offset:.14},{transform:`translate(${.7*W}%,${-.6*W}%) scale(${1+.012*W}) rotate(${.4*W}deg)`,offset:.34},{transform:`translate(${-.5*W}%,${.5*W}%) scale(${1+.006*W}) rotate(${-.2*W}deg)`,offset:.56},{transform:"translate(0,0) scale(1)"}],{duration:Math.round(280+kt*55),easing:"ease-out"}):_.animate([{transform:"translate(0,0) scale(1)"},{transform:`translate(${-.8*W}%,${1*W}%) scale(${1+.018*W}) rotate(${-.45*W}deg)`,offset:.18},{transform:`translate(${.45*W}%,${-.35*W}%) scale(${1+.005*W}) rotate(${.18*W}deg)`,offset:.46},{transform:"translate(0,0) scale(1)"}],{duration:Math.round(200+kt*45),easing:"ease-out"})}},mt)),w.push(window.setTimeout(()=>S=!1,at)),mt},setInventory(O){B.forEach((Y,Mt)=>{const at=O[Mt];Y.onclick=null,at&&c[at]?(Y.dataset.wid=at,Y.innerHTML=`<img class="gh-item-ico" src="${c[at].url}" alt="" title="${c[at].name}"/>`,Y.onclick=()=>this.equipWeapon(at)):(delete Y.dataset.wid,Y.innerHTML="")})},equipWeapon(O){const Y=c[O];if(!Y)return;const Mt=mt=>{const wt=Wt.querySelector(`.gh-slot[data-slot="${mt}"]`);wt&&(wt.innerHTML=`<img class="gh-item-ico" src="${Y.url}" alt="" title="${Y.name}"/>`)};Y.slot==="off"?Mt("off"):(h=Y,S=!1,w.forEach(mt=>window.clearTimeout(mt)),w.length=0,f?.getAnimations?.().forEach(mt=>mt.cancel()),p?.getAnimations?.().forEach(mt=>mt.cancel()),p.style.transform="",p.src=Y.url,f&&(f.style.height=`${(62*Y.scale).toFixed(1)}vh`,f.style.maxHeight=`${Math.round(640*Y.scale)}px`),s.classList.toggle("gh-wpn-arcane",Y.tint==="arcane"),Mt("main"),r?.(Y)),B.forEach(mt=>mt.classList.remove("gh-slot-pulse"));const at=Wt.querySelector(`.gh-bag-slot[data-wid="${O}"]`);at&&(at.classList.remove("gh-slot-pulse"),at.offsetWidth,at.classList.add("gh-slot-pulse"))},updateMinimap(O){X=O,dt(O),it()&&_t(O)},setSkillInfo(O,Y){ee=O,ne=Y,E()},setActionBar(O){rn(O)},setSkillCooldown(O,Y,Mt){const at=q.querySelector(`.gh-sslot[data-skill="${O}"]`);if(!at)return;const mt=at.querySelector(".gh-ss-cool"),wt=at.querySelector(".gh-ss-cd");if(Y<=0){mt&&(mt.style.opacity="0",mt.style.setProperty("--gh-cd","0deg")),wt&&(wt.textContent="");return}mt&&(mt.style.opacity="1",mt.style.setProperty("--gh-cd",(Math.max(0,Math.min(1,Y))*360).toFixed(1)+"deg")),wt&&(wt.textContent=String(Mt))},skillManaFloat(O,Y){const Mt=q.querySelector(`.gh-sslot[data-skill="${O}"]`);if(!Mt)return;const at=Mt.getBoundingClientRect();this.floatText(at.left+at.width/2,at.top-2,`-${Y}`,"mana")},floatText(O,Y,Mt,at){const mt=document.createElement("div");mt.className="gh-float-n gh-fl-"+at,mt.textContent=Mt;const wt=Math.abs(O*7+Y*13)%24-12|0;mt.style.left=O+wt+"px",mt.style.top=Y+"px",xt.appendChild(mt),window.setTimeout(()=>mt.remove(),1e3)},toast(O){Tt.textContent=O,Tt.style.animation="none",Tt.offsetWidth,Tt.style.animation="gh-toast 1.8s ease-out"},castBar(O,Y){nt&&window.clearTimeout(nt),vt.textContent=O,ot.classList.add("gh-cast-on"),Qt.style.transition="none",Qt.style.width="0%",Qt.offsetWidth,Qt.style.transition=`width ${Y}ms linear`,Qt.style.width="100%",nt=window.setTimeout(()=>{ot.classList.remove("gh-cast-on"),nt=0},Y)},cancelCast(){nt&&window.clearTimeout(nt),nt=0,ot.classList.remove("gh-cast-on")},setClock(O,Y){const Mt=(O-.25)*Math.PI*2,at=33,mt=(Dt,we)=>{const kt=Math.sin(we),T=-Math.cos(we);Dt.style.left=50+kt*at+"%",Dt.style.top=50+T*at+"%"};mt(Z,Mt),mt(st,Mt+Math.PI);const wt=Math.max(0,Math.min(1,Y));Z.style.opacity=(.28+.72*wt).toFixed(3),st.style.opacity=(.28+.72*(1-wt)).toFixed(3),Z.style.filter=`drop-shadow(0 0 ${(3+7*wt).toFixed(1)}px rgba(240,180,70,${(.5*wt+.15).toFixed(2)}))`,st.style.filter=`drop-shadow(0 0 ${(3+7*(1-wt)).toFixed(1)}px rgba(150,190,255,${(.5*(1-wt)+.15).toFixed(2)}))`}}}function Q_(){if(document.getElementById("gh-style"))return;const s=document.createElement("style");s.id="gh-style",s.textContent=`
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
    background:url(${G_}) no-repeat center / 100% 100%;
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
    border-image:url(${Aa}) 130 repeat;
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
    border-image:url(${Aa}) 130 repeat;
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
    background:url(${Ea}) no-repeat center / 100% 100%;
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
    border-image:url(${V_}) 90 fill;
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
    border-image:url(${Ud}) 88 fill;
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
    border-image:url(${W_}) 89 fill;
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
    border-image:url(${Aa}) 130 repeat;
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
    background:url(${Ea}) no-repeat center / 100% 100%;
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
    background:url(${X_}) no-repeat center / 100% 100%;
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
    background:url(${Ea}) no-repeat center / 100% 100%;
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
  `,document.head.appendChild(s)}const kr=["#######","#..N..#","#.....#","#.....#","#.....#","#..P..#","###X###"],Ar=kr.length,Eo=kr[0].length,Ra={tavern:{name:"TAVERNA",npc:"Bruno, o Taverneiro",seed:11,lines:["Bem-vindo à Taverna do Javali! Eu sou o Bruno.","Sente-se e descanse — logo você poderá pagar por um quarto e recuperar as forças."]},store:{name:"MERCADOR",npc:"Rosa, a Mercadora",seed:2,lines:["Tenho de tudo um pouco, aventureiro. Sou a Rosa.","Em breve abriremos o comércio: poções, cordas, tochas e mais."]},smith:{name:"FERREIRO",npc:"Brandt, o Ferreiro",seed:23,lines:["O fogo está quente e a bigorna, pronta. Brandt, ao seu dispor.","Traga minério e ouro que eu aprimoro suas armas e armaduras."]},alchemist:{name:"ALQUIMISTA",npc:"Isolde, a Alquimista",seed:31,lines:["Cuidado com o que respira aqui dentro... sou Isolde.","Elixires e poções logo estarão à venda na minha bancada."]}};function hr(s){for(let t=0;t<Ar;t++){const e=kr[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:1,row:1}}function Mr(s,t){return t<0||t>=Ar||s<0||s>=Eo?"#":kr[t][s]}function Ca(s,t){return".PX".includes(Mr(s,t))}const tx=""+new URL("taverneiro-Ba4UKFJq.png",import.meta.url).href,ex=""+new URL("mercadora-B8RulStP.png",import.meta.url).href,nx=""+new URL("ferreiro-BdN9Klhc.png",import.meta.url).href,ix=""+new URL("alquimista-ssXsgGLn.png",import.meta.url).href,Dd=""+new URL("pip-rEDWa-7w.png",import.meta.url).href,Id=""+new URL("wilma-DI_QNtI6.png",import.meta.url).href,sx=""+new URL("fazendeiro-CLjUAd1g.png",import.meta.url).href,rx=""+new URL("camponesa-CrL0OA2Y.png",import.meta.url).href,ax=""+new URL("lenhador-B54mx8Mi.png",import.meta.url).href,kd=""+new URL("hedda-Buaz2cmx.png",import.meta.url).href,ox=""+new URL("costureira-Br8zMBee.png",import.meta.url).href,lx=""+new URL("gunther-D_2fJfLI.png",import.meta.url).href,cx=""+new URL("anselmo-a5GEbqfY.png",import.meta.url).href,hx=""+new URL("tam-BlgWIVim.png",import.meta.url).href,dx=""+new URL("lyle-gu11Pcfp.png",import.meta.url).href,ux=""+new URL("pine1-Cx-eXiFP.png",import.meta.url).href,fx=""+new URL("pine2-CUzpurmt.png",import.meta.url).href,px=""+new URL("pine3-SLpwxU-f.png",import.meta.url).href,mx=""+new URL("pine4-D2rjz_P9.png",import.meta.url).href,gx=""+new URL("cluster1-CDwqmovY.png",import.meta.url).href,_x=""+new URL("cluster2-C0czRdHN.png",import.meta.url).href,xx=""+new URL("sign_tavern-DPGpN59J.png",import.meta.url).href,vx=""+new URL("sign_store-C8OmR8-U.png",import.meta.url).href,bx=""+new URL("sign_smith-B08qmnbc.png",import.meta.url).href,Mx=""+new URL("sign_alch-CZuh7kJW.png",import.meta.url).href,wx=""+new URL("prop_lamp-D_-YfjKt.png",import.meta.url).href,yx=""+new URL("prop_notice-Bo5C5meg.png",import.meta.url).href,Sx=""+new URL("enemy_skeleton-BcZFeUKH.png",import.meta.url).href,Tx=""+new URL("death_poof-BE-q7e2_.png",import.meta.url).href,Ex=""+new URL("dec_window-DrwRbTKE.png",import.meta.url).href,Ax=""+new URL("dec_door-B5wowGxb.png",import.meta.url).href,xc=""+new URL("dec_torch-CtkBMXz7.png",import.meta.url).href,Rx=""+new URL("dec_ivy-D9e2Lu2_.png",import.meta.url).href,Cx=""+new URL("dec_banner-UBOZSe9G.png",import.meta.url).href,vc=""+new URL("dec_cracks-DKSsqxx2.png",import.meta.url).href,Lx=""+new URL("fx_fireball-CNUxOMXZ.png",import.meta.url).href,Px=""+new URL("fx_ice-DGJxZKsy.png",import.meta.url).href,Ux=""+new URL("fx_ice_lance-DCxKutbL.png",import.meta.url).href,Dx=""+new URL("fx_ray-BukWo5qE.png",import.meta.url).href,Ix=""+new URL("fx_meteoro-DywgnSdp.png",import.meta.url).href,kx=""+new URL("fx_muralha-yiXxe2Yc.png",import.meta.url).href,Nx=""+new URL("fx_imolacao-C-a5dtuo.png",import.meta.url).href,Fx=""+new URL("fx_prisao-BDhoA-oK.png",import.meta.url).href,Ox=""+new URL("fx_corrente-CI-yrk7e.png",import.meta.url).href,Bx=""+new URL("fx_tempestade-DS9uv2Z_.png",import.meta.url).href,zx=""+new URL("fx_descarga-IY9gTcyD.png",import.meta.url).href,Hx=""+new URL("fx_l_apunhalar-BRQuzQIj.png",import.meta.url).href,Gx=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,Vx=""+new URL("fx_l_sombras-fe3usKIe.png",import.meta.url).href,Wx=""+new URL("fx_l_estocada-hJYwlzLR.png",import.meta.url).href,Xx=""+new URL("fx_l_mortal-DuYG-M3q.png",import.meta.url).href,qx=""+new URL("fx_l_dupla-C6r_wn6L.png",import.meta.url).href,$x=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,Yx=""+new URL("fx_l_arremesso-rtDW0ow6.png",import.meta.url).href,jx=""+new URL("fx_l_nuvem-B2qmk_tl.png",import.meta.url).href,Zx=""+new URL("fx_l_toxina-Bu3f7mn-.png",import.meta.url).href,Kx=""+new URL("sword-Cnq9dXJw.png",import.meta.url).href,Jx=""+new URL("class_guerreiro-DQxwW6XE.png",import.meta.url).href,Qx=""+new URL("class_ladino-CBY8tWR5.png",import.meta.url).href,tv=""+new URL("class_mago-BCWgBU8E.png",import.meta.url).href,ev=""+new URL("class_clerigo-Bv6kp9nE.png",import.meta.url).href,Ms=[{id:"guerreiro",name:"Guerreiro",emoji:"⚔️",tag:"Tanque / corpo-a-corpo",desc:"Mestre das lâminas. Encara o perigo de frente, com espada e escudo ou uma arma de duas mãos. Muita vida e dano físico.",attr:{str:8,dex:4,int:3},hp:120,mp:40,weapons:["sword","greatsword","axe","shield"],startWeapon:"sword",portrait:Jx},{id:"ladino",name:"Ladino",emoji:"🗡️",tag:"Dano rápido / crítico",desc:"Ágil e furtivo. Golpeia rápido com adaga e rapieira, buscando os pontos fracos. Frágil, mas letal e veloz.",attr:{str:4,dex:8,int:3},hp:90,mp:50,weapons:["dagger","rapier"],startWeapon:"dagger",portrait:Qx},{id:"mago",name:"Mago",emoji:"🔮",tag:"Dano à distância / elemental",desc:"Canaliza fogo, gelo e raio pelo cajado e pelo orbe. Devastador à distância, mas de corpo frágil. Muita mana.",attr:{str:3,dex:4,int:8},hp:75,mp:110,weapons:["staff","orb"],startWeapon:"staff",portrait:tv},{id:"clerigo",name:"Clérigo",emoji:"🕯️",tag:"Suporte / cura",desc:"Fé feita arma. Cura os aliados e esmaga o mal com maça, martelo e escudo. Equilibrado, resistente e devoto.",attr:{str:5,dex:3,int:7},hp:95,mp:90,weapons:["mace","maul","shield","staff"],startWeapon:"mace",portrait:ev}],Ao=Object.fromEntries(Ms.map(s=>[s.id,s])),bc=5,nv=3;function wr(s,t,e){return{atkPhys:Math.round(2+s.str*1.2+s.dex*.6),atkMag:Math.round(1+s.int*1.4),crit:Math.round(3+s.dex*.8),critDmg:150+Math.round(s.dex*1),precision:Math.min(99,Math.round(85+s.dex*.6)),hp:t+s.str*2,def:Math.round(1+s.str*.5),magRes:Math.round(s.int*.5),evasion:Math.round(2+s.dex*.7),mp:e+s.int*3}}const Mc=[ux,fx,mx],iv=[px],sv=.625,dr=[{url:gx,aspect:1.96},{url:_x,aspect:1.72}],rv={tavern:tx,store:ex,smith:nx,alchemist:ix},av={tavern:xx,store:vx,smith:bx,alchemist:Mx},ov=2.6,mn=[[0,-1],[1,0],[0,1],[-1,0]],Gi={c:7,r:10},ur=10,wc={url:Lx,frames:17},lv={url:Px,frames:6},cv={url:Ux,frames:12},yc={url:Dx,frames:16},hv={url:Ix,frames:15},dv={url:kx,frames:16},uv={url:Nx,frames:15},fv={url:Fx,frames:17},pv={url:Ox,frames:19},mv={url:Bx,frames:20},gv={url:zx,frames:11},_v={url:Hx,frames:5},xv={url:Gx,frames:20},vv={url:Vx,frames:7},bv={url:Wx,frames:11},Mv={url:Xx,frames:6},wv={url:qx,frames:8},yv={url:$x,frames:20},Sv={url:Yx,frames:14},Tv={url:jx,frames:7},Ev={url:Zx,frames:19},bs={m_bola_fogo:wc,m_explosao_fogo:wc,m_meteoro:hv,m_muralha_fogo:dv,m_imolacao:uv,m_nova_gelo:lv,m_lanca_gelo:cv,m_prisao_gelo:fv,m_raio_arcano:yc,m_corrente:pv,m_tempestade:mv,m_descarga:gv,m_nova_arcana:yc,l_apunhalar:_v,l_rajada_laminas:xv,l_golpe_sombras:vv,l_estocada:bv,l_execucao_a:Mv,l_rajada_dupla:wv,l_danca_laminas:yv,l_arremesso:Sv,l_nuvem_toxica:Tv,l_toxina:Ev},Av=1200,Sc=s=>{const t=bs[s];return t?Math.min(2100,Math.max(900,Math.round(t.frames*115))):Av},Rv=new Set(["m_meteoro","m_tempestade","m_prisao_gelo"]),Cv=new Set(["m_muralha_fogo","m_descarga"]),Tc=s=>100,Lv=620,fr=3.2,Ec=[{c:5,r:5,dc:0,dr:1,kind:"tavern"},{c:9,r:5,dc:0,dr:1,kind:"store"},{c:1,r:9,dc:1,dr:0,kind:"smith"},{c:13,r:9,dc:-1,dr:0,kind:"alchemist"}],Ac=[{c:7,r:5,dc:0,dr:1,id:"irmaos"},{c:1,r:7,dc:1,dr:0,id:"hedda"},{c:13,r:11,dc:-1,dr:0,id:"elspethhome"}],Pv=[{id:"elspeth",c:8,r:6,night:[12,11],seed:1,name:"Elspeth, a Camponesa",lines:["Bom dia! Colhi legumes fresquinhos hoje cedo.","O poço da praça nunca seca, pode beber à vontade."]},{id:"corvin",c:10,r:6,night:[5,6],seed:2,name:"Corvin, o Lenhador",lines:["Cortar lenha é honesto, mas o bosque anda estranho ultimamente.","Dizem que há algo à espreita naquela montanha ao norte..."]},{id:"wren",c:12,r:10,night:[2,7],seed:3,name:"Wren, a Costureira",lines:["Precisa remendar essa capa? Faço um preço justo.","Roupa boa aquece o corpo — e o frio lá embaixo é de rachar."]},{id:"alard",c:2,r:11,night:[5,6],seed:5,name:"Alard, o Velho Fazendeiro",lines:["Cuidado, jovem. A escada sob a montanha leva às profundezas.","Equipe-se bem antes de descer. Já vi muitos partirem e nenhum voltar."]},{id:"gunther",c:8,r:13,night:[11,7],seed:9,name:"Gunther, o Vigia",lines:["Mantenha a paz por aqui, forasteiro.","Enquanto eu montar guarda, o vilarejo dorme tranquilo."]},{id:"anselmo",c:3,r:6,night:[2,6],seed:7,name:"Frei Anselmo",lines:["Que a luz o acompanhe nas trevas, viajante.","Reze antes de descer àquela masmorra. Vai precisar."]},{id:"tam",c:9,r:12,night:[7,6],seed:10,name:"Velho Tam",lines:["Uma moedinha para um pobre velho?","Já fui aventureiro como você... até a montanha levar tudo de mim."]},{id:"lyle",c:2,r:8,night:[5,6],seed:12,name:"Lyle, o Bardo",lines:["Ei! Quer ouvir a balada do herói que desceu à masmorra?","Faça feitos grandiosos e eu comporei uma canção sobre você!"]}],Uv={pip:Dd,wilma:Id,alard:sx,elspeth:rx,corvin:ax,hedda:kd,wren:ox,gunther:lx,anselmo:cx,tam:hx,lyle:dx},Dv={},La={irmaos:{name:"Casa dos Irmãos",residents:[{col:2,row:2,seed:4,scale:.7,name:"Pip",art:Dd,lines:["Essa é a nossa casa! Eu e a Wilma somos irmãos.","Um dia vou ser aventureiro igual você — a Wilma que fica de babá!"]},{col:4,row:2,seed:6,scale:.66,name:"Wilma",art:Id,lines:["O Pip vive fugindo pra praça. Alguém tem que cuidar dele!","À noite dá pra ouvir barulhos vindo da montanha... eu tranco a porta."]}]},hedda:{name:"Casa de Hedda",residents:[{col:3,row:2,seed:8,name:"Hedda, a Matriarca",art:kd,lines:["Entre, entre. Minha casa é modesta, mas aquecida.","Já vi muitos invernos passarem por Grimhollow. Sente-se, tome um chá."]}]},elspethhome:{name:"Casa de Elspeth",residents:[]}},Iv=96;function Rc(s,t=Iv){const e=[];for(const n of s){if(n.length<=t){e.push(n);continue}const i=n.split(/\s+/);let r="";for(const o of i)r&&r.length+1+o.length>t?(e.push(r+" …"),r=o):r=r?r+" "+o:o;r&&e.push(r)}return e}const Cr=class Cr{constructor(t,e){gt(this,"renderer");gt(this,"scene",new z0);gt(this,"camera");gt(this,"container");gt(this,"foliageFx");gt(this,"col");gt(this,"row");gt(this,"facing",0);gt(this,"anim",null);gt(this,"world",new Ze);gt(this,"blocked",new Set);gt(this,"npcs",[]);gt(this,"flames",[]);gt(this,"lampFlames",[]);gt(this,"lampGlows",[]);gt(this,"glowTex");gt(this,"dayNightLights",[]);gt(this,"outdoor",!1);gt(this,"_sky",new Ot);gt(this,"_cA",new Ot);gt(this,"_cB",new Ot);gt(this,"waterGlint");gt(this,"smoke",[]);gt(this,"billboardProps",[]);gt(this,"playerMaxHp",100);gt(this,"playerHp",100);gt(this,"playerMaxMp",100);gt(this,"playerMp",100);gt(this,"stats",{level:1,xp:0,xpMax:100,atk:8,def:2,str:5,dex:5,int:5,gold:0});gt(this,"prim",{str:5,dex:5,int:5});gt(this,"baseAttr",{str:5,dex:5,int:5});gt(this,"clsHp",100);gt(this,"clsMp",100);gt(this,"sec",wr({str:5,dex:5,int:5},100,100));gt(this,"unspent",0);gt(this,"passive",{});gt(this,"skillRanks",{});gt(this,"target",null);gt(this,"cooldownUntil",{});gt(this,"coolingSkills",new Set);gt(this,"buff",null);gt(this,"reticle",null);gt(this,"raycaster",new Y0);gt(this,"lastTickMs",0);gt(this,"buffActive",!1);gt(this,"currentWeapon",null);gt(this,"playerName","Herói");gt(this,"classId","guerreiro");gt(this,"enemy",null);gt(this,"poofs",[]);gt(this,"poofTex");gt(this,"projectiles",[]);gt(this,"fxTexCache",{});gt(this,"_smokeTex");gt(this,"ui");gt(this,"location","village");gt(this,"doorMap",new Map);gt(this,"homeDoorMap",new Map);gt(this,"npcMap",new Map);gt(this,"returnTo",{col:0,row:0,facing:0});gt(this,"dialogue",null);gt(this,"lastPrompt"," ");gt(this,"artCache",new Map);gt(this,"_shadowTex");gt(this,"animTex",[]);gt(this,"walkers",[]);gt(this,"npcNight",!1);gt(this,"miniGrid",null);this.container=t;const n=e?Ao[e.classId]:null;n&&e&&(this.playerName=e.name,this.classId=n.id,this.prim={...e.attr??n.attr},this.baseAttr={...e.attr??n.attr},this.clsHp=n.hp,this.clsMp=n.mp,this.sec=wr(this.prim,this.clsHp,this.clsMp),this.stats.str=this.prim.str,this.stats.dex=this.prim.dex,this.stats.int=this.prim.int,this.playerMaxHp=this.sec.hp,this.playerHp=this.sec.hp,this.playerMaxMp=this.sec.mp,this.playerMp=this.sec.mp),this.renderer=new B0({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.appendChild(this.renderer.domElement);const i=document.createElement("div");i.style.cssText="position:absolute;inset:0;pointer-events:none;opacity:0;z-index:5;background:radial-gradient(ellipse at center,rgba(30,55,25,0) 42%,rgba(24,46,20,0.55) 78%,rgba(16,32,14,0.8) 100%);",getComputedStyle(t).position==="static"&&(t.style.position="relative"),t.appendChild(i),this.foliageFx=i,this.scene.background=new Ot(ms),this.camera=new sn(78,1,.05,400),this.camera.rotation.order="YXZ",this.scene.add(this.world),this.col=0,this.row=0,this.ui=J_(t,a=>this.onAction(a),Kx,void 0,So,a=>this.onEquip(a),a=>this.applyPassives(a),a=>this.useSkill(a),(a,l)=>this.allocAttr(a,l)),this.renderer.domElement.addEventListener("pointerdown",a=>this.onCanvasPointer(a)),this.ui.setInventory(So.map(a=>a.id)),this.ui.equipWeapon(n?.startWeapon??"sword"),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.ui.setMana(this.playerMp/this.playerMaxMp),this.ui.setSkillInfo(this.classId,Tc(this.stats.level)),this.refreshStats(),this.preloadFx();const r=oc();this.enterLocation("village",r.col,r.row,0),window.addEventListener("resize",()=>this.resize()),this.resize(),this.renderer.setAnimationLoop(a=>this.tick(a));const o=document.fonts;o?.ready&&o.ready.then(()=>{this.dialogue||this.enterLocation(this.location,this.col,this.row,this.facing)}),window.__game=this}enterLocation(t,e,n,i){this.clearWorld(),this.location=t,this.outdoor=t==="village"||t==="forest",this.dialogue=null,this.ui.hideDialogue(),t==="village"?(this.scene.fog=new mi(ms,P*2.6,P*11),this.scene.background=new Ot(ms),this.addVillageLights(),this.buildVillage()):t==="forest"?(this.scene.fog=new mi(ms,P*3.5,P*18),this.scene.background=new Ot(ms),this.addForestLights(),this.buildForest()):t==="dungeon"?(this.scene.fog=new mi(460554,P*2,P*9),this.scene.background=new Ot(328967),this.addDungeonLights(),this.buildDungeon()):t in La?(this.scene.fog=new mi(2365968,P*4,P*12),this.scene.background=new Ot(1445640),this.addInteriorLights(),this.buildHome(t)):(this.scene.fog=new mi(1709069,P*4,P*12),this.scene.background=new Ot(1183241),this.addInteriorLights(),this.buildInterior(t)),this.col=e,this.row=n,this.facing=i,this.camera.position.set(e*P,ga,n*P),this.camera.rotation.y=-i*(Math.PI/2),this.anim=null,this.lastPrompt=" ",this.ui.setPrompt(null),this.buildMiniGrid(),this.pushMinimap()}clearWorld(){this.world.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const n=e.material;Array.isArray(n)?n.forEach(i=>i.dispose()):n&&n.dispose()}),this.world.clear(),this.blocked.clear(),this.npcs=[],this.flames=[],this.lampFlames=[],this.lampGlows=[],this.dayNightLights=[],this.animTex=[],this.walkers=[],this.smoke=[],this.billboardProps=[],this.enemy=null,this.reticle=null,this.clearTarget(),this.projectiles=[],this.poofs=[],this.waterGlint=void 0,this.doorMap.clear(),this.homeDoorMap.clear(),this.npcMap.clear()}addVillageLights(){const t=new sr(9081506,.75),e=new ir(10135224,3812380,.7),n=new tc(16771008,.55);n.position.set(-6,12,4),this.world.add(t),this.world.add(e),this.world.add(n),this.registerDayLight(t,3820138,.46),this.registerDayLight(e,2899038,.5),this.registerDayLight(n,5596832,.14)}registerDayLight(t,e,n){this.dayNightLights.push({light:t,dayI:t.intensity,dayColor:t.color.clone(),nightColor:new Ot(e),nightMul:n})}daylight(t){const e=Math.sin((t-.25)*Math.PI*2);return Math.max(0,Math.min(1,e*1.15))}atmosColor(t,e){const n=Cr.SKY_KEYS;let i=n[0],r=n[n.length-1];for(let a=0;a<n.length-1;a++)if(t>=n[a][0]&&t<=n[a+1][0]){i=n[a],r=n[a+1];break}const o=(t-i[0])/(r[0]-i[0]||1);e.copy(this._cA.set(i[1])).lerp(this._cB.set(r[1]),o)}updateDayNight(t){if(!this.outdoor)return;const e=(t/ar+or)%1,n=this.daylight(e);this.atmosColor(e,this._sky),this.scene.fog&&this.scene.fog.color.copy(this._sky),this.scene.background.copy(this._sky);for(const r of this.dayNightLights){const o=r.nightMul+(1-r.nightMul)*n;r.light.intensity=r.dayI*o,r.light.color.copy(r.nightColor).lerp(r.dayColor,n)}const i=Math.max(0,Math.min(1,(.5-n)/.35));for(const r of this.lampFlames){const o=r.base+Math.sin(t*.011+r.base)*.8+Math.sin(t*.027)*.5;r.light.intensity=Math.max(0,o)*i}for(const r of this.lampGlows){const o=.88+Math.sin(t*.011)*.08+Math.sin(t*.027)*.04;r.material.opacity=i*o}}addInteriorLights(){this.world.add(new sr(12888176,1.15)),this.world.add(new ir(10521184,3813408,.75))}buildVillage(){const t=new lt({map:uc(7)}),e=(m,u)=>new lt({map:m,color:new Ot(u)}),n=[new lt({map:ci(31)}),new lt({map:d_()})],i=[e(_s(3),15323543),e(_s(3),12820582),e(_s(3),11179640)];i.forEach(m=>m.side=te);const r=this.decalMat(Ax,.4),o=this.decalMat(Ex,.4),a=this.decalMat(xc,.1),l=this.decalMat(Cx,.4),c=this.decalMat(Rx,.4),h=this.decalMat(vc,.08),d=(m,u,S=0)=>Math.sin(m*12.9+u*78.2+S*3.1)*43758.5%1,f=new Bt(P,P);for(let m=0;m<qe;m++)for(let u=0;u<ln;u++){if(ac(u,m))continue;const S=new tt(f,t);S.rotation.x=-Math.PI/2;const w=Math.floor(Math.abs(d(u,m,5))*4)%4;S.rotation.z=w*Math.PI/2,S.position.set(u*P,0,m*P),this.world.add(S)}const p=new me(P,jn,P),g=new Set([...Ec.map(m=>`${m.c},${m.r},${m.dc},${m.dr}`),...Ac.map(m=>`${m.c},${m.r},${m.dc},${m.dr}`)]),x=new Set;for(let m=0;m<qe;m++)for(let u=0;u<ln;u++){if(Ee(u,m)!=="building")continue;const S=mn.filter(([y,M])=>{const R=Ee(u+y,m+M);return R==="street"||R==="barrel"});if(S.length===0)continue;const w=n[Math.floor(Math.abs(d(u,m))*997)%n.length],_=new tt(p,w);_.position.set(u*P,jn/2,m*P),this.world.add(_);for(const[y,M]of S){if(g.has(`${u},${m},${y},${M}`)){x.add(`${u},${m},${y},${M}`);continue}const R=Math.abs(d(u,m,y*7+M*3))%1,A=u*P+y*(P/2+.05),b=m*P+M*(P/2+.05);R<.4?this.addWallDecal(u,m,y,M,o,1.9,1.9,1.75):R<.5?(this.addWallDecal(u,m,y,M,a,.95,1.55,2.15),this.glowLight(A+y*.25,2.35,b+M*.25,16752704,3,9)):R<.71?this.addWallDecal(u,m,y,M,c,2.3,1.5,1.05):R<.87&&this.addWallDecal(u,m,y,M,h,1.8,1.6,1.6)}}this.buildRoofs(i),this.buildMountain(),this.buildTunnel(),this.buildDungeonEnemy(),this.buildWell(),this.buildEstablishments(r,l),this.buildHomes(r),this.buildVillageForestGate(),this.buildVillageProps(),this.buildChimneySmoke(),this.buildNPCs()}buildVillageProps(){this.addLampPost(4,7),this.addLampPost(10,7),this.addLampPost(4,11),this.addLampPost(10,11),this.addWallProp(2,10,yx,2.7,"W")}makeGlowTex(){if(this.glowTex)return this.glowTex;const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255,244,214,1)"),n.addColorStop(.28,"rgba(255,207,138,0.72)"),n.addColorStop(1,"rgba(255,190,120,0)"),e.fillStyle=n,e.fillRect(0,0,64,64),this.glowTex=new gi(t),this.glowTex}addLampPost(t,e,n=0,i=0){const r=t*P+n,o=e*P+i;this.addPropBillboard(t,e,wx,3.4,n,i);const a=2.95,l=new pn(16764810,4.2,17,2);l.position.set(r,a,o),this.world.add(l),this.lampFlames.push({light:l,base:4.2});const c=new jl(new Mo({map:this.makeGlowTex(),transparent:!0,opacity:0,depthWrite:!1,blending:Ua}));c.position.set(r,a,o),c.scale.set(2.6,2.6,1),this.world.add(c),this.lampGlows.push(c)}addPropBillboard(t,e,n,i,r=0,o=0){const a=new lt({transparent:!0,opacity:0,alphaTest:.4,side:te}),l=new tt(new Bt(i,i),a);l.position.set(t*P+r,i/2,e*P+o),this.world.add(l),this.billboardProps.push(l),this.loadArt(n,c=>{const h=c.image,d=h&&h.width&&h.height?h.width/h.height:1;l.geometry.dispose(),l.geometry=new Bt(i*d,i),l.position.y=i/2,a.map=c,a.opacity=1,a.needsUpdate=!0})}addWallProp(t,e,n,i,r){const o=new lt({transparent:!0,opacity:0,alphaTest:.4,side:te}),a=new tt(new Bt(i,i),o),l=P/2-.2;let c=0,h=0,d=0;r==="N"?(d=0,h=-l):r==="S"?(d=Math.PI,h=l):r==="W"?(d=Math.PI/2,c=-l):(d=-Math.PI/2,c=l),a.rotation.y=d,a.position.set(t*P+c,i/2,e*P+h),this.world.add(a),this.loadArt(n,f=>{const p=f.image,g=p&&p.width&&p.height?p.width/p.height:1;a.geometry.dispose(),a.geometry=new Bt(i*g,i),a.position.y=i/2,o.map=f,o.opacity=1,o.needsUpdate=!0})}buildDungeonEnemy(t=2,e=4){const n=Math.max(1,this.stats.level+(Math.floor(Math.random()*3)-1)),i=26+(n-1)*8,r=2.6,o=new lt({transparent:!0,opacity:0,alphaTest:.4,side:te}),a=new tt(new Bt(r*.47,r),o);a.position.set(t*P,r/2,e*P),this.world.add(a),this.billboardProps.push(a),this.blocked.add(`${t},${e}`);const l=1.3,c=new Ze,h=new tt(new Bt(l+.12,.26),new Ce({color:1182986,transparent:!0,opacity:.85})),d=new tt(new Bt(l,.16),new Ce({color:13777454}));d.position.z=.01,c.add(h),c.add(d),c.position.set(t*P,r+.45,e*P),this.world.add(c),this.billboardProps.push(c),this.enemy={mesh:a,mat:o,c:t,r:e,bx:t*P,bz:e*P,hp:i,maxHp:i,elevel:n,hitAt:0,dyingAt:0,atkAt:0,hitApplied:!1,nextAtk:0,bar:c,barFill:d};const f=new pn(6987984,.55,5,2);f.position.set(t*P,1.7,e*P),this.world.add(f),this.poofTex||this.loadArt(Tx,p=>this.poofTex=this.fxFilter(p)),this.loadArt(Sx,p=>{const g=p.image,x=g&&g.width&&g.height?g.width/g.height:.47;a.geometry.dispose(),a.geometry=new Bt(r*x,r),a.position.y=r/2,o.map=p,o.opacity=1,o.needsUpdate=!0})}onEquip(t){this.currentWeapon=t,this.recomputeDerived()}atkWithBonus(t){const e=(this.passive.dmg??0)+(this.passive.mdmg??0);return Math.round(t*(1+e))}applyPassives(t){this.skillRanks={...t},this.refreshActionBar(),this.passive=I_(t),this.recomputeDerived()}allocAttr(t,e){if(e>0){if(this.unspent<=0)return;this.prim[t]+=1,this.unspent-=1}else{if(this.prim[t]<=this.baseAttr[t])return;this.prim[t]-=1,this.unspent+=1}this.recomputeDerived()}recomputeDerived(){this.sec=wr(this.prim,this.clsHp,this.clsMp);const t=this.playerMaxHp>0?this.playerHp/this.playerMaxHp:1,e=this.playerMaxMp>0?this.playerMp/this.playerMaxMp:1;this.playerMaxHp=Math.round(this.sec.hp*(1+(this.passive.life??0))),this.playerMaxMp=Math.round(this.sec.mp*(1+(this.passive.mana??0))),this.playerHp=Math.max(1,Math.round(this.playerMaxHp*t)),this.playerMp=Math.round(this.playerMaxMp*e),this.stats.str=this.prim.str,this.stats.dex=this.prim.dex,this.stats.int=this.prim.int,this.stats.def=this.sec.def+Math.round((this.passive.def??0)+(this.passive.mres??0));const n=this.currentWeapon?.dmg??0;this.stats.atk=Math.round(this.atkWithBonus(this.sec.atkPhys+n)*this.buffAtkMul()),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.ui.setMana(this.playerMp/this.playerMaxMp),this.refreshStats()}rollDamage(t,e){const n=e?this.passive.mdmg??0:this.passive.dmg??0;let i=t*(1+n)*this.buffAtkMul();const r=Math.random()*100<this.sec.crit;return r&&(i*=this.sec.critDmg/100),{dmg:Math.max(1,Math.round(i)),crit:r}}projectToScreen(t,e,n){const i=new F(t,e,n).project(this.camera),r=this.renderer.domElement.getBoundingClientRect();return{x:r.left+(i.x+1)/2*r.width,y:r.top+(1-i.y)/2*r.height}}tryHitEnemy(){const t=this.enemy;if(!t||t.dyingAt)return;const[e,n]=mn[this.facing];if(this.col+e!==t.c||this.row+n!==t.r)return;const i=this.sec.atkPhys+(this.currentWeapon?.dmg??0),r=this.rollDamage(i,!1);this.dealDamageToEnemy(t,r.dmg,r.crit)}dealDamageToEnemy(t,e,n=!1){if(t.dyingAt)return;const i=Math.max(1,Math.round(e));t.hp-=i,t.hitAt=performance.now();const r=Math.max(1e-4,t.hp/t.maxHp);t.barFill.scale.x=r,t.barFill.position.x=-(1-r)*1.3/2;const o=this.projectToScreen(t.bx,1.8,t.bz);if(this.ui.floatText(o.x,o.y,n?`${i}!`:`${i}`,n?"crit":"hit"),t.hp<=0){t.dyingAt=t.hitAt,this.blocked.delete(`${t.c},${t.r}`),this.spawnPoof(t.bx,t.bz),this.target===t&&this.clearTarget();const a=t.elevel,l=4+a*3+Math.floor(Math.random()*(3+a*2));this.stats.gold+=l,this.gainXp(30+a*15),this.ui.toast(`+${l} ouro`)}}cellDist(t){return Math.max(Math.abs(this.col-t.c),Math.abs(this.row-t.r))}buffAtkMul(){return this.buff&&performance.now()<this.buff.until?this.buff.atkMul:1}buffDefReduc(){return this.buff&&performance.now()<this.buff.until?this.buff.defReduc:0}refreshActionBar(){const t=H_(this.classId,this.skillRanks);this.ui.setActionBar(t.map(e=>({id:e.id,name:e.name,icon:e.icon,mana:e.combat.mana})))}useSkill(t){const e=this.skillRanks[t]||0;if(e<=0)return;const n=To(t),i=performance.now();if((this.cooldownUntil[t]??0)>i){this.ui.toast("Recarregando…");return}if(this.playerMp<n.mana){this.ui.toast("Mana insuficiente");return}if(n.target==="enemy"){(!this.target||this.target.dyingAt)&&this.enemy&&!this.enemy.dyingAt&&this.setTarget(this.enemy);const r=this.target;if(!r||r.dyingAt){this.ui.toast("Sem alvo");return}const o=this.cellDist(r),a=n.melee?1:n.range;if(o>a){this.ui.toast(n.melee?"Muito longe (corpo-a-corpo)":"Fora de alcance");return}}if(this.playerMp=Math.max(0,this.playerMp-n.mana),this.ui.setMana(this.playerMp/this.playerMaxMp),this.ui.skillManaFloat(t,n.mana),this.cooldownUntil[t]=i+n.cd,this.coolingSkills.add(t),n.effect==="dmg"&&this.target){const r=this.target.bx,o=this.target.bz,a=this.target,l=n.power*(1+.25*(e-1)),c=!n.melee&&n.magic?360:0;c>0&&this.ui.castBar(z_(t),c);const h=Sc(t),d=Rv.has(t),f=()=>{if(this.enemy===a&&!a.dyingAt){const g=this.rollDamage(l,n.magic);this.dealDamageToEnemy(a,g.dmg,g.crit)}},p=()=>{bs[t]&&this.spawnEffect(t,r,o),d?window.setTimeout(f,h):f()};c>0?window.setTimeout(p,c):p(),n.melee&&this.ui.swingWeapon()}else if(n.effect==="heal"){const r=Math.round(n.power*(1+.25*(e-1))),o=this.playerHp;this.playerHp=Math.min(this.playerMaxHp,this.playerHp+r),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.refreshStats();const a=this.playerHp-o;this.ui.floatText(window.innerWidth/2,window.innerHeight*.46,`+${a}`,"heal"),this.ui.toast(`+${r} vida`)}else n.effect==="buff"&&(this.buff={atkMul:n.atkMul??1,defReduc:n.defReduc??0,until:i+(n.dur??6e3)},this.recomputeDerived(),this.ui.toast("Fortalecido!"))}setTarget(t){this.target=t,this.ensureReticle(),this.reticle&&(this.reticle.visible=!0)}clearTarget(){this.target=null,this.reticle&&(this.reticle.visible=!1)}ensureReticle(){if(this.reticle)return;const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d"),n=64;e.shadowColor="rgba(0,0,0,.5)",e.shadowBlur=5,e.strokeStyle="rgba(255,228,150,.9)",e.lineWidth=4,e.beginPath(),e.arc(n,n,50,0,Math.PI*2),e.stroke(),e.lineCap="round",e.lineWidth=5;const i=l=>{const c=Math.cos(l),h=Math.sin(l);e.beginPath(),e.moveTo(n+c*44,n+h*44),e.lineTo(n+c*56,n+h*56),e.stroke()};i(-Math.PI/2),i(Math.PI/2),i(0),i(Math.PI);const r=new gi(t);r.colorSpace=Le;const o=new Ce({map:r,transparent:!0,opacity:.9,depthTest:!0,depthWrite:!1}),a=new tt(new Bt(1.15,1.15),o);a.renderOrder=999,a.visible=!1,this.reticle=a,this.world.add(a),this.billboardProps.push(a)}onCanvasPointer(t){const e=this.enemy;if(!e||e.dyingAt)return;const n=this.renderer.domElement.getBoundingClientRect(),i=(t.clientX-n.left)/n.width*2-1,r=-((t.clientY-n.top)/n.height)*2+1;this.raycaster.setFromCamera(new Ht(i,r),this.camera),this.raycaster.intersectObject(e.mesh,!1).length&&this.setTarget(e)}spawnPoof(t,e){if(!this.poofTex)return;const n=this.poofTex.clone();n.needsUpdate=!0,n.repeat.set(1/ur,1),n.offset.set(0,0);const i=new Ce({map:n,transparent:!0,depthWrite:!1,side:te}),r=new tt(new Bt(3.8,2.85),i);r.position.set(t,1.5,e),this.world.add(r),this.poofs.push({mesh:r,mat:i,tex:n,born:performance.now()})}updatePoofs(t){if(this.poofs.length===0)return;const e=this.camera.position.x,n=this.camera.position.z;for(let i=this.poofs.length-1;i>=0;i--){const r=this.poofs[i],o=(t-r.born)/Lv;if(o>=1){this.world.remove(r.mesh),r.mesh.geometry.dispose(),r.mat.dispose(),r.tex.dispose(),this.poofs.splice(i,1);continue}const a=Math.min(ur-1,Math.floor(o*ur));r.tex.offset.x=a/ur,r.mesh.rotation.y=Math.atan2(e-r.mesh.position.x,n-r.mesh.position.z)}}preloadFx(){for(const t in bs){const e=bs[t].url;this.fxTexCache[e]||this.loadArt(e,n=>this.fxTexCache[e]=this.fxFilter(n))}}fxFilter(t){return t.minFilter=He,t.magFilter=He,t.generateMipmaps=!1,t.needsUpdate=!0,t}spawnEffect(t,e,n){const i=bs[t];if(!i)return;const r=this.fxTexCache[i.url];if(!r){this.loadArt(i.url,m=>this.fxTexCache[i.url]=this.fxFilter(m));return}const o=i.frames,a=r.clone();this.fxFilter(a),a.repeat.set(1/o,1),a.offset.set(0,0);const l=r.image,c=l&&l.height?l.width/o/l.height:1,h=new Ce({map:a,transparent:!0,depthWrite:!1,depthTest:!1,side:te}),d=2.8,f=c>=1?d:d*c,p=c>=1?d/c:d,g=new tt(new Bt(f,p),h),x=Cv.has(t)?p/2:1.5;g.position.set(e,x,n),g.renderOrder=20,this.world.add(g),this.projectiles.push({mesh:g,mat:h,tex:a,frames:o,born:performance.now(),ms:Sc(t),fromX:e,fromZ:n,toX:e,toZ:n})}updateProjectiles(t){if(this.projectiles.length===0)return;const e=this.camera.position.x,n=this.camera.position.z;for(let i=this.projectiles.length-1;i>=0;i--){const r=this.projectiles[i],o=(t-r.born)/r.ms;if(o>=1){this.world.remove(r.mesh),r.mesh.geometry.dispose(),r.mat.dispose(),r.tex.dispose(),this.projectiles.splice(i,1);continue}const a=Math.min(r.frames-1,Math.max(0,Math.floor(o*r.frames)));r.tex.offset.x=a/r.frames,r.mesh.rotation.y=Math.atan2(e-r.mesh.position.x,n-r.mesh.position.z)}}nextXpMax(t){return Math.round(100+(t-1)*60)}gainXp(t){if(this.stats.level>=100)return;this.stats.xp+=t;let e=0;for(;this.stats.level<100&&this.stats.xp>=this.stats.xpMax;)this.stats.xp-=this.stats.xpMax,this.stats.level++,this.stats.xpMax=this.nextXpMax(this.stats.level),e++;this.stats.level>=100&&(this.stats.xp=0),e>0&&(this.playerHp=this.playerMaxHp,this.playerMp=this.playerMaxMp,this.unspent+=e*nv,this.ui.setHealth(1),this.ui.setMana(1),this.ui.setSkillInfo(this.classId,Tc(this.stats.level)),this.ui.toast(`Nível ${this.stats.level}!`)),this.refreshStats()}refreshStats(){this.ui.setStats({level:this.stats.level,xp:this.stats.xp,xpMax:this.stats.xpMax,hp:this.playerHp,hpMax:this.playerMaxHp,mp:this.playerMp,mpMax:this.playerMaxMp,atk:this.stats.atk,def:this.stats.def,str:this.stats.str,dex:this.stats.dex,int:this.stats.int,gold:this.stats.gold,points:this.unspent,strMin:this.baseAttr.str,dexMin:this.baseAttr.dex,intMin:this.baseAttr.int,atkMag:this.atkWithBonus(this.sec.atkMag),crit:this.sec.crit,critDmg:this.sec.critDmg,precision:this.sec.precision,magRes:this.sec.magRes,evasion:this.sec.evasion})}damagePlayer(t){if(this.playerHp<=0)return;const e=t*(1-this.buffDefReduc()),n=Math.max(1,Math.round(e));this.playerHp=Math.max(0,this.playerHp-n),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.refreshStats(),this.ui.flashDamage(),this.ui.floatText(window.innerWidth/2,window.innerHeight*.58,`-${n}`,"player"),this.playerHp<=0&&window.setTimeout(()=>{this.playerHp=this.playerMaxHp,this.ui.setHealth(1),this.refreshStats();const i=oc();this.enterLocation("village",i.col,i.row,0)},800)}buildChimneySmoke(){const t=this.smokeTex(),e=[[5,5],[9,5],[1,9],[13,9],[7,5],[1,7]];for(const[n,i]of e)for(let r=0;r<4;r++){const o=new tt(new Bt(1.4,1.4),new Ce({map:t,transparent:!0,depthWrite:!1,opacity:0}));o.position.set(n*P+.4,jn+ma,i*P),o.userData={phase:(n*3.1+i*1.7+r*1.3)%4,baseX:n*P+.4,baseZ:i*P},this.world.add(o),this.smoke.push(o)}}smokeTex(){if(this._smokeTex)return this._smokeTex;const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,2,32,32,30);n.addColorStop(0,"rgba(220,220,224,0.9)"),n.addColorStop(1,"rgba(220,220,224,0)"),e.fillStyle=n,e.beginPath(),e.arc(32,32,30,0,Math.PI*2),e.fill();const i=new gi(t);return i.colorSpace=Le,this._smokeTex=i,i}buildVillageForestGate(){const t=lc(),e=t.col*P,n=t.row*P,i=new lt({map:Oe(5)}),r=new lt({map:Ta(63)}),o=new Bt(P,P);for(let g=0;g<=2;g++){const x=new tt(o,r);x.rotation.x=-Math.PI/2,x.rotation.z=g%2*Math.PI/2,x.position.set(e,.02,(t.row-g)*P),this.world.add(x)}const a=new Ze,l=new me(.36,3.4,.36);for(const g of[-1.5,1.5]){const x=new tt(l,i);x.position.set(g,1.7,0),a.add(x)}const c=new tt(new me(3.7,.36,.4),i);c.position.set(0,3.35,0),a.add(c);for(const g of[-1,1]){const x=new tt(new me(.7,.16,.16),i);x.position.set(g*1.05,3,0),x.rotation.z=g*(Math.PI/4),a.add(x)}const h=new tt(new Bt(1.7,.6),new Ce({map:wa("Floresta"),transparent:!0,side:te}));h.position.set(0,2.72,0),h.rotation.y=Math.PI,a.add(h);const d=new lt({color:3815994});for(const g of[-.7,.7]){const x=new tt(new ye(.02,.02,.4,5),d);x.position.set(g,3.05,0),a.add(x)}a.position.set(e,0,n),this.world.add(a);const f=new lt({map:Sa(61)});f.map.repeat.set(8,5);const p=new tt(new Bt(8*P,5*P),f);p.rotation.x=-Math.PI/2,p.position.set(e,-.02,(t.row+2.5)*P),this.world.add(p);for(let g=1;g<=3;g++){const x=new tt(o,r);x.rotation.x=-Math.PI/2,x.rotation.z=g%2*Math.PI/2,x.position.set(e,.02,(t.row+g)*P),this.world.add(x)}this.buildTreelineBackdrop(e,(t.row+3.4)*P,Math.PI)}makeClusterMats(){return dr.map(t=>{const e=new lt({transparent:!0,opacity:0,side:te});return this.loadArt(t.url,n=>{e.map=n,e.alphaTest=.35,e.opacity=1,e.needsUpdate=!0}),{mat:e,aspect:t.aspect}})}buildTreelineBackdrop(t,e,n){if(dr.length===0)return;const i=this.makeClusterMats(),r=13;let o=t-r*1.9;for(let a=0;a<3;a++){const l=i[a%i.length],c=r*l.aspect,h=new tt(new Bt(c,r),l.mat);h.position.set(o+c/2,r/2-1,e),h.rotation.y=n,a===1&&(h.scale.x=-1),this.world.add(h),o+=c*.92}}buildMountain(){const t=new lt({map:ya(41)});let e=ln,n=qe;for(let r=0;r<qe;r++)for(let o=0;o<ln;o++)Ee(o,r)==="mountain"&&(e=Math.min(e,o),n=Math.min(n,r));const i=(r,o)=>{const a=r-e,l=o-n,c=Math.sqrt(a*a+l*l);return Math.max(jn+2.5,jn+11-c*1.7+this.mHash(r,o)*2)};for(let r=0;r<qe;r++)for(let o=0;o<ln;o++){const a=Ee(o,r),l=a==="tunnel"||a==="stairs";if(a!=="mountain"&&!l)continue;const c=i(o,r),h=l?fr:0,d=c-h;if(d<=.2)continue;const f=new tt(new me(P,d,P),t);if(f.position.set(o*P,h+d/2,r*P),this.world.add(f),!l&&this.mHash(o,r,2)>.35){const p=1.6+this.mHash(o,r,3)*1.8,g=new tt(new me(p,p,p),t);g.position.set(o*P+(this.mHash(o,r,4)-.5)*2.4,c+p*.25,r*P+(this.mHash(o,r,5)-.5)*2.4),g.rotation.y=this.mHash(o,r,6)*Math.PI,this.world.add(g)}}}mHash(t,e,n=0){const i=Math.sin(t*41.3+e*17.7+n*7.13)*9871.2;return i-Math.floor(i)}buildBarrels(t,e,n){const i=new ye(.4,.34,1.05,14),r=new ye(.41,.41,.08,14);for(let o=0;o<qe;o++)for(let a=0;a<ln;a++){if(Ee(a,o)!=="barrel")continue;const l=mn.filter(([_,y])=>Ee(a+_,o+y)==="building");if(l.length===0)continue;const c=l.find(([_,y])=>!e.has(`${a+_},${o+y},${-_},${-y}`))||l[0],[h,d]=c;let f=0,p=0;const g=1.05;h!==0?p=(Ee(a,o-1)==="building"?-1:Ee(a,o+1)==="building"||n(a,o)>0?1:-1)*g:f=(Ee(a-1,o)==="building"?-1:Ee(a+1,o)==="building"||n(a,o)>0?1:-1)*g;const x=a*P+h*(P/2-.5)+f,m=o*P+d*(P/2-.5)+p,u=new Ze,S=new tt(i,t);S.position.y=.52,u.add(S);const w=new tt(r,t);if(w.position.y=1.05,u.add(w),n(a,o,5)>.15){const _=new tt(i,t);_.scale.set(.82,.82,.82),_.position.set(-f*.5-h*.1,.42,-p*.5-d*.1),u.add(_)}u.position.set(x,0,m),this.world.add(u)}}buildWell(){const t=Gi.c*P,e=Gi.r*P;this.blocked.add(`${Gi.c},${Gi.r}`);const n=new lt({map:ci(31)}),i=new lt({map:Oe(5)}),r=new lt({map:_s(3),side:te}),o=new Ze,a=new tt(new ye(1.15,1.25,1.05,24,1,!0),n);a.position.y=.52,o.add(a);const l=new tt(new ye(.98,.98,1.05,24,1,!0),new lt({color:1512208,side:Ye}));l.position.y=.52,o.add(l);const c=new tt(new Wo(.98,1.16,24),new lt({color:9274231,side:te}));c.rotation.x=-Math.PI/2,c.position.y=1.045,o.add(c);const h=new tt(new ye(.97,.97,.05,28),new G0({color:3109512,specular:12578559,shininess:100,transparent:!0,opacity:.95}));h.position.y=.86,o.add(h);const d=new tt(new Ho(.6,24),new Ce({color:12577525,transparent:!0,opacity:.25}));d.rotation.x=-Math.PI/2,d.position.set(-.12,.87,-.08),o.add(d),this.waterGlint=d;const f=new me(.16,2,.16);for(const u of[-1,1]){const S=new tt(f,i);S.position.set(u*.95,1.55,0),o.add(S)}const p=new tt(new me(2.2,.14,.14),i);p.position.y=2.5,o.add(p);const g=new tt(new ye(.025,.025,.72,6),new lt({color:7034422}));g.position.set(.2,2.08,0),o.add(g);const x=new tt(new ye(.24,.2,.34,12),i);x.position.set(.2,1.7,0),o.add(x);const m=new tt(new In(1.7,.95,4),r);m.position.y=3.05,m.rotation.y=Math.PI/4,o.add(m),o.position.set(t,0,e),this.world.add(o)}buildTunnel(){const t=new lt({map:fc(43),side:te}),e=new lt({map:cr(47),side:te}),n=new lt({map:cr(51),side:te}),i=new lt({map:ci(31)});let r=null;for(let o=0;o<qe;o++)for(let a=0;a<ln;a++){if(!ac(a,o))continue;const l=a*P,c=o*P,h=Ee(a,o)==="stairs",d=new tt(new Bt(P,P),n);if(d.rotation.x=Math.PI/2,d.position.set(l,fr,c),this.world.add(d),!h){const f=new tt(new Bt(P,P),t);f.rotation.x=-Math.PI/2,f.position.set(l,.03,c),this.world.add(f)}for(const[f,p]of mn){const g=Ee(a+f,o+p);g==="street"?r=[a,o]:(g==="mountain"||g==="building")&&!h&&this.addWall(l,c,f,p,0,fr,e)}h&&this.buildStairs(a,o,l,c,e,i)}if(r){const[o,a]=r,l=o*P,c=a*P,h=new Ce({color:16757322});for(const f of[-1,1]){const p=new tt(new ye(.05,.05,1.1,8),new lt({color:2759696}));p.position.set(l+f*(P/2-.25),1.9,c),this.world.add(p);const g=new tt(new Xo(.18,10,10),h);g.position.set(l+f*(P/2-.25),2.55,c),this.world.add(g)}const d=new pn(16752704,7,16,2);d.position.set(l,2.4,c+.5),this.world.add(d),this.flames.push({light:d,base:6})}}addDungeonLights(){this.world.add(new sr(6249066,.82)),this.world.add(new ir(7498878,1512736,.55))}vnoise(t,e,n){const i=(_,y,M)=>{const R=Math.sin(_*127.1+y*311.7+M*74.7)*43758.5453;return R-Math.floor(R)},r=Math.floor(t),o=Math.floor(e),a=Math.floor(n),l=t-r,c=e-o,h=n-a,d=_=>_*_*(3-2*_),f=d(l),p=d(c),g=d(h),x=(_,y,M)=>_+(y-_)*M,m=x(i(r,o,a),i(r+1,o,a),f),u=x(i(r,o+1,a),i(r+1,o+1,a),f),S=x(i(r,o,a+1),i(r+1,o,a+1),f),w=x(i(r,o+1,a+1),i(r+1,o+1,a+1),f);return x(x(m,u,p),x(S,w,p),g)}fbm(t,e,n){return this.vnoise(t,e,n)*.6+this.vnoise(t*2.1,e*2.1,n*2.1)*.3+this.vnoise(t*4.4,e*4.4,n*4.4)*.1}caveMesh(t,e,n,i,r,o,a,l,c=1,h=1){const d=[],f=[],p=[];for(let m=0;m<=o;m++)for(let u=0;u<=r;u++){const S=u/r,w=m/o;let _=t[0]+e[0]*S+n[0]*w,y=t[1]+e[1]*S+n[1]*w,M=t[2]+e[2]*S+n[2]*w;const R=Math.sin(Math.PI*S)*Math.sin(Math.PI*w),A=a*(this.fbm(_*.32,y*.32,M*.32)-.5)*R;_+=i[0]*A,y+=i[1]*A,M+=i[2]*A,d.push(_,y,M),f.push(S*c,w*h)}for(let m=0;m<o;m++)for(let u=0;u<r;u++){const S=m*(r+1)+u,w=S+1,_=S+r+1,y=_+1;p.push(S,_,w,w,_,y)}const g=new Ve;g.setAttribute("position",new Se(d,3)),g.setAttribute("uv",new Se(f,2)),g.setIndex(p),g.computeVertexNormals();const x=new tt(g,l);return this.world.add(x),x}rockSpire(t,e,n,i,r,o){const a=new In(r,Math.abs(i-n),7,4),l=a.attributes.position;for(let h=0;h<l.count;h++){const d=l.getX(h),f=l.getY(h),p=l.getZ(h),g=this.fbm(d*2+t,f*2,p*2+e)-.5;l.setXYZ(h,d+g*r*.7,f,p+g*r*.7)}a.computeVertexNormals();const c=new tt(a,o);return c.position.set(t,(n+i)/2,e),i<n&&(c.rotation.z=Math.PI),this.world.add(c),c}buildDungeon(){const t=Er,e=Ts,n=8.5,i=P/2,r=(_,y,M=0)=>Math.abs(Math.sin(_*12.9+y*78.2+M*3.1)*43758.5%1),o=new lt({map:cr(47),side:te}),a=new lt({map:fc(43),side:te}),l=new lt({map:cr(51),side:te}),c=this.decalMat(xc,.1),h=this.decalMat(vc,.08),d=new lt({map:mc(69),transparent:!0,alphaTest:.5,side:te}),f=new lt({map:Oe(5)}),p=new lt({color:2564893}),g=new lt({map:Ma(17)}),x=(_,y)=>{const M=_i(_,y);return M==="wall"||M==="secret"?!1:gs(_-1,y)&&gs(_+1,y)||gs(_,y-1)&&gs(_,y+1)},m=(_,y)=>{let M=0;for(const[R,A]of mn)gs(_+R,y+A)||M++;return M>=3&&!x(_,y)};let u=0;for(let _=0;_<e;_++)for(let y=0;y<t;y++){const M=_i(y,_);if(M==="wall")continue;const R=y*P,A=_*P,b=M==="secret";this.caveMesh([R-i,0,A-i],[P,0,0],[0,0,P],[0,1,0],4,4,.5,a,1,1),this.caveMesh([R-i,n,A-i],[P,0,0],[0,0,P],[0,-1,0],4,4,2.6,l,1,1);for(const[v,C]of mn){const U=_i(y+v,_+C),I=U==="wall",V=b&&U!=="secret"&&x(y+v,_+C);if(I||V){const K=R+v*i,X=A+C*i,it=v!==0?[0,0,P]:[P,0,0],$=v!==0?[K,0,X-i]:[K-i,0,X];this.caveMesh($,it,[0,n,0],[v,0,C],4,6,.9,o,1,2.4),V&&this.addWallDecal(y,_,v,C,h,1.9,1.8,1.7)}U==="wall"&&!b&&u<30&&r(y,_,v*5+C)<.2&&(this.addWallDecal(y,_,v,C,c,.85,1.4,2.1),this.glowLight(R+v*.3,2.3,A+C*.3,16752704,4.4,12),u++)}if(!b&&m(y,_)){const v=r(y,_,3);if(v<.16){const C=()=>(r(y,_,7)-.5)*1.6;this.rockSpire(R+C(),A-C(),0,1.4+v*6,.45+v,o)}else v<.34&&this.rockSpire(R,A,n,n-(1.4+r(y,_,9)*3.2),.4+r(y,_,2)*.5,o)}if(M==="bones"){const v=new tt(new Bt(1.7,1.3),d);v.rotation.x=-Math.PI/2,v.position.set(R,.05,A),this.world.add(v)}else if(M==="barrel"){const v=new tt(new ye(.42,.46,.95,12),g);v.position.set(R,.48,A),this.world.add(v),this.blocked.add(`${y},${_}`)}else M==="chest"&&(this.buildChest(R,A,f,p),this.blocked.add(`${y},${_}`))}const S=hc("U"),w=new pn(12574975,3.2,13,2);w.position.set(S.col*P,2.7,S.row*P),this.world.add(w),this.spawnDungeonEnemy()}buildChest(t,e,n,i){const r=new tt(new me(1,.6,.7),n);r.position.set(t,.3,e),this.world.add(r);const o=new tt(new me(1.03,.3,.73),n);o.position.set(t,.73,e),this.world.add(o);const a=new tt(new me(1.05,.95,.14),i);a.position.set(t,.46,e),this.world.add(a);const l=new pn(16764794,1.4,5,2);l.position.set(t,1.1,e),this.world.add(l)}spawnDungeonEnemy(){const t=e_("E").filter(i=>!(i.col===this.col&&i.row===this.row));if(!t.length)return;let e=t[0],n=1/0;for(const i of t){const r=Math.abs(i.col-this.col)+Math.abs(i.row-this.row);r<n&&(n=r,e=i)}this.buildDungeonEnemy(e.col,e.row)}addWall(t,e,n,i,r,o,a){const l=new tt(new Bt(P,o-r),a);l.position.set(t+n*(P/2),(r+o)/2,e+i*(P/2)),n===1?l.rotation.y=-Math.PI/2:n===-1?l.rotation.y=Math.PI/2:i===1?l.rotation.y=Math.PI:l.rotation.y=0,this.world.add(l)}buildStairs(t,e,n,i,r,o){const c=i+P/2,h=P/5,d=-5*.8;for(const[x,m]of mn){const u=Ee(t+x,e+m);(u==="mountain"||u==="building")&&this.addWall(n,i,x,m,d,fr,r)}for(let x=0;x<5;x++){const m=-x*.8,u=c-(x+.5)*h,S=m-d,w=new tt(new me(P,S,h+.02),o);w.position.set(n,m-S/2,u),this.world.add(w)}const f=new tt(new Bt(P,P),new Ce({color:328966}));f.rotation.x=-Math.PI/2,f.position.set(n,d+.02,i),this.world.add(f);const p=new pn(16760688,6,13,2);p.position.set(n,2.6,i+P/2-.3),this.world.add(p);const g=new pn(16752720,3.5,8,2);g.position.set(n,.4,i-.6),this.world.add(g)}buildEstablishments(t,e){for(const n of Ec){const{c:i,r,dc:o,dr:a,kind:l}=n;this.addDecal(i,r,o,a,t,"door"),this.doorMap.set(`${i},${r},${o},${a}`,l);const c=i*P+o*(P/2+.06),h=r*P+a*(P/2+.06),d=new tt(new Bt(1.05,1.75),e);d.position.set(c-a*1.3,2.05,h+o*1.3),d.rotation.y=o===1?Math.PI/2:o===-1?-Math.PI/2:a===1?0:Math.PI,d.renderOrder=4,this.world.add(d);const f=new Ze,p=.46,g=new lt({map:wa(Ra[l].name),transparent:!0,side:te}),x=new tt(new Bt(p*ov,p),g);x.position.set(0,1.74,.03),f.add(x);const m=av[l];m&&this.loadArt(m,y=>{g.map=y,g.needsUpdate=!0;const M=y.image;if(M&&M.width&&M.height){const R=M.width/M.height;x.geometry.dispose(),x.geometry=new Bt(p*R,p)}});const u=i*P+o*(P/2+.16),S=r*P+a*(P/2+.16),w=a,_=-o;f.position.set(u+w*1.5,0,S+_*1.5),f.rotation.y=o===1?Math.PI/2:o===-1?-Math.PI/2:a===1?0:Math.PI,this.world.add(f)}}buildHomes(t){for(const e of Ac){const{c:n,r:i,dc:r,dr:o,id:a}=e;this.addDecal(n,i,r,o,t,"door"),this.homeDoorMap.set(`${n},${i},${r},${o}`,a)}}addNPC(t,e,n,i,r,o,a=1,l,c){const h=u_(n),d=!!o,f=new lt({map:h,transparent:!0,alphaTest:.5,side:te}),p=(d?2.4:2.15)*a,g=(d?p*.671:1.3)*(d?1:a),x=d?p/2-p*.015+.06:1.1*a,m=new tt(new Bt(g*.95,g*.55),new Ce({map:this.shadowTex(),transparent:!0,depthWrite:!1,opacity:.55})),u=c?this.wallLean(t,e):{x:0,z:0},S=t*P+u.x,w=e*P+u.z;m.rotation.x=-Math.PI/2,m.position.set(S,.03,w),m.renderOrder=1,this.world.add(m);const _=new tt(new Bt(g,p),f);_.position.set(S,x,w),_.userData={baseY:x,h:p,ph:(t*12.9+e*7.3)%(Math.PI*2)},this.world.add(_);const y=this.makeNameTag(i.split(",")[0].trim());y.position.set(S,x+p/2+.18,w),this.world.add(y),this.npcs.push(_);const M=`${t},${e}`,R={name:i,lines:r,tex:h,art:!1,frames:1,portrait:void 0};this.npcMap.set(M,R),o&&this.loadArt(o,A=>{l&&(A.repeat.set(1/l.frames,1),A.offset.set(0,0),this.animTex.push({tex:A,frames:l.frames,fps:l.fps})),f.map=A,f.needsUpdate=!0,R.tex=A,R.art=!0,R.frames=l?.frames??1,R.portrait=void 0}),c&&this.walkers.push({mesh:_,shadow:m,tag:y,baseY:x,cur:{c:t,r:e},dayCell:{c:c.day[0],r:c.day[1]},nightCell:{c:c.night[0],r:c.night[1]},key:M,moving:!1,t0:0,from:{c:t,r:e},to:{c:t,r:e},fromX:S,fromZ:w,toX:S,toZ:w,waitUntil:0,inside:!1,doorDir:void 0,trans:null})}makeNameTag(t){const i='bold 40px "Cinzel", "MedievalSharp", system-ui, serif',r=document.createElement("canvas").getContext("2d");r.font=i;const a=Math.ceil(r.measureText(t).width)+36,l=58,c=document.createElement("canvas");c.width=a,c.height=l;const h=c.getContext("2d"),d=l/2;h.beginPath(),h.moveTo(d,0),h.arcTo(a,0,a,l,d),h.arcTo(a,l,0,l,d),h.arcTo(0,l,0,0,d),h.arcTo(0,0,a,0,d),h.closePath(),h.fillStyle="rgba(16,12,8,0.74)",h.fill(),h.lineWidth=3,h.strokeStyle="rgba(201,162,39,0.7)",h.stroke(),h.font=i,h.textAlign="center",h.textBaseline="middle",h.lineWidth=5,h.strokeStyle="rgba(0,0,0,0.85)",h.strokeText(t,a/2,l/2+1),h.fillStyle="#f0dca2",h.fillText(t,a/2,l/2+1);const f=new gi(c);f.colorSpace=Le,f.magFilter=He,f.minFilter=_n,f.generateMipmaps=!0;const p=new jl(new Mo({map:f,transparent:!0,depthWrite:!1})),g=.4;return p.scale.set(g*(a/l),g,1),p}shadowTex(){if(!this._shadowTex){const e=document.createElement("canvas");e.width=64,e.height=64;const n=e.getContext("2d"),i=n.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);i.addColorStop(0,"rgba(0,0,0,0.6)"),i.addColorStop(.6,"rgba(0,0,0,0.32)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,64,64);const r=new gi(e);r.colorSpace=Le,this._shadowTex=r}return this._shadowTex}loadArt(t,e){const n=this.artCache.get(t);if(n){e(n);return}new oh().load(t,i=>{i.colorSpace=Le,i.magFilter=He,i.minFilter=_n,i.generateMipmaps=!0,i.anisotropy=8,i.wrapS=gn,i.wrapT=gn,this.artCache.set(t,i),e(i)},void 0,()=>{})}buildNPCs(){const t=(performance.now()/ar+or)%1;this.npcNight=this.daylight(t)<.3;for(const e of Pv){const n=Dv[e.id],i=n?n.url:Uv[e.id],[r,o]=this.npcNight?e.night:[e.c,e.r];this.addNPC(r,o,e.seed,e.name,e.lines,i,e.scale??1,n?{frames:n.frames,fps:n.fps}:void 0,{day:[e.c,e.r],night:e.night})}}makePortrait(t,e=1){const n=t;if(!n)return null;const i=Math.floor((n.naturalWidth||n.width||0)/e),r=n.naturalHeight||n.height||0;if(!i||!r)return null;const o=132,a=document.createElement("canvas");a.width=o,a.height=o;const l=a.getContext("2d");if(!l)return null;l.imageSmoothingQuality="high";let c=i*.5-r*.09,h=r*.05,d=r*.18;try{const f=document.createElement("canvas");f.width=i,f.height=r;const p=f.getContext("2d");if(p){p.drawImage(t,0,0);const g=p.getImageData(0,0,i,r).data,x=40,m=w=>{let _=0,y=0,M=-1;for(let R=0;R<=i;R++)if(R<i&&g[(w*i+R)*4+3]>x)M<0&&(M=R);else if(M>=0){const b=R-M;b>_&&(_=b,y=M),M=-1}return{w:_,cx:y+_/2}};let u=-1,S=-1;for(let w=0;w<r&&u<0;w++)for(let _=0;_<i;_++)if(g[(w*i+_)*4+3]>x){u=w;break}for(let w=r-1;w>=0&&S<0;w--)for(let _=0;_<i;_++)if(g[(w*i+_)*4+3]>x){S=w;break}if(u>=0&&S>u){const w=S-u+1;let _=u;for(let A=u;A<u+w*.3;A++)if(m(A).w>i*.06){_=A;break}let y=0,M=i/2;const R=Math.round(w*.14);for(let A=_;A<_+R;A++){const b=m(A);b.w>y&&(y=b.w,M=b.cx)}d=Math.max(w*.13,Math.min(y*1.55,w*.3,r*.55)),c=M-d/2,h=_-d*.12}}}catch{}c=Math.max(0,Math.min(c,i-d)),h=Math.max(0,Math.min(h,r-d)),d=Math.min(d,i,r);try{return l.drawImage(t,c,h,d,d,0,0,o,o),a.toDataURL("image/png")}catch{return null}}portraitFor(t){const e=this.npcMap.get(t);if(!e)return null;if(e.portrait!==void 0)return e.portrait;const n=e.tex.image;if(!n)return null;const i=this.makePortrait(n,e.frames??1);return i&&(e.portrait=i),i}addForestLights(){const t=new sr(10134706,.72),e=new ir(10464188,4214830,.85),n=new tc(14673644,.5);n.position.set(-8,16,5),this.world.add(t),this.world.add(e),this.world.add(n),this.registerDayLight(t,3557482,.44),this.registerDayLight(e,2899038,.5),this.registerDayLight(n,6714797,.14)}buildForest(){const t=br,e=Ss,n=ba("s"),i=(y,M,R=0)=>{const A=Math.sin(y*41.3+M*17.7+R*7.13)*4213.1;return A-Math.floor(A)},r=new lt({map:Sa(61)});r.map.repeat.set(t+10,e+10);const o=new tt(new Bt((t+10)*P,(e+10)*P),r);o.rotation.x=-Math.PI/2,o.position.set((t/2-.5)*P,0,(e/2-.5)*P),this.world.add(o);const a=new lt({map:Ta(63)}),l=new Bt(P,P);for(let y=0;y<e;y++)for(let M=0;M<t;M++){const R=ui(M,y);if(R==="path"||R==="gate"||R==="spawn"||R==="sign"){const A=new tt(l,a);A.rotation.x=-Math.PI/2,A.rotation.z=Math.floor(i(M,y,9)*4)*Math.PI/2,A.position.set(M*P,.02,y*P),this.world.add(A)}}const c=Mc.length>0,h=(c?Mc:[65,66,67,71,79]).map((y,M)=>{const R=new lt({map:pc(65+M*6),transparent:!0,alphaTest:.4,side:te});return c&&this.loadArt(y,A=>{R.map=A,R.needsUpdate=!0}),R}),d=iv.map((y,M)=>{const R=new lt({map:pc(83+M*4),transparent:!0,alphaTest:.4,side:te});return this.loadArt(y,A=>{R.map=A,R.needsUpdate=!0}),R}),f=[67,73].map(y=>new lt({map:p_(y),transparent:!0,alphaTest:.4,side:te})),p=[75,77].map(y=>new lt({map:f_(y),transparent:!0,alphaTest:.35,side:te})),g=new lt({map:ya(41)}),x=new lt({map:mc(69),transparent:!0,alphaTest:.4,side:te}),m=new lt({map:Oe(5)}),u=new lt({map:Oe(7)}),S=(y,M,R,A,b,v=!1)=>{const C=new Bt(R,A),U=v?-1:1,I=new tt(C,b);I.position.set(y,A/2,M),I.scale.x=U;const V=new tt(C,b);V.position.set(y,A/2,M),V.rotation.y=Math.PI/2,V.scale.x=U,this.world.add(I),this.world.add(V)},w=c?sv:.44,_=(y,M,R,A,b)=>{const C=d.length>0&&i(A,b,17)<.12?d:h,U=C[Math.floor(i(A,b,4)*C.length)%C.length];S(y,M,R*w,R,U,i(A,b,16)>.5)};for(let y=0;y<e;y++)for(let M=0;M<t;M++){const R=ui(M,y),A=M*P,b=y*P;if(R==="tree"||R==="edge"){const v=R==="edge",C=(v?8:5.4)+i(M,y,1)*2.2,U=(i(M,y,2)-.5)*P*.45,I=(i(M,y,3)-.5)*P*.45;_(A+U,b+I,C,M,y),i(M,y,12)>.5&&S(A+U,b+I,2,1.1,p[Math.floor(i(M,y,13)*p.length)%p.length]),v&&this.blocked.add(`${M},${y}`)}else if(R==="bush"){const v=2.4+i(M,y,5)*.8,C=1.4+i(M,y,6)*.5,U=f[Math.floor(i(M,y,7)*f.length)%f.length];S(A,b,v,C,U),this.blocked.add(`${M},${y}`)}else if(R==="rock"){const v=1.1+i(M,y,8)*.8,C=new tt(new Vo(v),g);C.position.set(A,v*.55,b),C.rotation.set(i(M,y,9)*3,i(M,y,10)*3,.2),C.scale.y=.7,this.world.add(C),this.blocked.add(`${M},${y}`)}else if(R==="foliage"){const v=1.8+i(M,y,5)*.8,C=.9+i(M,y,6)*.5;S(A+(i(M,y,2)-.5)*P*.4,b+(i(M,y,3)-.5)*P*.4,v,C,p[Math.floor(i(M,y,7)*p.length)%p.length])}else if(R==="skull")S(A,b,2,1.4,x);else if(R==="sign"){const C=M===n.col&&y===n.row?[0,1]:this.forestSignFacing(M,y);this.buildForestSign(A,b,m,C),this.blocked.add(`${M},${y}`)}if(R==="grass"&&i(M,y,14)>.9){const v=new tt(new ye(.28,.32,2.4,8),u);v.rotation.set(0,i(M,y,15)*Math.PI,Math.PI/2),v.position.set(A,.28,b),this.world.add(v)}}if(dr.length>0){const y=this.makeClusterMats(),M=(b,v,C,U)=>{const I=15+i(U,0,2)*3,V=y[Math.floor(i(U,0,4)*y.length)%y.length],K=I*V.aspect,X=new tt(new Bt(K,I),V.mat);X.position.set(b,I/2-1,v),X.rotation.y=C,i(U,0,5)>.5&&(X.scale.x=-1),this.world.add(X)},R=15*1.85*.72;let A=0;for(let b=-P;b<=(t+1)*P;b+=R)M(b,-1.5*P,0,A++);for(let b=-P;b<=e*P;b+=R)M(-1.5*P,b,Math.PI/2,A++),M((t+.5)*P,b,-Math.PI/2,A++)}else{for(let y=-2;y<t+2;y+=2)_(y*P+1,-2*P,10+i(y,-3,1)*3,y,-3);for(let y=-1;y<e-2;y+=2)_(-2*P,y*P,9+i(-3,y,1)*3,-3,y),_((t+1)*P,y*P,9+i(t+2,y,1)*3,t+2,y)}this.buildForestBackdrop(),this.buildForestVillageBackdrop()}buildForestVillageBackdrop(){const t=ba("V"),e=t.col*P,n=t.row*P,i=n+9*P,r=.6,o=new lt({map:Sa(61)});o.map.repeat.set(20,16);const a=new tt(new Bt(22*P,16*P),o);a.rotation.x=-Math.PI/2,a.position.set(e,-.02,n+6*P),this.world.add(a);const l=new lt({map:Ta(63)}),c=new Bt(P,P);for(let y=n+1*P;y<i-2*P;y+=P){const M=new tt(c,l);M.rotation.x=-Math.PI/2,M.rotation.z=Math.round((y-n)/P)%2*(Math.PI/2),M.position.set(e,.02,y),this.world.add(M)}if(dr.length>0){const y=this.makeClusterMats(),M=13,R=(A,b,v,C)=>{const U=y[C%y.length],I=new tt(new Bt(M*U.aspect,M),U.mat);I.position.set(A,M/2-1,b),I.rotation.y=Math.PI,v&&(I.scale.x=-1),this.world.add(I)};R(e-13,i+2*P,!1,0),R(e+13,i+2*P,!0,1),R(e-20,i-1*P,!1,1),R(e+20,i-1*P,!0,0)}const h=new Ze,d=new lt({map:Oe(3)}),f=new lt({map:_s(3),side:te}),p=new lt({map:Oe(5)}),g=new lt({map:ya(41)}),x=new lt({map:ci(31)}),m=new lt({map:uc(7)}),u=new lt({color:2102288});m.map.repeat.set(6,5);const S=new tt(new Bt(24,18),m);S.rotation.x=-Math.PI/2,S.position.set(0,.06,2),h.add(S);const w=new tt(new me(34,9,7),g);w.position.set(-2,3.5,13),h.add(w);for(const[y,M,R,A]of[[-4,0,11,13],[1,-.5,10,15],[5.5,.5,9,11],[-9,.8,8,10]]){const b=new tt(new In(R,A,7),g);b.position.set(y*1.5,A/2+1.5,13+M),b.rotation.y=y,h.add(b)}const _=(y,M,R,A,b)=>{const v=new tt(new me(R,A,R),d);v.position.set(y,A/2,M),h.add(v);const C=new tt(new In(R*.82,A*.6,4),f);C.position.set(y,A+A*.28,M),C.rotation.y=Math.PI/4,h.add(C);const U=y+b[0]*(R/2+.03),I=M+b[1]*(R/2+.03),V=Math.atan2(b[0],b[1]),K=new tt(new Bt(R*.26,A*.5),u);K.position.set(U,A*.25,I),K.rotation.y=V,h.add(K);for(const X of[-1,1]){const it=new tt(new Bt(R*.16,A*.2),u);it.position.set(U+X*b[1]*R*.26,A*.62,I-X*b[0]*R*.26),it.rotation.y=V,h.add(it)}};{for(const[C,U,I]of[[-6,3,3.2],[-2,3.2,3.4],[2,3,3.1],[6,3.2,3.3]])_(C,7,U,I,[0,-1]);for(const C of[2.5,5])_(-8,C,3,3.1,[1,0]);for(const C of[2.5,5])_(8,C,3,3.1,[-1,0]);const y=new Ze,M=new tt(new ye(.85,.95,1,16),x);M.position.y=.5,y.add(M);for(const C of[-.75,.75]){const U=new tt(new me(.14,1.9,.14),p);U.position.set(C,1.45,0),y.add(U)}const R=new tt(new In(1.25,.7,4),f);R.position.y=2.5,R.rotation.y=Math.PI/4,y.add(R),y.position.set(0,0,2.5),h.add(y);const A=new Ze,b=new me(.36,3.4,.36);for(const C of[-1.6,1.6]){const U=new tt(b,p);U.position.set(C,1.7,0),A.add(U)}const v=new tt(new me(3.9,.36,.4),p);v.position.set(0,3.35,0),A.add(v),A.position.set(0,0,-3.5),h.add(A)}h.scale.setScalar(r),h.position.set(e,0,i),this.world.add(h)}forestSignFacing(t,e){const n=[[0,1],[1,0],[0,-1],[-1,0]];let i=[0,1];for(const[r,o]of n){if(ui(t+r,e+o)==="path")return[r,o];va(t+r,e+o)&&(i=[r,o])}return i}buildForestSign(t,e,n,i){const r=new Ze,o=new me(.16,2.3,.16);for(const c of[-.62,.62]){const h=new tt(o,n);h.position.set(c,1.15,0),r.add(h)}const a=new tt(new me(1.75,.66,.09),n);a.position.set(0,1.78,.02),r.add(a);const l=new tt(new me(1.85,.76,.06),new lt({color:2759696}));l.position.set(0,1.78,-.01),r.add(l),r.position.set(t,0,e),r.rotation.y=Math.atan2(i[0],i[1]),this.world.add(r)}buildForestBackdrop(){const t=new Ce({color:7305349}),e=new Ce({color:12108495}),n=(br/2-.5)*P,i=-7*P;[-2.4,-1.2,-.1,1,2.2].forEach((o,a)=>{const l=30+a*37%13,c=17+a*53%8,h=n+o*24,d=i-a*31%8,f=new tt(new In(c,l,5),t);f.position.set(h,l/2-3,d),f.rotation.y=a,this.world.add(f);const p=new tt(new In(c*.4,l*.32,5),e);p.position.set(h,l-l*.18-3,d),p.rotation.y=a,this.world.add(p)})}canWalk(t,e){return(this.location==="village"?xa(t,e):this.location==="forest"?va(t,e):this.location==="dungeon"?cc(t,e):Ca(t,e))&&!this.blocked.has(`${t},${e}`)}buildMiniGrid(){let t,e,n;this.location==="village"?(t=ln,e=qe,n=xa):this.location==="forest"?(t=br,e=Ss,n=va):this.location==="dungeon"?(t=Er,e=Ts,n=cc):(t=Eo,e=Ar,n=Ca);const i=new Uint8Array(t*e);for(let r=0;r<e;r++)for(let o=0;o<t;o++)i[r*t+o]=n(o,r)?1:0;this.miniGrid={cols:t,rows:e,cells:i}}pushMinimap(){this.miniGrid||this.buildMiniGrid();const t=this.miniGrid,[e,n]=mn[this.facing];this.ui.updateMinimap({cols:t.cols,rows:t.rows,cells:t.cells,col:this.col,row:this.row,dc:e,dr:n})}doInteract(){const t=this.facingTarget();if(t){if(t.kind==="enter"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=hr("P");this.enterLocation(t.estab,e.col,e.row,0)}else if(t.kind==="enterhome"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=hr("P");this.enterLocation(t.id,e.col,e.row,0)}else if(t.kind==="exit"){const{col:e,row:n,facing:i}=this.returnTo;this.enterLocation("village",e,n,i)}else if(t.kind==="talk"){const e=Rc(t.lines),n=this.portraitFor(t.key);this.dialogue={name:t.name,lines:e,idx:0,portrait:n},this.ui.showDialogue(t.name,e[0],n)}else if(t.kind==="dungeon"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=hc("S");this.enterLocation("dungeon",e.col,e.row,0)}else if(t.kind==="toforest"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=ba("P");this.enterLocation("forest",e.col,e.row,0)}else if(t.kind==="tovillage"){const e=lc();this.enterLocation("village",e.col,e.row-1,0)}else if(t.kind==="sign"){const e=Rc(t.lines);this.dialogue={name:"Placa",lines:e,idx:0,portrait:null},this.ui.showDialogue("Placa",e[0],null)}}}advanceDialogue(){this.dialogue&&(this.dialogue.idx++,this.dialogue.idx>=this.dialogue.lines.length?(this.dialogue=null,this.ui.hideDialogue()):this.ui.showDialogue(this.dialogue.name,this.dialogue.lines[this.dialogue.idx],this.dialogue.portrait??null))}box(t,e,n,i,r,o,a){const l=new tt(new me(i,r,o),a);return l.position.set(t,e,n),this.world.add(l),l}buildRoomShell(t=9,e=2,n=4864038){const r=new lt({map:Oe(t)}),o=new lt({map:Oe(e),side:te}),a=new lt({color:n,side:te}),l=new lt({map:h_(11),side:te}),c=new Bt(P,P);for(let p=0;p<Ar;p++)for(let g=0;g<Eo;g++){if(!Ca(g,p))continue;const x=new tt(c,r);x.rotation.x=-Math.PI/2,x.position.set(g*P,0,p*P),this.world.add(x);const m=new tt(c,a);m.rotation.x=Math.PI/2,m.position.set(g*P,3,p*P),this.world.add(m);for(const[u,S]of mn)Mr(g+u,p+S)==="#"&&this.addWall(g*P,p*P,u,S,0,3,o)}const h=hr("X"),d=new tt(new Bt(rc,rr),l);d.position.set(h.col*P,rr/2,h.row*P+P/2-.06),d.rotation.y=Math.PI,this.world.add(d);const f=new tt(new Bt(1.7,.6),new lt({map:wa("SAÍDA"),transparent:!0,side:te}));f.position.set(h.col*P,rr+.5,h.row*P+P/2-.08),f.rotation.y=Math.PI,this.world.add(f)}buildHome(t){this.buildRoomShell(9,6,3943450);const n=new lt({map:Oe(5)}),i=new lt({map:Oe(7)}),r=new lt({map:ci(31)}),o=new lt({color:7161136}),a=new lt({color:13350025});this.wallCell(1,3,[-1,0],(g,x)=>{this.box(g,1.2,x,.5,2.4,2,r),this.box(g+.42,.55,x,.34,.7,1.1,new Ce({color:16742942})),this.glowLight(g+1.4,1,x,16747054,4.2,10)});const l=3*P,c=3*P;this.blocked.add("3,3"),this.box(l,.95,c,1.7,.12,1.1,n);for(const[g,x]of[[-.7,0],[.7,0],[0,-.5],[0,.5]])this.box(l+g*.9,.42,c+x,.16,.84,.16,i);this.box(l,.45,c-.95,1.4,.12,.4,i),this.box(l,.45,c+.95,1.4,.12,.4,i),this.box(l-.4,1.06,c,.22,.1,.22,a);const h=new tt(new ye(.16,.13,.22,12),i);h.position.set(l+.35,1.11,c),this.world.add(h);const d=La[t].residents.length>=2?[[5,2],[5,4]]:[[5,3]];for(const[g,x]of d)this.wallCell(g,x,[1,0],(m,u)=>{this.box(m,.35,u,.9,.5,1.9,i),this.box(m,.66,u,.86,.16,1.8,a),this.box(m,.78,u-.7,.7,.18,.4,o)});this.wallCell(2,1,[0,-1],(g,x)=>{this.box(g,1.7,x,1.6,.1,.4,n);for(let m=-1;m<=1;m++){const u=new tt(new ye(.12,.1,.28,10),m===0?i:a);u.position.set(g+m*.45,1.9,x),this.world.add(u)}});const f=new tt(new Bt(2.2,1.6),new lt({color:8010538}));f.rotation.x=-Math.PI/2,f.position.set(3*P,.02,3*P+.2),this.world.add(f);const p=new pn(16769192,5.5,30,2);p.position.set(3*P,3-.4,3*P),this.world.add(p);for(const g of La[t].residents)this.addNPC(g.col,g.row,g.seed,g.name,g.lines,g.art,g.scale??1)}buildInterior(t){const n=new lt({map:Oe(5)});this.buildRoomShell(9,2,4864038);const i=hr("N"),r=i.col*P,o=i.row*P+P/2+.2;this.box(r,.55,o,P*2.4,1.1,.7,n),this.box(r,1.12,o,P*2.4+.2,.14,.95,n);const a=Ra[t];this.addNPC(i.col,i.row,a.seed,a.npc,a.lines,rv[t]);const l=new pn(16766106,4.5,15,2);l.position.set(r,2.5,i.row*P+1.6),this.world.add(l);const c=new pn(16769192,8,34,2);c.position.set(3*P,3-.3,3*P),this.world.add(c),this.box(3*P,3-.25,3*P,.4,.3,.4,new Ce({color:16758874})),t==="tavern"?this.propsTavern():t==="store"?this.propsStore():t==="smith"?this.propsSmith():this.propsAlchemist()}glowLight(t,e,n,i,r,o){const a=new pn(i,r,o,2);a.position.set(t,e,n),this.world.add(a),this.flames.push({light:a,base:r})}wallCell(t,e,n,i){const r=t*P+n[0]*(P/2-.75),o=e*P+n[1]*(P/2-.75);i(r,o),this.blocked.add(`${t},${e}`)}propsTavern(){const t=new lt({map:Oe(5)}),e=new lt({map:ci(31)}),n=new lt({map:Ma(17)}),i=new lt({color:13279818});this.wallCell(1,3,[-1,0],(r,o)=>{this.box(r,1.1,o,.5,2.2,2.2,e),this.box(r+.4,.6,o,.35,.8,1.2,new Ce({color:16742942})),this.glowLight(r+1.3,1,o,16747054,5,11)}),this.wallCell(1,2,[-1,0],(r,o)=>{const a=new tt(new ye(.5,.44,1.3,14),n);a.position.set(r,.65,o),this.world.add(a)});for(const r of[2,4])this.wallCell(5,r,[1,0],(o,a)=>{this.box(o,.9,a,.2,1,.2,t);const l=new tt(new ye(.8,.8,.15,16),t);l.position.set(o,1.45,a),this.world.add(l);const c=new tt(new ye(.14,.12,.28,10),i);c.position.set(o,1.66,a),this.world.add(c)})}propsStore(){const t=new lt({map:Oe(3)}),e=[9058874,3824266,5208634,11569712,8010362];let n=0;const i=(r,o,a)=>{this.box(r,1.05,o,.5,2.1,2.4,t);for(const l of[.7,1.4])for(const c of[-.7,.7]){const h=new lt({color:e[n++%e.length]});this.box(r-a*.35,l,o+c,.4,.5,.5,h)}};for(const r of[2,3,4])this.wallCell(1,r,[-1,0],(o,a)=>i(o,a,-1));for(const r of[2,3,4])this.wallCell(5,r,[1,0],(o,a)=>i(o,a,1))}propsSmith(){const t=new lt({color:4869716}),e=new lt({map:ci(31)}),n=new lt({map:Oe(5)}),i=new lt({map:Ma(17)});this.wallCell(1,3,[-1,0],(r,o)=>{this.box(r,1,o,.6,2,2.2,e),this.box(r+.45,1,o,.35,.5,1.2,new Ce({color:16738834})),this.glowLight(r+1.3,1.1,o,16742942,5.5,11)}),this.wallCell(1,4,[-1,0],(r,o)=>{this.box(r,.45,o,.6,.9,.6,n),this.box(r,1.05,o,.5,.35,1,t)}),this.wallCell(1,2,[-1,0],(r,o)=>{const a=new tt(new ye(.5,.44,1.2,14),i);a.position.set(r,.6,o),this.world.add(a)});for(const r of[2,3,4])this.wallCell(5,r,[1,0],(o,a)=>{this.box(o,1,a,.25,2,1.4,n);for(const l of[-.4,.4]){const c=new tt(new me(.08,1.5,.22),t);c.position.set(o-.2,1.4,a+l),this.world.add(c)}})}propsAlchemist(){const t=new lt({map:Oe(3)}),e=new lt({color:3817028}),n=[4239472,5267648,12599408,12623920,9453760];let i=0;const r=(o,a,l)=>{this.box(o,1.05,a,.5,2.1,2.4,t);for(const c of[.7,1.35,2])for(const h of[-.7,0,.7]){const d=new lt({color:n[i++%n.length]}),f=new tt(new ye(.11,.13,.36,8),d);f.position.set(o-l*.32,c,a+h),this.world.add(f)}};for(const o of[2,3])this.wallCell(1,o,[-1,0],(a,l)=>r(a,l,-1));for(const o of[2,3])this.wallCell(5,o,[1,0],(a,l)=>r(a,l,1));this.wallCell(1,4,[-1,0],(o,a)=>{const l=new tt(new ye(.6,.48,.85,16),e);l.position.set(o,.5,a),this.world.add(l);const c=new tt(new ye(.53,.53,.1,16),new Ce({color:7077792}));c.position.set(o,.92,a),this.world.add(c),this.glowLight(o+.9,1.2,a,5308314,3.2,8)}),this.wallCell(5,4,[1,0],(o,a)=>{this.box(o,.8,a,.9,.15,1.6,t),this.box(o,.98,a+.3,.5,.16,.6,new lt({color:6961706}))})}buildRoofs(t){const e=(i,r)=>t[Math.floor(Math.abs(this.mHash(i,r,9))*997)%t.length],n=(i,r,o,a)=>{if(Ee(i,r)!=="building")return!1;const l=Ee(i+o,r+a);return l==="street"||l==="barrel"};for(const i of[1,-1])for(let r=0;r<ln;r++){let o=0;for(;o<qe;)if(n(r,o,i,0)){let a=o;for(;a+1<qe&&n(r,a+1,i,0);)a++;let l=_a;for(let c=o;c<=a;c++)l=Math.min(l,this.depthInto(r,c,-i,0));this.addRoofRun(r,o,r,a,i,0,l,e(r,o)),o=a+1}else o++}for(const i of[1,-1])for(let r=0;r<qe;r++){let o=0;for(;o<ln;)if(n(o,r,0,i)){let a=o;for(;a+1<ln&&n(a+1,r,0,i);)a++;let l=_a;for(let c=o;c<=a;c++)l=Math.min(l,this.depthInto(c,r,0,-i));this.addRoofRun(o,r,a,r,0,i,l,e(o,r)),o=a+1}else o++}}depthInto(t,e,n,i){let r=0;for(;r<_a&&Ee(t+n*r,e+i*r)==="building";)r++;return Math.max(1,r)}addRoofRun(t,e,n,i,r,o,a,l){const c=jn-.15,h=jn+ma,d=new F,f=new F,p=new F,g=new F,x=new F,m=new F;let u,S,w;const _=a*P-P/2;if(r!==0){const A=t*P+r*(P/2)+r*ic,b=t*P-r*_,v=(A+b)/2,C=e*P-P/2,U=i*P+P/2;d.set(A,c,C),f.set(A,c,U),p.set(v,h,C),g.set(v,h,U),x.set(b,c,C),m.set(b,c,U),u=i-e+1,S=Math.abs(A-v)/P+.5,w=Math.abs(v-b)/P+.5}else{const A=e*P+o*(P/2)+o*ic,b=e*P-o*_,v=(A+b)/2,C=t*P-P/2,U=n*P+P/2;d.set(C,c,A),f.set(U,c,A),p.set(C,h,v),g.set(U,h,v),x.set(C,c,b),m.set(U,c,b),u=n-t+1,S=Math.abs(A-v)/P+.5,w=Math.abs(v-b)/P+.5}this.world.add(this.quad(d,f,g,p,l,u,S)),this.world.add(this.quad(p,g,m,x,l,u,w)),this.world.add(this.tri(d,p,x,l)),this.world.add(this.tri(f,m,g,l));const y=d.clone();y.y-=sc;const M=f.clone();M.y-=sc,this.world.add(this.quad(y,M,f,d,l,u,.3))}tri(t,e,n,i){const r=new Ve;return r.setAttribute("position",new $e(new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z]),3)),r.setAttribute("uv",new $e(new Float32Array([0,0,1,0,.5,1]),2)),r.setIndex([0,1,2]),r.computeVertexNormals(),new tt(r,i)}decalMat(t,e=.35){const n=new lt({transparent:!0,alphaTest:e,side:te});return n.colorWrite=!1,n.depthWrite=!1,this.loadArt(t,i=>{n.map=i,n.colorWrite=!0,n.depthWrite=!0,n.needsUpdate=!0}),n}addWallDecal(t,e,n,i,r,o,a,l){const c=new tt(new Bt(o,a),r);c.position.set(t*P+n*(P/2+.05),l,e*P+i*(P/2+.05)),c.rotation.y=n===1?Math.PI/2:n===-1?-Math.PI/2:i===1?0:Math.PI,c.renderOrder=4,this.world.add(c)}addDecal(t,e,n,i,r,o){const a=o==="door"?rc:j0,l=o==="door"?rr:Z0,c=o==="door"?l/2+.02:K0,h=new tt(new Bt(a,l),r),d=t*P+n*(P/2+.04),f=e*P+i*(P/2+.04);h.position.set(d,c,f),n===1?h.rotation.y=Math.PI/2:n===-1?h.rotation.y=-Math.PI/2:i===1?h.rotation.y=0:h.rotation.y=Math.PI,this.world.add(h)}quad(t,e,n,i,r,o=1,a=1){const l=new Ve,c=new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z,i.x,i.y,i.z]);return l.setAttribute("position",new $e(c,3)),l.setAttribute("uv",new $e(new Float32Array([0,0,o,0,o,a,0,a]),2)),l.setIndex([0,1,2,0,2,3]),l.computeVertexNormals(),new tt(l,r)}onAction(t){if(this.dialogue){t==="interact"&&this.advanceDialogue();return}if(t==="interact"){this.doInteract();return}if(t==="attack"){const a=this.ui.swingWeapon();a>=0&&window.setTimeout(()=>this.tryHitEnemy(),a);return}if(this.anim)return;if(t==="turnLeft"||t==="turnRight"){const a=t==="turnLeft"?1:-1;this.facing=(this.facing+(a===1?3:1))%4,this.pushMinimap(),this.anim={kind:"turn",t0:performance.now(),fromY:this.camera.rotation.y,toY:this.camera.rotation.y+Math.PI/2*a};return}let e=this.facing;t==="back"?e=(e+2)%4:t==="strafeLeft"?e=(e+3)%4:t==="strafeRight"&&(e=(e+1)%4);const[n,i]=mn[e],r=this.col+n,o=this.row+i;this.canWalk(r,o)&&(this.anim={kind:"move",t0:performance.now(),fromX:this.col*P,fromZ:this.row*P,toX:r*P,toZ:o*P},this.col=r,this.row=o,this.pushMinimap(),this.location==="forest"&&ui(r,o)==="tree"&&this.brushFoliage())}brushFoliage(){const t=this.foliageFx;t&&(t.style.transition="none",t.style.opacity="0.55",t.offsetWidth,t.style.transition="opacity 620ms ease-out",t.style.opacity="0")}updateNpcPhase(t){const e=(t/ar+or)%1,n=this.daylight(e);return!this.npcNight&&n<.26?(this.npcNight=!0,this.staggerDepart(t)):this.npcNight&&n>.44&&(this.npcNight=!1,this.staggerDepart(t)),this.npcNight}staggerDepart(t){this.walkers.forEach((e,n)=>{e.waitUntil=Math.max(e.waitUntil,t+n*650)})}wallLean(t,e){const i=[[-1,0],[1,0],[0,-1],[0,1]];for(const[r,o]of i){const a=Ee(t+r,e+o);if(a==="building"||a==="mountain")return{x:r*1.3,z:o*1.3}}return{x:0,z:0}}nightDoorDir(t){const e=[[-1,0],[1,0],[0,-1],[0,1]];for(const[n,i]of e){const r=t.c+n,o=t.r+i;if(Ee(r,o)!=="building")continue;const a=`${r},${o},${-n},${-i}`;if(this.doorMap.has(a)||this.homeDoorMap.has(a))return{dc:n,dr:i}}return null}setWalkerOpacity(t,e){const n=t.mesh.material,i=e>=.99?.5:.02;n.alphaTest!==i&&(n.alphaTest=i,n.needsUpdate=!0),n.opacity=e,t.shadow.material.opacity=.55*e,t.tag.material.opacity=e}setWalkerVisible(t,e){t.mesh.visible=e,t.shadow.visible=e,t.tag.visible=e}plazaWalkable(t,e){if(t===Gi.c&&e===Gi.r)return!1;const n=e>=6&&e<=12&&t>=2&&t<=12,i=e>=13&&e<=14&&t>=6&&t<=8;return!n&&!i?!1:xa(t,e)}cellFreeForWalker(t,e,n){if(!this.plazaWalkable(t,e)||t===this.col&&e===this.row)return!1;for(const i of this.walkers)if(i!==n&&!i.inside&&(i.cur.c===t&&i.cur.r===e||i.moving&&i.to.c===t&&i.to.r===e))return!1;return!0}bfsNextStep(t,e){const n=(h,d)=>h+","+d;if(t.c===e.c&&t.r===e.r)return null;const i=new Map;i.set(n(t.c,t.r),null);const r=[t];let o=0;const a=[[0,-1],[1,0],[0,1],[-1,0]];let l=!1;for(;o<r.length;){const h=r[o++];if(h.c===e.c&&h.r===e.r){l=!0;break}for(const[d,f]of a){const p=h.c+d,g=h.r+f,x=n(p,g);i.has(x)||!(p===e.c&&g===e.r)&&!this.plazaWalkable(p,g)||(i.set(x,h),r.push({c:p,r:g}))}}if(!l&&!i.has(n(e.c,e.r)))return null;let c=e;for(let h=0;h<400;h++){const d=i.get(n(c.c,c.r));if(!d)return null;if(d.c===t.c&&d.r===t.r)return c;c=d}return null}updateWalkers(t){if(this.walkers.length===0||this.dialogue)return;const e=900,n=640,i=this.updateNpcPhase(t);for(const r of this.walkers){if(r.trans){const o=Math.min(1,(t-r.trans.t0)/n),a=o*o*(3-2*o),l=r.trans.fromX+(r.trans.toX-r.trans.fromX)*a,c=r.trans.fromZ+(r.trans.toZ-r.trans.fromZ)*a;r.mesh.position.x=l,r.mesh.position.z=c,r.shadow.position.x=l,r.shadow.position.z=c,r.tag.position.x=l,r.tag.position.z=c,this.setWalkerOpacity(r,r.trans.kind==="enter"?1-a:a),o>=1&&(r.trans.kind==="enter"?(r.inside=!0,this.setWalkerVisible(r,!1)):(this.setWalkerOpacity(r,1),r.mesh.position.set(r.toX,r.baseY,r.toZ),r.shadow.position.set(r.toX,.03,r.toZ)),r.trans=null);continue}if(r.inside){if(!i){const o=r.doorDir??this.nightDoorDir(r.nightCell),a=this.wallLean(r.nightCell.c,r.nightCell.r),l=r.nightCell.c*P+a.x,c=r.nightCell.r*P+a.z,h=r.nightCell.c*P+(o?.dc??0)*(P/2+.2),d=r.nightCell.r*P+(o?.dr??0)*(P/2+.2);this.setWalkerVisible(r,!0),this.setWalkerOpacity(r,0),r.mesh.position.set(h,r.baseY,d),r.trans={kind:"exit",t0:t,fromX:h,fromZ:d,toX:l,toZ:c}}continue}if(r.moving){const o=Math.min(1,(t-r.t0)/e),a=o*o*(3-2*o),l=r.fromX+(r.toX-r.fromX)*a,c=r.fromZ+(r.toZ-r.fromZ)*a;r.mesh.position.x=l,r.mesh.position.z=c,r.mesh.position.y=r.baseY+Math.sin(o*Math.PI)*.05,r.shadow.position.x=l,r.shadow.position.z=c,r.tag.position.x=l,r.tag.position.z=c,o>=1&&(r.moving=!1,r.mesh.position.y=r.baseY,r.waitUntil=t+240+(r.cur.c*37+r.cur.r*17)%220)}else if(t>=r.waitUntil){const o=i?r.nightCell:r.dayCell;if(r.cur.c===o.c&&r.cur.r===o.r){if(i&&(r.doorDir===void 0&&(r.doorDir=this.nightDoorDir(r.nightCell)),r.doorDir)){const f=r.nightCell.c*P+r.doorDir.dc*(P/2+.2),p=r.nightCell.r*P+r.doorDir.dr*(P/2+.2);r.trans={kind:"enter",t0:t,fromX:r.mesh.position.x,fromZ:r.mesh.position.z,toX:f,toZ:p};continue}r.waitUntil=t+500;continue}const a=this.bfsNextStep(r.cur,o);if(!a){r.waitUntil=t+500;continue}if(!this.cellFreeForWalker(a.c,a.r,r)){r.waitUntil=t+300;continue}const l=`${a.c},${a.r}`,c=this.npcMap.get(r.key);c&&(this.npcMap.delete(r.key),this.npcMap.set(l,c));const d=a.c===o.c&&a.r===o.r?this.wallLean(a.c,a.r):{x:0,z:0};r.fromX=r.mesh.position.x,r.fromZ=r.mesh.position.z,r.toX=a.c*P+d.x,r.toZ=a.r*P+d.z,r.from={c:r.cur.c,r:r.cur.r},r.to=a,r.cur=a,r.key=l,r.moving=!0,r.t0=t}}}tick(t){const e=this.anim;if(e)if(e.kind==="move"){const c=Math.min(1,(t-e.t0)/ch),h=c*c*(3-2*c);this.camera.position.x=e.fromX+(e.toX-e.fromX)*h,this.camera.position.z=e.fromZ+(e.toZ-e.fromZ)*h,this.camera.position.y=ga+Math.sin(c*Math.PI)*.07,c>=1&&(this.camera.position.y=ga,this.anim=null)}else{const c=Math.min(1,(t-e.t0)/J0),h=c*c*(3-2*c);this.camera.rotation.y=e.fromY+(e.toY-e.fromY)*h,c>=1&&(this.anim=null)}const n=this.camera.position.x,i=this.camera.position.z;for(const c of this.npcs){c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z);const h=c.userData;if(h&&h.h){const d=1+Math.sin(t*.0016+h.ph)*.014;c.scale.y=d,c.position.y=h.baseY+(d-1)*h.h/2,c.rotation.z=Math.sin(t*.0011+h.ph*1.7)*.007}}for(const c of this.billboardProps)c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z);if(this.reticle&&this.target&&!this.target.dyingAt){this.reticle.visible=!0;let c=n-this.target.bx,h=i-this.target.bz;const d=Math.hypot(c,h)||1;c/=d,h/=d,this.reticle.position.set(this.target.bx+c*.3,1.35,this.target.bz+h*.3)}else this.reticle&&(this.reticle.visible=!1);const r=this.lastTickMs?Math.min(.1,(t-this.lastTickMs)/1e3):0;this.lastTickMs=t,r>0&&this.playerMp<this.playerMaxMp&&(this.playerMp=Math.min(this.playerMaxMp,this.playerMp+this.playerMaxMp*.03*r+1.5*r),this.ui.setMana(this.playerMp/this.playerMaxMp));const o=!!this.buff&&t<this.buff.until;if(this.buffActive&&!o&&(this.buff=null,this.recomputeDerived()),this.buffActive=o,this.coolingSkills.size)for(const c of this.coolingSkills){const d=(this.cooldownUntil[c]??0)-t;if(d<=0)this.ui.setSkillCooldown(c,0,0),this.coolingSkills.delete(c);else{const f=To(c).cd;this.ui.setSkillCooldown(c,d/f,Math.ceil(d/1e3))}}const a=this.enemy;if(a){const c=a.mesh.geometry.parameters.height;let h=n-a.bx,d=i-a.bz;const f=Math.hypot(h,d)||1;h/=f,d/=f;let p=0,g=1,x=0,m=0,u=0,S=0;const w=t-a.hitAt;if(a.dyingAt){const _=(t-a.dyingAt)/650;a.mat.opacity=Math.max(0,1-_*3),a.mesh.rotation.z=-_*1.6;const y=Math.max(.12,1-_*.55);if(a.mesh.scale.set(1+_*.35,y,1),a.mesh.position.y=c/2-_*.75,a.bar.visible=!1,_>=1){for(const M of[a.mesh,a.bar]){this.world.remove(M);const R=this.billboardProps.indexOf(M);R>=0&&this.billboardProps.splice(R,1)}a.mesh.geometry.dispose(),a.mat.dispose(),this.enemy=null,window.setTimeout(()=>{this.enemy||(this.location==="village"?this.buildDungeonEnemy():this.location==="dungeon"&&this.spawnDungeonEnemy())},5e3)}}else{const _=Math.abs(this.col-a.c)+Math.abs(this.row-a.r)===1;if(!a.atkAt&&_&&t>=a.nextAtk&&(a.atkAt=t),a.atkAt){const y=(t-a.atkAt)/700;if(y<.4){const M=y/.4;p=-.35*M,g=1-.05*M}else if(y<.6){const M=(y-.4)/.2;p=-.35+1.25*M,g=.95+.27*M}else{const M=(y-.6)/.4;p=.9*(1-M),g=1.22-.22*M}!a.hitApplied&&y>.52&&(a.hitApplied=!0,_&&this.damagePlayer(12)),y>=1&&(a.atkAt=0,a.hitApplied=!1,a.nextAtk=t+1100)}if(w<240){const y=w/240,M=Math.sin((1-y)*Math.PI);p-=M*.6;const R=1-y*.7;m=R,u=R*.2,S=R*.16,x=M*.14}a.mesh.position.set(a.bx+h*p,c/2,a.bz+d*p),a.mesh.scale.set(g,g,1),a.mesh.rotation.z=x}a.mat.emissive.setRGB(m,u,S)}this.updatePoofs(t),this.updateProjectiles(t),this.updateDayNight(t);const l=(t/ar+or)%1;this.ui.setClock(l,this.daylight(l));for(const c of this.flames)c.light.intensity=c.base+Math.sin(t*.011+c.base)*.8+Math.sin(t*.027)*.5;for(const c of this.animTex)c.tex.offset.x=Math.floor(t/1e3*c.fps)%c.frames/c.frames;this.updateWalkers(t);for(const c of this.smoke){const h=c.userData,d=(t*28e-5+h.phase)%4/4,f=d*4.2;c.position.set(h.baseX+Math.sin(t*6e-4+h.phase)*.5,jn+ma+f,h.baseZ);const p=.6+d*1.6;c.scale.set(p,p,p),c.material.opacity=Math.sin(d*Math.PI)*.42,c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z)}if(this.waterGlint){const c=this.waterGlint.material;c.opacity=.18+(Math.sin(t*.0016)+1)*.11;const h=1+Math.sin(t*.0013+1)*.08;this.waterGlint.scale.set(h,h,h)}this.anim||this.updatePrompt(),this.renderer.render(this.scene,this.camera)}updatePrompt(){const t=this.facingTarget();let e=" ";t&&(t.kind==="enter"?e=`Entrar — ${Ra[t.estab].name}`:t.kind==="enterhome"?e="Entrar na casa":t.kind==="exit"?e="Sair":t.kind==="talk"?e=`Falar com ${t.name}`:t.kind==="dungeon"?e="Descer à masmorra":t.kind==="toforest"?e="Ir para a Floresta":t.kind==="tovillage"?e="Voltar ao Vilarejo":t.kind==="sign"&&(e="Ler a placa")),e!==this.lastPrompt&&(this.lastPrompt=e,this.ui.setPrompt(e===" "?null:e))}facingTarget(){const[t,e]=mn[this.facing],n=this.col+t,i=this.row+e,r=this.npcMap.get(`${n},${i}`);if(r)return{kind:"talk",name:r.name,lines:r.lines,key:`${n},${i}`};if(this.location==="village"){const o=this.doorMap.get(`${n},${i},${-t},${-e}`);if(o)return{kind:"enter",estab:o};const a=this.homeDoorMap.get(`${n},${i},${-t},${-e}`);if(a)return{kind:"enterhome",id:a};if(Ee(n,i)==="stairs")return{kind:"dungeon"};if(Ee(n,i)==="forestgate"||Ee(this.col,this.row)==="forestgate")return{kind:"toforest"}}else if(this.location==="forest"){const o=ui(n,i);if(o==="gate"||ui(this.col,this.row)==="gate")return{kind:"tovillage"};if(o==="sign")return{kind:"sign",lines:Q0(n,i)}}else if(this.location==="dungeon"){if(_i(n,i)==="stairs"||_i(this.col,this.row)==="stairs")return{kind:"exit"}}else if(Mr(n,i)==="X"||Mr(this.col,this.row)==="X")return{kind:"exit"};return null}resize(){const t=this.container.clientWidth||window.innerWidth,e=this.container.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}};gt(Cr,"SKY_KEYS",[[0,1186355],[.2,1581630],[.25,3750234],[.29,13601368],[.37,9542054],[.5,8884384],[.66,9736345],[.72,13464642],[.78,4863560],[.85,2239564],[1,1186355]]);let Rr=Cr;const kv=""+new URL("cluster1-CDwqmovY.png",import.meta.url).href,Nv=""+new URL("cluster2-C0czRdHN.png",import.meta.url).href,Fv=""+new URL("death_poof-BE-q7e2_.png",import.meta.url).href,Ov=""+new URL("dec_banner-UBOZSe9G.png",import.meta.url).href,Bv=""+new URL("dec_cracks-DKSsqxx2.png",import.meta.url).href,zv=""+new URL("dec_door-B5wowGxb.png",import.meta.url).href,Hv=""+new URL("dec_ivy-D9e2Lu2_.png",import.meta.url).href,Gv=""+new URL("dec_torch-CtkBMXz7.png",import.meta.url).href,Vv=""+new URL("dec_window-DrwRbTKE.png",import.meta.url).href,Wv=""+new URL("enemy_skeleton-BcZFeUKH.png",import.meta.url).href,Xv=""+new URL("pine1-Cx-eXiFP.png",import.meta.url).href,qv=""+new URL("pine2-CUzpurmt.png",import.meta.url).href,$v=""+new URL("pine3-SLpwxU-f.png",import.meta.url).href,Yv=""+new URL("pine4-D2rjz_P9.png",import.meta.url).href,jv=""+new URL("prop_lamp-D_-YfjKt.png",import.meta.url).href,Zv=""+new URL("prop_notice-Bo5C5meg.png",import.meta.url).href,Kv=""+new URL("sign_alch-CZuh7kJW.png",import.meta.url).href,Jv=""+new URL("sign_smith-B08qmnbc.png",import.meta.url).href,Qv=""+new URL("sign_store-C8OmR8-U.png",import.meta.url).href,t1=""+new URL("sign_tavern-DPGpN59J.png",import.meta.url).href,e1=""+new URL("sword-Cnq9dXJw.png",import.meta.url).href,n1=""+new URL("sword_atk-BUeBP5dr.png",import.meta.url).href,i1=""+new URL("tex_cobble-DXMPAwZE.jpg",import.meta.url).href,s1=""+new URL("tex_dirt-BHcbB_Wz.jpg",import.meta.url).href,r1=""+new URL("tex_grass-C2Q1l28q.jpg",import.meta.url).href,a1=""+new URL("tex_mosswall-DpaqdZvP.jpg",import.meta.url).href,o1=""+new URL("tex_stonewall-BFmowWy6.jpg",import.meta.url).href,l1=""+new URL("tex_thatch-DdJMnyvF.jpg",import.meta.url).href,c1=""+new URL("tex_wood-B0jCHZZA.jpg",import.meta.url).href,h1=""+new URL("wpn_axe-CvCTYMUq.png",import.meta.url).href,d1=""+new URL("wpn_dagger-BBXQkEIm.png",import.meta.url).href,u1=""+new URL("wpn_greatsword-C2mQEgxH.png",import.meta.url).href,f1=""+new URL("wpn_mace-tTLR-MzC.png",import.meta.url).href,p1=""+new URL("wpn_maul-DbliXABw.png",import.meta.url).href,m1=""+new URL("wpn_orb-BsomjHDA.png",import.meta.url).href,g1=""+new URL("wpn_rapier-dNk4ndjW.png",import.meta.url).href,_1=""+new URL("wpn_shield-Bw_-3z5v.png",import.meta.url).href,x1=""+new URL("wpn_staff-DGpAnpDH.png",import.meta.url).href,v1=""+new URL("wpn_sword-CpsgndpE.png",import.meta.url).href,b1=""+new URL("alquimista-ssXsgGLn.png",import.meta.url).href,M1=""+new URL("anselmo-a5GEbqfY.png",import.meta.url).href,w1=""+new URL("camponesa-CrL0OA2Y.png",import.meta.url).href,y1=""+new URL("costureira-Br8zMBee.png",import.meta.url).href,S1=""+new URL("fazendeiro-CLjUAd1g.png",import.meta.url).href,T1=""+new URL("ferreiro-BdN9Klhc.png",import.meta.url).href,E1=""+new URL("gunther-D_2fJfLI.png",import.meta.url).href,A1=""+new URL("hedda-Buaz2cmx.png",import.meta.url).href,R1=""+new URL("lenhador-B54mx8Mi.png",import.meta.url).href,C1=""+new URL("lyle-gu11Pcfp.png",import.meta.url).href,L1=""+new URL("mercadora-B8RulStP.png",import.meta.url).href,P1=""+new URL("pip-rEDWa-7w.png",import.meta.url).href,U1=""+new URL("tam-BlgWIVim.png",import.meta.url).href,D1=""+new URL("taverneiro-Ba4UKFJq.png",import.meta.url).href,I1=""+new URL("wilma-DI_QNtI6.png",import.meta.url).href,k1=""+new URL("btn_base-wlebnyD3.png",import.meta.url).href,N1=""+new URL("class_clerigo-Bv6kp9nE.png",import.meta.url).href,F1=""+new URL("class_guerreiro-DQxwW6XE.png",import.meta.url).href,O1=""+new URL("class_icon_clerigo-DoeXMn4k.png",import.meta.url).href,B1=""+new URL("class_icon_guerreiro-C0eBl5F1.png",import.meta.url).href,z1=""+new URL("class_icon_ladino-D8WBB-2i.png",import.meta.url).href,H1=""+new URL("class_icon_mago-CqEgdtDo.png",import.meta.url).href,G1=""+new URL("class_ladino-CBY8tWR5.png",import.meta.url).href,V1=""+new URL("class_mago-BCWgBU8E.png",import.meta.url).href,W1=""+new URL("clock_moon-D1xrN5yT.png",import.meta.url).href,X1=""+new URL("clock_sun-DO5hSXa1.png",import.meta.url).href,q1=""+new URL("coin-CsF22FSK.png",import.meta.url).href,$1=""+new URL("create_bg-B2uN_HVG.png",import.meta.url).href,Y1=""+new URL("dpad-3wZIZEqb.png",import.meta.url).href,j1=""+new URL("eq_container-84uusXC9.png",import.meta.url).href,Z1=""+new URL("eq_frame-d-QhyRgX.png",import.meta.url).href,K1=""+new URL("eq_slot-DS9kMsLx.png",import.meta.url).href,J1=""+new URL("fx_corrente-CI-yrk7e.png",import.meta.url).href,Q1=""+new URL("fx_descarga-IY9gTcyD.png",import.meta.url).href,tb=""+new URL("fx_fireball-CNUxOMXZ.png",import.meta.url).href,eb=""+new URL("fx_ice-DGJxZKsy.png",import.meta.url).href,nb=""+new URL("fx_ice_lance-DCxKutbL.png",import.meta.url).href,ib=""+new URL("fx_imolacao-C-a5dtuo.png",import.meta.url).href,sb=""+new URL("fx_l_apunhalar-BRQuzQIj.png",import.meta.url).href,rb=""+new URL("fx_l_arremesso-rtDW0ow6.png",import.meta.url).href,ab=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,ob=""+new URL("fx_l_dupla-C6r_wn6L.png",import.meta.url).href,lb=""+new URL("fx_l_estocada-hJYwlzLR.png",import.meta.url).href,cb=""+new URL("fx_l_mortal-DuYG-M3q.png",import.meta.url).href,hb=""+new URL("fx_l_nuvem-B2qmk_tl.png",import.meta.url).href,db=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,ub=""+new URL("fx_l_sombras-fe3usKIe.png",import.meta.url).href,fb=""+new URL("fx_l_toxina-Bu3f7mn-.png",import.meta.url).href,pb=""+new URL("fx_meteoro-DywgnSdp.png",import.meta.url).href,mb=""+new URL("fx_muralha-yiXxe2Yc.png",import.meta.url).href,gb=""+new URL("fx_prisao-BDhoA-oK.png",import.meta.url).href,_b=""+new URL("fx_ray-BukWo5qE.png",import.meta.url).href,xb=""+new URL("fx_tempestade-DS9uv2Z_.png",import.meta.url).href,vb=""+new URL("hud_plate-B2ygb4FP.png",import.meta.url).href,bb=""+new URL("ico_action-BRbeFgHL.png",import.meta.url).href,Mb=""+new URL("ico_attack-CbdvrLXs.png",import.meta.url).href,wb=""+new URL("ico_inventory-B_-_sjLB.png",import.meta.url).href,yb=""+new URL("load_sword-Bhnb8m09.png",import.meta.url).href,Sb=""+new URL("logo_plate-CK0-uVl1.png",import.meta.url).href,Tb=""+new URL("map_frame-B4piWonF.png",import.meta.url).href,Eb=""+new URL("menu_plate-_kr3JKFU.png",import.meta.url).href,Ab=""+new URL("bg_clerigo-BUhJVnRj.jpg",import.meta.url).href,Rb=""+new URL("bg_guerreiro-DWgmGaUG.jpg",import.meta.url).href,Cb=""+new URL("bg_ladino-B6L4a-g-.jpg",import.meta.url).href,Lb=""+new URL("bg_mago-Bct2J94D.jpg",import.meta.url).href,Pb=""+new URL("title_bg-DAPsvtIp.png",import.meta.url).href,Ub=""+new URL("title_bg-DAPsvtIp.png",import.meta.url).href,Db=""+new URL("create_bg-B2uN_HVG.png",import.meta.url).href,Ib=""+new URL("menu_plate-_kr3JKFU.png",import.meta.url).href,kb=""+new URL("logo_plate-CK0-uVl1.png",import.meta.url).href,Ro=""+new URL("load_sword-Bhnb8m09.png",import.meta.url).href,Nb=""+new URL("class_icon_guerreiro-C0eBl5F1.png",import.meta.url).href,Fb=""+new URL("class_icon_ladino-D8WBB-2i.png",import.meta.url).href,Ob=""+new URL("class_icon_mago-CqEgdtDo.png",import.meta.url).href,Bb=""+new URL("class_icon_clerigo-DoeXMn4k.png",import.meta.url).href,zb=Ub,jo={guerreiro:Nb,ladino:Fb,mago:Ob,clerigo:Bb};function Hb(s){return Yb(),new Promise(t=>{const e=document.createElement("div");e.id="gh-intro",s.appendChild(e);const n=a=>{e.remove(),t(a)},i=(a,l)=>Vb(e,a,l,n,()=>Cc(e,i,a.id,l));let r=0;const o=$b(qb(),a=>r=a);Xb(e,()=>r,o,900,()=>Gb(e,()=>Cc(e,i)))})}function Gb(s,t){s.innerHTML=`
    <div class="gh-screen gh-title"${` style="background-image:url(${zb})"`}>
      <div class="gh-veil"></div>
      <div class="gh-title-inner">
        <img class="gh-logo-img" src="${kb}" alt="Nethergloam" />
        <div class="gh-flourish"><svg viewBox="0 0 260 14" preserveAspectRatio="xMidYMid meet"><g fill="#c9a24a"><circle cx="7" cy="7" r="2.6"/><rect x="15" y="6.1" width="97" height="1.8" rx="0.9"/><path d="M130 1 L138 7 L130 13 L122 7 Z"/><rect x="148" y="6.1" width="97" height="1.8" rx="0.9"/><circle cx="253" cy="7" r="2.6"/></g></svg></div>
        <p class="gh-tagline">Desça ao Nethergloam. As trevas aguardam.</p>
      </div>
      <div class="gh-menu">
        <button class="gh-menu-btn" id="gh-btn-new">Novo Jogo</button>
        <button class="gh-menu-btn gh-disabled" disabled title="Em breve">Continuar</button>
      </div>
    </div>`,s.querySelector("#gh-btn-new").addEventListener("click",t)}function Cc(s,t,e,n){let i=e&&Ao[e]||Ms[0];s.innerHTML=`
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Crie seu Herói</h2>
      <div class="gh-class-tabs">
        ${Ms.map(h=>`<button class="gh-class-tab${h.id===i.id?" on":""}" data-id="${h.id}"><img class="gh-tab-ico" src="${jo[h.id]}" alt=""/><span>${h.name}</span></button>`).join("")}
      </div>
      <div class="gh-class-main" id="gh-class-main"></div>
      <div class="gh-create-foot">
        <input class="gh-name-input" id="gh-name" maxlength="18" placeholder="Nome do herói" value="${n?n.replace(/"/g,"&quot;"):""}" />
        <button class="gh-menu-btn" id="gh-btn-start">Continuar ▸</button>
      </div>
    </div>`;const r=s.querySelector("#gh-class-main"),o=h=>r.innerHTML=yr(h);o(i);const a=()=>{r.style.minHeight="0";let h=0;for(const d of Ms)r.innerHTML=yr(d),h=Math.max(h,r.getBoundingClientRect().height);r.innerHTML=yr(i),r.style.minHeight=Math.ceil(h)+"px"};a();const l=document.fonts;l?.ready&&l.ready.then(()=>{r.isConnected&&a()});const c=()=>{r.isConnected&&a()};window.addEventListener("resize",c),s.querySelectorAll(".gh-class-tab").forEach(h=>h.addEventListener("click",()=>{s.querySelectorAll(".gh-class-tab").forEach(d=>d.classList.toggle("on",d===h)),i=Ao[h.dataset.id],o(i)})),s.querySelector("#gh-btn-start").addEventListener("click",()=>{const d=s.querySelector("#gh-name").value.trim()||"Herói";window.removeEventListener("resize",c),t(i,d)})}function Vb(s,t,e,n,i){const r={...t.attr},o={...t.attr};s.innerHTML=`
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Distribua os Atributos</h2>
      <div class="gh-class-main" id="gh-alloc-main"></div>
      <div class="gh-create-foot">
        <button class="gh-menu-btn gh-menu-btn-sec" id="gh-back">◂ Voltar</button>
        <button class="gh-menu-btn" id="gh-start">Iniciar Jornada ▸</button>
      </div>
    </div>`;const a=s.querySelector("#gh-alloc-main"),l=()=>o.str-r.str+(o.dex-r.dex)+(o.int-r.int),c=()=>{a.innerHTML=Wb(t,o,r,bc-l()),a.querySelectorAll(".gh-pm").forEach(p=>p.addEventListener("click",()=>{const g=p.dataset.k,x=Number(p.dataset.d);x<0&&o[g]<=r[g]||x>0&&l()>=bc||(o[g]+=x,c())}))},h=()=>{const p=a.getBoundingClientRect().width,g=document.createElement("div");g.className="gh-class-main",g.style.cssText=`position:absolute; left:-9999px; top:0; visibility:hidden; pointer-events:none; height:auto; width:${p}px;`,a.parentElement.appendChild(g);let x=0;for(const m of Ms)g.innerHTML=yr(m),x=Math.max(x,g.getBoundingClientRect().height);g.remove(),a.style.height=Math.ceil(x)+"px",c()};h();const d=document.fonts;d?.ready&&d.ready.then(()=>{a.isConnected&&h()});const f=()=>{a.isConnected&&h()};window.addEventListener("resize",f),s.querySelector("#gh-back").addEventListener("click",()=>{window.removeEventListener("resize",f),i()}),s.querySelector("#gh-start").addEventListener("click",()=>{window.removeEventListener("resize",f),n({name:e,classId:t.id,attr:{...o}})})}function Wb(s,t,e,n){const i=s.portrait?`<img class="gh-class-portrait" src="${s.portrait}" alt="" />`:`<div class="gh-class-ph"><div class="gh-ph-emoji">${s.emoji}</div></div>`,r=wr(t,s.hp,s.mp),o=(l,c)=>{const h=t[c],d=h-e[c],f=h<=e[c]?" disabled":"",p=n<=0?" disabled":"";return`<div class="gh-prim-row">
      <span class="gh-prim-name">${l}</span>
      <span class="gh-prim-step">
        <button class="gh-pm" data-k="${c}" data-d="-1"${f}>−</button>
        <b class="gh-prim-val">${h}${d?`<i class="gh-prim-up">+${d}</i>`:""}</b>
        <button class="gh-pm" data-k="${c}" data-d="1"${p}>＋</button>
      </span>
    </div>`},a=(l,c)=>`<div class="gh-sec-row"><span>${l}</span><b>${c}</b></div>`;return`
    <div class="gh-class-art">${i}</div>
    <div class="gh-class-info gh-alloc">
      <div class="gh-class-name"><img class="gh-name-ico" src="${jo[s.id]}" alt=""/>${s.name}</div>
      <div class="gh-alloc-points">Pontos a distribuir: <b class="${n>0?"gh-pts-on":""}">${n}</b></div>
      <div class="gh-prim">
        ${o("Força","str")}
        ${o("Destreza","dex")}
        ${o("Inteligência","int")}
      </div>
      <div class="gh-sec-blocks">
        <div class="gh-sec-col">
          <h4>⚔️ Ofensivo</h4>
          ${a("Atq. Físico",r.atkPhys)}
          ${a("Atq. Mágico",r.atkMag)}
          ${a("Crítico",r.crit+"%")}
          ${a("Dano Crít.",r.critDmg+"%")}
          ${a("Precisão",r.precision+"%")}
        </div>
        <div class="gh-sec-col">
          <h4>🛡️ Defensivo</h4>
          ${a("Vida",r.hp)}
          ${a("Defesa",r.def)}
          ${a("Res. Mágica",r.magRes)}
          ${a("Evasão",r.evasion+"%")}
        </div>
        <div class="gh-sec-col">
          <h4>🔷 Recursos</h4>
          ${a("Mana",r.mp)}
        </div>
      </div>
    </div>`}function yr(s){const t=s.portrait?`<img class="gh-class-portrait" src="${s.portrait}" alt="" />`:`<div class="gh-class-ph"><div class="gh-ph-emoji">${s.emoji}</div><div class="gh-ph-txt">arte em breve</div></div>`,e=(i,r)=>`<div class="gh-attr"><span>${i}</span><div class="gh-attr-bar"><i style="width:${r*10}%"></i></div><b>${r}</b></div>`,n=s.weapons.map(i=>E_[i]?.name).filter(Boolean).join(" · ");return`
    <div class="gh-class-art">${t}</div>
    <div class="gh-class-info">
      <div class="gh-class-name"><img class="gh-name-ico" src="${jo[s.id]}" alt=""/>${s.name}</div>
      <div class="gh-class-tag">${s.tag}</div>
      <p class="gh-class-desc">${s.desc}</p>
      <div class="gh-attrs">
        ${e("Força",s.attr.str)}
        ${e("Destreza",s.attr.dex)}
        ${e("Inteligência",s.attr.int)}
      </div>
      <div class="gh-vitals"><span>❤ Vida ${s.hp}</span><span>✦ Mana ${s.mp}</span></div>
      <div class="gh-class-weapons"><b>Armas:</b> ${n}</div>
    </div>`}function Xb(s,t,e,n,i){s.innerHTML=`
    <div class="gh-screen gh-boot">
      <div class="gh-boot-corner">
        <div class="gh-boot-sword" id="gh-boot-sword" style="--p:0%">
          <img class="gh-bs-base" src="${Ro}" alt="" />
          <div class="gh-bs-fill"><div class="gh-bs-lava"></div></div>
        </div>
        <div class="gh-boot-txt" id="gh-boot-txt">Forjando o mundo… 0%</div>
      </div>
    </div>`;const r=s.querySelector("#gh-boot-sword"),o=s.querySelector("#gh-boot-txt"),a=performance.now();let l=0;const c=()=>{const h=Math.round(t()*100);r.style.setProperty("--p",h+"%"),o.textContent=`Forjando o mundo… ${h}%`,l=requestAnimationFrame(c)};c(),e.then(async()=>{const h=performance.now()-a;h<n&&await new Promise(d=>setTimeout(d,n-h)),cancelAnimationFrame(l),r.style.setProperty("--p","100%"),o.textContent="Pronto",await new Promise(d=>setTimeout(d,160)),i()})}function qb(){const s=Object.assign({"../assets/env/cluster1.png":kv,"../assets/env/cluster2.png":Nv,"../assets/env/death_poof.png":Fv,"../assets/env/dec_banner.png":Ov,"../assets/env/dec_cracks.png":Bv,"../assets/env/dec_door.png":zv,"../assets/env/dec_ivy.png":Hv,"../assets/env/dec_torch.png":Gv,"../assets/env/dec_window.png":Vv,"../assets/env/enemy_skeleton.png":Wv,"../assets/env/pine1.png":Xv,"../assets/env/pine2.png":qv,"../assets/env/pine3.png":$v,"../assets/env/pine4.png":Yv,"../assets/env/prop_lamp.png":jv,"../assets/env/prop_notice.png":Zv,"../assets/env/sign_alch.png":Kv,"../assets/env/sign_smith.png":Jv,"../assets/env/sign_store.png":Qv,"../assets/env/sign_tavern.png":t1,"../assets/env/sword.png":e1,"../assets/env/sword_atk.png":n1,"../assets/env/tex_cobble.jpg":i1,"../assets/env/tex_dirt.jpg":s1,"../assets/env/tex_grass.jpg":r1,"../assets/env/tex_mosswall.jpg":a1,"../assets/env/tex_stonewall.jpg":o1,"../assets/env/tex_thatch.jpg":l1,"../assets/env/tex_wood.jpg":c1,"../assets/env/wpn_axe.png":h1,"../assets/env/wpn_dagger.png":d1,"../assets/env/wpn_greatsword.png":u1,"../assets/env/wpn_mace.png":f1,"../assets/env/wpn_maul.png":p1,"../assets/env/wpn_orb.png":m1,"../assets/env/wpn_rapier.png":g1,"../assets/env/wpn_shield.png":_1,"../assets/env/wpn_staff.png":x1,"../assets/env/wpn_sword.png":v1,"../assets/npc/alquimista.png":b1,"../assets/npc/anselmo.png":M1,"../assets/npc/camponesa.png":w1,"../assets/npc/costureira.png":y1,"../assets/npc/fazendeiro.png":S1,"../assets/npc/ferreiro.png":T1,"../assets/npc/gunther.png":E1,"../assets/npc/hedda.png":A1,"../assets/npc/lenhador.png":R1,"../assets/npc/lyle.png":C1,"../assets/npc/mercadora.png":L1,"../assets/npc/pip.png":P1,"../assets/npc/tam.png":U1,"../assets/npc/taverneiro.png":D1,"../assets/npc/wilma.png":I1,"../assets/ui/btn_base.png":k1,"../assets/ui/class_clerigo.png":N1,"../assets/ui/class_guerreiro.png":F1,"../assets/ui/class_icon_clerigo.png":O1,"../assets/ui/class_icon_guerreiro.png":B1,"../assets/ui/class_icon_ladino.png":z1,"../assets/ui/class_icon_mago.png":H1,"../assets/ui/class_ladino.png":G1,"../assets/ui/class_mago.png":V1,"../assets/ui/clock_moon.png":W1,"../assets/ui/clock_sun.png":X1,"../assets/ui/coin.png":q1,"../assets/ui/create_bg.png":$1,"../assets/ui/dpad.png":Y1,"../assets/ui/eq_container.png":j1,"../assets/ui/eq_frame.png":Z1,"../assets/ui/eq_slot.png":K1,"../assets/ui/fx/fx_corrente.png":J1,"../assets/ui/fx/fx_descarga.png":Q1,"../assets/ui/fx/fx_fireball.png":tb,"../assets/ui/fx/fx_ice.png":eb,"../assets/ui/fx/fx_ice_lance.png":nb,"../assets/ui/fx/fx_imolacao.png":ib,"../assets/ui/fx/fx_l_apunhalar.png":sb,"../assets/ui/fx/fx_l_arremesso.png":rb,"../assets/ui/fx/fx_l_danca.png":ab,"../assets/ui/fx/fx_l_dupla.png":ob,"../assets/ui/fx/fx_l_estocada.png":lb,"../assets/ui/fx/fx_l_mortal.png":cb,"../assets/ui/fx/fx_l_nuvem.png":hb,"../assets/ui/fx/fx_l_rajada.png":db,"../assets/ui/fx/fx_l_sombras.png":ub,"../assets/ui/fx/fx_l_toxina.png":fb,"../assets/ui/fx/fx_meteoro.png":pb,"../assets/ui/fx/fx_muralha.png":mb,"../assets/ui/fx/fx_prisao.png":gb,"../assets/ui/fx/fx_ray.png":_b,"../assets/ui/fx/fx_tempestade.png":xb,"../assets/ui/hud_plate.png":vb,"../assets/ui/ico_action.png":bb,"../assets/ui/ico_attack.png":Mb,"../assets/ui/ico_inventory.png":wb,"../assets/ui/load_sword.png":yb,"../assets/ui/logo_plate.png":Sb,"../assets/ui/map_frame.png":Tb,"../assets/ui/menu_plate.png":Eb,"../assets/ui/skills/bg_clerigo.jpg":Ab,"../assets/ui/skills/bg_guerreiro.jpg":Rb,"../assets/ui/skills/bg_ladino.jpg":Cb,"../assets/ui/skills/bg_mago.jpg":Lb,"../assets/ui/skills/sk_clerigo_01.png":hh,"../assets/ui/skills/sk_clerigo_02.png":dh,"../assets/ui/skills/sk_clerigo_03.png":uh,"../assets/ui/skills/sk_clerigo_04.png":fh,"../assets/ui/skills/sk_clerigo_05.png":ph,"../assets/ui/skills/sk_clerigo_06.png":mh,"../assets/ui/skills/sk_clerigo_07.png":gh,"../assets/ui/skills/sk_clerigo_08.png":_h,"../assets/ui/skills/sk_clerigo_09.png":xh,"../assets/ui/skills/sk_clerigo_10.png":vh,"../assets/ui/skills/sk_clerigo_11.png":bh,"../assets/ui/skills/sk_clerigo_12.png":Mh,"../assets/ui/skills/sk_clerigo_13.png":wh,"../assets/ui/skills/sk_clerigo_14.png":yh,"../assets/ui/skills/sk_clerigo_15.png":Sh,"../assets/ui/skills/sk_guerreiro_01.png":Th,"../assets/ui/skills/sk_guerreiro_02.png":Eh,"../assets/ui/skills/sk_guerreiro_03.png":Ah,"../assets/ui/skills/sk_guerreiro_04.png":Rh,"../assets/ui/skills/sk_guerreiro_05.png":Ch,"../assets/ui/skills/sk_guerreiro_06.png":Lh,"../assets/ui/skills/sk_guerreiro_07.png":Ph,"../assets/ui/skills/sk_guerreiro_08.png":Uh,"../assets/ui/skills/sk_guerreiro_09.png":Dh,"../assets/ui/skills/sk_guerreiro_10.png":Ih,"../assets/ui/skills/sk_guerreiro_11.png":kh,"../assets/ui/skills/sk_guerreiro_12.png":Nh,"../assets/ui/skills/sk_guerreiro_13.png":Fh,"../assets/ui/skills/sk_guerreiro_14.png":Oh,"../assets/ui/skills/sk_guerreiro_15.png":Bh,"../assets/ui/skills/sk_ladino_01.png":zh,"../assets/ui/skills/sk_ladino_02.png":Hh,"../assets/ui/skills/sk_ladino_03.png":Gh,"../assets/ui/skills/sk_ladino_04.png":Vh,"../assets/ui/skills/sk_ladino_05.png":Wh,"../assets/ui/skills/sk_ladino_06.png":Xh,"../assets/ui/skills/sk_ladino_07.png":qh,"../assets/ui/skills/sk_ladino_08.png":$h,"../assets/ui/skills/sk_ladino_09.png":Yh,"../assets/ui/skills/sk_ladino_10.png":jh,"../assets/ui/skills/sk_ladino_11.png":Zh,"../assets/ui/skills/sk_ladino_12.png":Kh,"../assets/ui/skills/sk_ladino_13.png":Jh,"../assets/ui/skills/sk_ladino_14.png":Qh,"../assets/ui/skills/sk_ladino_15.png":td,"../assets/ui/skills/sk_mago_01.png":ed,"../assets/ui/skills/sk_mago_02.png":nd,"../assets/ui/skills/sk_mago_03.png":id,"../assets/ui/skills/sk_mago_04.png":sd,"../assets/ui/skills/sk_mago_05.png":rd,"../assets/ui/skills/sk_mago_06.png":ad,"../assets/ui/skills/sk_mago_07.png":od,"../assets/ui/skills/sk_mago_08.png":ld,"../assets/ui/skills/sk_mago_09.png":cd,"../assets/ui/skills/sk_mago_10.png":hd,"../assets/ui/skills/sk_mago_11.png":dd,"../assets/ui/skills/sk_mago_12.png":ud,"../assets/ui/skills/sk_mago_13.png":fd,"../assets/ui/skills/sk_mago_14.png":pd,"../assets/ui/skills/sk_mago_15.png":md,"../assets/ui/skills/sk_passive_01.png":gd,"../assets/ui/skills/sk_passive_02.png":_d,"../assets/ui/skills/sk_passive_03.png":xd,"../assets/ui/skills/sk_passive_04.png":vd,"../assets/ui/skills/sk_passive_05.png":bd,"../assets/ui/skills/sk_passive_06.png":Md,"../assets/ui/skills/sk_passive_07.png":wd,"../assets/ui/skills/sk_passive_08.png":yd,"../assets/ui/skills/sk_passive_09.png":Sd,"../assets/ui/skills/sk_passive_10.png":Td,"../assets/ui/skills/sk_passive_11.png":Ed,"../assets/ui/skills/sk_passive_12.png":Ad,"../assets/ui/skills/sk_passive_13.png":Rd,"../assets/ui/skills/sk_passive_14.png":Cd,"../assets/ui/skills/sk_passive_15.png":Ld,"../assets/ui/skills/sk_passive_16.png":Pd,"../assets/ui/title_bg.png":Pb});return Array.from(new Set(Object.values(s)))}async function $b(s,t){if(s.length===0){t(1);return}let e=0;await Promise.all(s.map(n=>new Promise(i=>{const r=new Image,o=()=>{e++,t(e/s.length),i()};r.onload=o,r.onerror=o,r.src=n})))}function Yb(){if(document.getElementById("gh-intro-style"))return;const s=document.createElement("style");s.id="gh-intro-style",s.textContent=`
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
    border-image:url(${Ib}) 150 165 fill;
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
    background:#0a0b10 center/cover no-repeat; background-image:url(${Db});
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
    border:clamp(16px,3vw,24px) solid transparent; border-image:url(${Ud}) 88 fill;
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
    -webkit-mask:url(${Ro}) left center / 100% 100% no-repeat;
    mask:url(${Ro}) left center / 100% 100% no-repeat;
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
  `,document.head.appendChild(s)}document.documentElement.dataset.ghBuild="2026-07-22p";const Pa=document.getElementById("app");new URLSearchParams(location.search).has("test")?new Rr(Pa,{name:"Test",classId:"mago"}):Hb(Pa).then(s=>{new Rr(Pa,s)});
