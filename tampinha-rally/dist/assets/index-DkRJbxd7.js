(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const il="169",Ld=0,Fl=1,Dd=2,ph=1,mh=2,Yn=3,bi=0,cn=1,gn=2,mi=0,Bi=1,ui=2,Ol=3,Bl=4,Id=5,Ii=100,kd=101,Nd=102,Ud=103,Fd=104,Od=200,Bd=201,zd=202,Gd=203,sr=204,ar=205,Hd=206,Vd=207,Wd=208,qd=209,$d=210,Xd=211,Yd=212,jd=213,Kd=214,or=0,rr=1,lr=2,vs=3,cr=4,hr=5,dr=6,ur=7,gh=0,Jd=1,Zd=2,gi=0,Qd=1,eu=2,tu=3,vh=4,nu=5,iu=6,su=7,bh=300,bs=301,ys=302,fr=303,pr=304,to=306,mr=1e3,Ui=1001,gr=1002,wn=1003,au=1004,ra=1005,Dn=1006,po=1007,Fi=1008,Qn=1009,yh=1010,xh=1011,Js=1012,sl=1013,Gi=1014,Kn=1015,ta=1016,al=1017,ol=1018,xs=1020,_h=35902,Mh=1021,Sh=1022,kn=1023,Eh=1024,wh=1025,fs=1026,_s=1027,Th=1028,rl=1029,Ah=1030,ll=1031,cl=1033,Oa=33776,Ba=33777,za=33778,Ga=33779,vr=35840,br=35841,yr=35842,xr=35843,_r=36196,Mr=37492,Sr=37496,Er=37808,wr=37809,Tr=37810,Ar=37811,Cr=37812,Rr=37813,Pr=37814,Lr=37815,Dr=37816,Ir=37817,kr=37818,Nr=37819,Ur=37820,Fr=37821,Ha=36492,Or=36494,Br=36495,Ch=36283,zr=36284,Gr=36285,Hr=36286,ou=3200,ru=3201,Rh=0,lu=1,fi="",rn="srgb",xi="srgb-linear",hl="display-p3",no="display-p3-linear",Ya="linear",vt="srgb",ja="rec709",Ka="p3",$i=7680,zl=519,cu=512,hu=513,du=514,Ph=515,uu=516,fu=517,pu=518,mu=519,Gl=35044,Hl="300 es",Jn=2e3,Ja=2001;class Ss{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,o=s.length;a<o;a++)s[a].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Vl=1234567;const Ws=Math.PI/180,Zs=180/Math.PI;function Es(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]).toLowerCase()}function Pt(n,e,t){return Math.max(e,Math.min(t,n))}function dl(n,e){return(n%e+e)%e}function gu(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function vu(n,e,t){return n!==e?(t-n)/(e-n):0}function qs(n,e,t){return(1-t)*n+t*e}function bu(n,e,t,i){return qs(n,e,1-Math.exp(-t*i))}function yu(n,e=1){return e-Math.abs(dl(n,e*2)-e)}function xu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function _u(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Mu(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Su(n,e){return n+Math.random()*(e-n)}function Eu(n){return n*(.5-Math.random())}function wu(n){n!==void 0&&(Vl=n);let e=Vl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Tu(n){return n*Ws}function Au(n){return n*Zs}function Cu(n){return(n&n-1)===0&&n!==0}function Ru(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Pu(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Lu(n,e,t,i,s){const a=Math.cos,o=Math.sin,r=a(t/2),c=o(t/2),l=a((e+i)/2),h=o((e+i)/2),f=a((e-i)/2),d=o((e-i)/2),u=a((i-e)/2),g=o((i-e)/2);switch(s){case"XYX":n.set(r*h,c*f,c*d,r*l);break;case"YZY":n.set(c*d,r*h,c*f,r*l);break;case"ZXZ":n.set(c*f,c*d,r*h,r*l);break;case"XZX":n.set(r*h,c*g,c*u,r*l);break;case"YXY":n.set(c*u,r*h,c*g,r*l);break;case"ZYZ":n.set(c*g,c*u,r*h,r*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ds(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Kt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const la={DEG2RAD:Ws,RAD2DEG:Zs,generateUUID:Es,clamp:Pt,euclideanModulo:dl,mapLinear:gu,inverseLerp:vu,lerp:qs,damp:bu,pingpong:yu,smoothstep:xu,smootherstep:_u,randInt:Mu,randFloat:Su,randFloatSpread:Eu,seededRandom:wu,degToRad:Tu,radToDeg:Au,isPowerOfTwo:Cu,ceilPowerOfTwo:Ru,floorPowerOfTwo:Pu,setQuaternionFromProperEuler:Lu,normalize:Kt,denormalize:ds};class Me{constructor(e=0,t=0){Me.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*i-o*s+e.x,this.y=a*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(e,t,i,s,a,o,r,c,l){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,o,r,c,l)}set(e,t,i,s,a,o,r,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=r,h[3]=t,h[4]=a,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,o=i[0],r=i[3],c=i[6],l=i[1],h=i[4],f=i[7],d=i[2],u=i[5],g=i[8],v=s[0],p=s[3],m=s[6],y=s[1],b=s[4],x=s[7],A=s[2],S=s[5],w=s[8];return a[0]=o*v+r*y+c*A,a[3]=o*p+r*b+c*S,a[6]=o*m+r*x+c*w,a[1]=l*v+h*y+f*A,a[4]=l*p+h*b+f*S,a[7]=l*m+h*x+f*w,a[2]=d*v+u*y+g*A,a[5]=d*p+u*b+g*S,a[8]=d*m+u*x+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],o=e[4],r=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*r*l-i*a*h+i*r*c+s*a*l-s*o*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],o=e[4],r=e[5],c=e[6],l=e[7],h=e[8],f=h*o-r*l,d=r*c-h*a,u=l*a-o*c,g=t*f+i*d+s*u;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=f*v,e[1]=(s*l-h*i)*v,e[2]=(r*i-s*o)*v,e[3]=d*v,e[4]=(h*t-s*c)*v,e[5]=(s*a-r*t)*v,e[6]=u*v,e[7]=(i*c-l*t)*v,e[8]=(o*t-i*a)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,o,r){const c=Math.cos(a),l=Math.sin(a);return this.set(i*c,i*l,-i*(c*o+l*r)+o+e,-s*l,s*c,-s*(-l*o+c*r)+r+t,0,0,1),this}scale(e,t){return this.premultiply(mo.makeScale(e,t)),this}rotate(e){return this.premultiply(mo.makeRotation(-e)),this}translate(e,t){return this.premultiply(mo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const mo=new qe;function Lh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Za(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Du(){const n=Za("canvas");return n.style.display="block",n}const Wl={};function Va(n){n in Wl||(Wl[n]=!0,console.warn(n))}function Iu(n,e,t){return new Promise(function(i,s){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}function ku(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Nu(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const ql=new qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),$l=new qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ts={[xi]:{transfer:Ya,primaries:ja,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[rn]:{transfer:vt,primaries:ja,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[no]:{transfer:Ya,primaries:Ka,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3($l),fromReference:n=>n.applyMatrix3(ql)},[hl]:{transfer:vt,primaries:Ka,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3($l),fromReference:n=>n.applyMatrix3(ql).convertLinearToSRGB()}},Uu=new Set([xi,no]),at={enabled:!0,_workingColorSpace:xi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Uu.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Ts[e].toReference,s=Ts[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Ts[n].primaries},getTransfer:function(n){return n===fi?Ya:Ts[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(Ts[e].luminanceCoefficients)}};function ps(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function go(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Xi;class Fu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Xi===void 0&&(Xi=Za("canvas")),Xi.width=e.width,Xi.height=e.height;const i=Xi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Xi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Za("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let o=0;o<a.length;o++)a[o]=ps(a[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ps(t[i]/255)*255):t[i]=ps(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ou=0;class Dh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ou++}),this.uuid=Es(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let o=0,r=s.length;o<r;o++)s[o].isDataTexture?a.push(vo(s[o].image)):a.push(vo(s[o]))}else a=vo(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function vo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Fu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bu=0;class tn extends Ss{constructor(e=tn.DEFAULT_IMAGE,t=tn.DEFAULT_MAPPING,i=Ui,s=Ui,a=Dn,o=Fi,r=kn,c=Qn,l=tn.DEFAULT_ANISOTROPY,h=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=Es(),this.name="",this.source=new Dh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=r,this.internalFormat=null,this.type=c,this.offset=new Me(0,0),this.repeat=new Me(1,1),this.center=new Me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mr:e.x=e.x-Math.floor(e.x);break;case Ui:e.x=e.x<0?0:1;break;case gr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mr:e.y=e.y-Math.floor(e.y);break;case Ui:e.y=e.y<0?0:1;break;case gr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=bh;tn.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,t=0,i=0,s=1){Mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*a,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*a,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*a,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const c=e.elements,l=c[0],h=c[4],f=c[8],d=c[1],u=c[5],g=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(f-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+u+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,x=(u+1)/2,A=(m+1)/2,S=(h+d)/4,w=(f+v)/4,R=(g+p)/4;return b>x&&b>A?b<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(b),s=S/i,a=w/i):x>A?x<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(x),i=S/s,a=R/s):A<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(A),i=w/a,s=R/a),this.set(i,s,a,t),this}let y=Math.sqrt((p-g)*(p-g)+(f-v)*(f-v)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(f-v)/y,this.z=(d-h)/y,this.w=Math.acos((l+u+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zu extends Ss{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const a=new tn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let r=0;r<o;r++)this.textures[r]=a.clone(),this.textures[r].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Dh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hi extends zu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ih extends tn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=wn,this.minFilter=wn,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gu extends tn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=wn,this.minFilter=wn,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class na{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,o,r){let c=i[s+0],l=i[s+1],h=i[s+2],f=i[s+3];const d=a[o+0],u=a[o+1],g=a[o+2],v=a[o+3];if(r===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f;return}if(r===1){e[t+0]=d,e[t+1]=u,e[t+2]=g,e[t+3]=v;return}if(f!==v||c!==d||l!==u||h!==g){let p=1-r;const m=c*d+l*u+h*g+f*v,y=m>=0?1:-1,b=1-m*m;if(b>Number.EPSILON){const A=Math.sqrt(b),S=Math.atan2(A,m*y);p=Math.sin(p*S)/A,r=Math.sin(r*S)/A}const x=r*y;if(c=c*p+d*x,l=l*p+u*x,h=h*p+g*x,f=f*p+v*x,p===1-r){const A=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=A,l*=A,h*=A,f*=A}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,a,o){const r=i[s],c=i[s+1],l=i[s+2],h=i[s+3],f=a[o],d=a[o+1],u=a[o+2],g=a[o+3];return e[t]=r*g+h*f+c*u-l*d,e[t+1]=c*g+h*d+l*f-r*u,e[t+2]=l*g+h*u+r*d-c*f,e[t+3]=h*g-r*f-c*d-l*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,a=e._z,o=e._order,r=Math.cos,c=Math.sin,l=r(i/2),h=r(s/2),f=r(a/2),d=c(i/2),u=c(s/2),g=c(a/2);switch(o){case"XYZ":this._x=d*h*f+l*u*g,this._y=l*u*f-d*h*g,this._z=l*h*g+d*u*f,this._w=l*h*f-d*u*g;break;case"YXZ":this._x=d*h*f+l*u*g,this._y=l*u*f-d*h*g,this._z=l*h*g-d*u*f,this._w=l*h*f+d*u*g;break;case"ZXY":this._x=d*h*f-l*u*g,this._y=l*u*f+d*h*g,this._z=l*h*g+d*u*f,this._w=l*h*f-d*u*g;break;case"ZYX":this._x=d*h*f-l*u*g,this._y=l*u*f+d*h*g,this._z=l*h*g-d*u*f,this._w=l*h*f+d*u*g;break;case"YZX":this._x=d*h*f+l*u*g,this._y=l*u*f+d*h*g,this._z=l*h*g-d*u*f,this._w=l*h*f-d*u*g;break;case"XZY":this._x=d*h*f-l*u*g,this._y=l*u*f-d*h*g,this._z=l*h*g+d*u*f,this._w=l*h*f+d*u*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],o=t[1],r=t[5],c=t[9],l=t[2],h=t[6],f=t[10],d=i+r+f;if(d>0){const u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-c)*u,this._y=(a-l)*u,this._z=(o-s)*u}else if(i>r&&i>f){const u=2*Math.sqrt(1+i-r-f);this._w=(h-c)/u,this._x=.25*u,this._y=(s+o)/u,this._z=(a+l)/u}else if(r>f){const u=2*Math.sqrt(1+r-i-f);this._w=(a-l)/u,this._x=(s+o)/u,this._y=.25*u,this._z=(c+h)/u}else{const u=2*Math.sqrt(1+f-i-r);this._w=(o-s)/u,this._x=(a+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,o=e._w,r=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+o*r+s*l-a*c,this._y=s*h+o*c+a*r-i*l,this._z=a*h+o*l+i*c-s*r,this._w=o*h-i*r-s*c-a*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,o=this._w;let r=o*e._w+i*e._x+s*e._y+a*e._z;if(r<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,r=-r):this.copy(e),r>=1)return this._w=o,this._x=i,this._y=s,this._z=a,this;const c=1-r*r;if(c<=Number.EPSILON){const u=1-t;return this._w=u*o+t*this._w,this._x=u*i+t*this._x,this._y=u*s+t*this._y,this._z=u*a+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,r),f=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*f+this._w*d,this._x=i*f+this._x*d,this._y=s*f+this._y*d,this._z=a*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,i=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,o=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*o,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*o,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,o=e.y,r=e.z,c=e.w,l=2*(o*s-r*i),h=2*(r*t-a*s),f=2*(a*i-o*t);return this.x=t+c*l+o*f-r*h,this.y=i+c*h+r*l-a*f,this.z=s+c*f+a*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,o=t.x,r=t.y,c=t.z;return this.x=s*c-a*r,this.y=a*o-i*c,this.z=i*r-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return bo.copy(this).projectOnVector(e),this.sub(bo)}reflect(e){return this.sub(bo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const bo=new N,Xl=new na;class ia{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,r=a.count;o<r;o++)e.isMesh===!0?e.getVertexPosition(o,Cn):Cn.fromBufferAttribute(a,o),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ca.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ca.copy(i.boundingBox)),ca.applyMatrix4(e.matrixWorld),this.union(ca)}const s=e.children;for(let a=0,o=s.length;a<o;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(As),ha.subVectors(this.max,As),Yi.subVectors(e.a,As),ji.subVectors(e.b,As),Ki.subVectors(e.c,As),ni.subVectors(ji,Yi),ii.subVectors(Ki,ji),Ei.subVectors(Yi,Ki);let t=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-Ei.z,Ei.y,ni.z,0,-ni.x,ii.z,0,-ii.x,Ei.z,0,-Ei.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-Ei.y,Ei.x,0];return!yo(t,Yi,ji,Ki,ha)||(t=[1,0,0,0,1,0,0,0,1],!yo(t,Yi,ji,Ki,ha))?!1:(da.crossVectors(ni,ii),t=[da.x,da.y,da.z],yo(t,Yi,ji,Ki,ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Hn=[new N,new N,new N,new N,new N,new N,new N,new N],Cn=new N,ca=new ia,Yi=new N,ji=new N,Ki=new N,ni=new N,ii=new N,Ei=new N,As=new N,ha=new N,da=new N,wi=new N;function yo(n,e,t,i,s){for(let a=0,o=n.length-3;a<=o;a+=3){wi.fromArray(n,a);const r=s.x*Math.abs(wi.x)+s.y*Math.abs(wi.y)+s.z*Math.abs(wi.z),c=e.dot(wi),l=t.dot(wi),h=i.dot(wi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>r)return!1}return!0}const Hu=new ia,Cs=new N,xo=new N;class sa{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Hu.setFromPoints(e).getCenter(i);let s=0;for(let a=0,o=e.length;a<o;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Cs.subVectors(e,this.center);const t=Cs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Cs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Cs.copy(e.center).add(xo)),this.expandByPoint(Cs.copy(e.center).sub(xo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Vn=new N,_o=new N,ua=new N,si=new N,Mo=new N,fa=new N,So=new N;class io{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Vn.copy(this.origin).addScaledVector(this.direction,t),Vn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){_o.copy(e).add(t).multiplyScalar(.5),ua.copy(t).sub(e).normalize(),si.copy(this.origin).sub(_o);const a=e.distanceTo(t)*.5,o=-this.direction.dot(ua),r=si.dot(this.direction),c=-si.dot(ua),l=si.lengthSq(),h=Math.abs(1-o*o);let f,d,u,g;if(h>0)if(f=o*c-r,d=o*r-c,g=a*h,f>=0)if(d>=-g)if(d<=g){const v=1/h;f*=v,d*=v,u=f*(f+o*d+2*r)+d*(o*f+d+2*c)+l}else d=a,f=Math.max(0,-(o*d+r)),u=-f*f+d*(d+2*c)+l;else d=-a,f=Math.max(0,-(o*d+r)),u=-f*f+d*(d+2*c)+l;else d<=-g?(f=Math.max(0,-(-o*a+r)),d=f>0?-a:Math.min(Math.max(-a,-c),a),u=-f*f+d*(d+2*c)+l):d<=g?(f=0,d=Math.min(Math.max(-a,-c),a),u=d*(d+2*c)+l):(f=Math.max(0,-(o*a+r)),d=f>0?a:Math.min(Math.max(-a,-c),a),u=-f*f+d*(d+2*c)+l);else d=o>0?-a:a,f=Math.max(0,-(o*d+r)),u=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(_o).addScaledVector(ua,d),u}intersectSphere(e,t){Vn.subVectors(e.center,this.origin);const i=Vn.dot(this.direction),s=Vn.dot(Vn)-i*i,a=e.radius*e.radius;if(s>a)return null;const o=Math.sqrt(a-s),r=i-o,c=i+o;return c<0?null:r<0?this.at(c,t):this.at(r,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,o,r,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(a=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(a=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),i>o||a>s||((a>i||isNaN(i))&&(i=a),(o<s||isNaN(s))&&(s=o),f>=0?(r=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(r=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||r>s)||((r>i||i!==i)&&(i=r),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Vn)!==null}intersectTriangle(e,t,i,s,a){Mo.subVectors(t,e),fa.subVectors(i,e),So.crossVectors(Mo,fa);let o=this.direction.dot(So),r;if(o>0){if(s)return null;r=1}else if(o<0)r=-1,o=-o;else return null;si.subVectors(this.origin,e);const c=r*this.direction.dot(fa.crossVectors(si,fa));if(c<0)return null;const l=r*this.direction.dot(Mo.cross(si));if(l<0||c+l>o)return null;const h=-r*si.dot(So);return h<0?null:this.at(h/o,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ut{constructor(e,t,i,s,a,o,r,c,l,h,f,d,u,g,v,p){ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,o,r,c,l,h,f,d,u,g,v,p)}set(e,t,i,s,a,o,r,c,l,h,f,d,u,g,v,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=a,m[5]=o,m[9]=r,m[13]=c,m[2]=l,m[6]=h,m[10]=f,m[14]=d,m[3]=u,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ut().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Ji.setFromMatrixColumn(e,0).length(),a=1/Ji.setFromMatrixColumn(e,1).length(),o=1/Ji.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,o=Math.cos(i),r=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){const d=o*h,u=o*f,g=r*h,v=r*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=u+g*l,t[5]=d-v*l,t[9]=-r*c,t[2]=v-d*l,t[6]=g+u*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,u=c*f,g=l*h,v=l*f;t[0]=d+v*r,t[4]=g*r-u,t[8]=o*l,t[1]=o*f,t[5]=o*h,t[9]=-r,t[2]=u*r-g,t[6]=v+d*r,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,u=c*f,g=l*h,v=l*f;t[0]=d-v*r,t[4]=-o*f,t[8]=g+u*r,t[1]=u+g*r,t[5]=o*h,t[9]=v-d*r,t[2]=-o*l,t[6]=r,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,u=o*f,g=r*h,v=r*f;t[0]=c*h,t[4]=g*l-u,t[8]=d*l+v,t[1]=c*f,t[5]=v*l+d,t[9]=u*l-g,t[2]=-l,t[6]=r*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,u=o*l,g=r*c,v=r*l;t[0]=c*h,t[4]=v-d*f,t[8]=g*f+u,t[1]=f,t[5]=o*h,t[9]=-r*h,t[2]=-l*h,t[6]=u*f+g,t[10]=d-v*f}else if(e.order==="XZY"){const d=o*c,u=o*l,g=r*c,v=r*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=d*f+v,t[5]=o*h,t[9]=u*f-g,t[2]=g*f-u,t[6]=r*h,t[10]=v*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Vu,e,Wu)}lookAt(e,t,i){const s=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),ai.crossVectors(i,un),ai.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),ai.crossVectors(i,un)),ai.normalize(),pa.crossVectors(un,ai),s[0]=ai.x,s[4]=pa.x,s[8]=un.x,s[1]=ai.y,s[5]=pa.y,s[9]=un.y,s[2]=ai.z,s[6]=pa.z,s[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,o=i[0],r=i[4],c=i[8],l=i[12],h=i[1],f=i[5],d=i[9],u=i[13],g=i[2],v=i[6],p=i[10],m=i[14],y=i[3],b=i[7],x=i[11],A=i[15],S=s[0],w=s[4],R=s[8],B=s[12],_=s[1],E=s[5],D=s[9],k=s[13],z=s[2],K=s[6],U=s[10],Z=s[14],j=s[3],pe=s[7],me=s[11],Te=s[15];return a[0]=o*S+r*_+c*z+l*j,a[4]=o*w+r*E+c*K+l*pe,a[8]=o*R+r*D+c*U+l*me,a[12]=o*B+r*k+c*Z+l*Te,a[1]=h*S+f*_+d*z+u*j,a[5]=h*w+f*E+d*K+u*pe,a[9]=h*R+f*D+d*U+u*me,a[13]=h*B+f*k+d*Z+u*Te,a[2]=g*S+v*_+p*z+m*j,a[6]=g*w+v*E+p*K+m*pe,a[10]=g*R+v*D+p*U+m*me,a[14]=g*B+v*k+p*Z+m*Te,a[3]=y*S+b*_+x*z+A*j,a[7]=y*w+b*E+x*K+A*pe,a[11]=y*R+b*D+x*U+A*me,a[15]=y*B+b*k+x*Z+A*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],o=e[1],r=e[5],c=e[9],l=e[13],h=e[2],f=e[6],d=e[10],u=e[14],g=e[3],v=e[7],p=e[11],m=e[15];return g*(+a*c*f-s*l*f-a*r*d+i*l*d+s*r*u-i*c*u)+v*(+t*c*u-t*l*d+a*o*d-s*o*u+s*l*h-a*c*h)+p*(+t*l*f-t*r*u-a*o*f+i*o*u+a*r*h-i*l*h)+m*(-s*r*h-t*c*f+t*r*d+s*o*f-i*o*d+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],o=e[4],r=e[5],c=e[6],l=e[7],h=e[8],f=e[9],d=e[10],u=e[11],g=e[12],v=e[13],p=e[14],m=e[15],y=f*p*l-v*d*l+v*c*u-r*p*u-f*c*m+r*d*m,b=g*d*l-h*p*l-g*c*u+o*p*u+h*c*m-o*d*m,x=h*v*l-g*f*l+g*r*u-o*v*u-h*r*m+o*f*m,A=g*f*c-h*v*c-g*r*d+o*v*d+h*r*p-o*f*p,S=t*y+i*b+s*x+a*A;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/S;return e[0]=y*w,e[1]=(v*d*a-f*p*a-v*s*u+i*p*u+f*s*m-i*d*m)*w,e[2]=(r*p*a-v*c*a+v*s*l-i*p*l-r*s*m+i*c*m)*w,e[3]=(f*c*a-r*d*a-f*s*l+i*d*l+r*s*u-i*c*u)*w,e[4]=b*w,e[5]=(h*p*a-g*d*a+g*s*u-t*p*u-h*s*m+t*d*m)*w,e[6]=(g*c*a-o*p*a-g*s*l+t*p*l+o*s*m-t*c*m)*w,e[7]=(o*d*a-h*c*a+h*s*l-t*d*l-o*s*u+t*c*u)*w,e[8]=x*w,e[9]=(g*f*a-h*v*a-g*i*u+t*v*u+h*i*m-t*f*m)*w,e[10]=(o*v*a-g*r*a+g*i*l-t*v*l-o*i*m+t*r*m)*w,e[11]=(h*r*a-o*f*a-h*i*l+t*f*l+o*i*u-t*r*u)*w,e[12]=A*w,e[13]=(h*v*s-g*f*s+g*i*d-t*v*d-h*i*p+t*f*p)*w,e[14]=(g*r*s-o*v*s-g*i*c+t*v*c+o*i*p-t*r*p)*w,e[15]=(o*f*s-h*r*s+h*i*c-t*f*c-o*i*d+t*r*d)*w,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,o=e.x,r=e.y,c=e.z,l=a*o,h=a*r;return this.set(l*o+i,l*r-s*c,l*c+s*r,0,l*r+s*c,h*r+i,h*c-s*o,0,l*c-s*r,h*c+s*o,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,o){return this.set(1,i,a,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,o=t._y,r=t._z,c=t._w,l=a+a,h=o+o,f=r+r,d=a*l,u=a*h,g=a*f,v=o*h,p=o*f,m=r*f,y=c*l,b=c*h,x=c*f,A=i.x,S=i.y,w=i.z;return s[0]=(1-(v+m))*A,s[1]=(u+x)*A,s[2]=(g-b)*A,s[3]=0,s[4]=(u-x)*S,s[5]=(1-(d+m))*S,s[6]=(p+y)*S,s[7]=0,s[8]=(g+b)*w,s[9]=(p-y)*w,s[10]=(1-(d+v))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let a=Ji.set(s[0],s[1],s[2]).length();const o=Ji.set(s[4],s[5],s[6]).length(),r=Ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],Rn.copy(this);const l=1/a,h=1/o,f=1/r;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=h,Rn.elements[5]*=h,Rn.elements[6]*=h,Rn.elements[8]*=f,Rn.elements[9]*=f,Rn.elements[10]*=f,t.setFromRotationMatrix(Rn),i.x=a,i.y=o,i.z=r,this}makePerspective(e,t,i,s,a,o,r=Jn){const c=this.elements,l=2*a/(t-e),h=2*a/(i-s),f=(t+e)/(t-e),d=(i+s)/(i-s);let u,g;if(r===Jn)u=-(o+a)/(o-a),g=-2*o*a/(o-a);else if(r===Ja)u=-o/(o-a),g=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+r);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=u,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,a,o,r=Jn){const c=this.elements,l=1/(t-e),h=1/(i-s),f=1/(o-a),d=(t+e)*l,u=(i+s)*h;let g,v;if(r===Jn)g=(o+a)*f,v=-2*f;else if(r===Ja)g=a*f,v=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+r);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-u,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ji=new N,Rn=new ut,Vu=new N(0,0,0),Wu=new N(1,1,1),ai=new N,pa=new N,un=new N,Yl=new ut,jl=new na;class Bn{constructor(e=0,t=0,i=0,s=Bn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],o=s[4],r=s[8],c=s[1],l=s[5],h=s[9],f=s[2],d=s[6],u=s[10];switch(t){case"XYZ":this._y=Math.asin(Pt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(r,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,u),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-Pt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Pt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(r,u));break;case"XZY":this._z=Math.asin(-Pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(r,a)):(this._x=Math.atan2(-h,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Yl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return jl.setFromEuler(this),this.setFromQuaternion(jl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bn.DEFAULT_ORDER="XYZ";class ul{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let qu=0;const Kl=new N,Zi=new na,Wn=new ut,ma=new N,Rs=new N,$u=new N,Xu=new na,Jl=new N(1,0,0),Zl=new N(0,1,0),Ql=new N(0,0,1),ec={type:"added"},Yu={type:"removed"},Qi={type:"childadded",child:null},Eo={type:"childremoved",child:null};class Lt extends Ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qu++}),this.uuid=Es(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new N,t=new Bn,i=new na,s=new N(1,1,1);function a(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ut},normalMatrix:{value:new qe}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.premultiply(Zi),this}rotateX(e){return this.rotateOnAxis(Jl,e)}rotateY(e){return this.rotateOnAxis(Zl,e)}rotateZ(e){return this.rotateOnAxis(Ql,e)}translateOnAxis(e,t){return Kl.copy(e).applyQuaternion(this.quaternion),this.position.add(Kl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jl,e)}translateY(e){return this.translateOnAxis(Zl,e)}translateZ(e){return this.translateOnAxis(Ql,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ma.copy(e):ma.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(Rs,ma,this.up):Wn.lookAt(ma,Rs,this.up),this.quaternion.setFromRotationMatrix(Wn),s&&(Wn.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix(Wn),this.quaternion.premultiply(Zi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ec),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yu),Eo.child=e,this.dispatchEvent(Eo),Eo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ec),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,e,$u),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,Xu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(r=>({boxInitialized:r.boxInitialized,boxMin:r.box.min.toArray(),boxMax:r.box.max.toArray(),sphereInitialized:r.sphereInitialized,sphereRadius:r.sphere.radius,sphereCenter:r.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(r,c){return r[c.uuid]===void 0&&(r[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){const c=r.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];a(e.shapes,f)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const r=[];for(let c=0,l=this.material.length;c<l;c++)r.push(a(e.materials,this.material[c]));s.material=r}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let r=0;r<this.children.length;r++)s.children.push(this.children[r].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let r=0;r<this.animations.length;r++){const c=this.animations[r];s.animations.push(a(e.animations,c))}}if(t){const r=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),f=o(e.shapes),d=o(e.skeletons),u=o(e.animations),g=o(e.nodes);r.length>0&&(i.geometries=r),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),u.length>0&&(i.animations=u),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(r){const c=[];for(const l in r){const h=r[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Lt.DEFAULT_UP=new N(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new N,qn=new N,wo=new N,$n=new N,es=new N,ts=new N,tc=new N,To=new N,Ao=new N,Co=new N,Ro=new Mt,Po=new Mt,Lo=new Mt;class In{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Pn.subVectors(e,t),s.cross(Pn);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){Pn.subVectors(s,t),qn.subVectors(i,t),wo.subVectors(e,t);const o=Pn.dot(Pn),r=Pn.dot(qn),c=Pn.dot(wo),l=qn.dot(qn),h=qn.dot(wo),f=o*l-r*r;if(f===0)return a.set(0,0,0),null;const d=1/f,u=(l*c-r*h)*d,g=(o*h-r*c)*d;return a.set(1-u-g,g,u)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,i,s,a,o,r,c){return this.getBarycoord(e,t,i,s,$n)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,$n.x),c.addScaledVector(o,$n.y),c.addScaledVector(r,$n.z),c)}static getInterpolatedAttribute(e,t,i,s,a,o){return Ro.setScalar(0),Po.setScalar(0),Lo.setScalar(0),Ro.fromBufferAttribute(e,t),Po.fromBufferAttribute(e,i),Lo.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ro,a.x),o.addScaledVector(Po,a.y),o.addScaledVector(Lo,a.z),o}static isFrontFacing(e,t,i,s){return Pn.subVectors(i,t),qn.subVectors(e,t),Pn.cross(qn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),Pn.cross(qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return In.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return In.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,a){return In.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return In.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return In.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let o,r;es.subVectors(s,i),ts.subVectors(a,i),To.subVectors(e,i);const c=es.dot(To),l=ts.dot(To);if(c<=0&&l<=0)return t.copy(i);Ao.subVectors(e,s);const h=es.dot(Ao),f=ts.dot(Ao);if(h>=0&&f<=h)return t.copy(s);const d=c*f-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(i).addScaledVector(es,o);Co.subVectors(e,a);const u=es.dot(Co),g=ts.dot(Co);if(g>=0&&u<=g)return t.copy(a);const v=u*l-c*g;if(v<=0&&l>=0&&g<=0)return r=l/(l-g),t.copy(i).addScaledVector(ts,r);const p=h*g-u*f;if(p<=0&&f-h>=0&&u-g>=0)return tc.subVectors(a,s),r=(f-h)/(f-h+(u-g)),t.copy(s).addScaledVector(tc,r);const m=1/(p+v+d);return o=v*m,r=d*m,t.copy(i).addScaledVector(es,o).addScaledVector(ts,r)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const kh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},oi={h:0,s:0,l:0},ga={h:0,s:0,l:0};function Do(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class He{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=rn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=at.workingColorSpace){if(e=dl(e,1),t=Pt(t,0,1),i=Pt(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,o=2*i-a;this.r=Do(o,a,e+1/3),this.g=Do(o,a,e),this.b=Do(o,a,e-1/3)}return at.toWorkingColorSpace(this,s),this}setStyle(e,t=rn){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=s[1],r=s[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=rn){const i=kh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ps(e.r),this.g=ps(e.g),this.b=ps(e.b),this}copyLinearToSRGB(e){return this.r=go(e.r),this.g=go(e.g),this.b=go(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=rn){return at.fromWorkingColorSpace(Yt.copy(this),e),Math.round(Pt(Yt.r*255,0,255))*65536+Math.round(Pt(Yt.g*255,0,255))*256+Math.round(Pt(Yt.b*255,0,255))}getHexString(e=rn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(Yt.copy(this),t);const i=Yt.r,s=Yt.g,a=Yt.b,o=Math.max(i,s,a),r=Math.min(i,s,a);let c,l;const h=(r+o)/2;if(r===o)c=0,l=0;else{const f=o-r;switch(l=h<=.5?f/(o+r):f/(2-o-r),o){case i:c=(s-a)/f+(s<a?6:0);break;case s:c=(a-i)/f+2;break;case a:c=(i-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=rn){at.fromWorkingColorSpace(Yt.copy(this),e);const t=Yt.r,i=Yt.g,s=Yt.b;return e!==rn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(oi),this.setHSL(oi.h+e,oi.s+t,oi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(oi),e.getHSL(ga);const i=qs(oi.h,ga.h,t),s=qs(oi.s,ga.s,t),a=qs(oi.l,ga.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yt=new He;He.NAMES=kh;let ju=0;class Wi extends Ss{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Es(),this.name="",this.type="Material",this.blending=Bi,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sr,this.blendDst=ar,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$i,this.stencilZFail=$i,this.stencilZPass=$i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Bi&&(i.blending=this.blending),this.side!==bi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==sr&&(i.blendSrc=this.blendSrc),this.blendDst!==ar&&(i.blendDst=this.blendDst),this.blendEquation!==Ii&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$i&&(i.stencilFail=this.stencilFail),this.stencilZFail!==$i&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==$i&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const o=[];for(const r in a){const c=a[r];delete c.metadata,o.push(c)}return o}if(t){const a=s(e.textures),o=s(e.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ut extends Wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=gh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ct=new N,va=new Me;class vn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Gl,this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)va.fromBufferAttribute(this,t),va.applyMatrix3(e),this.setXY(t,va.x,va.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ds(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Kt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ds(t,this.array)),t}setX(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ds(t,this.array)),t}setY(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ds(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ds(t,this.array)),t}setW(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),s=Kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),s=Kt(s,this.array),a=Kt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gl&&(e.usage=this.usage),e}}class Nh extends vn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Uh extends vn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ft extends vn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Ku=0;const xn=new ut,Io=new Lt,ns=new N,fn=new ia,Ps=new ia,kt=new N;class $t extends Ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=Es(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Lh(e)?Uh:Nh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new qe().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,i){return xn.makeTranslation(e,t,i),this.applyMatrix4(xn),this}scale(e,t,i){return xn.makeScale(e,t,i),this.applyMatrix4(xn),this}lookAt(e){return Io.lookAt(e),Io.updateMatrix(),this.applyMatrix4(Io.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new ft(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ia);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];fn.setFromBufferAttribute(a),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){const r=t[a];Ps.setFromBufferAttribute(r),this.morphTargetsRelative?(kt.addVectors(fn.min,Ps.min),fn.expandByPoint(kt),kt.addVectors(fn.max,Ps.max),fn.expandByPoint(kt)):(fn.expandByPoint(Ps.min),fn.expandByPoint(Ps.max))}fn.getCenter(i);let s=0;for(let a=0,o=e.count;a<o;a++)kt.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(kt));if(t)for(let a=0,o=t.length;a<o;a++){const r=t[a],c=this.morphTargetsRelative;for(let l=0,h=r.count;l<h;l++)kt.fromBufferAttribute(r,l),c&&(ns.fromBufferAttribute(e,l),kt.add(ns)),s=Math.max(s,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),r=[],c=[];for(let R=0;R<i.count;R++)r[R]=new N,c[R]=new N;const l=new N,h=new N,f=new N,d=new Me,u=new Me,g=new Me,v=new N,p=new N;function m(R,B,_){l.fromBufferAttribute(i,R),h.fromBufferAttribute(i,B),f.fromBufferAttribute(i,_),d.fromBufferAttribute(a,R),u.fromBufferAttribute(a,B),g.fromBufferAttribute(a,_),h.sub(l),f.sub(l),u.sub(d),g.sub(d);const E=1/(u.x*g.y-g.x*u.y);isFinite(E)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(f,-u.y).multiplyScalar(E),p.copy(f).multiplyScalar(u.x).addScaledVector(h,-g.x).multiplyScalar(E),r[R].add(v),r[B].add(v),r[_].add(v),c[R].add(p),c[B].add(p),c[_].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let R=0,B=y.length;R<B;++R){const _=y[R],E=_.start,D=_.count;for(let k=E,z=E+D;k<z;k+=3)m(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const b=new N,x=new N,A=new N,S=new N;function w(R){A.fromBufferAttribute(s,R),S.copy(A);const B=r[R];b.copy(B),b.sub(A.multiplyScalar(A.dot(B))).normalize(),x.crossVectors(S,B);const E=x.dot(c[R])<0?-1:1;o.setXYZW(R,b.x,b.y,b.z,E)}for(let R=0,B=y.length;R<B;++R){const _=y[R],E=_.start,D=_.count;for(let k=E,z=E+D;k<z;k+=3)w(e.getX(k+0)),w(e.getX(k+1)),w(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new vn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,u=i.count;d<u;d++)i.setXYZ(d,0,0,0);const s=new N,a=new N,o=new N,r=new N,c=new N,l=new N,h=new N,f=new N;if(e)for(let d=0,u=e.count;d<u;d+=3){const g=e.getX(d+0),v=e.getX(d+1),p=e.getX(d+2);s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,v),o.fromBufferAttribute(t,p),h.subVectors(o,a),f.subVectors(s,a),h.cross(f),r.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,p),r.add(h),c.add(h),l.add(h),i.setXYZ(g,r.x,r.y,r.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,u=t.count;d<u;d+=3)s.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,a),f.subVectors(s,a),h.cross(f),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(r,c){const l=r.array,h=r.itemSize,f=r.normalized,d=new l.constructor(c.length*h);let u=0,g=0;for(let v=0,p=c.length;v<p;v++){r.isInterleavedBufferAttribute?u=c[v]*r.data.stride+r.offset:u=c[v]*h;for(let m=0;m<h;m++)d[g++]=l[u++]}return new vn(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new $t,i=this.index.array,s=this.attributes;for(const r in s){const c=s[r],l=e(c,i);t.setAttribute(r,l)}const a=this.morphAttributes;for(const r in a){const c=[],l=a[r];for(let h=0,f=l.length;h<f;h++){const d=l[h],u=e(d,i);c.push(u)}t.morphAttributes[r]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let r=0,c=o.length;r<c;r++){const l=o[r];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,d=l.length;f<d;f++){const u=l[f];h.push(u.toJSON(e.data))}h.length>0&&(s[c]=h,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const r=this.boundingSphere;return r!==null&&(e.data.boundingSphere={center:r.center.toArray(),radius:r.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const a=e.morphAttributes;for(const l in a){const h=[],f=a[l];for(let d=0,u=f.length;d<u;d++)h.push(f[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const r=e.boundingBox;r!==null&&(this.boundingBox=r.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nc=new ut,Ti=new io,ba=new sa,ic=new N,ya=new N,xa=new N,_a=new N,ko=new N,Ma=new N,sc=new N,Sa=new N;class Q extends Lt{constructor(e=new $t,t=new Ut){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const r=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const r=this.morphTargetInfluences;if(a&&r){Ma.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const h=r[c],f=a[c];h!==0&&(ko.fromBufferAttribute(f,e),o?Ma.addScaledVector(ko,h):Ma.addScaledVector(ko.sub(t),h))}t.add(Ma)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ba.copy(i.boundingSphere),ba.applyMatrix4(a),Ti.copy(e.ray).recast(e.near),!(ba.containsPoint(Ti.origin)===!1&&(Ti.intersectSphere(ba,ic)===null||Ti.origin.distanceToSquared(ic)>(e.far-e.near)**2))&&(nc.copy(a).invert(),Ti.copy(e.ray).applyMatrix4(nc),!(i.boundingBox!==null&&Ti.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ti)))}_computeIntersections(e,t,i){let s;const a=this.geometry,o=this.material,r=a.index,c=a.attributes.position,l=a.attributes.uv,h=a.attributes.uv1,f=a.attributes.normal,d=a.groups,u=a.drawRange;if(r!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const p=d[g],m=o[p.materialIndex],y=Math.max(p.start,u.start),b=Math.min(r.count,Math.min(p.start+p.count,u.start+u.count));for(let x=y,A=b;x<A;x+=3){const S=r.getX(x),w=r.getX(x+1),R=r.getX(x+2);s=Ea(this,m,e,i,l,h,f,S,w,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,u.start),v=Math.min(r.count,u.start+u.count);for(let p=g,m=v;p<m;p+=3){const y=r.getX(p),b=r.getX(p+1),x=r.getX(p+2);s=Ea(this,o,e,i,l,h,f,y,b,x),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const p=d[g],m=o[p.materialIndex],y=Math.max(p.start,u.start),b=Math.min(c.count,Math.min(p.start+p.count,u.start+u.count));for(let x=y,A=b;x<A;x+=3){const S=x,w=x+1,R=x+2;s=Ea(this,m,e,i,l,h,f,S,w,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,u.start),v=Math.min(c.count,u.start+u.count);for(let p=g,m=v;p<m;p+=3){const y=p,b=p+1,x=p+2;s=Ea(this,o,e,i,l,h,f,y,b,x),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function Ju(n,e,t,i,s,a,o,r){let c;if(e.side===cn?c=i.intersectTriangle(o,a,s,!0,r):c=i.intersectTriangle(s,a,o,e.side===bi,r),c===null)return null;Sa.copy(r),Sa.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Sa);return l<t.near||l>t.far?null:{distance:l,point:Sa.clone(),object:n}}function Ea(n,e,t,i,s,a,o,r,c,l){n.getVertexPosition(r,ya),n.getVertexPosition(c,xa),n.getVertexPosition(l,_a);const h=Ju(n,e,t,i,ya,xa,_a,sc);if(h){const f=new N;In.getBarycoord(sc,ya,xa,_a,f),s&&(h.uv=In.getInterpolatedAttribute(s,r,c,l,f,new Me)),a&&(h.uv1=In.getInterpolatedAttribute(a,r,c,l,f,new Me)),o&&(h.normal=In.getInterpolatedAttribute(o,r,c,l,f,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:r,b:c,c:l,normal:new N,materialIndex:0};In.getNormal(ya,xa,_a,d.normal),h.face=d,h.barycoord=f}return h}class qt extends $t{constructor(e=1,t=1,i=1,s=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:o};const r=this;s=Math.floor(s),a=Math.floor(a),o=Math.floor(o);const c=[],l=[],h=[],f=[];let d=0,u=0;g("z","y","x",-1,-1,i,t,e,o,a,0),g("z","y","x",1,-1,i,t,-e,o,a,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,a,4),g("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(c),this.setAttribute("position",new ft(l,3)),this.setAttribute("normal",new ft(h,3)),this.setAttribute("uv",new ft(f,2));function g(v,p,m,y,b,x,A,S,w,R,B){const _=x/w,E=A/R,D=x/2,k=A/2,z=S/2,K=w+1,U=R+1;let Z=0,j=0;const pe=new N;for(let me=0;me<U;me++){const Te=me*E-k;for(let Ye=0;Ye<K;Ye++){const je=Ye*_-D;pe[v]=je*y,pe[p]=Te*b,pe[m]=z,l.push(pe.x,pe.y,pe.z),pe[v]=0,pe[p]=0,pe[m]=S>0?1:-1,h.push(pe.x,pe.y,pe.z),f.push(Ye/w),f.push(1-me/R),Z+=1}}for(let me=0;me<R;me++)for(let Te=0;Te<w;Te++){const Ye=d+Te+K*me,je=d+Te+K*(me+1),ee=d+(Te+1)+K*(me+1),ae=d+(Te+1)+K*me;c.push(Ye,je,ae),c.push(je,ee,ae),j+=6}r.addGroup(u,j,B),u+=j,d+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ms(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Jt(n){const e={};for(let t=0;t<n.length;t++){const i=Ms(n[t]);for(const s in i)e[s]=i[s]}return e}function Zu(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Fh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const Qu={clone:Ms,merge:Jt};var ef=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yi extends Wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ef,this.fragmentShader=tf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ms(e.uniforms),this.uniformsGroups=Zu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Oh extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=Jn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ri=new N,ac=new Me,oc=new Me;class Ln extends Oh{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ws*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zs*2*Math.atan(Math.tan(Ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ri.x,ri.y).multiplyScalar(-e/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ri.x,ri.y).multiplyScalar(-e/ri.z)}getViewSize(e,t){return this.getViewBounds(e,ac,oc),t.subVectors(oc,ac)}setViewOffset(e,t,i,s,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ws*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;a+=o.offsetX*s/c,t-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const r=this.filmOffset;r!==0&&(a+=e*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const is=-90,ss=1;class nf extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ln(is,ss,e,t);s.layers=this.layers,this.add(s);const a=new Ln(is,ss,e,t);a.layers=this.layers,this.add(a);const o=new Ln(is,ss,e,t);o.layers=this.layers,this.add(o);const r=new Ln(is,ss,e,t);r.layers=this.layers,this.add(r);const c=new Ln(is,ss,e,t);c.layers=this.layers,this.add(c);const l=new Ln(is,ss,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,o,r,c]=t;for(const l of t)this.remove(l);if(e===Jn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),r.up.set(0,1,0),r.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ja)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),r.up.set(0,-1,0),r.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,r,c,l,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,a),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,r),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(f,d,u),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Bh extends tn{constructor(e,t,i,s,a,o,r,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:bs,super(e,t,i,s,a,o,r,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class sf extends Hi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Bh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new qt(5,5,5),a=new yi({name:"CubemapFromEquirect",uniforms:Ms(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:mi});a.uniforms.tEquirect.value=t;const o=new Q(s,a),r=t.minFilter;return t.minFilter===Fi&&(t.minFilter=Dn),new nf(1,10,this).update(e,o),t.minFilter=r,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(a)}}const No=new N,af=new N,of=new qe;class di{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=No.subVectors(i,t).cross(af.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(No),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||of.getNormalMatrix(e),s=this.coplanarPoint(No).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ai=new sa,wa=new N;class fl{constructor(e=new di,t=new di,i=new di,s=new di,a=new di,o=new di){this.planes=[e,t,i,s,a,o]}set(e,t,i,s,a,o){const r=this.planes;return r[0].copy(e),r[1].copy(t),r[2].copy(i),r[3].copy(s),r[4].copy(a),r[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Jn){const i=this.planes,s=e.elements,a=s[0],o=s[1],r=s[2],c=s[3],l=s[4],h=s[5],f=s[6],d=s[7],u=s[8],g=s[9],v=s[10],p=s[11],m=s[12],y=s[13],b=s[14],x=s[15];if(i[0].setComponents(c-a,d-l,p-u,x-m).normalize(),i[1].setComponents(c+a,d+l,p+u,x+m).normalize(),i[2].setComponents(c+o,d+h,p+g,x+y).normalize(),i[3].setComponents(c-o,d-h,p-g,x-y).normalize(),i[4].setComponents(c-r,d-f,p-v,x-b).normalize(),t===Jn)i[5].setComponents(c+r,d+f,p+v,x+b).normalize();else if(t===Ja)i[5].setComponents(r,f,v,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(e){return Ai.center.set(0,0,0),Ai.radius=.7071067811865476,Ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(wa.x=s.normal.x>0?e.max.x:e.min.x,wa.y=s.normal.y>0?e.max.y:e.min.y,wa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(wa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function zh(){let n=null,e=!1,t=null,i=null;function s(a,o){t(a,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function rf(n){const e=new WeakMap;function t(r,c){const l=r.array,h=r.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,h),r.onUploadCallback();let u;if(l instanceof Float32Array)u=n.FLOAT;else if(l instanceof Uint16Array)r.isFloat16BufferAttribute?u=n.HALF_FLOAT:u=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)u=n.SHORT;else if(l instanceof Uint32Array)u=n.UNSIGNED_INT;else if(l instanceof Int32Array)u=n.INT;else if(l instanceof Int8Array)u=n.BYTE;else if(l instanceof Uint8Array)u=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)u=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:u,bytesPerElement:l.BYTES_PER_ELEMENT,version:r.version,size:f}}function i(r,c,l){const h=c.array,f=c.updateRanges;if(n.bindBuffer(l,r),f.length===0)n.bufferSubData(l,0,h);else{f.sort((u,g)=>u.start-g.start);let d=0;for(let u=1;u<f.length;u++){const g=f[d],v=f[u];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,f[d]=v)}f.length=d+1;for(let u=0,g=f.length;u<g;u++){const v=f[u];n.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(r){return r.isInterleavedBufferAttribute&&(r=r.data),e.get(r)}function a(r){r.isInterleavedBufferAttribute&&(r=r.data);const c=e.get(r);c&&(n.deleteBuffer(c.buffer),e.delete(r))}function o(r,c){if(r.isInterleavedBufferAttribute&&(r=r.data),r.isGLBufferAttribute){const h=e.get(r);(!h||h.version<r.version)&&e.set(r,{buffer:r.buffer,type:r.type,bytesPerElement:r.elementSize,version:r.version});return}const l=e.get(r);if(l===void 0)e.set(r,t(r,c));else if(l.version<r.version){if(l.size!==r.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,r,c),l.version=r.version}}return{get:s,remove:a,update:o}}class En extends $t{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,o=t/2,r=Math.floor(i),c=Math.floor(s),l=r+1,h=c+1,f=e/r,d=t/c,u=[],g=[],v=[],p=[];for(let m=0;m<h;m++){const y=m*d-o;for(let b=0;b<l;b++){const x=b*f-a;g.push(x,-y,0),v.push(0,0,1),p.push(b/r),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<r;y++){const b=y+l*m,x=y+l*(m+1),A=y+1+l*(m+1),S=y+1+l*m;u.push(b,x,S),u.push(x,A,S)}this.setIndex(u),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(v,3)),this.setAttribute("uv",new ft(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new En(e.width,e.height,e.widthSegments,e.heightSegments)}}var lf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cf=`#ifdef USE_ALPHAHASH
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
#endif`,hf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,df=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ff=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pf=`#ifdef USE_AOMAP
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
#endif`,mf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gf=`#ifdef USE_BATCHING
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
#endif`,vf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_f=`#ifdef USE_IRIDESCENCE
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
#endif`,Mf=`#ifdef USE_BUMPMAP
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
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Af=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Lf=`#define PI 3.141592653589793
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
} // validated`,Df=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,If=`vec3 transformedNormal = objectNormal;
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
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Uf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ff=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Of="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bf=`
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
}`,zf=`#ifdef USE_ENVMAP
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
#endif`,Gf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Hf=`#ifdef USE_ENVMAP
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
#endif`,Vf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wf=`#ifdef USE_ENVMAP
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
#endif`,qf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$f=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jf=`#ifdef USE_GRADIENTMAP
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
}`,Kf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qf=`uniform bool receiveShadow;
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
#endif`,ep=`#ifdef USE_ENVMAP
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
#endif`,tp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,np=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ip=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ap=`PhysicalMaterial material;
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
#endif`,op=`struct PhysicalMaterial {
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
}`,rp=`
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
#endif`,lp=`#if defined( RE_IndirectDiffuse )
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
#endif`,cp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,up=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vp=`#if defined( USE_POINTS_UV )
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
#endif`,bp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_p=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Mp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sp=`#ifdef USE_MORPHTARGETS
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
#endif`,Ep=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ap=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Pp=`#ifdef USE_NORMALMAP
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
#endif`,Lp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ip=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Np=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Up=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Fp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Op=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Hp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$p=`float getShadowMask() {
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
}`,Xp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yp=`#ifdef USE_SKINNING
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
#endif`,jp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Kp=`#ifdef USE_SKINNING
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
#endif`,Jp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,em=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tm=`#ifdef USE_TRANSMISSION
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
#endif`,nm=`#ifdef USE_TRANSMISSION
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
#endif`,im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,om=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lm=`uniform sampler2D t2D;
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
}`,cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,um=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`#include <common>
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
}`,pm=`#if DEPTH_PACKING == 3200
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
}`,mm=`#define DISTANCE
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
}`,gm=`#define DISTANCE
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
}`,vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ym=`uniform float scale;
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
}`,xm=`uniform vec3 diffuse;
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
}`,_m=`#include <common>
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
}`,Mm=`uniform vec3 diffuse;
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
}`,Sm=`#define LAMBERT
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
}`,Em=`#define LAMBERT
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
}`,wm=`#define MATCAP
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
}`,Tm=`#define MATCAP
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
}`,Am=`#define NORMAL
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
}`,Cm=`#define NORMAL
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
}`,Rm=`#define PHONG
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
}`,Pm=`#define PHONG
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
}`,Lm=`#define STANDARD
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
}`,Dm=`#define STANDARD
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
}`,Im=`#define TOON
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
}`,km=`#define TOON
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
}`,Nm=`uniform float size;
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
}`,Um=`uniform vec3 diffuse;
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
}`,Fm=`#include <common>
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
}`,Om=`uniform vec3 color;
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
}`,Bm=`uniform float rotation;
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
}`,zm=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:lf,alphahash_pars_fragment:cf,alphamap_fragment:hf,alphamap_pars_fragment:df,alphatest_fragment:uf,alphatest_pars_fragment:ff,aomap_fragment:pf,aomap_pars_fragment:mf,batching_pars_vertex:gf,batching_vertex:vf,begin_vertex:bf,beginnormal_vertex:yf,bsdfs:xf,iridescence_fragment:_f,bumpmap_pars_fragment:Mf,clipping_planes_fragment:Sf,clipping_planes_pars_fragment:Ef,clipping_planes_pars_vertex:wf,clipping_planes_vertex:Tf,color_fragment:Af,color_pars_fragment:Cf,color_pars_vertex:Rf,color_vertex:Pf,common:Lf,cube_uv_reflection_fragment:Df,defaultnormal_vertex:If,displacementmap_pars_vertex:kf,displacementmap_vertex:Nf,emissivemap_fragment:Uf,emissivemap_pars_fragment:Ff,colorspace_fragment:Of,colorspace_pars_fragment:Bf,envmap_fragment:zf,envmap_common_pars_fragment:Gf,envmap_pars_fragment:Hf,envmap_pars_vertex:Vf,envmap_physical_pars_fragment:ep,envmap_vertex:Wf,fog_vertex:qf,fog_pars_vertex:$f,fog_fragment:Xf,fog_pars_fragment:Yf,gradientmap_pars_fragment:jf,lightmap_pars_fragment:Kf,lights_lambert_fragment:Jf,lights_lambert_pars_fragment:Zf,lights_pars_begin:Qf,lights_toon_fragment:tp,lights_toon_pars_fragment:np,lights_phong_fragment:ip,lights_phong_pars_fragment:sp,lights_physical_fragment:ap,lights_physical_pars_fragment:op,lights_fragment_begin:rp,lights_fragment_maps:lp,lights_fragment_end:cp,logdepthbuf_fragment:hp,logdepthbuf_pars_fragment:dp,logdepthbuf_pars_vertex:up,logdepthbuf_vertex:fp,map_fragment:pp,map_pars_fragment:mp,map_particle_fragment:gp,map_particle_pars_fragment:vp,metalnessmap_fragment:bp,metalnessmap_pars_fragment:yp,morphinstance_vertex:xp,morphcolor_vertex:_p,morphnormal_vertex:Mp,morphtarget_pars_vertex:Sp,morphtarget_vertex:Ep,normal_fragment_begin:wp,normal_fragment_maps:Tp,normal_pars_fragment:Ap,normal_pars_vertex:Cp,normal_vertex:Rp,normalmap_pars_fragment:Pp,clearcoat_normal_fragment_begin:Lp,clearcoat_normal_fragment_maps:Dp,clearcoat_pars_fragment:Ip,iridescence_pars_fragment:kp,opaque_fragment:Np,packing:Up,premultiplied_alpha_fragment:Fp,project_vertex:Op,dithering_fragment:Bp,dithering_pars_fragment:zp,roughnessmap_fragment:Gp,roughnessmap_pars_fragment:Hp,shadowmap_pars_fragment:Vp,shadowmap_pars_vertex:Wp,shadowmap_vertex:qp,shadowmask_pars_fragment:$p,skinbase_vertex:Xp,skinning_pars_vertex:Yp,skinning_vertex:jp,skinnormal_vertex:Kp,specularmap_fragment:Jp,specularmap_pars_fragment:Zp,tonemapping_fragment:Qp,tonemapping_pars_fragment:em,transmission_fragment:tm,transmission_pars_fragment:nm,uv_pars_fragment:im,uv_pars_vertex:sm,uv_vertex:am,worldpos_vertex:om,background_vert:rm,background_frag:lm,backgroundCube_vert:cm,backgroundCube_frag:hm,cube_vert:dm,cube_frag:um,depth_vert:fm,depth_frag:pm,distanceRGBA_vert:mm,distanceRGBA_frag:gm,equirect_vert:vm,equirect_frag:bm,linedashed_vert:ym,linedashed_frag:xm,meshbasic_vert:_m,meshbasic_frag:Mm,meshlambert_vert:Sm,meshlambert_frag:Em,meshmatcap_vert:wm,meshmatcap_frag:Tm,meshnormal_vert:Am,meshnormal_frag:Cm,meshphong_vert:Rm,meshphong_frag:Pm,meshphysical_vert:Lm,meshphysical_frag:Dm,meshtoon_vert:Im,meshtoon_frag:km,points_vert:Nm,points_frag:Um,shadow_vert:Fm,shadow_frag:Om,sprite_vert:Bm,sprite_frag:zm},_e={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new Me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},Fn={basic:{uniforms:Jt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Jt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new He(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Jt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Jt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Jt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new He(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Jt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Jt([_e.points,_e.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Jt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Jt([_e.common,_e.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Jt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Jt([_e.sprite,_e.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Jt([_e.common,_e.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Jt([_e.lights,_e.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Fn.physical={uniforms:Jt([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new Me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new Me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new Me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Ta={r:0,b:0,g:0},Ci=new Bn,Gm=new ut;function Hm(n,e,t,i,s,a,o){const r=new He(0);let c=a===!0?0:1,l,h,f=null,d=0,u=null;function g(y){let b=y.isScene===!0?y.background:null;return b&&b.isTexture&&(b=(y.backgroundBlurriness>0?t:e).get(b)),b}function v(y){let b=!1;const x=g(y);x===null?m(r,c):x&&x.isColor&&(m(x,1),b=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(y,b){const x=g(b);x&&(x.isCubeTexture||x.mapping===to)?(h===void 0&&(h=new Q(new qt(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:Ms(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ci.copy(b.backgroundRotation),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Gm.makeRotationFromEuler(Ci)),h.material.toneMapped=at.getTransfer(x.colorSpace)!==vt,(f!==x||d!==x.version||u!==n.toneMapping)&&(h.material.needsUpdate=!0,f=x,d=x.version,u=n.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Q(new En(2,2),new yi({name:"BackgroundMaterial",uniforms:Ms(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=at.getTransfer(x.colorSpace)!==vt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||d!==x.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,f=x,d=x.version,u=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,b){y.getRGB(Ta,Fh(n)),i.buffers.color.setClear(Ta.r,Ta.g,Ta.b,b,o)}return{getClearColor:function(){return r},setClearColor:function(y,b=1){r.set(y),c=b,m(r,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,m(r,c)},render:v,addToRenderList:p}}function Vm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let a=s,o=!1;function r(_,E,D,k,z){let K=!1;const U=f(k,D,E);a!==U&&(a=U,l(a.object)),K=u(_,k,D,z),K&&g(_,k,D,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,x(_,E,D,k),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function c(){return n.createVertexArray()}function l(_){return n.bindVertexArray(_)}function h(_){return n.deleteVertexArray(_)}function f(_,E,D){const k=D.wireframe===!0;let z=i[_.id];z===void 0&&(z={},i[_.id]=z);let K=z[E.id];K===void 0&&(K={},z[E.id]=K);let U=K[k];return U===void 0&&(U=d(c()),K[k]=U),U}function d(_){const E=[],D=[],k=[];for(let z=0;z<t;z++)E[z]=0,D[z]=0,k[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:D,attributeDivisors:k,object:_,attributes:{},index:null}}function u(_,E,D,k){const z=a.attributes,K=E.attributes;let U=0;const Z=D.getAttributes();for(const j in Z)if(Z[j].location>=0){const me=z[j];let Te=K[j];if(Te===void 0&&(j==="instanceMatrix"&&_.instanceMatrix&&(Te=_.instanceMatrix),j==="instanceColor"&&_.instanceColor&&(Te=_.instanceColor)),me===void 0||me.attribute!==Te||Te&&me.data!==Te.data)return!0;U++}return a.attributesNum!==U||a.index!==k}function g(_,E,D,k){const z={},K=E.attributes;let U=0;const Z=D.getAttributes();for(const j in Z)if(Z[j].location>=0){let me=K[j];me===void 0&&(j==="instanceMatrix"&&_.instanceMatrix&&(me=_.instanceMatrix),j==="instanceColor"&&_.instanceColor&&(me=_.instanceColor));const Te={};Te.attribute=me,me&&me.data&&(Te.data=me.data),z[j]=Te,U++}a.attributes=z,a.attributesNum=U,a.index=k}function v(){const _=a.newAttributes;for(let E=0,D=_.length;E<D;E++)_[E]=0}function p(_){m(_,0)}function m(_,E){const D=a.newAttributes,k=a.enabledAttributes,z=a.attributeDivisors;D[_]=1,k[_]===0&&(n.enableVertexAttribArray(_),k[_]=1),z[_]!==E&&(n.vertexAttribDivisor(_,E),z[_]=E)}function y(){const _=a.newAttributes,E=a.enabledAttributes;for(let D=0,k=E.length;D<k;D++)E[D]!==_[D]&&(n.disableVertexAttribArray(D),E[D]=0)}function b(_,E,D,k,z,K,U){U===!0?n.vertexAttribIPointer(_,E,D,z,K):n.vertexAttribPointer(_,E,D,k,z,K)}function x(_,E,D,k){v();const z=k.attributes,K=D.getAttributes(),U=E.defaultAttributeValues;for(const Z in K){const j=K[Z];if(j.location>=0){let pe=z[Z];if(pe===void 0&&(Z==="instanceMatrix"&&_.instanceMatrix&&(pe=_.instanceMatrix),Z==="instanceColor"&&_.instanceColor&&(pe=_.instanceColor)),pe!==void 0){const me=pe.normalized,Te=pe.itemSize,Ye=e.get(pe);if(Ye===void 0)continue;const je=Ye.buffer,ee=Ye.type,ae=Ye.bytesPerElement,we=ee===n.INT||ee===n.UNSIGNED_INT||pe.gpuType===sl;if(pe.isInterleavedBufferAttribute){const be=pe.data,X=be.stride,ne=pe.offset;if(be.isInstancedInterleavedBuffer){for(let ve=0;ve<j.locationSize;ve++)m(j.location+ve,be.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=be.meshPerAttribute*be.count)}else for(let ve=0;ve<j.locationSize;ve++)p(j.location+ve);n.bindBuffer(n.ARRAY_BUFFER,je);for(let ve=0;ve<j.locationSize;ve++)b(j.location+ve,Te/j.locationSize,ee,me,X*ae,(ne+Te/j.locationSize*ve)*ae,we)}else{if(pe.isInstancedBufferAttribute){for(let be=0;be<j.locationSize;be++)m(j.location+be,pe.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let be=0;be<j.locationSize;be++)p(j.location+be);n.bindBuffer(n.ARRAY_BUFFER,je);for(let be=0;be<j.locationSize;be++)b(j.location+be,Te/j.locationSize,ee,me,Te*ae,Te/j.locationSize*be*ae,we)}}else if(U!==void 0){const me=U[Z];if(me!==void 0)switch(me.length){case 2:n.vertexAttrib2fv(j.location,me);break;case 3:n.vertexAttrib3fv(j.location,me);break;case 4:n.vertexAttrib4fv(j.location,me);break;default:n.vertexAttrib1fv(j.location,me)}}}}y()}function A(){R();for(const _ in i){const E=i[_];for(const D in E){const k=E[D];for(const z in k)h(k[z].object),delete k[z];delete E[D]}delete i[_]}}function S(_){if(i[_.id]===void 0)return;const E=i[_.id];for(const D in E){const k=E[D];for(const z in k)h(k[z].object),delete k[z];delete E[D]}delete i[_.id]}function w(_){for(const E in i){const D=i[E];if(D[_.id]===void 0)continue;const k=D[_.id];for(const z in k)h(k[z].object),delete k[z];delete D[_.id]}}function R(){B(),o=!0,a!==s&&(a=s,l(a.object))}function B(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:r,reset:R,resetDefaultState:B,dispose:A,releaseStatesOfGeometry:S,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:p,disableUnusedAttributes:y}}function Wm(n,e,t){let i;function s(l){i=l}function a(l,h){n.drawArrays(i,l,h),t.update(h,i,1)}function o(l,h,f){f!==0&&(n.drawArraysInstanced(i,l,h,f),t.update(h,i,f))}function r(l,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,f);let u=0;for(let g=0;g<f;g++)u+=h[g];t.update(u,i,1)}function c(l,h,f,d){if(f===0)return;const u=e.get("WEBGL_multi_draw");if(u===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{u.multiDrawArraysInstancedWEBGL(i,l,0,h,0,d,0,f);let g=0;for(let v=0;v<f;v++)g+=h[v];for(let v=0;v<d.length;v++)t.update(g,i,d[v])}}this.setMode=s,this.render=a,this.renderInstances=o,this.renderMultiDraw=r,this.renderMultiDrawInstances=c}function qm(n,e,t,i){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==kn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function r(w){const R=w===ta&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Qn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Kn&&!R)}function c(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(d===!0){const w=e.get("EXT_clip_control");w.clipControlEXT(w.LOWER_LEFT_EXT,w.ZERO_TO_ONE_EXT)}const u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,S=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:r,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:u,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:A,maxSamples:S}}function $m(n){const e=this;let t=null,i=0,s=!1,a=!1;const o=new di,r=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const u=f.length!==0||d||i!==0||s;return s=d,i=f.length,u},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,u){const g=f.clippingPlanes,v=f.clipIntersection,p=f.clipShadows,m=n.get(f);if(!s||g===null||g.length===0||a&&!p)a?h(null):l();else{const y=a?0:i,b=y*4;let x=m.clippingState||null;c.value=x,x=h(g,d,b,u);for(let A=0;A!==b;++A)x[A]=t[A];m.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,d,u,g){const v=f!==null?f.length:0;let p=null;if(v!==0){if(p=c.value,g!==!0||p===null){const m=u+v*4,y=d.matrixWorldInverse;r.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let b=0,x=u;b!==v;++b,x+=4)o.copy(f[b]).applyMatrix4(y,r),o.normal.toArray(p,x),p[x+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function Xm(n){let e=new WeakMap;function t(o,r){return r===fr?o.mapping=bs:r===pr&&(o.mapping=ys),o}function i(o){if(o&&o.isTexture){const r=o.mapping;if(r===fr||r===pr)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new sf(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const r=o.target;r.removeEventListener("dispose",s);const c=e.get(r);c!==void 0&&(e.delete(r),c.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}class pl extends Oh{constructor(e=-1,t=1,i=1,s=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,o=i+e,r=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,o=a+l*this.view.width,r-=h*this.view.offsetY,c=r-h*this.view.height}this.projectionMatrix.makeOrthographic(a,o,r,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const us=4,rc=[.125,.215,.35,.446,.526,.582],ki=20,Uo=new pl,lc=new He;let Fo=null,Oo=0,Bo=0,zo=!1;const Di=(1+Math.sqrt(5))/2,as=1/Di,cc=[new N(-Di,as,0),new N(Di,as,0),new N(-as,0,Di),new N(as,0,Di),new N(0,Di,-as),new N(0,Di,as),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class hc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Fo=this._renderer.getRenderTarget(),Oo=this._renderer.getActiveCubeFace(),Bo=this._renderer.getActiveMipmapLevel(),zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,s,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Fo,Oo,Bo),this._renderer.xr.enabled=zo,e.scissorTest=!1,Aa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bs||e.mapping===ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fo=this._renderer.getRenderTarget(),Oo=this._renderer.getActiveCubeFace(),Bo=this._renderer.getActiveMipmapLevel(),zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dn,minFilter:Dn,generateMipmaps:!1,type:ta,format:kn,colorSpace:xi,depthBuffer:!1},s=dc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dc(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ym(a)),this._blurMaterial=jm(a,e,t)}return s}_compileMaterial(e){const t=new Q(this._lodPlanes[0],e);this._renderer.compile(t,Uo)}_sceneToCubeUV(e,t,i,s){const r=new Ln(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(lc),h.toneMapping=gi,h.autoClear=!1;const u=new Ut({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),g=new Q(new qt,u);let v=!1;const p=e.background;p?p.isColor&&(u.color.copy(p),e.background=null,v=!0):(u.color.copy(lc),v=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(r.up.set(0,c[m],0),r.lookAt(l[m],0,0)):y===1?(r.up.set(0,0,c[m]),r.lookAt(0,l[m],0)):(r.up.set(0,c[m],0),r.lookAt(0,0,l[m]));const b=this._cubeSize;Aa(s,y*b,m>2?b:0,b,b),h.setRenderTarget(s),v&&h.render(g,r),h.render(e,r)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===bs||e.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=fc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uc());const a=s?this._cubemapMaterial:this._equirectMaterial,o=new Q(this._lodPlanes[0],a),r=a.uniforms;r.envMap.value=e;const c=this._cubeSize;Aa(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Uo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),r=cc[(s-a-1)%cc.length];this._blur(e,a-1,a,o,r)}t.autoClear=i}_blur(e,t,i,s,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",a),this._halfBlur(o,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,o,r){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Q(this._lodPlanes[s],l),d=l.uniforms,u=this._sizeLods[i]-1,g=isFinite(a)?Math.PI/(2*u):2*Math.PI/(2*ki-1),v=a/g,p=isFinite(a)?1+Math.floor(h*v):ki;p>ki&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ki}`);const m=[];let y=0;for(let w=0;w<ki;++w){const R=w/v,B=Math.exp(-R*R/2);m.push(B),w===0?y+=B:w<p&&(y+=2*B)}for(let w=0;w<m.length;w++)m[w]=m[w]/y;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=o==="latitudinal",r&&(d.poleAxis.value=r);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-i;const x=this._sizeLods[s],A=3*x*(s>b-us?s-b+us:0),S=4*(this._cubeSize-x);Aa(t,A,S,3*x,2*x),c.setRenderTarget(t),c.render(f,Uo)}}function Ym(n){const e=[],t=[],i=[];let s=n;const a=n-us+1+rc.length;for(let o=0;o<a;o++){const r=Math.pow(2,s);t.push(r);let c=1/r;o>n-us?c=rc[o-n+us-1]:o===0&&(c=0),i.push(c);const l=1/(r-2),h=-l,f=1+l,d=[h,h,f,h,f,f,h,h,f,f,h,f],u=6,g=6,v=3,p=2,m=1,y=new Float32Array(v*g*u),b=new Float32Array(p*g*u),x=new Float32Array(m*g*u);for(let S=0;S<u;S++){const w=S%3*2/3-1,R=S>2?0:-1,B=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];y.set(B,v*g*S),b.set(d,p*g*S);const _=[S,S,S,S,S,S];x.set(_,m*g*S)}const A=new $t;A.setAttribute("position",new vn(y,v)),A.setAttribute("uv",new vn(b,p)),A.setAttribute("faceIndex",new vn(x,m)),e.push(A),s>us&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function dc(n,e,t){const i=new Hi(n,e,t);return i.texture.mapping=to,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Aa(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function jm(n,e,t){const i=new Float32Array(ki),s=new N(0,1,0);return new yi({name:"SphericalGaussianBlur",defines:{n:ki,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ml(),fragmentShader:`

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
		`,blending:mi,depthTest:!1,depthWrite:!1})}function uc(){return new yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ml(),fragmentShader:`

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
		`,blending:mi,depthTest:!1,depthWrite:!1})}function fc(){return new yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function ml(){return`

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
	`}function Km(n){let e=new WeakMap,t=null;function i(r){if(r&&r.isTexture){const c=r.mapping,l=c===fr||c===pr,h=c===bs||c===ys;if(l||h){let f=e.get(r);const d=f!==void 0?f.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==d)return t===null&&(t=new hc(n)),f=l?t.fromEquirectangular(r,f):t.fromCubemap(r,f),f.texture.pmremVersion=r.pmremVersion,e.set(r,f),f.texture;if(f!==void 0)return f.texture;{const u=r.image;return l&&u&&u.height>0||h&&u&&s(u)?(t===null&&(t=new hc(n)),f=l?t.fromEquirectangular(r):t.fromCubemap(r),f.texture.pmremVersion=r.pmremVersion,e.set(r,f),r.addEventListener("dispose",a),f.texture):null}}}return r}function s(r){let c=0;const l=6;for(let h=0;h<l;h++)r[h]!==void 0&&c++;return c===l}function a(r){const c=r.target;c.removeEventListener("dispose",a);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Jm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Va("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Zm(n,e,t,i){const s={},a=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let p=0,m=v.length;p<m;p++)e.remove(v[p])}d.removeEventListener("dispose",o),delete s[d.id];const u=a.get(d);u&&(e.remove(u),a.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function r(f,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const g in d)e.update(d[g],n.ARRAY_BUFFER);const u=f.morphAttributes;for(const g in u){const v=u[g];for(let p=0,m=v.length;p<m;p++)e.update(v[p],n.ARRAY_BUFFER)}}function l(f){const d=[],u=f.index,g=f.attributes.position;let v=0;if(u!==null){const y=u.array;v=u.version;for(let b=0,x=y.length;b<x;b+=3){const A=y[b+0],S=y[b+1],w=y[b+2];d.push(A,S,S,w,w,A)}}else if(g!==void 0){const y=g.array;v=g.version;for(let b=0,x=y.length/3-1;b<x;b+=3){const A=b+0,S=b+1,w=b+2;d.push(A,S,S,w,w,A)}}else return;const p=new(Lh(d)?Uh:Nh)(d,1);p.version=v;const m=a.get(f);m&&e.remove(m),a.set(f,p)}function h(f){const d=a.get(f);if(d){const u=f.index;u!==null&&d.version<u.version&&l(f)}else l(f);return a.get(f)}return{get:r,update:c,getWireframeAttribute:h}}function Qm(n,e,t){let i;function s(d){i=d}let a,o;function r(d){a=d.type,o=d.bytesPerElement}function c(d,u){n.drawElements(i,u,a,d*o),t.update(u,i,1)}function l(d,u,g){g!==0&&(n.drawElementsInstanced(i,u,a,d*o,g),t.update(u,i,g))}function h(d,u,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,a,d,0,g);let p=0;for(let m=0;m<g;m++)p+=u[m];t.update(p,i,1)}function f(d,u,g,v){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)l(d[m]/o,u[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(i,u,0,a,d,0,v,0,g);let m=0;for(let y=0;y<g;y++)m+=u[y];for(let y=0;y<v.length;y++)t.update(m,i,v[y])}}this.setMode=s,this.setIndex=r,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function e0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,r){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=r*(a/3);break;case n.LINES:t.lines+=r*(a/2);break;case n.LINE_STRIP:t.lines+=r*(a-1);break;case n.LINE_LOOP:t.lines+=r*a;break;case n.POINTS:t.points+=r*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function t0(n,e,t){const i=new WeakMap,s=new Mt;function a(o,r,c){const l=o.morphTargetInfluences,h=r.morphAttributes.position||r.morphAttributes.normal||r.morphAttributes.color,f=h!==void 0?h.length:0;let d=i.get(r);if(d===void 0||d.count!==f){let B=function(){w.dispose(),i.delete(r),r.removeEventListener("dispose",B)};d!==void 0&&d.texture.dispose();const u=r.morphAttributes.position!==void 0,g=r.morphAttributes.normal!==void 0,v=r.morphAttributes.color!==void 0,p=r.morphAttributes.position||[],m=r.morphAttributes.normal||[],y=r.morphAttributes.color||[];let b=0;u===!0&&(b=1),g===!0&&(b=2),v===!0&&(b=3);let x=r.attributes.position.count*b,A=1;x>e.maxTextureSize&&(A=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const S=new Float32Array(x*A*4*f),w=new Ih(S,x,A,f);w.type=Kn,w.needsUpdate=!0;const R=b*4;for(let _=0;_<f;_++){const E=p[_],D=m[_],k=y[_],z=x*A*4*_;for(let K=0;K<E.count;K++){const U=K*R;u===!0&&(s.fromBufferAttribute(E,K),S[z+U+0]=s.x,S[z+U+1]=s.y,S[z+U+2]=s.z,S[z+U+3]=0),g===!0&&(s.fromBufferAttribute(D,K),S[z+U+4]=s.x,S[z+U+5]=s.y,S[z+U+6]=s.z,S[z+U+7]=0),v===!0&&(s.fromBufferAttribute(k,K),S[z+U+8]=s.x,S[z+U+9]=s.y,S[z+U+10]=s.z,S[z+U+11]=k.itemSize===4?s.w:1)}}d={count:f,texture:w,size:new Me(x,A)},i.set(r,d),r.addEventListener("dispose",B)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let u=0;for(let v=0;v<l.length;v++)u+=l[v];const g=r.morphTargetsRelative?1:1-u;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:a}}function n0(n,e,t,i){let s=new WeakMap;function a(c){const l=i.render.frame,h=c.geometry,f=e.get(c,h);if(s.get(f)!==l&&(e.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",r)===!1&&c.addEventListener("dispose",r),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return f}function o(){s=new WeakMap}function r(c){const l=c.target;l.removeEventListener("dispose",r),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:a,dispose:o}}class Gh extends tn{constructor(e,t,i,s,a,o,r,c,l,h=fs){if(h!==fs&&h!==_s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===fs&&(i=Gi),i===void 0&&h===_s&&(i=xs),super(null,s,a,o,r,c,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=r!==void 0?r:wn,this.minFilter=c!==void 0?c:wn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Hh=new tn,pc=new Gh(1,1),Vh=new Ih,Wh=new Gu,qh=new Bh,mc=[],gc=[],vc=new Float32Array(16),bc=new Float32Array(9),yc=new Float32Array(4);function ws(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=mc[s];if(a===void 0&&(a=new Float32Array(s),mc[s]=a),e!==0){i.toArray(a,0);for(let o=1,r=0;o!==e;++o)r+=t,n[o].toArray(a,r)}return a}function Dt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function It(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function so(n,e){let t=gc[e];t===void 0&&(t=new Int32Array(e),gc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function i0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function s0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2fv(this.addr,e),It(t,e)}}function a0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;n.uniform3fv(this.addr,e),It(t,e)}}function o0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4fv(this.addr,e),It(t,e)}}function r0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;yc.set(i),n.uniformMatrix2fv(this.addr,!1,yc),It(t,i)}}function l0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;bc.set(i),n.uniformMatrix3fv(this.addr,!1,bc),It(t,i)}}function c0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;vc.set(i),n.uniformMatrix4fv(this.addr,!1,vc),It(t,i)}}function h0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function d0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2iv(this.addr,e),It(t,e)}}function u0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3iv(this.addr,e),It(t,e)}}function f0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4iv(this.addr,e),It(t,e)}}function p0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function m0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2uiv(this.addr,e),It(t,e)}}function g0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3uiv(this.addr,e),It(t,e)}}function v0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4uiv(this.addr,e),It(t,e)}}function b0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(pc.compareFunction=Ph,a=pc):a=Hh,t.setTexture2D(e||a,s)}function y0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Wh,s)}function x0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||qh,s)}function _0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Vh,s)}function M0(n){switch(n){case 5126:return i0;case 35664:return s0;case 35665:return a0;case 35666:return o0;case 35674:return r0;case 35675:return l0;case 35676:return c0;case 5124:case 35670:return h0;case 35667:case 35671:return d0;case 35668:case 35672:return u0;case 35669:case 35673:return f0;case 5125:return p0;case 36294:return m0;case 36295:return g0;case 36296:return v0;case 35678:case 36198:case 36298:case 36306:case 35682:return b0;case 35679:case 36299:case 36307:return y0;case 35680:case 36300:case 36308:case 36293:return x0;case 36289:case 36303:case 36311:case 36292:return _0}}function S0(n,e){n.uniform1fv(this.addr,e)}function E0(n,e){const t=ws(e,this.size,2);n.uniform2fv(this.addr,t)}function w0(n,e){const t=ws(e,this.size,3);n.uniform3fv(this.addr,t)}function T0(n,e){const t=ws(e,this.size,4);n.uniform4fv(this.addr,t)}function A0(n,e){const t=ws(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function C0(n,e){const t=ws(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function R0(n,e){const t=ws(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function P0(n,e){n.uniform1iv(this.addr,e)}function L0(n,e){n.uniform2iv(this.addr,e)}function D0(n,e){n.uniform3iv(this.addr,e)}function I0(n,e){n.uniform4iv(this.addr,e)}function k0(n,e){n.uniform1uiv(this.addr,e)}function N0(n,e){n.uniform2uiv(this.addr,e)}function U0(n,e){n.uniform3uiv(this.addr,e)}function F0(n,e){n.uniform4uiv(this.addr,e)}function O0(n,e,t){const i=this.cache,s=e.length,a=so(t,s);Dt(i,a)||(n.uniform1iv(this.addr,a),It(i,a));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Hh,a[o])}function B0(n,e,t){const i=this.cache,s=e.length,a=so(t,s);Dt(i,a)||(n.uniform1iv(this.addr,a),It(i,a));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Wh,a[o])}function z0(n,e,t){const i=this.cache,s=e.length,a=so(t,s);Dt(i,a)||(n.uniform1iv(this.addr,a),It(i,a));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||qh,a[o])}function G0(n,e,t){const i=this.cache,s=e.length,a=so(t,s);Dt(i,a)||(n.uniform1iv(this.addr,a),It(i,a));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Vh,a[o])}function H0(n){switch(n){case 5126:return S0;case 35664:return E0;case 35665:return w0;case 35666:return T0;case 35674:return A0;case 35675:return C0;case 35676:return R0;case 5124:case 35670:return P0;case 35667:case 35671:return L0;case 35668:case 35672:return D0;case 35669:case 35673:return I0;case 5125:return k0;case 36294:return N0;case 36295:return U0;case 36296:return F0;case 35678:case 36198:case 36298:case 36306:case 35682:return O0;case 35679:case 36299:case 36307:return B0;case 35680:case 36300:case 36308:case 36293:return z0;case 36289:case 36303:case 36311:case 36292:return G0}}class V0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=M0(t.type)}}class W0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=H0(t.type)}}class q0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,o=s.length;a!==o;++a){const r=s[a];r.setValue(e,t[r.id],i)}}}const Go=/(\w+)(\])?(\[|\.)?/g;function xc(n,e){n.seq.push(e),n.map[e.id]=e}function $0(n,e,t){const i=n.name,s=i.length;for(Go.lastIndex=0;;){const a=Go.exec(i),o=Go.lastIndex;let r=a[1];const c=a[2]==="]",l=a[3];if(c&&(r=r|0),l===void 0||l==="["&&o+2===s){xc(t,l===void 0?new V0(r,n,e):new W0(r,n,e));break}else{let f=t.map[r];f===void 0&&(f=new q0(r),xc(t,f)),t=f}}}class Wa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s),o=e.getUniformLocation(t,a.name);$0(a,o,this)}}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,o=t.length;a!==o;++a){const r=t[a],c=i[r.id];c.needsUpdate!==!1&&r.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function _c(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const X0=37297;let Y0=0;function j0(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let o=s;o<a;o++){const r=o+1;i.push(`${r===e?">":" "} ${r}: ${t[o]}`)}return i.join(`
`)}function K0(n){const e=at.getPrimaries(at.workingColorSpace),t=at.getPrimaries(n);let i;switch(e===t?i="":e===Ka&&t===ja?i="LinearDisplayP3ToLinearSRGB":e===ja&&t===Ka&&(i="LinearSRGBToLinearDisplayP3"),n){case xi:case no:return[i,"LinearTransferOETF"];case rn:case hl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Mc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+j0(n.getShaderSource(e),o)}else return s}function J0(n,e){const t=K0(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Z0(n,e){let t;switch(e){case Qd:t="Linear";break;case eu:t="Reinhard";break;case tu:t="Cineon";break;case vh:t="ACESFilmic";break;case iu:t="AgX";break;case su:t="Neutral";break;case nu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ca=new N;function Q0(){at.getLuminanceCoefficients(Ca);const n=Ca.x.toFixed(4),e=Ca.y.toFixed(4),t=Ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function eg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vs).join(`
`)}function tg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function ng(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),o=a.name;let r=1;a.type===n.FLOAT_MAT2&&(r=2),a.type===n.FLOAT_MAT3&&(r=3),a.type===n.FLOAT_MAT4&&(r=4),t[o]={type:a.type,location:n.getAttribLocation(e,o),locationSize:r}}return t}function Vs(n){return n!==""}function Sc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ec(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ig=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vr(n){return n.replace(ig,ag)}const sg=new Map;function ag(n,e){let t=We[e];if(t===void 0){const i=sg.get(e);if(i!==void 0)t=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Vr(t)}const og=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wc(n){return n.replace(og,rg)}function rg(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Tc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function lg(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ph?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===mh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Yn&&(e="SHADOWMAP_TYPE_VSM"),e}function cg(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case bs:case ys:e="ENVMAP_TYPE_CUBE";break;case to:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hg(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ys:e="ENVMAP_MODE_REFRACTION";break}return e}function dg(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case gh:e="ENVMAP_BLENDING_MULTIPLY";break;case Jd:e="ENVMAP_BLENDING_MIX";break;case Zd:e="ENVMAP_BLENDING_ADD";break}return e}function ug(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function fg(n,e,t,i){const s=n.getContext(),a=t.defines;let o=t.vertexShader,r=t.fragmentShader;const c=lg(t),l=cg(t),h=hg(t),f=dg(t),d=ug(t),u=eg(t),g=tg(a),v=s.createProgram();let p,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vs).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vs).join(`
`),m.length>0&&(m+=`
`)):(p=[Tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vs).join(`
`),m=[Tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gi?"#define TONE_MAPPING":"",t.toneMapping!==gi?We.tonemapping_pars_fragment:"",t.toneMapping!==gi?Z0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,J0("linearToOutputTexel",t.outputColorSpace),Q0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vs).join(`
`)),o=Vr(o),o=Sc(o,t),o=Ec(o,t),r=Vr(r),r=Sc(r,t),r=Ec(r,t),o=wc(o),r=wc(r),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=y+p+o,x=y+m+r,A=_c(s,s.VERTEX_SHADER,b),S=_c(s,s.FRAGMENT_SHADER,x);s.attachShader(v,A),s.attachShader(v,S),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(E){if(n.debug.checkShaderErrors){const D=s.getProgramInfoLog(v).trim(),k=s.getShaderInfoLog(A).trim(),z=s.getShaderInfoLog(S).trim();let K=!0,U=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,A,S);else{const Z=Mc(s,A,"vertex"),j=Mc(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+D+`
`+Z+`
`+j)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(k===""||z==="")&&(U=!1);U&&(E.diagnostics={runnable:K,programLog:D,vertexShader:{log:k,prefix:p},fragmentShader:{log:z,prefix:m}})}s.deleteShader(A),s.deleteShader(S),R=new Wa(s,v),B=ng(s,v)}let R;this.getUniforms=function(){return R===void 0&&w(this),R};let B;this.getAttributes=function(){return B===void 0&&w(this),B};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(v,X0)),_},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Y0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=S,this}let pg=0;class mg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new gg(e),t.set(e,i)),i}}class gg{constructor(e){this.id=pg++,this.code=e,this.usedTimes=0}}function vg(n,e,t,i,s,a,o){const r=new ul,c=new mg,l=new Set,h=[],f=s.logarithmicDepthBuffer,d=s.reverseDepthBuffer,u=s.vertexTextures;let g=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function m(_,E,D,k,z){const K=k.fog,U=z.geometry,Z=_.isMeshStandardMaterial?k.environment:null,j=(_.isMeshStandardMaterial?t:e).get(_.envMap||Z),pe=j&&j.mapping===to?j.image.height:null,me=v[_.type];_.precision!==null&&(g=s.getMaxPrecision(_.precision),g!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",g,"instead."));const Te=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Ye=Te!==void 0?Te.length:0;let je=0;U.morphAttributes.position!==void 0&&(je=1),U.morphAttributes.normal!==void 0&&(je=2),U.morphAttributes.color!==void 0&&(je=3);let ee,ae,we,be;if(me){const sn=Fn[me];ee=sn.vertexShader,ae=sn.fragmentShader}else ee=_.vertexShader,ae=_.fragmentShader,c.update(_),we=c.getVertexShaderID(_),be=c.getFragmentShaderID(_);const X=n.getRenderTarget(),ne=z.isInstancedMesh===!0,ve=z.isBatchedMesh===!0,Ue=!!_.map,ke=!!_.matcap,I=!!j,yt=!!_.aoMap,$e=!!_.lightMap,Xe=!!_.bumpMap,Fe=!!_.normalMap,ct=!!_.displacementMap,Oe=!!_.emissiveMap,C=!!_.metalnessMap,M=!!_.roughnessMap,W=_.anisotropy>0,se=_.clearcoat>0,oe=_.dispersion>0,ie=_.iridescence>0,Ae=_.sheen>0,xe=_.transmission>0,Se=W&&!!_.anisotropyMap,Ze=se&&!!_.clearcoatMap,he=se&&!!_.clearcoatNormalMap,L=se&&!!_.clearcoatRoughnessMap,O=ie&&!!_.iridescenceMap,q=ie&&!!_.iridescenceThicknessMap,F=Ae&&!!_.sheenColorMap,te=Ae&&!!_.sheenRoughnessMap,le=!!_.specularMap,de=!!_.specularColorMap,P=!!_.specularIntensityMap,re=xe&&!!_.transmissionMap,V=xe&&!!_.thicknessMap,J=!!_.gradientMap,ce=!!_.alphaMap,ge=_.alphaTest>0,Ke=!!_.alphaHash,At=!!_.extensions;let nn=gi;_.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(nn=n.toneMapping);const tt={shaderID:me,shaderType:_.type,shaderName:_.name,vertexShader:ee,fragmentShader:ae,defines:_.defines,customVertexShaderID:we,customFragmentShaderID:be,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:g,batching:ve,batchingColor:ve&&z._colorsTexture!==null,instancing:ne,instancingColor:ne&&z.instanceColor!==null,instancingMorph:ne&&z.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:X===null?n.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:xi,alphaToCoverage:!!_.alphaToCoverage,map:Ue,matcap:ke,envMap:I,envMapMode:I&&j.mapping,envMapCubeUVHeight:pe,aoMap:yt,lightMap:$e,bumpMap:Xe,normalMap:Fe,displacementMap:u&&ct,emissiveMap:Oe,normalMapObjectSpace:Fe&&_.normalMapType===lu,normalMapTangentSpace:Fe&&_.normalMapType===Rh,metalnessMap:C,roughnessMap:M,anisotropy:W,anisotropyMap:Se,clearcoat:se,clearcoatMap:Ze,clearcoatNormalMap:he,clearcoatRoughnessMap:L,dispersion:oe,iridescence:ie,iridescenceMap:O,iridescenceThicknessMap:q,sheen:Ae,sheenColorMap:F,sheenRoughnessMap:te,specularMap:le,specularColorMap:de,specularIntensityMap:P,transmission:xe,transmissionMap:re,thicknessMap:V,gradientMap:J,opaque:_.transparent===!1&&_.blending===Bi&&_.alphaToCoverage===!1,alphaMap:ce,alphaTest:ge,alphaHash:Ke,combine:_.combine,mapUv:Ue&&p(_.map.channel),aoMapUv:yt&&p(_.aoMap.channel),lightMapUv:$e&&p(_.lightMap.channel),bumpMapUv:Xe&&p(_.bumpMap.channel),normalMapUv:Fe&&p(_.normalMap.channel),displacementMapUv:ct&&p(_.displacementMap.channel),emissiveMapUv:Oe&&p(_.emissiveMap.channel),metalnessMapUv:C&&p(_.metalnessMap.channel),roughnessMapUv:M&&p(_.roughnessMap.channel),anisotropyMapUv:Se&&p(_.anisotropyMap.channel),clearcoatMapUv:Ze&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:he&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:L&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:O&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:q&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:F&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:te&&p(_.sheenRoughnessMap.channel),specularMapUv:le&&p(_.specularMap.channel),specularColorMapUv:de&&p(_.specularColorMap.channel),specularIntensityMapUv:P&&p(_.specularIntensityMap.channel),transmissionMapUv:re&&p(_.transmissionMap.channel),thicknessMapUv:V&&p(_.thicknessMap.channel),alphaMapUv:ce&&p(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Fe||W),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!U.attributes.uv&&(Ue||ce),fog:!!K,useFog:_.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:d,skinning:z.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Ye,morphTextureStride:je,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:nn,decodeVideoTexture:Ue&&_.map.isVideoTexture===!0&&at.getTransfer(_.map.colorSpace)===vt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===gn,flipSided:_.side===cn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:At&&_.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(At&&_.extensions.multiDraw===!0||ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return tt.vertexUv1s=l.has(1),tt.vertexUv2s=l.has(2),tt.vertexUv3s=l.has(3),l.clear(),tt}function y(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const D in _.defines)E.push(D),E.push(_.defines[D]);return _.isRawShaderMaterial===!1&&(b(E,_),x(E,_),E.push(n.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function b(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function x(_,E){r.disableAll(),E.supportsVertexTextures&&r.enable(0),E.instancing&&r.enable(1),E.instancingColor&&r.enable(2),E.instancingMorph&&r.enable(3),E.matcap&&r.enable(4),E.envMap&&r.enable(5),E.normalMapObjectSpace&&r.enable(6),E.normalMapTangentSpace&&r.enable(7),E.clearcoat&&r.enable(8),E.iridescence&&r.enable(9),E.alphaTest&&r.enable(10),E.vertexColors&&r.enable(11),E.vertexAlphas&&r.enable(12),E.vertexUv1s&&r.enable(13),E.vertexUv2s&&r.enable(14),E.vertexUv3s&&r.enable(15),E.vertexTangents&&r.enable(16),E.anisotropy&&r.enable(17),E.alphaHash&&r.enable(18),E.batching&&r.enable(19),E.dispersion&&r.enable(20),E.batchingColor&&r.enable(21),_.push(r.mask),r.disableAll(),E.fog&&r.enable(0),E.useFog&&r.enable(1),E.flatShading&&r.enable(2),E.logarithmicDepthBuffer&&r.enable(3),E.reverseDepthBuffer&&r.enable(4),E.skinning&&r.enable(5),E.morphTargets&&r.enable(6),E.morphNormals&&r.enable(7),E.morphColors&&r.enable(8),E.premultipliedAlpha&&r.enable(9),E.shadowMapEnabled&&r.enable(10),E.doubleSided&&r.enable(11),E.flipSided&&r.enable(12),E.useDepthPacking&&r.enable(13),E.dithering&&r.enable(14),E.transmission&&r.enable(15),E.sheen&&r.enable(16),E.opaque&&r.enable(17),E.pointsUvs&&r.enable(18),E.decodeVideoTexture&&r.enable(19),E.alphaToCoverage&&r.enable(20),_.push(r.mask)}function A(_){const E=v[_.type];let D;if(E){const k=Fn[E];D=Qu.clone(k.uniforms)}else D=_.uniforms;return D}function S(_,E){let D;for(let k=0,z=h.length;k<z;k++){const K=h[k];if(K.cacheKey===E){D=K,++D.usedTimes;break}}return D===void 0&&(D=new fg(n,E,_,a),h.push(D)),D}function w(_){if(--_.usedTimes===0){const E=h.indexOf(_);h[E]=h[h.length-1],h.pop(),_.destroy()}}function R(_){c.remove(_)}function B(){c.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:A,acquireProgram:S,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:B}}function bg(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let r=n.get(o);return r===void 0&&(r={},n.set(o,r)),r}function i(o){n.delete(o)}function s(o,r,c){n.get(o)[r]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:a}}function yg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Ac(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Cc(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function o(f,d,u,g,v,p){let m=n[e];return m===void 0?(m={id:f.id,object:f,geometry:d,material:u,groupOrder:g,renderOrder:f.renderOrder,z:v,group:p},n[e]=m):(m.id=f.id,m.object=f,m.geometry=d,m.material=u,m.groupOrder=g,m.renderOrder=f.renderOrder,m.z=v,m.group=p),e++,m}function r(f,d,u,g,v,p){const m=o(f,d,u,g,v,p);u.transmission>0?i.push(m):u.transparent===!0?s.push(m):t.push(m)}function c(f,d,u,g,v,p){const m=o(f,d,u,g,v,p);u.transmission>0?i.unshift(m):u.transparent===!0?s.unshift(m):t.unshift(m)}function l(f,d){t.length>1&&t.sort(f||yg),i.length>1&&i.sort(d||Ac),s.length>1&&s.sort(d||Ac)}function h(){for(let f=e,d=n.length;f<d;f++){const u=n[f];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:r,unshift:c,finish:h,sort:l}}function xg(){let n=new WeakMap;function e(i,s){const a=n.get(i);let o;return a===void 0?(o=new Cc,n.set(i,[o])):s>=a.length?(o=new Cc,a.push(o)):o=a[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function _g(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new He};break;case"SpotLight":t={position:new N,direction:new N,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function Mg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Sg=0;function Eg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function wg(n){const e=new _g,t=Mg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new N);const s=new N,a=new ut,o=new ut;function r(l){let h=0,f=0,d=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let u=0,g=0,v=0,p=0,m=0,y=0,b=0,x=0,A=0,S=0,w=0;l.sort(Eg);for(let B=0,_=l.length;B<_;B++){const E=l[B],D=E.color,k=E.intensity,z=E.distance,K=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)h+=D.r*k,f+=D.g*k,d+=D.b*k;else if(E.isLightProbe){for(let U=0;U<9;U++)i.probe[U].addScaledVector(E.sh.coefficients[U],k);w++}else if(E.isDirectionalLight){const U=e.get(E);if(U.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const Z=E.shadow,j=t.get(E);j.shadowIntensity=Z.intensity,j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,i.directionalShadow[u]=j,i.directionalShadowMap[u]=K,i.directionalShadowMatrix[u]=E.shadow.matrix,y++}i.directional[u]=U,u++}else if(E.isSpotLight){const U=e.get(E);U.position.setFromMatrixPosition(E.matrixWorld),U.color.copy(D).multiplyScalar(k),U.distance=z,U.coneCos=Math.cos(E.angle),U.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),U.decay=E.decay,i.spot[v]=U;const Z=E.shadow;if(E.map&&(i.spotLightMap[A]=E.map,A++,Z.updateMatrices(E),E.castShadow&&S++),i.spotLightMatrix[v]=Z.matrix,E.castShadow){const j=t.get(E);j.shadowIntensity=Z.intensity,j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,i.spotShadow[v]=j,i.spotShadowMap[v]=K,x++}v++}else if(E.isRectAreaLight){const U=e.get(E);U.color.copy(D).multiplyScalar(k),U.halfWidth.set(E.width*.5,0,0),U.halfHeight.set(0,E.height*.5,0),i.rectArea[p]=U,p++}else if(E.isPointLight){const U=e.get(E);if(U.color.copy(E.color).multiplyScalar(E.intensity),U.distance=E.distance,U.decay=E.decay,E.castShadow){const Z=E.shadow,j=t.get(E);j.shadowIntensity=Z.intensity,j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,j.shadowCameraNear=Z.camera.near,j.shadowCameraFar=Z.camera.far,i.pointShadow[g]=j,i.pointShadowMap[g]=K,i.pointShadowMatrix[g]=E.shadow.matrix,b++}i.point[g]=U,g++}else if(E.isHemisphereLight){const U=e.get(E);U.skyColor.copy(E.color).multiplyScalar(k),U.groundColor.copy(E.groundColor).multiplyScalar(k),i.hemi[m]=U,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=d;const R=i.hash;(R.directionalLength!==u||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==p||R.hemiLength!==m||R.numDirectionalShadows!==y||R.numPointShadows!==b||R.numSpotShadows!==x||R.numSpotMaps!==A||R.numLightProbes!==w)&&(i.directional.length=u,i.spot.length=v,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=x+A-S,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=w,R.directionalLength=u,R.pointLength=g,R.spotLength=v,R.rectAreaLength=p,R.hemiLength=m,R.numDirectionalShadows=y,R.numPointShadows=b,R.numSpotShadows=x,R.numSpotMaps=A,R.numLightProbes=w,i.version=Sg++)}function c(l,h){let f=0,d=0,u=0,g=0,v=0;const p=h.matrixWorldInverse;for(let m=0,y=l.length;m<y;m++){const b=l[m];if(b.isDirectionalLight){const x=i.directional[f];x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),f++}else if(b.isSpotLight){const x=i.spot[u];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),u++}else if(b.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(p),o.identity(),a.copy(b.matrixWorld),a.premultiply(p),o.extractRotation(a),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const x=i.point[d];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(p),d++}else if(b.isHemisphereLight){const x=i.hemi[v];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(p),v++}}}return{setup:r,setupView:c,state:i}}function Rc(n){const e=new wg(n),t=[],i=[];function s(h){l.camera=h,t.length=0,i.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function r(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:r,setupLightsView:c,pushLight:a,pushShadow:o}}function Tg(n){let e=new WeakMap;function t(s,a=0){const o=e.get(s);let r;return o===void 0?(r=new Rc(n),e.set(s,[r])):a>=o.length?(r=new Rc(n),o.push(r)):r=o[a],r}function i(){e=new WeakMap}return{get:t,dispose:i}}class Ag extends Wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ou,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Cg extends Wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Rg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Pg=`uniform sampler2D shadow_pass;
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
}`;function Lg(n,e,t){let i=new fl;const s=new Me,a=new Me,o=new Mt,r=new Ag({depthPacking:ru}),c=new Cg,l={},h=t.maxTextureSize,f={[bi]:cn,[cn]:bi,[gn]:gn},d=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Me},radius:{value:4}},vertexShader:Rg,fragmentShader:Pg}),u=d.clone();u.defines.HORIZONTAL_PASS=1;const g=new $t;g.setAttribute("position",new vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Q(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ph;let m=this.type;this.render=function(S,w,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;const B=n.getRenderTarget(),_=n.getActiveCubeFace(),E=n.getActiveMipmapLevel(),D=n.state;D.setBlending(mi),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const k=m!==Yn&&this.type===Yn,z=m===Yn&&this.type!==Yn;for(let K=0,U=S.length;K<U;K++){const Z=S[K],j=Z.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);const pe=j.getFrameExtents();if(s.multiply(pe),a.copy(j.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/pe.x),s.x=a.x*pe.x,j.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/pe.y),s.y=a.y*pe.y,j.mapSize.y=a.y)),j.map===null||k===!0||z===!0){const Te=this.type!==Yn?{minFilter:wn,magFilter:wn}:{};j.map!==null&&j.map.dispose(),j.map=new Hi(s.x,s.y,Te),j.map.texture.name=Z.name+".shadowMap",j.camera.updateProjectionMatrix()}n.setRenderTarget(j.map),n.clear();const me=j.getViewportCount();for(let Te=0;Te<me;Te++){const Ye=j.getViewport(Te);o.set(a.x*Ye.x,a.y*Ye.y,a.x*Ye.z,a.y*Ye.w),D.viewport(o),j.updateMatrices(Z,Te),i=j.getFrustum(),x(w,R,j.camera,Z,this.type)}j.isPointLightShadow!==!0&&this.type===Yn&&y(j,R),j.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(B,_,E)};function y(S,w){const R=e.update(v);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,u.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Hi(s.x,s.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(w,null,R,d,v,null),u.uniforms.shadow_pass.value=S.mapPass.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(w,null,R,u,v,null)}function b(S,w,R,B){let _=null;const E=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(E!==void 0)_=E;else if(_=R.isPointLight===!0?c:r,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const D=_.uuid,k=w.uuid;let z=l[D];z===void 0&&(z={},l[D]=z);let K=z[k];K===void 0&&(K=_.clone(),z[k]=K,w.addEventListener("dispose",A)),_=K}if(_.visible=w.visible,_.wireframe=w.wireframe,B===Yn?_.side=w.shadowSide!==null?w.shadowSide:w.side:_.side=w.shadowSide!==null?w.shadowSide:f[w.side],_.alphaMap=w.alphaMap,_.alphaTest=w.alphaTest,_.map=w.map,_.clipShadows=w.clipShadows,_.clippingPlanes=w.clippingPlanes,_.clipIntersection=w.clipIntersection,_.displacementMap=w.displacementMap,_.displacementScale=w.displacementScale,_.displacementBias=w.displacementBias,_.wireframeLinewidth=w.wireframeLinewidth,_.linewidth=w.linewidth,R.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const D=n.properties.get(_);D.light=R}return _}function x(S,w,R,B,_){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&_===Yn)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);const k=e.update(S),z=S.material;if(Array.isArray(z)){const K=k.groups;for(let U=0,Z=K.length;U<Z;U++){const j=K[U],pe=z[j.materialIndex];if(pe&&pe.visible){const me=b(S,pe,B,_);S.onBeforeShadow(n,S,w,R,k,me,j),n.renderBufferDirect(R,null,k,me,S,j),S.onAfterShadow(n,S,w,R,k,me,j)}}}else if(z.visible){const K=b(S,z,B,_);S.onBeforeShadow(n,S,w,R,k,K,null),n.renderBufferDirect(R,null,k,K,S,null),S.onAfterShadow(n,S,w,R,k,K,null)}}const D=S.children;for(let k=0,z=D.length;k<z;k++)x(D[k],w,R,B,_)}function A(S){S.target.removeEventListener("dispose",A);for(const R in l){const B=l[R],_=S.target.uuid;_ in B&&(B[_].dispose(),delete B[_])}}}const Dg={[or]:rr,[lr]:dr,[cr]:ur,[vs]:hr,[rr]:or,[dr]:lr,[ur]:cr,[hr]:vs};function Ig(n){function e(){let P=!1;const re=new Mt;let V=null;const J=new Mt(0,0,0,0);return{setMask:function(ce){V!==ce&&!P&&(n.colorMask(ce,ce,ce,ce),V=ce)},setLocked:function(ce){P=ce},setClear:function(ce,ge,Ke,At,nn){nn===!0&&(ce*=At,ge*=At,Ke*=At),re.set(ce,ge,Ke,At),J.equals(re)===!1&&(n.clearColor(ce,ge,Ke,At),J.copy(re))},reset:function(){P=!1,V=null,J.set(-1,0,0,0)}}}function t(){let P=!1,re=!1,V=null,J=null,ce=null;return{setReversed:function(ge){re=ge},setTest:function(ge){ge?we(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(ge){V!==ge&&!P&&(n.depthMask(ge),V=ge)},setFunc:function(ge){if(re&&(ge=Dg[ge]),J!==ge){switch(ge){case or:n.depthFunc(n.NEVER);break;case rr:n.depthFunc(n.ALWAYS);break;case lr:n.depthFunc(n.LESS);break;case vs:n.depthFunc(n.LEQUAL);break;case cr:n.depthFunc(n.EQUAL);break;case hr:n.depthFunc(n.GEQUAL);break;case dr:n.depthFunc(n.GREATER);break;case ur:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}J=ge}},setLocked:function(ge){P=ge},setClear:function(ge){ce!==ge&&(n.clearDepth(ge),ce=ge)},reset:function(){P=!1,V=null,J=null,ce=null}}}function i(){let P=!1,re=null,V=null,J=null,ce=null,ge=null,Ke=null,At=null,nn=null;return{setTest:function(tt){P||(tt?we(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(tt){re!==tt&&!P&&(n.stencilMask(tt),re=tt)},setFunc:function(tt,sn,Gn){(V!==tt||J!==sn||ce!==Gn)&&(n.stencilFunc(tt,sn,Gn),V=tt,J=sn,ce=Gn)},setOp:function(tt,sn,Gn){(ge!==tt||Ke!==sn||At!==Gn)&&(n.stencilOp(tt,sn,Gn),ge=tt,Ke=sn,At=Gn)},setLocked:function(tt){P=tt},setClear:function(tt){nn!==tt&&(n.clearStencil(tt),nn=tt)},reset:function(){P=!1,re=null,V=null,J=null,ce=null,ge=null,Ke=null,At=null,nn=null}}}const s=new e,a=new t,o=new i,r=new WeakMap,c=new WeakMap;let l={},h={},f=new WeakMap,d=[],u=null,g=!1,v=null,p=null,m=null,y=null,b=null,x=null,A=null,S=new He(0,0,0),w=0,R=!1,B=null,_=null,E=null,D=null,k=null;const z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,U=0;const Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(Z)[1]),K=U>=1):Z.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),K=U>=2);let j=null,pe={};const me=n.getParameter(n.SCISSOR_BOX),Te=n.getParameter(n.VIEWPORT),Ye=new Mt().fromArray(me),je=new Mt().fromArray(Te);function ee(P,re,V,J){const ce=new Uint8Array(4),ge=n.createTexture();n.bindTexture(P,ge),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ke=0;Ke<V;Ke++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(re,0,n.RGBA,1,1,J,0,n.RGBA,n.UNSIGNED_BYTE,ce):n.texImage2D(re+Ke,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ce);return ge}const ae={};ae[n.TEXTURE_2D]=ee(n.TEXTURE_2D,n.TEXTURE_2D,1),ae[n.TEXTURE_CUBE_MAP]=ee(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[n.TEXTURE_2D_ARRAY]=ee(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ae[n.TEXTURE_3D]=ee(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),we(n.DEPTH_TEST),a.setFunc(vs),$e(!1),Xe(Fl),we(n.CULL_FACE),I(mi);function we(P){l[P]!==!0&&(n.enable(P),l[P]=!0)}function be(P){l[P]!==!1&&(n.disable(P),l[P]=!1)}function X(P,re){return h[P]!==re?(n.bindFramebuffer(P,re),h[P]=re,P===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=re),P===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=re),!0):!1}function ne(P,re){let V=d,J=!1;if(P){V=f.get(re),V===void 0&&(V=[],f.set(re,V));const ce=P.textures;if(V.length!==ce.length||V[0]!==n.COLOR_ATTACHMENT0){for(let ge=0,Ke=ce.length;ge<Ke;ge++)V[ge]=n.COLOR_ATTACHMENT0+ge;V.length=ce.length,J=!0}}else V[0]!==n.BACK&&(V[0]=n.BACK,J=!0);J&&n.drawBuffers(V)}function ve(P){return u!==P?(n.useProgram(P),u=P,!0):!1}const Ue={[Ii]:n.FUNC_ADD,[kd]:n.FUNC_SUBTRACT,[Nd]:n.FUNC_REVERSE_SUBTRACT};Ue[Ud]=n.MIN,Ue[Fd]=n.MAX;const ke={[Od]:n.ZERO,[Bd]:n.ONE,[zd]:n.SRC_COLOR,[sr]:n.SRC_ALPHA,[$d]:n.SRC_ALPHA_SATURATE,[Wd]:n.DST_COLOR,[Hd]:n.DST_ALPHA,[Gd]:n.ONE_MINUS_SRC_COLOR,[ar]:n.ONE_MINUS_SRC_ALPHA,[qd]:n.ONE_MINUS_DST_COLOR,[Vd]:n.ONE_MINUS_DST_ALPHA,[Xd]:n.CONSTANT_COLOR,[Yd]:n.ONE_MINUS_CONSTANT_COLOR,[jd]:n.CONSTANT_ALPHA,[Kd]:n.ONE_MINUS_CONSTANT_ALPHA};function I(P,re,V,J,ce,ge,Ke,At,nn,tt){if(P===mi){g===!0&&(be(n.BLEND),g=!1);return}if(g===!1&&(we(n.BLEND),g=!0),P!==Id){if(P!==v||tt!==R){if((p!==Ii||b!==Ii)&&(n.blendEquation(n.FUNC_ADD),p=Ii,b=Ii),tt)switch(P){case Bi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ui:n.blendFunc(n.ONE,n.ONE);break;case Ol:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Bi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ui:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ol:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}m=null,y=null,x=null,A=null,S.set(0,0,0),w=0,v=P,R=tt}return}ce=ce||re,ge=ge||V,Ke=Ke||J,(re!==p||ce!==b)&&(n.blendEquationSeparate(Ue[re],Ue[ce]),p=re,b=ce),(V!==m||J!==y||ge!==x||Ke!==A)&&(n.blendFuncSeparate(ke[V],ke[J],ke[ge],ke[Ke]),m=V,y=J,x=ge,A=Ke),(At.equals(S)===!1||nn!==w)&&(n.blendColor(At.r,At.g,At.b,nn),S.copy(At),w=nn),v=P,R=!1}function yt(P,re){P.side===gn?be(n.CULL_FACE):we(n.CULL_FACE);let V=P.side===cn;re&&(V=!V),$e(V),P.blending===Bi&&P.transparent===!1?I(mi):I(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);const J=P.stencilWrite;o.setTest(J),J&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),ct(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?we(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function $e(P){B!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),B=P)}function Xe(P){P!==Ld?(we(n.CULL_FACE),P!==_&&(P===Fl?n.cullFace(n.BACK):P===Dd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),_=P}function Fe(P){P!==E&&(K&&n.lineWidth(P),E=P)}function ct(P,re,V){P?(we(n.POLYGON_OFFSET_FILL),(D!==re||k!==V)&&(n.polygonOffset(re,V),D=re,k=V)):be(n.POLYGON_OFFSET_FILL)}function Oe(P){P?we(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function C(P){P===void 0&&(P=n.TEXTURE0+z-1),j!==P&&(n.activeTexture(P),j=P)}function M(P,re,V){V===void 0&&(j===null?V=n.TEXTURE0+z-1:V=j);let J=pe[V];J===void 0&&(J={type:void 0,texture:void 0},pe[V]=J),(J.type!==P||J.texture!==re)&&(j!==V&&(n.activeTexture(V),j=V),n.bindTexture(P,re||ae[P]),J.type=P,J.texture=re)}function W(){const P=pe[j];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function se(){try{n.compressedTexImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function oe(){try{n.compressedTexImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ie(){try{n.texSubImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ae(){try{n.texSubImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function xe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Se(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ze(){try{n.texStorage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function he(){try{n.texStorage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function L(){try{n.texImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function O(){try{n.texImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function q(P){Ye.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),Ye.copy(P))}function F(P){je.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),je.copy(P))}function te(P,re){let V=c.get(re);V===void 0&&(V=new WeakMap,c.set(re,V));let J=V.get(P);J===void 0&&(J=n.getUniformBlockIndex(re,P.name),V.set(P,J))}function le(P,re){const J=c.get(re).get(P);r.get(re)!==J&&(n.uniformBlockBinding(re,J,P.__bindingPointIndex),r.set(re,J))}function de(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},j=null,pe={},h={},f=new WeakMap,d=[],u=null,g=!1,v=null,p=null,m=null,y=null,b=null,x=null,A=null,S=new He(0,0,0),w=0,R=!1,B=null,_=null,E=null,D=null,k=null,Ye.set(0,0,n.canvas.width,n.canvas.height),je.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:we,disable:be,bindFramebuffer:X,drawBuffers:ne,useProgram:ve,setBlending:I,setMaterial:yt,setFlipSided:$e,setCullFace:Xe,setLineWidth:Fe,setPolygonOffset:ct,setScissorTest:Oe,activeTexture:C,bindTexture:M,unbindTexture:W,compressedTexImage2D:se,compressedTexImage3D:oe,texImage2D:L,texImage3D:O,updateUBOMapping:te,uniformBlockBinding:le,texStorage2D:Ze,texStorage3D:he,texSubImage2D:ie,texSubImage3D:Ae,compressedTexSubImage2D:xe,compressedTexSubImage3D:Se,scissor:q,viewport:F,reset:de}}function Pc(n,e,t,i){const s=kg(i);switch(t){case Mh:return n*e;case Eh:return n*e;case wh:return n*e*2;case Th:return n*e/s.components*s.byteLength;case rl:return n*e/s.components*s.byteLength;case Ah:return n*e*2/s.components*s.byteLength;case ll:return n*e*2/s.components*s.byteLength;case Sh:return n*e*3/s.components*s.byteLength;case kn:return n*e*4/s.components*s.byteLength;case cl:return n*e*4/s.components*s.byteLength;case Oa:case Ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case za:case Ga:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case br:case xr:return Math.max(n,16)*Math.max(e,8)/4;case vr:case yr:return Math.max(n,8)*Math.max(e,8)/2;case _r:case Mr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Sr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Er:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wr:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Tr:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ar:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Cr:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Rr:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Pr:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Lr:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Dr:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ir:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case kr:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Nr:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ur:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Fr:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ha:case Or:case Br:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ch:case zr:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Gr:case Hr:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function kg(n){switch(n){case Qn:case yh:return{byteLength:1,components:1};case Js:case xh:case ta:return{byteLength:2,components:1};case al:case ol:return{byteLength:2,components:4};case Gi:case sl:case Kn:return{byteLength:4,components:1};case _h:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Ng(n,e,t,i,s,a,o){const r=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Me,h=new WeakMap;let f;const d=new WeakMap;let u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,M){return u?new OffscreenCanvas(C,M):Za("canvas")}function v(C,M,W){let se=1;const oe=Oe(C);if((oe.width>W||oe.height>W)&&(se=W/Math.max(oe.width,oe.height)),se<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ie=Math.floor(se*oe.width),Ae=Math.floor(se*oe.height);f===void 0&&(f=g(ie,Ae));const xe=M?g(ie,Ae):f;return xe.width=ie,xe.height=Ae,xe.getContext("2d").drawImage(C,0,0,ie,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+ie+"x"+Ae+")."),xe}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),C;return C}function p(C){return C.generateMipmaps&&C.minFilter!==wn&&C.minFilter!==Dn}function m(C){n.generateMipmap(C)}function y(C,M,W,se,oe=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ie=M;if(M===n.RED&&(W===n.FLOAT&&(ie=n.R32F),W===n.HALF_FLOAT&&(ie=n.R16F),W===n.UNSIGNED_BYTE&&(ie=n.R8)),M===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.R8UI),W===n.UNSIGNED_SHORT&&(ie=n.R16UI),W===n.UNSIGNED_INT&&(ie=n.R32UI),W===n.BYTE&&(ie=n.R8I),W===n.SHORT&&(ie=n.R16I),W===n.INT&&(ie=n.R32I)),M===n.RG&&(W===n.FLOAT&&(ie=n.RG32F),W===n.HALF_FLOAT&&(ie=n.RG16F),W===n.UNSIGNED_BYTE&&(ie=n.RG8)),M===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.RG8UI),W===n.UNSIGNED_SHORT&&(ie=n.RG16UI),W===n.UNSIGNED_INT&&(ie=n.RG32UI),W===n.BYTE&&(ie=n.RG8I),W===n.SHORT&&(ie=n.RG16I),W===n.INT&&(ie=n.RG32I)),M===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.RGB8UI),W===n.UNSIGNED_SHORT&&(ie=n.RGB16UI),W===n.UNSIGNED_INT&&(ie=n.RGB32UI),W===n.BYTE&&(ie=n.RGB8I),W===n.SHORT&&(ie=n.RGB16I),W===n.INT&&(ie=n.RGB32I)),M===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(ie=n.RGBA16UI),W===n.UNSIGNED_INT&&(ie=n.RGBA32UI),W===n.BYTE&&(ie=n.RGBA8I),W===n.SHORT&&(ie=n.RGBA16I),W===n.INT&&(ie=n.RGBA32I)),M===n.RGB&&W===n.UNSIGNED_INT_5_9_9_9_REV&&(ie=n.RGB9_E5),M===n.RGBA){const Ae=oe?Ya:at.getTransfer(se);W===n.FLOAT&&(ie=n.RGBA32F),W===n.HALF_FLOAT&&(ie=n.RGBA16F),W===n.UNSIGNED_BYTE&&(ie=Ae===vt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(ie=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(ie=n.RGB5_A1)}return(ie===n.R16F||ie===n.R32F||ie===n.RG16F||ie===n.RG32F||ie===n.RGBA16F||ie===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function b(C,M){let W;return C?M===null||M===Gi||M===xs?W=n.DEPTH24_STENCIL8:M===Kn?W=n.DEPTH32F_STENCIL8:M===Js&&(W=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Gi||M===xs?W=n.DEPTH_COMPONENT24:M===Kn?W=n.DEPTH_COMPONENT32F:M===Js&&(W=n.DEPTH_COMPONENT16),W}function x(C,M){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==wn&&C.minFilter!==Dn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function A(C){const M=C.target;M.removeEventListener("dispose",A),w(M),M.isVideoTexture&&h.delete(M)}function S(C){const M=C.target;M.removeEventListener("dispose",S),B(M)}function w(C){const M=i.get(C);if(M.__webglInit===void 0)return;const W=C.source,se=d.get(W);if(se){const oe=se[M.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&R(C),Object.keys(se).length===0&&d.delete(W)}i.remove(C)}function R(C){const M=i.get(C);n.deleteTexture(M.__webglTexture);const W=C.source,se=d.get(W);delete se[M.__cacheKey],o.memory.textures--}function B(C){const M=i.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(M.__webglFramebuffer[se]))for(let oe=0;oe<M.__webglFramebuffer[se].length;oe++)n.deleteFramebuffer(M.__webglFramebuffer[se][oe]);else n.deleteFramebuffer(M.__webglFramebuffer[se]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[se])}else{if(Array.isArray(M.__webglFramebuffer))for(let se=0;se<M.__webglFramebuffer.length;se++)n.deleteFramebuffer(M.__webglFramebuffer[se]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let se=0;se<M.__webglColorRenderbuffer.length;se++)M.__webglColorRenderbuffer[se]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[se]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const W=C.textures;for(let se=0,oe=W.length;se<oe;se++){const ie=i.get(W[se]);ie.__webglTexture&&(n.deleteTexture(ie.__webglTexture),o.memory.textures--),i.remove(W[se])}i.remove(C)}let _=0;function E(){_=0}function D(){const C=_;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),_+=1,C}function k(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function z(C,M){const W=i.get(C);if(C.isVideoTexture&&Fe(C),C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){const se=C.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{je(W,C,M);return}}t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+M)}function K(C,M){const W=i.get(C);if(C.version>0&&W.__version!==C.version){je(W,C,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+M)}function U(C,M){const W=i.get(C);if(C.version>0&&W.__version!==C.version){je(W,C,M);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+M)}function Z(C,M){const W=i.get(C);if(C.version>0&&W.__version!==C.version){ee(W,C,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+M)}const j={[mr]:n.REPEAT,[Ui]:n.CLAMP_TO_EDGE,[gr]:n.MIRRORED_REPEAT},pe={[wn]:n.NEAREST,[au]:n.NEAREST_MIPMAP_NEAREST,[ra]:n.NEAREST_MIPMAP_LINEAR,[Dn]:n.LINEAR,[po]:n.LINEAR_MIPMAP_NEAREST,[Fi]:n.LINEAR_MIPMAP_LINEAR},me={[cu]:n.NEVER,[mu]:n.ALWAYS,[hu]:n.LESS,[Ph]:n.LEQUAL,[du]:n.EQUAL,[pu]:n.GEQUAL,[uu]:n.GREATER,[fu]:n.NOTEQUAL};function Te(C,M){if(M.type===Kn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Dn||M.magFilter===po||M.magFilter===ra||M.magFilter===Fi||M.minFilter===Dn||M.minFilter===po||M.minFilter===ra||M.minFilter===Fi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,j[M.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,j[M.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,j[M.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,pe[M.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,pe[M.minFilter]),M.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,me[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===wn||M.minFilter!==ra&&M.minFilter!==Fi||M.type===Kn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Ye(C,M){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",A));const se=M.source;let oe=d.get(se);oe===void 0&&(oe={},d.set(se,oe));const ie=k(M);if(ie!==C.__cacheKey){oe[ie]===void 0&&(oe[ie]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,W=!0),oe[ie].usedTimes++;const Ae=oe[C.__cacheKey];Ae!==void 0&&(oe[C.__cacheKey].usedTimes--,Ae.usedTimes===0&&R(M)),C.__cacheKey=ie,C.__webglTexture=oe[ie].texture}return W}function je(C,M,W){let se=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(se=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(se=n.TEXTURE_3D);const oe=Ye(C,M),ie=M.source;t.bindTexture(se,C.__webglTexture,n.TEXTURE0+W);const Ae=i.get(ie);if(ie.version!==Ae.__version||oe===!0){t.activeTexture(n.TEXTURE0+W);const xe=at.getPrimaries(at.workingColorSpace),Se=M.colorSpace===fi?null:at.getPrimaries(M.colorSpace),Ze=M.colorSpace===fi||xe===Se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let he=v(M.image,!1,s.maxTextureSize);he=ct(M,he);const L=a.convert(M.format,M.colorSpace),O=a.convert(M.type);let q=y(M.internalFormat,L,O,M.colorSpace,M.isVideoTexture);Te(se,M);let F;const te=M.mipmaps,le=M.isVideoTexture!==!0,de=Ae.__version===void 0||oe===!0,P=ie.dataReady,re=x(M,he);if(M.isDepthTexture)q=b(M.format===_s,M.type),de&&(le?t.texStorage2D(n.TEXTURE_2D,1,q,he.width,he.height):t.texImage2D(n.TEXTURE_2D,0,q,he.width,he.height,0,L,O,null));else if(M.isDataTexture)if(te.length>0){le&&de&&t.texStorage2D(n.TEXTURE_2D,re,q,te[0].width,te[0].height);for(let V=0,J=te.length;V<J;V++)F=te[V],le?P&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,F.width,F.height,L,O,F.data):t.texImage2D(n.TEXTURE_2D,V,q,F.width,F.height,0,L,O,F.data);M.generateMipmaps=!1}else le?(de&&t.texStorage2D(n.TEXTURE_2D,re,q,he.width,he.height),P&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,he.width,he.height,L,O,he.data)):t.texImage2D(n.TEXTURE_2D,0,q,he.width,he.height,0,L,O,he.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){le&&de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,q,te[0].width,te[0].height,he.depth);for(let V=0,J=te.length;V<J;V++)if(F=te[V],M.format!==kn)if(L!==null)if(le){if(P)if(M.layerUpdates.size>0){const ce=Pc(F.width,F.height,M.format,M.type);for(const ge of M.layerUpdates){const Ke=F.data.subarray(ge*ce/F.data.BYTES_PER_ELEMENT,(ge+1)*ce/F.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,ge,F.width,F.height,1,L,Ke,0,0)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,0,F.width,F.height,he.depth,L,F.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,V,q,F.width,F.height,he.depth,0,F.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else le?P&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,0,F.width,F.height,he.depth,L,O,F.data):t.texImage3D(n.TEXTURE_2D_ARRAY,V,q,F.width,F.height,he.depth,0,L,O,F.data)}else{le&&de&&t.texStorage2D(n.TEXTURE_2D,re,q,te[0].width,te[0].height);for(let V=0,J=te.length;V<J;V++)F=te[V],M.format!==kn?L!==null?le?P&&t.compressedTexSubImage2D(n.TEXTURE_2D,V,0,0,F.width,F.height,L,F.data):t.compressedTexImage2D(n.TEXTURE_2D,V,q,F.width,F.height,0,F.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?P&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,F.width,F.height,L,O,F.data):t.texImage2D(n.TEXTURE_2D,V,q,F.width,F.height,0,L,O,F.data)}else if(M.isDataArrayTexture)if(le){if(de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,q,he.width,he.height,he.depth),P)if(M.layerUpdates.size>0){const V=Pc(he.width,he.height,M.format,M.type);for(const J of M.layerUpdates){const ce=he.data.subarray(J*V/he.data.BYTES_PER_ELEMENT,(J+1)*V/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,he.width,he.height,1,L,O,ce)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,L,O,he.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,q,he.width,he.height,he.depth,0,L,O,he.data);else if(M.isData3DTexture)le?(de&&t.texStorage3D(n.TEXTURE_3D,re,q,he.width,he.height,he.depth),P&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,L,O,he.data)):t.texImage3D(n.TEXTURE_3D,0,q,he.width,he.height,he.depth,0,L,O,he.data);else if(M.isFramebufferTexture){if(de)if(le)t.texStorage2D(n.TEXTURE_2D,re,q,he.width,he.height);else{let V=he.width,J=he.height;for(let ce=0;ce<re;ce++)t.texImage2D(n.TEXTURE_2D,ce,q,V,J,0,L,O,null),V>>=1,J>>=1}}else if(te.length>0){if(le&&de){const V=Oe(te[0]);t.texStorage2D(n.TEXTURE_2D,re,q,V.width,V.height)}for(let V=0,J=te.length;V<J;V++)F=te[V],le?P&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,L,O,F):t.texImage2D(n.TEXTURE_2D,V,q,L,O,F);M.generateMipmaps=!1}else if(le){if(de){const V=Oe(he);t.texStorage2D(n.TEXTURE_2D,re,q,V.width,V.height)}P&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,L,O,he)}else t.texImage2D(n.TEXTURE_2D,0,q,L,O,he);p(M)&&m(se),Ae.__version=ie.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ee(C,M,W){if(M.image.length!==6)return;const se=Ye(C,M),oe=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+W);const ie=i.get(oe);if(oe.version!==ie.__version||se===!0){t.activeTexture(n.TEXTURE0+W);const Ae=at.getPrimaries(at.workingColorSpace),xe=M.colorSpace===fi?null:at.getPrimaries(M.colorSpace),Se=M.colorSpace===fi||Ae===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const Ze=M.isCompressedTexture||M.image[0].isCompressedTexture,he=M.image[0]&&M.image[0].isDataTexture,L=[];for(let J=0;J<6;J++)!Ze&&!he?L[J]=v(M.image[J],!0,s.maxCubemapSize):L[J]=he?M.image[J].image:M.image[J],L[J]=ct(M,L[J]);const O=L[0],q=a.convert(M.format,M.colorSpace),F=a.convert(M.type),te=y(M.internalFormat,q,F,M.colorSpace),le=M.isVideoTexture!==!0,de=ie.__version===void 0||se===!0,P=oe.dataReady;let re=x(M,O);Te(n.TEXTURE_CUBE_MAP,M);let V;if(Ze){le&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,re,te,O.width,O.height);for(let J=0;J<6;J++){V=L[J].mipmaps;for(let ce=0;ce<V.length;ce++){const ge=V[ce];M.format!==kn?q!==null?le?P&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce,0,0,ge.width,ge.height,q,ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce,te,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):le?P&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce,0,0,ge.width,ge.height,q,F,ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce,te,ge.width,ge.height,0,q,F,ge.data)}}}else{if(V=M.mipmaps,le&&de){V.length>0&&re++;const J=Oe(L[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,re,te,J.width,J.height)}for(let J=0;J<6;J++)if(he){le?P&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,L[J].width,L[J].height,q,F,L[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,te,L[J].width,L[J].height,0,q,F,L[J].data);for(let ce=0;ce<V.length;ce++){const Ke=V[ce].image[J].image;le?P&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce+1,0,0,Ke.width,Ke.height,q,F,Ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce+1,te,Ke.width,Ke.height,0,q,F,Ke.data)}}else{le?P&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,q,F,L[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,te,q,F,L[J]);for(let ce=0;ce<V.length;ce++){const ge=V[ce];le?P&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce+1,0,0,q,F,ge.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce+1,te,q,F,ge.image[J])}}}p(M)&&m(n.TEXTURE_CUBE_MAP),ie.__version=oe.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ae(C,M,W,se,oe,ie){const Ae=a.convert(W.format,W.colorSpace),xe=a.convert(W.type),Se=y(W.internalFormat,Ae,xe,W.colorSpace);if(!i.get(M).__hasExternalTextures){const he=Math.max(1,M.width>>ie),L=Math.max(1,M.height>>ie);oe===n.TEXTURE_3D||oe===n.TEXTURE_2D_ARRAY?t.texImage3D(oe,ie,Se,he,L,M.depth,0,Ae,xe,null):t.texImage2D(oe,ie,Se,he,L,0,Ae,xe,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),Xe(M)?r.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,oe,i.get(W).__webglTexture,0,$e(M)):(oe===n.TEXTURE_2D||oe>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,se,oe,i.get(W).__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function we(C,M,W){if(n.bindRenderbuffer(n.RENDERBUFFER,C),M.depthBuffer){const se=M.depthTexture,oe=se&&se.isDepthTexture?se.type:null,ie=b(M.stencilBuffer,oe),Ae=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=$e(M);Xe(M)?r.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xe,ie,M.width,M.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,xe,ie,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,ie,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ae,n.RENDERBUFFER,C)}else{const se=M.textures;for(let oe=0;oe<se.length;oe++){const ie=se[oe],Ae=a.convert(ie.format,ie.colorSpace),xe=a.convert(ie.type),Se=y(ie.internalFormat,Ae,xe,ie.colorSpace),Ze=$e(M);W&&Xe(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ze,Se,M.width,M.height):Xe(M)?r.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ze,Se,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,Se,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function be(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),z(M.depthTexture,0);const se=i.get(M.depthTexture).__webglTexture,oe=$e(M);if(M.depthTexture.format===fs)Xe(M)?r.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0);else if(M.depthTexture.format===_s)Xe(M)?r.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function X(C){const M=i.get(C),W=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const se=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),se){const oe=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,se.removeEventListener("dispose",oe)};se.addEventListener("dispose",oe),M.__depthDisposeCallback=oe}M.__boundDepthTexture=se}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");be(M.__webglFramebuffer,C)}else if(W){M.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[se]),M.__webglDepthbuffer[se]===void 0)M.__webglDepthbuffer[se]=n.createRenderbuffer(),we(M.__webglDepthbuffer[se],C,!1);else{const oe=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=M.__webglDepthbuffer[se];n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,ie)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),we(M.__webglDepthbuffer,C,!1);else{const se=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,oe)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ne(C,M,W){const se=i.get(C);M!==void 0&&ae(se.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&X(C)}function ve(C){const M=C.texture,W=i.get(C),se=i.get(M);C.addEventListener("dispose",S);const oe=C.textures,ie=C.isWebGLCubeRenderTarget===!0,Ae=oe.length>1;if(Ae||(se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture()),se.__version=M.version,o.memory.textures++),ie){W.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(M.mipmaps&&M.mipmaps.length>0){W.__webglFramebuffer[xe]=[];for(let Se=0;Se<M.mipmaps.length;Se++)W.__webglFramebuffer[xe][Se]=n.createFramebuffer()}else W.__webglFramebuffer[xe]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){W.__webglFramebuffer=[];for(let xe=0;xe<M.mipmaps.length;xe++)W.__webglFramebuffer[xe]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(Ae)for(let xe=0,Se=oe.length;xe<Se;xe++){const Ze=i.get(oe[xe]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&Xe(C)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let xe=0;xe<oe.length;xe++){const Se=oe[xe];W.__webglColorRenderbuffer[xe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[xe]);const Ze=a.convert(Se.format,Se.colorSpace),he=a.convert(Se.type),L=y(Se.internalFormat,Ze,he,Se.colorSpace,C.isXRRenderTarget===!0),O=$e(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,O,L,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,W.__webglColorRenderbuffer[xe])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),we(W.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture),Te(n.TEXTURE_CUBE_MAP,M);for(let xe=0;xe<6;xe++)if(M.mipmaps&&M.mipmaps.length>0)for(let Se=0;Se<M.mipmaps.length;Se++)ae(W.__webglFramebuffer[xe][Se],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Se);else ae(W.__webglFramebuffer[xe],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);p(M)&&m(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let xe=0,Se=oe.length;xe<Se;xe++){const Ze=oe[xe],he=i.get(Ze);t.bindTexture(n.TEXTURE_2D,he.__webglTexture),Te(n.TEXTURE_2D,Ze),ae(W.__webglFramebuffer,C,Ze,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,0),p(Ze)&&m(n.TEXTURE_2D)}t.unbindTexture()}else{let xe=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(xe=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(xe,se.__webglTexture),Te(xe,M),M.mipmaps&&M.mipmaps.length>0)for(let Se=0;Se<M.mipmaps.length;Se++)ae(W.__webglFramebuffer[Se],C,M,n.COLOR_ATTACHMENT0,xe,Se);else ae(W.__webglFramebuffer,C,M,n.COLOR_ATTACHMENT0,xe,0);p(M)&&m(xe),t.unbindTexture()}C.depthBuffer&&X(C)}function Ue(C){const M=C.textures;for(let W=0,se=M.length;W<se;W++){const oe=M[W];if(p(oe)){const ie=C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Ae=i.get(oe).__webglTexture;t.bindTexture(ie,Ae),m(ie),t.unbindTexture()}}}const ke=[],I=[];function yt(C){if(C.samples>0){if(Xe(C)===!1){const M=C.textures,W=C.width,se=C.height;let oe=n.COLOR_BUFFER_BIT;const ie=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ae=i.get(C),xe=M.length>1;if(xe)for(let Se=0;Se<M.length;Se++)t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Se=0;Se<M.length;Se++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(oe|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(oe|=n.STENCIL_BUFFER_BIT)),xe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[Se]);const Ze=i.get(M[Se]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ze,0)}n.blitFramebuffer(0,0,W,se,0,0,W,se,oe,n.NEAREST),c===!0&&(ke.length=0,I.length=0,ke.push(n.COLOR_ATTACHMENT0+Se),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ke.push(ie),I.push(ie),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,I)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ke))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),xe)for(let Se=0;Se<M.length;Se++){t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[Se]);const Ze=i.get(M[Se]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,Ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const M=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function $e(C){return Math.min(s.maxSamples,C.samples)}function Xe(C){const M=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Fe(C){const M=o.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function ct(C,M){const W=C.colorSpace,se=C.format,oe=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||W!==xi&&W!==fi&&(at.getTransfer(W)===vt?(se!==kn||oe!==Qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),M}function Oe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=E,this.setTexture2D=z,this.setTexture2DArray=K,this.setTexture3D=U,this.setTextureCube=Z,this.rebindTextures=ne,this.setupRenderTarget=ve,this.updateRenderTargetMipmap=Ue,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=Xe}function Ug(n,e){function t(i,s=fi){let a;const o=at.getTransfer(s);if(i===Qn)return n.UNSIGNED_BYTE;if(i===al)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ol)return n.UNSIGNED_SHORT_5_5_5_1;if(i===_h)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===yh)return n.BYTE;if(i===xh)return n.SHORT;if(i===Js)return n.UNSIGNED_SHORT;if(i===sl)return n.INT;if(i===Gi)return n.UNSIGNED_INT;if(i===Kn)return n.FLOAT;if(i===ta)return n.HALF_FLOAT;if(i===Mh)return n.ALPHA;if(i===Sh)return n.RGB;if(i===kn)return n.RGBA;if(i===Eh)return n.LUMINANCE;if(i===wh)return n.LUMINANCE_ALPHA;if(i===fs)return n.DEPTH_COMPONENT;if(i===_s)return n.DEPTH_STENCIL;if(i===Th)return n.RED;if(i===rl)return n.RED_INTEGER;if(i===Ah)return n.RG;if(i===ll)return n.RG_INTEGER;if(i===cl)return n.RGBA_INTEGER;if(i===Oa||i===Ba||i===za||i===Ga)if(o===vt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Oa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ba)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===za)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ga)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Oa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ba)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===za)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ga)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vr||i===br||i===yr||i===xr)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===vr)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===br)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===yr)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===xr)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_r||i===Mr||i===Sr)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===_r||i===Mr)return o===vt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Sr)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Er||i===wr||i===Tr||i===Ar||i===Cr||i===Rr||i===Pr||i===Lr||i===Dr||i===Ir||i===kr||i===Nr||i===Ur||i===Fr)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Er)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wr)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Tr)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ar)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Cr)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Rr)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Pr)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Lr)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Dr)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ir)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===kr)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Nr)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ur)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Fr)return o===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ha||i===Or||i===Br)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===Ha)return o===vt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Or)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Br)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ch||i===zr||i===Gr||i===Hr)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===Ha)return a.COMPRESSED_RED_RGTC1_EXT;if(i===zr)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Gr)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Hr)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===xs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Fg extends Ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Bt extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Og={type:"move"};class Ho{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,o=null;const r=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,i),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=h.position.distanceTo(f.position),u=.02,g=.005;l.inputState.pinching&&d>u+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=u-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));r!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(r.matrix.fromArray(s.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,s.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(s.linearVelocity)):r.hasLinearVelocity=!1,s.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(s.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(Og)))}return r!==null&&(r.visible=s!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Bt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Bg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zg=`
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

}`;class Gg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new tn,a=e.properties.get(s);a.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new yi({vertexShader:Bg,fragmentShader:zg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Q(new En(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hg extends Ss{constructor(e,t){super();const i=this;let s=null,a=1,o=null,r="local-floor",c=1,l=null,h=null,f=null,d=null,u=null,g=null;const v=new Gg,p=t.getContextAttributes();let m=null,y=null;const b=[],x=[],A=new Me;let S=null;const w=new Ln;w.layers.enable(1),w.viewport=new Mt;const R=new Ln;R.layers.enable(2),R.viewport=new Mt;const B=[w,R],_=new Fg;_.layers.enable(1),_.layers.enable(2);let E=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let ae=b[ee];return ae===void 0&&(ae=new Ho,b[ee]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(ee){let ae=b[ee];return ae===void 0&&(ae=new Ho,b[ee]=ae),ae.getGripSpace()},this.getHand=function(ee){let ae=b[ee];return ae===void 0&&(ae=new Ho,b[ee]=ae),ae.getHandSpace()};function k(ee){const ae=x.indexOf(ee.inputSource);if(ae===-1)return;const we=b[ae];we!==void 0&&(we.update(ee.inputSource,ee.frame,l||o),we.dispatchEvent({type:ee.type,data:ee.inputSource}))}function z(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",K);for(let ee=0;ee<b.length;ee++){const ae=x[ee];ae!==null&&(x[ee]=null,b[ee].disconnect(ae))}E=null,D=null,v.reset(),e.setRenderTarget(m),u=null,d=null,f=null,s=null,y=null,je.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){a=ee,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){r=ee,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",z),s.addEventListener("inputsourceschange",K),p.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(A),s.renderState.layers===void 0){const ae={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:a};u=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),y=new Hi(u.framebufferWidth,u.framebufferHeight,{format:kn,type:Qn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ae=null,we=null,be=null;p.depth&&(be=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=p.stencil?_s:fs,we=p.stencil?xs:Gi);const X={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:a};f=new XRWebGLBinding(s,t),d=f.createProjectionLayer(X),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Hi(d.textureWidth,d.textureHeight,{format:kn,type:Qn,depthTexture:new Gh(d.textureWidth,d.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(r),je.setContext(s),je.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function K(ee){for(let ae=0;ae<ee.removed.length;ae++){const we=ee.removed[ae],be=x.indexOf(we);be>=0&&(x[be]=null,b[be].disconnect(we))}for(let ae=0;ae<ee.added.length;ae++){const we=ee.added[ae];let be=x.indexOf(we);if(be===-1){for(let ne=0;ne<b.length;ne++)if(ne>=x.length){x.push(we),be=ne;break}else if(x[ne]===null){x[ne]=we,be=ne;break}if(be===-1)break}const X=b[be];X&&X.connect(we)}}const U=new N,Z=new N;function j(ee,ae,we){U.setFromMatrixPosition(ae.matrixWorld),Z.setFromMatrixPosition(we.matrixWorld);const be=U.distanceTo(Z),X=ae.projectionMatrix.elements,ne=we.projectionMatrix.elements,ve=X[14]/(X[10]-1),Ue=X[14]/(X[10]+1),ke=(X[9]+1)/X[5],I=(X[9]-1)/X[5],yt=(X[8]-1)/X[0],$e=(ne[8]+1)/ne[0],Xe=ve*yt,Fe=ve*$e,ct=be/(-yt+$e),Oe=ct*-yt;if(ae.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(Oe),ee.translateZ(ct),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),X[10]===-1)ee.projectionMatrix.copy(ae.projectionMatrix),ee.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const C=ve+ct,M=Ue+ct,W=Xe-Oe,se=Fe+(be-Oe),oe=ke*Ue/M*C,ie=I*Ue/M*C;ee.projectionMatrix.makePerspective(W,se,oe,ie,C,M),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function pe(ee,ae){ae===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(ae.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let ae=ee.near,we=ee.far;v.texture!==null&&(v.depthNear>0&&(ae=v.depthNear),v.depthFar>0&&(we=v.depthFar)),_.near=R.near=w.near=ae,_.far=R.far=w.far=we,(E!==_.near||D!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),E=_.near,D=_.far);const be=ee.parent,X=_.cameras;pe(_,be);for(let ne=0;ne<X.length;ne++)pe(X[ne],be);X.length===2?j(_,w,R):_.projectionMatrix.copy(w.projectionMatrix),me(ee,_,be)};function me(ee,ae,we){we===null?ee.matrix.copy(ae.matrixWorld):(ee.matrix.copy(we.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(ae.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(ae.projectionMatrix),ee.projectionMatrixInverse.copy(ae.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=Zs*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(d===null&&u===null))return c},this.setFoveation=function(ee){c=ee,d!==null&&(d.fixedFoveation=ee),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=ee)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(_)};let Te=null;function Ye(ee,ae){if(h=ae.getViewerPose(l||o),g=ae,h!==null){const we=h.views;u!==null&&(e.setRenderTargetFramebuffer(y,u.framebuffer),e.setRenderTarget(y));let be=!1;we.length!==_.cameras.length&&(_.cameras.length=0,be=!0);for(let ne=0;ne<we.length;ne++){const ve=we[ne];let Ue=null;if(u!==null)Ue=u.getViewport(ve);else{const I=f.getViewSubImage(d,ve);Ue=I.viewport,ne===0&&(e.setRenderTargetTextures(y,I.colorTexture,d.ignoreDepthValues?void 0:I.depthStencilTexture),e.setRenderTarget(y))}let ke=B[ne];ke===void 0&&(ke=new Ln,ke.layers.enable(ne),ke.viewport=new Mt,B[ne]=ke),ke.matrix.fromArray(ve.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(ve.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),ne===0&&(_.matrix.copy(ke.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),be===!0&&_.cameras.push(ke)}const X=s.enabledFeatures;if(X&&X.includes("depth-sensing")){const ne=f.getDepthInformation(we[0]);ne&&ne.isValid&&ne.texture&&v.init(e,ne,s.renderState)}}for(let we=0;we<b.length;we++){const be=x[we],X=b[we];be!==null&&X!==void 0&&X.update(be,ae,l||o)}Te&&Te(ee,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),g=null}const je=new zh;je.setAnimationLoop(Ye),this.setAnimationLoop=function(ee){Te=ee},this.dispose=function(){}}}const Ri=new Bn,Vg=new ut;function Wg(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Fh(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,y,b,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?a(p,m):m.isMeshToonMaterial?(a(p,m),f(p,m)):m.isMeshPhongMaterial?(a(p,m),h(p,m)):m.isMeshStandardMaterial?(a(p,m),d(p,m),m.isMeshPhysicalMaterial&&u(p,m,x)):m.isMeshMatcapMaterial?(a(p,m),g(p,m)):m.isMeshDepthMaterial?a(p,m):m.isMeshDistanceMaterial?(a(p,m),v(p,m)):m.isMeshNormalMaterial?a(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&r(p,m)):m.isPointsMaterial?c(p,m,y,b):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===cn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===cn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=e.get(m),b=y.envMap,x=y.envMapRotation;b&&(p.envMap.value=b,Ri.copy(x),Ri.x*=-1,Ri.y*=-1,Ri.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ri.y*=-1,Ri.z*=-1),p.envMapRotation.value.setFromMatrix4(Vg.makeRotationFromEuler(Ri)),p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function r(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,y,b){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=b*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function u(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===cn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const y=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function qg(n,e,t,i){let s={},a={},o=[];const r=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,b){const x=b.program;i.uniformBlockBinding(y,x)}function l(y,b){let x=s[y.id];x===void 0&&(g(y),x=h(y),s[y.id]=x,y.addEventListener("dispose",p));const A=b.program;i.updateUBOMapping(y,A);const S=e.render.frame;a[y.id]!==S&&(d(y),a[y.id]=S)}function h(y){const b=f();y.__bindingPointIndex=b;const x=n.createBuffer(),A=y.__size,S=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,A,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,x),x}function f(){for(let y=0;y<r;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const b=s[y.id],x=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let S=0,w=x.length;S<w;S++){const R=Array.isArray(x[S])?x[S]:[x[S]];for(let B=0,_=R.length;B<_;B++){const E=R[B];if(u(E,S,B,A)===!0){const D=E.__offset,k=Array.isArray(E.value)?E.value:[E.value];let z=0;for(let K=0;K<k.length;K++){const U=k[K],Z=v(U);typeof U=="number"||typeof U=="boolean"?(E.__data[0]=U,n.bufferSubData(n.UNIFORM_BUFFER,D+z,E.__data)):U.isMatrix3?(E.__data[0]=U.elements[0],E.__data[1]=U.elements[1],E.__data[2]=U.elements[2],E.__data[3]=0,E.__data[4]=U.elements[3],E.__data[5]=U.elements[4],E.__data[6]=U.elements[5],E.__data[7]=0,E.__data[8]=U.elements[6],E.__data[9]=U.elements[7],E.__data[10]=U.elements[8],E.__data[11]=0):(U.toArray(E.__data,z),z+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,E.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(y,b,x,A){const S=y.value,w=b+"_"+x;if(A[w]===void 0)return typeof S=="number"||typeof S=="boolean"?A[w]=S:A[w]=S.clone(),!0;{const R=A[w];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return A[w]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function g(y){const b=y.uniforms;let x=0;const A=16;for(let w=0,R=b.length;w<R;w++){const B=Array.isArray(b[w])?b[w]:[b[w]];for(let _=0,E=B.length;_<E;_++){const D=B[_],k=Array.isArray(D.value)?D.value:[D.value];for(let z=0,K=k.length;z<K;z++){const U=k[z],Z=v(U),j=x%A,pe=j%Z.boundary,me=j+pe;x+=pe,me!==0&&A-me<Z.storage&&(x+=A-me),D.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=x,x+=Z.storage}}}const S=x%A;return S>0&&(x+=A-S),y.__size=x,y.__cache={},this}function v(y){const b={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(b.boundary=4,b.storage=4):y.isVector2?(b.boundary=8,b.storage=8):y.isVector3||y.isColor?(b.boundary=16,b.storage=12):y.isVector4?(b.boundary=16,b.storage=16):y.isMatrix3?(b.boundary=48,b.storage=48):y.isMatrix4?(b.boundary=64,b.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),b}function p(y){const b=y.target;b.removeEventListener("dispose",p);const x=o.indexOf(b.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete a[b.id]}function m(){for(const y in s)n.deleteBuffer(s[y]);o=[],s={},a={}}return{bind:c,update:l,dispose:m}}class $g{constructor(e={}){const{canvas:t=Du(),context:i=null,depth:s=!0,stencil:a=!1,alpha:o=!1,antialias:r=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const u=new Uint32Array(4),g=new Int32Array(4);let v=null,p=null;const m=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=rn,this.toneMapping=gi,this.toneMappingExposure=1;const b=this;let x=!1,A=0,S=0,w=null,R=-1,B=null;const _=new Mt,E=new Mt;let D=null;const k=new He(0);let z=0,K=t.width,U=t.height,Z=1,j=null,pe=null;const me=new Mt(0,0,K,U),Te=new Mt(0,0,K,U);let Ye=!1;const je=new fl;let ee=!1,ae=!1;const we=new ut,be=new ut,X=new N,ne=new Mt,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ue=!1;function ke(){return w===null?Z:1}let I=i;function yt(T,G){return t.getContext(T,G)}try{const T={alpha:!0,depth:s,stencil:a,antialias:r,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${il}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",ge,!1),I===null){const G="webgl2";if(I=yt(G,T),I===null)throw yt(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let $e,Xe,Fe,ct,Oe,C,M,W,se,oe,ie,Ae,xe,Se,Ze,he,L,O,q,F,te,le,de,P;function re(){$e=new Jm(I),$e.init(),le=new Ug(I,$e),Xe=new qm(I,$e,e,le),Fe=new Ig(I),Xe.reverseDepthBuffer&&Fe.buffers.depth.setReversed(!0),ct=new e0(I),Oe=new bg,C=new Ng(I,$e,Fe,Oe,Xe,le,ct),M=new Xm(b),W=new Km(b),se=new rf(I),de=new Vm(I,se),oe=new Zm(I,se,ct,de),ie=new n0(I,oe,se,ct),q=new t0(I,Xe,C),he=new $m(Oe),Ae=new vg(b,M,W,$e,Xe,de,he),xe=new Wg(b,Oe),Se=new xg,Ze=new Tg($e),O=new Hm(b,M,W,Fe,ie,d,c),L=new Lg(b,ie,Xe),P=new qg(I,ct,Xe,Fe),F=new Wm(I,$e,ct),te=new Qm(I,$e,ct),ct.programs=Ae.programs,b.capabilities=Xe,b.extensions=$e,b.properties=Oe,b.renderLists=Se,b.shadowMap=L,b.state=Fe,b.info=ct}re();const V=new Hg(b,I);this.xr=V,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=$e.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=$e.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(T){T!==void 0&&(Z=T,this.setSize(K,U,!1))},this.getSize=function(T){return T.set(K,U)},this.setSize=function(T,G,$=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=T,U=G,t.width=Math.floor(T*Z),t.height=Math.floor(G*Z),$===!0&&(t.style.width=T+"px",t.style.height=G+"px"),this.setViewport(0,0,T,G)},this.getDrawingBufferSize=function(T){return T.set(K*Z,U*Z).floor()},this.setDrawingBufferSize=function(T,G,$){K=T,U=G,Z=$,t.width=Math.floor(T*$),t.height=Math.floor(G*$),this.setViewport(0,0,T,G)},this.getCurrentViewport=function(T){return T.copy(_)},this.getViewport=function(T){return T.copy(me)},this.setViewport=function(T,G,$,Y){T.isVector4?me.set(T.x,T.y,T.z,T.w):me.set(T,G,$,Y),Fe.viewport(_.copy(me).multiplyScalar(Z).round())},this.getScissor=function(T){return T.copy(Te)},this.setScissor=function(T,G,$,Y){T.isVector4?Te.set(T.x,T.y,T.z,T.w):Te.set(T,G,$,Y),Fe.scissor(E.copy(Te).multiplyScalar(Z).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(T){Fe.setScissorTest(Ye=T)},this.setOpaqueSort=function(T){j=T},this.setTransparentSort=function(T){pe=T},this.getClearColor=function(T){return T.copy(O.getClearColor())},this.setClearColor=function(){O.setClearColor.apply(O,arguments)},this.getClearAlpha=function(){return O.getClearAlpha()},this.setClearAlpha=function(){O.setClearAlpha.apply(O,arguments)},this.clear=function(T=!0,G=!0,$=!0){let Y=0;if(T){let H=!1;if(w!==null){const fe=w.texture.format;H=fe===cl||fe===ll||fe===rl}if(H){const fe=w.texture.type,Ee=fe===Qn||fe===Gi||fe===Js||fe===xs||fe===al||fe===ol,Ce=O.getClearColor(),Pe=O.getClearAlpha(),Be=Ce.r,ze=Ce.g,Le=Ce.b;Ee?(u[0]=Be,u[1]=ze,u[2]=Le,u[3]=Pe,I.clearBufferuiv(I.COLOR,0,u)):(g[0]=Be,g[1]=ze,g[2]=Le,g[3]=Pe,I.clearBufferiv(I.COLOR,0,g))}else Y|=I.COLOR_BUFFER_BIT}G&&(Y|=I.DEPTH_BUFFER_BIT,I.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),$&&(Y|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),Se.dispose(),Ze.dispose(),Oe.dispose(),M.dispose(),W.dispose(),ie.dispose(),de.dispose(),P.dispose(),Ae.dispose(),V.dispose(),V.removeEventListener("sessionstart",Rl),V.removeEventListener("sessionend",Pl),Si.stop()};function J(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const T=ct.autoReset,G=L.enabled,$=L.autoUpdate,Y=L.needsUpdate,H=L.type;re(),ct.autoReset=T,L.enabled=G,L.autoUpdate=$,L.needsUpdate=Y,L.type=H}function ge(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ke(T){const G=T.target;G.removeEventListener("dispose",Ke),At(G)}function At(T){nn(T),Oe.remove(T)}function nn(T){const G=Oe.get(T).programs;G!==void 0&&(G.forEach(function($){Ae.releaseProgram($)}),T.isShaderMaterial&&Ae.releaseShaderCache(T))}this.renderBufferDirect=function(T,G,$,Y,H,fe){G===null&&(G=ve);const Ee=H.isMesh&&H.matrixWorld.determinant()<0,Ce=Ad(T,G,$,Y,H);Fe.setMaterial(Y,Ee);let Pe=$.index,Be=1;if(Y.wireframe===!0){if(Pe=oe.getWireframeAttribute($),Pe===void 0)return;Be=2}const ze=$.drawRange,Le=$.attributes.position;let ot=ze.start*Be,pt=(ze.start+ze.count)*Be;fe!==null&&(ot=Math.max(ot,fe.start*Be),pt=Math.min(pt,(fe.start+fe.count)*Be)),Pe!==null?(ot=Math.max(ot,0),pt=Math.min(pt,Pe.count)):Le!=null&&(ot=Math.max(ot,0),pt=Math.min(pt,Le.count));const xt=pt-ot;if(xt<0||xt===1/0)return;de.setup(H,Y,Ce,$,Pe);let hn,nt=F;if(Pe!==null&&(hn=se.get(Pe),nt=te,nt.setIndex(hn)),H.isMesh)Y.wireframe===!0?(Fe.setLineWidth(Y.wireframeLinewidth*ke()),nt.setMode(I.LINES)):nt.setMode(I.TRIANGLES);else if(H.isLine){let De=Y.linewidth;De===void 0&&(De=1),Fe.setLineWidth(De*ke()),H.isLineSegments?nt.setMode(I.LINES):H.isLineLoop?nt.setMode(I.LINE_LOOP):nt.setMode(I.LINE_STRIP)}else H.isPoints?nt.setMode(I.POINTS):H.isSprite&&nt.setMode(I.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)nt.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if($e.get("WEBGL_multi_draw"))nt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const De=H._multiDrawStarts,Ht=H._multiDrawCounts,it=H._multiDrawCount,An=Pe?se.get(Pe).bytesPerElement:1,qi=Oe.get(Y).currentProgram.getUniforms();for(let dn=0;dn<it;dn++)qi.setValue(I,"_gl_DrawID",dn),nt.render(De[dn]/An,Ht[dn])}else if(H.isInstancedMesh)nt.renderInstances(ot,xt,H.count);else if($.isInstancedBufferGeometry){const De=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Ht=Math.min($.instanceCount,De);nt.renderInstances(ot,xt,Ht)}else nt.render(ot,xt)};function tt(T,G,$){T.transparent===!0&&T.side===gn&&T.forceSinglePass===!1?(T.side=cn,T.needsUpdate=!0,oa(T,G,$),T.side=bi,T.needsUpdate=!0,oa(T,G,$),T.side=gn):oa(T,G,$)}this.compile=function(T,G,$=null){$===null&&($=T),p=Ze.get($),p.init(G),y.push(p),$.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),T!==$&&T.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();const Y=new Set;return T.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const fe=H.material;if(fe)if(Array.isArray(fe))for(let Ee=0;Ee<fe.length;Ee++){const Ce=fe[Ee];tt(Ce,$,H),Y.add(Ce)}else tt(fe,$,H),Y.add(fe)}),y.pop(),p=null,Y},this.compileAsync=function(T,G,$=null){const Y=this.compile(T,G,$);return new Promise(H=>{function fe(){if(Y.forEach(function(Ee){Oe.get(Ee).currentProgram.isReady()&&Y.delete(Ee)}),Y.size===0){H(T);return}setTimeout(fe,10)}$e.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let sn=null;function Gn(T){sn&&sn(T)}function Rl(){Si.stop()}function Pl(){Si.start()}const Si=new zh;Si.setAnimationLoop(Gn),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(T){sn=T,V.setAnimationLoop(T),T===null?Si.stop():Si.start()},V.addEventListener("sessionstart",Rl),V.addEventListener("sessionend",Pl),this.render=function(T,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(G),G=V.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,G,w),p=Ze.get(T,y.length),p.init(G),y.push(p),be.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),je.setFromProjectionMatrix(be),ae=this.localClippingEnabled,ee=he.init(this.clippingPlanes,ae),v=Se.get(T,m.length),v.init(),m.push(v),V.enabled===!0&&V.isPresenting===!0){const fe=b.xr.getDepthSensingMesh();fe!==null&&co(fe,G,-1/0,b.sortObjects)}co(T,G,0,b.sortObjects),v.finish(),b.sortObjects===!0&&v.sort(j,pe),Ue=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,Ue&&O.addToRenderList(v,T),this.info.render.frame++,ee===!0&&he.beginShadows();const $=p.state.shadowsArray;L.render($,T,G),ee===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=v.opaque,H=v.transmissive;if(p.setupLights(),G.isArrayCamera){const fe=G.cameras;if(H.length>0)for(let Ee=0,Ce=fe.length;Ee<Ce;Ee++){const Pe=fe[Ee];Dl(Y,H,T,Pe)}Ue&&O.render(T);for(let Ee=0,Ce=fe.length;Ee<Ce;Ee++){const Pe=fe[Ee];Ll(v,T,Pe,Pe.viewport)}}else H.length>0&&Dl(Y,H,T,G),Ue&&O.render(T),Ll(v,T,G);w!==null&&(C.updateMultisampleRenderTarget(w),C.updateRenderTargetMipmap(w)),T.isScene===!0&&T.onAfterRender(b,T,G),de.resetDefaultState(),R=-1,B=null,y.pop(),y.length>0?(p=y[y.length-1],ee===!0&&he.setGlobalState(b.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function co(T,G,$,Y){if(T.visible===!1)return;if(T.layers.test(G.layers)){if(T.isGroup)$=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(G);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||je.intersectsSprite(T)){Y&&ne.setFromMatrixPosition(T.matrixWorld).applyMatrix4(be);const Ee=ie.update(T),Ce=T.material;Ce.visible&&v.push(T,Ee,Ce,$,ne.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||je.intersectsObject(T))){const Ee=ie.update(T),Ce=T.material;if(Y&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ne.copy(T.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),ne.copy(Ee.boundingSphere.center)),ne.applyMatrix4(T.matrixWorld).applyMatrix4(be)),Array.isArray(Ce)){const Pe=Ee.groups;for(let Be=0,ze=Pe.length;Be<ze;Be++){const Le=Pe[Be],ot=Ce[Le.materialIndex];ot&&ot.visible&&v.push(T,Ee,ot,$,ne.z,Le)}}else Ce.visible&&v.push(T,Ee,Ce,$,ne.z,null)}}const fe=T.children;for(let Ee=0,Ce=fe.length;Ee<Ce;Ee++)co(fe[Ee],G,$,Y)}function Ll(T,G,$,Y){const H=T.opaque,fe=T.transmissive,Ee=T.transparent;p.setupLightsView($),ee===!0&&he.setGlobalState(b.clippingPlanes,$),Y&&Fe.viewport(_.copy(Y)),H.length>0&&aa(H,G,$),fe.length>0&&aa(fe,G,$),Ee.length>0&&aa(Ee,G,$),Fe.buffers.depth.setTest(!0),Fe.buffers.depth.setMask(!0),Fe.buffers.color.setMask(!0),Fe.setPolygonOffset(!1)}function Dl(T,G,$,Y){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new Hi(1,1,{generateMipmaps:!0,type:$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float")?ta:Qn,minFilter:Fi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const fe=p.state.transmissionRenderTarget[Y.id],Ee=Y.viewport||_;fe.setSize(Ee.z,Ee.w);const Ce=b.getRenderTarget();b.setRenderTarget(fe),b.getClearColor(k),z=b.getClearAlpha(),z<1&&b.setClearColor(16777215,.5),b.clear(),Ue&&O.render($);const Pe=b.toneMapping;b.toneMapping=gi;const Be=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),ee===!0&&he.setGlobalState(b.clippingPlanes,Y),aa(T,$,Y),C.updateMultisampleRenderTarget(fe),C.updateRenderTargetMipmap(fe),$e.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let Le=0,ot=G.length;Le<ot;Le++){const pt=G[Le],xt=pt.object,hn=pt.geometry,nt=pt.material,De=pt.group;if(nt.side===gn&&xt.layers.test(Y.layers)){const Ht=nt.side;nt.side=cn,nt.needsUpdate=!0,Il(xt,$,Y,hn,nt,De),nt.side=Ht,nt.needsUpdate=!0,ze=!0}}ze===!0&&(C.updateMultisampleRenderTarget(fe),C.updateRenderTargetMipmap(fe))}b.setRenderTarget(Ce),b.setClearColor(k,z),Be!==void 0&&(Y.viewport=Be),b.toneMapping=Pe}function aa(T,G,$){const Y=G.isScene===!0?G.overrideMaterial:null;for(let H=0,fe=T.length;H<fe;H++){const Ee=T[H],Ce=Ee.object,Pe=Ee.geometry,Be=Y===null?Ee.material:Y,ze=Ee.group;Ce.layers.test($.layers)&&Il(Ce,G,$,Pe,Be,ze)}}function Il(T,G,$,Y,H,fe){T.onBeforeRender(b,G,$,Y,H,fe),T.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),H.onBeforeRender(b,G,$,Y,T,fe),H.transparent===!0&&H.side===gn&&H.forceSinglePass===!1?(H.side=cn,H.needsUpdate=!0,b.renderBufferDirect($,G,Y,H,T,fe),H.side=bi,H.needsUpdate=!0,b.renderBufferDirect($,G,Y,H,T,fe),H.side=gn):b.renderBufferDirect($,G,Y,H,T,fe),T.onAfterRender(b,G,$,Y,H,fe)}function oa(T,G,$){G.isScene!==!0&&(G=ve);const Y=Oe.get(T),H=p.state.lights,fe=p.state.shadowsArray,Ee=H.state.version,Ce=Ae.getParameters(T,H.state,fe,G,$),Pe=Ae.getProgramCacheKey(Ce);let Be=Y.programs;Y.environment=T.isMeshStandardMaterial?G.environment:null,Y.fog=G.fog,Y.envMap=(T.isMeshStandardMaterial?W:M).get(T.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&T.envMap===null?G.environmentRotation:T.envMapRotation,Be===void 0&&(T.addEventListener("dispose",Ke),Be=new Map,Y.programs=Be);let ze=Be.get(Pe);if(ze!==void 0){if(Y.currentProgram===ze&&Y.lightsStateVersion===Ee)return Nl(T,Ce),ze}else Ce.uniforms=Ae.getUniforms(T),T.onBeforeCompile(Ce,b),ze=Ae.acquireProgram(Ce,Pe),Be.set(Pe,ze),Y.uniforms=Ce.uniforms;const Le=Y.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Le.clippingPlanes=he.uniform),Nl(T,Ce),Y.needsLights=Rd(T),Y.lightsStateVersion=Ee,Y.needsLights&&(Le.ambientLightColor.value=H.state.ambient,Le.lightProbe.value=H.state.probe,Le.directionalLights.value=H.state.directional,Le.directionalLightShadows.value=H.state.directionalShadow,Le.spotLights.value=H.state.spot,Le.spotLightShadows.value=H.state.spotShadow,Le.rectAreaLights.value=H.state.rectArea,Le.ltc_1.value=H.state.rectAreaLTC1,Le.ltc_2.value=H.state.rectAreaLTC2,Le.pointLights.value=H.state.point,Le.pointLightShadows.value=H.state.pointShadow,Le.hemisphereLights.value=H.state.hemi,Le.directionalShadowMap.value=H.state.directionalShadowMap,Le.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Le.spotShadowMap.value=H.state.spotShadowMap,Le.spotLightMatrix.value=H.state.spotLightMatrix,Le.spotLightMap.value=H.state.spotLightMap,Le.pointShadowMap.value=H.state.pointShadowMap,Le.pointShadowMatrix.value=H.state.pointShadowMatrix),Y.currentProgram=ze,Y.uniformsList=null,ze}function kl(T){if(T.uniformsList===null){const G=T.currentProgram.getUniforms();T.uniformsList=Wa.seqWithValue(G.seq,T.uniforms)}return T.uniformsList}function Nl(T,G){const $=Oe.get(T);$.outputColorSpace=G.outputColorSpace,$.batching=G.batching,$.batchingColor=G.batchingColor,$.instancing=G.instancing,$.instancingColor=G.instancingColor,$.instancingMorph=G.instancingMorph,$.skinning=G.skinning,$.morphTargets=G.morphTargets,$.morphNormals=G.morphNormals,$.morphColors=G.morphColors,$.morphTargetsCount=G.morphTargetsCount,$.numClippingPlanes=G.numClippingPlanes,$.numIntersection=G.numClipIntersection,$.vertexAlphas=G.vertexAlphas,$.vertexTangents=G.vertexTangents,$.toneMapping=G.toneMapping}function Ad(T,G,$,Y,H){G.isScene!==!0&&(G=ve),C.resetTextureUnits();const fe=G.fog,Ee=Y.isMeshStandardMaterial?G.environment:null,Ce=w===null?b.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:xi,Pe=(Y.isMeshStandardMaterial?W:M).get(Y.envMap||Ee),Be=Y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ze=!!$.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Le=!!$.morphAttributes.position,ot=!!$.morphAttributes.normal,pt=!!$.morphAttributes.color;let xt=gi;Y.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(xt=b.toneMapping);const hn=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,nt=hn!==void 0?hn.length:0,De=Oe.get(Y),Ht=p.state.lights;if(ee===!0&&(ae===!0||T!==B)){const yn=T===B&&Y.id===R;he.setState(Y,T,yn)}let it=!1;Y.version===De.__version?(De.needsLights&&De.lightsStateVersion!==Ht.state.version||De.outputColorSpace!==Ce||H.isBatchedMesh&&De.batching===!1||!H.isBatchedMesh&&De.batching===!0||H.isBatchedMesh&&De.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&De.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&De.instancing===!1||!H.isInstancedMesh&&De.instancing===!0||H.isSkinnedMesh&&De.skinning===!1||!H.isSkinnedMesh&&De.skinning===!0||H.isInstancedMesh&&De.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&De.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&De.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&De.instancingMorph===!1&&H.morphTexture!==null||De.envMap!==Pe||Y.fog===!0&&De.fog!==fe||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==he.numPlanes||De.numIntersection!==he.numIntersection)||De.vertexAlphas!==Be||De.vertexTangents!==ze||De.morphTargets!==Le||De.morphNormals!==ot||De.morphColors!==pt||De.toneMapping!==xt||De.morphTargetsCount!==nt)&&(it=!0):(it=!0,De.__version=Y.version);let An=De.currentProgram;it===!0&&(An=oa(Y,G,H));let qi=!1,dn=!1,ho=!1;const St=An.getUniforms(),ti=De.uniforms;if(Fe.useProgram(An.program)&&(qi=!0,dn=!0,ho=!0),Y.id!==R&&(R=Y.id,dn=!0),qi||B!==T){Xe.reverseDepthBuffer?(we.copy(T.projectionMatrix),ku(we),Nu(we),St.setValue(I,"projectionMatrix",we)):St.setValue(I,"projectionMatrix",T.projectionMatrix),St.setValue(I,"viewMatrix",T.matrixWorldInverse);const yn=St.map.cameraPosition;yn!==void 0&&yn.setValue(I,X.setFromMatrixPosition(T.matrixWorld)),Xe.logarithmicDepthBuffer&&St.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&St.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),B!==T&&(B=T,dn=!0,ho=!0)}if(H.isSkinnedMesh){St.setOptional(I,H,"bindMatrix"),St.setOptional(I,H,"bindMatrixInverse");const yn=H.skeleton;yn&&(yn.boneTexture===null&&yn.computeBoneTexture(),St.setValue(I,"boneTexture",yn.boneTexture,C))}H.isBatchedMesh&&(St.setOptional(I,H,"batchingTexture"),St.setValue(I,"batchingTexture",H._matricesTexture,C),St.setOptional(I,H,"batchingIdTexture"),St.setValue(I,"batchingIdTexture",H._indirectTexture,C),St.setOptional(I,H,"batchingColorTexture"),H._colorsTexture!==null&&St.setValue(I,"batchingColorTexture",H._colorsTexture,C));const uo=$.morphAttributes;if((uo.position!==void 0||uo.normal!==void 0||uo.color!==void 0)&&q.update(H,$,An),(dn||De.receiveShadow!==H.receiveShadow)&&(De.receiveShadow=H.receiveShadow,St.setValue(I,"receiveShadow",H.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(ti.envMap.value=Pe,ti.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&G.environment!==null&&(ti.envMapIntensity.value=G.environmentIntensity),dn&&(St.setValue(I,"toneMappingExposure",b.toneMappingExposure),De.needsLights&&Cd(ti,ho),fe&&Y.fog===!0&&xe.refreshFogUniforms(ti,fe),xe.refreshMaterialUniforms(ti,Y,Z,U,p.state.transmissionRenderTarget[T.id]),Wa.upload(I,kl(De),ti,C)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Wa.upload(I,kl(De),ti,C),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&St.setValue(I,"center",H.center),St.setValue(I,"modelViewMatrix",H.modelViewMatrix),St.setValue(I,"normalMatrix",H.normalMatrix),St.setValue(I,"modelMatrix",H.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const yn=Y.uniformsGroups;for(let fo=0,Pd=yn.length;fo<Pd;fo++){const Ul=yn[fo];P.update(Ul,An),P.bind(Ul,An)}}return An}function Cd(T,G){T.ambientLightColor.needsUpdate=G,T.lightProbe.needsUpdate=G,T.directionalLights.needsUpdate=G,T.directionalLightShadows.needsUpdate=G,T.pointLights.needsUpdate=G,T.pointLightShadows.needsUpdate=G,T.spotLights.needsUpdate=G,T.spotLightShadows.needsUpdate=G,T.rectAreaLights.needsUpdate=G,T.hemisphereLights.needsUpdate=G}function Rd(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(T,G,$){Oe.get(T.texture).__webglTexture=G,Oe.get(T.depthTexture).__webglTexture=$;const Y=Oe.get(T);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=$===void 0,Y.__autoAllocateDepthBuffer||$e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,G){const $=Oe.get(T);$.__webglFramebuffer=G,$.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(T,G=0,$=0){w=T,A=G,S=$;let Y=!0,H=null,fe=!1,Ee=!1;if(T){const Pe=Oe.get(T);if(Pe.__useDefaultFramebuffer!==void 0)Fe.bindFramebuffer(I.FRAMEBUFFER,null),Y=!1;else if(Pe.__webglFramebuffer===void 0)C.setupRenderTarget(T);else if(Pe.__hasExternalTextures)C.rebindTextures(T,Oe.get(T.texture).__webglTexture,Oe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Le=T.depthTexture;if(Pe.__boundDepthTexture!==Le){if(Le!==null&&Oe.has(Le)&&(T.width!==Le.image.width||T.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(T)}}const Be=T.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(Ee=!0);const ze=Oe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ze[G])?H=ze[G][$]:H=ze[G],fe=!0):T.samples>0&&C.useMultisampledRTT(T)===!1?H=Oe.get(T).__webglMultisampledFramebuffer:Array.isArray(ze)?H=ze[$]:H=ze,_.copy(T.viewport),E.copy(T.scissor),D=T.scissorTest}else _.copy(me).multiplyScalar(Z).floor(),E.copy(Te).multiplyScalar(Z).floor(),D=Ye;if(Fe.bindFramebuffer(I.FRAMEBUFFER,H)&&Y&&Fe.drawBuffers(T,H),Fe.viewport(_),Fe.scissor(E),Fe.setScissorTest(D),fe){const Pe=Oe.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+G,Pe.__webglTexture,$)}else if(Ee){const Pe=Oe.get(T.texture),Be=G||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Pe.__webglTexture,$||0,Be)}R=-1},this.readRenderTargetPixels=function(T,G,$,Y,H,fe,Ee){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Oe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ce=Ce[Ee]),Ce){Fe.bindFramebuffer(I.FRAMEBUFFER,Ce);try{const Pe=T.texture,Be=Pe.format,ze=Pe.type;if(!Xe.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=T.width-Y&&$>=0&&$<=T.height-H&&I.readPixels(G,$,Y,H,le.convert(Be),le.convert(ze),fe)}finally{const Pe=w!==null?Oe.get(w).__webglFramebuffer:null;Fe.bindFramebuffer(I.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(T,G,$,Y,H,fe,Ee){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Oe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ce=Ce[Ee]),Ce){const Pe=T.texture,Be=Pe.format,ze=Pe.type;if(!Xe.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=T.width-Y&&$>=0&&$<=T.height-H){Fe.bindFramebuffer(I.FRAMEBUFFER,Ce);const Le=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Le),I.bufferData(I.PIXEL_PACK_BUFFER,fe.byteLength,I.STREAM_READ),I.readPixels(G,$,Y,H,le.convert(Be),le.convert(ze),0);const ot=w!==null?Oe.get(w).__webglFramebuffer:null;Fe.bindFramebuffer(I.FRAMEBUFFER,ot);const pt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Iu(I,pt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Le),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,fe),I.deleteBuffer(Le),I.deleteSync(pt),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,G=null,$=0){T.isTexture!==!0&&(Va("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,T=arguments[1]);const Y=Math.pow(2,-$),H=Math.floor(T.image.width*Y),fe=Math.floor(T.image.height*Y),Ee=G!==null?G.x:0,Ce=G!==null?G.y:0;C.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,$,0,0,Ee,Ce,H,fe),Fe.unbindTexture()},this.copyTextureToTexture=function(T,G,$=null,Y=null,H=0){T.isTexture!==!0&&(Va("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,T=arguments[1],G=arguments[2],H=arguments[3]||0,$=null);let fe,Ee,Ce,Pe,Be,ze;$!==null?(fe=$.max.x-$.min.x,Ee=$.max.y-$.min.y,Ce=$.min.x,Pe=$.min.y):(fe=T.image.width,Ee=T.image.height,Ce=0,Pe=0),Y!==null?(Be=Y.x,ze=Y.y):(Be=0,ze=0);const Le=le.convert(G.format),ot=le.convert(G.type);C.setTexture2D(G,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,G.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,G.unpackAlignment);const pt=I.getParameter(I.UNPACK_ROW_LENGTH),xt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),hn=I.getParameter(I.UNPACK_SKIP_PIXELS),nt=I.getParameter(I.UNPACK_SKIP_ROWS),De=I.getParameter(I.UNPACK_SKIP_IMAGES),Ht=T.isCompressedTexture?T.mipmaps[H]:T.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,Ht.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ht.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ce),I.pixelStorei(I.UNPACK_SKIP_ROWS,Pe),T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,H,Be,ze,fe,Ee,Le,ot,Ht.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,H,Be,ze,Ht.width,Ht.height,Le,Ht.data):I.texSubImage2D(I.TEXTURE_2D,H,Be,ze,fe,Ee,Le,ot,Ht),I.pixelStorei(I.UNPACK_ROW_LENGTH,pt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,xt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,hn),I.pixelStorei(I.UNPACK_SKIP_ROWS,nt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,De),H===0&&G.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),Fe.unbindTexture()},this.copyTextureToTexture3D=function(T,G,$=null,Y=null,H=0){T.isTexture!==!0&&(Va("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,Y=arguments[1]||null,T=arguments[2],G=arguments[3],H=arguments[4]||0);let fe,Ee,Ce,Pe,Be,ze,Le,ot,pt;const xt=T.isCompressedTexture?T.mipmaps[H]:T.image;$!==null?(fe=$.max.x-$.min.x,Ee=$.max.y-$.min.y,Ce=$.max.z-$.min.z,Pe=$.min.x,Be=$.min.y,ze=$.min.z):(fe=xt.width,Ee=xt.height,Ce=xt.depth,Pe=0,Be=0,ze=0),Y!==null?(Le=Y.x,ot=Y.y,pt=Y.z):(Le=0,ot=0,pt=0);const hn=le.convert(G.format),nt=le.convert(G.type);let De;if(G.isData3DTexture)C.setTexture3D(G,0),De=I.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)C.setTexture2DArray(G,0),De=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,G.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,G.unpackAlignment);const Ht=I.getParameter(I.UNPACK_ROW_LENGTH),it=I.getParameter(I.UNPACK_IMAGE_HEIGHT),An=I.getParameter(I.UNPACK_SKIP_PIXELS),qi=I.getParameter(I.UNPACK_SKIP_ROWS),dn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,xt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,xt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Pe),I.pixelStorei(I.UNPACK_SKIP_ROWS,Be),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ze),T.isDataTexture||T.isData3DTexture?I.texSubImage3D(De,H,Le,ot,pt,fe,Ee,Ce,hn,nt,xt.data):G.isCompressedArrayTexture?I.compressedTexSubImage3D(De,H,Le,ot,pt,fe,Ee,Ce,hn,xt.data):I.texSubImage3D(De,H,Le,ot,pt,fe,Ee,Ce,hn,nt,xt),I.pixelStorei(I.UNPACK_ROW_LENGTH,Ht),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,it),I.pixelStorei(I.UNPACK_SKIP_PIXELS,An),I.pixelStorei(I.UNPACK_SKIP_ROWS,qi),I.pixelStorei(I.UNPACK_SKIP_IMAGES,dn),H===0&&G.generateMipmaps&&I.generateMipmap(De),Fe.unbindTexture()},this.initRenderTarget=function(T){Oe.get(T).__webglFramebuffer===void 0&&C.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?C.setTextureCube(T,0):T.isData3DTexture?C.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?C.setTexture2DArray(T,0):C.setTexture2D(T,0),Fe.unbindTexture()},this.resetState=function(){A=0,S=0,w=null,Fe.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===hl?"display-p3":"srgb",t.unpackColorSpace=at.workingColorSpace===no?"display-p3":"srgb"}}class gl{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new He(e),this.near=t,this.far=i}clone(){return new gl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xg extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bn,this.environmentIntensity=1,this.environmentRotation=new Bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class $h extends Wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Qa=new N,eo=new N,Lc=new ut,Ls=new io,Ra=new sa,Vo=new N,Dc=new N;class Yg extends Lt{constructor(e=new $t,t=new $h){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,a=t.count;s<a;s++)Qa.fromBufferAttribute(t,s-1),eo.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Qa.distanceTo(eo);e.setAttribute("lineDistance",new ft(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ra.copy(i.boundingSphere),Ra.applyMatrix4(s),Ra.radius+=a,e.ray.intersectsSphere(Ra)===!1)return;Lc.copy(s).invert(),Ls.copy(e.ray).applyMatrix4(Lc);const r=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=r*r,l=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){const u=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=u,p=g-1;v<p;v+=l){const m=h.getX(v),y=h.getX(v+1),b=Pa(this,e,Ls,c,m,y);b&&t.push(b)}if(this.isLineLoop){const v=h.getX(g-1),p=h.getX(u),m=Pa(this,e,Ls,c,v,p);m&&t.push(m)}}else{const u=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let v=u,p=g-1;v<p;v+=l){const m=Pa(this,e,Ls,c,v,v+1);m&&t.push(m)}if(this.isLineLoop){const v=Pa(this,e,Ls,c,g-1,u);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const r=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=a}}}}}function Pa(n,e,t,i,s,a){const o=n.geometry.attributes.position;if(Qa.fromBufferAttribute(o,s),eo.fromBufferAttribute(o,a),t.distanceSqToSegment(Qa,eo,Vo,Dc)>i)return;Vo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Vo);if(!(c<e.near||c>e.far))return{distance:c,point:Dc.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class Xh extends Wi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ic=new ut,Wr=new io,La=new sa,Da=new N;class jg extends Lt{constructor(e=new $t,t=new Xh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),La.copy(i.boundingSphere),La.applyMatrix4(s),La.radius+=a,e.ray.intersectsSphere(La)===!1)return;Ic.copy(s).invert(),Wr.copy(e.ray).applyMatrix4(Ic);const r=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=r*r,l=i.index,f=i.attributes.position;if(l!==null){const d=Math.max(0,o.start),u=Math.min(l.count,o.start+o.count);for(let g=d,v=u;g<v;g++){const p=l.getX(g);Da.fromBufferAttribute(f,p),kc(Da,p,c,s,e,t,this)}}else{const d=Math.max(0,o.start),u=Math.min(f.count,o.start+o.count);for(let g=d,v=u;g<v;g++)Da.fromBufferAttribute(f,g),kc(Da,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const r=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=a}}}}}function kc(n,e,t,i,s,a,o){const r=Wr.distanceSqToPoint(n);if(r<t){const c=new N;Wr.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;a.push({distance:l,distanceToRay:Math.sqrt(r),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class ao extends tn{constructor(e,t,i,s,a,o,r,c,l){super(e,t,i,s,a,o,r,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class zn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),a=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),a+=i.distanceTo(s),t.push(a),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const a=i.length;let o;t?o=t:o=e*i[a-1];let r=0,c=a-1,l;for(;r<=c;)if(s=Math.floor(r+(c-r)/2),l=i[s]-o,l<0)r=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(a-1);const h=i[s],d=i[s+1]-h,u=(o-h)/d;return(s+u)/(a-1)}getTangent(e,t){let s=e-1e-4,a=e+1e-4;s<0&&(s=0),a>1&&(a=1);const o=this.getPoint(s),r=this.getPoint(a),c=t||(o.isVector2?new Me:new N);return c.copy(r).sub(o).normalize(),c}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new N,s=[],a=[],o=[],r=new N,c=new ut;for(let u=0;u<=e;u++){const g=u/e;s[u]=this.getTangentAt(g,new N)}a[0]=new N,o[0]=new N;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),d<=l&&i.set(0,0,1),r.crossVectors(s[0],i).normalize(),a[0].crossVectors(s[0],r),o[0].crossVectors(s[0],a[0]);for(let u=1;u<=e;u++){if(a[u]=a[u-1].clone(),o[u]=o[u-1].clone(),r.crossVectors(s[u-1],s[u]),r.length()>Number.EPSILON){r.normalize();const g=Math.acos(Pt(s[u-1].dot(s[u]),-1,1));a[u].applyMatrix4(c.makeRotationAxis(r,g))}o[u].crossVectors(s[u],a[u])}if(t===!0){let u=Math.acos(Pt(a[0].dot(a[e]),-1,1));u/=e,s[0].dot(r.crossVectors(a[0],a[e]))>0&&(u=-u);for(let g=1;g<=e;g++)a[g].applyMatrix4(c.makeRotationAxis(s[g],u*g)),o[g].crossVectors(s[g],a[g])}return{tangents:s,normals:a,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class vl extends zn{constructor(e=0,t=0,i=1,s=1,a=0,o=Math.PI*2,r=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=a,this.aEndAngle=o,this.aClockwise=r,this.aRotation=c}getPoint(e,t=new Me){const i=t,s=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const o=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=s;for(;a>s;)a-=s;a<Number.EPSILON&&(o?a=0:a=s),this.aClockwise===!0&&!o&&(a===s?a=-s:a=a-s);const r=this.aStartAngle+e*a;let c=this.aX+this.xRadius*Math.cos(r),l=this.aY+this.yRadius*Math.sin(r);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=c-this.aX,u=l-this.aY;c=d*h-u*f+this.aX,l=d*f+u*h+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Kg extends vl{constructor(e,t,i,s,a,o){super(e,t,i,i,s,a,o),this.isArcCurve=!0,this.type="ArcCurve"}}function bl(){let n=0,e=0,t=0,i=0;function s(a,o,r,c){n=a,e=r,t=-3*a+3*o-2*r-c,i=2*a-2*o+r+c}return{initCatmullRom:function(a,o,r,c,l){s(o,r,l*(r-a),l*(c-o))},initNonuniformCatmullRom:function(a,o,r,c,l,h,f){let d=(o-a)/l-(r-a)/(l+h)+(r-o)/h,u=(r-o)/h-(c-o)/(h+f)+(c-r)/f;d*=h,u*=h,s(o,r,d,u)},calc:function(a){const o=a*a,r=o*a;return n+e*a+t*o+i*r}}}const Ia=new N,Wo=new bl,qo=new bl,$o=new bl;class Jg extends zn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new N){const i=t,s=this.points,a=s.length,o=(a-(this.closed?0:1))*e;let r=Math.floor(o),c=o-r;this.closed?r+=r>0?0:(Math.floor(Math.abs(r)/a)+1)*a:c===0&&r===a-1&&(r=a-2,c=1);let l,h;this.closed||r>0?l=s[(r-1)%a]:(Ia.subVectors(s[0],s[1]).add(s[0]),l=Ia);const f=s[r%a],d=s[(r+1)%a];if(this.closed||r+2<a?h=s[(r+2)%a]:(Ia.subVectors(s[a-1],s[a-2]).add(s[a-1]),h=Ia),this.curveType==="centripetal"||this.curveType==="chordal"){const u=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),u),v=Math.pow(f.distanceToSquared(d),u),p=Math.pow(d.distanceToSquared(h),u);v<1e-4&&(v=1),g<1e-4&&(g=v),p<1e-4&&(p=v),Wo.initNonuniformCatmullRom(l.x,f.x,d.x,h.x,g,v,p),qo.initNonuniformCatmullRom(l.y,f.y,d.y,h.y,g,v,p),$o.initNonuniformCatmullRom(l.z,f.z,d.z,h.z,g,v,p)}else this.curveType==="catmullrom"&&(Wo.initCatmullRom(l.x,f.x,d.x,h.x,this.tension),qo.initCatmullRom(l.y,f.y,d.y,h.y,this.tension),$o.initCatmullRom(l.z,f.z,d.z,h.z,this.tension));return i.set(Wo.calc(c),qo.calc(c),$o.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new N().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Nc(n,e,t,i,s){const a=(i-e)*.5,o=(s-t)*.5,r=n*n,c=n*r;return(2*t-2*i+a+o)*c+(-3*t+3*i-2*a-o)*r+a*n+t}function Zg(n,e){const t=1-n;return t*t*e}function Qg(n,e){return 2*(1-n)*n*e}function ev(n,e){return n*n*e}function $s(n,e,t,i){return Zg(n,e)+Qg(n,t)+ev(n,i)}function tv(n,e){const t=1-n;return t*t*t*e}function nv(n,e){const t=1-n;return 3*t*t*n*e}function iv(n,e){return 3*(1-n)*n*n*e}function sv(n,e){return n*n*n*e}function Xs(n,e,t,i,s){return tv(n,e)+nv(n,t)+iv(n,i)+sv(n,s)}class Yh extends zn{constructor(e=new Me,t=new Me,i=new Me,s=new Me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new Me){const i=t,s=this.v0,a=this.v1,o=this.v2,r=this.v3;return i.set(Xs(e,s.x,a.x,o.x,r.x),Xs(e,s.y,a.y,o.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class av extends zn{constructor(e=new N,t=new N,i=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new N){const i=t,s=this.v0,a=this.v1,o=this.v2,r=this.v3;return i.set(Xs(e,s.x,a.x,o.x,r.x),Xs(e,s.y,a.y,o.y,r.y),Xs(e,s.z,a.z,o.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class jh extends zn{constructor(e=new Me,t=new Me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Me){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ov extends zn{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Kh extends zn{constructor(e=new Me,t=new Me,i=new Me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Me){const i=t,s=this.v0,a=this.v1,o=this.v2;return i.set($s(e,s.x,a.x,o.x),$s(e,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rv extends zn{constructor(e=new N,t=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new N){const i=t,s=this.v0,a=this.v1,o=this.v2;return i.set($s(e,s.x,a.x,o.x),$s(e,s.y,a.y,o.y),$s(e,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jh extends zn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Me){const i=t,s=this.points,a=(s.length-1)*e,o=Math.floor(a),r=a-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return i.set(Nc(r,c.x,l.x,h.x,f.x),Nc(r,c.y,l.y,h.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new Me().fromArray(s))}return this}}var Uc=Object.freeze({__proto__:null,ArcCurve:Kg,CatmullRomCurve3:Jg,CubicBezierCurve:Yh,CubicBezierCurve3:av,EllipseCurve:vl,LineCurve:jh,LineCurve3:ov,QuadraticBezierCurve:Kh,QuadraticBezierCurve3:rv,SplineCurve:Jh});class lv extends zn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Uc[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let a=0;for(;a<s.length;){if(s[a]>=i){const o=s[a]-i,r=this.curves[a],c=r.getLength(),l=c===0?0:1-o/c;return r.getPointAt(l,t)}a++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,a=this.curves;s<a.length;s++){const o=a[s],r=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(r);for(let l=0;l<c.length;l++){const h=c[l];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new Uc[s.type]().fromJSON(s))}return this}}class cv extends lv{constructor(e){super(),this.type="Path",this.currentPoint=new Me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new jh(this.currentPoint.clone(),new Me(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const a=new Kh(this.currentPoint.clone(),new Me(e,t),new Me(i,s));return this.curves.push(a),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,a,o){const r=new Yh(this.currentPoint.clone(),new Me(e,t),new Me(i,s),new Me(a,o));return this.curves.push(r),this.currentPoint.set(a,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Jh(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,a,o){const r=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+r,t+c,i,s,a,o),this}absarc(e,t,i,s,a,o){return this.absellipse(e,t,i,i,s,a,o),this}ellipse(e,t,i,s,a,o,r,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,i,s,a,o,r,c),this}absellipse(e,t,i,s,a,o,r,c){const l=new vl(e,t,i,s,a,o,r,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class oo extends $t{constructor(e=[new Me(0,-.5),new Me(.5,0),new Me(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=Pt(s,0,Math.PI*2);const a=[],o=[],r=[],c=[],l=[],h=1/t,f=new N,d=new Me,u=new N,g=new N,v=new N;let p=0,m=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:p=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,u.x=m*1,u.y=-p,u.z=m*0,v.copy(u),u.normalize(),c.push(u.x,u.y,u.z);break;case e.length-1:c.push(v.x,v.y,v.z);break;default:p=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,u.x=m*1,u.y=-p,u.z=m*0,g.copy(u),u.x+=v.x,u.y+=v.y,u.z+=v.z,u.normalize(),c.push(u.x,u.y,u.z),v.copy(g)}for(let y=0;y<=t;y++){const b=i+y*h*s,x=Math.sin(b),A=Math.cos(b);for(let S=0;S<=e.length-1;S++){f.x=e[S].x*x,f.y=e[S].y,f.z=e[S].x*A,o.push(f.x,f.y,f.z),d.x=y/t,d.y=S/(e.length-1),r.push(d.x,d.y);const w=c[3*S+0]*x,R=c[3*S+1],B=c[3*S+0]*A;l.push(w,R,B)}}for(let y=0;y<t;y++)for(let b=0;b<e.length-1;b++){const x=b+y*e.length,A=x,S=x+e.length,w=x+e.length+1,R=x+1;a.push(A,S,R),a.push(w,R,S)}this.setIndex(a),this.setAttribute("position",new ft(o,3)),this.setAttribute("uv",new ft(r,2)),this.setAttribute("normal",new ft(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oo(e.points,e.segments,e.phiStart,e.phiLength)}}class Un extends oo{constructor(e=1,t=1,i=4,s=8){const a=new cv;a.absarc(0,-t/2,e,Math.PI*1.5,0),a.absarc(0,t/2,e,0,Math.PI*.5),super(a.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:s}}static fromJSON(e){return new Un(e.radius,e.length,e.capSegments,e.radialSegments)}}class Sn extends $t{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const a=[],o=[],r=[],c=[],l=new N,h=new Me;o.push(0,0,0),r.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=t;f++,d+=3){const u=i+f/t*s;l.x=e*Math.cos(u),l.y=e*Math.sin(u),o.push(l.x,l.y,l.z),r.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let f=1;f<=t;f++)a.push(f,f+1,0);this.setIndex(a),this.setAttribute("position",new ft(o,3)),this.setAttribute("normal",new ft(r,3)),this.setAttribute("uv",new ft(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ht extends $t{constructor(e=1,t=1,i=1,s=32,a=1,o=!1,r=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:a,openEnded:o,thetaStart:r,thetaLength:c};const l=this;s=Math.floor(s),a=Math.floor(a);const h=[],f=[],d=[],u=[];let g=0;const v=[],p=i/2;let m=0;y(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new ft(f,3)),this.setAttribute("normal",new ft(d,3)),this.setAttribute("uv",new ft(u,2));function y(){const x=new N,A=new N;let S=0;const w=(t-e)/i;for(let R=0;R<=a;R++){const B=[],_=R/a,E=_*(t-e)+e;for(let D=0;D<=s;D++){const k=D/s,z=k*c+r,K=Math.sin(z),U=Math.cos(z);A.x=E*K,A.y=-_*i+p,A.z=E*U,f.push(A.x,A.y,A.z),x.set(K,w,U).normalize(),d.push(x.x,x.y,x.z),u.push(k,1-_),B.push(g++)}v.push(B)}for(let R=0;R<s;R++)for(let B=0;B<a;B++){const _=v[B][R],E=v[B+1][R],D=v[B+1][R+1],k=v[B][R+1];e>0&&(h.push(_,E,k),S+=3),t>0&&(h.push(E,D,k),S+=3)}l.addGroup(m,S,0),m+=S}function b(x){const A=g,S=new Me,w=new N;let R=0;const B=x===!0?e:t,_=x===!0?1:-1;for(let D=1;D<=s;D++)f.push(0,p*_,0),d.push(0,_,0),u.push(.5,.5),g++;const E=g;for(let D=0;D<=s;D++){const z=D/s*c+r,K=Math.cos(z),U=Math.sin(z);w.x=B*U,w.y=p*_,w.z=B*K,f.push(w.x,w.y,w.z),d.push(0,_,0),S.x=K*.5+.5,S.y=U*.5*_+.5,u.push(S.x,S.y),g++}for(let D=0;D<s;D++){const k=A+D,z=E+D;x===!0?h.push(z,z+1,k):h.push(z+1,z,k),R+=3}l.addGroup(m,R,x===!0?1:2),m+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ht(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zi extends ht{constructor(e=1,t=1,i=32,s=1,a=!1,o=0,r=Math.PI*2){super(0,e,t,i,s,a,o,r),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:r}}static fromJSON(e){return new zi(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ro extends $t{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const a=[],o=[];r(s),l(i),h(),this.setAttribute("position",new ft(a,3)),this.setAttribute("normal",new ft(a.slice(),3)),this.setAttribute("uv",new ft(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function r(y){const b=new N,x=new N,A=new N;for(let S=0;S<t.length;S+=3)u(t[S+0],b),u(t[S+1],x),u(t[S+2],A),c(b,x,A,y)}function c(y,b,x,A){const S=A+1,w=[];for(let R=0;R<=S;R++){w[R]=[];const B=y.clone().lerp(x,R/S),_=b.clone().lerp(x,R/S),E=S-R;for(let D=0;D<=E;D++)D===0&&R===S?w[R][D]=B:w[R][D]=B.clone().lerp(_,D/E)}for(let R=0;R<S;R++)for(let B=0;B<2*(S-R)-1;B++){const _=Math.floor(B/2);B%2===0?(d(w[R][_+1]),d(w[R+1][_]),d(w[R][_])):(d(w[R][_+1]),d(w[R+1][_+1]),d(w[R+1][_]))}}function l(y){const b=new N;for(let x=0;x<a.length;x+=3)b.x=a[x+0],b.y=a[x+1],b.z=a[x+2],b.normalize().multiplyScalar(y),a[x+0]=b.x,a[x+1]=b.y,a[x+2]=b.z}function h(){const y=new N;for(let b=0;b<a.length;b+=3){y.x=a[b+0],y.y=a[b+1],y.z=a[b+2];const x=p(y)/2/Math.PI+.5,A=m(y)/Math.PI+.5;o.push(x,1-A)}g(),f()}function f(){for(let y=0;y<o.length;y+=6){const b=o[y+0],x=o[y+2],A=o[y+4],S=Math.max(b,x,A),w=Math.min(b,x,A);S>.9&&w<.1&&(b<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),A<.2&&(o[y+4]+=1))}}function d(y){a.push(y.x,y.y,y.z)}function u(y,b){const x=y*3;b.x=e[x+0],b.y=e[x+1],b.z=e[x+2]}function g(){const y=new N,b=new N,x=new N,A=new N,S=new Me,w=new Me,R=new Me;for(let B=0,_=0;B<a.length;B+=9,_+=6){y.set(a[B+0],a[B+1],a[B+2]),b.set(a[B+3],a[B+4],a[B+5]),x.set(a[B+6],a[B+7],a[B+8]),S.set(o[_+0],o[_+1]),w.set(o[_+2],o[_+3]),R.set(o[_+4],o[_+5]),A.copy(y).add(b).add(x).divideScalar(3);const E=p(A);v(S,_+0,y,E),v(w,_+2,b,E),v(R,_+4,x,E)}}function v(y,b,x,A){A<0&&y.x===1&&(o[b]=y.x-1),x.x===0&&x.z===0&&(o[b]=A/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ro(e.vertices,e.indices,e.radius,e.details)}}class Qs extends ro{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=1/i,a=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(a,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Qs(e.radius,e.detail)}}class yl extends ro{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new yl(e.radius,e.detail)}}class et extends $t{constructor(e=1,t=32,i=16,s=0,a=Math.PI*2,o=0,r=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:a,thetaStart:o,thetaLength:r},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+r,Math.PI);let l=0;const h=[],f=new N,d=new N,u=[],g=[],v=[],p=[];for(let m=0;m<=i;m++){const y=[],b=m/i;let x=0;m===0&&o===0?x=.5/t:m===i&&c===Math.PI&&(x=-.5/t);for(let A=0;A<=t;A++){const S=A/t;f.x=-e*Math.cos(s+S*a)*Math.sin(o+b*r),f.y=e*Math.cos(o+b*r),f.z=e*Math.sin(s+S*a)*Math.sin(o+b*r),g.push(f.x,f.y,f.z),d.copy(f).normalize(),v.push(d.x,d.y,d.z),p.push(S+x,1-b),y.push(l++)}h.push(y)}for(let m=0;m<i;m++)for(let y=0;y<t;y++){const b=h[m][y+1],x=h[m][y],A=h[m+1][y],S=h[m+1][y+1];(m!==0||o>0)&&u.push(b,x,S),(m!==i-1||c<Math.PI)&&u.push(x,A,S)}this.setIndex(u),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(v,3)),this.setAttribute("uv",new ft(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new et(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ft extends $t{constructor(e=1,t=.4,i=12,s=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:a},i=Math.floor(i),s=Math.floor(s);const o=[],r=[],c=[],l=[],h=new N,f=new N,d=new N;for(let u=0;u<=i;u++)for(let g=0;g<=s;g++){const v=g/s*a,p=u/i*Math.PI*2;f.x=(e+t*Math.cos(p))*Math.cos(v),f.y=(e+t*Math.cos(p))*Math.sin(v),f.z=t*Math.sin(p),r.push(f.x,f.y,f.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(f,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(u/i)}for(let u=1;u<=i;u++)for(let g=1;g<=s;g++){const v=(s+1)*u+g-1,p=(s+1)*(u-1)+g-1,m=(s+1)*(u-1)+g,y=(s+1)*u+g;o.push(v,p,y),o.push(p,m,y)}this.setIndex(o),this.setAttribute("position",new ft(r,3)),this.setAttribute("normal",new ft(c,3)),this.setAttribute("uv",new ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ft(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ve extends Wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rh,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class qr extends Ve{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Me(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new He(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new He(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new He(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class hv extends $h{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class xl extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class dv extends xl{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Xo=new ut,Fc=new N,Oc=new N;class uv{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Me(512,512),this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fl,this._frameExtents=new Me(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Fc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fc),Oc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Oc),t.updateMatrixWorld(),Xo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Xo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class fv extends uv{constructor(){super(new pl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pv extends xl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new fv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class mv extends xl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class gv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Bc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Bc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Bc(){return performance.now()}const zc=new ut;class vv{constructor(e,t,i=0,s=1/0){this.ray=new io(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new ul,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return zc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zc),this}intersectObject(e,t=!0,i=[]){return $r(e,this,i,t),i.sort(Gc),i}intersectObjects(e,t=!0,i=[]){for(let s=0,a=e.length;s<a;s++)$r(e[s],this,i,t);return i.sort(Gc),i}}function Gc(n,e){return n.distance-e.distance}function $r(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const a=n.children;for(let o=0,r=a.length;o<r;o++)$r(a[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:il}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=il);function bv(n){const e=new $g({canvas:n,antialias:!0});return e.setPixelRatio(Math.min(2,devicePixelRatio||1)),e.shadowMap.enabled=!0,e.shadowMap.type=mh,e.toneMapping=vh,e.toneMappingExposure=1.05,e.outputColorSpace=rn,e}function Zh(n){const e=new Xg;return e.background=new He(n),e.fog=new gl(new He(n),90,200),e.add(new dv(16777215,9075290,.72)),e.add(new mv(7368816,.35)),e}function Qh(n,e,t){const i=new pv(16774104,1.65);i.position.set(e*.5-22,46,t*.5-30),i.castShadow=!0,i.shadow.mapSize.set(2048,2048);const s=i.shadow.camera,a=Math.max(e,t)*.62;return s.left=-a,s.right=a,s.top=a,s.bottom=-a,s.near=1,s.far=160,i.shadow.bias=-4e-4,i.shadow.normalBias=.04,i.shadow.radius=5,i.target.position.set(e*.5,0,t*.5),n.add(i,i.target),i}class _l{constructor(e,t){this.target=new N,this.goalTarget=new N,this.frustum=20,this.az=0,this.pol=.6,this.dist=80,this.bw=e,this.bh=t,this.camera=new pl(-1,1,1,-1,-60,300),this.target.set(e/2,0,t/2),this.goalTarget.copy(this.target),this.place()}place(){const e=Math.sin(this.pol)*this.dist,t=Math.cos(this.pol)*this.dist;this.camera.position.set(this.target.x+e*Math.sin(this.az),this.target.y+t,this.target.z+e*Math.cos(this.az)),this.camera.up.set(0,1,0),this.camera.lookAt(this.target)}resize(e,t){const i=e/t,s=this.frustum;this.camera.left=-s*i,this.camera.right=s*i,this.camera.top=s,this.camera.bottom=-s,this.camera.updateProjectionMatrix()}follow(e,t){const i=Math.min(this.bw*.28,9),s=Math.min(this.bh*.22,11);this.goalTarget.set(la.clamp(e,i,this.bw-i),0,la.clamp(t,s,this.bh-s))}setFrustum(e,t,i){this.frustum=la.clamp(e,9,34),this.resize(t,i)}zoomBy(e,t,i){this.setFrustum(this.frustum*e,t,i)}rotate(e){this.az-=e*.005,this.place()}tilt(e){this.pol=la.clamp(this.pol-e*.004,.18,1.05),this.place()}update(e){this.target.lerp(this.goalTarget,Math.min(1,e*3.2)),this.place()}}const ue=(n=0,e=0)=>({x:n,y:e}),an=(n,e)=>({x:n.x-e.x,y:n.y-e.y}),Ml=(n,e)=>({x:n.x*e,y:n.y*e}),en=n=>Math.hypot(n.x,n.y),ed=(n,e)=>Math.hypot(n.x-e.x,n.y-e.y),Qt=n=>{const e=Math.hypot(n.x,n.y)||1;return{x:n.x/e,y:n.y/e}},pi=(n,e,t)=>n<e?e:n>t?t:n,td={sidewalk:{fric:4.5,drag:.15},chalk:{fric:5,drag:.15},ice:{fric:2.2,drag:.05},cardboard:{fric:8,drag:.35},dirt:{fric:9.5,drag:.45},sand:{fric:17,drag:.9},grass:{fric:19,drag:1},mud:{fric:30,drag:1.8},water:{fric:7,drag:.5},ramp:{fric:6,drag:.2},push:{fric:11,drag:.5},out:{fric:24,drag:1},felt:{fric:6,drag:.22},frost:{fric:3.2,drag:.08},metal:{fric:5.2,drag:.16},carpet:{fric:12,drag:.75},gum:{fric:32,drag:2},magnet:{fric:6.5,drag:.2},vortex:{fric:6,drag:.2}},nd=.55,yv={weight:1,slide:1,stability:1,bounce:1,control:1,power:1,grip:1};function xv(n,e,t,i,s,a){return{id:n,name:e,skin:t,isAI:s,ai:a,stats:{...i},radius:.82,pos:ue(),vel:ue(),z:0,vz:0,airborne:!1,angle:Math.random()*6.28,angVel:0,bob:Math.random()*6.28,progress:0,checkpoint:0,cpPos:ue(),turnStart:ue(),preFlick:ue(),resetTo:ue(),consumed:new Set,takenBonus:new Set,flicksLeft:3,bonusFlicks:0,special10:!1,bombed:!1,holed:!1,skipTurns:0,finished:!1,place:0,lap:0,moving:!1,hitFlash:0,lastTurnProg:0,stuckTurns:0,rescues:0,rescueProg:0,team:-1,item:null,shield:!1,boostNext:1,eliminated:!1,itemFlash:0}}const _v=.42,Sl=27;function Xr(n){const e=n.n??2.2,t=Math.sin((n.ph||0)*.62),i=-Math.sin(n.dir||0),s=Math.cos(n.dir||0);return ue(n.x+i*t*e,n.y+s*t*e)}function id(n){const e=[];if(n.type==="band"){const t=Math.cos(n.dir||0)*n.r,i=Math.sin(n.dir||0)*n.r;e.push({a:ue(n.x-t,n.y-i),b:ue(n.x+t,n.y+i)})}else if(n.type==="mill"){const t=n.n===4?2:1;for(let i=0;i<t;i++){const s=(n.dir||0)+i*Math.PI/2,a=Math.cos(s)*n.r,o=Math.sin(s)*n.r;e.push({a:ue(n.x-a,n.y-o),b:ue(n.x+a,n.y+o)})}}return e}function Yo(n,e,t){const i=t.x-e.x,s=t.y-e.y,a=i*i+s*s||1e-6;let o=pi(((n.x-e.x)*i+(n.y-e.y)*s)/a,0,1);const r=e.x+i*o,c=e.y+s*o;return{d:Math.hypot(n.x-r,n.y-c),t:o,cx:r,cy:c}}function Mv(n,e,t,i){const s=(l,h,f)=>(l.x-h.x)*(f.y-h.y)-(l.y-h.y)*(f.x-h.x),a=s(t,i,n),o=s(t,i,e),r=s(n,e,t),c=s(n,e,i);return a>0!=o>0&&r>0!=c>0}class sd{constructor(e){this.arcs=[0],this.total=0,this.cell=5,this.cols=0,this.rows=0,this.grid=[],this.def=e;let t=0;for(let s=1;s<e.path.length;s++)t+=Math.hypot(e.path[s].x-e.path[s-1].x,e.path[s].y-e.path[s-1].y),this.arcs.push(t);this.total=t,this.cols=Math.ceil(e.w/this.cell)+1,this.rows=Math.ceil(e.h/this.cell)+1,this.grid=Array.from({length:this.cols*this.rows},()=>[]);const i=Math.max(...e.half)+2;for(let s=1;s<e.path.length;s++){const a=e.path[s-1],o=e.path[s],r=Math.min(a.x,o.x)-i,c=Math.max(a.x,o.x)+i,l=Math.min(a.y,o.y)-i,h=Math.max(a.y,o.y)+i;for(let f=Math.floor(l/this.cell);f<=Math.floor(h/this.cell);f++)for(let d=Math.floor(r/this.cell);d<=Math.floor(c/this.cell);d++)d<0||f<0||d>=this.cols||f>=this.rows||this.grid[f*this.cols+d].push(s)}}halfAt(e,t){const i=this.def.half;return i[e-1]*(1-t)+i[Math.min(e,i.length-1)]*t}nearest(e){const t=pi(Math.floor(e.x/this.cell),0,this.cols-1),i=pi(Math.floor(e.y/this.cell),0,this.rows-1);let s=this.grid[i*this.cols+t],a=1/0,o=0,r=this.def.half[0];if((l=>{for(const h of l){const f=Yo(e,this.def.path[h-1],this.def.path[h]);f.d<a&&(a=f.d,o=this.arcs[h-1]+f.t*(this.arcs[h]-this.arcs[h-1]),r=this.halfAt(h,f.t))}})(s),a===1/0)for(let l=1;l<this.def.path.length;l++){const h=Yo(e,this.def.path[l-1],this.def.path[l]);h.d<a&&(a=h.d,o=this.arcs[l-1]+h.t*(this.arcs[l]-this.arcs[l-1]),r=this.halfAt(l,h.t))}return{d:a,arc:o,half:r}}progressOf(e){return this.nearest(e).arc}atArc(e){const t=this.def.path;e=pi(e,0,this.total);let i=1;for(;i<t.length-1&&this.arcs[i]<e;)i++;const s=this.arcs[i]-this.arcs[i-1]||1,a=pi((e-this.arcs[i-1])/s,0,1),o=t[i-1],r=t[i];return{p:ue(o.x+(r.x-o.x)*a,o.y+(r.y-o.y)*a),tan:{x:(r.x-o.x)/s,y:(r.y-o.y)/s}}}inPad(e){for(const t of this.def.pads)if((e.x-t.x)**2+(e.y-t.y)**2<=t.r*t.r)return!0;return!1}surfaceAt(e){if(e.x<0||e.y<0||e.x>this.def.w||e.y>this.def.h)return"out";const t=this.nearest(e);if(!(t.d<=t.half||this.inPad(e)))return"out";let s=this.def.ground;for(const a of this.def.patches)a.r!=null?(e.x-a.x)**2+(e.y-a.y)**2<=a.r*a.r&&(s=a.surface):a.hw!=null&&a.hh!=null&&Math.abs(e.x-a.x)<=a.hw&&Math.abs(e.y-a.y)<=a.hh&&(s=a.surface);return s}patchAt(e){let t=null;for(const i of this.def.patches)i.r!=null?(e.x-i.x)**2+(e.y-i.y)**2<=i.r*i.r&&(t=i):i.hw!=null&&i.hh!=null&&Math.abs(e.x-i.x)<=i.hw&&Math.abs(e.y-i.y)<=i.hh&&(t=i);return t}collideWalls(e,t,i,s){let a=null;const o=(r,c,l)=>{e.x+=r*l,e.y+=c*l;const h=t.x*r+t.y*c;h<0&&(t.x-=(1+s)*h*r,t.y-=(1+s)*h*c),a={x:r,y:c}};for(const r of this.def.walls){const c=Yo(e,r.a,r.b);if(c.d<i){let l=e.x-c.cx,h=e.y-c.cy;const f=Math.hypot(l,h)||1;o(l/f,h/f,i-c.d+.01)}}return a}obstacleAt(e,t){for(const i of this.def.obstacles){const s=i.r+(i.type==="stone"?t:t*.5);if((e.x-i.x)**2+(e.y-i.y)**2<=s*s)return i}return null}crossedFinish(e,t){return Mv(e,t,this.def.finish[0],this.def.finish[1])}}const Sv=26;function Qe(n,e,t,i,s,a,o){n.fillStyle=s;for(let r=0;r<i;r++){n.globalAlpha=a*(.4+Math.random()*.6);const c=Math.random()*e,l=Math.random()*t,h=o*(.5+Math.random());n.beginPath(),n.arc(c,l,h,0,7),n.fill()}n.globalAlpha=1}const Hc={dirt(n,e,t){n.fillStyle="#8a6a44",n.fillRect(0,0,e,t),Qe(n,e,t,2600,"#6f5334",.5,2.2),Qe(n,e,t,1400,"#a07f52",.4,2.4),Qe(n,e,t,500,"#4f3a1f",.45,3.4),Qe(n,e,t,120,"#3a2810",.35,5.5)},sand(n,e,t){n.fillStyle="#e6c98a",n.fillRect(0,0,e,t),Qe(n,e,t,3200,"#d3b273",.4,1.7),Qe(n,e,t,900,"#f3ddab",.5,2),n.strokeStyle="rgba(198,168,108,0.22)",n.lineWidth=2;for(let i=0;i<t;i+=24){n.beginPath();for(let s=0;s<e;s+=22)n.lineTo(s,i+Math.sin(s*.02+i*.1)*4);n.stroke()}},sidewalk(n,e,t){n.fillStyle="#b9b3a6",n.fillRect(0,0,e,t),Qe(n,e,t,1800,"#a49e90",.35,2.4),Qe(n,e,t,700,"#cfc9bc",.35,2.2),n.strokeStyle="rgba(120,114,100,0.5)",n.lineWidth=3;for(let i=0;i<t;i+=Sv*6)n.beginPath(),n.moveTo(0,i),n.lineTo(e,i+(Math.random()-.5)*10),n.stroke();n.strokeStyle="rgba(90,84,72,0.35)",n.lineWidth=1.4;for(let i=0;i<8;i++){n.beginPath();let s=Math.random()*e,a=Math.random()*t;n.moveTo(s,a);for(let o=0;o<4;o++)s+=(Math.random()-.5)*90,a+=(Math.random()-.5)*90,n.lineTo(s,a);n.stroke()}},cardboard(n,e,t){n.fillStyle="#cba875",n.fillRect(0,0,e,t),Qe(n,e,t,1200,"#b9915f",.4,2.2),n.strokeStyle="rgba(150,110,70,0.26)",n.lineWidth=2;for(let i=0;i<e;i+=10)n.beginPath(),n.moveTo(i,0),n.lineTo(i,t),n.stroke();n.fillStyle="rgba(214,204,184,0.45)";for(let i=0;i<5;i++)n.save(),n.translate(Math.random()*e,Math.random()*t),n.rotate(Math.random()*3),n.fillRect(-42,-8,84,16),n.restore()},grass(n,e,t){n.fillStyle="#4f7d30",n.fillRect(0,0,e,t),Qe(n,e,t,2200,"#3e6626",.5,2.6),Qe(n,e,t,1200,"#6f9c40",.5,2.2),n.lineWidth=1.4;const i=Math.min(6e3,Math.floor(e*t/1100));for(let s=0;s<i;s++){const a=Math.random()*e,o=Math.random()*t,r=Math.random();n.strokeStyle=r<.45?"#3c6322":r<.8?"#6fa840":"#84c052",n.beginPath(),n.moveTo(a,o),n.lineTo(a+(Math.random()-.5)*4,o-4-Math.random()*5),n.stroke()}},felt(n,e,t){n.fillStyle="#2e7d4b",n.fillRect(0,0,e,t),Qe(n,e,t,2600,"#256b3e",.45,2),Qe(n,e,t,1400,"#3a915c",.4,1.8),Qe(n,e,t,400,"#1d5a33",.4,3),n.strokeStyle="rgba(210,240,220,0.06)",n.lineWidth=8;for(let i=0;i<7;i++){const s=Math.random()*t;n.beginPath(),n.moveTo(0,s),n.lineTo(e,s+(Math.random()-.5)*120),n.stroke()}n.strokeStyle="rgba(20,60,35,0.20)",n.lineWidth=2;for(let i=0;i<5;i++){const s=Math.random()*e,a=Math.random()*t;n.beginPath(),n.moveTo(s,a),n.lineTo(s+(Math.random()-.5)*260,a+(Math.random()-.5)*260),n.stroke()}},frost(n,e,t){const i=n.createLinearGradient(0,0,e,t);i.addColorStop(0,"#dcecf4"),i.addColorStop(.5,"#c8dfea"),i.addColorStop(1,"#d4e8f2"),n.fillStyle=i,n.fillRect(0,0,e,t),Qe(n,e,t,2200,"#b6d4e2",.4,2.2),Qe(n,e,t,1600,"#f2fbff",.5,1.6),n.strokeStyle="rgba(255,255,255,0.55)",n.lineWidth=1.6,n.lineCap="round";for(let s=0;s<26;s++){let a=Math.random()*e,o=Math.random()*t,r=Math.random()*6.28;for(let c=0;c<5;c++){const l=a+Math.cos(r)*26,h=o+Math.sin(r)*26;n.beginPath(),n.moveTo(a,o),n.lineTo(l,h),n.stroke(),n.beginPath(),n.moveTo((a+l)/2,(o+h)/2),n.lineTo((a+l)/2+Math.cos(r+.9)*12,(o+h)/2+Math.sin(r+.9)*12),n.stroke(),a=l,o=h,r+=(Math.random()-.5)*.7}}n.fillStyle="rgba(255,255,255,0.9)";for(let s=0;s<320;s++)n.globalAlpha=.3+Math.random()*.55,n.beginPath(),n.arc(Math.random()*e,Math.random()*t,1+Math.random()*1.6,0,7),n.fill();n.globalAlpha=1},metal(n,e,t){n.fillStyle="#9aa4ac",n.fillRect(0,0,e,t);for(let i=0;i<t;i+=3)n.globalAlpha=.05+Math.random()*.09,n.fillStyle=Math.random()<.5?"#7e8890":"#c2ccd4",n.fillRect(0,i,e,2);n.globalAlpha=1,n.strokeStyle="rgba(60,68,76,0.35)",n.lineWidth=1.4;for(let i=0;i<10;i++){const s=Math.random()*e,a=Math.random()*t;n.beginPath(),n.moveTo(s,a),n.lineTo(s+(Math.random()-.5)*220,a+(Math.random()-.5)*40),n.stroke()}for(let i=0;i<26;i++){const s=Math.random()*e,a=Math.random()*t;n.fillStyle="#78828a",n.beginPath(),n.arc(s,a,7,0,7),n.fill(),n.fillStyle="#cdd7de",n.beginPath(),n.arc(s-2,a-2,3.4,0,7),n.fill()}},carpet(n,e,t){n.fillStyle="#a05648",n.fillRect(0,0,e,t),Qe(n,e,t,2400,"#8a4438",.5,2.4),Qe(n,e,t,1600,"#b96a58",.45,2),n.lineWidth=1.6;const i=Math.min(7e3,Math.floor(e*t/950));for(let s=0;s<i;s++){const a=Math.random()*e,o=Math.random()*t,r=Math.random()*6.28,c=Math.random();n.strokeStyle=c<.4?"#7e3c30":c<.8?"#b56553":"#cd8068",n.beginPath(),n.moveTo(a,o),n.lineTo(a+Math.cos(r)*5,o+Math.sin(r)*5),n.stroke()}n.strokeStyle="rgba(60,25,18,0.14)",n.lineWidth=3;for(let s=0;s<t;s+=54)n.beginPath(),n.moveTo(0,s),n.lineTo(e,s),n.stroke();for(let s=0;s<e;s+=54)n.beginPath(),n.moveTo(s,0),n.lineTo(s,t),n.stroke()},mud:()=>{},water:()=>{},ramp:()=>{},push:()=>{},chalk:()=>{},ice:()=>{},out:()=>{},gum:()=>{},magnet:()=>{},vortex:()=>{},wetdirt(n,e,t){n.fillStyle="#5f4c30",n.fillRect(0,0,e,t),Qe(n,e,t,3e3,"#4a3a22",.55,2.4),Qe(n,e,t,1200,"#6f5a3a",.4,2),Qe(n,e,t,400,"#33260f",.5,3.6);for(let i=0;i<26;i++)n.globalAlpha=.1+Math.random()*.12,n.fillStyle="#b8d4e2",n.beginPath(),n.ellipse(Math.random()*e,Math.random()*t,26+Math.random()*70,8+Math.random()*18,Math.random()*3,0,7),n.fill();n.globalAlpha=1;for(let i=0;i<30;i++)n.fillStyle=Math.random()<.5?"#5f8a36":"#3f5c22",n.globalAlpha=.6,n.beginPath(),n.ellipse(Math.random()*e,Math.random()*t,7,3.5,Math.random()*3,0,7),n.fill();n.globalAlpha=1},garden(n,e,t){n.fillStyle="#5c4a2e",n.fillRect(0,0,e,t),Qe(n,e,t,2600,"#4a3a20",.5,2.2),Qe(n,e,t,1e3,"#6f5c3a",.4,2);for(let s=0;s<60;s++)n.globalAlpha=.16+Math.random()*.18,n.fillStyle=Math.random()<.5?"#4f7d30":"#3e6626",n.beginPath(),n.arc(Math.random()*e,Math.random()*t,14+Math.random()*34,0,7),n.fill();n.globalAlpha=1,n.lineWidth=1.4;const i=Math.min(3200,Math.floor(e*t/2100));for(let s=0;s<i;s++){const a=Math.random()*e,o=Math.random()*t;n.strokeStyle=Math.random()<.5?"#5f9a38":"#7bbd4a",n.beginPath(),n.moveTo(a,o),n.lineTo(a+(Math.random()-.5)*4,o-4-Math.random()*4),n.stroke()}},cement(n,e,t){n.fillStyle="#a29a8a",n.fillRect(0,0,e,t),Qe(n,e,t,1600,"#948c7c",.35,2.4),Qe(n,e,t,700,"#b4ac9c",.35,2.2),n.strokeStyle="rgba(120,112,98,0.22)",n.lineWidth=7;for(let i=0;i<12;i++){const s=Math.random()*e,a=Math.random()*t,o=40+Math.random()*90;n.beginPath(),n.arc(s,a,o,Math.random()*3,Math.random()*3+2.2),n.stroke()}n.strokeStyle="rgba(80,74,62,0.5)",n.lineWidth=2.4;for(let i=160;i<e;i+=220)n.beginPath(),n.moveTo(i,0),n.lineTo(i+(Math.random()-.5)*16,t),n.stroke();for(let i=0;i<240;i++)n.globalAlpha=.4,n.fillStyle=Math.random()<.5?"#7e7668":"#c2baa8",n.beginPath(),n.arc(Math.random()*e,Math.random()*t,1.6+Math.random()*2.4,0,7),n.fill();n.globalAlpha=1},clay(n,e,t){n.fillStyle="#9a5a34",n.fillRect(0,0,e,t),Qe(n,e,t,2600,"#7e441f",.5,2.4),Qe(n,e,t,1200,"#b06a40",.4,2.2),Qe(n,e,t,300,"#5f3014",.5,4),n.lineCap="round";for(let i=0;i<4;i++){const s=Math.random()*t,a=20+Math.random()*40,o=Math.random()*6;for(const r of[0,26]){n.strokeStyle="rgba(94,48,20,0.55)",n.lineWidth=9,n.beginPath();for(let c=0;c<=e;c+=24)n.lineTo(c,s+r+Math.sin(c*.008+o)*a);n.stroke(),n.strokeStyle="rgba(60,28,10,0.35)",n.lineWidth=3,n.beginPath();for(let c=0;c<=e;c+=24)n.lineTo(c,s+r+Math.sin(c*.008+o)*a);n.stroke()}}n.strokeStyle="rgba(70,32,12,0.4)",n.lineWidth=1.6;for(let i=0;i<14;i++){let s=Math.random()*e,a=Math.random()*t;n.beginPath(),n.moveTo(s,a);for(let o=0;o<4;o++)s+=(Math.random()-.5)*60,a+=(Math.random()-.5)*60,n.lineTo(s,a);n.stroke()}},gingham(n,e,t){n.fillStyle="#f4ede0",n.fillRect(0,0,e,t);const i=52;n.fillStyle="rgba(200,70,64,0.55)";for(let s=0;s<e;s+=i*2)n.fillRect(s,0,i,t);for(let s=0;s<t;s+=i*2)n.fillRect(0,s,e,i);n.globalAlpha=.1,n.strokeStyle="#8a4038",n.lineWidth=1;for(let s=0;s<e;s+=4)n.beginPath(),n.moveTo(s,0),n.lineTo(s,t),n.stroke();for(let s=0;s<t;s+=4)n.beginPath(),n.moveTo(0,s),n.lineTo(e,s),n.stroke();n.globalAlpha=1},stripes(n,e,t){const i=["#3f9a5c","#f2e2b0"];for(let a=-t,o=0;a<e+t;a+=74,o++)n.fillStyle=i[o%2],n.beginPath(),n.moveTo(a,0),n.lineTo(a+74,0),n.lineTo(a+74-t*.35,t),n.lineTo(a-t*.35,t),n.closePath(),n.fill();Qe(n,e,t,1600,"#5a4a2e",.14,2.2),n.strokeStyle="rgba(90,74,46,0.3)",n.lineWidth=2;for(let a=0;a<5;a++){const o=Math.random()*e,r=Math.random()*t;n.strokeRect(o,r,60+Math.random()*60,40+Math.random()*40)}},planks(n,e,t){n.fillStyle="#8a5a34",n.fillRect(0,0,e,t);const i=64;for(let s=0,a=0;s<t;s+=i,a++){n.fillStyle=a%2?"rgba(122,74,38,0.5)":"rgba(154,102,56,0.5)",n.fillRect(0,s,e,i),n.strokeStyle="rgba(60,36,16,0.6)",n.lineWidth=3,n.beginPath(),n.moveTo(0,s),n.lineTo(e,s),n.stroke(),n.strokeStyle="rgba(70,42,20,0.30)",n.lineWidth=1.6;for(let r=0;r<4;r++){const c=s+10+Math.random()*(i-20);n.beginPath();for(let l=0;l<=e;l+=30)n.lineTo(l,c+Math.sin(l*.02+r)*3);n.stroke()}const o=200+Math.random()*300;n.strokeStyle="rgba(60,36,16,0.55)",n.lineWidth=2.6;for(let r=o;r<e;r+=o)n.beginPath(),n.moveTo(r+(a%2?90:0),s),n.lineTo(r+(a%2?90:0),s+i),n.stroke()}for(let s=0;s<12;s++)n.fillStyle="rgba(56,32,14,0.6)",n.beginPath(),n.ellipse(Math.random()*e,Math.random()*t,5+Math.random()*5,3+Math.random()*3,Math.random()*3,0,7),n.fill()},slab(n,e,t){n.fillStyle="#a4756b",n.fillRect(0,0,e,t),Qe(n,e,t,2e3,"#916359",.4,2.4),Qe(n,e,t,800,"#b8857a",.35,2),n.strokeStyle="rgba(70,48,42,0.55)",n.lineWidth=3;const i=240,s=200;for(let a=i;a<e;a+=i)n.beginPath(),n.moveTo(a,0),n.lineTo(a+(Math.random()-.5)*10,t),n.stroke();for(let a=s;a<t;a+=s)n.beginPath(),n.moveTo(0,a),n.lineTo(e,a+(Math.random()-.5)*10),n.stroke();for(let a=0;a<8;a++)n.globalAlpha=.35,n.fillStyle="#3a2e2a",n.beginPath(),n.ellipse(Math.random()*e,Math.random()*t,24+Math.random()*40,16+Math.random()*26,Math.random()*3,0,7),n.fill();n.globalAlpha=1;for(let a=0;a<20;a++)n.globalAlpha=.3,n.fillStyle="#d8cfc2",n.beginPath(),n.ellipse(Math.random()*e,Math.random()*t,10+Math.random()*16,4+Math.random()*6,Math.random()*3,0,7),n.fill();n.globalAlpha=1},tiles(n,e,t){n.fillStyle="#bcdce4",n.fillRect(0,0,e,t);const i=44;for(let s=0;s<t;s+=i)for(let a=0;a<e;a+=i){const o=Math.random();n.fillStyle=o<.08?"#5f9ab8":o<.2?"#a4ccd8":o<.3?"#cde8ee":"#bcdce4",n.fillRect(a,s,i,i),n.fillStyle="rgba(255,255,255,0.35)",n.fillRect(a+4,s+4,i*.4,i*.16)}n.strokeStyle="rgba(120,150,160,0.75)",n.lineWidth=2.6;for(let s=0;s<=e;s+=i)n.beginPath(),n.moveTo(s,0),n.lineTo(s,t),n.stroke();for(let s=0;s<=t;s+=i)n.beginPath(),n.moveTo(0,s),n.lineTo(e,s),n.stroke()},dunes(n,e,t){const i=n.createLinearGradient(0,0,e,t);i.addColorStop(0,"#d59a52"),i.addColorStop(1,"#c9884a"),n.fillStyle=i,n.fillRect(0,0,e,t);for(let s=0;s<9;s++){const a=(s+.5)*t/9,o=26+Math.random()*30,r=Math.random()*6;n.fillStyle="rgba(150,92,40,0.30)",n.beginPath(),n.moveTo(0,a);for(let c=0;c<=e;c+=26)n.lineTo(c,a+Math.sin(c*.006+r)*o);for(let c=e;c>=0;c-=26)n.lineTo(c,a+30+Math.sin(c*.006+r)*o);n.closePath(),n.fill(),n.strokeStyle="rgba(244,214,160,0.55)",n.lineWidth=4,n.lineCap="round",n.beginPath();for(let c=0;c<=e;c+=26)n.lineTo(c,a+Math.sin(c*.006+r)*o);n.stroke()}Qe(n,e,t,2200,"#b9773c",.35,1.8),Qe(n,e,t,900,"#ecc084",.4,1.8)}};function Ev(n,e){const t=Math.sin(n*12.9898+e*78.233)*43758.5453;return t-Math.floor(t)}function wv(n,e,t,i,s){n.beginPath();for(let o=0;o<=22;o++){const r=o/22*Math.PI*2,c=.8+.2*Math.sin(r*3+s*6.283)+.1*Math.sin(r*5-s*9),l=i*c,h=e+Math.cos(r)*l,f=t+Math.sin(r)*l;o?n.lineTo(h,f):n.moveTo(h,f)}n.closePath()}function Tv(n,e,t,i,s,a){n.beginPath();for(let r=0;r<=26;r++){const c=r/26*Math.PI*2,l=1+.12*Math.sin(c*4+a*6.283),h=e+Math.cos(c)*i*l,f=t+Math.sin(c)*s*l;r?n.lineTo(h,f):n.moveTo(h,f)}n.closePath()}function Av(n,e,t,i){const[s,a]=t(e.x,e.y),o=e.r==null&&e.hw!=null&&e.hh!=null,r=(e.hw??e.r??1)*i,c=(e.hh??e.r??1)*i,l=Math.max(r,c),h=Ev(Math.round(e.x*1.7),Math.round(e.y*1.3)),f=e.surface,d=()=>o?Tv(n,s,a,r,c,h):wv(n,s,a,(e.r??1)*i,h);if(f==="ramp"||f==="push"){n.save(),n.beginPath(),n.arc(s,a,l,0,7),n.clip(),n.save(),n.translate(s,a),n.rotate(1.57-(e.dir??-1.57));const p=n.createLinearGradient(0,l,0,-l);f==="ramp"?(p.addColorStop(0,"#1f7a3a"),p.addColorStop(1,"#43c463")):(p.addColorStop(0,"#8a1810"),p.addColorStop(1,"#ef5a5f")),n.fillStyle=p,n.fillRect(-l,-l,l*2,l*2),n.strokeStyle="rgba(255,255,255,0.95)",n.lineWidth=l*.16,n.lineCap="round",n.lineJoin="round";for(let m=-1;m<=1;m++){const y=m*l*.52;n.beginPath(),n.moveTo(-l*.5,y+l*.24),n.lineTo(0,y-l*.24),n.lineTo(l*.5,y+l*.24),n.stroke()}n.restore(),n.restore();return}let u=Math.sin((h+1)*99.13)*9999;const g=()=>(u=Math.sin(u)*9999,u-Math.floor(u));n.save(),d(),n.clip();const v=p=>{n.fillStyle=p,n.fillRect(s-l,a-l,l*2,l*2)};if(f==="sand"){const p=n.createRadialGradient(s,a-l*.2,l*.2,s,a,l);p.addColorStop(0,"#f0d79a"),p.addColorStop(1,"#d6b271"),n.fillStyle=p,n.fillRect(s-l,a-l,l*2,l*2),n.lineWidth=Math.max(1.5,i*.1),n.lineCap="round";for(let m=0;m<6;m++){const y=a-l+(m+g())*l*.34;n.strokeStyle=m%2?"rgba(255,246,214,0.5)":"rgba(180,150,96,0.45)",n.beginPath();for(let b=s-l;b<=s+l;b+=i*.4)n.lineTo(b,y+Math.sin(b*.05+m)*i*.5);n.stroke()}for(let m=0;m<240;m++)n.globalAlpha=.35,n.fillStyle=g()<.5?"#c9a86a":"#fdeec4",n.beginPath(),n.arc(s+(g()-.5)*l*2,a+(g()-.5)*l*2,i*.06,0,7),n.fill();n.globalAlpha=1}else if(f==="mud"){const p=n.createRadialGradient(s-l*.2,a-l*.2,l*.1,s,a,l);p.addColorStop(0,"#6b4d2a"),p.addColorStop(.7,"#4a3418"),p.addColorStop(1,"#33240f"),n.fillStyle=p,n.fillRect(s-l,a-l,l*2,l*2);for(let y=0;y<16;y++)n.fillStyle=g()<.5?"rgba(92,68,38,0.7)":"rgba(38,26,12,0.6)",n.beginPath(),n.arc(s+(g()-.5)*l*1.5,a+(g()-.5)*l*1.5,i*(.14+g()*.36),0,7),n.fill();const m=n.createRadialGradient(s-l*.3,a-l*.35,0,s-l*.3,a-l*.35,l*.85);m.addColorStop(0,"rgba(255,240,200,0.28)"),m.addColorStop(1,"rgba(255,240,200,0)"),n.fillStyle=m,n.fillRect(s-l,a-l,l*2,l*2)}else if(f==="water"){const p=n.createRadialGradient(s,a,l*.15,s,a,l);p.addColorStop(0,"rgba(120,200,235,0.92)"),p.addColorStop(.7,"rgba(70,150,200,0.92)"),p.addColorStop(1,"rgba(40,110,165,0.94)"),n.fillStyle=p,n.fillRect(s-l,a-l,l*2,l*2),n.strokeStyle="rgba(255,255,255,0.42)",n.lineWidth=Math.max(1.2,i*.07);for(let m=1;m<=5;m++)n.globalAlpha=.5-m*.06,n.beginPath(),n.arc(s-l*.15,a-l*.1,l*(.18+m*.16),.3,2.5),n.stroke();n.globalAlpha=1,n.fillStyle="rgba(255,255,255,0.55)",n.beginPath(),n.ellipse(s-l*.35,a-l*.4,l*.28,l*.09,-.5,0,7),n.fill();for(let m=0;m<8;m++)n.fillStyle="rgba(255,255,255,0.5)",n.beginPath(),n.arc(s+(g()-.5)*l*1.6,a+(g()-.5)*l*1.6,i*.05,0,7),n.fill()}else if(f==="grass"){v("#4d7a2e");for(let p=0;p<200;p++){const m=s+(g()-.5)*l*2,y=a+(g()-.5)*l*2,b=i*(.3+g()*.5);n.strokeStyle=g()<.4?"#3c6322":g()<.8?"#5f9a38":"#7bbd4a",n.lineWidth=Math.max(1,i*.05),n.beginPath(),n.moveTo(m,y),n.lineTo(m+(g()-.5)*i*.3,y-b),n.stroke()}}else if(f==="ice"){const p=n.createRadialGradient(s-l*.25,a-l*.3,l*.1,s,a,l);p.addColorStop(0,"rgba(235,250,255,0.95)"),p.addColorStop(.6,"rgba(185,228,248,0.92)"),p.addColorStop(1,"rgba(140,200,235,0.94)"),n.fillStyle=p,n.fillRect(s-l,a-l,l*2,l*2),n.strokeStyle="rgba(255,255,255,0.75)",n.lineWidth=Math.max(1,i*.055),n.lineCap="round";for(let m=0;m<5;m++){let y=s+(g()-.5)*l,b=a+(g()-.5)*l;n.beginPath(),n.moveTo(y,b);for(let x=0;x<3;x++)y+=(g()-.5)*l*.9,b+=(g()-.5)*l*.9,n.lineTo(y,b);n.stroke()}n.fillStyle="rgba(255,255,255,0.8)",n.beginPath(),n.ellipse(s-l*.3,a-l*.35,l*.3,l*.1,-.6,0,7),n.fill(),n.strokeStyle="rgba(120,180,220,0.5)",n.lineWidth=Math.max(1,i*.04);for(let m=0;m<4;m++)n.beginPath(),n.arc(s+(g()-.5)*l,a+(g()-.5)*l,l*(.1+g()*.2),g()*3,g()*3+2),n.stroke()}else if(f==="gum"){const p=n.createRadialGradient(s-l*.25,a-l*.3,l*.1,s,a,l);p.addColorStop(0,"#ff9ec4"),p.addColorStop(.6,"#f272a8"),p.addColorStop(1,"#d64f8b"),n.fillStyle=p,n.fillRect(s-l,a-l,l*2,l*2),n.strokeStyle="rgba(255,210,230,0.75)",n.lineWidth=Math.max(1.4,i*.07),n.lineCap="round";for(let m=0;m<6;m++){const y=s+(g()-.5)*l*1.4,b=a+(g()-.5)*l*1.4;n.beginPath(),n.moveTo(y,b),n.quadraticCurveTo(y+(g()-.5)*l,b+(g()-.5)*l,y+(g()-.5)*l*1.4,b+(g()-.5)*l*1.4),n.stroke()}for(let m=0;m<7;m++)n.fillStyle="rgba(255,190,215,0.55)",n.beginPath(),n.arc(s+(g()-.5)*l*1.5,a+(g()-.5)*l*1.5,i*(.1+g()*.22),0,7),n.fill();n.fillStyle="rgba(255,255,255,0.65)",n.beginPath(),n.ellipse(s-l*.3,a-l*.38,l*.26,l*.09,-.5,0,7),n.fill()}else if(f==="magnet"){const p=n.createRadialGradient(s-l*.2,a-l*.25,l*.1,s,a,l);p.addColorStop(0,"#c3ccd4"),p.addColorStop(.7,"#98a3ac"),p.addColorStop(1,"#7c868e"),n.fillStyle=p,n.fillRect(s-l,a-l,l*2,l*2),n.strokeStyle="rgba(210,60,60,0.55)",n.lineWidth=Math.max(1.6,i*.09),n.setLineDash([i*.4,i*.32]);for(let m=1;m<=3;m++)n.beginPath(),n.arc(s,a,l*(.32+m*.2),0,7),n.stroke();n.setLineDash([]),n.save(),n.translate(s,a),n.rotate(h*6.283),n.lineCap="butt",n.strokeStyle="#d33c3c",n.lineWidth=l*.24,n.beginPath(),n.arc(0,0,l*.34,.6,Math.PI*2-.6),n.stroke(),n.fillStyle="#e8eef2";for(const m of[.6,-.6]){const y=Math.cos(m)*l*.34,b=Math.sin(m)*l*.34;n.save(),n.translate(y,b),n.rotate(m+1.57),n.fillRect(-l*.13,-l*.1,l*.26,l*.2),n.restore()}n.restore()}else if(f==="vortex"){const p=n.createRadialGradient(s,a,l*.05,s,a,l);p.addColorStop(0,"rgba(30,80,120,0.9)"),p.addColorStop(.55,"rgba(70,140,190,0.85)"),p.addColorStop(1,"rgba(120,185,225,0.8)"),n.fillStyle=p,n.fillRect(s-l,a-l,l*2,l*2);const m=Math.sin(e.x*3.7+e.y*2.3)>=0?1:-1;n.lineCap="round";for(let y=0;y<3;y++){n.strokeStyle=y?"rgba(255,255,255,0.55)":"rgba(255,255,255,0.8)",n.lineWidth=Math.max(2,i*(.16-y*.03)),n.beginPath();const b=h*6.283+y*2.09;for(let x=0;x<=1;x+=.04){const A=b+m*x*4.4,S=l*(.12+x*.8),w=s+Math.cos(A)*S,R=a+Math.sin(A)*S;x?n.lineTo(w,R):n.moveTo(w,R)}if(n.stroke(),y===0){const x=b+m*4.4,A=l*.92,S=s+Math.cos(x)*A,w=a+Math.sin(x)*A,R=x+m*1.62;n.fillStyle="rgba(255,255,255,0.85)",n.beginPath(),n.moveTo(S+Math.cos(R)*i*.5,w+Math.sin(R)*i*.5),n.lineTo(S+Math.cos(R+2.5)*i*.34,w+Math.sin(R+2.5)*i*.34),n.lineTo(S+Math.cos(R-2.5)*i*.34,w+Math.sin(R-2.5)*i*.34),n.closePath(),n.fill()}}n.fillStyle="rgba(15,45,75,0.9)",n.beginPath(),n.arc(s,a,l*.1,0,7),n.fill()}else if(f==="chalk"){n.fillStyle="rgba(240,240,245,0.14)",n.fillRect(s-l,a-l,l*2,l*2);const p=["#ff8fb0","#8fd0ff","#ffe38f","#a0ffb0","#c9a0ff"];for(let m=0;m<5;m++){n.strokeStyle=p[m%p.length],n.globalAlpha=.55,n.lineWidth=i*.14,n.lineCap="round";const y=s+(g()-.5)*l,b=a+(g()-.5)*l;n.beginPath(),n.moveTo(y,b),n.lineTo(y+(g()-.5)*l,b+(g()-.5)*l),n.stroke()}n.globalAlpha=1}else if(f==="cardboard"){v("#cba875"),n.strokeStyle="rgba(150,110,70,0.32)",n.lineWidth=i*.12;for(let p=s-l;p<s+l;p+=i*.55)n.beginPath(),n.moveTo(p,a-l),n.lineTo(p,a+l),n.stroke()}else if(f==="sidewalk"){v("#c6c0b2");for(let p=0;p<60;p++)n.globalAlpha=.3,n.fillStyle=g()<.5?"#b0a99a":"#dad4c6",n.beginPath(),n.arc(s+(g()-.5)*l*2,a+(g()-.5)*l*2,i*.07,0,7),n.fill();n.globalAlpha=1,n.strokeStyle="rgba(120,114,100,0.5)",n.lineWidth=i*.08,n.beginPath(),n.moveTo(s-l,a+(g()-.5)*l),n.lineTo(s+l,a+(g()-.5)*l),n.stroke()}else v("#c9bfa8");n.restore(),n.save(),d(),n.lineWidth=Math.max(2,i*.16),n.strokeStyle=f==="water"?"rgba(20,70,110,0.5)":f==="ice"?"rgba(90,150,200,0.55)":f==="gum"?"rgba(160,40,95,0.6)":f==="magnet"?"rgba(55,62,70,0.65)":f==="vortex"?"rgba(25,70,110,0.6)":"rgba(0,0,0,0.2)",n.stroke(),n.restore()}function Cv(n){const e=n.path,t=n.half,i=[],s=[];for(let a=0;a<e.length;a++){const o=e[Math.max(0,a-1)],r=e[Math.min(e.length-1,a+1)];let c=-(r.y-o.y),l=r.x-o.x;const h=Math.hypot(c,l)||1;c/=h,l/=h;const f=t[a];i.push([e[a].x+c*f,e[a].y+l*f]),s.push([e[a].x-c*f,e[a].y-l*f])}return{L:i,R:s}}function Rv(n){const e=Math.max(n.w,n.h),t=Math.max(9,Math.min(30,Math.floor(3800/e))),i=Math.round(n.w*t),s=Math.round(n.h*t),a=document.createElement("canvas");a.width=i,a.height=s;const o=a.getContext("2d"),r=(b,x)=>[b*t,s-x*t],c=()=>(Hc[n.paint||n.ground]||Hc.dirt)(o,i,s);c();const{L:l,R:h}=Cv(n),f=new Path2D;for(let b=0;b<n.path.length;b++){const[x,A]=r(n.path[b].x,n.path[b].y),S=n.half[b]*t;f.moveTo(x+S,A),f.arc(x,A,S,0,Math.PI*2)}for(const b of n.pads){const[x,A]=r(b.x,b.y),S=b.r*t;f.moveTo(x+S,A),f.arc(x,A,S,0,Math.PI*2)}const d=n.paint==="gingham"||n.paint==="stripes"||n.paint==="tiles";o.fillStyle=d?"rgba(18,12,6,0.56)":"rgba(18,12,6,0.42)",o.fillRect(0,0,i,s),o.save(),o.clip(f,"nonzero"),c(),o.restore();for(const b of n.patches)Av(o,b,r,t);const u=(b,x,A)=>{o.strokeStyle=A,o.lineWidth=x,o.lineJoin="round",o.lineCap="round",o.beginPath(),b.forEach((S,w)=>{const[R,B]=r(S[0],S[1]);w?o.lineTo(R,B):o.moveTo(R,B)}),o.stroke()};u(l,Math.max(3,t*.55),"rgba(35,22,10,0.55)"),u(h,Math.max(3,t*.55),"rgba(35,22,10,0.55)"),u(l,Math.max(1.6,t*.28),"rgba(255,250,238,0.95)"),u(h,Math.max(1.6,t*.28),"rgba(255,250,238,0.95)"),o.strokeStyle="rgba(255,255,255,0.30)",o.lineWidth=Math.max(2,t*.16),o.setLineDash([t,t*1.2]),o.beginPath(),n.path.forEach((b,x)=>{const[A,S]=r(b.x,b.y);x?o.lineTo(A,S):o.moveTo(A,S)}),o.stroke(),o.setLineDash([]);const g=b=>{let x=0,A=1e9;for(let S=0;S<n.path.length;S++){const w=n.path[S].x-b.x,R=n.path[S].y-b.y,B=w*w+R*R;B<A&&(A=B,x=S)}return x};n.checkpoints.forEach((b,x)=>{if(x===0)return;const A=g(b),S=n.path[Math.max(0,A-1)],w=n.path[Math.min(n.path.length-1,A+1)];let R=-(w.y-S.y),B=w.x-S.x;const _=Math.hypot(R,B)||1;R/=_,B/=_;const E=n.half[A],[D,k]=r(b.x+R*E,b.y+B*E),[z,K]=r(b.x-R*E,b.y-B*E),[U,Z]=r(b.x,b.y);o.lineCap="butt",o.strokeStyle="rgba(40,190,235,0.42)",o.lineWidth=t*1.1,o.beginPath(),o.moveTo(D,k),o.lineTo(z,K),o.stroke(),o.strokeStyle="rgba(255,255,255,0.9)",o.lineWidth=Math.max(2,t*.18),o.setLineDash([t*.55,t*.4]),o.beginPath(),o.moveTo(D,k),o.lineTo(z,K),o.stroke(),o.setLineDash([]),o.fillStyle="#1f9ad0",o.beginPath(),o.arc(U,Z,t*.66,0,7),o.fill(),o.lineWidth=Math.max(2,t*.14),o.strokeStyle="#eafcff",o.stroke(),o.fillStyle="#fff",o.font=`900 ${Math.round(t*.82)}px sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(String(x),U,Z+1)});const v=(b,x,A)=>{const[S,w]=r(b[0],b[1]),[R,B]=r(x[0],x[1]),_=R-S,E=B-w,D=Math.hypot(_,E)||1,k=-E/D,z=_/D,K=3,U=D/10;for(let Z=0;Z<K;Z++)for(let j=0;j<10;j++){o.fillStyle=(Z+j)%2?A:"#fff";const pe=S+_*j/10+k*(Z-1)*U,me=w+E*j/10+z*(Z-1)*U;o.save(),o.translate(pe,me),o.rotate(Math.atan2(E,_)),o.fillRect(0,-U/2,U,U),o.restore()}},p={x:-Math.sin(n.startAngle),y:Math.cos(n.startAngle)},m=n.half[0];v([n.start.x-p.x*m,n.start.y-p.y*m],[n.start.x+p.x*m,n.start.y+p.y*m],"#2a7d3a"),v([n.finish[0].x,n.finish[0].y],[n.finish[1].x,n.finish[1].y],"#222");const y=new ao(a);return y.colorSpace=rn,y.anisotropy=8,y.needsUpdate=!0,y}function Pv(n,e){const t=parseInt(n.slice(1),16);let i=(t>>16)+e,s=(t>>8&255)+e,a=(t&255)+e;return i=Math.min(255,i),s=Math.min(255,s),a=Math.min(255,a),`rgb(${i},${s},${a})`}function Ds(n,e=1){const i=document.createElement("canvas");i.width=i.height=128;const s=i.getContext("2d"),a=128/2,o=128/2;if(n==="jumparrow"){s.clearRect(0,0,128,128),s.strokeStyle="rgba(90,255,140,0.95)",s.lineWidth=16,s.lineCap="round",s.lineJoin="round";for(let c=-1;c<=1;c++){const l=o+c*34;s.beginPath(),s.moveTo(a-34,l+16),s.lineTo(a,l-16),s.lineTo(a+34,l+16),s.stroke()}}else if(n==="bomb")s.fillStyle="#c0392b",s.beginPath(),s.arc(a,o,128*.44,0,7),s.fill(),s.strokeStyle="#fff",s.lineWidth=14,s.lineCap="round",s.beginPath(),s.moveTo(a-28,o-28),s.lineTo(a+28,o+28),s.moveTo(a+28,o-28),s.lineTo(a-28,o+28),s.stroke();else if(n==="itembox"){const c=s.createLinearGradient(0,0,128,128);c.addColorStop(0,"#a86bff"),c.addColorStop(1,"#6a3ce0"),s.fillStyle=c,s.fillRect(0,0,128,128),s.strokeStyle="#fff",s.lineWidth=8,s.strokeRect(8,8,112,112),s.fillStyle="#fff",s.font="900 84px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("?",a,o+6)}else if(n==="cp")s.clearRect(0,0,128,128),s.fillStyle="#1f9ad0",s.strokeStyle="#eafcff",s.lineWidth=8,s.beginPath(),s.arc(a,o,128*.42,0,7),s.fill(),s.stroke(),s.fillStyle="#dff6ff",s.font="800 22px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("CHECK",a,o-24),s.fillStyle="#fff",s.font="900 62px sans-serif",s.fillText(String(e),a,o+18);else{const c=e>=3?"#e0a020":e===2?"#2e9fa4":"#2ea44f";s.fillStyle=c,s.beginPath(),s.arc(a,o,128*.44,0,7),s.fill(),s.fillStyle="#fff",s.font="bold 58px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("+"+e,a,o+4)}const r=new ao(i);return r.colorSpace=rn,r.anisotropy=4,r}function Lv(n,e){const t=new Bt,i=(o,r=.9)=>new Ve({color:o,roughness:r}),s=(o,r,c,l)=>new Q(new ht(o,r,c,12),i(l)),a=(o,r,c,l)=>new Q(new qt(o,r,c),i(l));switch(n){case"twig":{const o=s(.09,.12,2.2,"#5a3f22");o.rotation.z=1.57,o.position.y=.12,t.add(o);break}case"leaf":{const o=new Q(new et(.5,8,6),i(e||"#7a9b3a"));o.scale.set(1,.14,.7),o.position.y=.07,t.add(o);break}case"pebble":{const o=new Q(new Qs(.42),i("#b8ae98"));o.scale.y=.6,o.position.y=.2,t.add(o);break}case"grass":{for(let o=0;o<5;o++){const r=s(.02,.05,1.1,"#5f8a36");r.position.set((Math.random()-.5)*.5,.55,(Math.random()-.5)*.5),r.rotation.z=(Math.random()-.5)*.5,t.add(r)}break}case"shell":{const o=new Q(new et(.42,10,8,0,6.3,0,1.6),i(e||"#f0dcc6"));o.position.y=.1,t.add(o);break}case"starfish":{const o=new Q(new ht(.55,.55,.12,5),i(e||"#e08a4a"));o.position.y=.1,t.add(o);break}case"castle":{const o=a(2.4,1.4,2.4,"#d8b878");o.position.y=.7,t.add(o);for(const[r,c]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const l=s(.35,.4,1.9,"#d8b878");l.position.set(r,.95,c),t.add(l)}break}case"chalk":{const o=new Q(new En(2.4,.7),new Ve({color:e||"#e8607a",roughness:1,transparent:!0,opacity:.85}));o.rotation.x=-1.57,o.position.y=.03,t.add(o);break}case"toy":{const o=a(1.1,.7,1.1,e||"#e0c040");o.position.y=.35,t.add(o);const r=s(.28,.28,.5,Pv(e||"#e0c040",20));r.position.y=.9,t.add(r);break}case"box":{const o=a(2.4,1.6,2,"#c39a63");o.position.y=.8,o.castShadow=!0,t.add(o);const r=a(2.5,.14,2.1,"#a97f48");r.position.y=1.6,t.add(r);break}case"tape":{const o=a(2.2,.06,.6,"#d9d2c2");o.position.y=.05,t.add(o);break}case"pencil":{const o=s(.13,.13,3.2,e||"#e0b030");o.rotation.z=1.57,o.position.y=.16,t.add(o);const r=s(0,.13,.4,"#333");r.rotation.z=1.57,r.position.set(1.7,.16,0),t.add(r);break}case"cup":{const o=s(.85,.65,1.8,"#e8e4dc");o.position.y=.9,o.castShadow=!0,t.add(o);const r=s(.7,.55,1.6,"#b8b0a2");r.position.y=1.05,t.add(r);break}case"coin":{const o=s(.55,.55,.12,e||"#e0c050");o.position.y=.06,t.add(o);break}case"eraser":{const o=a(1,.5,.6,e||"#e06a8a");o.position.y=.25,t.add(o);break}case"straw":{const o=s(.1,.1,3,e||"#e05a5a");o.rotation.z=1.4,o.position.y=.14,t.add(o);break}case"ball8":{const o=new Q(new et(.62,14,12),i("#141414",.35));o.position.y=.62,o.castShadow=!0,t.add(o);const r=s(.24,.24,.05,"#f2f2f2");r.position.set(.28,1.05,.28),r.lookAt(2,3,2),t.add(r);break}case"icecube":{const o=new Q(new qt(1.1,1.1,1.1),new Ve({color:"#cfeaf6",roughness:.15,transparent:!0,opacity:.7}));o.position.y=.55,o.rotation.y=Math.random()*1.5,o.castShadow=!0,t.add(o);break}case"bolt":{const o=s(.42,.42,.3,"#8a949c");o.geometry.dispose(),o.geometry=new ht(.42,.42,.3,6),o.position.y=.15,t.add(o);const r=s(.16,.16,1.4,"#a8b2ba");r.rotation.z=1.57,r.position.set(.8,.16,0),t.add(r);break}case"remote":{const o=a(.9,.22,2.2,"#2a2a30");o.position.y=.11,o.castShadow=!0,t.add(o);for(let r=0;r<6;r++){const c=s(.09,.09,.08,r===0?"#e05a5a":"#b8c0c8");c.position.set((r%2-.5)*.36,.24,-.7+Math.floor(r/2)*.42),t.add(c)}break}case"saltshaker":{const o=new qr({color:"#eef2f4",roughness:.08,transmission:.55,thickness:.6}),r=new Q(new ht(.95,1.15,3,18),o);r.position.y=1.5,r.castShadow=!0,t.add(r);const c=s(.82,1,2,"#ffffff");c.position.y=1.1,t.add(c);const l=new Q(new ht(.8,.95,.75,18),i("#c8ced4",.35));l.position.y=3.35,l.castShadow=!0,t.add(l);for(let h=0;h<7;h++){const f=h/7*6.283,d=s(.09,.09,.06,"#4a5056");d.position.set(Math.cos(f)*.4,3.74,Math.sin(f)*.4),t.add(d)}break}case"plate":{const o=[new Me(0,.12),new Me(2.6,.12),new Me(3.4,.3),new Me(4.1,.75),new Me(4.25,.8)],r=new Q(new oo(o,36),i("#f2ede2",.35));r.castShadow=!0,r.receiveShadow=!0,t.add(r);const c=new Q(new Ft(3.6,.07,8,40),i("#4a7ab0",.5));c.rotation.x=1.57,c.position.y=.62,t.add(c);for(let l=0;l<8;l++){const h=new Q(new Qs(.14),i("#c9a35f"));h.position.set((Math.random()-.5)*3.4,.22,(Math.random()-.5)*3.4),t.add(h)}break}case"mugcoffee":{const o=new Q(new ht(1.7,1.5,3.9,22,1,!0),new Ve({color:e||"#d05a4a",roughness:.4,side:gn}));o.position.y=1.95,o.castShadow=!0,t.add(o);const r=s(1.5,1.5,.16,e||"#d05a4a");r.position.y=.08,t.add(r);const c=s(1.55,1.55,.08,"#3a2414");c.position.y=3.55,t.add(c);const l=new Q(new Ft(.95,.26,10,20,Math.PI*1.5),i(e||"#d05a4a",.4));l.position.set(1.95,2.1,0),l.rotation.z=-.5,l.castShadow=!0,t.add(l);break}case"napkinfold":{const o=a(3.4,.1,3.4,"#f6f2ea");o.position.y=.05,t.add(o);const r=a(2.4,.1,2.4,"#efe9dd");r.position.y=.15,r.rotation.y=.4,t.add(r);break}case"apple":{const o=new Q(new et(1.7,18,14),i(e||"#c8382e",.35));o.position.y=1.55,o.scale.y=.92,o.castShadow=!0,t.add(o);const r=s(.09,.12,.9,"#5a3a1a");r.position.y=3.3,r.rotation.z=.25,t.add(r);const c=new Q(new et(.5,8,6),i("#4f7d30"));c.scale.set(1,.25,.5),c.position.set(.45,3.35,0),t.add(c);break}case"cuttingboard":{const o=a(7,.5,4.4,"#b98a52");o.position.y=.25,o.castShadow=!0,t.add(o);const r=s(.55,.55,.5,"#b98a52");r.position.set(4.1,.25,0),t.add(r);const c=s(.28,.28,.54,"#6f5334");c.position.set(4.1,.26,0),t.add(c);break}case"bucketzinc":{const o=new Q(new ht(1.9,1.5,3.2,20,1,!0),new Ve({color:"#aab4bc",roughness:.35,metalness:.55,side:gn}));o.position.y=1.6,o.castShadow=!0,t.add(o);const r=s(1.5,1.5,.14,"#98a2aa");r.position.y=.07,t.add(r);const c=new Q(new Ft(1.9,.09,8,24),i("#8e989e",.3));c.rotation.x=1.57,c.position.y=3.2,t.add(c);const l=new Q(new Ft(1.75,.08,8,24,Math.PI),i("#78828a",.3));l.position.y=3.2,l.rotation.x=.5,t.add(l);break}case"bone":{for(const r of[-1.5,1.5])for(const c of[-.4,.4]){const l=new Q(new et(.55,10,8),i("#e8e0d0",.6));l.position.set(r,.5,c),l.castShadow=!0,t.add(l)}const o=s(.4,.4,3,"#e8e0d0");o.rotation.z=1.57,o.position.y=.5,o.castShadow=!0,t.add(o);break}case"fencebit":{for(const o of[-2.4,0,2.4]){const r=a(.5,3.4,.5,"#7a5a34");r.position.set(o,1.7,0),r.castShadow=!0,t.add(r);const c=new Q(new zi(.38,.6,4),i("#6b4e2e"));c.position.set(o,3.7,0),c.rotation.y=.78,t.add(c)}for(const o of[1.1,2.3]){const r=a(6.4,.4,.24,"#8a6a3e");r.position.y=o,r.castShadow=!0,t.add(r)}break}case"beachumbrella":{const o=s(.14,.14,8.5,"#e8e4dc");o.position.y=4,o.rotation.z=.22,o.castShadow=!0,t.add(o);const r=new Bt;for(let l=0;l<10;l++){const h=new Q(new zi(4.6,1.9,10,1,!0,l/10*6.283,.629),i(l%2?"#e5484d":"#f6f0e2",.7));h.material.side=gn,h.castShadow=!0,r.add(h)}const c=new Q(new zi(.16,.7,8),i("#c9a35f"));c.position.y=1.25,r.add(c),r.position.set(1.85,7.6,0),r.rotation.z=.22,t.add(r);break}case"beachball":{const o=new Q(new et(1.75,20,16),i("#f6f0e2",.45));o.position.y=1.75,o.castShadow=!0,t.add(o);const r=["#e5484d","#3b82f6","#f2b100"];for(let c=0;c<3;c++){const l=new Q(new et(1.76,20,16,c*2.09,.9),i(r[c],.45));l.position.y=1.75,t.add(l)}break}case"flipflop":{const o=new Q(new Un(1.05,2.3,6,12),i(e||"#3fae6a",.7));o.scale.y=.16,o.rotation.x=1.57,o.position.y=.22,o.castShadow=!0,t.add(o);for(const r of[-1,1]){const c=new Q(new Ft(.75,.13,8,14,2.4),i("#f6f0e2",.6));c.position.set(r*.35,.3,-.65),c.rotation.set(0,r*-.5,r*-1.2),t.add(c)}break}case"sunscreen":{const o=new Q(new Un(.85,1.8,6,14),i("#f2b100",.4));o.scale.z=.55,o.position.y=1.75,o.castShadow=!0,t.add(o);const r=s(.5,.55,.7,"#f6f0e2");r.position.y=3.15,t.add(r);const c=a(1.35,1.1,1,"#f6f0e2");c.position.y=1.7,t.add(c);break}case"toycar":{const o=a(1.9,.85,3.6,e||"#3b82f6");o.position.y=.95,o.castShadow=!0,t.add(o);const r=a(1.7,.8,1.8,"#cfe4ee");r.position.set(0,1.7,-.2),r.castShadow=!0,t.add(r);for(const c of[-1.2,1.2])for(const l of[-1,1]){const h=s(.55,.55,.35,"#22262a");h.rotation.z=1.57,h.position.set(l,.55,c),t.add(h);const f=s(.22,.22,.38,"#c8ced4");f.rotation.z=1.57,f.position.set(l,.55,c),t.add(f)}break}case"chalkset":{["#ff8fb0","#8fd0ff","#ffe38f","#a0ffb0"].forEach((r,c)=>{const l=s(.28,.28,2.2,r);l.rotation.z=1.57,l.rotation.y=(Math.random()-.5)*1.2,l.position.set((c-1.5)*.75,.28,(Math.random()-.5)*1.2),l.castShadow=!0,t.add(l)});break}case"paintcan":{const o=new Q(new ht(1.55,1.55,3.4,20),new Ve({color:"#c8ced4",roughness:.3,metalness:.5}));o.position.y=1.7,o.castShadow=!0,t.add(o);const r=s(1.58,1.58,1.7,e||"#3b82f6");r.position.y=1.7,t.add(r);const c=s(1.4,1.4,.1,e||"#3b82f6");c.position.y=3.46,t.add(c);const l=new Q(new et(.4,10,8),i(e||"#3b82f6",.3));l.scale.set(1,.25,1.6),l.position.set(1.5,3.35,.4),t.add(l);break}case"wrench":{const o=a(3.2,.3,.75,"#b8c2ca");o.position.y=.16,o.castShadow=!0,t.add(o);for(const r of[-1,1]){const c=new Q(new Ft(.75,.3,8,18,4.4),new Ve({color:"#b8c2ca",roughness:.3,metalness:.6}));c.rotation.x=1.57,c.rotation.z=r>0?.8:.8+3.14,c.position.set(r*2,.16,0),c.castShadow=!0,t.add(c)}break}case"tirestack":{for(let o=0;o<2;o++){const r=new Q(new Ft(1.9,.8,12,24),i("#26282c",.85));r.rotation.x=1.57,r.position.y=.8+o*1.5,r.castShadow=!0,t.add(r)}break}case"oldtire":{const o=new Q(new Ft(1.9,.8,12,24),i("#26282c",.85));o.rotation.x=1.57,o.position.y=.8,o.castShadow=!0,t.add(o);break}case"toyshovel":{const o=s(.16,.16,3.6,e||"#e5484d");o.rotation.z=1.35,o.position.y=.5,t.add(o);const r=a(1.5,.16,1.9,e||"#e5484d");r.position.set(2.1,.2,0),r.rotation.z=-.12,r.castShadow=!0,t.add(r);const c=new Q(new Ft(.4,.14,8,14),i(e||"#e5484d",.5));c.position.set(-1.95,1.15,0),c.rotation.y=1.57,t.add(c);break}case"wateringcan":{const o=new Q(new ht(1.7,1.9,3.2,20),i(e||"#3fae6a",.45));o.position.y=1.6,o.castShadow=!0,t.add(o);const r=s(.22,.34,3.4,e||"#3fae6a");r.rotation.z=.9,r.position.set(2.35,2.35,0),r.castShadow=!0,t.add(r);const c=s(.62,.62,.3,"#2e8a50");c.rotation.z=.9,c.position.set(3.65,3.35,0),t.add(c);const l=new Q(new Ft(1.2,.16,8,20,Math.PI),i(e||"#3fae6a",.45));l.position.set(-1.2,3,0),l.rotation.z=.5,t.add(l);break}case"flowerpot":{const o=new Q(new ht(1.5,1.05,2.4,18),i("#b06a40",.7));o.position.y=1.2,o.castShadow=!0,t.add(o);const r=s(1.65,1.65,.5,"#a05a34");r.position.y=2.45,t.add(r);const c=s(1.35,1.35,.12,"#4a3418");c.position.y=2.72,t.add(c);const l=s(.09,.11,2.6,"#4f7d30");l.position.y=4,t.add(l);for(let d=0;d<6;d++){const u=d/6*6.283,g=new Q(new et(.5,8,6),i(e||"#f2b100",.5));g.scale.set(1,.35,.6),g.position.set(Math.cos(u)*.62,5.35,Math.sin(u)*.62),g.rotation.y=-u,t.add(g)}const h=new Q(new et(.38,10,8),i("#a4581e"));h.position.y=5.4,t.add(h);const f=new Q(new et(.55,8,6),i("#4f7d30"));f.scale.set(1,.22,.5),f.position.set(.5,3.6,.2),t.add(f);break}case"mushroom":{const o=s(.42,.55,1.1,"#efe9dd");o.position.y=.55,t.add(o);const r=new Q(new et(1,14,10,0,6.3,0,1.35),i(e||"#d05a4a",.55));r.position.y=.95,r.castShadow=!0,t.add(r);for(let c=0;c<5;c++){const l=c*1.9,h=s(.14,.14,.06,"#f6f0e2");h.position.set(Math.cos(l)*.55,1.45+Math.sin(c)*.1,Math.sin(l)*.55),h.rotation.set(Math.cos(l)*.5,0,Math.sin(l)*-.5),t.add(h)}break}case"cactus":{const o=new Q(new Un(.95,3.4,6,14),i("#3e7d3e",.7));o.position.y=2.6,o.castShadow=!0,t.add(o);for(const c of[-1,1]){const l=new Q(new Un(.55,1.4,6,12),i("#469046",.7));l.position.set(c*1.35,2.6+(c>0?.7:.1),0),l.rotation.z=c*-.5,l.castShadow=!0,t.add(l)}const r=new Q(new et(.4,10,8),i("#ff8fb0",.5));r.position.y=4.75,t.add(r);for(let c=0;c<22;c++){const l=Math.random()*6.283,h=1+Math.random()*3.2,f=s(.02,.05,.4,"#e8e0c0");f.position.set(Math.cos(l)*.98,h,Math.sin(l)*.98),f.rotation.set(Math.sin(l)*1.57,0,Math.cos(l)*-1.57),t.add(f)}break}case"drybush":{for(let o=0;o<9;o++){const r=s(.05,.09,1.8+Math.random(),"#9a7a4a");r.position.y=.8,r.rotation.set((Math.random()-.5)*1.6,Math.random()*6.283,(Math.random()-.5)*1.6),r.castShadow=!0,t.add(r)}break}case"brickpile":{const r=a(2.6,1.1,1.25,"#c05a3a");r.position.y=.55,r.castShadow=!0,t.add(r);const c=a(2.6,1.1,1.25,"#b0522e");c.position.set(.4,1.65,.15),c.rotation.y=.22,c.castShadow=!0,t.add(c);const l=a(2.6,1.1,1.25,"#c86040");l.position.set(-1.4,.55,1.6),l.rotation.y=-.5,l.castShadow=!0,t.add(l);break}case"helmet":{const o=new Q(new et(1.7,18,12,0,6.3,0,1.62),i("#f2b100",.4));o.position.y=.25,o.castShadow=!0,t.add(o);const r=s(2.1,2.2,.18,"#e0a400");r.position.y=.3,t.add(r);const c=a(.5,.3,2.9,"#e0a400");c.position.y=1.85,t.add(c);break}case"watertank":{const o=new Q(new ht(3.3,2.9,4.2,24),i("#2e6fb0",.5));o.position.y=2.1,o.castShadow=!0,t.add(o);const r=new Q(new et(3.35,24,10,0,6.3,0,.9),i("#3b82c8",.5));r.position.y=3.15,r.scale.y=.75,r.castShadow=!0,t.add(r);const c=s(3.36,3.36,.5,"#245a94");c.position.y=2,t.add(c);break}case"clothesline":{for(const c of[-4.4,4.4]){const l=s(.14,.16,5.2,"#8a8f94");l.position.set(c,2.6,0),l.castShadow=!0,t.add(l)}const o=s(.035,.035,8.8,"#e8e4dc");o.rotation.z=1.57,o.position.y=4.9,t.add(o);const r=["#e5484d","#3b82f6","#3fae6a","#f2b100"];for(let c=0;c<4;c++){const l=a(1.25,1.7,.09,r[c]);l.position.set(-3.1+c*2.05,4.05,0),l.rotation.x=.12,l.castShadow=!0,t.add(l)}break}case"floatring":{const o=new Q(new Ft(2.1,.85,14,28),i("#ff7ea8",.45));o.rotation.x=1.57,o.position.y=.85,o.castShadow=!0,t.add(o);for(let r=0;r<4;r++){const c=new Q(new Ft(2.11,.86,14,28,.7),i("#f6f0e2",.45));c.rotation.x=1.57,c.rotation.z=r*1.57+.4,c.position.y=.85,t.add(c)}break}case"fruitcrate":{const o="#b98a52";for(const[r,c,l,h,f,d]of[[4.4,.3,3,0,.15,0],[4.4,1.4,.25,0,.85,1.4],[4.4,1.4,.25,0,.85,-1.4],[.25,1.4,3,2.1,.85,0],[.25,1.4,3,-2.1,.85,0]]){const u=a(r,c,l,o);u.position.set(h,f,d),u.castShadow=!0,t.add(u)}for(let r=0;r<7;r++){const c=new Q(new et(.62,12,10),i("#f28a1e",.5));c.position.set((Math.random()-.5)*2.8,.85+(r>4?.8:0),(Math.random()-.5)*1.7),c.castShadow=!0,t.add(c)}break}case"roadsign":{const o=s(.13,.15,5.6,"#8a8f94");o.position.y=2.8,o.castShadow=!0,t.add(o);const r=a(2.6,2.6,.16,"#f2b100");r.position.y=5.1,r.rotation.z=.785,r.castShadow=!0,t.add(r);const c=a(.8,.8,.06,"#22262a");c.position.set(0,5.1,.1),c.rotation.z=.785,t.add(c);break}case"cuestick":{const o=s(.13,.3,11,"#b98a52");o.rotation.z=1.545,o.position.y=.32,o.castShadow=!0,t.add(o);const r=s(.13,.13,.25,"#3b82f6");r.rotation.z=1.545,r.position.set(-5.55,.4,0),t.add(r);const c=s(.31,.31,.3,"#26282c");c.rotation.z=1.545,c.position.set(5.6,.24,0),t.add(c);break}case"poolballs":{[["#f2b100",1],["#e5484d",3],["#3b82f6",2]].forEach(([r],c)=>{const l=c*2.09,h=new Q(new et(.62,14,12),i(r,.25));h.position.set(Math.cos(l)*.75,.62,Math.sin(l)*.75),h.castShadow=!0,t.add(h);const f=s(.24,.24,.05,"#f6f0e2");f.position.set(Math.cos(l)*.75,1.22,Math.sin(l)*.75),t.add(f)});break}case"bluechalk":{const o=a(1.05,.8,1.05,"#3b82f6");o.position.y=.4,o.castShadow=!0,t.add(o);const r=s(.4,.4,.12,"#2a62b8");r.position.y=.82,t.add(r);break}case"sodacup":{const o=new qr({color:"#e8f0f4",roughness:.1,transmission:.5,thickness:.5}),r=new Q(new ht(1.25,.95,3.6,18),o);r.position.y=1.8,r.castShadow=!0,t.add(r);const c=s(1.05,.9,2.7,"#7a3c14");c.position.y=1.5,t.add(c);const l=s(1.35,1.3,.35,"#e5484d");l.position.y=3.75,t.add(l);const h=s(.12,.12,3.2,"#f6f0e2");h.rotation.z=.3,h.position.set(-.45,5,0),t.add(h);break}case"popsicle":{const o=s(.18,.18,1.6,"#d8b888");o.rotation.x=1.57,o.position.set(0,.2,2.2),t.add(o);const r=new Q(new Un(1,2.6,6,14),i(e||"#ff7ea8",.35));r.scale.z=.45,r.rotation.x=1.57,r.position.y=.5,r.castShadow=!0,t.add(r);const c=new Q(new et(.65,10,8),i("#a8c8d4",.4));c.position.set(.7,.75,-1.7),t.add(c);break}case"icecreamtub":{const o=new Q(new ht(2,1.7,2.3,20),i("#efe6d4",.5));o.position.y=1.15,o.castShadow=!0,t.add(o);const r=s(2.02,2.02,.8,e||"#c86a94");r.position.y=1.3,t.add(r);const c=s(2.1,2.1,.3,"#e0d6c4");c.position.y=2.45,t.add(c);const l=new Q(new et(.9,12,10),i(e||"#c86a94",.5));l.position.set(.4,2.85,-.2),l.castShadow=!0,t.add(l);break}case"icetray":{const o=a(3.4,.55,2.3,"#8fc2e8");o.position.y=.28,o.castShadow=!0,t.add(o);for(let r=0;r<4;r++)for(let c=0;c<3;c++){const l=new Q(new qt(.62,.3,.55),new Ve({color:"#dff2fc",roughness:.15,transparent:!0,opacity:.85}));l.position.set(-1.2+r*.8,.6,-.72+c*.72),t.add(l)}break}case"hammer":{const o=s(.22,.26,4.4,"#b98a52");o.rotation.z=1.57,o.position.y=.26,o.castShadow=!0,t.add(o);const r=a(1.1,.85,.85,"#78828a");r.position.set(2.1,.45,0),r.castShadow=!0,t.add(r);const c=a(.85,.5,.5,"#8a949c");c.position.set(2.1,.45,.65),c.rotation.x=.4,t.add(c);break}case"screwdriver":{const o=new Q(new Un(.42,1.4,6,12),i(e||"#e5484d",.35));o.rotation.z=1.57,o.position.set(-1.2,.42,0),o.castShadow=!0,t.add(o);const r=s(.11,.11,2.6,"#c8ced4");r.rotation.z=1.57,r.position.set(1,.42,0),t.add(r);break}case"pillow":{const o=new Q(new qt(4.4,1.4,4.4,4,2,4),i(e||"#3b82f6",.75)),r=o.geometry.attributes.position;for(let l=0;l<r.count;l++){const h=r.getX(l),f=r.getY(l),d=r.getZ(l),u=1-Math.abs(h)/2.2*(Math.abs(d)/2.2)*.55;r.setY(l,f*u)}o.geometry.computeVertexNormals(),o.position.y=.7,o.rotation.y=.3,o.castShadow=!0,t.add(o);const c=s(.2,.2,.14,"#2a62b8");c.position.y=1.42,t.add(c);break}case"bookpile":{["#c05a5a","#3fae6a","#3b82f6"].forEach((r,c)=>{const l=a(3.2-c*.3,.55,4.3-c*.4,r);l.position.y=.28+c*.56,l.rotation.y=(c-1)*.25,l.castShadow=!0,t.add(l);const h=a(2.9-c*.3,.4,4-c*.4,"#f2ede2");h.position.y=.28+c*.56,h.rotation.y=(c-1)*.25,t.add(h)});break}case"sock":{const o=new Q(new Un(.55,1.8,6,12),i(e||"#e5484d",.85));o.rotation.z=1.2,o.position.set(-.6,.55,0),o.castShadow=!0,t.add(o);const r=new Q(new Un(.55,1.2,6,12),i(e||"#e5484d",.85));r.rotation.set(0,0,.15),r.rotation.y=.9,r.position.set(1,.55,.4),r.castShadow=!0,t.add(r);const c=s(.57,.57,.35,"#f6f0e2");c.rotation.z=1.2,c.position.set(-1.35,.85,0),t.add(c);break}}return t.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0)}),t}function El(n){const e=new Bt,t=[],i=[],s=[],a=[],o=new Q(new qt(n.w+5,1.4,n.h+5),new Ve({color:n.bg,roughness:.95}));o.position.set(n.w/2,-.72,n.h/2),o.receiveShadow=!0,e.add(o);const r=Rv(n);r.flipY=!1;const c=new Q(new En(n.w,n.h),new Ve({map:r,roughness:.98}));c.rotation.x=-Math.PI/2,c.position.set(n.w/2,0,n.h/2),c.receiveShadow=!0,e.add(c);const l=n.wallCol||"#6b4e2e",h=new Ve({color:l,roughness:.85});for(const d of n.walls){const u=d.b.x-d.a.x,g=d.b.y-d.a.y,v=Math.hypot(u,g);if(v<.05)continue;const p=new Q(new qt(v+.5,.9,.6),h);p.position.set((d.a.x+d.b.x)/2,.42,(d.a.y+d.b.y)/2),p.rotation.y=-Math.atan2(g,u),p.castShadow=!0,p.receiveShadow=!0,e.add(p)}const f=new Ve({color:"#8a5a2e",roughness:.82});for(const d of n.obstacles)if(d.type==="stone"){const u=new Q(new Qs(d.r,0),new Ve({color:"#9a948a",roughness:.9,flatShading:!0}));u.position.set(d.x,d.r*.55,d.y),u.scale.y=.8,u.rotation.set(Math.random(),Math.random(),Math.random()),u.castShadow=!0,u.receiveShadow=!0,e.add(u)}else if(d.type==="hole"){const u=new Q(new Sn(d.r,28),new Ut({color:1182726}));u.rotation.x=-Math.PI/2,u.position.set(d.x,.015,d.y),e.add(u);const g=new Q(new Ft(d.r,.15,8,28),new Ve({color:"#3a2c1a",roughness:1}));g.rotation.x=-Math.PI/2,g.position.set(d.x,.03,d.y),g.castShadow=!0,e.add(g)}else if(d.type==="jump"){const u=new Bt,g=new Q(new qt(3,.34,3.4),f);g.rotation.x=-.52,g.position.set(0,.55,.2),g.castShadow=!0,g.receiveShadow=!0,u.add(g);const v=new Q(new qt(3,.5,.32),new Ve({color:"#c9902e",roughness:.7}));v.position.set(0,1,1.5),u.add(v);const p=new Q(new En(2.4,3),new Ut({map:Ds("jumparrow"),transparent:!0,depthWrite:!1}));p.rotation.x=-Math.PI/2-.52,p.rotation.z=Math.PI,p.position.set(0,.8,.4),u.add(p),u.position.set(d.x,0,d.y),u.rotation.y=Math.PI/2-(d.dir??0),e.add(u)}else if(d.type==="top"){const u=new Bt,g=new Q(new zi(d.r,1.15,16),new Ve({color:"#d84a8a",roughness:.35}));g.rotation.x=Math.PI,g.position.y=.62,g.castShadow=!0,u.add(g);const v=new Q(new ht(d.r*.82,d.r*.62,.3,16),new Ve({color:"#ffd24a",roughness:.35}));v.position.y=.92,u.add(v);const p=new Q(new et(d.r*.55,12,8,0,6.3,0,1.6),new Ve({color:"#4a90d8",roughness:.3}));p.position.y=1.2,u.add(p);const m=new Q(new ht(.09,.09,.5,8),new Ve({color:"#e8e4dc"}));m.position.y=1.6,u.add(m),u.position.set(d.x,0,d.y),e.add(u),s.push({update:b=>{u.rotation.y+=b*9,u.rotation.z=Math.sin(u.rotation.y*.7)*.06}});const y=new Q(new Sn(d.r*1.5,24),new Ut({color:"#ff7ab0",transparent:!0,opacity:.28,blending:ui,depthWrite:!1}));y.rotation.x=-Math.PI/2,y.position.set(d.x,.025,d.y),e.add(y),t.push({mesh:y,kind:"top",base:d.r*1.5})}else if(d.type==="bug"){const u=new Bt,g=new Q(new et(d.r,16,12,0,6.3,0,1.62),new Ve({color:"#d8362e",roughness:.35}));g.castShadow=!0,u.add(g);const v=new Q(new qt(.06,.5,d.r*1.9),new Ve({color:"#221408"}));v.position.y=d.r*.62,u.add(v);for(const[y,b]of[[-.4,-.3],[.4,-.25],[-.32,.3],[.38,.32]]){const x=new Q(new Sn(.14,8),new Ut({color:"#221408"}));x.position.set(y*d.r,d.r*.86,b*d.r),x.rotation.x=-Math.PI/2,u.add(x)}const p=new Q(new et(d.r*.45,12,8),new Ve({color:"#221408",roughness:.4}));p.position.set(0,d.r*.3,d.r*.85),u.add(p);for(const y of[-1,1]){const b=new Q(new ht(.025,.025,.5,6),new Ve({color:"#221408"}));b.position.set(y*.18,d.r*.75,d.r*1.1),b.rotation.x=.6,b.rotation.z=y*-.35,u.add(b)}e.add(u),s.push({update:y=>{const b=Xr(d);u.position.x+=(b.x-u.position.x)*Math.min(1,y*3.2),u.position.z+=(b.y-u.position.z)*Math.min(1,y*3.2);const x=b.x-u.position.x,A=b.y-u.position.z;Math.hypot(x,A)>.05&&(u.rotation.y=Math.atan2(x,A)),u.position.y=Math.abs(Math.sin(performance.now()*.008))*.05}});const m=Xr(d);u.position.set(m.x,0,m.y)}else if(d.type==="band"){const[u]=id(d);for(const y of[u.a,u.b]){const b=new Q(new ht(.16,.2,1.5,10),f);b.position.set(y.x,.75,y.y),b.castShadow=!0,e.add(b);const x=new Q(new et(.2,8,6),new Ve({color:"#e5484d",roughness:.5}));x.position.set(y.x,1.55,y.y),e.add(x)}const g=u.b.x-u.a.x,v=u.b.y-u.a.y,p=Math.hypot(g,v),m=new Q(new ht(.12,.12,p,8),new Ve({color:"#e5484d",roughness:.45}));m.position.set((u.a.x+u.b.x)/2,.62,(u.a.y+u.b.y)/2),m.rotation.z=Math.PI/2,m.rotation.y=-Math.atan2(v,g),m.castShadow=!0,e.add(m),s.push({update:()=>{const y=1+Math.sin(performance.now()*.004)*.03;m.scale.set(y,1,y)}})}else if(d.type==="mill"){const u=new Bt,g=new Q(new ht(.22,.28,1.4,10),f);g.position.y=.7,g.castShadow=!0,u.add(g);const v=new Q(new et(.3,10,8),new Ve({color:"#ffd24a",roughness:.4}));v.position.y=1,u.add(v);const p=new Bt;p.position.y=.62;const m=d.n===4?2:1,y=["#4a90d8","#3fae6a"];for(let b=0;b<m;b++){const x=new Q(new qt(d.r*2,.85,.18),new Ve({color:y[b%2],roughness:.55}));x.rotation.y=b*Math.PI/2,x.castShadow=!0,p.add(x);for(const A of[-1,1]){const S=new Q(new qt(.4,.9,.22),new Ve({color:"#e5484d",roughness:.5}));S.position.set(A*(d.r-.2),0,0),S.rotation.y=b*Math.PI/2,b===1&&S.position.set(0,0,A*(d.r-.2)),p.add(S)}}u.add(p),u.position.set(d.x,0,d.y),e.add(u),s.push({update:b=>{let A=-(d.dir||0)-p.rotation.y;for(;A>Math.PI;)A-=Math.PI*2;for(;A<-Math.PI;)A+=Math.PI*2;p.rotation.y+=A*Math.min(1,b*4)}}),p.rotation.y=-(d.dir||0)}else if(d.type==="balloon"){const u=new Bt,g=new Q(new et(d.r,18,14),new qr({color:"#3f9ae0",roughness:.15,clearcoat:.8,transparent:!0,opacity:.92}));g.scale.y=1.12,g.position.y=d.r*1.05,g.castShadow=!0,u.add(g);const v=new Q(new et(d.r*.26,8,6),new Ut({color:"#dff2ff"}));v.position.set(-d.r*.4,d.r*1.5,d.r*.3),u.add(v);const p=new Q(new zi(.16,.3,8),new Ve({color:"#2a72b0"}));p.position.y=.12,p.rotation.x=Math.PI,u.add(p),u.position.set(d.x,0,d.y),e.add(u),s.push({update:m=>{if(u.visible=!d.popped,!d.popped){const y=1+Math.sin(performance.now()*.005)*.035;g.scale.set(y,1.12/y,y)}}})}else if(d.type==="bomb"){const u=new Bt,g=new Q(new et(d.r*.95,18,14),new Ve({color:"#191919",roughness:.35,metalness:.4}));g.position.y=d.r*.95,g.castShadow=!0,u.add(g);const v=new Q(new ht(.18,.24,.28,10),new Ve({color:"#4a4a4a",metalness:.6,roughness:.4}));v.position.y=d.r*1.75,u.add(v);const p=new Q(new ht(.06,.06,.5,6),new Ve({color:"#6a4a2a"}));p.position.set(.1,d.r*2.05,0),p.rotation.z=.4,u.add(p);const m=new Q(new et(.16,8,6),new Ut({color:"#ffd24a"}));m.position.set(.24,d.r*2.28,0),u.add(m),i.push(m),u.position.set(d.x,0,d.y),e.add(u);const y=new Q(new Sn(d.r*1.6,24),new Ut({color:"#e5484d",transparent:!0,opacity:.3,blending:ui,depthWrite:!1}));y.rotation.x=-Math.PI/2,y.position.set(d.x,.025,d.y),e.add(y),t.push({mesh:y,kind:"bomb",base:d.r*1.6})}else if(d.type==="item"){const u=new Bt,g=new Q(new qt(1.25,1.25,1.25),new Ve({map:Ds("itembox"),roughness:.3,metalness:.2,emissive:"#8a5cff",emissiveIntensity:.25}));g.position.y=1.35,g.castShadow=!0,u.add(g),i.push(g),u.position.set(d.x,0,d.y),e.add(u);const v=new Q(new Sn(d.r*1.7,24),new Ut({color:"#b98cff",transparent:!0,opacity:.3,blending:ui,depthWrite:!1}));v.rotation.x=-Math.PI/2,v.position.set(d.x,.025,d.y),e.add(v),t.push({mesh:v,kind:"item",base:d.r*1.7})}else{const u=d.n||1,g=u>=3?"#f2c200":u===2?"#2e9fa4":"#2ea44f",v=new Q(new yl(d.r*.5,0),new Ve({color:g,roughness:.15,metalness:.55,emissive:g,emissiveIntensity:.35,flatShading:!0}));v.position.set(d.x,d.r*.75,d.y),v.castShadow=!0,e.add(v),i.push(v);const p=new Q(new Sn(d.r*.7,20),new Ut({map:Ds("bonus",u),transparent:!0,depthWrite:!1}));p.rotation.x=-Math.PI/2,p.position.set(d.x,.04,d.y),e.add(p);const m=new Q(new En(1.7,1.7),new Ut({map:Ds("bonus",u),transparent:!0,depthWrite:!1}));m.position.set(d.x,d.r*2.3,d.y),e.add(m),a.push(m);const y=new Q(new Sn(d.r*1.6,24),new Ut({color:g,transparent:!0,opacity:.32,blending:ui,depthWrite:!1}));y.rotation.x=-Math.PI/2,y.position.set(d.x,.025,d.y),e.add(y),t.push({mesh:y,kind:"bonus",base:d.r*1.6})}n.checkpoints.forEach((d,u)=>{if(u===0)return;let g=0,v=1e9;for(let E=0;E<n.path.length;E++){const D=n.path[E].x-d.x,k=n.path[E].y-d.y,z=D*D+k*k;z<v&&(v=z,g=E)}const p=n.path[Math.max(0,g-1)],m=n.path[Math.min(n.path.length-1,g+1)];let y=-(m.y-p.y),b=m.x-p.x;const x=Math.hypot(y,b)||1;y/=x,b/=x;const A=(m.x-p.x)/x,S=(m.y-p.y)/x,w=n.half[g],R="#28c0e0";for(const E of[1,-1]){const D=d.x+y*w*E,k=d.y+b*w*E,z=new Q(new ht(.16,.2,2.3,10),new Ve({color:R,emissive:R,emissiveIntensity:.55,roughness:.4}));z.position.set(D,1.15,k),z.castShadow=!0,e.add(z);const K=new Q(new et(.28,12,10),new Ve({color:"#eaffff",emissive:R,emissiveIntensity:.9}));K.position.set(D,2.42,k),e.add(K),i.push(K)}const B=new Q(new En(w*2,.9),new Ut({color:R,transparent:!0,opacity:.4,blending:ui,depthWrite:!1}));B.rotation.x=-Math.PI/2,B.rotation.z=-Math.atan2(S,A),B.position.set(d.x,.03,d.y),e.add(B);const _=new Q(new En(1.8,1.8),new Ut({map:Ds("cp",u),transparent:!0,depthWrite:!1}));_.position.set(d.x,3,d.y),e.add(_),a.push(_)});for(const d of n.decor){const u=Lv(d.kind,d.c);u.position.set(d.x,0,d.y),d.s&&u.scale.multiplyScalar(d.s),d.rot&&(u.rotation.y=d.rot),e.add(u)}for(const d of n.finish){const u=new Q(new ht(.08,.08,2.4,8),new Ve({color:"#eee"}));u.position.set(d.x,1.2,d.y),u.castShadow=!0,e.add(u);const g=new Q(new En(1.2,.7),new Ve({color:"#e5484d",side:gn}));g.position.set(d.x+.6,2,d.y),e.add(g)}return{group:e,pulses:t,spinners:i,billboards:a,dynamics:s}}const ad="tampinha_rally_v1",Vc={wins:0,skin:"refri",music:.5,sfx:.8,muted:!1,daily:{},trial:{},tracks:[],name:"",bonus:[]};let st=Dv();function Dv(){try{return{...Vc,...JSON.parse(localStorage.getItem(ad)||"{}")}}catch{return{...Vc}}}function Nn(){try{localStorage.setItem(ad,JSON.stringify(st))}catch{}}const Ie={get(){return st},persistNow(){Nn()},addWin(){st.wins++,Nn()},hasBonus(n){return(st.bonus||[]).includes(n)},addBonus(n){st.bonus||(st.bonus=[]),st.bonus.includes(n)||(st.bonus.push(n),Nn())},wins(){return st.wins},setSkin(n){st.skin=n,Nn()},skin(){return st.skin},setName(n){st.name=(n||"").slice(0,12),Nn()},name(){return st.name||""},setVols(n,e,t){st.music=n,st.sfx=e,st.muted=t,Nn()},dailyBest(n){return st.daily[n]},setDailyBest(n,e){(st.daily[n]==null||e<st.daily[n])&&(st.daily[n]=e,Nn())},trialBest(n,e){return st.trial[n+"-"+e]},setTrialBest(n,e,t){const i=n+"-"+e;return st.trial[i]==null||t<st.trial[i]?(st.trial[i]=t,Nn(),!0):!1},customTracks(){return st.tracks},saveTrack(n){const e=st.tracks.findIndex(t=>t.id===n.id);e>=0?st.tracks[e]=n:st.tracks.push(n),Nn()},deleteTrack(n){st.tracks=st.tracks.filter(e=>e.id!==n),Nn()}},Wc={bal:{weight:1,slide:1,stability:1,bounce:1,control:1,power:1,grip:1},glide:{weight:.93,slide:1.13,stability:.97,bounce:1.03,control:.98,power:.96,grip:.95},heavy:{weight:1.14,slide:.9,stability:1.09,bounce:.9,control:1.01,power:1.08,grip:1.1},precise:{weight:.98,slide:1,stability:1.09,bounce:.97,control:1.14,power:.99,grip:1.02},bouncy:{weight:.95,slide:1.05,stability:.94,bounce:1.16,control:.98,power:1.02,grip:.94},nimble:{weight:.9,slide:1.09,stability:1.02,bounce:1.02,control:1.06,power:.95,grip:.97},tank:{weight:1.18,slide:.87,stability:1.13,bounce:.85,control:1,power:1.12,grip:1.16},allround:{weight:1.05,slide:1.06,stability:1.06,bounce:1.05,control:1.06,power:1.05,grip:1.05}},qc={comum:0,rara:.013,epica:.028,lendaria:.048,mitica:.066};function Iv(n,e){const t=Wc[n]||Wc.bal,i=1+qc[e],s=1+qc[e]*.4,a=o=>+(o*(o>=1?i:s)).toFixed(3);return{weight:a(t.weight),slide:a(t.slide),stability:a(t.stability),bounce:a(t.bounce),control:a(t.control),power:a(t.power),grip:a(t.grip)}}function od(n,e=38){const t=parseInt(n.replace("#",""),16),i=Math.max(0,(t>>16)-e),s=Math.max(0,(t>>8&255)-e),a=Math.max(0,(t&255)-e);return"#"+(i<<16|s<<8|a).toString(16).padStart(6,"0")}const rd={steel:"#c8ccd2",silver:"#d2d6db",gold:"#e8be55",copper:"#c67e46",dark:"#3a3e44"};function ye(n,e,t,i,s,a,o,r){return{id:n,name:e,rarity:t,unlock:i,stats:Iv(s,t),top:a,side:od(a),ring:rd[o.metal||"steel"],art:o,desc:r}}const zt=[ye("coca","Cola Vermelha","comum",0,"bal","#d81f26",{bg:["#e5343a","#c0121a"],metal:"steel",arcTop:["DRINK","#fff"],center:"Cola",centerColor:"#fff",centerFont:"script",centerSize:.5,sub:["DELICIOSA & GELADA","#ffd7a0"],vintage:.4},"A clássica. Equilibrada em tudo."),ye("grape","Uva Roxa","comum",0,"bal","#6a3d9a",{bg:["#7a4bb0","#54307c"],metal:"steel",arcTop:["GRAPE","#fff"],arcBot:["SODA","#fff"],emblem:"grape",emblemColor:"#dcc6f2",vintage:.35},"Refri de uva de sempre."),ye("orangecrush","Laranja Crush","comum",0,"bouncy","#e5761a",{bg:["#f79a2e","#dd6412"],metal:"steel",arcTop:["ORANGE","#7a2f10"],center:"Crush",centerColor:"#fff",centerFont:"script",centerSize:.5,sub:["SODA","#7a2f10"],vintage:.4},"Quica com gosto de laranja."),ye("sprite","Limão Verde","comum",0,"nimble","#2f8a52",{bg:["#f2f6ee","#d6e6cf"],metal:"steel",center:"Sprite",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,emblem:"star",emblemColor:"#3fae6a",emblemY:-.02,emblemScale:.5,sub:["LIMÃO","#1f7a3a"],vintage:.3},"Leve e ágil."),ye("rootbeer","Root Beer do Pop","comum",0,"heavy","#5a3418",{bg:["#6b4020","#3f2410"],metal:"copper",arcTop:["ROOT","#ffd7a0"],arcBot:["BEER","#ffd7a0"],emblem:"bottle",emblemColor:"#caa16b",vintage:.45},"Pesada, empurra geral."),ye("pinklem","Limonada Rosa","comum",0,"bouncy","#e86a9a",{bg:["#f7a8c6","#e06a95"],metal:"steel",arcTop:["PINK","#7a1f45"],arcBot:["LEMONADE","#7a1f45"],emblem:"clown",emblemColor:"#e86a9a",emblemColor2:"#c0392b",emblemScale:.9,vintage:.4},"Doce e saltitante."),ye("bubbleup","Bubble Up","comum",0,"nimble","#2fae4e",{bg:["#39c257","#1f8a3a"],metal:"steel",center:"Bubble up",centerColor:"#fff",centerFont:"script",centerSize:.36,sub:["LIMÃO·LIMA","#fff"],vintage:.35},"Borbulha e desliza."),ye("sevenup","Sete Acima","comum",0,"precise","#c0392b",{bg:["#eef0ea","#cfd2c8"],metal:"silver",center:"7up",centerColor:"#c0392b",centerFont:"slab",centerSize:.5,sub:["LEMON SODA","#2f8a52"],vintage:.4},"Limpa e precisa."),ye("cherrycoke","Cereja","comum",1,"bal","#e0489a",{bg:["#ec5aa6","#c02d78"],metal:"steel",center:"Cherry",centerColor:"#fff",centerFont:"script",centerSize:.42,emblem:"cherry",emblemColor:"#c0122a",emblemY:.42,emblemScale:.7,arcTop:["CHERRY COLA","#fff"],vintage:.35},"Cola com cereja."),ye("lemon","Bubble Lima","comum",1,"glide","#3fae6a",{bg:["#e9e2cf","#cfc7ac"],metal:"steel",arcTop:["LEMON","#3f7a2a"],center:"bubble up",centerColor:"#c0392b",centerFont:"script",centerSize:.34,sub:["LIME SODA","#3f7a2a"],vintage:.5},"Escorrega bastante."),ye("whistle","Whistle","comum",1,"bal","#e5761a",{bg:["#f79a2e","#e5761a"],metal:"steel",arcTop:["THIRSTY?","#0a3d91"],center:"WHISTLE",centerColor:"#0a3d91",centerFont:"block",centerSize:.34,sub:["JUST","#0a3d91"],vintage:.4},"Assobia de sede."),ye("moxie","Moxie","comum",2,"heavy","#d4341f",{bg:["#e5453a","#b8261a"],metal:"steel",arcTop:["TRADE MARK","#ffe9c0"],center:"Moxie",centerColor:"#fff",centerFont:"serif",centerSize:.5,sub:["SODA","#ffe9c0"],vintage:.5},"Amarga e teimosa."),ye("cheerwine","Cheerwine","comum",2,"bal","#cf1f2d",{bg:["#f4cf3a","#e0b21f"],metal:"steel",arcTop:["CHEERWINE","#c0122a"],center:"Since 1917",centerColor:"#c0122a",centerFont:"serif",centerSize:.22,emblem:"cherry",emblemColor:"#c0122a",emblemY:.4,emblemScale:.55,sub:["GOOD CHEER","#c0122a"],vintage:.4},"Cheia de bom humor."),ye("howdy","Howdy","comum",2,"bouncy","#e5761a",{bg:["#1c1c1c","#000"],metal:"steel",arcTop:["ORANGE","#f79420"],center:"Howdy",centerColor:"#f79420",centerFont:"script",centerSize:.46,sub:["SODA","#f79420"],vintage:.45},"Alegre e pula-pula."),ye("ski","Ski","comum",3,"nimble","#2f8a52",{bg:["#f2c200","#d9a800"],metal:"steel",band:["#1f7a3a","Ski","#f2c200"],sub:["CITRUS","#1f7a3a"],vintage:.35},"Cítrica e esperta."),ye("lucky","Lucky Club","comum",3,"bal","#c0392b",{bg:["#e9e6dc","#cfccc0"],metal:"silver",band:["#c0392b","Lucky Club","#fff"],emblem:"leaf",emblemColor:"#2f8a52",emblemY:-.42,emblemScale:.45,sub:["COLA","#0a3d91"],vintage:.4},"Um trevo de sorte."),ye("bonedry","Bone Dry","comum",3,"precise","#0a3d91",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",arcTop:["GINGER ALE","#0a3d91"],center:"Bone Dry",centerColor:"#0a3d91",centerFont:"serif",centerSize:.36,vintage:.35},"Sequinha, boa de mira."),ye("sunnykid","Sunny Kid","comum",4,"glide","#1f7a3a",{bg:["#2f8a52","#186633"],metal:"steel",center:"Sunny Kid",centerColor:"#f4d76a",centerFont:"serif",centerSize:.34,emblem:"sunburst",emblemColor:"#f4d76a",emblemColor2:"#f4d76a",emblemY:0,emblemScale:.5,vintage:.45},"Desliza no sol."),ye("uptown","Up-Town","comum",4,"nimble","#1f7a3a",{bg:["#2f8a52","#155a2c"],metal:"steel",center:"up-town",centerColor:"#fff",centerFont:"script",centerSize:.4,emblem:"heart",emblemColor:"#e5484d",emblemY:.44,emblemScale:.4,vintage:.4},"Chique da cidade."),ye("dads","Dad's","comum",4,"heavy","#0a3d91",{bg:["#f2c200","#d9a800"],metal:"steel",arcTop:["SINCE 1937","#0a3d91"],center:"DAD'S",centerColor:"#c0392b",centerFont:"slab",centerSize:.42,sub:["OLD FASHIONED","#0a3d91"],vintage:.45},"Root beer do pai."),ye("mas","Ma's","comum",5,"bal","#6b7078",{bg:["#8a9098","#5a6068"],metal:"silver",arcTop:["NO DEPOSIT","#fff"],center:"Ma's",centerColor:"#e5484d",centerFont:"script",centerSize:.46,sub:["NO RETURN","#fff"],vintage:.45},"Caseira, sem devolução."),ye("wakeup","Wake Up","comum",5,"precise","#0a3d91",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",center:"WAKE UP",centerColor:"#0a3d91",centerFont:"block",centerSize:.32,emblem:"star",emblemColor:"#0a3d91",emblemY:-.42,emblemScale:.4,vintage:.4},"Desperta e acerta."),ye("pickupper","Pick-Upper","comum",5,"nimble","#c0392b",{bg:["#eef0ea","#d0d2cc"],metal:"silver",center:"Pick-UPPER",centerColor:"#c0392b",centerFont:"block",centerSize:.3,sub:["CITRATE SODA","#8a8a80"],vintage:.4},"Levanta o astral."),ye("upanup","Up and Up","comum",6,"bal","#c0392b",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",center:"UP and UP",centerColor:"#c0392b",centerFont:"block",centerSize:.3,vintage:.4},"Sempre pra cima."),ye("yup","Yup!","comum",6,"bouncy","#f2a400",{bg:["#f7c948","#e59a12"],metal:"steel",center:"Yup!",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,sub:["IS UP","#1f7a3a"],vintage:.4},"Positiva e saltitante."),ye("goody","Goody Uva","comum",7,"glide","#8e5bd0",{bg:["#f2d6f0","#dcb0e0"],metal:"steel",arcTop:["GOODY","#7c3aed"],center:"Goody",centerColor:"#7c3aed",centerFont:"script",centerSize:.46,sub:["GRAPE SODA","#7c3aed"],vintage:.4},"Boazinha e lisa."),ye("smile","Smile","comum",8,"nimble","#e5761a",{bg:["#f79420","#dd6412"],metal:"steel",center:"Smile",centerColor:"#fff",centerFont:"script",centerSize:.42,emblem:"orange",emblemColor:"#f4c04a",emblemY:.42,emblemScale:.45,vintage:.4},"Sempre sorrindo."),ye("pepsi","Pepsi-Cola","rara",5,"glide","#0a3d91",{bg:["#e5343a","#0a3d91"],metal:"steel",band:["#f2f2f2","Pepsi·Cola","#0a3d91"],vintage:.4},"Desliza suave e longe."),ye("drpepper","Dr Pepper","rara",6,"bal","#6e1f2b",{bg:["#7a1f2b","#4f141c"],metal:"steel",arcTop:["SINCE 1891","#f2c6c0"],center:"Dr Pepper",centerColor:"#fff",centerFont:"slab",centerSize:.3,sub:["DUBLIN · TEXAS","#f2c6c0"],vintage:.4},"Vinte e três sabores."),ye("felix","Felix Orange Dry","rara",7,"bal","#e5761a",{bg:["#f79420","#c85f12"],metal:"gold",arcTop:["FELIX","#3a1c08"],emblem:"bear",emblemColor:"#3a1c08",emblemY:-.34,emblemScale:.42,center:"ORANGE",centerColor:"#3a1c08",centerFont:"slab",centerSize:.28,sub:["DRY","#3a1c08"],vintage:.5},"O gato da laranja."),ye("eskimo","Eskimo Cream","rara",7,"precise","#0a3d91",{bg:["#1a4fa0","#0a2f70"],metal:"silver",emblem:"bear",emblemColor:"#eef3ff",emblemY:-.36,emblemScale:.42,center:"Eskimo",centerColor:"#fff",centerFont:"script",centerSize:.42,sub:["CREAM SODA","#cfe0ff"],vintage:.4},"Cremosa e certeira."),ye("lemmy","Lemmy Lemonade","rara",8,"nimble","#8a6b1f",{bg:["#3a2c10","#1c1508"],metal:"gold",arcTop:["LEMMY","#f4d76a"],center:"LEMONADE",centerColor:"#f4d76a",centerFont:"slab",centerSize:.24,emblem:"lemon",emblemColor:"#f4d76a",emblemY:.42,emblemScale:.5,vintage:.55},"Azedinha e ligeira."),ye("bluebird","Blue Bird","rara",8,"glide","#6a1f45",{bg:["#7a2b52","#521636"],metal:"gold",arcTop:["ARTIFICIAL COLOR","#f2c6d8"],center:"Blue Bird",centerColor:"#f4d76a",centerFont:"serif",centerSize:.3,sub:["GRAPE SODA","#f2c6d8"],vintage:.5},"Voa raspando o chão."),ye("bigtop","Big Top","rara",9,"bouncy","#e5761a",{bg:["#f79420","#dd6412"],metal:"steel",arcTop:["ORANGE","#fff"],band:["#c0392b","BIG TOP","#fff"],sub:["SODA","#fff"],vintage:.45},"Circo laranja saltitante."),ye("applejack","Apple Jack","rara",9,"nimble","#3fae6a",{bg:["#f2d64a","#d9b21f"],metal:"steel",center:"Apple Jack",centerColor:"#1f7a3a",centerFont:"serif",centerSize:.3,emblem:"apple",emblemColor:"#3fae6a",emblemY:.42,emblemScale:.5,vintage:.4},"Maçã ligeira."),ye("jacksup","Jack's-Up","rara",10,"bal","#c0392b",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",center:"Jack's-Up",centerColor:"#c0392b",centerFont:"script",centerSize:.4,emblem:"cards",emblemY:-.42,emblemScale:.55,vintage:.4},"Aposta certeira."),ye("blimey","Blimey","rara",10,"glide","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"steel",arcTop:["LEMON LIME","#1f7a3a"],center:"blimey",centerColor:"#1f7a3a",centerFont:"script",centerSize:.44,sub:["SODA","#1f7a3a"],vintage:.45},"Desliza que é uma beleza."),ye("lincoln","Lincoln Grape","rara",11,"heavy","#7c3aed",{bg:["#8a5bc0","#5a2f8a"],metal:"steel",arcTop:["LINCOLN","#fff"],center:"GRAPE",centerColor:"#fff",centerFont:"slab",centerSize:.32,sub:["SODA","#fff"],vintage:.5},"Presidencial e firme."),ye("royalpalm","Royal Palm","rara",12,"bal","#8a1220",{bg:["#a01a2a","#6a0c18"],metal:"gold",arcTop:["ROYAL PALM","#f4d76a"],center:"STRAWBERRY",centerColor:"#f4d76a",centerFont:"slab",centerSize:.2,emblem:"leaf",emblemColor:"#f4d76a",emblemY:.44,emblemScale:.4,sub:["SODA","#f4d76a"],vintage:.5},"Morango real."),ye("dilly","Dilly","rara",12,"nimble","#c0392b",{bg:["#f2ead0","#dcd2b0"],metal:"steel",center:"Dilly",centerColor:"#c0392b",centerFont:"script",centerSize:.5,sub:["FOR THIRST","#8a6b2a"],vintage:.5},"Uma gracinha ágil."),ye("chaser","Chaser","rara",13,"nimble","#1f7a3a",{bg:["#2f8a52","#155a2c"],metal:"steel",center:"Chaser",centerColor:"#f4d76a",centerFont:"script",centerSize:.5,vintage:.35},"Persegue e alcança."),ye("sport","Sport","rara",14,"bal","#c0392b",{bg:["#f2f2f0","#d8d8d4"],metal:"silver",arcTop:["SPORT","#c0392b"],center:"WINNER",centerColor:"#c0392b",centerFont:"slab",centerSize:.26,emblem:"star",emblemColor:"#c0392b",emblemY:.42,emblemScale:.4,sub:["EVERY TIME","#c0392b"],vintage:.4},"Espírito esportivo."),ye("jolt","Jolt","rara",15,"bouncy","#e5484d",{bg:["#e5343a","#b8241a"],metal:"steel",center:"JOLT",centerColor:"#fff",centerFont:"slab",centerSize:.4,emblem:"bolt",emblemColor:"#f4d76a",emblemY:-.4,emblemScale:.5,vintage:.35},"Um choque de energia."),ye("charge","Charge Up","rara",16,"nimble","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",arcTop:["MISSION","#1f7a3a"],center:"CHARGE UP",centerColor:"#1f7a3a",centerFont:"block",centerSize:.24,emblem:"bolt",emblemColor:"#1f7a3a",emblemY:.42,emblemScale:.4,vintage:.4},"Carrega e dispara."),ye("stepn","Step 'N High","rara",16,"precise","#c0392b",{bg:["#eef0ea","#d0d2cc"],metal:"silver",arcTop:["STEP 'N","#c0392b"],center:"HIGH",centerColor:"#c0392b",centerFont:"slab",centerSize:.3,sub:["TO REFRESH","#c0392b"],vintage:.4},"Sobe degraus com jeito."),ye("dragon","Dragon Cream","epica",16,"heavy","#0a3d91",{bg:["#123a80","#08245a"],metal:"gold",arcTop:["DRAGON","#f4d76a"],emblem:"dragon",emblemColor:"#f4d76a",emblemY:-.06,emblemScale:.7,sub:["CREAM SODA","#f4d76a"],vintage:.5},"O dragão que empurra tudo."),ye("donaldsoda","Pato Laranja","epica",18,"bouncy","#e5761a",{bg:["#f2ead0","#dccea0"],metal:"steel",arcTop:["DONALD DUCK","#0a3d91"],emblem:"duck",emblemColor:"#fff",emblemColor2:"#f2a400",emblemY:-.32,emblemScale:.5,center:"ORANGE",centerColor:"#e5761a",centerFont:"slab",centerSize:.24,sub:["SODA","#0a3d91"],vintage:.45},"O pato mais saltitante."),ye("donaldcola","Pato Cola","epica",20,"nimble","#1f6ea0",{bg:["#2f8ac0","#155a80"],metal:"steel",arcTop:["DONALD DUCK","#f4d76a"],center:"Cola",centerColor:"#f4d76a",centerFont:"script",centerSize:.4,emblem:"duck",emblemColor:"#fff",emblemColor2:"#f2a400",emblemY:-.36,emblemScale:.6,vintage:.4},"Ágil como um pato."),ye("vegasvic","Vegas Vic","epica",22,"bal","#6e2a12",{bg:["#7a3418","#4f200c"],metal:"gold",arcTop:["VEGAS VIC","#f4d76a"],center:"ROOT BEER",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,emblem:"star",emblemColor:"#f4d76a",emblemY:.42,emblemScale:.45,vintage:.5},"O caubói da estrada."),ye("royalflush","Royal Flush","epica",24,"bal","#c0122a",{bg:["#d4142e","#8a0c1e"],metal:"gold",arcTop:["LOGANBERRY","#f4d76a"],center:"PORT",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,emblem:"cards",emblemY:-.4,emblemScale:.5,sub:["ROYAL FLUSH","#f4d76a"],vintage:.5},"A mão vencedora."),ye("strawmilk","Leite Morango","epica",26,"heavy","#c0392b",{bg:["#e07a5a","#c05a3a"],metal:"steel",arcTop:["STRAWBERRY","#fff"],center:"MILK",centerColor:"#fff",centerFont:"slab",centerSize:.34,emblem:"cherry",emblemColor:"#c0122a",emblemY:.44,emblemScale:.45,vintage:.45},"Cremosa e encorpada."),ye("brownie","Brownie","epica",28,"heavy","#4a2c12",{bg:["#5a3418","#33200c"],metal:"copper",arcTop:["BROWNIE","#e9c9a0"],arcBot:["ROOT BEER","#e9c9a0"],emblem:"bear",emblemColor:"#e9c9a0",emblemScale:.85,vintage:.55},"O duende do root beer."),ye("jurk","Jurk","epica",30,"nimble","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"steel",center:"Jurk",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,emblem:"lemon",emblemColor:"#f4d76a",emblemY:-.4,emblemScale:.45,vintage:.45},"Cítrica misteriosa."),ye("rcorange","Royal Crown","epica",32,"glide","#e5761a",{bg:["#f79420","#c85f12"],metal:"gold",arcTop:["ROYAL","#3a1c08"],center:"ORANGE",centerColor:"#3a1c08",centerFont:"slab",centerSize:.28,emblem:"crown",emblemColor:"#f4d76a",emblemY:-.42,emblemScale:.45,vintage:.45},"Corôa que desliza."),ye("slender","Slender","epica",34,"glide","#c0392b",{bg:["#c9b89a","#a89670"],metal:"copper",center:"Slender",centerColor:"#c0392b",centerFont:"script",centerSize:.46,vintage:.6},"Fininha e escorregadia."),ye("kona","Kona","epica",36,"bal","#e5a400",{bg:["#f2b400","#c98a00"],metal:"gold",arcTop:["KONA","#3a2c08"],center:"BREWING",centerColor:"#3a2c08",centerFont:"slab",centerSize:.24,emblem:"wave",emblemColor:"#0a6ea0",emblemColor2:"#0a6ea0",emblemY:.36,emblemScale:.5,vintage:.35},"Onda do Havaí."),ye("newcastle","Newcastle","epica",38,"heavy","#6a1f2b",{bg:["#7a1f2b","#4f141c"],metal:"silver",center:"BROWN ALE",centerColor:"#fff",centerFont:"slab",centerSize:.24,emblem:"star6",emblemColor:"#3fae6a",emblemColor2:"#f2c200",emblemY:-.02,emblemScale:.8,vintage:.4},"A estrela azul da cerveja."),ye("cocagold","Cola Ouro Atlanta","lendaria",30,"allround","#f2c200",{bg:["#f7d84a","#e0a800"],metal:"gold",arcTop:["DELICIOUS · REFRESHING","#7a1f10"],center:"Cola",centerColor:"#c0122a",centerFont:"script",centerSize:.44,sub:["ATLANTA","#7a1f10"],vintage:.35},"A joia dourada. Boa em tudo."),ye("duvel","Duvel","lendaria",36,"precise","#c0392b",{bg:["#f2ead0","#dcceA0"],metal:"silver",center:"Duvel",centerColor:"#c0122a",centerFont:"script",centerSize:.5,emblem:"star",emblemColor:"#c0122a",emblemY:-.42,emblemScale:.35,vintage:.3},"Diabólica na mira: controle afiado."),ye("sierra","Sierra Nevada","lendaria",42,"glide","#0f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"gold",arcTop:["SIERRA NEVADA","#0f7a3a"],center:"PALE ALE",centerColor:"#0f7a3a",centerFont:"slab",centerSize:.22,emblem:"leaf",emblemColor:"#0f7a3a",emblemY:.36,emblemScale:.5,vintage:.35},"Desce a montanha deslizando."),ye("newbelgium","New Belgium","lendaria",48,"nimble","#e5761a",{bg:["#f2c200","#d99000"],metal:"gold",arcTop:["NEW BELGIUM","#7a2f08"],center:"BREWING",centerColor:"#7a2f08",centerFont:"slab",centerSize:.22,emblem:"ring",emblemColor:"#c0392b",emblemY:.02,emblemScale:.9,vintage:.35},"A bicicleta ágil que voa."),ye("spaten","Spaten","lendaria",55,"tank","#c0122a",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",arcTop:["SPATEN","#c0122a"],center:"München",centerColor:"#c0122a",centerFont:"serif",centerSize:.3,emblem:"shield",emblemColor:"#c0122a",emblemY:-.4,emblemScale:.4,vintage:.3},"Muralha de Munique: pesa e resiste."),ye("newbelgium2","Great Lakes 30","lendaria",62,"bouncy","#5a7ab0",{bg:["#7a9ad0","#4f6ea0"],metal:"silver",arcTop:["GREAT LAKES","#fff"],center:"30",centerColor:"#fff",centerFont:"slab",centerSize:.5,sub:["EST. 1988","#dceaff"],vintage:.3},"Três décadas de quique."),ye("goldenleaf","Golden Leaf","lendaria",70,"heavy","#f2c200",{bg:["#1c1c1c","#000"],metal:"gold",arcTop:["GOLDEN LEAF","#f4d76a"],emblem:"glass",emblemColor:"#f4d76a",emblemY:-.34,emblemScale:.42,center:"WHEAT",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,vintage:.3},"A folha de ouro, pesada e forte."),ye("felixgold","Felix Dourado","lendaria",78,"bal","#f2a400",{bg:["#f7c948","#e59a12"],metal:"gold",arcTop:["FELIX","#3a1c08"],emblem:"bear",emblemColor:"#3a1c08",emblemY:.02,emblemScale:.72,sub:["ORANGE DRY","#3a1c08"],vintage:.4},"O gato lendário do ouro, equilibrado."),ye("prisma","Prisma","mitica",90,"nimble","#22d3ee",{bg:["#b8f7ff","#6a3df0"],metal:"silver",arcTop:["PRISMA","#3a1060"],emblem:"diamond",emblemColor:"#eafcff",emblemColor2:"#ff5ea8",emblemY:-.02,emblemScale:.8,sub:["ESPECTRO","#3a1060"],vintage:.15},"Ágil como a luz que se divide."),ye("aurora","Aurora Boreal","mitica",105,"glide","#2ee6a8",{bg:["#2ee6a8","#1a4fa0"],metal:"silver",arcTop:["AURORA","#eafff6"],center:"BOREAL",centerColor:"#eafff6",centerFont:"slab",centerSize:.26,emblem:"wave",emblemColor:"#eafff6",emblemColor2:"#b8f7ff",emblemY:.36,emblemScale:.5,vintage:.15},"Desliza como véu de luz no céu."),ye("vulcao","Vulcão","mitica",120,"heavy","#e5484d",{bg:["#ff7a3a","#7a0c10"],metal:"copper",arcTop:["VULCÃO","#ffd76a"],emblem:"dragon",emblemColor:"#ffd76a",emblemColor2:"#ff7a3a",emblemY:0,emblemScale:.72,sub:["MAGMA","#ffd76a"],vintage:.2},"Pesada como rocha derretida."),ye("trovao","Trovão","mitica",138,"bouncy","#f2c200",{bg:["#1a1c3a","#050614"],metal:"gold",arcTop:["TROVÃO","#ffe36a"],emblem:"bolt",emblemColor:"#ffe36a",emblemY:-.02,emblemScale:.85,sub:["TEMPESTADE","#ffe36a"],vintage:.15},"Quica com a fúria do raio."),ye("obsidiana","Obsidiana","mitica",158,"tank","#7c3aed",{bg:["#3a2c5a","#0a0612"],metal:"dark",arcTop:["OBSIDIANA","#c9a0ff"],emblem:"shield",emblemColor:"#c9a0ff",emblemColor2:"#7c3aed",emblemY:-.02,emblemScale:.7,sub:["VIDRO VULCÂNICO","#c9a0ff"],vintage:.2},"Vidro negro: pesa e não sai do lugar."),ye("infinito","Infinito","mitica",180,"allround","#ff4fa3",{bg:["#ff8fd0","#6a1fa0"],metal:"gold",arcTop:["INFINITO","#fff"],center:"∞",centerColor:"#fff",centerFont:"serif",centerSize:.6,emblem:"target",emblemColor:"#ff4fa3",emblemColor2:"#fff",emblemY:0,emblemScale:.95,vintage:.1},"A tampinha suprema. Melhor em tudo.")];function jo(n,e,t,i,s,a){return{id:n,name:e,rarity:"comum",unlock:99999,hidden:!0,stats:s,top:t,side:od(t),ring:rd[i.metal||"steel"],art:i,desc:a}}zt.push(jo("enferrujada","Enferrujada","#8a5a2e",{bg:["#9a6a38","#5a3a18"],metal:"copper",arcTop:["FERRO VELHO","#3a2408"],center:"Rusty",centerColor:"#3a2408",centerFont:"script",centerSize:.44,vintage:.9},{weight:1.02,slide:.88,stability:.92,bounce:.86,control:.9,power:.92,grip:.94},"Achada no quintal. Pesadinha, mas cheia de vontade."),jo("riscada","Riscada","#6b7078",{bg:["#8a9098","#4a5058"],metal:"steel",arcTop:["BEM USADA","#2a2e33"],center:"Risk",centerColor:"#2a2e33",centerFont:"slab",centerSize:.4,vintage:.85},{weight:.9,slide:.95,stability:.88,bounce:.92,control:.92,power:.88,grip:.88},"Cheia de riscos de batalha. Levinha e escorregadia."),jo("desbotada","Desbotada","#c9b89a",{bg:["#d9c9a8","#a89670"],metal:"silver",arcTop:["COR? QUE COR?","#7a6a48"],center:"Fade",centerColor:"#7a6a48",centerFont:"serif",centerSize:.42,vintage:.95},{weight:.92,slide:.9,stability:.94,bounce:.88,control:.95,power:.86,grip:.9},"O sol levou a cor, não a mira. Um tiquinho mais precisa."));const Is=["#e5484d","#3b82f6","#3fae6a","#f7d046","#f59e0b","#7c3aed"],lt=n=>zt.find(e=>e.id===n)||zt[0],kv=[.06,.06,.05,.1,.06];function ks(n,e){e.unlock=99999,e.prize=n;const t=kv[n]??.06,i=1+t,s=1+t*.6;for(const a of Object.keys(e.stats))e.stats[a]=+(e.stats[a]*(e.stats[a]>=1?i:s)).toFixed(3);return e}zt.push(ks(0,ye("itubaina","Itubaína Retrô","comum",99999,"nimble","#d81f26",{bg:["#e8433a","#b01218"],metal:"steel",arcTop:["DESDE 1948","#ffe9c0"],center:"Itubaína",centerColor:"#fff",centerFont:"script",centerSize:.4,sub:["TUTTI-FRUTTI","#ffe9c0"],vintage:.5},"O tutti-frutti do quintal brasileiro. Ágil como a molecada.")),ks(1,ye("nesbitts","Nesbitt's California","rara",99999,"bouncy","#f79420",{bg:["#f79420","#d85f0e"],metal:"steel",band:["#1c1c1c","NESBITT'S","#f79420"],arcTop:["CALIFORNIA","#fff"],sub:["ORANGE","#1c1c1c"],vintage:.5},"A laranja da calçada californiana. Quica cheia de sol.")),ks(2,ye("hires","Hires Root Beer","epica",99999,"heavy","#1a4fa0",{bg:["#1f5ab0","#0d3070"],metal:"silver",arcTop:["SINCE 1876","#f4d76a"],center:"Hires",centerColor:"#fff",centerFont:"script",centerSize:.46,sub:["ROOT BEER","#f79420"],vintage:.5},"A root beer mais antiga da cidade. Pesada e imponente.")),ks(3,ye("guarana","Guaraná Champagne","lendaria",99999,"glide","#1f7a3a",{bg:["#2f9a4c","#115c26"],metal:"gold",arcTop:["CHAMPAGNE","#ffe9c0"],center:"Guaraná",centerColor:"#fff",centerFont:"script",centerSize:.4,emblem:"cherry",emblemColor:"#d8231f",emblemY:.42,emblemScale:.5,sub:["ANTARCTICA","#ffe9c0"],vintage:.45},"O orgulho nacional, bagas vermelhas e tudo. Desliza como espuma.")),ks(4,ye("schweppes","Schweppes 1783","mitica",99999,"precise","#0e4a2c",{bg:["#11593a","#062b1a"],metal:"gold",arcTop:["SINCE 1783","#e8c86a"],center:"Schweppes",centerColor:"#f2e2b0",centerFont:"script",centerSize:.32,emblem:"sunburst",emblemColor:"#e8c86a",emblemColor2:"#e8c86a",emblemY:-.4,emblemScale:.34,sub:["SODA WATER","#e8c86a"],vintage:.4},"A soda mais antiga do MUNDO. Precisão de dois séculos e meio.")));const Ko=n=>zt.filter(e=>!e.hidden&&(n>=e.unlock||Ie.hasBonus(e.id))),Pi={comum:"#9aa2ac",rara:"#3b82f6",epica:"#a855f7",lendaria:"#f5b400",mitica:"#ff4fa3"},ka={comum:"Comum",rara:"Rara",epica:"Épica",lendaria:"Lendária",mitica:"Mítica"},Nv=["comum","rara","epica","lendaria","mitica"],Ne=Math.PI*2;function Uv(n,e,t,i,s){if(typeof s=="string")return s;const a=n.createRadialGradient(e-i*.18,t-i*.22,i*.1,e,t,i);return a.addColorStop(0,s[0]),a.addColorStop(1,s[1]),a}function $c(n,e,t,i,s,a,o,r){n.save(),n.fillStyle=r,n.font=o,n.textAlign="center",n.textBaseline="middle";const c=[...e];let l=0;const h=c.map(u=>{const g=n.measureText(u).width+s*.02;return l+=g,g}),f=l/s;let d=a?-Math.PI/2-f/2:Math.PI/2+f/2;for(let u=0;u<c.length;u++){const g=h[u]/s;d+=(a?1:-1)*g/2,n.save(),n.translate(t+Math.cos(d)*s,i+Math.sin(d)*s),n.rotate(a?d+Math.PI/2:d-Math.PI/2),n.fillText(c[u],0,0),n.restore(),d+=(a?1:-1)*g/2}n.restore()}function Fv(n,e,t,i,s){let a=i;for(n.font=`${s} ${a}px sans-serif`;n.measureText(e).width>t&&a>8;)a-=2,n.font=`${s} ${a}px sans-serif`;return a}function Ov(n,e,t=!0){n.beginPath(),e.forEach((i,s)=>s?n.lineTo(i[0],i[1]):n.moveTo(i[0],i[1])),t&&n.closePath()}function qa(n,e,t,i,s,a,o=-Math.PI/2){n.beginPath();for(let r=0;r<a*2;r++){const c=r%2?s:i,l=o+r/(a*2)*Ne,h=e+Math.cos(l)*c,f=t+Math.sin(l)*c;r?n.lineTo(h,f):n.moveTo(h,f)}n.closePath()}function Bv(n,e,t,i,s,a,o){n.save(),n.translate(t,i);const r=l=>{n.fillStyle=l,n.fill()},c=(l,h)=>{n.strokeStyle=l,n.lineWidth=h,n.lineJoin="round",n.lineCap="round",n.stroke()};switch(e){case"star":qa(n,0,0,s,s*.42,5),r(a);break;case"star6":qa(n,0,0,s,s*.5,6),r(a);break;case"sunburst":{for(let l=0;l<16;l++){const h=l/16*Ne;n.save(),n.rotate(h),n.beginPath(),n.moveTo(s*.5,-s*.06),n.lineTo(s*1.05,0),n.lineTo(s*.5,s*.06),n.closePath(),r(a),n.restore()}n.beginPath(),n.arc(0,0,s*.5,0,Ne),r(o||a);break}case"cherry":{n.beginPath(),n.moveTo(-s*.1,-s*.9),n.bezierCurveTo(s*.3,-s*.7,-s*.4,-s*.1,-s*.35,s*.2),c("#3c6b2e",s*.1),n.beginPath(),n.moveTo(-s*.1,-s*.9),n.bezierCurveTo(s*.4,-s*.6,s*.5,-s*.1,s*.45,s*.2),c("#3c6b2e",s*.1),n.beginPath(),n.arc(-s*.38,s*.5,s*.34,0,Ne),r(a),n.beginPath(),n.arc(s*.42,s*.45,s*.34,0,Ne),r(a),n.fillStyle="rgba(255,255,255,.5)",n.beginPath(),n.arc(-s*.48,s*.4,s*.09,0,Ne),n.arc(s*.32,s*.35,s*.09,0,Ne),n.fill();break}case"grape":{n.fillStyle=a,[[-.5,-.4,.5],[-.75,-.25,.25,.75],[-.5,0,.5],[-.25,.25],[0]].forEach((h,f)=>h.forEach(d=>{n.beginPath(),n.arc(d*s,(-.55+f*.34)*s,s*.2,0,Ne),n.fill()})),n.strokeStyle="#3c6b2e",n.lineWidth=s*.09,n.beginPath(),n.moveTo(0,-s*.75),n.lineTo(s*.2,-s*1.05),n.stroke();break}case"orange":{n.beginPath(),n.arc(0,0,s,0,Ne),r(a),n.strokeStyle="rgba(255,255,255,.55)",n.lineWidth=s*.06;for(let l=0;l<8;l++){const h=l/8*Ne;n.beginPath(),n.moveTo(0,0),n.lineTo(Math.cos(h)*s*.9,Math.sin(h)*s*.9),n.stroke()}n.beginPath(),n.arc(0,0,s*.16,0,Ne),n.fillStyle="rgba(255,255,255,.4)",n.fill();break}case"lemon":{n.save(),n.rotate(-.5),n.beginPath(),n.ellipse(0,0,s,s*.62,0,0,Ne),r(a),n.beginPath(),n.moveTo(-s,0),n.lineTo(-s*1.18,0),c(a,s*.14),n.beginPath(),n.moveTo(s,0),n.lineTo(s*1.18,0),c(a,s*.14),n.restore();break}case"apple":{n.beginPath(),n.moveTo(0,-s*.5),n.bezierCurveTo(-s*1.1,-s*1.1,-s*1.1,s*.5,0,s),n.bezierCurveTo(s*1.1,s*.5,s*1.1,-s*1.1,0,-s*.5),r(a),n.strokeStyle="#3c6b2e",n.lineWidth=s*.11,n.beginPath(),n.moveTo(0,-s*.5),n.lineTo(s*.08,-s*.95),n.stroke(),n.fillStyle="#3c6b2e",n.beginPath(),n.ellipse(s*.35,-s*.85,s*.28,s*.14,-.6,0,Ne),n.fill();break}case"bottle":{n.fillStyle=a,n.beginPath(),n.moveTo(-s*.28,-s),n.lineTo(s*.28,-s),n.lineTo(s*.28,-s*.5),n.bezierCurveTo(s*.55,-s*.3,s*.5,s*.9,s*.4,s),n.lineTo(-s*.4,s),n.bezierCurveTo(-s*.5,s*.9,-s*.55,-s*.3,-s*.28,-s*.5),n.closePath(),n.fill(),n.fillStyle="rgba(255,255,255,.3)",n.fillRect(-s*.2,-s*.2,s*.14,s*.9);break}case"duck":{n.fillStyle=a,n.beginPath(),n.arc(-s*.1,-s*.15,s*.6,0,Ne),n.fill(),n.beginPath(),n.arc(s*.4,-s*.35,s*.4,0,Ne),n.fill(),n.fillStyle=o||"#f2a400",n.beginPath(),n.moveTo(s*.7,-s*.35),n.quadraticCurveTo(s*1.25,-s*.25,s*.75,-s*.05),n.closePath(),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(s*.5,-s*.42,s*.07,0,Ne),n.fill();break}case"bear":{n.fillStyle=a,n.beginPath(),n.arc(0,s*.2,s*.7,0,Ne),n.fill(),n.beginPath(),n.arc(0,-s*.55,s*.42,0,Ne),n.fill(),n.beginPath(),n.arc(-s*.32,-s*.85,s*.16,0,Ne),n.arc(s*.32,-s*.85,s*.16,0,Ne),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(-s*.14,-s*.6,s*.06,0,Ne),n.arc(s*.14,-s*.6,s*.06,0,Ne),n.arc(0,-s*.42,s*.08,0,Ne),n.fill();break}case"clown":{n.fillStyle="#ffe0c4",n.beginPath(),n.arc(0,s*.1,s*.62,0,Ne),n.fill(),n.fillStyle=a,n.beginPath(),n.arc(0,s*.35,s*.22,0,Ne),n.fill(),n.beginPath(),n.arc(-s*.5,s*.05,s*.2,0,Ne),n.arc(s*.5,s*.05,s*.2,0,Ne),n.fill(),n.fillStyle=o||"#c0392b",n.beginPath(),n.moveTo(-s*.55,-s*.45),n.lineTo(0,-s),n.lineTo(s*.55,-s*.45),n.closePath(),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(-s*.2,s*.02,s*.06,0,Ne),n.arc(s*.2,s*.02,s*.06,0,Ne),n.fill();break}case"goat":{n.fillStyle=a,n.beginPath(),n.moveTo(0,s),n.lineTo(-s*.4,s*.2),n.lineTo(-s*.2,-s*.4),n.lineTo(0,-s*.2),n.lineTo(s*.2,-s*.4),n.lineTo(s*.4,s*.2),n.closePath(),n.fill(),n.strokeStyle=a,n.lineWidth=s*.14,n.beginPath(),n.moveTo(-s*.2,-s*.4),n.quadraticCurveTo(-s*.7,-s*.7,-s*.4,-s*1.05),n.moveTo(s*.2,-s*.4),n.quadraticCurveTo(s*.7,-s*.7,s*.4,-s*1.05),n.stroke();break}case"eagle":{n.fillStyle=a,n.beginPath(),n.moveTo(0,-s*.2),n.quadraticCurveTo(-s*1.1,-s*.7,-s*1.2,0),n.quadraticCurveTo(-s*.6,0,0,s*.4),n.quadraticCurveTo(s*.6,0,s*1.2,0),n.quadraticCurveTo(s*1.1,-s*.7,0,-s*.2),n.fill(),n.beginPath(),n.arc(0,-s*.45,s*.28,0,Ne),n.fill(),n.fillStyle=o||"#f2a400",n.beginPath(),n.moveTo(0,-s*.3),n.lineTo(s*.18,-s*.1),n.lineTo(-s*.18,-s*.1),n.closePath(),n.fill();break}case"diamond":{n.beginPath(),n.moveTo(0,-s),n.lineTo(s*.7,0),n.lineTo(0,s),n.lineTo(-s*.7,0),n.closePath(),r(a),n.fillStyle="rgba(255,255,255,.35)",n.beginPath(),n.moveTo(0,-s),n.lineTo(s*.35,-s*.5),n.lineTo(0,0),n.lineTo(-s*.35,-s*.5),n.closePath(),n.fill();break}case"cards":{const l=(h,f)=>{n.save(),n.translate(h,0),n.rotate(f),n.fillStyle="#fff",n.strokeStyle="#c0392b",n.lineWidth=s*.04,n.beginPath(),n.rect(-s*.32,-s*.5,s*.64,s),n.fill(),n.stroke(),n.fillStyle="#c0392b",qa(n,0,-s*.22,s*.16,s*.07,5),n.fill(),n.restore()};l(-s*.28,-.28),l(s*.28,.28),l(0,0);break}case"bolt":{n.fillStyle=a,Ov(n,[[-s*.1,-s],[s*.5,-s*.15],[s*.1,-s*.15],[s*.4,s],[-s*.5,-s*.05],[-s*.05,-s*.05]]),n.fill();break}case"crown":{n.fillStyle=a,n.beginPath(),n.moveTo(-s,s*.5),n.lineTo(-s,-s*.3),n.lineTo(-s*.5,s*.1),n.lineTo(0,-s*.6),n.lineTo(s*.5,s*.1),n.lineTo(s,-s*.3),n.lineTo(s,s*.5),n.closePath(),n.fill();break}case"buddha":{n.fillStyle=a,n.beginPath(),n.arc(0,s*.35,s*.75,0,Math.PI),n.fill(),n.beginPath(),n.arc(0,-s*.35,s*.4,0,Ne),n.fill(),n.fillStyle="rgba(0,0,0,.25)",n.beginPath(),n.arc(0,s*.4,s*.45,.2,Math.PI-.2),n.stroke();break}case"wave":{n.strokeStyle=a,n.lineWidth=s*.34,n.beginPath(),n.arc(-s*.2,s*.1,s*.7,-Math.PI*.85,Math.PI*.2),n.stroke(),n.fillStyle=o||a;for(const[l,h]of[[-.7,.5],[-.3,.7],[.2,.6]])n.beginPath(),n.arc(l*s,h*s,s*.12,0,Ne),n.fill();break}case"key":{n.strokeStyle=a,n.lineWidth=s*.18,n.beginPath(),n.arc(-s*.5,0,s*.4,0,Ne),n.stroke(),n.beginPath(),n.moveTo(-s*.15,0),n.lineTo(s*.9,0),n.moveTo(s*.7,0),n.lineTo(s*.7,s*.35),n.moveTo(s*.9,0),n.lineTo(s*.9,s*.45),n.stroke();break}case"shield":{n.fillStyle=a,n.beginPath(),n.moveTo(0,-s),n.lineTo(s*.8,-s*.6),n.lineTo(s*.7,s*.3),n.quadraticCurveTo(s*.4,s,0,s*1.05),n.quadraticCurveTo(-s*.4,s,-s*.7,s*.3),n.lineTo(-s*.8,-s*.6),n.closePath(),n.fill();break}case"heart":{n.fillStyle=a,n.beginPath(),n.moveTo(0,s*.9),n.bezierCurveTo(-s*1.3,-s*.1,-s*.5,-s,0,-s*.35),n.bezierCurveTo(s*.5,-s,s*1.3,-s*.1,0,s*.9),n.fill();break}case"glass":{n.fillStyle=a,n.beginPath(),n.moveTo(-s*.5,-s*.7),n.lineTo(s*.5,-s*.7),n.lineTo(s*.32,s*.8),n.lineTo(-s*.32,s*.8),n.closePath(),n.fill(),n.fillStyle="#fff",n.beginPath(),n.ellipse(0,-s*.7,s*.5,s*.16,0,0,Ne),n.fill();break}case"snow":{n.strokeStyle=a,n.lineWidth=s*.1;for(let l=0;l<6;l++)n.save(),n.rotate(l/6*Ne),n.beginPath(),n.moveTo(0,0),n.lineTo(0,-s),n.moveTo(0,-s*.6),n.lineTo(s*.25,-s*.8),n.moveTo(0,-s*.6),n.lineTo(-s*.25,-s*.8),n.stroke(),n.restore();break}case"leaf":{n.fillStyle=a,n.beginPath(),n.moveTo(0,s),n.bezierCurveTo(-s,s*.2,-s*.6,-s,0,-s),n.bezierCurveTo(s*.6,-s,s,s*.2,0,s),n.fill(),n.strokeStyle="rgba(0,0,0,.2)",n.lineWidth=s*.06,n.beginPath(),n.moveTo(0,s),n.lineTo(0,-s),n.stroke();break}case"pinup":{n.fillStyle=a,n.beginPath(),n.arc(0,-s*.5,s*.32,0,Ne),n.fill(),n.beginPath(),n.moveTo(-s*.3,-s*.2),n.quadraticCurveTo(0,s*.1,s*.3,-s*.2),n.quadraticCurveTo(s*.6,s*.7,0,s),n.quadraticCurveTo(-s*.6,s*.7,-s*.3,-s*.2),n.fill();break}case"dragon":{n.fillStyle=a,n.beginPath(),n.moveTo(-s,s*.3),n.quadraticCurveTo(-s*.2,-s*.2,s*.3,-s*.5),n.quadraticCurveTo(s,-s,s*.9,-s*.1),n.quadraticCurveTo(s*.4,s*.2,s*.5,s*.8),n.quadraticCurveTo(0,s*.3,-s,s*.3),n.fill();break}case"thumb":{n.fillStyle=a,n.beginPath(),n.roundRect(-s*.25,-s*.1,s*.5,s,s*.1),n.fill(),n.beginPath(),n.roundRect(-s*.55,-s*.1,s*.32,s*.55,s*.14),n.fill(),n.beginPath(),n.arc(s*.05,-s*.3,s*.34,Math.PI,Ne),n.fill();break}case"ring":{n.strokeStyle=a,n.lineWidth=s*.16,n.beginPath(),n.arc(0,0,s*.8,0,Ne),n.stroke();break}case"target":{for(let l=3;l>=1;l--)n.beginPath(),n.arc(0,0,s*l/3,0,Ne),n.fillStyle=l%2?a:o||"#fff",n.fill();break}default:n.beginPath(),n.arc(0,0,s*.6,0,Ne),r(a);break}n.restore()}const zv={steel:["#f2f4f6","#b9c0c7","#7c848c"],silver:["#ffffff","#c8ccd2","#868c94"],gold:["#fff3c0","#e8be55","#9c7818"],copper:["#f4c9a0","#c67e46","#7c471f"],dark:["#6b7078","#3a3e44","#1c1f24"]};function gt(n,e=360){const t=document.createElement("canvas");t.width=t.height=e;const i=t.getContext("2d"),s=e/2,a=e/2,o=e*.5-1,r=o*.82,c=zv[n.metal||"steel"],l=21;for(let d=0;d<l;d++){const u=d/l*Ne-Math.PI/2,g=(d+1)/l*Ne-Math.PI/2,v=(u+g)/2;i.beginPath(),i.moveTo(s+Math.cos(u)*r,a+Math.sin(u)*r),i.arc(s,a,r,u,g),i.arc(s,a,o,g,u,!0),i.closePath();const p=.5+.5*Math.cos(v+.7),m=i.createLinearGradient(s+Math.cos(v)*r,a+Math.sin(v)*r,s+Math.cos(v)*o,a+Math.sin(v)*o);m.addColorStop(0,c[1]),m.addColorStop(1,p>.5?c[0]:c[2]),i.fillStyle=m,i.fill(),i.strokeStyle="rgba(0,0,0,0.18)",i.lineWidth=e*.004,i.beginPath(),i.moveTo(s+Math.cos(u)*r,a+Math.sin(u)*r),i.lineTo(s+Math.cos(u)*o,a+Math.sin(u)*o),i.stroke()}if(i.beginPath(),i.arc(s,a,r,0,Ne),i.strokeStyle="rgba(0,0,0,0.28)",i.lineWidth=e*.01,i.stroke(),i.save(),i.beginPath(),i.arc(s,a,r-1,0,Ne),i.clip(),i.fillStyle=Uv(i,s,a,r,n.bg),i.fillRect(0,0,e,e),n.fringe&&(i.strokeStyle=n.fringe,i.lineWidth=r*.14,i.beginPath(),i.arc(s,a,r*.9,0,Ne),i.stroke()),n.rings){i.strokeStyle=n.rings,i.lineWidth=e*.006;for(const d of[.62,.7])i.beginPath(),i.arc(s,a,r*d,0,Ne),i.stroke()}if(n.emblem&&Bv(i,n.emblem,s,a+(n.emblemY??0)*r,r*.34*(n.emblemScale??1),n.emblemColor||"#c0392b",n.emblemColor2||""),n.stars){i.fillStyle=n.starColor||"#fff";for(let d=0;d<n.stars;d++){const u=-Math.PI/2+d/n.stars*Ne;qa(i,s+Math.cos(u)*r*.6,a+Math.sin(u)*r*.6,r*.07,r*.03,5),i.fill()}}if(n.band){const[d,u,g]=n.band;if(i.fillStyle=d,i.fillRect(s-r,a-r*.26,r*2,r*.52),u){const v=Fv(i,u,r*1.7,r*.34,"800");i.fillStyle=g,i.font=`800 ${v}px sans-serif`,i.textAlign="center",i.textBaseline="middle",i.fillText(u,s,a+r*.01)}}if(n.arcTop&&$c(i,n.arcTop[0],s,a,r*.82,!0,`800 ${r*.15}px sans-serif`,n.arcTop[1]),n.arcBot&&$c(i,n.arcBot[0],s,a,r*.82,!1,`800 ${r*.13}px sans-serif`,n.arcBot[1]),n.center){const d=n.centerFont||"block",u=d==="script"?"italic 900":d==="serif"?"bold":d==="slab"?"900":"800",g=d==="script"?"'Segoe Script','Brush Script MT',cursive":d==="serif"?"Georgia,serif":"sans-serif";let v=(n.centerSize??.42)*r;for(i.font=`${u} ${v}px ${g}`;i.measureText(n.center).width>r*1.55&&v>8;)v-=2,i.font=`${u} ${v}px ${g}`;i.fillStyle=n.centerColor||"#fff",i.textAlign="center",i.textBaseline="middle";const p=a+(n.band?0:n.arcBot||n.sub?-r*.05:0);d==="script"?(i.save(),i.translate(s,p),i.transform(1,0,-.18,1,0,0),i.fillText(n.center,0,0),i.restore()):i.fillText(n.center,s,p)}n.sub&&(i.fillStyle=n.sub[1],i.font=`700 ${r*.13}px sans-serif`,i.textAlign="center",i.textBaseline="middle",i.fillText(n.sub[0],s,a+r*.42));const h=n.vintage??.35;if(h>0){for(let u=0;u<40*h;u++)i.globalAlpha=.05+Math.random()*.12,i.fillStyle=Math.random()<.5?"#3a2a12":"#fff",i.beginPath(),i.arc(s+(Math.random()-.5)*r*2,a+(Math.random()-.5)*r*2,r*(.01+Math.random()*.05),0,Ne),i.fill();i.globalAlpha=1,i.strokeStyle="rgba(255,255,255,0.12)",i.lineWidth=1;for(let u=0;u<6*h;u++){i.beginPath();const g=Math.random()*Ne,v=Math.random()*r;i.moveTo(s+Math.cos(g)*v,a+Math.sin(g)*v),i.lineTo(s+Math.cos(g)*(v+r*.3),a+Math.sin(g)*(v+r*.3)),i.stroke()}const d=i.createRadialGradient(s,a,r*.4,s,a,r);d.addColorStop(0,"rgba(0,0,0,0)"),d.addColorStop(1,`rgba(30,18,6,${.14+h*.22})`),i.fillStyle=d,i.fillRect(0,0,e,e)}i.restore();const f=i.createLinearGradient(0,0,e*.7,e*.7);return f.addColorStop(0,"rgba(255,255,255,0.28)"),f.addColorStop(.35,"rgba(255,255,255,0.05)"),f.addColorStop(1,"rgba(255,255,255,0)"),i.save(),i.beginPath(),i.arc(s,a,o,0,Ne),i.clip(),i.fillStyle=f,i.fillRect(0,0,e,e),i.restore(),t}const Jo=new Map;function Gv(n,e){if(Jo.has(n))return Jo.get(n);const t=new ao(gt(e,384));return t.colorSpace=rn,t.anisotropy=8,Jo.set(n,t),t}const Na=.5;class Hv{constructor(e){this.group=new Bt;const t=lt(e.skin),i=new Q(new ht(e.radius,e.radius*.96,Na,40),new Ve({color:t.side,roughness:.45,metalness:.25}));i.position.y=Na/2,i.castShadow=!0,this.group.add(i);const s=new Q(new Ft(e.radius,.07,8,40),new Ve({color:t.ring,roughness:.5,metalness:.3}));s.rotation.x=Math.PI/2,s.position.y=Na-.03,this.group.add(s),this.top=new Q(new Sn(e.radius*.99,44),new Ve({map:Gv(t.id,t.art),roughness:.42,metalness:.25,transparent:!0})),this.top.rotation.x=-Math.PI/2,this.top.position.y=Na+.005,this.group.add(this.top),this.ringHi=new Q(new Ft(e.radius+.35,.09,8,32),new Ut({color:16777215,transparent:!0,opacity:.9,blending:ui,depthWrite:!1})),this.ringHi.rotation.x=-Math.PI/2,this.ringHi.position.y=.05,this.ringHi.visible=!1,this.group.add(this.ringHi)}update(e,t,i){this.group.visible=!0;const s=e.moving?Math.abs(Math.sin(t*20))*.03:Math.sin(t*2+e.bob)*.015;this.group.position.set(e.pos.x,s+(e.z||0),e.pos.y),this.group.rotation.y=e.angle,e.airborne?this.group.rotation.x=Math.sin(t*10)*.25:this.group.rotation.x=0;const a=(1+e.hitFlash*.12)*(1+(e.z||0)*.05);if(this.group.scale.set(a,1-e.hitFlash*.1,a),this.ringHi.visible=i&&!e.finished,i){const o=1+Math.sin(t*6)*.06;this.ringHi.scale.set(o,o,o),this.ringHi.material.opacity=.5+Math.sin(t*6)*.25}}}class Vv{constructor(){this.group=new Bt,this.views=[]}build(e){this.group.clear(),this.views=[];for(const t of e){const i=new Hv(t);this.views.push(i),this.group.add(i.group)}}update(e,t,i){for(let s=0;s<e.length;s++)this.views[s]?.update(e[s],t,e[s].id===i)}}function Wv(){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),i=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.6,"rgba(255,255,255,0.6)"),i.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=i,t.fillRect(0,0,64,64),new ao(e)}class qv{constructor(){this.cap=700,this.ps=[];const e=new $t;this.pos=new Float32Array(this.cap*3),this.col=new Float32Array(this.cap*3),this.siz=new Float32Array(this.cap),e.setAttribute("position",new vn(this.pos,3)),e.setAttribute("color",new vn(this.col,3)),e.setAttribute("size",new vn(this.siz,1));const t=new Xh({size:.6,map:Wv(),vertexColors:!0,transparent:!0,depthWrite:!1,sizeAttenuation:!0,blending:Bi});this.points=new jg(e,t),this.points.frustumCulled=!1}emit(e,t,i,s,a,o,r,c,l,h){this.ps.length>=this.cap&&this.ps.shift(),this.ps.push({x:e,y:t,z:i,vx:s,vy:a,vz:o,life:r,max:r,size:c,grav:l,r:h.r,g:h.g,b:h.b})}dust(e,t,i=6,s="#d8c090"){const a=new He(s);for(let o=0;o<i;o++)this.emit(e,.1,t,(Math.random()-.5)*2,Math.random()*1.5+.5,(Math.random()-.5)*2,.5+Math.random()*.4,.6+Math.random()*.5,-1.2,a)}impact(e,t,i,s="#fff4d0"){const a=new He(s),o=Math.min(18,5+i);for(let r=0;r<o;r++){const c=Math.random()*6.28,l=2+Math.random()*i*.5;this.emit(e,.3,t,Math.cos(c)*l,1+Math.random()*2,Math.sin(c)*l,.35+Math.random()*.3,.35,-3,a)}}skid(e,t){this.emit(e,.05,t,0,0,0,.9,.5,0,new He("#00000022"))}confetti(e,t){const i=["#e5484d","#3b82f6","#3fae6a","#f7d046","#f59e0b","#7c3aed","#ffffff"];for(let s=0;s<160;s++){const a=new He(i[s%i.length]);this.emit(e+(Math.random()-.5)*20,14+Math.random()*6,t+(Math.random()-.5)*20,(Math.random()-.5)*3,-2-Math.random()*2,(Math.random()-.5)*3,2.4+Math.random()*1.5,.7,-.6,a)}}update(e){for(let s=this.ps.length-1;s>=0;s--){const a=this.ps[s];if(a.life-=e,a.life<=0){this.ps.splice(s,1);continue}a.vy+=a.grav*e,a.x+=a.vx*e,a.y+=a.vy*e,a.z+=a.vz*e,a.y<.02&&(a.y=.02,a.vy=0,a.vx*=.7,a.vz*=.7)}const t=Math.min(this.ps.length,this.cap);for(let s=0;s<t;s++){const a=this.ps[s],o=a.life/a.max;this.pos[s*3]=a.x,this.pos[s*3+1]=a.y,this.pos[s*3+2]=a.z,this.col[s*3]=a.r,this.col[s*3+1]=a.g,this.col[s*3+2]=a.b,this.siz[s]=a.size*o}for(let s=t;s<this.cap;s++)this.siz[s]=0;const i=this.points.geometry;i.getAttribute("position").needsUpdate=!0,i.getAttribute("color").needsUpdate=!0,i.getAttribute("size").needsUpdate=!0}}class $v{constructor(){this.group=new Bt,this.mat=new Ut({color:3394645,transparent:!0,opacity:.9}),this.shaft=new Q(new En(1,.5),this.mat),this.shaft.rotation.x=-Math.PI/2,this.head=new Q(new Sn(.9,3),this.mat),this.head.rotation.x=-Math.PI/2,this.ring=new Q(new Ft(1.1,.08,8,28),new Ut({color:16777215,transparent:!0,opacity:.6})),this.ring.rotation.x=-Math.PI/2;const e=new hv({color:16777215,dashSize:.4,gapSize:.3,transparent:!0,opacity:.7}),t=new $t().setFromPoints([new N,new N]);this.pull=new Yg(t,e),this.pull.computeLineDistances(),this.group.add(this.shaft,this.head,this.ring,this.pull),this.group.visible=!1}set(e,t,i,s,a){this.group.visible=!0;const o=Math.atan2(s,i),r=2+a*12,c=new He().setHSL(.33*(1-a),.75,.5);this.mat.color.copy(c),this.shaft.position.set(e+Math.cos(o)*(r/2+1.1),.12,t+Math.sin(o)*(r/2+1.1)),this.shaft.scale.set(r,1,1),this.shaft.rotation.z=0,this.shaft.rotation.y=0,this.shaft.rotation.set(-Math.PI/2,0,-o),this.head.position.set(e+Math.cos(o)*(r+1.4),.12,t+Math.sin(o)*(r+1.4)),this.head.rotation.set(-Math.PI/2,0,-o-Math.PI/2),this.head.scale.setScalar(.7+a*.6),this.ring.position.set(e,.1,t);const l=[new N(e,.15,t),new N(e-Math.cos(o)*r*.6,.15,t-Math.sin(o)*r*.6)];this.pull.geometry.setFromPoints(l),this.pull.computeLineDistances()}hide(){this.group.visible=!1}}const Xv=34,Yv=6;function ld(n){return n.some(e=>(e.moving||e.airborne)&&!e.finished)}function cd(n,e,t){const i=[],s=e.def;for(const a of n){if(a.hitFlash=Math.max(0,a.hitFlash-t*4),a.finished||!a.moving&&!a.airborne)continue;const o=ue(a.pos.x,a.pos.y);if(a.airborne){if(a.pos.x+=a.vel.x*t,a.pos.y+=a.vel.y*t,a.vz-=Xv*t,a.z+=a.vz*t,a.angle+=7*t,a.progress>e.total*.72&&e.crossedFinish(o,a.pos)){a.finished=!0,a.vel=ue(),a.moving=!1,a.airborne=!1,a.z=0,i.push({type:"finish",capId:a.id,x:a.pos.x,y:a.pos.y,power:0});continue}a.z<=0&&(a.z=0,a.airborne=!1,a.vel=Ml(a.vel,Math.min(.92,.7+.14*a.stats.stability)),i.push({type:"land",capId:a.id,x:a.pos.x,y:a.pos.y,power:en(a.vel)})),a.pos.x>=0&&a.pos.y>=0&&a.pos.x<=s.w&&a.pos.y<=s.h&&(a.progress=e.progressOf(a.pos));continue}const r=e.surfaceAt(a.pos),c=td[r],l=e.patchAt(a.pos);if(r==="ramp"){const v=l?.dir!=null?{x:Math.cos(l.dir),y:Math.sin(l.dir)}:Qt(a.vel);a.vel.x+=v.x*30*t,a.vel.y+=v.y*30*t}else if(r==="push"){const v=l?.dir!=null?{x:Math.cos(l.dir),y:Math.sin(l.dir)}:{x:-a.vel.x,y:-a.vel.y};a.vel.x=a.vel.x*.93+v.x*30*t,a.vel.y=a.vel.y*.93+v.y*30*t}else if(r==="water"){const v=l?.dir!=null?{x:Math.cos(l.dir),y:Math.sin(l.dir)}:{x:0,y:0};a.vel.x+=v.x*10*t,a.vel.y+=v.y*10*t}else if(r==="magnet"&&l){const v=l.x-a.pos.x,p=l.y-a.pos.y,m=Math.hypot(v,p);m>.05&&(a.vel.x+=v/m*26*t,a.vel.y+=p/m*26*t)}else if(r==="vortex"&&l){const p=(Math.sin(l.x*3.7+l.y*2.3)>=0?1:-1)*2*t,m=Math.cos(p),y=Math.sin(p),b=a.vel.x*m-a.vel.y*y,x=a.vel.x*y+a.vel.y*m;a.vel.x=b,a.vel.y=x}const h=en(a.vel);if(h>0){const v=a.stats,p=c.fric>12,m=p?1+(v.weight-1)*.55:1,y=p?v.power*v.power:1,b=c.fric*m/(v.slide*y);let x=h-b*t;const A=r==="frost"?.3:1,S=c.drag/(.7+.3*v.slide)+(v.control-1)*(h<6?.85:.12)*A;x*=1-Math.min(.92,Math.max(0,S)*t),x<0&&(x=0);const w=Qt(a.vel);a.vel.x=w.x*x,a.vel.y=w.y*x}a.pos.x+=a.vel.x*t,a.pos.y+=a.vel.y*t;const f=en(a.vel);if(a.angVel=f*.9*(1/a.stats.stability),a.angle+=a.angVel*t,f>1.2){const v=r==="grass"?1:r==="sand"?.45:0;if(v>0){const m=Math.sin(a.pos.x*.31+a.pos.y*.23+1.7)*v*a.angVel*.095*t,y=Math.cos(m),b=Math.sin(m),x=a.vel.x*y-a.vel.y*b,A=a.vel.x*b+a.vel.y*y;a.vel.x=x,a.vel.y=A}}const d=r==="felt"?1.5:r==="metal"?1.35:r==="carpet"?.45:1,u=Math.max(1,d);e.collideWalls(a.pos,a.vel,a.radius,Math.min(.95,.42*a.stats.bounce*d))&&(i.push({type:"wall",capId:a.id,x:a.pos.x,y:a.pos.y,power:en(a.vel)}),a.hitFlash=1);for(let v=0;v<s.obstacles.length;v++){const p=s.obstacles[v];if(p.type==="band"||p.type==="mill"){for(const A of id(p)){const S=A.b.x-A.a.x,w=A.b.y-A.a.y,R=S*S+w*w||1e-6;let B=((a.pos.x-A.a.x)*S+(a.pos.y-A.a.y)*w)/R;B=B<0?0:B>1?1:B;const _=A.a.x+S*B,E=A.a.y+w*B,D=Math.hypot(a.pos.x-_,a.pos.y-E),k=.2+a.radius;if(D>=k)continue;let z=a.pos.x-_,K=a.pos.y-E;const U=Math.hypot(z,K)||1;z/=U,K/=U,a.pos.x+=z*(k-D+.01),a.pos.y+=K*(k-D+.01);const Z=a.vel.x*z+a.vel.y*K;if(Z<0){if(p.type==="band"){const j=Math.min(1.55,1.1+.03*Math.abs(Z));a.vel.x-=(1+j)*Z*z,a.vel.y-=(1+j)*Z*K;const pe=en(a.vel),me=Sl*1.05;pe>me&&(a.vel.x*=me/pe,a.vel.y*=me/pe),i.push({type:"band",capId:a.id,x:_,y:E,power:Math.abs(Z)})}else a.vel.x-=1.55*Z*z,a.vel.y-=1.55*Z*K,a.vel.x+=-K*2.2,a.vel.y+=z*2.2,i.push({type:"mill",capId:a.id,x:_,y:E,power:Math.abs(Z)});a.hitFlash=1}}continue}const m=p.type==="bug"?Xr(p):p,y=p.r+(p.type==="stone"||p.type==="top"||p.type==="bug"?a.radius:a.radius*.55),b=a.pos.x-m.x,x=a.pos.y-m.y;if(!(b*b+x*x>y*y)){if(p.type==="jump"){const A=p.dir!=null?{x:Math.cos(p.dir),y:Math.sin(p.dir)}:Qt(a.vel),S=a.vel.x*A.x+a.vel.y*A.y;if(S>Yv){a.airborne=!0,a.z=.02,a.vz=Math.min(14,6+S*.5),a.vel.x=(a.vel.x*.55+A.x*S*.5)*1.12,a.vel.y=(a.vel.y*.55+A.y*S*.5)*1.12,i.push({type:"ramp",capId:a.id,x:p.x,y:p.y,power:S});break}continue}if(p.type==="stone"){const A=Math.hypot(b,x)||1,S=b/A,w=x/A,R=y-A;a.pos.x+=S*R,a.pos.y+=w*R;const B=a.vel.x*S+a.vel.y*w;if(B<0){const _=1+Math.min(.95,.45*a.stats.bounce*u);a.vel.x-=_*B*S,a.vel.y-=_*B*w}i.push({type:"stone",capId:a.id,x:p.x,y:p.y,power:f}),a.hitFlash=1}else if(p.type==="top"){const A=Math.hypot(b,x)||1,S=b/A,w=x/A,R=y-A;a.pos.x+=S*R,a.pos.y+=w*R;const B=a.vel.x*S+a.vel.y*w;if(B<0){const _=1+.55*a.stats.bounce;a.vel.x-=_*B*S,a.vel.y-=_*B*w,a.vel.x+=-w*5.5,a.vel.y+=S*5.5,i.push({type:"top",capId:a.id,x:m.x,y:m.y,power:Math.abs(B)}),a.hitFlash=1}}else if(p.type==="bug"){const A=Math.hypot(b,x)||1,S=b/A,w=x/A,R=y-A;a.pos.x+=S*R,a.pos.y+=w*R;const B=a.vel.x*S+a.vel.y*w;B<0&&(a.vel.x-=1.25*B*S,a.vel.y-=1.25*B*w,a.vel.x*=.85,a.vel.y*=.85,i.push({type:"bug",capId:a.id,x:m.x,y:m.y,power:Math.abs(B)}))}else if(p.type==="balloon"){if(p.popped||a.consumed.has(v))continue;a.consumed.add(v),i.push({type:"balloon",capId:a.id,x:p.x,y:p.y,power:en(a.vel),obsIdx:v});for(const A of n){if(A.finished)continue;const S=A.pos.x-p.x,w=A.pos.y-p.y,R=Math.hypot(S,w);if(R>4.2||R<1e-4)continue;const B=11-R*2.2;A.vel.x+=S/R*B,A.vel.y+=w/R*B,!A.moving&&!A.finished&&(A.moving=!0),A.hitFlash=1}}else if(p.type==="hole"){if(a.shield){a.shield=!1,i.push({type:"item",capId:a.id,x:p.x,y:p.y,power:-1});continue}a.pos.x=a.cpPos.x,a.pos.y=a.cpPos.y,a.vel=ue(),a.moving=!1,i.push({type:"hole",capId:a.id,x:p.x,y:p.y,power:0});break}else if(p.type==="bomb"){a.pos.x=a.cpPos.x,a.pos.y=a.cpPos.y,a.vel=ue(),a.moving=!1,i.push({type:"bomb",capId:a.id,x:p.x,y:p.y,power:0});break}else p.type==="bonus"?!a.consumed.has(v)&&!a.takenBonus.has(v)&&(a.consumed.add(v),a.takenBonus.add(v),i.push({type:"bonus",capId:a.id,x:p.x,y:p.y,power:0,obsIdx:v,n:p.n||1})):p.type==="item"&&(a.consumed.has(v)||(a.consumed.add(v),i.push({type:"item",capId:a.id,x:p.x,y:p.y,power:0,obsIdx:v})))}}if(a.moving){if(e.surfaceAt(a.pos)==="out"){if(a.shield){a.shield=!1,a.pos.x=o.x,a.pos.y=o.y,a.vel=ue(),a.moving=!1,i.push({type:"item",capId:a.id,x:o.x,y:o.y,power:-1});continue}a.pos.x=a.resetTo.x,a.pos.y=a.resetTo.y,a.vel=ue(),a.moving=!1,i.push({type:"out",capId:a.id,x:o.x,y:o.y,power:0});continue}if(a.progress>e.total*.72&&e.crossedFinish(o,a.pos)){a.finished=!0,a.vel=ue(),a.moving=!1,i.push({type:"finish",capId:a.id,x:a.pos.x,y:a.pos.y,power:0});continue}a.progress=e.progressOf(a.pos),en(a.vel)<_v&&(a.vel=ue(),a.moving=!1,i.push({type:"rest",capId:a.id,x:a.pos.x,y:a.pos.y,power:0}))}}return jv(n,i),i}function jv(n,e){for(let t=0;t<n.length;t++)for(let i=t+1;i<n.length;i++){const s=n[t],a=n[i];if(s.finished||a.finished)continue;const o=a.pos.x-s.pos.x,r=a.pos.y-s.pos.y,c=s.radius+a.radius,l=o*o+r*r;if(l>c*c||l<1e-6)continue;const h=Math.sqrt(l),f=o/h,d=r/h,u=c-h,g=Math.pow(s.stats.weight,1.6),v=Math.pow(a.stats.weight,1.6),p=g+v;s.pos.x-=f*u*(v/p),s.pos.y-=d*u*(v/p),a.pos.x+=f*u*(g/p),a.pos.y+=d*u*(g/p);const m=a.vel.x-s.vel.x,y=a.vel.y-s.vel.y,b=m*f+y*d;if(b>0)continue;const x=.55*((s.stats.bounce+a.stats.bounce)/2),A=en(s.vel)>=en(a.vel)?s.stats.power:a.stats.power,S=-(1+x)*b/(1/g+1/v)*A,w=S*f,R=S*d;s.vel.x-=w/g/s.stats.grip,s.vel.y-=R/g/s.stats.grip,a.vel.x+=w/v/a.stats.grip,a.vel.y+=R/v/a.stats.grip;const B=Math.abs(b);B>1.5&&(s.moving||(s.moving=!0),a.moving||(a.moving=!0),s.hitFlash=1,a.hitFlash=1,e.push({type:"capHit",capId:s.id,otherId:a.id,x:(s.pos.x+a.pos.x)/2,y:(s.pos.y+a.pos.y)/2,power:B}))}}const Vt=["cauteloso","agressivo","tecnico","caotico","rival"],hd={cauteloso:"Cautelosa",agressivo:"Agressiva",tecnico:"Técnica",caotico:"Caótica",rival:"Rival"},Xc={cauteloso:{lookahead:17,powBias:1.04,risk:1.1,outPenalty:300,spread:.16,noise:.008,rival:0,offense:0},agressivo:{lookahead:24,powBias:1.18,risk:.55,outPenalty:190,spread:.24,noise:.018,rival:.25,offense:.8},tecnico:{lookahead:21,powBias:1.1,risk:.85,outPenalty:235,spread:.18,noise:.004,rival:0,offense:.1},caotico:{lookahead:16,powBias:1.1,risk:.7,outPenalty:170,spread:.32,noise:.05,rival:.15,offense:.35},rival:{lookahead:22,powBias:1.16,risk:.72,outPenalty:225,spread:.2,noise:.009,rival:.6,offense:1}};function Yc(n){return{...n,pos:ue(n.pos.x,n.pos.y),vel:ue(),z:0,vz:0,airborne:!1,cpPos:ue(n.cpPos.x,n.cpPos.y),turnStart:ue(n.turnStart.x,n.turnStart.y),resetTo:ue(n.pos.x,n.pos.y),preFlick:ue(n.pos.x,n.pos.y),consumed:new Set,takenBonus:new Set(n.takenBonus),stats:{...n.stats},moving:!1,finished:!1}}function Kv(n,e,t,i,s){const a=Yc(n);a.resetTo=ue(n.pos.x,n.pos.y);const o=t.surfaceAt(n.pos)==="gum"?nd:1;a.vel=Ml(Qt(i),Math.max(.06,Math.min(1,s))*Sl*o),a.moving=!0;const r=[a];for(const A of e){if(A.id===n.id||A.finished)continue;const S=Yc(A);r.push(S)}let c=!1,l=!1,h=!1,f=!1,d=!1,u=0,g=0,v=0,p=n.progress;const m=new Set,y=1/120;let b=0;for(;ld(r)&&b<700;){const A=cd(r,t,y);for(const S of A)S.capId===a.id?S.type==="out"?c=!0:S.type==="hole"?l=!0:S.type==="bomb"?h=!0:S.type==="finish"?f=!0:S.type==="bonus"?u+=S.n||1:S.type==="item"?g+=1:S.type==="ramp"?d=!0:S.type==="wall"&&v++:(S.type==="out"||S.type==="hole"||S.type==="bomb")&&m.add(S.capId);a.progress>p&&(p=a.progress),b++}const x=t.nearest(a.pos);return{endProg:a.progress,maxProg:p,out:c,holed:l,bombed:h,finished:f,jumped:d,dEdge:Math.max(0,x.d-x.half*.45),endPos:ue(a.pos.x,a.pos.y),bonus:u,item:g,oppHarm:m.size,walls:v,gumEnd:t.surfaceAt(a.pos)==="gum"}}function Jv(n,e,t,i){let s;return n.out?s=e.progress-t.outPenalty+(n.maxProg-e.progress)*.12:s=n.endProg-n.dEdge*t.risk*2.4,n.holed&&(s-=90),n.bombed&&(s-=120),s+=n.bonus*22,s+=n.item*20,s-=Math.min(n.walls,4)*3,n.gumEnd&&!n.finished&&(s-=9),!n.out&&!n.finished&&n.endProg<=e.progress+.5&&n.walls>0&&(s-=25),n.jumped&&(s+=10),n.finished&&(s+=500),n.oppHarm>0&&t.offense>0&&n.endProg>=e.progress-1&&(s+=n.oppHarm*t.offense*90),e.stuckTurns>=2&&!n.out&&!n.holed&&!n.bombed&&(s+=Math.min(14,ed(n.endPos,e.pos))*4),s}const os=(n,e)=>({x:n.x*Math.cos(e)-n.y*Math.sin(e),y:n.x*Math.sin(e)+n.y*Math.cos(e)});function dd(n,e,t){const i=n.ai||"tecnico",s=Xc[i]||Xc.tecnico,a=t.total,o=t.atArc(n.progress).tan,r=t.atArc(Math.min(a,n.progress+4)).p,c=t.atArc(Math.min(a,n.progress+s.lookahead)).p,l=en(an(r,n.pos))<.4?o:Qt(an(r,n.pos)),h=en(an(c,n.pos))<.4?o:Qt(an(c,n.pos));let f=null;if(s.rival>0||s.offense>0){let D=18;for(const k of e){if(k.id===n.id||k.finished)continue;const z=ed(n.pos,k.pos);z<D&&k.progress>n.progress-8&&(f=k,D=z)}}const d=t.atArc(Math.min(a,n.progress+9)),u={x:-d.tan.y,y:d.tan.x},g=Qt(an({x:d.p.x+u.x*2.7,y:d.p.y+u.y*2.7},n.pos)),v=Qt(an({x:d.p.x-u.x*2.7,y:d.p.y-u.y*2.7},n.pos));let p={dir:l,power:.2,s:-1e9},m=null;const y=(D,k)=>{const z=Math.max(.06,Math.min(1,k)),K=Kv(n,e,t,D,z),U=Jv(K,n,s);U>p.s&&(p={dir:D,power:z,s:U},m=K)},b=[8,13,s.lookahead,s.lookahead+6],x=[o,l,h,g,v];for(const D of b){const k=t.atArc(Math.min(a,n.progress+D)).p,z=en(an(k,n.pos))<.4?o:Qt(an(k,n.pos));x.push(z)}const A=s.spread,S=[0,A*.45,-A*.45],w=[.26,.42,.56,.7,.84,1];for(const D of x)for(const k of S){const z=os(D,k);for(const K of w)y(z,K*s.powBias)}for(const D of[3.5,7,12]){const k=t.atArc(Math.min(a,n.progress+D)),z={x:-k.tan.y,y:k.tan.x},K=t.nearest(k.p).half;for(const U of[-.72,-.38,.38,.72]){const Z={x:k.p.x+z.x*K*U,y:k.p.y+z.y*K*U},j=en(an(Z,n.pos))<.4?o:Qt(an(Z,n.pos));for(const pe of[.3,.5,.72])y(j,pe)}}for(const D of t.def.obstacles){if(D.type!=="jump")continue;const k=t.progressOf(ue(D.x,D.y));if(k>n.progress+1&&k<n.progress+28){const z=Qt(an(ue(D.x,D.y),n.pos));for(const K of[.72,.86,1])y(z,K)}}for(let D=0;D<t.def.obstacles.length;D++){const k=t.def.obstacles[D];if(k.type!=="item"&&k.type!=="bonus"||k.type==="bonus"&&n.takenBonus.has(D))continue;const z=t.progressOf(ue(k.x,k.y));if(z>n.progress-3&&z<n.progress+s.lookahead+6){const K=Qt(an(ue(k.x,k.y),n.pos));for(const U of[.35,.5,.65,.8])y(K,U)}}if(n.progress>a-(s.lookahead+14)){const D=t.atArc(a).p,k=Qt(an(D,n.pos));for(const z of S)for(const K of[.6,.75,.9,1])y(os(k,z),K)}if(f&&s.offense>.4){const D=Qt(an(f.pos,n.pos));for(const k of[.6,.8,1])y(D,k)}{const D=p.dir,k=p.power;for(const U of[.04,-.04,.09,-.09])for(const Z of[0,.06,-.06])y(os(D,U),k+Z);for(const U of[.03,-.03,.07,-.07])y(D,k+U);const z=p.dir,K=p.power;for(const U of[.02,-.02,.05,-.05])for(const Z of[0,.025,-.025])y(os(z,U),K+Z)}if(!m||m.out||m.holed||m.bombed||m.endProg<=n.progress+.6)for(let D=0;D<24;D++){const k=D/24*Math.PI*2,z={x:Math.cos(k),y:Math.sin(k)};for(const K of[.14,.24,.38,.55])y(z,K)}if(n.stuckTurns>=2){for(let D=0;D<24;D++){const k=D/24*Math.PI*2,z={x:Math.cos(k),y:Math.sin(k)};for(const K of[.3,.55,.8,1])y(z,K)}for(let D=0;D<14;D++)y(os(h,(Math.random()-.5)*2.4),.2+Math.random()*.8)}const B=(Math.random()-.5)*s.noise*2.2,_=os(p.dir,B),E=Math.max(.06,Math.min(1,p.power*(1+(Math.random()-.5)*s.noise)));return{dir:_,power:E}}const ms={raio:{id:"raio",name:"Raio",ico:"⚡",desc:"Manda o líder de volta pro checkpoint dele",tier:5,kind:"now"},foguete:{id:"foguete",name:"Foguete",ico:"🚀",desc:"Próximo peteléco com muito mais alcance",tier:4,kind:"arm"},salto:{id:"salto",name:"Salto",ico:"✨",desc:"Pula um trecho pra frente na pista",tier:4,kind:"now"},extra:{id:"extra",name:"Peteléco +1",ico:"➕",desc:"Ganha um peteléco extra nesta vez",tier:3,kind:"now"},escudo:{id:"escudo",name:"Escudo",ico:"🛡️",desc:"Anula o próximo buraco ou queda pra fora",tier:3,kind:"now"},ima:{id:"ima",name:"Ímã",ico:"🧲",desc:"Cola no centro e empurra de leve pra frente",tier:2,kind:"now"},turbo:{id:"turbo",name:"Turbinho",ico:"💨",desc:"Empurrãozinho pra frente no próximo peteléco",tier:1,kind:"arm"}},Zo=["raio","foguete","salto","extra","escudo","ima","turbo"];function Zv(n,e,t=Math.random){const i=Math.max(0,Math.min(1,n)),s={};for(const r of Zo){const l=(ms[r].tier-1)/4;let h=(1-l)*(1-i)+l*i;h=.12+h*h*1.6,r==="raio"&&e&&(h=0),s[r]=h}let a=0;for(const r of Zo)a+=s[r];let o=t()*a;for(const r of Zo)if(o-=s[r],o<=0)return r;return"turbo"}class Qv{constructor(){this.caps=[],this.current=0,this.phase="aim",this.finishOrder=[],this.turnNo=0,this.onEvent=()=>{},this.onChange=()=>{},this.onToast=()=>{},this.onFlick=()=>{},this.onCheckpoint=()=>{},this.acc=0,this.aiTimer=0,this.aiFired=!1,this.lastFlickOut=!1,this.manualControl=!1,this.cpArcs=[],this.flickCount=0,this.chaos=!1,this.teams=0,this.onItem=()=>{}}setup(e,t){const i={...e,obstacles:e.obstacles.map(f=>({...f})),patches:e.patches.slice()};this.track=new sd(i),this.caps=t.map((f,d)=>{const u=lt(f.skin),g=xv(d,f.name,f.skin,{...yv,...u.stats,...f.stats||{}},f.isAI,f.ai);return g.team=f.team??-1,g}),this.teams=t.some(f=>(f.team??-1)>=0)?new Set(t.map(f=>f.team??-1)).size:0;const s=e.start,a=e.startAngle,o={x:Math.cos(a),y:Math.sin(a)},r={x:-Math.sin(a),y:Math.cos(a)},c=e.half[0],l=this.caps.length,h=l>1?Math.min(1.95,2*(c-1)/(l-1)):0;this.caps.forEach((f,d)=>{const u=(d-(l-1)/2)*h,g=1.2;f.pos=ue(s.x+o.x*g+r.x*u,s.y+o.y*g+r.y*u),f.cpPos=ue(f.pos.x,f.pos.y),f.turnStart=ue(f.pos.x,f.pos.y),f.progress=this.track.progressOf(f.pos),f.checkpoint=0}),this.cpArcs=this.track.def.checkpoints.map(f=>this.track.progressOf(ue(f.x,f.y))),this.finishOrder=[],this.current=0,this.turnNo=1,this.phase="aim",this.flickCount=0,this.beginTurn(!0),this.onChange()}activeCap(){return this.caps[this.current]}beginTurn(e=!1){if(!e)for(const s of this.track.def.obstacles)s.type==="bug"?s.ph=(s.ph||0)+1:s.type==="mill"&&(s.dir=(s.dir||0)+.55);let t=0;for(;t++<this.caps.length+2;){const s=this.caps[this.current];if(!s)break;if(s.finished){this.advanceIndex();continue}if(s.skipTurns>0){s.skipTurns--,this.onToast(`${s.name} perdeu o turno`,"bad"),this.advanceIndex();continue}break}const i=this.caps[this.current];if(i){if(i.progress<i.lastTurnProg+.8?i.stuckTurns++:i.stuckTurns=0,i.lastTurnProg=i.progress,i.stuckTurns>=4){i.rescues>0&&i.progress>i.rescueProg+6&&(i.rescues=0);let s=2+i.rescues*8;const a=r=>{const c=this.track.atArc(Math.max(0,i.progress-r)),l=i.rescues>0?(i.rescues%2?1:-1)*this.track.nearest(c.p).half*.4:0;return ue(c.p.x-c.tan.y*l,c.p.y+c.tan.x*l)};let o=a(s);for(let r=0;r<6&&this.caps.some(l=>l.id!==i.id&&!l.finished&&Math.hypot(l.pos.x-o.x,l.pos.y-o.y)<i.radius*2.4);r++)s+=2.5,o=a(s);i.pos=ue(o.x,o.y),i.vel=ue(),i.z=0,i.vz=0,i.airborne=!1,i.progress=this.track.progressOf(i.pos),i.stuckTurns=0,i.lastTurnProg=i.progress,i.rescues++,i.rescueProg=i.progress,this.onToast(`🛟 ${i.name} foi resgatada pra pista!`,"bad")}i.flicksLeft=3,i.bonusFlicks=0,i.special10=!1,i.consumed.clear(),i.turnStart=ue(i.pos.x,i.pos.y),this.phase="aim",this.aiTimer=0,this.aiFired=!1,e||this.turnNo++,!i.isAI&&!this.manualControl&&this.onToast("Sua vez, "+i.name,"turn"),this.onChange()}}advanceIndex(){this.current=(this.current+1)%this.caps.length}rank01(e){const i=[...this.caps.filter(o=>!o.finished)].sort((o,r)=>r.progress-o.progress),s=i.indexOf(e),a=Math.max(1,i.length-1);return{r:s<0?.5:s/a,leader:s===0}}hazardAhead(e){for(const t of this.track.def.obstacles){if(t.type!=="hole"&&t.type!=="bomb")continue;const i=this.track.progressOf(ue(t.x,t.y));if(i>e.progress+1&&i<e.progress+24)return!0}return!1}grantItem(e){if(e.item)return!1;const{r:t,leader:i}=this.rank01(e),s=Zv(t,i);return e.item=s,e.itemFlash=1,e.isAI||this.onToast(`${ms[s].ico} ${ms[s].name}! toque pra usar`,"good"),this.onItem(e,s,!1),!0}useItem(e=this.activeCap()){const t=e.item;if(!t)return;e.item=null,e.itemFlash=1;const i=ms[t];switch(t){case"foguete":e.boostNext=1.7;break;case"turbo":e.boostNext=1.28;break;case"extra":e.flicksLeft+=1,e.bonusFlicks+=0;break;case"escudo":e.shield=!0;break;case"salto":{const s=Math.min(this.track.total-1,e.progress+15),a=this.track.atArc(s).p;e.pos=ue(a.x,a.y),e.progress=s,this.updateCheckpoint(e);break}case"ima":{const s=this.track.atArc(e.progress).p;e.pos=ue(s.x,s.y),e.boostNext=1.18;break}case"raio":{const a=this.caps.filter(o=>!o.finished&&o.id!==e.id).sort((o,r)=>r.progress-o.progress)[0];a&&(a.pos=ue(a.cpPos.x,a.cpPos.y),a.progress=this.track.progressOf(a.cpPos),a.itemFlash=1,this.onToast(`⚡ ${a.name} levou um raio!`,"bad"));break}}!e.isAI&&t!=="raio"&&this.onToast(`${i.ico} ${i.name}!`,"good"),this.onItem(e,t,!0),this.onChange()}canFlick(){return this.phase==="aim"&&this.activeCap().flicksLeft>0}flick(e,t){if(!this.canFlick())return;const i=this.activeCap(),s=i.boostNext;i.boostNext=1;const a=this.track.surfaceAt(i.pos)==="gum"?nd:1,o=Qt(e),r=Math.max(.06,Math.min(1,t))*Sl*s*a;i.preFlick=ue(i.pos.x,i.pos.y);for(const c of this.caps){if(c.id===i.id){c.resetTo=ue(i.preFlick.x,i.preFlick.y);continue}const l=Math.max(.6,c.progress-16),h=this.track.atArc(l).p;c.resetTo=ue(h.x,h.y)}i.z=0,i.vz=0,i.airborne=!1,i.vel=Ml(o,r),i.moving=!0,this.lastFlickOut=!1,this.flickCount++,this.phase="resolve",this.acc=0,this.onFlick(i,t),this.onChange()}update(e){if(this.phase==="over")return;if(this.phase==="aim"){if(this.manualControl)return;const s=this.activeCap();if(s.isAI&&(this.aiTimer+=e,this.chaos&&s.item&&this.aiTimer>.4&&this.aiTimer<.45&&(s.item!=="escudo"||this.hazardAhead(s))&&this.useItem(s),!this.aiFired&&this.aiTimer>.85)){this.aiFired=!0;const a=dd(s,this.caps,this.track);this.flick(a.dir,a.power)}return}this.acc+=e;const t=1/120;let i=0;for(;this.acc>=t&&i<12;){const s=cd(this.caps,this.track,t);for(const a of s)this.handleEvent(a);if(this.acc-=t,i++,this.phase==="over")return}ld(this.caps)||this.endFlick()}handleEvent(e){const t=this.caps[e.capId];switch(e.type){case"bonus":t.bonusFlicks+=e.n||1,this.onToast(`+${e.n} peteléco${(e.n||1)>1?"s":""}!`,"good");break;case"hole":t.holed=!0,this.onToast(`${t.name} caiu no buraco — checkpoint`,"bad");break;case"bomb":t.bombed=!0,this.onToast(`${t.name} pisou no X — perdeu a vez`,"bad");break;case"out":t.id===this.current&&(this.lastFlickOut=!0),this.onToast(`${t.name} saiu da pista!`,"bad");break;case"ramp":t.id===this.current&&this.onToast("Voou! 🚀","good");break;case"top":t.id===this.current&&this.onToast("🪀 o pião rebateu!","bad");break;case"band":t.id===this.current&&this.onToast("🪃 estilingue!","good");break;case"balloon":{if(e.obsIdx!=null){const i=this.track.def.obstacles[e.obsIdx];i&&!i.popped&&(i.popped=!0,this.track.def.patches.push({surface:"water",x:i.x,y:i.y,r:1.7}),this.onToast("💦 SPLASH! A bexiga estourou!","bad"))}break}case"item":e.power===-1?(t.itemFlash=1,this.onToast(`🛡️ ${t.name} — escudo salvou!`,"good")):!this.grantItem(t)&&e.obsIdx!=null&&t.consumed.delete(e.obsIdx);break;case"finish":this.onFinish(t);break}this.updateCheckpoint(t),this.onEvent(e)}updateCheckpoint(e){const t=this.cpArcs;let i=-1;for(let s=e.checkpoint+1;s<t.length&&e.progress+.3>=t[s];s++){e.checkpoint=s;const a=this.track.atArc(t[s]).p;e.cpPos=ue(a.x,a.y),i=s}i>0&&(this.onCheckpoint(e,i),e.isAI||this.onToast("Checkpoint "+i+" ✓","turn"))}onFinish(e){this.finishOrder.includes(e)||(e.finished=!0,e.airborne=!1,e.z=0,this.finishOrder.push(e),e.place=this.finishOrder.length,this.onToast(`${e.name} chegou em ${e.place}º! 🏁`,e.place===1?"good":"turn"),this.finishOrder.length>=Math.max(1,this.caps.length-1)&&this.finishRace())}finishRace(){const e=this.caps.filter(i=>!i.finished).sort((i,s)=>s.progress-i.progress);let t=this.finishOrder.length;for(const i of e)i.place=++t;this.phase="over",this.onChange()}endFlick(){const e=this.activeCap();if(e.finished){this.advanceIndex(),this.beginTurn();return}e.flicksLeft-=1,e.holed&&(e.holed=!1,e.flicksLeft-=1),e.bombed&&(e.bombed=!1,e.flicksLeft=0),e.bonusFlicks>0&&(e.flicksLeft+=e.bonusFlicks,e.bonusFlicks=0),e.flicksLeft=Math.max(0,Math.min(e.flicksLeft,9)),e.flicksLeft>1&&(e.turnStart=ue(e.pos.x,e.pos.y)),e.flicksLeft<=0?(this.advanceIndex(),this.beginTurn()):(this.phase="aim",this.aiTimer=0,this.aiFired=!1,this.onChange())}standings(){return[...this.caps].sort((e,t)=>(e.finished?e.place:999-e.progress/1e3,t.finished?t.place:999-t.progress/1e3,e.finished&&t.finished?e.place-t.place:e.finished?-1:t.finished?1:t.progress-e.progress))}winner(){return this.finishOrder[0]||null}snapshot(){return{cur:this.current,tn:this.turnNo,ph:this.phase,fc:this.flickCount,fin:this.finishOrder.map(e=>e.id),caps:this.caps.map(e=>({i:e.id,x:e.pos.x,y:e.pos.y,pr:e.progress,cp:e.checkpoint,cx:e.cpPos.x,cy:e.cpPos.y,tx:e.turnStart.x,ty:e.turnStart.y,fl:e.flicksLeft,bf:e.bonusFlicks,sk:e.skipTurns,fn:e.finished,pl:e.place,ai:e.isAI}))}}applySnapshot(e){if(!(!e||!e.caps)){this.current=e.cur,this.turnNo=e.tn,this.phase=e.ph,typeof e.fc=="number"&&(this.flickCount=e.fc);for(const t of e.caps){const i=this.caps[t.i];i&&(i.pos.x=t.x,i.pos.y=t.y,i.vel.x=0,i.vel.y=0,i.z=0,i.vz=0,i.airborne=!1,i.moving=!1,i.progress=t.pr,i.checkpoint=t.cp,i.cpPos=ue(t.cx,t.cy),i.turnStart=ue(t.tx,t.ty),i.flicksLeft=t.fl,i.bonusFlicks=t.bf,i.skipTurns=t.sk,i.finished=t.fn,i.place=t.pl,i.isAI=t.ai)}this.finishOrder=(e.fin||[]).map(t=>this.caps[t]).filter(Boolean),this.phase,this.onChange()}}}function ud(n){return()=>{n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const Xn=["Fácil","Médio","Difícil","Muito Difícil","Extrema"],Ns=["#3fae6a","#3b82f6","#f2b100","#e5762a","#e5484d"],Yr=[{key:"quintal",ground:"dirt",bg:"#6f5334",wall:"#6b4e2e",patch:["sand","mud","grass"],decor:["twig","leaf","pebble","grass"],names:["Quintal do Zé","Terra Batida","Fundo de Quintal","Chão de Terra"],heroes:["bucketzinc","bone","fencebit","wateringcan"]},{key:"praia",ground:"sand",bg:"#d9b877",wall:"#c9a35f",patch:["water","ramp","cardboard"],decor:["shell","starfish","castle","pebble"],names:["Praia da Tarde","Areia Fofa","Beira-Mar","Duna do Sol"],heroes:["beachumbrella","beachball","flipflop","sunscreen"]},{key:"calcada",ground:"sidewalk",bg:"#9a9488",wall:"#8f8879",patch:["chalk","cardboard","gum"],decor:["chalk","toy","pebble"],names:["Calçada de Giz","Rua de Baixo","Passeio","Meio-Fio"],heroes:["toycar","chalkset","sodacup"]},{key:"garagem",ground:"cardboard",bg:"#7d6a4e",wall:"#a9773f",patch:["sidewalk","magnet","sand"],decor:["box","tape","pencil"],names:["Garagem","Papelão & Fita","Depósito","Oficina"],heroes:["paintcan","wrench","tirestack","toycar"]},{key:"parquinho",ground:"dirt",bg:"#414c36",wall:"#5c4a2c",patch:["water","mud","water","grass"],decor:["leaf","grass","pebble"],names:["Parquinho Molhado","Lamaçal","Depois da Chuva","Poça & Folha"],paint:"wetdirt",patchN:[5,7],heroes:["toyshovel","beachball","bucketzinc"]},{key:"cozinha",ground:"cardboard",bg:"#c8b48c",wall:"#c05a5a",patch:["sidewalk","water","ice"],decor:["cup","coin","eraser","straw"],names:["Mesa da Cozinha","Hora do Café","Toalha Xadrez","Bancada"],paint:"gingham",heroes:["saltshaker","mugcoffee","plate","apple","cuttingboard","napkinfold"]},{key:"jardim",ground:"dirt",bg:"#3f5a2e",wall:"#5a7a3a",patch:["grass","grass","mud","water"],decor:["grass","leaf","twig","pebble"],names:["Jardim da Vó","Canteiro","Grama & Terra","Horta"],paint:"garden",patchN:[5,7],heroes:["wateringcan","flowerpot","mushroom","fencebit"]},{key:"deserto",ground:"sand",bg:"#c98f4a",wall:"#a6702f",patch:["ramp","vortex","water"],decor:["pebble","twig","starfish"],names:["Deserto","Dunas","Sol a Pino","Areião"],paint:"dunes",heroes:["cactus","drybush","oldtire"]},{key:"obra",ground:"sidewalk",bg:"#7e786a",wall:"#8a8070",patch:["sand","cardboard","push"],decor:["box","pencil","pebble"],names:["Canteiro de Obra","Entulho","Cimento","Andaime"],paint:"cement",heroes:["brickpile","helmet","paintcan","oldtire"]},{key:"laje",ground:"sidewalk",bg:"#8f9aa0",wall:"#7a848a",patch:["cardboard","chalk","ice"],decor:["toy","pebble","tape"],names:["Laje","Terraço","Cobertura","Varal"],paint:"slab",heroes:["watertank","clothesline","flowerpot"]},{key:"piscina",ground:"sidewalk",bg:"#4a90b8",wall:"#cfe4ee",patch:["water","ice","vortex"],decor:["pebble","coin","toy"],names:["Borda da Piscina","Deck Molhado","Área de Lazer","Prainha"],paint:"tiles",heroes:["floatring","flipflop","sunscreen","beachball"]},{key:"feira",ground:"cardboard",bg:"#a88f5c",wall:"#8a6238",patch:["sidewalk","chalk"],decor:["box","coin","tape","cup"],names:["Feira Livre","Barraca","Calçadão","Mercadão"],paint:"stripes",heroes:["fruitcrate","beachumbrella","sodacup"]},{key:"estrada",ground:"dirt",bg:"#7e4a30",wall:"#4a3a24",patch:["mud","mud","sand"],decor:["pebble","twig","grass"],names:["Estrada de Barro","Trilha","Rua sem Asfalto","Beira da Roça"],paint:"clay",patchN:[4,6],heroes:["roadsign","oldtire","fencebit","drybush"]},{key:"varanda",ground:"cardboard",bg:"#8a6a44",wall:"#6b4e2e",patch:["sidewalk","water"],decor:["cup","coin","leaf","pencil"],names:["Varanda","Área Coberta","Quintalzinho","Alpendre"],paint:"planks",heroes:["mugcoffee","flowerpot","bookpile","plate"]}],jr=[{key:"sinuca",ground:"felt",bg:"#1c5a38",wall:"#7a4a26",patch:["gum","chalk","water"],decor:["ball8","chalk","coin","cup"],names:["Mesa de Sinuca","Bar do Tio","Tabela Certa","Bico de Giz"],heroes:["cuestick","poolballs","bluechalk","sodacup"]},{key:"geladeira",ground:"frost",bg:"#a8c8d4",wall:"#8fb4c2",patch:["ice","water","vortex"],decor:["icecube","cup","straw","coin"],names:["Congelador","Bandeja de Gelo","Geladeira Aberta","Friozão"],heroes:["popsicle","icecreamtub","icetray"]},{key:"bancada",ground:"metal",bg:"#727c84",wall:"#4e565e",patch:["magnet","magnet","ramp","push"],decor:["bolt","pencil","tape","box"],names:["Bancada da Oficina","Parafuso Solto","Ferramentaria","Aço Liso"],heroes:["hammer","screwdriver","wrench","paintcan"]},{key:"sala",ground:"carpet",bg:"#8a4a42",wall:"#6b4030",patch:["gum","cardboard","water","gum"],decor:["remote","toy","cup","eraser"],names:["Tapete da Sala","Sala de TV","Felpudo","Tarde de Domingo"],heroes:["pillow","bookpile","sock","mugcoffee","toycar"]}],on=(n,e)=>{const t=n[Math.max(0,e-1)],i=n[Math.min(n.length-1,e+1)],s=i.x-t.x,a=i.y-t.y,o=Math.hypot(s,a)||1;return{x:s/o,y:a/o}},On=(n,e)=>{const t=on(n,e);return{x:-t.y,y:t.x}},eb=n=>{let e=0;for(let t=1;t<n.length;t++)e+=Math.hypot(n[t].x-n[t-1].x,n[t].y-n[t-1].y);return e},tb=(n,e)=>{const t=Math.cos(e),i=Math.sin(e);for(const s of n){const a=s.x*t-s.y*i,o=s.x*i+s.y*t;s.x=a,s.y=o}},nb=[{half:4.3,open:.05,len:330,holes:[1,2],bombs:[0,1],stones:[5,7],bonus:[2,3],ramps:[1,2],chi:[1,2],gates:[1,2],gate:3.2,slalom:[1,1]},{half:4.1,open:.24,len:420,holes:[2,3],bombs:[0,1],stones:[3,5],bonus:[2,4],ramps:[1,3],chi:[2,2],gates:[2,2],gate:3,slalom:[1,2]},{half:4,open:.5,len:510,holes:[2,4],bombs:[1,2],stones:[4,6],bonus:[2,4],ramps:[2,3],chi:[2,3],gates:[2,3],gate:2.8,slalom:[2,2]},{half:3.9,open:.72,len:600,holes:[3,5],bombs:[1,2],stones:[6,9],bonus:[2,3],ramps:[2,4],chi:[2,3],gates:[2,3],gate:2.6,slalom:[2,2]},{half:3.8,open:.9,len:690,holes:[3,6],bombs:[1,2],stones:[5,8],bonus:[1,3],ramps:[2,4],chi:[3,4],gates:[3,3],gate:2.5,slalom:[2,3]}];function ib(n,e,t,i,s){const a=t(7,14),o=e(.18,.46),r=e(.8,1.4),c=e(.8,1.4),l=e(.78,.92),h=n()*6.283,f=[];for(let y=0;y<a;y++)f.push(1+(n()*2-1)*o);const d=y=>{let b=y/(2*Math.PI)*a;b=(b%a+a)%a;const x=Math.floor(b),A=b-x,S=f[(x-1+a)%a],w=f[x%a],R=f[(x+1)%a],B=f[(x+2)%a],_=.5*(2*w+(-S+R)*A+(2*S-5*w+4*R-B)*A*A+(-S+3*w-3*R+B)*A*A*A);return Math.max(.35,_)},u=60,g=Math.max(200,Math.round(i/2.2)),v=l*2*Math.PI,p=[];for(let y=0;y<=g;y++){const b=h+y/g*v,x=d(b)*u;p.push(ue(r*x*Math.cos(b),c*x*Math.sin(b)))}const m=i/eb(p);for(const y of p)y.x*=m,y.y*=m;return p}function sb(n,e,t){const i=ud(n*7919+e*131+t*17+1),s=(L,O)=>Math.floor(L+i()*(O-L+1)),a=(L,O)=>L+i()*(O-L),o=t*3+e*7+n,r=o%5===2?jr[(e*2+(t>4?1:0))%jr.length]:Yr[o%Yr.length],c=nb[e],l=c.half*a(.92,1.08),h=c.len*a(.9,1.1),f=ib(i,a,s,h);tb(f,i()*6.283);const d=l+5;let u=1/0,g=1/0,v=-1/0,p=-1/0;for(const L of f)L.x<u&&(u=L.x),L.y<g&&(g=L.y),L.x>v&&(v=L.x),L.y>p&&(p=L.y);for(const L of f)L.x+=d-u,L.y+=d-g;const m=Math.ceil(v-u+2*d),y=Math.ceil(p-g+2*d),b=f,x=b.length,A=[0];let S=0;for(let L=1;L<x;L++)S+=Math.hypot(b[L].x-b[L-1].x,b[L].y-b[L-1].y),A.push(S);const w=S,R=L=>{let O=1;for(;O<x-1&&A[O]<L;)O++;const q=A[O]-A[O-1]||1,F=(L-A[O-1])/q;return{p:ue(b[O-1].x+(b[O].x-b[O-1].x)*F,b[O-1].y+(b[O].y-b[O-1].y)*F),i:O}},B=(L,O=0)=>{const{p:q,i:F}=R(L),te=On(b,F);return ue(q.x+te.x*O,q.y+te.y*O)},_=new Array(x).fill(0);for(let L=1;L<x-1;L++){const O=on(b,L-1),q=on(b,L+1);let F=O.x*q.x+O.y*q.y;F=F<-1?-1:F>1?1:F;const te=A[Math.min(x-1,L+1)]-A[Math.max(0,L-1)]||1;_[L]=pi(Math.acos(F)/te/.22,0,1)}const E=new Array(x).fill(0);for(let L=0;L<x;L++){let O=0,q=0;for(let F=-3;F<=3;F++){const te=L+F;te>=0&&te<x&&(O+=_[te],q++)}E[L]=O/q}const D=[];for(let L=0;L<x;L++){let O=l+Math.sin(A[L]*.05)*.3;A[L]<13&&(O=Math.max(O,l+3.2*(1-A[L]/13))),w-A[L]<8&&(O+=.9),O*=1+.45*E[L],D.push(O)}const k=[],z=3,K=L=>L<10||w-L<9;for(let L=z;L<x;L+=z){const O=L-z,q=c.open*(1-.85*E[L]);if(i()<q&&!K(A[L]))continue;const F=On(b,O),te=On(b,L);k.push({a:ue(b[O].x+F.x*D[O],b[O].y+F.y*D[O]),b:ue(b[L].x+te.x*D[L],b[L].y+te.y*D[L])}),k.push({a:ue(b[O].x-F.x*D[O],b[O].y-F.y*D[O]),b:ue(b[L].x-te.x*D[L],b[L].y-te.y*D[L])})}const U=[],Z=[],j=[],pe=[ue(b[0].x,b[0].y)],me=[];me.push({x:b[0].x,y:b[0].y,r:l+3.6});const Te=s(4,7),Ye=[];for(let L=1;L<=Te;L++){const O=w*L/(Te+1);Ye.push(O),pe.push(B(O))}const je=s(c.ramps[0],c.ramps[1]);for(let L=0;L<je;L++){const O=a(.1,.9)*w,{i:q}=R(O),F=on(b,q),te=i()<.4?0:(i()<.5?-1:1)*a(l*.3,l*.62),le=B(O,te);Z.push({surface:"ramp",x:le.x,y:le.y,r:a(1.5,2),dir:Math.atan2(F.y,F.x)})}const ee=r.patchN||[3,5];for(let L=0;L<s(ee[0],ee[1]);L++){const O=a(.06,.94)*w,q=B(O,a(-l*.35,l*.35)),F=r.patch[s(0,r.patch.length-1)],{i:te}=R(O),le=on(b,te);if(F==="ramp"||F==="push"){Z.push({surface:F,x:q.x,y:q.y,r:a(1.5,2),dir:Math.atan2(le.y,le.x)+(F==="push"?Math.PI:0)});continue}const de=F==="water"?Math.atan2(le.y,le.x)+a(-.6,.6):void 0;i()<.45&&F!=="magnet"&&F!=="vortex"&&F!=="gum"?Z.push({surface:F,x:q.x,y:q.y,hw:l*a(.5,.85),hh:l*a(.85,1.4),dir:de}):Z.push({surface:F,x:q.x,y:q.y,r:l*a(.7,1.1)*(F==="gum"?.44:1),dir:de})}const ae=[...Ye],we=L=>ae.every(O=>Math.abs(O-L)>14),be=(L,O,q)=>{const F=B(L,O);q(F),ae.push(L)};for(let L=0,O=0;L<s(c.holes[0],c.holes[1])&&O<40;O++){const q=a(.1,.94)*w;we(q)&&(be(q,(i()<.5?-1:1)*a(l*.32,l*.62),F=>U.push({type:"hole",x:F.x,y:F.y,r:a(1,1.4)})),L++)}for(let L=0,O=0;L<s(c.bombs[0],c.bombs[1])&&O<30;O++){const q=a(.14,.92)*w;we(q)&&(be(q,(i()<.5?-1:1)*a(l*.38,l*.7),F=>U.push({type:"bomb",x:F.x,y:F.y,r:.95})),L++)}for(let L=0;L<s(c.stones[0],c.stones[1]);L++){const O=a(.06,.96)*w,q=(i()<.5?-1:1)*a(l*.3,l*.75),F=B(O,q);U.push({type:"stone",x:F.x,y:F.y,r:a(.7,1.2)})}for(let L=0,O=0;L<s(c.bonus[0],c.bonus[1])&&O<40;O++){const q=a(.12,.92)*w;if(!we(q))continue;const F=i(),te=F>.88?3:F>.6?2:1,le=i()<.5?-1:1,de=R(q).i,P=D[Math.min(x-1,de)],re=te===3?.74:te===2?.6:.42;if(be(q,le*P*re,V=>U.push({type:"bonus",x:V.x,y:V.y,r:1.1,n:te})),te>=2&&i()<(te===3?.8:.45)){const V=B(q+3.8,le*P*(re-.06));U.push({type:"hole",x:V.x,y:V.y,r:te===3?1.25:1}),ae.push(q+3.8)}L++}const X=s(1,e>=2?3:2);for(let L=0,O=0;L<X&&O<24;O++){const q=a(.2,.85)*w;if(!we(q))continue;const{i:F}=R(q),te=on(b,F),le=On(b,F),de=i();let P,re;if(de<.45)P=Math.atan2(te.y,te.x)+Math.PI,re=(i()<.5?-1:1)*a(l*.3,l*.62);else if(de<.75){const J=i()<.5?1:-1;P=Math.atan2(le.y*J,le.x*J),re=-J*a(l*.15,l*.45)}else{const J=i()<.5?1:-1;P=Math.atan2(te.y,te.x)+Math.PI+J*.7,re=(i()<.5?-1:1)*a(l*.25,l*.6)}const V=B(q,re);Z.push({surface:"push",x:V.x,y:V.y,r:a(1.5,1.9),dir:P}),ae.push(q),L++}const ne=e>=3?2:1;for(let L=0;L<ne;L++){let O=-1,q=1;for(let P=0;P<18;P++){const re=a(.2,.72)*w;if(!we(re))continue;const V=R(re).i;E[V]<q&&(q=E[V],O=re)}if(O<0)continue;const{p:F,i:te}=R(O),le=on(b,te);U.push({type:"jump",x:F.x,y:F.y,r:1.6,dir:Math.atan2(le.y,le.x)});const de=B(O+a(5.5,7.5),0);U.push({type:"hole",x:de.x,y:de.y,r:Math.min(2.5,l*.72)}),ae.push(O,O+6.5)}const ve=L=>ae.every(O=>Math.abs(O-L)>10),Ue=s(c.chi[0],c.chi[1]);for(let L=0,O=0;L<Ue&&O<30;O++){const q=s(3,4),F=7.5,te=a(.1,.84)*w;let le=!0;for(let de=0;de<q;de++)if(!ve(te+de*F)||te+de*F>w-14){le=!1;break}if(le){for(let de=0;de<q;de++){const P=te+de*F,{p:re,i:V}=R(P),J=On(b,V),ce=D[Math.min(x-1,V)],ge=de%2?1:-1;k.push({a:ue(re.x+J.x*ce*ge,re.y+J.y*ce*ge),b:ue(re.x+J.x*ce*ge*.2,re.y+J.y*ce*ge*.2)}),ae.push(P)}L++}}const ke=s(c.gates[0],c.gates[1]);for(let L=0,O=0;L<ke&&O<34;O++){let q=-1,F=1;for(let J=0;J<14;J++){const ce=a(.12,.9)*w;if(!ve(ce))continue;const ge=R(ce).i;E[ge]<F&&(F=E[ge],q=ce)}if(q<0||F>.35)continue;const{p:te,i:le}=R(q),de=On(b,le),P=D[Math.min(x-1,le)],re=Math.max(c.gate*a(.95,1.1),2.3),V=i();if(V<.4){const J=re/2;for(const ce of[1,-1])k.push({a:ue(te.x+de.x*P*ce,te.y+de.y*P*ce),b:ue(te.x+de.x*J*ce,te.y+de.y*J*ce)})}else if(V<.75){const J=i()<.5?1:-1,ce=-P+re;k.push({a:ue(te.x+de.x*P*J,te.y+de.y*P*J),b:ue(te.x+de.x*ce*J,te.y+de.y*ce*J)})}else{const J=a(.85,1.05),ce=Math.min(P-.6,re/2+J+.82+.25);for(const ge of[1,-1]){const Ke=ue(te.x+de.x*ce*ge,te.y+de.y*ce*ge);U.push({type:"stone",x:Ke.x,y:Ke.y,r:J})}}ae.push(q),L++}const I=s(c.slalom[0],c.slalom[1]);for(let L=0,O=0;L<I&&O<26;O++){const q=a(.08,.88)*w,F=5.5;let te=!0;for(let le=0;le<3;le++)if(!ve(q+le*F)||q+le*F>w-12){te=!1;break}if(te){for(let le=0;le<3;le++){const de=q+le*F,{i:P}=R(de),re=D[Math.min(x-1,P)],V=le%2?1:-1,J=B(de,V*re*a(.3,.42));U.push({type:"stone",x:J.x,y:J.y,r:a(.8,1.05)}),ae.push(de)}L++}}{const L=w*a(.055,.1),O=B(L,(i()<.5?-1:1)*l*a(.3,.5));U.push({type:"stone",x:O.x,y:O.y,r:a(.8,1.05)})}{const L=w*a(.86,.9);for(let O=0;O<3;O++){const q=L+O*5;if(q>w-9)break;const{i:F}=R(q),te=D[Math.min(x-1,F)],le=B(q,(O%2?1:-1)*te*a(.3,.42));U.push({type:"stone",x:le.x,y:le.y,r:a(.75,1)}),ae.push(q)}}const yt=L=>ae.every(O=>Math.abs(O-L)>7),$e=s(1,e>=2?2:1);for(let L=0,O=0;L<$e&&O<40;O++){const q=a(.12,.9)*w;yt(q)&&(be(q,a(-.25,.25)*l,F=>U.push({type:"top",x:F.x,y:F.y,r:.95})),L++)}const Xe=s(1,e>=1?2:1);for(let L=0,O=0;L<Xe&&O<40;O++){const q=a(.15,.88)*w;if(!yt(q))continue;const{i:F}=R(q),te=on(b,F),le=D[Math.min(x-1,F)];be(q,0,de=>U.push({type:"bug",x:de.x,y:de.y,r:.85,dir:Math.atan2(te.y,te.x),n:le*.55,ph:s(0,9)})),L++}const Fe=e>=1?s(1,2):s(0,1);for(let L=0,O=0;L<Fe&&O<40;O++){const q=a(.14,.9)*w;if(!yt(q))continue;const{i:F}=R(q),te=on(b,F),le=D[Math.min(x-1,F)],de=i()<.5?-1:1,P=B(q,de*le*.5);U.push({type:"band",x:P.x,y:P.y,r:le*a(.42,.55),dir:Math.atan2(te.y,te.x)+de*a(.5,.8)}),ae.push(q),L++}if(e>=1&&i()<.85)for(let L=0;L<40;L++){const O=a(.25,.8)*w;if(!yt(O))continue;const{i:q}=R(O),F=D[Math.min(x-1,q)];be(O,0,te=>U.push({type:"mill",x:te.x,y:te.y,r:Math.min(2.4,F*.6),dir:i()*3.14,n:e>=3?4:2}));break}const ct=s(1,2);for(let L=0,O=0;L<ct&&O<40;O++){const q=a(.18,.86)*w;yt(q)&&(be(q,a(-.4,.4)*l,F=>U.push({type:"balloon",x:F.x,y:F.y,r:1.05})),L++)}if(e>=1&&i()<.55){let L=-1,O=-1,q=1e9;for(let F=0;F<x;F+=4)for(let te=F+1;te<x;te+=4){const le=A[te]-A[F];if(le<w*.16||le>w*.6||A[F]<w*.12||A[te]>w*.88)continue;const de=Math.hypot(b[F].x-b[te].x,b[F].y-b[te].y);de<q&&(q=de,L=F,O=te)}if(L>=0&&q>2*l+1&&q<2*l+16){const F=(b[L].x+b[O].x)/2,te=(b[L].y+b[O].y)/2;me.push({x:F,y:te,r:q/2+l*.7}),U.push({type:"hole",x:F+a(-1,1),y:te+a(-1,1),r:a(1.2,1.7)})}}const Oe=(L,O,q,F,te,le)=>{const de=te-q,P=le-F,re=de*de+P*P||1e-6;let V=((L-q)*de+(O-F)*P)/re;V=V<0?0:V>1?1:V;const J=L-(q+de*V),ce=O-(F+P*V);return J*J+ce*ce},C=(L,O)=>{for(const F of me)if((L-F.x)**2+(O-F.y)**2<=(F.r+2)**2)return!1;const q=(l+4.5)*(l+4.5);for(let F=1;F<x;F++)if(Oe(L,O,b[F-1].x,b[F-1].y,b[F].x,b[F].y)<q)return!1;return!0};for(let L=0,O=0;L<s(12,22)&&O<400;O++){const q=a(2,m-2),F=a(2,y-2);if(!C(q,F))continue;const te=r.decor[s(0,r.decor.length-1)];j.push({kind:te,x:q,y:F,s:a(.8,1.3),rot:i()*6}),L++}for(let L=U.length-1;L>=0;L--){const O=U[L];if(O.type==="stone")for(let q=0;q<L;q++){const F=U[q];if(F.type!=="stone")continue;if(Math.hypot(O.x-F.x,O.y-F.y)-O.r-F.r<2.6){U.splice(L,1);break}}}const M={saltshaker:1.4,plate:4.5,mugcoffee:2.6,napkinfold:2.6,apple:2,cuttingboard:4.2,bucketzinc:2.2,bone:2.3,fencebit:3.7,beachumbrella:5.2,beachball:2,flipflop:2.1,sunscreen:1.4,toycar:2.3,chalkset:2,paintcan:1.9,wrench:2.5,tirestack:2.9,oldtire:2.9,toyshovel:2.7,wateringcan:2.9,flowerpot:2,mushroom:1.4,cactus:2,drybush:1.7,brickpile:2.5,helmet:2.4,watertank:3.8,clothesline:5.2,floatring:3.2,fruitcrate:2.9,roadsign:2,cuestick:6,poolballs:1.6,bluechalk:.9,sodacup:1.6,popsicle:2.5,icecreamtub:2.3,icetray:2.2,hammer:2.7,screwdriver:2.1,pillow:3.2,bookpile:2.7,sock:1.7},W=r.heroes||[];if(W.length){const L=[],O=(F,te,le)=>{for(const P of me)if((F-P.x)**2+(te-P.y)**2<=(P.r+le+2)**2)return!1;const de=(l+2.5+le)**2;for(let P=1;P<x;P++)if(Oe(F,te,b[P-1].x,b[P-1].y,b[P].x,b[P].y)<de)return!1;return!0},q=Math.min(W.length+2,s(4,6));for(let F=0,te=0;F<q&&te<500;te++){const le=W[F%W.length],de=M[le]||2.5,P=a(3+de,m-3-de),re=a(3+de,y-3-de);O(P,re,de)&&(L.some(V=>(V.x-P)**2+(V.y-re)**2<(V.r+de+3)**2)||(j.push({kind:le,x:P,y:re,s:a(.95,1.25),rot:i()*6.283}),L.push({x:P,y:re,r:de}),F++))}}for(let L=U.length-1;L>=0;L--){const O=U[L];O.type!=="hole"&&O.type!=="bomb"||pe.some(q=>(O.x-q.x)**2+(O.y-q.y)**2<5.5*5.5)&&U.splice(L,1)}const se=ue(b[0].x,b[0].y),oe=on(b,0),ie=Math.atan2(oe.y,oe.x),Ae=b[x-1],xe=on(b,x-1),Se={x:-xe.y,y:xe.x},Ze=[ue(Ae.x+Se.x*(l+.6),Ae.y+Se.y*(l+.6)),ue(Ae.x-Se.x*(l+.6),Ae.y-Se.y*(l+.6))],he=r.names[t%r.names.length]+(t>=r.names.length?" "+(Math.floor(t/r.names.length)+1):"");return{id:n,name:he,theme:r.key,level:e,w:m,h:y,ground:r.ground,paint:r.paint,bg:r.bg,wallCol:r.wall,path:b,half:D,pads:me,patches:Z,walls:k,obstacles:U,checkpoints:pe,start:se,startAngle:ie,finish:Ze,decor:j}}const Qo=new Map;function fd(n,e){const t=n*10+e;return Qo.has(t)||Qo.set(t,sb(t,n,e)),Qo.get(t)}const Wt=10;function ab(n){const e=n.path,t=e.length,i=[0];let s=0;for(let h=1;h<t;h++)s+=Math.hypot(e[h].x-e[h-1].x,e[h].y-e[h-1].y),i.push(s);const a=s,o=h=>{let f=1;for(;f<t-1&&i[f]<h;)f++;const d=i[f]-i[f-1]||1,u=(h-i[f-1])/d;return{p:ue(e[f-1].x+(e[f].x-e[f-1].x)*u,e[f-1].y+(e[f].y-e[f-1].y)*u),i:f}},r=ud(n.id*2657+13),c=n.obstacles.slice(),l=6+Math.floor(r()*3);for(let h=0;h<l;h++){const f=(h+.5)/l*a*.92+a*.05,{p:d,i:u}=o(f),g=On(e,u),v=(r()<.5?-1:1)*(n.half[Math.min(t-1,u)]||4)*(r()*.28),p=d.x+g.x*v,m=d.y+g.y*v;n.obstacles.some(y=>(y.type==="hole"||y.type==="bomb")&&(y.x-p)**2+(y.y-m)**2<9)||c.push({type:"item",x:p,y:m,r:1.15})}return{...n,obstacles:c}}function Us(n){const e=[...Yr,...jr],t=e[(n.theme%e.length+e.length)%e.length],i=pi(n.half||4.2,3.2,6.5);let s=n.pts.map(X=>ue(X.x,X.y));s.length<2&&(s=[ue(10,10),ue(40,30)]);const a=[s[0]],o=2.2;for(let X=1;X<s.length;X++){const ne=a[a.length-1],ve=s[X],Ue=Math.hypot(ve.x-ne.x,ve.y-ne.y),ke=Math.max(1,Math.round(Ue/o));for(let I=1;I<=ke;I++)a.push(ue(ne.x+(ve.x-ne.x)*I/ke,ne.y+(ve.y-ne.y)*I/ke))}let r=a;for(let X=0;X<3;X++){const ne=[r[0]];for(let ve=1;ve<r.length-1;ve++)ne.push(ue((r[ve-1].x+2*r[ve].x+r[ve+1].x)/4,(r[ve-1].y+2*r[ve].y+r[ve+1].y)/4));ne.push(r[r.length-1]),r=ne}const c=r.length,l=i+6;let h=1/0,f=1/0,d=-1/0,u=-1/0;for(const X of r)X.x<h&&(h=X.x),X.y<f&&(f=X.y),X.x>d&&(d=X.x),X.y>u&&(u=X.y);const g=l-h,v=l-f;for(const X of r)X.x+=g,X.y+=v;const p=Math.ceil(d-h+2*l),m=Math.ceil(u-f+2*l),y=[0];let b=0;for(let X=1;X<c;X++)b+=Math.hypot(r[X].x-r[X-1].x,r[X].y-r[X-1].y),y.push(b);const x=b,A=X=>{let ne=1;for(;ne<c-1&&y[ne]<X;)ne++;const ve=y[ne]-y[ne-1]||1,Ue=(X-y[ne-1])/ve;return{p:ue(r[ne-1].x+(r[ne].x-r[ne-1].x)*Ue,r[ne-1].y+(r[ne].y-r[ne-1].y)*Ue),i:ne}},S=(X,ne=0)=>{const{p:ve,i:Ue}=A(X),ke=On(r,Ue);return ue(ve.x+ke.x*ne,ve.y+ke.y*ne)},w=[];for(let X=0;X<c;X++){let ne=i;y[X]<12&&(ne=Math.max(ne,i+3*(1-y[X]/12))),x-y[X]<8&&(ne+=.8),w.push(ne)}const R=[],B=c>130?2:1,_=n.protect==null?1:Math.max(0,Math.min(1,n.protect)),E=X=>X<11||x-X<9,D=n.openArcs||[],k=X=>D.some(ne=>Math.abs(ne-X)<4.5);for(let X=B;X<c;X+=B){const ne=X-B,ve=(y[X]+y[ne])/2;if(!E(ve)&&(k(ve)||_<1&&(X*2654435761>>>8)%1e3/1e3>=_))continue;const Ue=On(r,ne),ke=On(r,X);R.push({a:ue(r[ne].x+Ue.x*w[ne],r[ne].y+Ue.y*w[ne]),b:ue(r[X].x+ke.x*w[X],r[X].y+ke.y*w[X])}),R.push({a:ue(r[ne].x-Ue.x*w[ne],r[ne].y-Ue.y*w[ne]),b:ue(r[X].x-ke.x*w[X],r[X].y-ke.y*w[X])})}const z=[ue(r[0].x,r[0].y)],K=pi(Math.round(x/90),2,6);for(let X=1;X<=K;X++)z.push(S(x*X/(K+1)));const U=(X,ne)=>{let ve=1,Ue=1e9;for(let I=1;I<c;I++){const yt=r[I].x-X,$e=r[I].y-ne,Xe=yt*yt+$e*$e;Xe<Ue&&(Ue=Xe,ve=I)}const ke=on(r,ve);return Math.atan2(ke.y,ke.x)},Z=[];for(const X of n.obstacles){const ne=X.x+g,ve=X.y+v;X.type==="jump"?Z.push({type:"jump",x:ne,y:ve,r:X.r||1.6,dir:U(ne,ve)}):X.type==="bug"?Z.push({type:"bug",x:ne,y:ve,r:.85,dir:U(ne,ve),n:2.2,ph:0}):X.type==="band"?Z.push({type:"band",x:ne,y:ve,r:X.r||2.2,dir:U(ne,ve)+.6}):X.type==="mill"?Z.push({type:"mill",x:ne,y:ve,r:X.r||2.2,dir:0,n:2}):Z.push({type:X.type,x:ne,y:ve,r:X.r||(X.type==="bonus"?1.1:X.type==="bomb"?.95:X.type==="item"?1.15:X.type==="top"?.95:X.type==="balloon"?1.05:1.2),n:X.n})}const j=[];for(const X of n.patches||[]){const ne=X.x+g,ve=X.y+v,Ue=Math.min(X.r||2.4,X.surface==="gum"||X.surface==="ramp"||X.surface==="push"?2.1:99),I=X.surface==="ramp"||X.surface==="push"||X.surface==="water"?U(ne,ve)+(X.surface==="push"?Math.PI:0):void 0;j.push({surface:X.surface,x:ne,y:ve,r:Ue,dir:I})}for(let X=Z.length-1;X>=0;X--){const ne=Z[X];ne.type!=="hole"&&ne.type!=="bomb"||z.some(ve=>(ne.x-ve.x)**2+(ne.y-ve.y)**2<5.5*5.5)&&Z.splice(X,1)}const pe=[{x:r[0].x,y:r[0].y,r:i+3.6}],me=ue(r[0].x,r[0].y),Te=on(r,0),Ye=Math.atan2(Te.y,Te.x),je=r[c-1],ee=on(r,c-1),ae={x:-ee.y,y:ee.x},we=[ue(je.x+ae.x*(i+.6),je.y+ae.y*(i+.6)),ue(je.x-ae.x*(i+.6),je.y-ae.y*(i+.6))],be={id:900,name:n.name||"Minha Pista",theme:t.key,level:2,w:p,h:m,ground:t.ground,paint:t.paint,bg:t.bg,wallCol:t.wall,path:r,half:w,pads:pe,patches:j,walls:R,obstacles:Z,checkpoints:z,start:me,startAngle:Ye,finish:we,decor:[]};return be._shift={dx:g,dy:v},be._total=x,be}const ob=13;class rb{constructor(e,t,i,s){this.dom=e,this.cam=t,this.rig=i,this.opts=s,this.ray=new vv,this.ndc=new Me,this.plane=new di(new N(0,1,0),0),this.pointers=new Map,this.aiming=!1,this.camDrag=null,this.editing=!1,this.pinch=0,this.lastMid=null,this.down=a=>{if(this.dom.setPointerCapture?.(a.pointerId),this.pointers.set(a.pointerId,{x:a.clientX,y:a.clientY}),this.pointers.size===1){if(a.button===2){this.camDrag={x:a.clientX,y:a.clientY};return}if((this.opts.editMode?this.opts.editMode():"off")!=="off"){const r=this.world(a.clientX,a.clientY);r&&(this.editing=!0,this.opts.onEditDown?.(r.x,r.z));return}this.opts.canAim()?(this.aiming=!0,this.updateAim(a.clientX,a.clientY)):this.camDrag={x:a.clientX,y:a.clientY}}else if(this.pointers.size===2){this.aiming=!1,this.editing=!1,this.opts.onEditUp?.(),this.opts.onCancel(),this.camDrag=null;const o=[...this.pointers.values()];this.pinch=Math.hypot(o[0].x-o[1].x,o[0].y-o[1].y),this.lastMid={x:(o[0].x+o[1].x)/2,y:(o[0].y+o[1].y)/2}}},this.move=a=>{if(this.pointers.has(a.pointerId)){if(this.pointers.set(a.pointerId,{x:a.clientX,y:a.clientY}),this.pointers.size===1)if(this.editing){const o=this.world(a.clientX,a.clientY);o&&this.opts.onEditMove?.(o.x,o.z)}else this.aiming?this.updateAim(a.clientX,a.clientY):this.camDrag&&(this.rig.rotate(a.clientX-this.camDrag.x),this.rig.tilt(a.clientY-this.camDrag.y),this.camDrag={x:a.clientX,y:a.clientY});else if(this.pointers.size===2){const o=[...this.pointers.values()],r=(o[0].x+o[1].x)/2,c=(o[0].y+o[1].y)/2,l=Math.hypot(o[0].x-o[1].x,o[0].y-o[1].y);this.lastMid&&(this.rig.rotate((r-this.lastMid.x)*.8),this.rig.tilt((c-this.lastMid.y)*.8)),this.pinch&&this.rig.zoomBy(this.pinch/l,this.dom.clientWidth,this.dom.clientHeight),this.lastMid={x:r,y:c},this.pinch=l}}},this.up=a=>{const o=this.aiming&&this.pointers.size===1;this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=0,this.lastMid=null),this.pointers.size===0&&(o&&this.release(a.clientX,a.clientY),this.editing&&(this.opts.onEditUp?.(),this.editing=!1),this.aiming=!1,this.camDrag=null)},this.wheel=a=>{a.preventDefault(),this.rig.zoomBy(a.deltaY>0?1.08:.92,this.dom.clientWidth,this.dom.clientHeight)},e.addEventListener("pointerdown",this.down),e.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.up),e.addEventListener("wheel",this.wheel,{passive:!1}),e.addEventListener("contextmenu",a=>a.preventDefault())}setCamera(e,t){this.cam=e,this.rig=t}world(e,t){const i=this.dom.getBoundingClientRect();this.ndc.x=(e-i.left)/i.width*2-1,this.ndc.y=-((t-i.top)/i.height)*2+1,this.ray.setFromCamera(this.ndc,this.cam);const s=new N;return this.ray.ray.intersectPlane(this.plane,s)?{x:s.x,z:s.z}:null}aimVec(e,t){const i=this.opts.capPos(),s=this.world(e,t);if(!i||!s)return null;const a=s.x-i.x,o=s.z-i.y,r=Math.hypot(a,o),c=Math.min(1,r/ob);return r<.4?{dx:1,dz:0,power:0}:{dx:-a/r,dz:-o/r,power:c}}updateAim(e,t){const i=this.aimVec(e,t);i&&this.opts.onAim(i.dx,i.dz,i.power)}release(e,t){const i=this.aimVec(e,t);i&&i.power>.06?this.opts.onRelease(i.dx,i.dz,i.power):this.opts.onCancel()}}const $a=[{name:"Liga do Quintal",ico:"🏡",col:"#3fae6a",level:0,desc:"Onde toda lenda começa: terra batida e joelho ralado."},{name:"Liga da Rua",ico:"🛴",col:"#3b82f6",level:1,desc:"A calçada inteira é sua pista. A molecada é boa."},{name:"Liga da Cidade",ico:"🏙️",col:"#f2b100",level:2,desc:"Os campeões de cada bairro. Aqui ninguém dá mole."},{name:"Liga Nacional",ico:"🇧🇷",col:"#e5762a",level:3,desc:"O país inteiro de olho. Tampinhas lendárias na pista."},{name:"Liga Mundial",ico:"🌍",col:"#e5484d",level:4,desc:"O topo do mundo. Só as míticas — e você."}],er=["caotico","cauteloso"],Ua=["cauteloso","caotico","agressivo"],rs=["tecnico","agressivo","rival"],Li=["tecnico","rival","rival"];function Rt(n,e,t,i,s,a,o,r,c=!1){return{id:n,liga:e,name:t,ico:i,races:s,level:$a[e].level,nOpp:a,rarities:o,aiKinds:r,final:c}}const Oi=[Rt("q1",0,"Copa Poeirinha","🌪️",2,3,["comum"],er),Rt("q2",0,"Troféu Formiga","🐜",2,3,["comum"],er),Rt("q3",0,"Desafio do Varal","👕",3,3,["comum"],er),Rt("q4",0,"Final do Quintal","🏡",3,4,["comum"],Ua),Rt("r1",1,"Copa Meio-Fio","🛹",3,4,["comum","rara"],Ua),Rt("r2",1,"Troféu Poste a Poste","💡",3,4,["rara","comum"],Ua),Rt("r3",1,"Grande Ladeira","⛰️",3,4,["rara"],Ua),Rt("r4",1,"Final da Rua","🛴",4,4,["rara"],rs),Rt("c1",2,"Copa Viaduto","🌉",3,4,["rara","epica"],rs),Rt("c2",2,"Troféu Praça Central","⛲",3,5,["epica","rara"],rs),Rt("c3",2,"Noturna da Cidade","🌃",4,5,["epica"],rs),Rt("c4",2,"Final Metropolitana","🏙️",4,5,["epica"],rs),Rt("n1",3,"Copa dos Estados","🗺️",3,5,["epica","lendaria"],rs),Rt("n2",3,"Troféu Litoral","🏖️",4,5,["lendaria","epica"],Li),Rt("n3",3,"Rally do Sertão","🌵",4,5,["lendaria"],Li),Rt("n4",3,"Final Nacional","🇧🇷",4,5,["lendaria"],Li),Rt("m1",4,"Copa Intercontinental","✈️",4,5,["lendaria","mitica"],Li),Rt("m2",4,"Troféu Aurora","🌌",4,5,["mitica","lendaria"],Li),Rt("m3",4,"Semifinal Mundial","🌍",4,5,["mitica"],Li),Rt("m4",4,"A GRANDE FINAL","👑",5,5,["mitica"],Li,!0)],wl=n=>Oi.find(e=>e.id===n),tr=12,lb=.012;function nr(n){return n<4?1:n<8?2:3}function _n(){return Ie.get().campaign||{cap:null,pts:0,alloc:{},best:{},done:!1,races:0,golds:0}}function Ys(n){Ie.get().campaign=n,Ie.persistNow()}function ir(n){const t={...(zt.find(i=>i.id===n.cap)||zt[0]).stats};for(const i of Object.keys(n.alloc))t[i]!=null&&(t[i]=+(t[i]+n.alloc[i]*lb).toFixed(3));return t}const Xa=["itubaina","nesbitts","hires","guarana","schweppes"];function pd(n,e){return Oi.filter(t=>t.liga===e&&n.best[t.id]===1).length}const jc={1:5,2:3,3:2},Kc={1:2,2:1,3:1};function cb(n,e,t){const i=n.best[e]??99,s=jc[t]||0,a=jc[i]||0,o=Kc[t]||0,r=Kc[i]||0,c=Math.max(0,s-a),l=Math.max(0,o-r),h=t<i;h&&(n.best[e]=t),n.pts+=c;for(let g=0;g<l;g++)Ie.addWin();const f=wl(e);let d=!1;if(f.final&&t===1&&!n.done){n.done=!0,d=!0,n.pts+=10;for(let g=0;g<10;g++)Ie.addWin()}Ys(n);let u=null;return pd(n,f.liga)>=4&&!Ie.hasBonus(Xa[f.liga])&&(Ie.addBonus(Xa[f.liga]),u=Xa[f.liga]),{pts:c,wins:l+(d?10:0),improved:h,finished:d,prize:u}}function hb(n,e){if(e===0)return!0;const t=Oi[e-1];return(n.best[t.id]??99)<=3}function db(n,e=Math.random){const t=[];for(const s of n.rarities)for(const a of zt)a.rarity===s&&!a.hidden&&a.prize==null&&t.push(a.id);for(let s=t.length-1;s>0;s--){const a=Math.floor(e()*(s+1));[t[s],t[a]]=[t[a],t[s]]}const i=[];for(let s=0;s<n.nOpp;s++)i.push(t[s%t.length]);return i}const md={c:0,d:2,e:4,f:5,g:7,a:9,b:11},Fs=n=>440*Math.pow(2,(n-69)/12);function ub(n){const e=/^([a-g])([#b]?)(\d)$/.exec(n);if(!e)throw new Error("nota inválida: "+n);return 12*(+e[3]+1)+md[e[1]]+(e[2]==="#"?1:e[2]==="b"?-1:0)}const Jc={"":[0,4,7],m:[0,3,7],7:[0,4,7,10],maj7:[0,4,7,11],m7:[0,3,7,10],m7b5:[0,3,6,10],6:[0,4,7,9],m6:[0,3,7,9],9:[0,4,10,14],dim7:[0,3,6,9],sus4:[0,5,7],"7sus4":[0,5,7,10],add9:[0,4,7,14]};function Zc(n){const e=/^([A-G])([#b]?)(.*)$/.exec(n);if(!e||Jc[e[3]]==null)throw new Error("acorde inválido: "+n);const t=md[e[1].toLowerCase()]+(e[2]==="#"?1:e[2]==="b"?-1:0),i=Jc[e[3]],s=i.map(o=>{let r=t+60+o;for(;r>72;)r-=12;for(;r<57;)r+=12;return r}).sort((o,r)=>o-r).filter((o,r,c)=>c.indexOf(o)===r);let a=t+36;for(;a<34;)a+=12;for(;a>45;)a-=12;return{rootPc:t,ints:i,comp:s,bass:a}}function fb(n){const e=[];let t=0;for(const i of n.replace(/\|/g," ").trim().split(/\s+/)){if(!i)continue;const s=i.split(":"),a=parseFloat(s[1]??"1");s[0]!=="r"&&e.push({beat:t,dur:a,midi:ub(s[0]),vel:+(s[2]??.8)}),t+=a}return e}const mt=(n,e=.8)=>n.map(t=>[t,e]),Qc={bossaLite:{shaker:[[0,.5],[2,.3],[4,.45],[6,.3],[8,.5],[10,.3],[12,.45],[14,.3]],rim:mt([0,3,8,10,13],.5),kick:[[0,.5],[8,.45]]},bossaFull:{shaker:[[0,.55],[1,.2],[2,.3],[3,.2],[4,.5],[5,.2],[6,.3],[7,.2],[8,.55],[9,.2],[10,.3],[11,.2],[12,.5],[13,.2],[14,.3],[15,.2]],rim:mt([0,3,8,10,13],.6),kick:[[0,.6],[6,.25],[8,.5],[14,.3]]},baiao:{kick:[[0,.95],[6,.7],[8,.55],[14,.4]],rim:[[8,.6]],triC:[[0,.5],[2,.3],[6,.3],[8,.5],[10,.3],[14,.3]],triO:[[4,.55],[12,.55]]},baiaoFull:{kick:[[0,1],[6,.75],[8,.6],[14,.45]],rim:[[4,.4],[8,.65],[13,.3]],triC:[[0,.5],[2,.35],[6,.35],[8,.5],[10,.35],[14,.35]],triO:[[4,.6],[12,.6]],shaker:mt([0,2,4,6,8,10,12,14],.22)},baiaoBrk:{kick:[[0,1],[6,.8]],triC:mt([0,2,4,6,8,10,12,14],.45),triO:[[4,.6],[12,.6]]},sambaLite:{surdo:[[4,.7],[12,1]],tamb:mt([0,3,4,6,10,11,14],.5),choc:mt([0,2,4,6,8,10,12,14],.3)},sambaFull:{surdo:[[4,.75],[12,1],[14,.35]],tamb:mt([0,2,3,5,6,8,10,11,13,14],.55),agogoH:mt([0,6,10],.5),agogoL:mt([3,13],.5),choc:mt([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],.26),kick:[[4,.35],[12,.5]]},sambaBrk:{surdo:[[4,.8],[12,1]],choc:mt([0,2,4,6,8,10,12,14],.35),agogoH:mt([0,6,10],.55),agogoL:mt([3,13],.55)},surf:{kick:[[0,.8],[8,.7],[11,.35]],snare:[[4,.7],[12,.75]],hatC:mt([0,2,4,6,8,10,12,14],.4),shaker:mt([1,3,5,7,9,11,13,15],.18)},surfFull:{kick:[[0,.85],[8,.75],[11,.4]],snare:[[4,.75],[12,.8],[15,.25]],hatC:mt([0,2,4,6,10,12,14],.45),hatO:[[8,.4]],shaker:mt([1,3,5,7,9,11,13,15],.2)},choro:{kick:[[0,.75],[8,.7]],rim:[[4,.6],[12,.6]],hatC:mt([2,6,10,14],.5),shaker:mt([0,4,8,12],.2)},choroFull:{kick:[[0,.8],[8,.75],[14,.3]],rim:[[4,.65],[12,.65]],snare:[[7,.2],[15,.25]],hatC:mt([2,6,10,14],.55),shaker:mt([0,1,4,5,8,9,12,13],.22)},desert:{kick:[[0,.9],[10,.6]],tomL:[[3,.4],[11,.35]],shaker:mt([0,2,4,6,8,10,12,14],.3),snare:[[4,.25],[12,.3]]},desertFull:{kick:[[0,.95],[7,.3],[10,.65]],tomL:[[3,.45],[11,.4],[13,.3]],shaker:mt([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],.2),snare:[[4,.3],[12,.4]],rim:[[6,.3],[14,.35]]},frevo:{kick:[[0,.9],[8,.85]],snare:[[2,.3],[4,.7],[7,.3],[10,.3],[12,.75],[15,.35]],hatC:mt([0,2,4,6,8,10,12,14],.4),surdo:[[0,.5],[8,.5]]},frevoFull:{kick:[[0,.95],[8,.9],[11,.3]],snare:[[0,.3],[2,.35],[4,.75],[6,.3],[7,.35],[10,.35],[12,.8],[14,.3],[15,.4]],hatC:mt([0,2,4,6,8,10,12,14],.45),surdo:[[0,.55],[8,.55]]},fill:{snare:[[8,.4],[10,.5],[12,.6],[13,.65],[14,.75],[15,.85]],kick:[[0,.9]],tomL:[[11,.5]]}},pb={bossa:[[0,6,"r",.9],[8,5,"5",.8],[14,2,"a",.5]],baiao:[[0,3,"r",1],[3,3,"5",.55],[6,2,"r",.8],[8,3,"r",.85],[11,3,"5",.5],[14,2,"a",.5]],samba:[[0,3,"r",.6],[4,4,"5",.85],[8,3,"r",.7],[12,2,"5",.9],[14,2,"a",.45]],pump:[[0,2,"r",.9],[2,2,"r",.6],[4,2,"5",.8],[6,2,"r",.6],[8,2,"r",.85],[10,2,"5",.7],[12,2,"r",.7],[14,2,"a",.6]],walk:[[0,4,"r",.85],[4,4,"3",.7],[8,4,"5",.8],[12,4,"a",.7]],longo:[[0,10,"r",.9],[10,4,"5",.6],[14,2,"a",.45]]};function mb(n,e,t){let i=n.bass;for(t==="5"?i+=7:t==="3"?i+=n.ints[1]??4:t==="b7"?i+=10:t==="o"?i+=12:t==="a"&&(i=e.bass-1,Math.abs(i-n.bass)>7&&(i=e.bass+1));i>50;)i-=12;for(;i<33;)i+=12;return i}const eh={bossa:[[[0,2,.5],[6,3,.8],[12,2,.55]],[[2,2,.6],[6,2,.5],[10,3,.8]]],cav:[[[2,1,.6],[6,1,.9],[10,1,.6],[14,1,.9]],[[2,1,.6],[6,1,.85],[10,1,.65],[13,1,.5],[14,1,.8]]],ska:[[[4,2,.9],[12,2,.85]],[[4,2,.85],[12,2,.9],[14,1,.4]]],calmo:[[[0,8,.55],[8,8,.5]],[[0,8,.5],[10,5,.55]]],pulso:[[[0,3,.6],[8,3,.65],[14,2,.4]],[[0,3,.6],[6,2,.4],[8,3,.6]]]},gb={name:"Beira da Tarde",bpm:96,swing:.12,lead:"nylon",compV:"ep",ctrV:"flute",mels:{i:"r:2 e5:0.5 d5:0.5 c5:0.5 d5:0.5 | e5:1.5 g5:0.5 e5:2 | r:1 a5:0.5 g5:0.5 e5:0.5 d5:0.5 c5:1 | d5:3 r:1",a:`r:0.5 e5:0.5 g5:0.5 e5:0.5 c5:1.5 r:0.5 | r:0.5 f5:0.5 a5:0.5 f5:0.5 d5:1.5 r:0.5 | r:0.5 d5:0.5 f5:0.5 d5:0.5 b4:1.5 r:0.5 | c5:2.5 g4:0.5 a4:0.5 b4:0.5
       | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | f#5:0.5 e5:0.5 d5:1 a4:1 c5:1 | d5:1.5 f5:0.5 a5:1 f5:1 | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:2
       | e5:1 g5:1 b5:1.5 r:0.5 | a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1.5 r:0.5 | f5:1 e5:0.5 d5:0.5 c5:1 a4:1 | b4:2 d5:1 f5:1
       | e5:3 r:1 | c5:0.5 ab4:0.5 f4:0.5 ab4:0.5 c5:1 d5:1 | e5:1 g5:1 e5:1 c#5:1 | d5:1 f5:1 b4:1 d5:0.5 e5:0.5`,b:`a5:1 g5:0.5 f5:0.5 c5:2 | f5:1 d5:1 c5:1.5 ab4:0.5 | g4:0.5 c5:0.5 e5:0.5 g5:0.5 e5:2 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1
       | a5:1.5 c6:0.5 a5:1 g5:1 | f5:1 d5:1 ab4:1 c5:1 | b4:0.5 d5:0.5 g5:1 e5:2 | c#5:0.5 e5:0.5 a5:1 g5:1 e5:1
       | f5:1.5 e5:0.5 d5:1 c5:1 | b4:1 d5:1 f5:1.5 r:0.5 | g5:1 e5:1 b4:1 d5:1 | c5:1 e5:1 a5:1.5 r:0.5
       | d5:0.5 e5:0.5 f5:0.5 a5:0.5 f5:1 e5:1 | d5:1 b4:1 f5:1 d5:1 | e5:2 g5:1 c6:1 | c5:3 r:1`,p:`eb5:1 c5:1 ab4:1.5 r:0.5 | d5:1 b4:1 g4:1.5 r:0.5 | eb5:0.5 f5:0.5 g5:1 eb5:1 c5:1 | d5:0.5 f5:0.5 b4:1 d5:2
       | a5:1 g5:1 f5:1 e5:1 | f5:1 d5:1 c5:1 ab4:1 | a4:0.5 c5:0.5 d5:0.5 f5:0.5 e5:1 d5:1 | d5:1 b4:1 g4:2`},secs:[{bars:4,ch:"Cmaj7 Am7 Dm7 G7",mel:"i",drums:"bossaLite",bass:"bossa",comp:"bossa",mix:.7},{bars:16,ch:"Cmaj7 Dm7 G7 Cmaj7 Am7 D7 Dm7 G7 Em7 A7 Dm7 G7 Cmaj7 Fm6 Em7,A7 Dm7,G7",mel:"a",drums:"bossaLite",bass:"bossa",comp:"bossa",mix:.8},{bars:16,ch:"Fmaj7 Fm6 Cmaj7 C7 Fmaj7 Fm6 Em7 A7 Dm7 G7 Em7 Am7 Dm7 G7 Cmaj7 Cmaj7",mel:"b",drums:"bossaFull",bass:"bossa",comp:"bossa",mix:.95},{bars:16,ch:"Cmaj7 Dm7 G7 Cmaj7 Am7 D7 Dm7 G7 Em7 A7 Dm7 G7 Cmaj7 Fm6 Em7,A7 Dm7,G7",mel:"a",drums:"bossaFull",bass:"bossa",comp:"bossa",ctr:!0,mix:.9},{bars:8,ch:"Abmaj7 G7 Abmaj7 G7 Fmaj7 Fm6 Dm7 G7",mel:"p",drums:"bossaLite",bass:"bossa",comp:"calmo",pad:!0,mix:.7},{bars:16,ch:"Fmaj7 Fm6 Cmaj7 C7 Fmaj7 Fm6 Em7 A7 Dm7 G7 Em7 Am7 Dm7 G7 Cmaj7 Cmaj7",mel:"b",drums:"bossaFull",bass:"bossa",comp:"bossa",ctr:!0,mix:1}],loopFrom:1},vb={name:"Forró do Quintal",bpm:112,swing:.18,lead:"sanfona",compV:"nylon",ctrV:"sanfona",mels:{i:"g4:0.5 b4:0.5 d5:0.5 g5:0.5 f5:0.5 d5:0.5 b4:0.5 f4:0.5 | g4:0.5 b4:0.5 d5:0.5 g5:0.5 a5:1 g5:1 | e5:0.5 f5:0.5 e5:0.5 d5:0.5 c5:0.5 b4:0.5 a4:0.5 g4:0.5 | b4:0.5 c5:0.5 d5:1 g4:2",a:`b4:0.5 d5:0.5 d5:1 r:0.5 d5:0.5 e5:0.5 d5:0.5 | b4:0.5 g4:0.5 b4:1 d5:1 r:1 | c5:0.5 e5:0.5 e5:1 e5:0.5 f5:0.5 e5:0.5 d5:0.5 | b4:1 g4:1 d5:1.5 r:0.5
       | d5:0.5 g5:0.5 g5:1 f5:0.5 e5:0.5 d5:1 | f5:0.5 e5:0.5 f5:1 c5:1 a4:1 | e5:0.5 g5:0.5 e5:0.5 c5:0.5 e5:1 g5:1 | d5:0.5 b4:0.5 a4:0.5 b4:0.5 g4:2
       | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:1 g5:1 | g5:0.5 a5:0.5 b5:1 a5:0.5 g5:0.5 f5:1 | e5:0.5 g5:0.5 g5:1 e5:0.5 c5:0.5 e5:1 | d5:1 b4:1 g4:1.5 r:0.5
       | d5:0.5 e5:0.5 f5:0.5 e5:0.5 d5:1 b4:1 | c5:0.5 a4:0.5 c5:1 f5:1 e5:1 | e5:0.5 c5:0.5 g5:1 e5:0.5 c5:0.5 g4:1 | a4:0.5 b4:0.5 g4:2.5 r:0.5`,b:`e5:1 g5:1 g5:0.5 f#5:0.5 e5:1 | e5:0.5 d5:0.5 c5:1 e5:1 g4:1 | b4:0.5 d5:0.5 d5:1 b4:0.5 g4:0.5 b4:1 | a4:0.5 b4:0.5 c5:0.5 b4:0.5 a4:1 f#4:1
       | e5:1 g5:1 b5:1.5 r:0.5 | a5:0.5 g5:0.5 e5:1 c5:1 e5:1 | f#5:0.5 a5:0.5 a5:1 f#5:0.5 d5:0.5 a4:1 | b4:0.5 c5:0.5 d5:1 g4:2
       | e5:0.5 b4:0.5 e5:0.5 g5:0.5 f#5:0.5 e5:0.5 b4:1 | c5:0.5 e5:0.5 g5:1 e5:0.5 c5:0.5 g4:1 | d5:0.5 b4:0.5 d5:1 g5:1 b4:1 | a4:0.5 c5:0.5 f#5:1 a5:1 c5:1
       | b4:1 e5:1 g5:1 b5:1 | a5:1 g5:0.5 e5:0.5 c5:2 | a4:0.5 c5:0.5 d5:0.5 f#5:0.5 a5:1 c6:1 | b5:0.5 a5:0.5 g5:2.5 r:0.5`},secs:[{bars:4,ch:"G G G G",mel:"i",drums:"baiao",bass:"baiao",comp:"pulso",mix:.75},{bars:16,ch:"G G C G G F C G G G C G G F C G",mel:"a",drums:"baiao",bass:"baiao",comp:"pulso",mix:.85},{bars:16,ch:"Em C G D Em C D G Em C G D7 Em C D7 G",mel:"b",drums:"baiaoFull",bass:"baiao",comp:"pulso",mix:1},{bars:4,ch:"G G F,C G",drums:"baiaoBrk",bass:"baiao",mix:.8},{bars:16,ch:"G G C G G F C G G G C G G F C G",mel:"a",drums:"baiaoFull",bass:"baiao",comp:"pulso",ctr:!0,mix:.95},{bars:16,ch:"Em C G D Em C D G Em C G D7 Em C D7 G",mel:"b",drums:"baiaoFull",bass:"baiao",comp:"pulso",ctr:!0,mix:1}],loopFrom:1},bb={name:"Onda de Verão",bpm:104,swing:.1,lead:"flute",compV:"ep",ctrV:"nylon",mels:{i:"r:1 a4:0.5 c5:0.5 e5:1 f5:1 | g5:2 f5:0.5 e5:0.5 d5:1 | c5:1.5 e5:0.5 g5:2 | bb4:1 g4:1 c5:2",a:`a5:1.5 g5:0.5 f5:1 c5:1 | e5:0.5 f5:0.5 g5:0.5 a5:0.5 f5:2 | d5:1 f5:1 bb5:1.5 r:0.5 | db5:0.5 f5:0.5 bb4:1 db5:1 f4:1
       | e5:1 c5:1 g5:1.5 r:0.5 | f#5:0.5 a5:0.5 c6:1 a5:0.5 f#5:0.5 d5:1 | g5:1 d5:1 bb4:1 d5:1 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1
       | c6:1 a5:1 g5:0.5 f5:0.5 e5:1 | f5:0.5 g5:0.5 a5:1 c6:1 a5:1 | bb5:1.5 a5:0.5 f5:1 d5:1 | g5:1 f5:1 db5:1 bb4:1
       | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | d5:0.5 f#5:0.5 a5:1 c6:1.5 r:0.5 | bb5:1 a5:0.5 g5:0.5 d5:1 g5:1 | e5:1 g5:1 c5:2`,b:`f5:1 e5:0.5 d5:0.5 a4:1 d5:1 | b4:1 d5:1 f5:1 g5:1 | f5:0.5 g5:0.5 a5:1 f5:1 d5:1 | e5:1 g5:1 bb5:1 c6:1
       | c6:1.5 a5:0.5 e5:1 g5:1 | f5:1 a5:1 d5:1.5 r:0.5 | d5:0.5 g5:0.5 bb5:1 a5:0.5 g5:0.5 d5:1 | e5:2 g5:1 bb5:1
       | a5:1 f5:1 d5:1 f5:1 | d5:0.5 f5:0.5 b4:1 d5:1 f5:1 | db5:1 f5:1 g5:1 f5:1 | g5:0.5 f5:0.5 db5:1 bb4:2
       | e5:1 g5:1 a5:1.5 r:0.5 | f#5:1 a5:1 c6:1 d6:1 | d6:1 bb5:1 g5:1 f5:1 | e5:1 d5:0.5 bb4:0.5 c5:2`,p:"d5:2 f5:1 a5:1 | db5:2 f5:1 g5:1 | a5:2 g5:1 f5:1 | f#5:1 a5:1 c6:1.5 r:0.5 | bb5:1 g5:1 d5:1.5 r:0.5 | e5:1 g5:1 bb5:1 g5:1 | a5:3 r:1 | g5:1 e5:1 bb4:1 c5:1"},secs:[{bars:4,ch:"Fmaj7 Gm7 Am7 C7",mel:"i",drums:"surf",bass:"bossa",comp:"calmo",mix:.7},{bars:16,ch:"Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7 Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7",mel:"a",drums:"surf",bass:"bossa",comp:"pulso",mix:.85},{bars:16,ch:"Dm7 G7 Bbmaj7 C7 Am7 Dm7 Gm7 C7 Dm7 G7 Bbm6 C7 Am7 D7 Gm7 C7",mel:"b",drums:"surfFull",bass:"samba",comp:"pulso",mix:1},{bars:8,ch:"Bbmaj7 Bbm6 Fmaj7 D7 Gm7 C7 Fmaj7 C7",mel:"p",drums:"surf",bass:"bossa",comp:"calmo",pad:!0,mix:.72},{bars:16,ch:"Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7 Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7",mel:"a",drums:"surfFull",bass:"samba",comp:"pulso",ctr:!0,mix:.95},{bars:16,ch:"Dm7 G7 Bbmaj7 C7 Am7 Dm7 Gm7 C7 Dm7 G7 Bbm6 C7 Am7 D7 Gm7 C7",mel:"b",drums:"surfFull",bass:"samba",comp:"pulso",ctr:!0,mix:1}],loopFrom:1},yb={name:"Samba do Meio-Fio",bpm:100,swing:.22,lead:"nylon",compV:"cavaq",ctrV:"flute",mels:{i:"r:1 d5:0.5 f5:0.5 g5:1 bb5:1 | g5:0.5 e5:0.5 c5:1 e5:2 | f5:0.5 a5:0.5 c6:1 a5:0.5 f5:0.5 c5:1 | d5:0.5 c5:0.5 a4:1 f#4:2",a:`r:0.5 d5:0.5 f5:0.5 g5:0.5 f5:1 d5:1 | r:0.5 e5:0.5 g5:0.5 bb5:0.5 g5:1 e5:1 | c5:0.5 e5:0.5 g5:1 e5:0.5 c5:0.5 e5:1 | f#5:0.5 a5:0.5 c6:1 a5:0.5 f#5:0.5 d5:1
       | g5:1 f5:0.5 d5:0.5 bb4:1 d5:1 | e5:0.5 g5:0.5 bb5:1 g5:0.5 e5:0.5 c5:1 | f5:1.5 a5:0.5 c6:1 a5:1 | g5:0.5 f5:0.5 d5:0.5 c5:0.5 a4:1 c5:1
       | d5:0.5 g5:0.5 g5:1 f5:0.5 d5:0.5 g5:1 | e5:0.5 c5:0.5 e5:1 g5:0.5 bb5:0.5 g5:1 | a5:1 e5:1 c5:1 e5:1 | d5:0.5 f#5:0.5 a5:1 c6:1 a5:1
       | bb5:0.5 a5:0.5 g5:1 f5:0.5 d5:0.5 bb4:1 | c5:0.5 e5:0.5 g5:1 bb5:1 e5:1 | f5:2 a5:1 c6:1 | c6:0.5 a5:0.5 f5:1 a5:1 c5:1`,b:`d5:1 f5:1 bb5:1.5 r:0.5 | b4:0.5 d5:0.5 f5:1 ab5:1 f5:1 | e5:1 c5:1 g5:1.5 r:0.5 | f#5:0.5 e5:0.5 d5:1 c5:1 a4:1
       | bb4:0.5 d5:0.5 f5:1 g5:1 f5:1 | e5:0.5 g5:0.5 bb5:1.5 g5:0.5 e5:1 | a5:1 g5:0.5 f5:0.5 c5:1 a4:1 | a4:0.5 c5:0.5 d5:1 f#5:1 a5:1
       | bb5:1 f5:1 d5:1 f5:1 | ab5:0.5 f5:0.5 d5:1 b4:1 d5:1 | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | d5:1 f#5:1 a5:1 c6:1
       | d6:0.5 c6:0.5 bb5:1 g5:0.5 f5:0.5 d5:1 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1 | f5:1 c5:1 a5:1.5 r:0.5 | a5:0.5 c6:0.5 f5:2.5 r:0.5`,p:"g5:2 f5:1 d5:1 | e5:2 g5:1 bb5:1 | g5:1 d5:1 bb4:1.5 r:0.5 | c5:0.5 e5:0.5 g5:1 bb5:1 e5:1 | f5:1 bb5:1 d6:1.5 r:0.5 | b4:0.5 d5:0.5 f5:1 ab5:1 f5:1 | e5:1 g5:1 c6:1.5 r:0.5 | f#5:0.5 a5:0.5 c6:1 a5:1 f#5:1"},secs:[{bars:4,ch:"Gm7 C7 F6 D7",mel:"i",drums:"sambaLite",bass:"samba",comp:"cav",mix:.75},{bars:16,ch:"Gm7 C7 Am7 D7 Gm7 C7 F6 F6 Gm7 C7 Am7 D7 Gm7 C7 F6 F6",mel:"a",drums:"sambaLite",bass:"samba",comp:"cav",mix:.85},{bars:16,ch:"Bb6 Bdim7 Am7 D7 Gm7 C7 F6 D7 Bb6 Bdim7 Am7 D7 Gm7 C7 F6 F6",mel:"b",drums:"sambaFull",bass:"samba",comp:"cav",mix:1},{bars:8,ch:"Gm7 C7 Gm7 C7 Bb6 Bdim7 Am7 D7",mel:"p",drums:"sambaBrk",bass:"samba",comp:"cav",mix:.8},{bars:16,ch:"Gm7 C7 Am7 D7 Gm7 C7 F6 F6 Gm7 C7 Am7 D7 Gm7 C7 F6 F6",mel:"a",drums:"sambaFull",bass:"samba",comp:"cav",ctr:!0,mix:.95},{bars:16,ch:"Bb6 Bdim7 Am7 D7 Gm7 C7 F6 D7 Bb6 Bdim7 Am7 D7 Gm7 C7 F6 F6",mel:"b",drums:"sambaFull",bass:"samba",comp:"cav",ctr:!0,mix:1}],loopFrom:1},xb={name:"Xícara & Colher",bpm:118,swing:.2,lead:"marimba",compV:"nylon",ctrV:"flute",mels:{i:"e5:0.5 a5:0.5 e5:0.5 c5:0.5 a4:1 r:1 | b4:0.5 e5:0.5 g#5:0.5 b5:0.5 g#5:1 e5:1 | a5:1 e5:0.5 c5:0.5 a4:2 | b4:0.5 d5:0.5 g#4:0.5 b4:0.5 e5:2",a:`a4:0.5 c5:0.5 e5:0.5 a5:0.5 e5:0.5 c5:0.5 e5:0.5 a4:0.5 | g#4:0.5 b4:0.5 e5:0.5 d5:0.5 b4:0.5 g#4:0.5 b4:0.5 e4:0.5 | a4:0.5 c5:0.5 e5:0.5 c5:0.5 a5:1 r:1 | a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1 g5:1
       | f5:0.5 e5:0.5 d5:0.5 f5:0.5 a5:1 f5:1 | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:1 f5:1 | e5:0.5 c5:0.5 g4:0.5 c5:0.5 e5:1 g5:1 | g#5:0.5 b5:0.5 e5:1 d5:1 b4:1
       | a4:0.5 e5:0.5 a5:0.5 e5:0.5 c5:0.5 e5:0.5 a4:0.5 e5:0.5 | g#4:0.5 d5:0.5 e5:0.5 d5:0.5 b4:1 g#4:1 | c5:0.5 e5:0.5 a5:1 e5:0.5 c5:0.5 a4:1 | e5:0.5 g5:0.5 a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1
       | d5:0.5 f5:0.5 a5:0.5 f5:0.5 d5:1 f5:1 | b4:0.5 d5:0.5 f5:0.5 d5:0.5 g5:1 b4:1 | c5:1 e5:0.5 g5:0.5 c6:2 | b5:0.5 g#5:0.5 e5:1 d5:1 b4:1`,b:`e5:0.5 g5:0.5 c6:1 g5:0.5 e5:0.5 g5:1 | d5:0.5 f5:0.5 b5:1 f5:0.5 d5:0.5 f5:1 | e5:1 c6:1 g5:1.5 r:0.5 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1
       | f5:0.5 a5:0.5 c6:1 a5:0.5 f5:0.5 a5:1 | ab5:1 f5:1 d5:1 f5:1 | e5:1 g5:1 c#5:1 e5:1 | d5:0.5 f5:0.5 a5:1 b4:0.5 d5:0.5 f5:1
       | e5:0.5 g5:0.5 c6:0.5 e6:0.5 c6:0.5 g5:0.5 e5:0.5 g5:0.5 | f5:0.5 d5:0.5 b4:0.5 d5:0.5 g5:1 f5:1 | e5:1 g5:1 c6:1 e5:1 | e5:0.5 g5:0.5 bb5:1 c6:1 bb5:1
       | a5:1 c6:1 f5:1.5 r:0.5 | g5:0.5 f5:0.5 d5:1 b4:1 d5:1 | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | c5:2.5 r:1.5`},secs:[{bars:4,ch:"Am E7 Am E7",mel:"i",drums:"choro",bass:"walk",comp:"ska",mix:.75},{bars:16,ch:"Am E7 Am A7 Dm G7 C E7 Am E7 Am A7 Dm G7 C E7",mel:"a",drums:"choro",bass:"walk",comp:"ska",mix:.85},{bars:16,ch:"C G7 C C7 F Fm6 C,A7 Dm7,G7 C G7 C C7 F G7 C C",mel:"b",drums:"choroFull",bass:"walk",comp:"ska",mix:1},{bars:4,ch:"Am E7 Am E7",drums:"choroFull",bass:"pump",comp:"ska",mix:.85},{bars:16,ch:"Am E7 Am A7 Dm G7 C E7 Am E7 Am A7 Dm G7 C E7",mel:"a",drums:"choroFull",bass:"walk",comp:"ska",ctr:!0,mix:.95},{bars:16,ch:"C G7 C C7 F Fm6 C,A7 Dm7,G7 C G7 C C7 F G7 C C",mel:"b",drums:"choroFull",bass:"walk",comp:"ska",ctr:!0,mix:1}],loopFrom:1},_b={name:"Poeira na Trilha",bpm:92,swing:.08,lead:"twang",compV:"nylon",ctrV:"sanfona",mels:{i:"e4:1 g4:1 a4:1 b4:1 | e5:2.5 r:1.5 | d5:1 b4:1 a4:1 g4:1 | e4:3 r:1",a:`e4:1 g4:1 b4:1.5 r:0.5 | a4:0.5 g4:0.5 e4:2.5 r:0.5 | d5:1 b4:1 g4:1.5 r:0.5 | a4:1 c#5:1 e5:1.5 r:0.5
       | g4:0.5 a4:0.5 b4:2 e5:1 | d5:0.5 b4:0.5 g4:1 e4:2 | g4:1 c5:1 e5:1.5 r:0.5 | d#5:1 f#5:1 b4:2
       | b4:0.5 e5:0.5 e5:1 g5:1 f#5:1 | e5:0.5 d5:0.5 b4:1 g4:2 | b4:1 d5:1 g5:1.5 r:0.5 | e5:1 c#5:1 a4:2
       | g4:0.5 b4:0.5 e5:1 g5:1 e5:1 | d5:1 b4:0.5 a4:0.5 g4:2 | c5:1 e5:1 g5:1 e5:1 | f#5:1 d#5:1 b4:2`,b:`a4:1 c5:1 e5:1.5 r:0.5 | g5:0.5 f#5:0.5 e5:1 b4:2 | c5:0.5 e5:0.5 a5:1 e5:1 c5:1 | b4:1 g4:1 e4:2
       | g4:1 c5:1 e5:2 | d5:1 b4:1 g4:2 | f#5:1 d#5:1 b4:1 a4:1 | b4:0.5 d#5:0.5 f#5:1 a5:1 f#5:1
       | e5:1 c5:1 a4:1.5 r:0.5 | b4:0.5 c5:0.5 b4:1 g4:1 e4:1 | a4:0.5 c5:0.5 e5:1 a5:1.5 r:0.5 | g5:1 f#5:0.5 e5:0.5 b4:2
       | c5:1 e5:1 g5:1 c6:1 | b5:1 g5:1 d5:1 b4:1 | a4:1 b4:1 d#5:1 f#5:1 | e5:3 r:1`},secs:[{bars:4,ch:"Em Em Em Em",mel:"i",drums:"desert",bass:"longo",comp:"calmo",mix:.7},{bars:16,ch:"Em Em G A Em Em C B7 Em Em G A Em Em C B7",mel:"a",drums:"desert",bass:"longo",comp:"calmo",mix:.82},{bars:16,ch:"Am Em Am Em C G B7 B7 Am Em Am Em C G B7 B7",mel:"b",drums:"desertFull",bass:"baiao",comp:"pulso",mix:1},{bars:4,ch:"Em Em C,B7 Em",drums:"desertFull",bass:"baiao",mix:.85},{bars:16,ch:"Em Em G A Em Em C B7 Em Em G A Em Em C B7",mel:"a",drums:"desertFull",bass:"baiao",comp:"pulso",ctr:!0,mix:.95},{bars:16,ch:"Am Em Am Em C G B7 B7 Am Em Am Em C G B7 B7",mel:"b",drums:"desertFull",bass:"baiao",comp:"pulso",ctr:!0,mix:1}],loopFrom:1},Mb={name:"Frevo do Mercadão",bpm:126,swing:.06,lead:"brass",compV:"ep",ctrV:"brass",mels:{i:"g4:0.5 c5:0.5 e5:0.5 g5:0.5 c6:1 r:1 | e5:0.5 g5:0.5 c6:0.5 e6:0.5 g5:1 r:1 | f5:0.5 d5:0.5 b4:0.5 g4:0.5 d5:0.5 f5:0.5 b4:0.5 d5:0.5 | c5:1 e5:1 g5:1 c6:1",a:`g4:0.5 c5:0.5 e5:0.5 g5:0.5 e5:0.5 c5:0.5 e5:0.5 g4:0.5 | a4:0.5 c5:0.5 e5:0.5 a5:0.5 e5:0.5 c5:0.5 a4:1 | f5:0.5 e5:0.5 d5:0.5 c5:0.5 b4:0.5 a4:0.5 b4:0.5 d5:0.5 | f5:0.5 d5:0.5 b4:0.5 g4:0.5 d5:1 b4:1
       | c5:0.5 e5:0.5 g5:0.5 c6:0.5 g5:0.5 e5:0.5 c5:0.5 e5:0.5 | c#5:0.5 e5:0.5 g5:0.5 a5:0.5 e5:1 c#5:1 | d5:0.5 f5:0.5 a5:0.5 f5:0.5 b4:0.5 d5:0.5 f5:0.5 d5:0.5 | e5:0.5 g5:0.5 c5:2.5 r:0.5
       | e5:0.5 g5:0.5 c6:0.5 g5:0.5 e5:0.5 g5:0.5 c6:0.5 e6:0.5 | e6:0.5 c6:0.5 a5:0.5 e5:0.5 c5:0.5 e5:0.5 a5:1 | f5:0.5 a5:0.5 f5:0.5 d5:0.5 a4:0.5 d5:0.5 f5:0.5 a5:0.5 | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:1 f5:1
       | e5:0.5 c5:0.5 g5:0.5 e5:0.5 c6:0.5 g5:0.5 e5:0.5 c5:0.5 | a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1 g5:1 | f5:0.5 a5:0.5 d5:0.5 f5:0.5 b4:0.5 d5:0.5 f5:0.5 b4:0.5 | c5:1 e5:0.5 g5:0.5 c6:2`,b:`a5:0.5 f5:0.5 c5:0.5 f5:0.5 a5:1 c6:1 | g5:0.5 e5:0.5 c5:0.5 e5:0.5 g5:1 e5:1 | f5:0.5 d5:0.5 b4:0.5 d5:0.5 f5:1 d5:1 | e5:0.5 g5:0.5 c6:1 g5:1 e5:1
       | c6:0.5 a5:0.5 f5:0.5 a5:0.5 c6:1 a5:1 | eb5:0.5 f#5:0.5 a5:0.5 c6:0.5 a5:1 f#5:1 | g5:0.5 e5:0.5 c5:0.5 e5:0.5 g5:0.5 a5:0.5 c#5:0.5 e5:0.5 | d5:0.5 f5:0.5 a5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:0.5 f5:0.5
       | c6:1 a5:0.5 f5:0.5 a5:1 c6:1 | g5:1 e5:0.5 c5:0.5 e5:1 g5:1 | d5:0.5 f5:0.5 b5:1 f5:1 d5:1 | c6:2 g5:1 e5:1
       | f5:1 a5:1 c6:1.5 r:0.5 | eb5:0.5 c6:0.5 a5:1 f#5:1 a5:1 | g5:0.5 e5:0.5 c5:0.5 e5:0.5 a4:0.5 c#5:0.5 e5:0.5 g5:0.5 | f5:0.5 d5:0.5 b4:0.5 d5:0.5 c5:2`},secs:[{bars:4,ch:"C C G7 C",mel:"i",drums:"frevo",bass:"pump",comp:"ska",mix:.8},{bars:16,ch:"C Am7 Dm7 G7 C A7 Dm7,G7 C C Am7 Dm7 G7 C A7 Dm7,G7 C",mel:"a",drums:"frevo",bass:"pump",comp:"ska",mix:.9},{bars:16,ch:"F C G7 C F F#dim7 C,A7 Dm7,G7 F C G7 C F F#dim7 C,A7 Dm7,G7",mel:"b",drums:"frevoFull",bass:"pump",comp:"ska",mix:1},{bars:4,ch:"C C G7,C C",drums:"frevoFull",bass:"pump",mix:.9},{bars:16,ch:"C Am7 Dm7 G7 C A7 Dm7,G7 C C Am7 Dm7 G7 C A7 Dm7,G7 C",mel:"a",drums:"frevoFull",bass:"pump",comp:"ska",ctr:!0,mix:.95},{bars:16,ch:"F C G7 C F F#dim7 C,A7 Dm7,G7 F C G7 C F F#dim7 C,A7 Dm7,G7",mel:"b",drums:"frevoFull",bass:"pump",comp:"ska",ctr:!0,mix:1}],loopFrom:1},Sb={menu:gb,forro:vb,praia:bb,samba:yb,choro:xb,deserto:_b,frevo:Mb},Eb={quintal:"forro",jardim:"forro",parquinho:"forro",praia:"praia",piscina:"praia",calcada:"samba",laje:"samba",varanda:"samba",cozinha:"choro",deserto:"deserto",estrada:"deserto",obra:"deserto",feira:"frevo",garagem:"frevo",sinuca:"choro",geladeira:"praia",bancada:"frevo",sala:"samba"},wb=n=>Eb[n]||"samba";let Os=null;function th(n){if(Os)return Os;const e=Math.floor(n.sampleRate*1.4),t=n.createBuffer(2,e,n.sampleRate);for(let i=0;i<2;i++){const s=t.getChannelData(i);for(let a=0;a<e;a++)s[a]=(Math.random()*2-1)*Math.exp(-3.2*a/e)}return Os=n.createConvolver(),Os.buffer=t,Os}let Bs=null;function gd(n){if(Bs)return Bs;const e=n.sampleRate;Bs=n.createBuffer(1,e,n.sampleRate);const t=Bs.getChannelData(0);for(let i=0;i<e;i++)t[i]=Math.random()*2-1;return Bs}function Nt(n,e,t,i,s,a=0){const o=n.createOscillator();return o.type=e,o.frequency.value=t,o.detune.value=a,o.start(i),o.stop(s),o}function hi(n,e,t,i,s,a){const o=n.createGain();return o.gain.setValueAtTime(1e-4,e),o.gain.linearRampToValueAtTime(i,e+t),o.gain.setValueAtTime(i,Math.max(e+t,e+s-a)),o.gain.exponentialRampToValueAtTime(8e-4,e+s),o}function nh(n,e,t,i,s,a){const o=n.createOscillator();o.frequency.value=i;const r=n.createGain();r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(s,t+a+.25),o.connect(r);for(const c of e)r.connect(c.detune);o.start(t),o.stop(t+8)}function Fa(n,e,t,i,s,a,o){const r=i+s+.15;if(e==="nylon"||e==="cavaq"){const c=e==="cavaq"?1.6:1,l=Nt(n,"triangle",t,i,r),h=Nt(n,"sine",t*2,i,r),f=n.createBiquadFilter();f.type="lowpass",f.Q.value=.5,f.frequency.setValueAtTime(2300*c,i),f.frequency.exponentialRampToValueAtTime(900*c,i+Math.min(s,.8));const d=hi(n,i,.006,a*.5,Math.min(s+.12,e==="cavaq"?.35:1.3),.05),u=n.createGain();u.gain.value=.18,l.connect(f),h.connect(u),u.connect(f),f.connect(d),d.connect(o)}else if(e==="ep"){const c=Nt(n,"sine",t,i,r),l=Nt(n,"sine",t*2.01,i,r),h=n.createGain();h.gain.value=.3;const f=hi(n,i,.012,a*.42,s+.1,.08),d=n.createGain();d.gain.value=1;const u=Nt(n,"sine",4.6,i,r),g=n.createGain();g.gain.value=.12,u.connect(g),g.connect(d.gain),c.connect(d),l.connect(h),h.connect(d),d.connect(f),f.connect(o)}else if(e==="sanfona"){const c=Nt(n,"sawtooth",t,i,r,-6),l=Nt(n,"sawtooth",t,i,r,6),h=Nt(n,"sawtooth",t*2,i,r),f=n.createGain();f.gain.value=.22;const d=n.createBiquadFilter();d.type="bandpass",d.frequency.value=950,d.Q.value=.6;const u=hi(n,i,.035,a*.3,s+.05,.07);nh(n,[c,l,h],i,5.6,6,.14),c.connect(d),l.connect(d),h.connect(f),f.connect(d),d.connect(u),u.connect(o)}else if(e==="flute"){const c=Nt(n,"sine",t,i,r),l=Nt(n,"sine",t*2,i,r),h=n.createGain();h.gain.value=.1;const f=n.createBufferSource();f.buffer=gd(n),f.loop=!0,f.start(i),f.stop(r);const d=n.createBiquadFilter();d.type="bandpass",d.frequency.value=t*2.2,d.Q.value=1.4;const u=n.createGain();u.gain.value=.02;const g=hi(n,i,.06,a*.42,s+.08,.09);nh(n,[c],i,5.1,8,.2),c.connect(g),l.connect(h),h.connect(g),f.connect(d),d.connect(u),u.connect(g),g.connect(o)}else if(e==="twang"){const c=Nt(n,"sawtooth",t,i,r);c.frequency.setValueAtTime(t*1.025,i),c.frequency.exponentialRampToValueAtTime(t,i+.045);const l=n.createBiquadFilter();l.type="lowpass",l.Q.value=3.2,l.frequency.setValueAtTime(2100,i),l.frequency.exponentialRampToValueAtTime(820,i+Math.min(s,.6));const h=hi(n,i,.005,a*.42,Math.min(s+.15,1.5),.06);c.connect(l),l.connect(h),h.connect(o)}else if(e==="brass"){const c=Nt(n,"sawtooth",t,i,r,-8),l=Nt(n,"sawtooth",t,i,r,8),h=Nt(n,"sawtooth",t*.5,i,r),f=n.createGain();f.gain.value=.25;const d=n.createBiquadFilter();d.type="lowpass",d.Q.value=1,d.frequency.setValueAtTime(700,i),d.frequency.linearRampToValueAtTime(2300,i+.06),d.frequency.exponentialRampToValueAtTime(1300,i+Math.max(.12,s));const u=hi(n,i,.025,a*.3,s+.05,.07);c.connect(d),l.connect(d),h.connect(f),f.connect(d),d.connect(u),u.connect(o)}else if(e==="marimba"){const c=Nt(n,"sine",t,i,r),l=Nt(n,"sine",t*4,i,r),h=n.createGain();h.gain.setValueAtTime(.3,i),h.gain.exponentialRampToValueAtTime(.001,i+.12);const f=hi(n,i,.004,a*.5,Math.min(s+.15,.7),.08);c.connect(f),l.connect(h),h.connect(f),f.connect(o)}}function Tb(n,e,t,i,s,a){const o=t+i+.1,r=Nt(n,"sine",e,t,o),c=Nt(n,"triangle",e,t,o),l=n.createGain();l.gain.value=.35;const h=n.createBiquadFilter();h.type="lowpass",h.frequency.value=620,h.Q.value=.4;const f=hi(n,t,.008,s*.62,i,.05);r.connect(h),c.connect(l),l.connect(h),h.connect(f),f.connect(a)}function ih(n,e,t,i,s){const a=(r,c,l,h,f,d=.001)=>{const u=n.createBufferSource();u.buffer=gd(n);const g=n.createBiquadFilter();g.type=h,g.frequency.value=c,g.Q.value=l;const v=n.createGain();v.gain.setValueAtTime(1e-4,t),v.gain.linearRampToValueAtTime(f,t+d),v.gain.exponentialRampToValueAtTime(8e-4,t+r),u.connect(g),g.connect(v),v.connect(s),u.start(t),u.stop(t+r+.02)},o=(r,c,l,h)=>{const f=n.createOscillator();f.type="sine",f.frequency.setValueAtTime(r,t),f.frequency.exponentialRampToValueAtTime(c,t+l*.8);const d=n.createGain();d.gain.setValueAtTime(h,t),d.gain.exponentialRampToValueAtTime(8e-4,t+l),f.connect(d),d.connect(s),f.start(t),f.stop(t+l+.02)};switch(e){case"kick":o(140,46,.13,i*.85);break;case"surdo":o(84,62,.4,i*.8);break;case"tomL":o(130,92,.25,i*.6);break;case"snare":o(190,150,.05,i*.3),a(.13,1800,.9,"bandpass",i*.4);break;case"rim":a(.035,3900,6,"bandpass",i*.5),o(1750,1500,.02,i*.2);break;case"hatC":a(.04,8e3,1,"highpass",i*.32);break;case"hatO":a(.24,7200,1,"highpass",i*.26);break;case"shaker":a(.07,5200,1.2,"bandpass",i*.3,.018);break;case"choc":a(.05,6200,.8,"bandpass",i*.26,.012);break;case"tamb":a(.04,3e3,4,"bandpass",i*.5),o(1e3,900,.025,i*.25);break;case"agogoH":o(1320,1240,.11,i*.3);break;case"agogoL":o(880,830,.13,i*.3);break;case"triO":o(2960,2900,.4,i*.16),a(.3,9e3,1,"highpass",i*.1);break;case"triC":o(2960,2900,.07,i*.14);break}}let ln=null;function Ab(n,e){const t=n.createGain();t.gain.value=0;const i=n.createGain();i.gain.value=1,i.connect(t);const s=n.createGain();s.gain.value=.16,s.connect(th(n)),th(n).connect(t);const a=n.createGain();a.connect(i),a.connect(s);const o=n.createDelay(1.5);o.delayTime.value=.75*60/e.bpm;const r=n.createGain();r.gain.value=.26;const c=n.createGain();c.gain.value=.13,a.connect(o),o.connect(r),r.connect(o),o.connect(c),c.connect(i);const l=n.createGain();l.gain.value=1,l.connect(i);const h=n.createGain();h.gain.value=.05,l.connect(h),h.connect(s);const f=n.createGain();f.connect(i);const d=n.createGain();d.connect(i);const u=n.createGain();u.gain.value=.4,d.connect(u),u.connect(s);const g=n.createGain();return g.connect(i),g.connect(s),{bus:t,dry:i,wet:s,lead:a,drums:l,bassG:f,compG:d,other:g}}function Cb(n,e){const t=n.ch.trim().split(/\s+/),i=t[e%t.length].split(",").map(Zc),s=t[(e+1)%t.length].split(",").map(Zc)[0];return{cur:i,next:s}}function Rb(n){const e=lo(),t=n.song,i=t.secs[n.sec],s=60/t.bpm,a=s*4,o=a/16,r=m=>m%2===1?t.swing*o:0,c=()=>(Math.random()-.5)*.006,l=n.t,h=i.mix??1,{cur:f,next:d}=Cb(i,n.bar),u=m=>f[m>=8&&f.length>1?1:0],g=i.bars>=8&&n.bar%8===7,v=Qc[i.drums],p=Qc.fill;for(const m of Object.keys(v)){const y=g&&(m==="snare"||m==="tamb")?[]:v[m];for(const[b,x]of y)ih(e,m,l+b*o+r(b)+c(),x*h,n.drums)}if(g)for(const m of Object.keys(p))for(const[y,b]of p[m])ih(e,m,l+y*o+r(y),b*h,n.drums);for(const[m,y,b,x]of pb[i.bass]){const A=u(m),S=f.length>1&&m<8?f[1]:d;Tb(e,Fs(mb(A,S,b)),l+m*o+r(m),y*o*1.1,x*h,n.bassG)}if(i.comp){const m=eh[i.comp][n.bar%eh[i.comp].length];for(const[y,b,x]of m){const A=u(y);for(const S of A.comp)Fa(e,t.compV,Fs(S),l+y*o+r(y)+c(),b*o,x*.55*h,n.compG)}}if(i.pad)for(const m of f[0].comp)Fa(e,"ep",Fs(m),l,a*.96,.16,n.other);if(i.ctr){const m=f[0],y=n.bar%2===0?m.ints[1]??4:m.ints[3]??m.ints[2]??7;let b=m.rootPc+48+y;for(;b>62;)b-=12;for(;b<50;)b+=12;Fa(e,t.ctrV,Fs(b),l+r(0),a*.9,.2,n.other)}if(i.mel){const m=n.mels[i.mel],y=n.bar*4,b=y+4;for(const x of m)if(x.beat>=y&&x.beat<b){const A=(x.beat-y)*4;Fa(e,t.lead,Fs(x.midi),l+A*o+r(Math.round(A))+c(),x.dur*s*.92,x.vel*.85,n.lead)}}n.t+=a,n.bar++,n.bar>=i.bars&&(n.bar=0,n.sec++,n.sec>=t.secs.length&&(n.sec=t.loopFrom??0))}function vd(){if(!ln)return;const n=lo();if(n&&n.state==="running")for(ln.t<n.currentTime&&(ln.t=n.currentTime+.06);ln.t<n.currentTime+3.2;)Rb(ln);ln.timer=window.setTimeout(vd,350)}function ei(n){const e=lo();if(!e||ln&&ln.id===n)return;if(ln){const a=ln;clearTimeout(a.timer),a.bus.gain.setTargetAtTime(0,e.currentTime,.3),setTimeout(()=>a.bus.disconnect(),1600),ln=null}const t=Sb[n];if(!t)return;const i=Ab(e,t);i.bus.connect(bd()),i.bus.gain.setValueAtTime(0,e.currentTime),i.bus.gain.linearRampToValueAtTime(1,e.currentTime+.7);const s={};for(const a of Object.keys(t.mels))s[a]=fb(t.mels[a]);ln={id:n,song:t,sec:0,bar:0,t:e.currentTime+.1,mels:s,timer:0,...i},vd()}function Pb(){return ln?ln.id:null}let Je=null,Ni,vi,gs,ls=null,zs=null,li=null;const jt={music:.5,sfx:.8,muted:!1};function Zt(){if(Je)return!0;try{return Je=new(window.AudioContext||window.webkitAudioContext),Ni=Je.createGain(),Ni.gain.value=jt.muted?0:1,Ni.connect(Je.destination),vi=Je.createGain(),vi.gain.value=jt.sfx,vi.connect(Ni),gs=Je.createGain(),gs.gain.value=jt.music,gs.connect(Ni),!0}catch{return!1}}function Tl(){Zt()&&Je.state==="suspended"&&Je.resume()}function lo(){return Zt()?Je:null}function bd(){return Zt()?gs:null}function yd(){const n=Je.sampleRate*1,e=Je.createBuffer(1,n,Je.sampleRate),t=e.getChannelData(0);for(let i=0;i<n;i++)t[i]=Math.random()*2-1;return e}function pn(n,e,t,i,s,a){if(!Je)return;const o=Je.createOscillator(),r=Je.createGain();o.type=i,o.frequency.setValueAtTime(n,e),a&&o.frequency.exponentialRampToValueAtTime(a,e+t),r.gain.setValueAtTime(0,e),r.gain.linearRampToValueAtTime(s,e+.008),r.gain.exponentialRampToValueAtTime(8e-4,e+t),o.connect(r),r.connect(vi),o.start(e),o.stop(e+t+.02)}function cs(n,e,t,i,s){if(!Je)return;const a=Je.createBufferSource();a.buffer=yd();const o=Je.createBiquadFilter(),r=Je.createGain();o.type="bandpass",o.frequency.value=i,o.Q.value=s,r.gain.setValueAtTime(t,n),r.gain.exponentialRampToValueAtTime(8e-4,n+e),a.connect(o),o.connect(r),r.connect(vi),a.start(n),a.stop(n+e+.02)}const wt={squeak(){if(!Zt())return;const n=Je.currentTime;pn(880,n,.07,"triangle",.22,260),pn(1240,n+.07,.06,"triangle",.16,-180)},elastic(n=.5){if(!Zt())return;const e=Je.currentTime;pn(180,e,.16,"sawtooth",.22*(.5+n),320),pn(90,e,.2,"sine",.3,140),cs(e,.05,.12,2400,1)},pop(){if(!Zt())return;const n=Je.currentTime;cs(n,.09,.8,900,.6),cs(n+.04,.3,.4,3200,.5),pn(160,n,.12,"sine",.4,-90)},flick(n=.5){if(!Zt())return;const e=Je.currentTime;pn(360+n*340,e,.09,"triangle",.35,220),cs(e,.05,.25,1400,1.2)},ui(){Zt()&&pn(520,Je.currentTime,.06,"sine",.2,660)},wall(n=1){if(!Zt())return;const e=Je.currentTime;cs(e,.09,Math.min(.4,.12+n*.03),240,2),pn(150,e,.08,"sine",.2,90)},clack(n=1){if(!Zt())return;const e=Je.currentTime;cs(e,.06,Math.min(.45,.15+n*.03),900,3),pn(500,e,.05,"square",.15,380)},hole(){if(!Zt())return;const n=Je.currentTime;pn(400,n,.5,"sine",.3,70)},bonus(){if(!Zt())return;const n=Je.currentTime;[523,659,784,1047].forEach((e,t)=>pn(e,n+t*.06,.18,"triangle",.25))},bad(){if(!Zt())return;const n=Je.currentTime;pn(300,n,.25,"sawtooth",.22,140)},win(){if(!Zt())return;const n=Je.currentTime;[523,659,784,1047,784,1047,1319].forEach((e,t)=>pn(e,n+t*.11,.3,"triangle",.3))},slide(n){if(!Zt())return;ls||(ls=Je.createBufferSource(),ls.buffer=yd(),ls.loop=!0,li=Je.createBiquadFilter(),li.type="bandpass",li.frequency.value=1200,li.Q.value=.8,zs=Je.createGain(),zs.gain.value=0,ls.connect(li),li.connect(zs),zs.connect(vi),ls.start());const e=Math.min(.22,n*.02);zs.gain.setTargetAtTime(e,Je.currentTime,.05),li&&li.frequency.setTargetAtTime(700+n*90,Je.currentTime,.05)}};function xd(n){jt.music=n,gs&&(gs.gain.value=n)}function _d(n){jt.sfx=n,vi&&(vi.gain.value=n)}function Md(n){jt.muted=n,Ni&&(Ni.gain.value=n?0:1)}const hs={sprint:{name:"Sprint",ico:"⚡",races:3,desc:"3 pistas rápidas"},copa:{name:"Copa",ico:"🏆",races:5,desc:"5 pistas do nível"},maratona:{name:"Maratona",ico:"🔥",races:7,desc:"7 pistas, fôlego total"},gp:{name:"Grand Prix",ico:"🌍",races:5,desc:"1 de cada nível, dificuldade sobe"}},ci=["Bolha","Zé","Nina","Tato","Duda","Chico","Lila"],jn=class jn{constructor(e,t){this.root=document.getElementById("ui"),this.cfgLevel=0,this.cfgTrack=0,this.cfgPick="specific",this.cfgMode="quick",this.cfgChampFmt="copa",this.cfgTeamSize=2,this.cfgPlayers=[],this.myName="Você",this.edPts=[],this.edObs=[],this.edPatches=[],this.edTool="draw",this.edTheme=0,this.edHalf=4.2,this.edName="Minha Pista",this.edProtect=1,this.edOpenArcs=[],this.edPrevMode="view",this.edPrevDef=null,this.edPrevTrack=null,this.edDragItem=null,this.toastEl=null,this.toastT=0,this.onCampBack=null,this.onCampRetry=null,this.onCampFinale=null,this.edW=92,this.edH=62,this.onPreviewBack=null,this.onPreviewPlay=null,this.lobbyOpen=!1,this.hud=null,this.onPause=null,this.onResume=null,this.onRestart=null,this.onNext=null,this.onMenu=null,this.onUseItem=null,this.cb=e,this.online=t,this.myName=Ie.name()||"Você",this.resetPlayers("quick")}el(e){const t=document.createElement("div");return t.innerHTML=e.trim(),t.firstElementChild}clear(){this.root.querySelectorAll(".screen").forEach(e=>e.remove())}bgFx(e=8){const t=this.el('<div class="fxlayer"></div>');for(let i=0;i<e;i++){const s=zt[Math.floor(Math.random()*zt.length)],a=document.createElement("div");a.className="fcap";const o=30+Math.random()*52;a.style.cssText=`left:${Math.random()*100}%;width:${o}px;height:${o}px;opacity:${(.1+Math.random()*.16).toFixed(2)};animation-duration:${(16+Math.random()*16).toFixed(1)}s;animation-delay:${(-Math.random()*26).toFixed(1)}s`;const r=gt(s.art,72);r.style.width="100%",r.style.height="100%",r.style.display="block",a.appendChild(r),t.appendChild(a)}for(let i=0;i<10;i++){const s=document.createElement("div");s.className="bub";const a=6+Math.random()*18;s.style.cssText=`left:${Math.random()*100}%;width:${a}px;height:${a}px;animation-duration:${(10+Math.random()*12).toFixed(1)}s;animation-delay:${(-Math.random()*20).toFixed(1)}s`,t.appendChild(s)}return t}confetti(e){const t=["#f2b100","#e5484d","#3b82f6","#2ea44f","#a855f7","#ff8fb0","#fff"];for(let i=0;i<46;i++){const s=document.createElement("div");s.className="confetti",s.style.cssText=`left:${Math.random()*100}%;background:${t[i%t.length]};animation-duration:${(1+Math.random()*1.5).toFixed(2)}s;animation-delay:${(Math.random()*.5).toFixed(2)}s;transform:rotate(${Math.floor(Math.random()*360)}deg)`,e.appendChild(s),setTimeout(()=>s.remove(),2800)}}showMenu(){this.clear();const e=Ie.wins(),t=Ko(e).length,i=this.el(`
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
          <button class="mode-btn" data-m="modes" style="--a:#ff4fa3"><span class="mi">🎡</span><b>Modos de Jogo</b><span class="ms">Caos, Eliminação, Dupla…</span></button>
          <button class="mode-btn" data-m="champ" style="--a:var(--gold)"><span class="mi">🏆</span><b>Campeonato</b><span class="ms">4 formatos, 1 campeão</span></button>
          <button class="mode-btn" data-m="daily" style="--a:var(--pur)"><span class="mi">📅</span><b>Desafio Diário</b><span class="ms">a pista do dia</span></button>
          <button class="mode-btn" data-m="editor" style="--a:#00c2a8"><span class="mi">✏️</span><b>Editor de Pista</b><span class="ms">crie e jogue a sua</span></button>
          <button class="mode-btn" data-m="skins" style="--a:var(--orange)"><span class="mi">🎨</span><b>Tampinhas</b><span class="ms">coleção ${t}/${zt.filter(s=>!s.hidden).length}</span></button>
          <button class="mode-btn" data-m="help" style="--a:#00b4d8"><span class="mi">📖</span><b>Como Jogar</b><span class="ms">obstáculos &amp; atributos</span></button>
        </div>
      </div>`);i.prepend(this.bgFx(9)),i.querySelector("#capico").appendChild(gt(lt("coca").art,120)),this.root.appendChild(i),i.querySelectorAll(".mode-btn").forEach(s=>s.addEventListener("click",()=>{const a=s.dataset.m;a==="skins"?this.showSkins():a==="help"?this.showHelp():a==="mp"?this.showMultiplayer():a==="modes"?this.showModes():a==="editor"?this.showEditor():a==="camp"?this.showCampaign():this.showSetup(a)})),i.querySelector("#cfgBtn").addEventListener("click",()=>this.showSettings())}showModes(){this.clear();const e=[{m:"caos",ico:"🌀",name:"Modo Caos",sub:"Power-ups estilo Mario Kart! Quem está atrás pega os melhores itens.",col:"#ff4fa3"},{m:"elim",ico:"💀",name:"Eliminação",sub:"Várias pistas: o último de cada corrida é eliminado até sobrar 1.",col:"#e5484d"},{m:"trial",ico:"⏱️",name:"Contra-Relógio",sub:"Sozinho contra o cronômetro: chegue com o MENOR número de petelecos.",col:"#3b82f6"},{m:"dupla",ico:"🤝",name:"Corrida de Dupla",sub:"Times! 2×2 ou 3×3 — a soma das colocações decide o time campeão.",col:"#2ea44f"}],t=this.el(`<div class="screen setup modes-screen">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Modos de Jogo</h2><div></div></div>
      <div class="modes-note">O jogo <b>comum</b> continua no menu. Aqui são os modos especiais — bem diferentes! 🎉</div>
      <div class="modes-list">
        ${e.map(i=>`<button class="modecard" data-m="${i.m}" style="--mc:${i.col}"><span class="mc-ico">${i.ico}</span><div class="mc-tx"><b>${i.name}</b><span>${i.sub}</span></div><span class="mc-go">▶</span></button>`).join("")}
      </div>
      <div class="modes-hint">🌐 Dupla e Campeonato também dá pra jogar <b>Online</b> (no Multiplayer → Online).</div>
    </div>`);this.root.appendChild(t),t.prepend(this.bgFx(7)),t.querySelector("#back").addEventListener("click",()=>this.showMenu()),t.querySelectorAll(".modecard").forEach(i=>i.addEventListener("click",()=>this.showSetup(i.dataset.m)))}campMenuSub(){const e=_n();return e.cap?e.done?"👑 ZERADA! · reviva a glória":`${Object.values(e.best).filter(i=>i<=3).length}/${Oi.length} troféus · continue!`:"comece do zero, vire lenda"}showCampaign(){const e=_n();if(!e.cap){this.showCampStarterPick();return}this.clear();const t=Object.values(e.best).filter(o=>o<=3).length,i=this.el(`<div class="screen setup camp">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Menu</button><h2>🏆 Campanha</h2><div></div></div>
      <div class="camp-head">
        <div class="camp-face" id="cface"></div>
        <div class="camp-info">
          <b>${lt(e.cap).name}</b>
          <span>🏅 ${t}/${Oi.length} troféus ${e.done?'· <b class="camp-done">👑 ZERADA</b>':""}</span>
        </div>
        <button class="chip camp-ofi" id="ofi">🔧 Oficina <b>${e.pts}</b></button>
      </div>
      <div class="camp-scroll" id="ligas"></div>
    </div>`);this.root.appendChild(i),i.prepend(this.bgFx(5));const s=gt(lt(e.cap).art,96);s.style.width="100%",s.style.height="100%",s.style.display="block",i.querySelector("#cface").appendChild(s),i.querySelector("#cface").addEventListener("click",()=>this.showCampOficina()),i.querySelector("#ofi").addEventListener("click",()=>this.showCampOficina()),i.querySelector("#back").addEventListener("click",()=>this.showMenu());const a=i.querySelector("#ligas");$a.forEach((o,r)=>{const c=Xa[r],l=lt(c),h=pd(e,r),f=Ie.hasBonus(c),d=this.el(`<div class="camp-liga" style="--lc:${o.col}">
        <div class="cl-head"><span class="cl-ico">${o.ico}</span><div class="cl-tx"><b>${o.name}</b><span>${o.desc}</span></div></div>
        <button class="cl-prize ${f?"earned":""}" style="--rc:${Pi[l.rarity]}">
          <div class="clp-face"></div>
          <div class="clp-tx">
            <span class="clp-tag">${f?"🏆 CONQUISTADA!":"🎁 PRÊMIO DA LIGA"}</span>
            <b>${l.name}</b>
            <span class="clp-rar"><i class="rar-dot"></i>${ka[l.rarity]} EXCLUSIVA</span>
            <span class="clp-cond">${f?"sua pra sempre — já joga com ela no modo livre!":"faça <b>🥇 OURO</b> nas 4 competições da liga"}</span>
            <span class="clp-prog">${"🥇".repeat(h)}${'<i class="clp-slot"></i>'.repeat(Math.max(0,4-h))} <em>${h}/4</em></span>
          </div>
          <span class="clp-zoom">🔍</span>
        </button>
        <div class="cl-comps"></div>
      </div>`),u=d.querySelector(".clp-face"),g=gt(l.art,100);g.style.width="72px",g.style.height="72px",g.style.display="block",u.appendChild(g),d.querySelector(".cl-prize").addEventListener("click",()=>this.showCapStats(l.name,c));const v=d.querySelector(".cl-comps");Oi.forEach((p,m)=>{if(p.liga!==r)return;const y=hb(e,m),b=e.best[p.id],x=b===1?"🥇":b===2?"🥈":b===3?"🥉":"",A=this.el(`<button class="cc ${y?"":"locked"} ${p.final?"final":""}">
          <span class="cc-ico">${y?p.ico:"🔒"}</span>
          <b>${p.name}</b>
          <span class="cc-sub">${p.races} corridas · ${p.nOpp} rivais</span>
          <span class="cc-tro">${x||(y?"▶ JOGAR":"vença a anterior")}</span>
        </button>`);y&&A.addEventListener("click",()=>this.showCampCompIntro(p)),v.appendChild(A)}),a.appendChild(d)})}showCampStarterPick(){this.clear();const e=zt.filter(s=>s.hidden),t=this.el(`<div class="screen setup camp">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Menu</button><h2>🏆 Campanha</h2><div></div></div>
      <div class="camp-story">Você achou <b>três tampinhas velhas</b> no fundo do quintal. Nenhuma parece grande coisa… ainda. Escolha a sua companheira: vocês vão juntas <b>do quintal ao topo do mundo</b> — e ela evolui a cada troféu. <b>Escolha com carinho: é pra sempre!</b></div>
      <div class="camp-pickers" id="pk"></div>
    </div>`);this.root.appendChild(t),t.prepend(this.bgFx(6)),t.querySelector("#back").addEventListener("click",()=>this.showMenu());const i=t.querySelector("#pk");for(const s of e){const a=this.el(`<button class="camp-pick"><div class="cp-face"></div><b>${s.name}</b><span class="cp-desc">${s.desc}</span>${Gs(s.stats,!0)}<span class="cp-go">ESCOLHER ▶</span></button>`),o=gt(s.art,120);o.style.width="92px",o.style.height="92px",o.style.display="block",o.style.margin="0 auto",a.querySelector(".cp-face").appendChild(o),a.addEventListener("click",()=>{const r=_n();r.cap=s.id,Ys(r),this.notify(`${s.name} é sua! Boa sorte, campeã! 🍀`,"good"),this.showCampaign()}),i.appendChild(a)}}showCampOficina(){this.clear();const e=_n(),t=lt(e.cap||"coca");ir(e);const i=this.el(`<div class="screen setup camp">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Campanha</button><h2>🔧 Oficina</h2><div></div></div>
      <div class="ofi-head">
        <div class="camp-face big" id="oface"></div>
        <div class="ofi-tx"><b>${t.name}</b><span>Pontos de Oficina: <b class="ofi-pts">${e.pts}</b> ⭐</span><small>Ganhe pontos com troféus e melhore ONDE VOCÊ quiser. Vale só na campanha.</small></div>
      </div>
      <div class="ofi-rows" id="rows"></div>
      <button class="chip" id="reset">↩️ Redistribuir tudo (de graça)</button>
    </div>`);this.root.appendChild(i),i.prepend(this.bgFx(4));const s=gt(t.art,120);s.style.width="100%",s.style.height="100%",s.style.display="block",i.querySelector("#oface").appendChild(s),i.querySelector("#back").addEventListener("click",()=>this.showCampaign());const a=i.querySelector("#rows"),o=[["💨","Desliza","slide"],["⚖️","Peso","weight"],["🎯","Controle","control"],["🏀","Quique","bounce"],["🌀","Estabil.","stability"],["💥","Potência","power"],["🧲","Aderência","grip"]],r=()=>{const c=_n(),l=ir(c);i.querySelector(".ofi-pts").textContent=String(c.pts),a.innerHTML="";for(const[h,f,d]of o){const u=c.alloc[d]||0,g=nr(u),v=u>=tr,p=!v&&c.pts>=g,m=Array.from({length:tr},(x,A)=>`<i class="${A<u?"on":""}"></i>`).join(""),y=this.el(`<div class="ofi-row">
          <span class="or-ico">${h}</span>
          <div class="or-mid"><div class="or-top"><b>${f}</b><span class="or-val">${Sd(l[d])}</span></div><div class="or-pips">${m}</div></div>
          <button class="or-plus ${p?"":"off"}" data-k="${d}">${v?"MAX":`+1 <small>⭐${g}</small>`}</button>
        </div>`),b=y.querySelector(".or-plus");p&&b.addEventListener("click",()=>{const x=_n(),A=x.alloc[d]||0,S=nr(A);x.pts<S||A>=tr||(x.pts-=S,x.alloc[d]=A+1,Ys(x),r())}),a.appendChild(y)}};r(),i.querySelector("#reset").addEventListener("click",()=>{const c=_n();let l=0;for(const h of Object.keys(c.alloc)){const f=c.alloc[h];for(let d=0;d<f;d++)l+=nr(d)}l&&(c.pts+=l,c.alloc={},Ys(c),r(),this.notify(`⭐ ${l} pontos devolvidos!`,"good"))})}showCampCompIntro(e){_n();const t=$a[e.liga],i={comum:"Comuns",rara:"Raras",epica:"Épicas",lendaria:"Lendárias",mitica:"MÍTICAS"},{box:s,close:a}=this.overlay(`
      <div class="ov-head"><b>${e.ico} ${e.name}</b><button class="ov-x">✕</button></div>
      <div class="ov-sub">${t.ico} ${t.name} · dificuldade <b>${Xn[e.level]}</b></div>
      <div class="cc-detail">
        <div>🏁 <b>${e.races} corridas</b> — pontos por posição, soma tudo</div>
        <div>🥊 <b>${e.nOpp} rivais</b> com tampinhas <b>${e.rarities.map(o=>i[o]).join(" e ")}</b></div>
        <div>🏅 Pódio libera a próxima · 🥇 OURO = mais pontos de Oficina</div>
        ${e.final?'<div class="cc-final-note">👑 A GRANDE FINAL: vença e entre pra história!</div>':""}
      </div>
      <div class="mactions"><button class="chip" id="cofi">🔧 Oficina</button><button class="play-btn" id="go">🏁 Começar</button></div>`);s.querySelector(".ov-x").addEventListener("click",a),s.querySelector("#cofi").addEventListener("click",()=>{a(),this.showCampOficina()}),s.querySelector("#go").addEventListener("click",()=>{a(),this.launchCamp(e)})}launchCamp(e){const t=_n();if(!t.cap)return;const i=db(e),s=[{name:this.myName||"Você",isAI:!1,skin:t.cap,stats:ir(t)},...i.map((a,o)=>({name:ci[o%ci.length],isAI:!0,ai:e.aiKinds[o%e.aiKinds.length],skin:a}))];this.cb.start({level:e.level,trackIdx:Math.floor(Math.random()*Wt),pick:"randlevel",players:s,mode:"camp",campComp:e.id})}showCampResult(e){const{modal:t,box:i}=this.modalBox();i.className="modal win";const s=e.place===1?"🥇":e.place===2?"🥈":e.place===3?"🥉":"😤",a=e.place===1?"CAMPEÃO!":e.place===2?"Prata!":e.place===3?"Bronze!":e.place+"º lugar",o=e.place<=3,r=e.ptsGained||e.winsGained?`<div class="camp-rw">${e.ptsGained?`<span class="rw">🔧 +${e.ptsGained} pts de Oficina</span>`:""}${e.winsGained?`<span class="rw">🏆 +${e.winsGained} vitórias (modo livre)</span>`:""}</div>`:o?'<div class="camp-rw"><span class="rw dim">troféu já conquistado — melhore pra ganhar mais!</span></div>':"",c=e.prize?lt(e.prize):null;i.innerHTML=`<div class="camp-tro">${s}</div><h3>${e.comp.ico} ${e.comp.name}</h3><div class="camp-place">${a}</div>
      ${r}
      ${c?`<div class="prize-reveal" style="--rc:${Pi[c.rarity]}">
        <div class="pr-tag">✨ TAMPINHA EXCLUSIVA DESBLOQUEADA ✨</div>
        <div class="pr-face" id="prf"></div>
        <b class="pr-name">${c.name}</b>
        <span class="pr-rar"><i class="rar-dot"></i>${ka[c.rarity]} · OURO nas 4 da liga</span>
        ${Gs(c.stats,!0)}
        <span class="pr-note">já é sua no modo livre! 🎉</span>
      </div>`:""}
      ${o?"":'<div class="camp-tip">Precisa de PÓDIO (top 3) pra liberar a próxima. Passa na 🔧 Oficina e tenta de novo!</div>'}
      ${e.hist?sh(e.hist.length,e.hist.length,e.hist):""}
      <div class="champ-stand">${e.rows.map((h,f)=>`<div class="cs-row ${h.you?"you":""} ${f===0?"lead":""}"><span class="cs-pos">${f+1}º</span><span class="cs-cap" data-s="${h.skin}"></span><span class="cs-nm">${h.name}</span><b class="cs-pts">${h.pts}</b></div>`).join("")}</div>
      <div class="mactions"><button class="chip" id="again">↻ De novo</button><button class="play-btn" id="mapa">${e.finished?"👑 Ver o FINAL":"Campanha ▶"}</button></div>`,i.querySelectorAll(".cs-cap").forEach(h=>h.appendChild(gt(lt(h.dataset.s).art,44)));const l=i.querySelector("#prf");if(l&&c){const h=gt(c.art,150);h.style.width="110px",h.style.height="110px",h.style.display="block",h.style.margin="0 auto",l.appendChild(h)}t.classList.remove("hidden"),(o||c)&&this.confetti(i),i.querySelector("#again").addEventListener("click",()=>{this.hideModal(),this.onCampRetry?.(e.comp.id)}),i.querySelector("#mapa").addEventListener("click",()=>{this.hideModal(),e.finished?this.onCampFinale?.():this.onCampBack?.()})}showCampFinale(){const e=_n(),t=lt(e.cap||"coca"),i=Object.values(e.best).filter(o=>o===1).length;this.clear();const s=this.el(`<div class="screen camp-finale">
      <div class="fin-stars"></div>
      <div class="fin-crown">👑</div>
      <h1 class="fin-title">LENDA DAS<br>TAMPINHAS</h1>
      <div class="fin-face" id="ff"></div>
      <div class="fin-cap">${t.name}</div>
      <div class="fin-story">Ela era só uma tampinha <b>${t.name.toLowerCase()}</b> achada no quintal.<br>Ninguém apostava nada. Hoje, o mundo inteiro conhece o seu peteleco.</div>
      <div class="fin-stats">
        <div><b>${e.races}</b><span>corridas</span></div>
        <div><b>${i}</b><span>ouros</span></div>
        <div><b>${Object.values(e.best).filter(o=>o<=3).length}/${Oi.length}</b><span>troféus</span></div>
      </div>
      <div class="fin-bonus">🎁 Bônus de lenda: <b>+10 vitórias</b> no modo livre e <b>+10 pontos</b> de Oficina!</div>
      <div class="fin-note">A campanha continua aberta: cace os 🥇 que faltam!</div>
      <button class="play-btn" id="fim">✨ Voltar como LENDA</button>
    </div>`);this.root.appendChild(s);const a=gt(t.art,180);a.style.width="130px",a.style.height="130px",a.style.display="block",a.style.margin="0 auto",s.querySelector("#ff").appendChild(a),this.confetti(s),setTimeout(()=>this.confetti(s),900),setTimeout(()=>this.confetti(s),1800),s.querySelector("#fim").addEventListener("click",()=>this.showCampaign())}showEditor(){this.clear();const e=["Quintal","Praia","Calçada","Garagem","Parque","Cozinha","Jardim","Deserto"],t=[[14,"Sinuca 🎱"],[15,"Congelador 🧊"],[16,"Bancada 🧲"],[17,"Sala (tapete) 🛋️"]],i=jn.ED_TOOLS,s=this.el(`<div class="screen editor">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>✏️ Editor de Pista</h2><div></div></div>
      <div class="ed-help">1️⃣ <b>Traçar</b>: arraste pra desenhar. 2️⃣ Escolha um item e <b>toque na pista</b> pra colocar. 3️⃣ <b>Mover</b>: arraste um item pro lugar exato. 👁️ Veja em 3D e 🏁 jogue!</div>
      <div class="ed-tools" id="tools">${i.map(u=>`<button class="ed-tool grp-${u.grp} ${u.t===this.edTool?"sel":""}" data-t="${u.t}" style="--tc:${u.col}"><span>${u.ico}</span><small>${u.lab}</small></button>`).join("")}</div>
      <div class="ed-canvas-wrap"><canvas id="edcv" class="ed-canvas"></canvas><div class="ed-count" id="edcount"></div></div>
      <div class="ed-opts">
        <label>Tema</label>
        <select id="edtheme">${e.map((u,g)=>`<option value="${g}" ${g===this.edTheme?"selected":""}>${u}</option>`).join("")}${t.map(([u,g])=>`<option value="${u}" ${u===this.edTheme?"selected":""}>${g}</option>`).join("")}</select>
        <label>Largura</label>
        <input type="range" id="edhalf" min="3.4" max="6" step="0.2" value="${this.edHalf}">
        <input class="ed-name" id="edname" maxlength="18" value="${this.edName}">
      </div>
      <div class="ed-opts prot-row">
        <label>🛡️ Proteção</label>
        ${[[1,"Cheia"],[.6,"Média"],[.3,"Pouca"],[0,"Nenhuma"]].map(([u,g])=>`<button class="chip prot ${this.edProtect===u?"sel":""}" data-pr="${u}">${g}</button>`).join("")}
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
    </div>`);this.root.appendChild(s);const a=s.querySelector("#edcv"),o=s.querySelector("#edcount"),r=()=>{this.drawEditor(a),o.textContent=`${this.edObs.length+this.edPatches.length} itens · ${this.edPts.length} pts`},c=()=>{const u=a.getBoundingClientRect();if(u.width<4){requestAnimationFrame(c);return}a.width=Math.round(u.width),a.height=Math.round(u.width*this.edH/this.edW),r()};setTimeout(c,30),requestAnimationFrame(c),addEventListener("resize",c);const l=u=>{const g=a.getBoundingClientRect();return{x:(u.clientX-g.left)/g.width*this.edW,y:(u.clientY-g.top)/g.height*this.edH}};let h=!1,f=null;a.addEventListener("pointerdown",u=>{u.preventDefault(),a.setPointerCapture?.(u.pointerId);const g=l(u);this.edTool==="draw"?(h=!0,this.edPts.push(g)):this.edTool==="erase"?this.edEraseAt(g):this.edTool==="move"?f=this.edPickAt(g):this.edPlaceObs(g),r()}),a.addEventListener("pointermove",u=>{const g=l(u);if(h){const v=this.edPts[this.edPts.length-1];(!v||Math.hypot(g.x-v.x,g.y-v.y)>2)&&(this.edPts.push(g),r())}else f&&(f.x=g.x,f.y=g.y,r())});const d=()=>{h=!1,f=null};a.addEventListener("pointerup",d),a.addEventListener("pointercancel",d),a.addEventListener("pointerleave",d),s.querySelectorAll(".ed-tool").forEach(u=>u.addEventListener("click",()=>{this.edTool=u.dataset.t,s.querySelectorAll(".ed-tool").forEach(g=>g.classList.remove("sel")),u.classList.add("sel")})),s.querySelector("#edtheme").addEventListener("change",u=>{this.edTheme=+u.target.value,r()}),s.querySelector("#edhalf").addEventListener("input",u=>{this.edHalf=+u.target.value,r()}),s.querySelector("#edname").addEventListener("change",u=>this.edName=u.target.value||"Minha Pista"),s.querySelectorAll(".prot").forEach(u=>u.addEventListener("click",()=>{this.edProtect=+u.dataset.pr,s.querySelectorAll(".prot").forEach(g=>g.classList.remove("sel")),u.classList.add("sel")})),s.querySelector("#back").addEventListener("click",()=>this.showMenu()),s.querySelector("#edclear").addEventListener("click",()=>{this.edObs.length+this.edPatches.length+this.edPts.length!==0&&(this.edPts=[],this.edObs=[],this.edPatches=[],this.edOpenArcs=[],r())}),s.querySelector("#edsave").addEventListener("click",()=>{if(this.edPts.length<3){this.notify("Trace a pista primeiro!","bad");return}Ie.saveTrack(this.edData("ct"+Date.now())),this.notify("Pista salva! 💾","good")}),s.querySelector("#edload").addEventListener("click",()=>this.showMyTracks()),s.querySelector("#edshare").addEventListener("click",()=>this.shareCustom()),s.querySelector("#edview").addEventListener("click",()=>this.previewCustom()),s.querySelector("#edplay").addEventListener("click",()=>this.playCustom())}edData(e){return{id:e,name:this.edName,theme:this.edTheme,half:this.edHalf,pts:this.edPts,obstacles:this.edObs,patches:this.edPatches,protect:this.edProtect,openArcs:this.edOpenArcs}}themeGround(){const e=[["#6f5334","#7a5a34"],["#d9b877","#c9a35f"],["#9a9488","#b4ada0"],["#7d6a4e","#8a744f"],["#4f5b3a","#5f6a44"],["#c8b48c","#b8a074"],["#3f5a2e","#4f6a3a"],["#c98f4a","#b47c3a"]][this.edTheme%8];return{bg:e[0],corr:e[1]}}drawEditor(e){const t=e.getContext("2d"),i=e.width,s=e.height,a=h=>h/this.edW*i,o=h=>h/this.edH*s,r=this.themeGround();t.clearRect(0,0,i,s),t.fillStyle=r.bg,t.fillRect(0,0,i,s);const c=t.createRadialGradient(i/2,s/2,s*.3,i/2,s/2,i*.75);c.addColorStop(0,"rgba(0,0,0,0)"),c.addColorStop(1,"rgba(0,0,0,0.35)"),t.fillStyle=c,t.fillRect(0,0,i,s),t.strokeStyle="rgba(255,255,255,0.045)",t.lineWidth=1;for(let h=0;h<=this.edW;h+=8)t.beginPath(),t.moveTo(a(h),0),t.lineTo(a(h),s),t.stroke();for(let h=0;h<=this.edH;h+=8)t.beginPath(),t.moveTo(0,o(h)),t.lineTo(i,o(h)),t.stroke();const l=i/this.edW;this.edPts.length>1&&(t.lineCap="round",t.lineJoin="round",t.strokeStyle="rgba(0,0,0,0.28)",t.lineWidth=(this.edHalf*2+1.2)*l,this.strokePath(t,a,o),t.strokeStyle=r.corr,t.lineWidth=this.edHalf*2*l,this.strokePath(t,a,o),t.strokeStyle="rgba(255,255,255,0.10)",t.lineWidth=this.edHalf*2*l,this.strokePath(t,a,o),t.strokeStyle="rgba(70,45,20,0.85)",t.lineWidth=Math.max(2,.7*l),this.strokeOffset(t,a,o,this.edHalf),this.strokeOffset(t,a,o,-this.edHalf),t.strokeStyle="rgba(255,255,255,0.55)",t.lineWidth=Math.max(1.5,.35*l),t.setLineDash([6,6]),this.strokePath(t,a,o),t.setLineDash([]));for(const h of this.edPatches){const f=jn.ED_TOOLS.find(d=>d.t===h.surface)?.col||"#888";t.fillStyle=f+"cc",t.beginPath(),t.arc(a(h.x),o(h.y),2.4*l,0,7),t.fill(),t.fillStyle="#fff",t.font=`${Math.round(1.9*l)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText(jn.ED_TOOLS.find(d=>d.t===h.surface)?.ico||"",a(h.x),o(h.y))}for(const h of this.edObs){const f=jn.ED_TOOLS.find(d=>d.t===(h.type==="bonus"?"bonus"+(h.n||1):h.type));t.fillStyle="rgba(0,0,0,0.45)",t.beginPath(),t.arc(a(h.x),o(h.y),2*l,0,7),t.fill(),t.font=`${Math.round(2.4*l)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText(f?.ico||"⬤",a(h.x),o(h.y))}if(this.edPts.length){const h=this.edPts[0];t.fillStyle="#2ea44f",t.beginPath(),t.arc(a(h.x),o(h.y),1.5*l,0,7),t.fill(),t.font=`${Math.round(2.2*l)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText("🚦",a(h.x),o(h.y))}if(this.edPts.length>1){const h=this.edPts[this.edPts.length-1];t.font=`${Math.round(2.6*l)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText("🏁",a(h.x),o(h.y))}this.edPts.length<2&&(t.fillStyle="rgba(255,255,255,0.5)",t.font=`${Math.round(.03*i)}px sans-serif`,t.textAlign="center",t.fillText("✏️ arraste aqui pra desenhar a pista",i/2,s/2))}strokePath(e,t,i){e.beginPath(),this.edPts.forEach((s,a)=>{a?e.lineTo(t(s.x),i(s.y)):e.moveTo(t(s.x),i(s.y))}),e.stroke()}strokeOffset(e,t,i,s){const a=this.edPts;if(!(a.length<2)){e.beginPath();for(let o=0;o<a.length;o++){const r=a[Math.max(0,o-1)],c=a[Math.min(a.length-1,o+1)];let l=-(c.y-r.y),h=c.x-r.x;const f=Math.hypot(l,h)||1;l/=f,h/=f;const d=t(a[o].x+l*s),u=i(a[o].y+h*s);o?e.lineTo(d,u):e.moveTo(d,u)}e.stroke()}}edPlaceObs(e){if(this.edPts.length<2){this.notify("Trace a pista primeiro! ✏️","bad");return}const t=this.edTool;if(jn.ED_SURF.has(t)){this.edPatches.push({surface:t,x:e.x,y:e.y,r:2.4});return}const s={hole:{type:"hole"},bomb:{type:"bomb"},stone:{type:"stone"},jump:{type:"jump"},item:{type:"item"},bonus1:{type:"bonus",n:1},bonus2:{type:"bonus",n:2},bonus3:{type:"bonus",n:3}}[t];s&&this.edObs.push({type:s.type,x:e.x,y:e.y,n:s.n})}edPickAt(e){let t=null,i=36;for(const s of this.edObs){const a=(s.x-e.x)**2+(s.y-e.y)**2;a<i&&(i=a,t=s)}for(const s of this.edPatches){const a=(s.x-e.x)**2+(s.y-e.y)**2;a<i&&(i=a,t=s)}return t}edEraseAt(e){const t=this.edPickAt(e);if(!t)return;const i=this.edObs.indexOf(t);if(i>=0){this.edObs.splice(i,1);return}const s=this.edPatches.indexOf(t);s>=0&&this.edPatches.splice(s,1)}aiPlayers(){const e=Jr(Ie.skin(),3);return[{name:"Você",isAI:!1,skin:Ie.skin()},...e.map((t,i)=>({name:ci[i%ci.length],isAI:!0,ai:Vt[i%Vt.length],skin:t}))]}playCustom(){if(this.edPts.length<3){this.notify("Trace a pista primeiro! ✏️","bad");return}const e=Us(this.edData("play"));this.cb.start({level:2,trackIdx:0,pick:"specific",players:this.aiPlayers(),mode:"quick",customTrack:e})}previewCustom(){if(this.edPts.length<3){this.notify("Trace a pista primeiro! ✏️","bad");return}const e=Us(this.edData("prev"));this.setPreviewDef(e),this.cb.preview?.(e)}setPreviewDef(e){this.edPrevDef=e;try{this.edPrevTrack=new sd(e)}catch{this.edPrevTrack=null}}previewEditMode(){return this.edPrevMode==="view"?"off":this.edPrevMode}preview3D(e,t,i){const s=this.edPrevDef;if(!s)return!1;const a=s._shift||{dx:0,dy:0};if(this.edPrevMode==="move"){const o=t-a.dx,r=i-a.dy;if(e==="down")return this.edDragItem=this.edPickAt({x:o,y:r}),!1;if(e==="move"&&this.edDragItem)return this.edDragItem.x=o,this.edDragItem.y=r,!0;if(e==="up"){const c=!!this.edDragItem;return this.edDragItem=null,c}}else if(this.edPrevMode==="wall"&&e==="down"&&this.edPrevTrack){const o=this.edPrevTrack.progressOf({x:t,y:i}),r=this.edOpenArcs.findIndex(c=>Math.abs(c-o)<6);return r>=0?this.edOpenArcs.splice(r,1):this.edOpenArcs.push(o),!0}return!1}rebuildPreviewDef(){const e=Us(this.edData("prev"));return this.setPreviewDef(e),e}showPreviewBar(){this.clear(),this.edPrevMode="view",this.edDragItem=null;const e=this.el(`<div class="screen preview-bar">
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
      <textarea class="share-box" readonly>${e}</textarea>`,"wide");t.querySelector(".share-box").select(),t.querySelector(".ov-x").addEventListener("click",()=>t.closest(".ov-bg")?.remove())}importSharedTrack(e){try{const t=decodeURIComponent(escape(atob(e))),i=JSON.parse(t);if(!i||!Array.isArray(i.pts)||i.pts.length<2)return!1;this.edPts=i.pts,this.edObs=i.obstacles||[],this.edPatches=i.patches||[],this.edTheme=i.theme||0,this.edHalf=i.half||4.2,this.edName=i.name||"Pista compartilhada",this.edProtect=i.protect==null?1:i.protect,this.edOpenArcs=i.openArcs||[];const s=Us(this.edData("shared")),{box:a,close:o}=this.overlay(`<div class="ov-head"><b>🎁 Pista compartilhada!</b><button class="ov-x">✕</button></div>
        <div class="ov-sub">Alguém te mandou a pista <b>“${this.edName}”</b>. Bora jogar?</div>
        <div class="mactions" style="margin-top:10px"><button class="chip" id="shedit">✏️ Abrir no editor</button><button class="play-btn" id="shplay">🏁 Jogar agora</button></div>`,"wide");return a.querySelector(".ov-x").addEventListener("click",o),a.querySelector("#shedit").addEventListener("click",()=>{o(),this.showEditor()}),a.querySelector("#shplay").addEventListener("click",()=>{o(),this.cb.start({level:2,trackIdx:0,pick:"specific",players:this.aiPlayers(),mode:"quick",customTrack:s})}),!0}catch{return!1}}showMyTracks(){const e=Ie.customTracks(),{box:t,close:i}=this.overlay(`<div class="ov-head"><b>📂 Minhas Pistas</b><button class="ov-x">✕</button></div>
      <div class="my-tracks" id="mt">${e.length?"":'<div class="mt-empty">Nenhuma pista salva ainda. Crie a sua! ✏️</div>'}</div>`,"wide"),s=t.querySelector("#mt");e.forEach(a=>{const o=this.el(`<div class="mt-row"><span class="mt-nm">🏁 ${a.name}</span><span class="mt-acts"><button class="chip mini" data-a="load">Abrir</button><button class="chip mini" data-a="share">🔗</button><button class="chip mini" data-a="play">Jogar</button><button class="chip mini danger" data-a="del">🗑️</button></span></div>`);o.querySelector('[data-a="load"]').addEventListener("click",()=>{this.edPts=a.pts.slice(),this.edObs=(a.obstacles||[]).slice(),this.edPatches=(a.patches||[]).slice(),this.edTheme=a.theme,this.edHalf=a.half,this.edName=a.name,this.edProtect=a.protect==null?1:a.protect,this.edOpenArcs=(a.openArcs||[]).slice(),i(),this.showEditor()}),o.querySelector('[data-a="share"]').addEventListener("click",()=>{this.edPts=a.pts.slice(),this.edObs=(a.obstacles||[]).slice(),this.edPatches=(a.patches||[]).slice(),this.edTheme=a.theme,this.edHalf=a.half,this.edName=a.name,this.shareCustom()}),o.querySelector('[data-a="play"]').addEventListener("click",()=>{const r=Us(a);i(),this.cb.start({level:2,trackIdx:0,pick:"specific",players:this.aiPlayers(),mode:"quick",customTrack:r})}),o.querySelector('[data-a="del"]').addEventListener("click",()=>{Ie.deleteTrack(a.id),o.remove()}),s.appendChild(o)}),t.querySelector(".ov-x").addEventListener("click",i)}resetPlayers(e){this.cfgPlayers=[{human:!0,ai:"cauteloso",color:0,name:"Você"}];let t=3;(e==="daily"||e==="trial")&&(t=0),e==="local"&&(t=1),e==="elim"&&(t=5),e==="dupla"&&(t=this.cfgTeamSize*2-1);for(let i=0;i<t;i++)this.cfgPlayers.push({human:e==="local",ai:Vt[i%Vt.length],color:(i+1)%Is.length,name:e==="local"?`Jogador ${i+2}`:ci[i%ci.length]})}showSetup(e){if(this.cfgMode=e,this.resetPlayers(e),this.cfgPick="specific",e==="daily"){const t=new Date,i=t.getFullYear()*372+(t.getMonth()+1)*31+t.getDate();this.cfgLevel=i%5,this.cfgTrack=Math.floor(i/5)%Wt}this.renderSetup()}renderSetup(){this.clear();const e=this.cfgMode==="daily",t=this.cfgMode==="trial",i=this.cfgMode==="dupla",s=this.cfgMode==="elim",a=this.cfgMode==="caos",o=this.cfgMode==="champ",r=this.cfgPick!=="specific",c=fd(this.cfgLevel,this.cfgTrack),l=!e&&!t,h={quick:"Corrida Rápida",ai:"Contra a IA",local:"Multiplayer Local",champ:"Campeonato",daily:"Desafio Diário",caos:"🌀 Modo Caos",elim:"💀 Eliminação",trial:"⏱️ Contra-Relógio",dupla:"🤝 Corrida de Dupla"}[this.cfgMode],f=a?'<div class="mode-banner caos">🌀 <b>Modo Caos:</b> caixas <b>?</b> na pista dão power-ups. Quem está mais atrás pega os melhores (raio, foguete, salto). Toque no item pra usar!</div>':s?'<div class="mode-banner elim">💀 <b>Eliminação:</b> a cada corrida numa pista nova, o <b>último colocado sai</b>. Sobrevive até ser o único!</div>':t?'<div class="mode-banner trial">⏱️ <b>Contra-Relógio:</b> você sozinho. Leve a tampinha à chegada com o <b>menor número de petelecos</b> possível.</div>':i?'<div class="mode-banner dupla">🤝 <b>Dupla:</b> dois times. Vence o time com a <b>menor soma de colocações</b>. Ajude o parceiro… ou atrapalhe o rival!</div>':"",d=e?"":`<div class="lvl-row" id="lvls">
      ${Xn.map((x,A)=>`<button class="lvl-chip ${A===this.cfgLevel?"sel":""}" data-l="${A}" style="--lc:${Ns[A]}"><b>${x}</b><span>${this.levelHint(A)}</span></button>`).join("")}
    </div>`;let u="";if(o){const x=hs[this.cfgChampFmt],A=Object.keys(hs).map(w=>`<button class="champ-fmt ${w===this.cfgChampFmt?"sel":""}" data-f="${w}"><span class="cf-ico">${hs[w].ico}</span><b>${hs[w].name}</b><span>${hs[w].desc}</span></button>`).join(""),S=this.cfgChampFmt==="gp"?"<b>todos os níveis</b> (Fácil → Extrema)":`nível <b style="color:${Ns[this.cfgLevel]}">${Xn[this.cfgLevel]}</b>`;u=`<div class="champ-fmts">${A}</div>
        <div class="champ-note">🏆 <b>${x.races} corridas</b> · ${S}. Pontos por posição em cada corrida — some tudo e seja o <b>campeão</b>! 🏅</div>`}else if(r)u=`<div class="track-pick">
        <div class="track-card mystery" style="border-color:${this.cfgPick==="randany"?"#b98cff":Ns[this.cfgLevel]}">
          <div class="track-name">🎲 Surpresa!</div>
          <div class="track-sub">${this.cfgPick==="randany"?"pista aleatória de qualquer nível":"pista aleatória do nível "+Xn[this.cfgLevel]}</div>
        </div>
      </div>`;else{const x=!e,A=Array.from({length:Wt},(S,w)=>`<button class="tnum ${w===this.cfgTrack?"sel":""}" data-i="${w}">${w+1}</button>`).join("");u=`<div class="track-pick">
        ${x?'<button class="arrow" id="tprev">‹</button>':""}
        <div class="track-card" style="border-color:${Ns[this.cfgLevel]}">
          <div class="track-name">${c.name}</div>
          <div class="track-sub">${c.theme} · ${this.lenLabel(c)}${x?" · pista "+(this.cfgTrack+1)+"/"+Wt:" · "+Xn[this.cfgLevel]}</div>
          <div class="track-mini" id="mini"></div>
        </div>
        ${x?'<button class="arrow" id="tnext">›</button>':""}
      </div>
      ${x?`<div class="tnum-row" id="tnums">${A}</div>`:""}`}const g=i?`<div class="rand-row team-row">
      <button class="chip ${this.cfgTeamSize===2?"sel":""}" data-ts="2">2 × 2</button>
      <button class="chip ${this.cfgTeamSize===3?"sel":""}" data-ts="3">3 × 3</button>
    </div>`:"",v=e||o?"":`<div class="rand-row">
      <button class="chip ${this.cfgPick==="specific"?"sel":""}" id="pspec">🎯 Escolher</button>
      <button class="chip ${this.cfgPick==="randlevel"?"sel":""}" id="prlvl">🎲 Do nível</button>
      <button class="chip ${this.cfgPick==="randany"?"sel":""}" id="prany">🎲 Qualquer</button>
    </div>`,p=t?`<div class="daily-note">⏱️ <b>${c.name}</b> (${Xn[this.cfgLevel]}). Você sozinho: chegue com o <b>menor número de petelecos</b>. Recorde nesta pista: <b>${Ie.trialBest(this.cfgLevel,this.cfgTrack)??"—"}</b></div>`:`<div class="daily-note">Pista do dia: <b>${c.name}</b> (${Xn[this.cfgLevel]}). Contra o relógio: leve a tampinha à chegada com o <b>menor número de petelecos</b>. Recorde de hoje: <b>${Ie.dailyBest(Ib())??"—"}</b></div>`,m=this.el(`
      <div class="screen setup">
        <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>${h}</h2><div></div></div>
        ${f}
        ${d}
        ${g}
        ${v}
        ${u}
        ${l?`<div class="players" id="players"></div>
        ${i?"":`<div class="pcount">
          <button class="chip" id="less">– jogador</button>
          <span>${this.cfgPlayers.length} tampinhas</span>
          <button class="chip" id="more">+ jogador</button>
        </div>`}`:p}
        <div class="play-dock"><button class="play-btn" id="play">Jogar ▶</button></div>
      </div>`);this.root.appendChild(m),m.prepend(this.bgFx(6));const y=m.querySelector("#mini");y&&this.drawMini(y,c);const b=["caos","elim","trial","dupla"].includes(this.cfgMode);m.querySelector("#back").addEventListener("click",()=>b?this.showModes():this.showMenu()),m.querySelectorAll(".lvl-chip").forEach(x=>x.addEventListener("click",()=>{this.cfgLevel=+x.dataset.l,this.cfgTrack=0,this.renderSetup()})),m.querySelectorAll(".champ-fmt").forEach(x=>x.addEventListener("click",()=>{this.cfgChampFmt=x.dataset.f,this.renderSetup()})),m.querySelectorAll("[data-ts]").forEach(x=>x.addEventListener("click",()=>{this.cfgTeamSize=+x.dataset.ts,this.resetPlayers("dupla"),this.renderSetup()})),m.querySelector("#pspec")?.addEventListener("click",()=>{this.cfgPick="specific",this.renderSetup()}),m.querySelector("#prlvl")?.addEventListener("click",()=>{this.cfgPick="randlevel",this.renderSetup()}),m.querySelector("#prany")?.addEventListener("click",()=>{this.cfgPick="randany",this.renderSetup()}),m.querySelector("#tprev")?.addEventListener("click",()=>{this.cfgTrack=(this.cfgTrack+Wt-1)%Wt,this.renderSetup()}),m.querySelector("#tnext")?.addEventListener("click",()=>{this.cfgTrack=(this.cfgTrack+1)%Wt,this.renderSetup()}),m.querySelectorAll(".tnum").forEach(x=>x.addEventListener("click",()=>{this.cfgTrack=+x.dataset.i,this.renderSetup()})),l&&(this.renderPlayers(m.querySelector("#players")),m.querySelector("#less").addEventListener("click",()=>{this.cfgPlayers.length>2&&(this.cfgPlayers.pop(),this.renderSetup())}),m.querySelector("#more").addEventListener("click",()=>{if(this.cfgPlayers.length<6){const x=this.cfgPlayers.length;this.cfgPlayers.push({human:this.cfgMode==="local",ai:Vt[x%Vt.length],color:x%Is.length,name:this.cfgMode==="local"?`Jogador ${x+1}`:ci[(x-1)%ci.length]}),this.renderSetup()}})),m.querySelector("#play").addEventListener("click",()=>this.launch())}levelHint(e){return["muito protegida","protegida","pouca proteção","quase sem muro","sem muro"][e]}lenLabel(e){let t=0;for(let i=1;i<e.path.length;i++)t+=Math.hypot(e.path[i].x-e.path[i-1].x,e.path[i].y-e.path[i-1].y);return t<320?"curta":t<480?"longa":t<620?"muito longa":"épica"}renderPlayers(e){e.innerHTML="";const t=this.cfgMode==="dupla";this.cfgPlayers.forEach((i,s)=>{const a=s===0,o=t?s%2:-1,r=t?`<span class="team-badge t${o}">Time ${o===0?"A":"B"}</span>`:"",c=this.el(`<div class="prow ${a?"you-row":""} ${t?"team-t"+o:""}">
        ${a?'<span class="pcap-mini" id="ycap"></span>':`<span class="pdot" style="background:${Is[i.color]}"></span>`}
        <input class="pname" value="${i.name}" ${a?"readonly":""}/>
        ${r}
        ${a?'<button class="ptag you">🎨 trocar</button>':`<button class="ptype">${i.human?"👤 Humano":"🤖 "+hd[i.ai]}</button>`}
      </div>`);e.appendChild(c);const l=c.querySelector(".pname");if(l.addEventListener("change",()=>i.name=l.value||i.name),a){const h=c.querySelector("#ycap"),f=gt(lt(Ie.skin()).art,60);f.style.width="100%",f.style.height="100%",f.style.display="block",h.appendChild(f);const d=()=>this.showCapPicker(Ie.skin(),u=>{this.cb.setSkin(u),this.renderPlayers(e)});h.addEventListener("click",d),c.querySelector(".ptag").addEventListener("click",d)}else{const h=c.querySelector(".pdot");h.addEventListener("click",()=>{i.color=(i.color+1)%Is.length,h.style.background=Is[i.color]});const f=c.querySelector(".ptype");f&&f.addEventListener("click",()=>{if(this.cfgMode==="local")i.human=!i.human,i.human||(i.ai=Vt[s%Vt.length]);else{const d=Vt.indexOf(i.ai);i.ai=Vt[(d+1)%Vt.length],i.human=!1}this.renderPlayers(e)})}})}launch(){const e=this.cfgMode==="daily"||this.cfgMode==="trial",t=this.cfgMode==="dupla",i=Jr(Ie.skin(),this.cfgPlayers.length-1),s=e?[{name:"Você",isAI:!1,skin:Ie.skin()}]:this.cfgPlayers.map((r,c)=>({name:r.name,isAI:!r.human,ai:r.ai,skin:c===0?Ie.skin():i[c-1],team:t?c%2:void 0}));let a=this.cfgLevel,o=this.cfgTrack;this.cfgPick==="randlevel"?o=Math.floor(Math.random()*Wt):this.cfgPick==="randany"&&(a=Math.floor(Math.random()*5),o=Math.floor(Math.random()*Wt)),this.cb.start({level:a,trackIdx:o,pick:this.cfgPick,players:s,mode:this.cfgMode,champFmt:this.cfgChampFmt,teamSize:this.cfgTeamSize})}drawMini(e,t){const o=document.createElement("canvas");o.width=250,o.height=156;const r=o.getContext("2d"),c=Math.min((250-10*2)/t.w,(156-10*2)/t.h),l=(250-t.w*c)/2,h=(156-t.h*c)/2,f=g=>l+g*c,d=g=>h+g*c;r.fillStyle="#0000002e",r.fillRect(0,0,250,156),r.strokeStyle="rgba(255,255,255,0.18)",r.lineWidth=Math.max(4,8*c),r.lineCap="round",r.lineJoin="round",r.beginPath(),t.path.forEach((g,v)=>{const p=f(g.x),m=d(g.y);v?r.lineTo(p,m):r.moveTo(p,m)}),r.stroke(),r.strokeStyle=t.wallCol||"#caa",r.globalAlpha=.9,r.lineWidth=1.3,r.beginPath();for(const g of t.walls)r.moveTo(f(g.a.x),d(g.a.y)),r.lineTo(f(g.b.x),d(g.b.y));r.stroke(),r.globalAlpha=1,r.strokeStyle="rgba(255,255,255,0.5)",r.lineWidth=1.4,r.setLineDash([3,3]),r.beginPath(),t.path.forEach((g,v)=>{const p=f(g.x),m=d(g.y);v?r.lineTo(p,m):r.moveTo(p,m)}),r.stroke(),r.setLineDash([]);for(const g of t.obstacles){const v=Math.max(1.4,g.r*c);r.fillStyle=g.type==="hole"?"#120c06":g.type==="bomb"?"#e5484d":g.type==="stone"?"#9a948a":g.n>=3?"#e0a020":g.n===2?"#2e9fa4":"#2ea44f",r.beginPath(),r.arc(f(g.x),d(g.y),v,0,7),r.fill()}r.fillStyle="#3fae6a",r.beginPath(),r.arc(f(t.start.x),d(t.start.y),4,0,7),r.fill(),r.fillStyle="#e5484d";const u=t.finish[0];r.beginPath(),r.arc(f(u.x),d(u.y),4,0,7),r.fill(),e.innerHTML="",e.appendChild(o)}showSkins(){this.clear();const e=Ie.wins(),t=Ie.skin(),i=this.el(`<div class="screen skins">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Tampinhas <span class="cap-count">${Ko(e).length}/${zt.filter(a=>!a.hidden).length}</span></h2><div></div></div>
      <div class="skin-scroll" id="scroll"></div>
    </div>`);this.root.appendChild(i),i.prepend(this.bgFx(5));const s=i.querySelector("#scroll");for(const a of Nv){const o=zt.filter(h=>h.rarity===a&&!h.hidden),r=o.filter(h=>e>=h.unlock||Ie.hasBonus(h.id)).length,c=this.el(`<div class="rar-sec">
        <div class="rar-head" style="--rc:${Pi[a]}"><span class="rar-dot"></span>${ka[a]} <b>${r}/${o.length}</b></div>
        <div class="skin-grid"></div></div>`);s.appendChild(c);const l=c.querySelector(".skin-grid");for(const h of o){const f=e<h.unlock&&!Ie.hasBonus(h.id),d=this.el(`<button class="skin-card ${t===h.id?"sel":""} ${f?"locked":""}" style="--rc:${Pi[h.rarity]}">
          <div class="skin-face"></div>
          <div class="skin-name">${h.name}</div>
          <div class="skin-desc">${f?h.prize!=null?"🏆 OURO nas 4 da "+$a[h.prize].name:"🔒 "+h.unlock+" vitórias":h.desc}</div>
          ${Gs(h.stats,!0)}
        </button>`),u=d.querySelector(".skin-face"),g=gt(h.art,132);g.style.width="100%",g.style.height="auto",g.style.display="block",f&&(g.style.filter="grayscale(1) brightness(0.55)"),u.appendChild(g),l.appendChild(d),f||d.addEventListener("click",()=>{this.cb.setSkin(h.id),this.showSkins()})}}i.querySelector("#back").addEventListener("click",()=>this.showMenu())}showSettings(){this.clear();const e=this.el(`<div class="screen settings">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Ajustes</h2><div></div></div>
      <div class="cfg-row"><label>Música</label><input type="range" id="mus" min="0" max="1" step="0.05" value="${jt.music}"></div>
      <div class="cfg-row"><label>Efeitos</label><input type="range" id="sfx" min="0" max="1" step="0.05" value="${jt.sfx}"></div>
      <div class="cfg-row"><label>Mudo</label><button class="chip" id="mute">${jt.muted?"🔇 Ligado":"🔊 Desligado"}</button></div>
      <div class="how"><b>Como jogar:</b> arraste a tampinha <b>para trás</b> e solte — quanto mais puxa, mais forte. 3 petelecos por vez; chegue primeiro! <b>Proteção:</b> pistas fáceis têm muro que te segura na pista; nas difíceis o muro some e é fácil <b>cair fora</b> (volta pro início do turno). <b>Buraco</b> = volta ao checkpoint e perde 1 peteléco · <b>X</b> = perde a vez · <b>verde +1/+2/+3</b> = petelecos extras. Câmera: dois dedos giram/aproximam.</div>
    </div>`);this.root.appendChild(e),e.prepend(this.bgFx(5));const t=()=>this.cb.setVols(+e.querySelector("#mus").value,+e.querySelector("#sfx").value,jt.muted);e.querySelector("#mus").addEventListener("input",t),e.querySelector("#sfx").addEventListener("input",t),e.querySelector("#mute").addEventListener("click",()=>{jt.muted=!jt.muted,t(),e.querySelector("#mute").textContent=jt.muted?"🔇 Ligado":"🔊 Desligado"}),e.querySelector("#back").addEventListener("click",()=>this.showMenu())}overlay(e,t=""){const i=this.el(`<div class="ov-bg"><div class="ov ${t}">${e}</div></div>`);this.root.appendChild(i);const s=()=>i.remove();return i.addEventListener("click",a=>{a.target===i&&s()}),{box:i.querySelector(".ov"),close:s}}notify(e,t=""){const i=this.el(`<div class="float-msg ${t}">${e}</div>`);this.root.appendChild(i),setTimeout(()=>i.classList.add("show"),10),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>i.remove(),300)},2400)}showCapPicker(e,t){const i=Ko(Ie.wins()),{box:s,close:a}=this.overlay(`
      <div class="ov-head"><b>🎨 Sua tampinha</b><button class="ov-x">✕</button></div>
      <div class="ov-sub">Você tem ${i.length} tampinha${i.length>1?"s":""} — toque pra escolher</div>
      <div class="pick-grid" id="pg"></div>`,"wide"),o=s.querySelector("#pg");for(const r of i){const c=this.el(`<button class="pick-card ${r.id===e?"sel":""}" style="--rc:${Pi[r.rarity]}">
        <div class="pick-face"></div><div class="pick-name">${r.name}</div>${Gs(r.stats,!0)}</button>`),l=gt(r.art,96);l.style.width="100%",l.style.height="auto",l.style.display="block",c.querySelector(".pick-face").appendChild(l),c.addEventListener("click",()=>{t(r.id),a()}),o.appendChild(c)}s.querySelector(".ov-x").addEventListener("click",a)}showCapStats(e,t,i){const s=lt(t),a=i||s.stats,o=!!i&&Zr.some(([,h])=>i[h]>(s.stats[h]??1)+1e-6),{box:r,close:c}=this.overlay(`
      <div class="ov-head"><b>${e}</b><button class="ov-x">✕</button></div>
      <div class="cs-face" id="csf"></div>
      <div class="cs-name" style="color:${Pi[s.rarity]}">${s.name}</div>
      <div class="rar-head cs-rar" style="--rc:${Pi[s.rarity]};justify-content:center"><span class="rar-dot"></span>${ka[s.rarity]}</div>
      ${Gs(a,!0,i?s.stats:void 0)}
      ${o?'<div class="cs-ofi">▲ melhorado na Oficina</div>':""}
      <div class="cs-desc">${s.desc}</div>`,"stats"),l=gt(s.art,160);l.style.width="124px",l.style.height="124px",l.style.display="block",l.style.margin="0 auto",r.querySelector("#csf").appendChild(l),r.querySelector(".ov-x").addEventListener("click",c)}showHelp(){this.clear();const e=[["⚫","Buraco","Caiu, voltou! Você retorna ao <b>último checkpoint</b> e perde 1 peteléco. Eles ficam fora da linha central — dá pra desviar."],["💣","Bomba (X)","Explode e você <b>perde o resto da vez</b>. Passe bem longe."],["🪨","Pedra","Sólida: a tampinha <b>quica</b> nela. Dá pra usar de tabela pra fazer curva… ou te atrapalha."],["🛫","Rampa de salto","Com <b>velocidade</b> a tampinha decola e <b>voa por cima</b> do buraco na frente. Devagar, ela cai. Chegue com força!"],["⏫","Setas verdes","Tira de aceleração: dá um <b>impulso</b> no sentido da pista. Passe por cima pra ganhar velocidade."],["🪵","Tábuas (zig-zag)","Estreitam a pista de um lado e do outro. Faça o <b>zigue-zague</b> pra passar."],["💎","Bônus +1/+2/+3","Petelecos extras! Ficam em lugares <b>arriscados</b>: quanto maior o número, mais perto da beira ou de um buraco. O +3 é pra corajoso."],["🚩","Checkpoint","A faixa azul numerada. Ao <b>cruzar</b>, você fica salvo ali — se cair depois, volta pra este ponto (não pro início)."],["🏁","Fora da pista","Saiu do corredor? Volta pro começo do peteléco. Nas fases difíceis quase não tem muro — cuidado!"]],t=[["Peso","⚖️","Massa da tampinha. A <b>pesada</b> quase não sai do lugar quando batem nela e <b>empurra</b> as leves pra longe. Só que em areia/lama afunda e freia mais."],["Desliza","💨","Vai <b>mais longe</b> com o mesmo peteléco. Ótima em calçada/giz; cuidado pra não passar do ponto."],["Controle","🎯","Freia mais certinho no fim — <b>para onde você mira</b>. Boa pra encaixar em espaço apertado sem passar direto."],["Quique","🏀",'Quica mais nas <b>bordas</b> e pedras, e "tabela" mais forte batendo nas outras tampinhas.'],["Estabil.","🌀","Mantém a linha: <b>roda menos</b> e desvia menos do rumo. Estável = previsível."],["Potência","💥","Sai com mais <b>força</b>: bate mais forte nas rivais (joga elas longe) e atravessa melhor a <b>lama e a areia</b>. Quem vai mais longe é o Desliza."],["Aderência","🧲","Firmeza na pista: <b>difícil de te jogarem pra fora</b> quando batem em você. Segura firme na hora do encontrão."]],i=(a,o,r)=>`<div class="hc"><div class="hc-ico">${a}</div><div class="hc-tx"><div class="hc-t">${o}</div><div class="hc-d">${r}</div></div></div>`,s=this.el(`<div class="screen help">
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
    </div>`);this.root.appendChild(e),e.prepend(this.bgFx(5));const t=gt(lt(Ie.skin()).art,96);t.style.width="86px",t.style.height="86px",t.style.display="block",t.style.margin="0 auto";const i=e.querySelector("#olface");i.appendChild(t),i.addEventListener("click",()=>this.showCapPicker(Ie.skin(),r=>{this.cb.setSkin(r),this.showOnlineHome()}));const s=e.querySelector("#oname"),a=e.querySelector("#ocode"),o=()=>(this.myName=(s.value||"Você").slice(0,12),Ie.setName(this.myName),this.myName);s.addEventListener("change",o),a.addEventListener("input",()=>a.value=a.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,5)),e.querySelector("#back").addEventListener("click",()=>{this.online.leave(),this.showMultiplayer()}),e.querySelector("#create").addEventListener("click",()=>{this.online.createRoom(o(),Ie.skin()),this.showLobby("Criando sala…")}),e.querySelector("#join").addEventListener("click",()=>{const r=a.value.trim();if(r.length<4){this.notify("Digite o código da sala","bad");return}this.online.joinRoom(r,o(),Ie.skin()),this.showLobby("Entrando na sala…")})}showLobby(e=""){this.clear(),this.lobbyOpen=!0;const t=this.el(`<div class="screen setup lobby">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Sair</button><h2>Sala Online</h2><div></div></div>
      <div class="lob-code" id="code"></div>
      <div class="lob-status" id="status">${e}</div>
      <div class="lob-seats" id="seats"></div>
      <div class="lob-ctrl" id="ctrl"></div>
    </div>`);this.root.appendChild(t),t.prepend(this.bgFx(4)),t.querySelector("#back").addEventListener("click",()=>{this.lobbyOpen=!1,this.online.leave(),this.showOnlineHome()}),this.online.onCode=()=>this.renderLobby(),this.online.onRoster=()=>this.renderLobby(),this.online.onError=i=>{const s=document.querySelector(".lobby #status");s&&(s.textContent=i,s.classList.add("err")),this.notify(i,"bad")},this.renderLobby()}renderLobby(){const e=this.root.querySelector(".lobby");if(!e)return;const t=this.online;e.querySelector("#code").innerHTML=t.code?`<span class="lc-lab">código</span><span class="lc-val" id="cval">${t.code}</span><button class="chip lc-copy" id="copy">📋 Compartilhar</button>`:'<span class="lc-lab">conectando…</span>';const i=e.querySelector("#copy");i&&i.addEventListener("click",()=>{const r="Bora jogar Tampinha Rally! Código da sala: "+t.code;navigator.share?navigator.share({text:r}).catch(()=>{}):navigator.clipboard?navigator.clipboard.writeText(t.code).then(()=>this.notify("Código copiado!","good")):this.notify("Código: "+t.code)});const s=e.querySelector("#seats");s.innerHTML="";const a=t.seats.length?t.seats:[{name:t.myName,skin:t.mySkin,kind:"human",owner:"host"}];e.querySelector("#status").textContent=`${a.length}/6 na sala`,a.forEach(r=>{const c=r.kind==="human"&&r.owner===t.myId,l=r.off?"📴 saiu (IA)":r.kind==="ai"?"🤖 "+t.aiLabel(r.ai):r.owner==="host"?"👑 anfitrião":c?"⭐ você":"👤 jogador",h=t.cfg.roomMode==="dupla"&&r.team!=null?`<span class="team-badge t${r.team}">${r.team===0?"A":"B"}</span>`:"",f=c?`<input class="ls-name-edit" id="myname" maxlength="12" value="${r.name}"/>`:`<span class="ls-name">${r.name}</span>`,d=this.el(`<div class="prow lob-seat ${c?"you-row":""} ${t.cfg.roomMode==="dupla"&&r.team!=null?"team-t"+r.team:""}"><span class="pcap-mini"></span>${f}${h}<span class="ls-tag">${l}</span></div>`),u=gt(lt(r.skin).art,56);if(u.style.width="100%",u.style.height="100%",u.style.display="block",d.querySelector(".pcap-mini").appendChild(u),c){const g=d.querySelector(".pcap-mini");g.classList.add("tap"),g.addEventListener("click",()=>this.showCapPicker(t.mySkin,m=>{this.cb.setSkin(m),t.setMyCap(m)}));const v=d.querySelector("#myname"),p=()=>{const m=(v.value||"Você").slice(0,12);this.myName=m,Ie.setName(m),t.setMyName(m)};v.addEventListener("change",p),v.addEventListener("blur",p)}s.appendChild(d)});const o=e.querySelector("#ctrl");if(o.innerHTML="",t.isHost){const r=Xn.map((g,v)=>`<button class="lvl-chip mini ${v===t.cfg.level?"sel":""}" data-l="${v}" style="--lc:${Ns[v]}"><b>${g}</b></button>`).join(""),c=`<div class="rand-row"><button class="chip ${t.cfg.pick==="specific"?"sel":""}" data-p="specific">🎯 Escolher</button><button class="chip ${t.cfg.pick==="randlevel"?"sel":""}" data-p="randlevel">🎲 Do nível</button><button class="chip ${t.cfg.pick==="randany"?"sel":""}" data-p="randany">🎲 Qualquer</button></div>`,l=t.cfg.pick==="specific"?`<div class="tnum-row">${Array.from({length:Wt},(g,v)=>`<button class="tnum ${v===t.cfg.trackIdx?"sel":""}" data-i="${v}">${v+1}</button>`).join("")}</div>`:"",h=t.cfg.roomMode,f=`<div class="lob-h">Modo da sala</div><div class="rand-row room-row">
        <button class="chip ${h==="normal"?"sel":""}" data-rm="normal">🏁 Normal</button>
        <button class="chip ${h==="dupla"?"sel":""}" data-rm="dupla">🤝 Dupla</button>
        <button class="chip ${h==="champ"?"sel":""}" data-rm="champ">🏆 Campeonato</button></div>`,d=h==="dupla"?`<div class="rand-row"><button class="chip ${t.cfg.teamSize===2?"sel":""}" data-team="2">2 × 2</button><button class="chip ${t.cfg.teamSize===3?"sel":""}" data-team="3">3 × 3</button></div>`:h==="champ"?`<div class="rand-row">${[3,5,7].map(g=>`<button class="chip ${t.cfg.champRaces===g?"sel":""}" data-cr="${g}">${g} corridas</button>`).join("")}</div>`:"",u=h==="dupla"?"":`<div class="lob-total"><button class="chip" id="tless">–</button><span><b>${t.total}</b> corredores <small>(${t.seats.filter(g=>g.kind==="human").length} 👤 + ${t.seats.filter(g=>g.kind==="ai").length} 🤖)</small></span><button class="chip" id="tmore">+</button></div>`;o.innerHTML=`${f}${d}<div class="lob-h">Dificuldade &amp; fase</div><div class="lvl-row">${r}</div>${c}${l}
        ${u}
        <button class="play-btn" id="startm">🏁 Começar ${h==="champ"?"Campeonato":h==="dupla"?"Dupla":"Partida"}</button>`,o.querySelectorAll("[data-rm]").forEach(g=>g.addEventListener("click",()=>t.setRoom(g.dataset.rm))),o.querySelectorAll("[data-team]").forEach(g=>g.addEventListener("click",()=>t.setRoom("dupla",+g.dataset.team))),o.querySelectorAll("[data-cr]").forEach(g=>g.addEventListener("click",()=>t.setRoom("champ",t.cfg.teamSize,+g.dataset.cr))),o.querySelectorAll(".lvl-chip").forEach(g=>g.addEventListener("click",()=>t.setCfg(+g.dataset.l,0,t.cfg.pick))),o.querySelectorAll("[data-p]").forEach(g=>g.addEventListener("click",()=>t.setCfg(t.cfg.level,t.cfg.trackIdx,g.dataset.p))),o.querySelectorAll(".tnum").forEach(g=>g.addEventListener("click",()=>t.setCfg(t.cfg.level,+g.dataset.i,t.cfg.pick))),o.querySelector("#tless")?.addEventListener("click",()=>t.setTotal(t.total-1)),o.querySelector("#tmore")?.addEventListener("click",()=>t.setTotal(t.total+1)),o.querySelector("#startm").addEventListener("click",()=>{this.lobbyOpen=!1,t.startMatch()})}else{const r=t.cfg.roomMode==="dupla"?`🤝 Dupla ${t.cfg.teamSize}×${t.cfg.teamSize}`:t.cfg.roomMode==="champ"?`🏆 Campeonato (${t.cfg.champRaces} corridas)`:"🏁 Normal";o.innerHTML=`<div class="lob-wait">⏳ Aguardando o anfitrião começar…<br><small>Modo: <b>${r}</b> · Dificuldade: <b>${Xn[t.cfg.level]}</b></small></div>`}}showGame(){this.clear(),this.hud=this.el(`
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
    </div>`),this.root.appendChild(this.hud),this.hud.querySelector("#pause").addEventListener("click",()=>this.onPause?.())}updateHUD(e,t){if(!this.hud)return;const i=e.activeCap(),s=this.hud.querySelector("#turn");s.innerHTML=`<span class="tdot" style="background:${lt(i.skin).top};color:${lt(i.skin).top}"></span> ${i.finished?"Corrida!":"Vez de <b>"+i.name+"</b>"} <span class="tzoom">🔍</span>`,s.onclick=()=>this.showCapStats(i.name,i.skin,i.stats);const a=this.hud.querySelector("#flicks");let o="";Math.max(3,i.flicksLeft);for(let h=0;h<i.flicksLeft;h++)o+='<span class="fd on"></span>';a.innerHTML=(e.phase==="aim"&&t?'<span class="fl-lab">Petelecos</span>':"")+o+(i.flicksLeft===1?'<span class="flast">último!</span>':""),a.style.opacity=i.isAI||e.phase!=="aim"?"0.55":"1";const r=this.hud.querySelector("#item");if(e.chaos&&t&&e.phase==="aim"&&(i.item||i.shield||i.boostNext>1)){r.classList.remove("hidden");let h="";if(i.item){const u=ms[i.item];h+=`<button class="item-btn"><span class="it-ico">${u.ico}</span><span class="it-tx"><b>${u.name}</b><small>${u.desc}</small></span><span class="it-use">USAR</span></button>`}const f=this.activeFxHtml(i);f&&(h+=`<div class="fx-active">${f}</div>`),r.innerHTML=h;const d=r.querySelector(".item-btn");d&&(d.onclick=()=>this.onUseItem?.())}else r.classList.add("hidden"),r.innerHTML="";const c=this.hud.querySelector("#stand");c.innerHTML=e.standings().map((h,f)=>`<div class="srow ${h.id===i.id?"act":""}" data-id="${h.id}"><span class="spos">${f+1}º</span><span class="sdot" style="background:${lt(h.skin).top}"></span><span class="sname">${h.name}</span>${e.chaos?this.capFxIcons(h):""}${h.finished?'<span class="sfin">🏁</span>':'<span class="szoom">🔍</span>'}</div>`).join(""),c.querySelectorAll(".srow").forEach(h=>h.addEventListener("click",()=>{const f=e.caps[+h.dataset.id];f&&this.showCapStats(f.name,f.skin,f.stats)}));const l=this.hud.querySelector("#hint");l.style.display=t&&e.phase==="aim"?"block":"none",l.textContent="Arraste a tampinha para trás e solte"}capFxIcons(e){let t="";return e.item&&(t+=`<span class="fx-held" title="guardado">${ms[e.item].ico}</span>`),e.shield&&(t+='<span class="fx-on" title="escudo ativo">🛡️</span>'),e.boostNext>1&&(t+='<span class="fx-on" title="turbo pronto">🚀</span>'),t?`<span class="srow-fx">${t}</span>`:""}activeFxHtml(e){const t=[];return e.shield&&t.push('<span class="fxa shield">🛡️ Escudo ativo</span>'),e.boostNext>1&&t.push('<span class="fxa boost">🚀 Turbo pronto</span>'),t.join("")}toast(e,t=""){if(!this.hud)return;const i=this.hud.querySelector("#toasts"),s=this.el(`<div class="toast ${t}">${e}</div>`);i.appendChild(s),setTimeout(()=>s.classList.add("show"),10),setTimeout(()=>{s.classList.remove("show"),setTimeout(()=>s.remove(),300)},1700)}showPause(){const e=this.hud.querySelector("#modal"),t=this.hud.querySelector("#mbox");t.className="modal",t.innerHTML=`<h3>Pausado</h3><div class="mactions col">
      <button class="play-btn" id="r">▶ Continuar</button>
      <button class="chip" id="re">↻ Reiniciar</button>
      <button class="chip" id="mn">Sair</button></div>`,e.classList.remove("hidden"),t.querySelector("#r").addEventListener("click",()=>this.onResume?.()),t.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),t.querySelector("#mn").addEventListener("click",()=>this.onMenu?.())}hideModal(){this.hud?.querySelector("#modal").classList.add("hidden")}showResults(e,t,i,s){const a=this.hud.querySelector("#modal"),o=this.hud.querySelector("#mbox"),r=e.standings(),c=t==="online"&&this.online.active?e.caps[this.online.mySeatIndex()]:e.caps.find(v=>!v.isAI),l=s?s.won:c&&c.place===1;o.className="modal win";const h=t==="daily"?`<h3>Chegou! 🏁</h3><div class="big">${e.caps[0].place===1?"Você completou!":""}</div>`:s?`<h3>${s.won?"Seu time venceu! 🎉":"Fim de jogo"}</h3>`:i?`<h3 style="font-size:22px">Corrida ${i.race}/${i.total} 🏁</h3>`:`<h3>${l?"Você venceu! 🎉":c?c.place+"º lugar":"Fim!"}</h3>`,f=i?`${sh(i.race,i.total,i.hist)}<div class="champ-stand"><div class="cs-title">🏆 Classificação do campeonato</div>${i.rows.map((v,p)=>`<div class="cs-row ${v.you?"you":""} ${p===0?"lead":""}"><span class="cs-pos">${p+1}º</span><span class="cs-cap" data-s="${v.skin}"></span><span class="cs-nm">${v.name}</span><b class="cs-pts">${v.pts}</b></div>`).join("")}</div>`:"",d=s?`<div class="team-cols">${s.teams.map(v=>`<div class="team-col ${v.win?"win":""} ${v.you?"mine":""}"><div class="team-h">${v.win?"🏆 ":""}${v.label}</div><div class="team-score">${v.score} <small>pts</small></div>${v.members.slice().sort((p,m)=>p.place-m.place).map(p=>`<div class="team-mem"><span class="tm-cap" data-s="${p.skin}"></span><span class="tm-nm">${p.name}</span><b>${p.place}º</b></div>`).join("")}</div>`).join("")}</div>`:"",u=t==="online"?this.online.isHost?'<button class="chip" id="mn">Sair da sala</button><button class="play-btn" id="lob">🔁 Nova partida</button>':'<button class="chip" id="mn">Sair da sala</button><div class="ol-wait2">⏳ Aguardando o anfitrião…</div>':i?`<button class="chip" id="mn">Sair</button><button class="play-btn" id="nx">${i.last?"🏆 Ver campeão":"Próxima ▶"}</button>`:'<button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ Revanche</button><button class="play-btn" id="nx">Nova pista ▶</button>';o.innerHTML=`${h}${s?d:i?f:'<div class="podium" id="pod"></div>'}<div class="mactions">${u}</div>`,i&&o.querySelectorAll(".cs-cap").forEach(v=>{v.appendChild(gt(lt(v.dataset.s).art,44))}),s&&o.querySelectorAll(".tm-cap").forEach(v=>{v.appendChild(gt(lt(v.dataset.s).art,36))});const g=o.querySelector("#pod");g&&r.slice(0,Math.min(4,r.length)).forEach((v,p)=>{const m=this.el(`<div class="prow2 ${p===0?"p1":""}"><span class="pl">${["🥇","🥈","🥉","4º"][p]}</span><span class="pcap"></span><span class="pn">${v.name}</span></div>`);m.querySelector(".pcap").appendChild(gt(lt(v.skin).art,64)),m.addEventListener("click",()=>this.showCapStats(v.name,v.skin,v.stats)),g.appendChild(m)}),a.classList.remove("hidden"),(l||t==="daily"&&e.caps[0].place===1)&&this.confetti(o),o.querySelector("#mn").addEventListener("click",()=>{t==="online"&&this.online.leave(),this.onMenu?.()}),o.querySelector("#re")?.addEventListener("click",()=>this.onRestart?.()),o.querySelector("#nx")?.addEventListener("click",()=>this.onNext?.()),o.querySelector("#lob")?.addEventListener("click",()=>{this.hideModal(),this.online.backToLobby()})}showOnlineChampStanding(e,t,i,s,a){const{modal:o,box:r}=this.modalBox();r.className="modal win";const c=a?`<button class="chip" id="mn">Sair da sala</button><button class="play-btn" id="nx">${s?"🏆 Ver campeão":"Próxima corrida ▶"}</button>`:'<button class="chip" id="mn">Sair da sala</button><div class="ol-wait2">⏳ Aguardando o anfitrião…</div>';r.innerHTML=`<h3 style="font-size:22px">🏆 Campeonato · Corrida ${t}/${i}</h3>
      <div class="champ-stand"><div class="cs-title">Classificação geral</div>${e.map((l,h)=>`<div class="cs-row ${l.you?"you":""} ${h===0?"lead":""}"><span class="cs-pos">${h+1}º</span><span class="cs-cap" data-s="${l.skin}"></span><span class="cs-nm">${l.name}</span><b class="cs-pts">${l.pts}</b></div>`).join("")}</div>
      <div class="mactions">${c}</div>`,r.querySelectorAll(".cs-cap").forEach(l=>l.appendChild(gt(lt(l.dataset.s).art,44))),o.classList.remove("hidden"),r.querySelector("#mn").addEventListener("click",()=>{this.online.leave(),this.onMenu?.()}),r.querySelector("#nx")?.addEventListener("click",()=>{this.hideModal(),this.online.hostNextChamp()})}modalBox(){return{modal:this.hud.querySelector("#modal"),box:this.hud.querySelector("#mbox")}}showTrialResult(e){const{modal:t,box:i}=this.modalBox();i.className="modal win",i.innerHTML=`<h3>${e.finished?e.record?"NOVO RECORDE! 🏆":"Chegou! ⏱️":"Fim"}</h3>
      <div class="trial-big"><span class="tb-num">${e.flicks}</span><span class="tb-lab">petelecos</span></div>
      <div class="trial-best">🏅 Recorde nesta pista: <b>${e.best??e.flicks}</b></div>
      <div class="mactions"><button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ De novo</button><button class="play-btn" id="nx">Nova pista ▶</button></div>`,t.classList.remove("hidden"),e.record&&this.confetti(i),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.()),i.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),i.querySelector("#nx").addEventListener("click",()=>this.onNext?.())}showTeamResult(e){const{modal:t,box:i}=this.modalBox();i.className="modal win";const s=e.teams.map(a=>`<div class="team-col ${a.win?"win":""} ${a.you?"mine":""}">
      <div class="team-h">${a.win?"🏆 ":""}${a.label}</div>
      <div class="team-score">${a.score} <small>pts</small></div>
      ${a.members.sort((o,r)=>o.place-r.place).map(o=>`<div class="team-mem"><span class="tm-cap" data-s="${o.skin}"></span><span class="tm-nm">${o.name}</span><b>${o.place}º</b></div>`).join("")}
    </div>`).join("");i.innerHTML=`<h3>${e.won?"Seu time venceu! 🎉":"Fim de jogo"}</h3>
      <div class="team-cols">${s}</div>
      <div class="team-note">Vence o time com a <b>menor soma</b> de colocações.</div>
      <div class="mactions"><button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ Revanche</button><button class="play-btn" id="nx">Nova pista ▶</button></div>`,i.querySelectorAll(".tm-cap").forEach(a=>a.appendChild(gt(lt(a.dataset.s).art,36))),t.classList.remove("hidden"),e.won&&this.confetti(i),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.()),i.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),i.querySelector("#nx").addEventListener("click",()=>this.onNext?.())}showElimResult(e){const{modal:t,box:i}=this.modalBox();i.className="modal win",i.innerHTML=`<h3>${e.last?"Última eliminação!":"💀 Eliminado!"}</h3>
      <div class="elim-loser"><span class="el-cap" id="elc"></span><div><b>${e.loser.name}</b><span> foi eliminado${e.youOut?" — era VOCÊ 😵":""}</span></div></div>
      <div class="elim-alive"><div class="ea-t">Ainda na disputa (${e.survivors.length})</div>
        ${e.survivors.map((s,a)=>`<div class="ea-row ${s.you?"you":""}"><span class="ea-cap" data-s="${s.skin}"></span><span class="ea-nm">${s.name}</span>${a===0?'<span class="ea-lead">🥇 líder</span>':""}</div>`).join("")}</div>
      <div class="mactions"><button class="chip" id="mn">Sair</button><button class="play-btn" id="nx">${e.last?"🏆 Ver campeão":"Próxima corrida ▶"}</button></div>`,i.querySelector("#elc").appendChild(gt(lt(e.loser.skin).art,52)),i.querySelectorAll(".ea-cap").forEach(s=>s.appendChild(gt(lt(s.dataset.s).art,36))),t.classList.remove("hidden"),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.()),i.querySelector("#nx").addEventListener("click",()=>this.onNext?.())}showChampion(e){const t=this.hud.querySelector("#modal"),i=this.hud.querySelector("#mbox");i.className="modal win champ-final";const s=e.fmt==="elim"?"Eliminação":hs[e.fmt]?.name||"Campeonato";i.innerHTML=`
      <div class="cf-crown">👑</div>
      <h3 style="color:#c98a00">${e.youWon?"VOCÊ é o campeão! 🎉":"Campeão do "+s}</h3>
      <div class="cf-face" id="cff"></div>
      <div class="cf-name">${e.name} 🏆</div>
      <div class="champ-stand final">${e.rows.map((o,r)=>`<div class="cs-row ${o.you?"you":""} ${r===0?"lead":""}"><span class="cs-pos">${["🥇","🥈","🥉"][r]||r+1+"º"}</span><span class="cs-cap" data-s="${o.skin}"></span><span class="cs-nm">${o.name}</span><b class="cs-pts">${o.pts} pts</b></div>`).join("")}</div>
      <div class="mactions"><button class="play-btn" id="mn">Menu ▶</button></div>`;const a=gt(lt(e.skin).art,150);a.style.width="110px",a.style.height="110px",a.style.display="block",a.style.margin="0 auto",i.querySelector("#cff").appendChild(a),i.querySelectorAll(".cs-cap").forEach(o=>o.appendChild(gt(lt(o.dataset.s).art,40))),t.classList.remove("hidden"),this.confetti(i),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.())}};jn.ED_TOOLS=[{t:"draw",ico:"✏️",lab:"Traçar",grp:"p",col:"#8fd0ff"},{t:"move",ico:"✋",lab:"Mover",grp:"p",col:"#ffd94a"},{t:"erase",ico:"🧽",lab:"Apagar",grp:"p",col:"#ff8a8a"},{t:"hole",ico:"⚫",lab:"Buraco",grp:"o",col:"#100a04"},{t:"bomb",ico:"💣",lab:"Bomba",grp:"o",col:"#e5484d"},{t:"stone",ico:"🪨",lab:"Pedra",grp:"o",col:"#9a948a"},{t:"jump",ico:"🛫",lab:"Salto",grp:"o",col:"#c9902e"},{t:"item",ico:"❓",lab:"Caixa",grp:"o",col:"#a86bff"},{t:"top",ico:"🪀",lab:"Pião",grp:"o",col:"#d84a8a"},{t:"bug",ico:"🐞",lab:"Joaninha",grp:"o",col:"#d8362e"},{t:"band",ico:"➰",lab:"Elástico",grp:"o",col:"#e5484d"},{t:"mill",ico:"🎡",lab:"Catavento",grp:"o",col:"#4a90d8"},{t:"balloon",ico:"🎈",lab:"Bexiga",grp:"o",col:"#3f9ae0"},{t:"bonus1",ico:"💎",lab:"+1",grp:"b",col:"#2ea44f"},{t:"bonus2",ico:"💠",lab:"+2",grp:"b",col:"#2e9fa4"},{t:"bonus3",ico:"🏆",lab:"+3",grp:"b",col:"#e0a020"},{t:"ramp",ico:"⏫",lab:"Impulso",grp:"s",col:"#3fae6a"},{t:"push",ico:"⏬",lab:"Freio",grp:"s",col:"#e5484d"},{t:"sand",ico:"🟡",lab:"Areia",grp:"s",col:"#d9b877"},{t:"mud",ico:"🟤",lab:"Lama",grp:"s",col:"#5c452a"},{t:"water",ico:"💧",lab:"Água",grp:"s",col:"#4a90b8"},{t:"grass",ico:"🌿",lab:"Grama",grp:"s",col:"#5f8a36"},{t:"ice",ico:"🧊",lab:"Gelo",grp:"s",col:"#a8dcf5"},{t:"gum",ico:"🍬",lab:"Chiclete",grp:"s",col:"#e878b0"},{t:"magnet",ico:"🧲",lab:"Ímã",grp:"s",col:"#d34a4a"},{t:"vortex",ico:"🌀",lab:"Redemoinho",grp:"s",col:"#58a8d8"}],jn.ED_SURF=new Set(["sand","mud","water","grass","ice","gum","magnet","vortex","ramp","push"]);let Kr=jn;function Jr(n,e){const t=lt(n).rarity,i=zt.filter(a=>a.rarity===t&&a.id!==n&&!a.hidden&&a.prize==null).map(a=>a.id);for(let a=i.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[i[a],i[o]]=[i[o],i[a]]}const s=[];for(let a=0;a<Math.max(0,e);a++)s.push(i.length?i[a%i.length]:n);return s}function Sd(n){return Math.max(1,Math.min(99,Math.round((n-.8)/.45*99)))}function Lb(n){return n>=74?"hi":n>=50?"mid":"lo"}function Db(n,e,t=!1){const i=Sd(e),s=Math.max(8,Math.min(100,Math.round((e-.8)/.4*100)));return`<div class="sbar ${Lb(i)}"><span class="sbl">${n}</span><span class="strack"><i style="width:${s}%"></i></span><b class="sval">${i}${t?'<i class="sup">▲</i>':""}</b></div>`}const Zr=[["Desliza","slide"],["Peso","weight"],["Controle","control"],["Quique","bounce"],["Estabil.","stability"],["Potência","power"],["Aderência","grip"]];function Gs(n,e=!1,t){return`<div class="skin-bars">${(e?Zr:Zr.slice(0,4)).map(([s,a])=>Db(s,n[a],!!t&&n[a]>(t[a]??1)+1e-6)).join("")}</div>`}function sh(n,e,t){const i=r=>r===1?"🥇":r===2?"🥈":r===3?"🥉":r?r+"º":"·";let s="";for(let r=0;r<e;r++){const c=r<n,l=r===n;s+=`<div class="rs-cell ${c?"done":l?"next":""}">
      <span class="rs-flag">${c?"🏁":l?"▶️":"🔒"}</span>
      <span class="rs-med">${c?i(t?.[r]):l?"AGORA":""}</span>
      <span class="rs-lab">${r+1}ª</span>
    </div>`,r<e-1&&(s+=`<i class="rs-link ${r<n-1||r===n-1&&n>0?"on":""}"></i>`)}const a=e-n,o=a===0?"🏆 Competição completa!":a===1?"🔥 Falta só a ÚLTIMA corrida!":`Faltam <b>${a}</b> corridas`;return`<div class="rstrip">${s}</div><div class="rs-note">${o}</div>`}function Ib(){const n=new Date;return`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`}const kb="modulepreload",Nb=function(n,e){return new URL(n,e).href},ah={},Ub=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),r=document.querySelector("meta[property=csp-nonce]"),c=r?.nonce||r?.getAttribute("nonce");s=Promise.allSettled(t.map(l=>{if(l=Nb(l,i),l in ah)return;ah[l]=!0;const h=l.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(!!i)for(let g=o.length-1;g>=0;g--){const v=o[g];if(v.href===l&&(!h||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${f}`))return;const u=document.createElement("link");if(u.rel=h?"stylesheet":kb,h||(u.as="script"),u.crossOrigin="",u.href=l,c&&u.setAttribute("nonce",c),document.head.appendChild(u),h)return new Promise((g,v)=>{u.addEventListener("load",g),u.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return s.then(o=>{for(const r of o||[])r.status==="rejected"&&a(r.reason);return e().catch(a)})};async function oh(){const n=await Ub(()=>import("./bundler-DMWXtVuP.js"),[],import.meta.url);return n.Peer||n.default||n}const Fb=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"turn:openrelay.metered.ca:80",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443?transport=tcp",username:"openrelayproject",credential:"openrelayproject"}],rh={debug:0,config:{iceServers:Fb}},lh=new Set(["unavailable-id","network","server-error","socket-error","socket-closed","disconnected"]),ch="tmprally-",hh="ABCDEFGHJKMNPQRSTUVWXYZ23456789";function Ob(n=5){let e="";for(let t=0;t<n;t++)e+=hh[Math.floor(Math.random()*hh.length)];return e}class dh{constructor(){this.peer=null,this.isHost=!1,this.code="",this.conns=new Map,this.onData=()=>{},this.onOpen=()=>{},this.onJoin=()=>{},this.onLeave=()=>{},this.onError=()=>{}}host(){this.isHost=!0;const e=async t=>{const i=await oh(),s=t>0&&this.code?this.code:Ob(),a=new i(ch+s,rh);this.peer=a,this.code=s;let o=!1;a.on("open",()=>{o=!0,this.onOpen(s)}),a.on("connection",r=>this.accept(r)),a.on("error",r=>{const c=r&&r.type||String(r);if(c==="unavailable-id"&&(this.code=""),lh.has(c)&&t<8){try{a.destroy()}catch{}setTimeout(()=>e(t+1),700+t*400)}else c!=="peer-unavailable"&&this.onError(c)}),setTimeout(()=>{if(!o&&t<8){try{a.destroy()}catch{}e(t+1)}},14e3)};e(0).catch(()=>this.onError("load"))}accept(e){e.on("open",()=>{this.conns.set(e.peer,e),this.onJoin(e.peer)}),e.on("data",t=>this.onData(e.peer,t)),e.on("close",()=>{this.conns.delete(e.peer)&&this.onLeave(e.peer)}),e.on("error",()=>{this.conns.delete(e.peer)&&this.onLeave(e.peer)})}join(e){this.isHost=!1,this.code=e.toUpperCase();let t=!1;const i=s=>{const a=(o=700)=>{!t&&s<7?setTimeout(()=>i(s+1),o+s*300):t||this.onError("peer-unavailable")};oh().then(o=>{const r=new o(rh);this.peer=r;let c=!1;r.on("open",()=>{c=!0;const l=r.connect(ch+this.code,{reliable:!0});l.on("open",()=>{t=!0,this.conns.set("host",l),this.onOpen(this.code)}),l.on("data",h=>this.onData("host",h)),l.on("close",()=>this.onLeave("host")),l.on("error",()=>{try{r.destroy()}catch{}a()}),setTimeout(()=>{if(!t){try{r.destroy()}catch{}a()}},16e3)}),r.on("error",l=>{const h=l&&l.type||String(l);try{r.destroy()}catch{}h==="peer-unavailable"?t||a(1200):lh.has(h)?a():t||this.onError(h)}),setTimeout(()=>{if(!c&&!t){try{r.destroy()}catch{}a()}},12e3)}).catch(()=>this.onError("load"))};i(0)}send(e,t){const i=this.conns.get(e);if(i&&i.open)try{i.send(t)}catch{}}broadcast(e){for(const t of this.conns.values())if(t.open)try{t.send(e)}catch{}}relay(e,t){for(const[i,s]of this.conns)if(i!==e&&s.open)try{s.send(t)}catch{}}count(){return this.conns.size}destroy(){try{this.peer?.destroy()}catch{}this.conns.clear(),this.peer=null}}const uh=["Bolha","Zé","Nina","Tato","Duda","Chico"];class Bb{constructor(){this.net=new dh,this.active=!1,this.inRoom=!1,this.isHost=!1,this.code="",this.myId="host",this.myName="Você",this.mySkin="coca",this.humans=[],this.seats=[],this.total=4,this.cfg={level:0,trackIdx:0,pick:"specific",roomMode:"normal",teamSize:2,champRaces:3},this.mgr=null,this.champ=null,this.onRoster=()=>{},this.onError=()=>{},this.onCode=()=>{},this.onStartMatch=()=>{},this.onToLobby=()=>{},this.onClosed=()=>{},this.onChampStanding=()=>{},this.onChampEnd=()=>{},this.lastTok="",this.decided=!1,this.aiWait=0,this.applied=new Set,this.pendingFlick=null,this.pendingSync=null}reset(){this.net.destroy(),this.net=new dh,this.active=!1,this.inRoom=!1,this.isHost=!1,this.code="",this.myId="host",this.humans=[],this.seats=[],this.total=4,this.mgr=null,this.cfg={level:0,trackIdx:0,pick:"specific",roomMode:"normal",teamSize:2,champRaces:3},this.champ=null,this.lastTok="",this.decided=!1,this.aiWait=0,this.applied.clear(),this.pendingFlick=null,this.pendingSync=null}createRoom(e,t){this.reset(),this.isHost=!0,this.myId="host",this.myName=e,this.mySkin=t,this.humans=[{owner:"host",name:e,skin:t}],this.total=4,this.inRoom=!0,this.net.onOpen=i=>{this.code=i,this.onCode(i),this.rebuild()},this.net.onData=(i,s)=>this.hostData(i,s),this.net.onLeave=i=>this.hostLeave(i),this.net.onError=i=>this.onError(this.friendly(i)),this.net.host()}joinRoom(e,t,i){this.reset(),this.isHost=!1,this.myName=t,this.mySkin=i,this.net.onOpen=()=>{this.myId=this.net.peer.id,this.inRoom=!0,this.code=e.toUpperCase(),this.net.send("host",{t:"hello",name:t,skin:i}),this.onCode(this.code)},this.net.onData=(s,a)=>this.clientData(a),this.net.onLeave=()=>{this.inRoom&&(this.onError("Conexão com o anfitrião caiu"),this.onClosed())},this.net.onError=s=>this.onError(this.friendly(s)),this.net.join(e)}friendly(e){return e==="peer-unavailable"?"Sala não encontrada — confira o código":e==="network"||e==="server-error"||e==="socket-error"?"Sem conexão com o servidor de salas":e==="browser-incompatible"?"Navegador sem suporte a P2P":"Falha de conexão ("+e+")"}leave(){try{this.net.broadcast({t:"bye"})}catch{}this.reset()}rebuild(){if(!this.isHost)return;this.humans.length>6&&(this.humans=this.humans.slice(0,6)),this.cfg.roomMode==="dupla"&&(this.total=this.cfg.teamSize*2),this.total<this.humans.length&&(this.total=this.humans.length),this.total>6&&(this.total=6),this.total<2&&(this.total=2);const e=this.humans.map(o=>({name:o.name,skin:o.skin,kind:"human",owner:o.owner,off:o.off})),t=this.humans.map(o=>o.skin),i=(this.humans.find(o=>o.owner==="host")||this.humans[0])?.skin||"coca",s=zt.filter(o=>o.rarity===lt(i).rarity&&!t.includes(o.id)&&!o.hidden&&o.prize==null).map(o=>o.id);for(let o=s.length-1;o>0;o--){const r=Math.floor(Math.random()*(o+1));[s[o],s[r]]=[s[r],s[o]]}let a=0;for(;e.length<this.total;){const o=a++,r=s.length?s[o%s.length]:zt[Math.floor(Math.random()*zt.length)].id;e.push({name:uh[o%uh.length],skin:r,kind:"ai",ai:Vt[o%Vt.length],owner:"host"})}this.cfg.roomMode==="dupla"?e.forEach((o,r)=>o.team=this.seatTeam(r)):e.forEach(o=>o.team=void 0),this.seats=e,this.broadcastRoster(),this.onRoster()}broadcastRoster(){this.net.broadcast({t:"roster",seats:this.seats,total:this.total,cfg:this.cfg})}setTotal(e){!this.isHost||this.cfg.roomMode==="dupla"||(this.total=Math.max(this.humans.length,Math.min(6,e)),this.rebuild())}setCfg(e,t,i){this.isHost&&(this.cfg.level=e,this.cfg.trackIdx=t,this.cfg.pick=i,this.rebuild())}setRoom(e,t=this.cfg.teamSize,i=this.cfg.champRaces){this.isHost&&(this.cfg.roomMode=e,this.cfg.teamSize=t,this.cfg.champRaces=i,e==="dupla"&&(this.total=t*2),this.rebuild())}seatTeam(e){return e%2}setMyCap(e){if(this.mySkin=e,this.isHost){const t=this.humans.find(i=>i.owner==="host");t&&(t.skin=e),this.rebuild()}else this.net.send("host",{t:"setcap",skin:e})}setMyName(e){const t=(e||"Você").slice(0,12);if(this.myName=t,this.isHost){const i=this.humans.find(s=>s.owner==="host");i&&(i.name=t),this.rebuild()}else this.net.send("host",{t:"setname",name:t})}hostData(e,t){if(this.isHost)if(t.t==="hello"){if(this.active||this.humans.some(i=>i.owner===e))return;if(this.humans.length>=6){this.net.send(e,{t:"full"});return}this.humans.push({owner:e,name:(t.name||"Jogador").slice(0,12),skin:t.skin||"coca"}),this.total<this.humans.length&&(this.total=this.humans.length),this.rebuild()}else if(t.t==="setcap"){const i=this.humans.find(s=>s.owner===e);i&&(i.skin=t.skin,this.rebuild())}else if(t.t==="setname"){const i=this.humans.find(s=>s.owner===e);i&&(i.name=(t.name||"Jogador").slice(0,12),this.rebuild())}else t.t==="flick"?(this.net.relay(e,t),this.pendingFlick=t):t.t==="bye"&&this.hostLeave(e)}hostLeave(e){if(this.isHost)if(this.active){for(const i of this.seats)i.owner===e&&(i.off=!0,i.ai||(i.ai=Vt[Math.floor(Math.random()*Vt.length)]));const t=this.humans.find(i=>i.owner===e);t&&(t.off=!0)}else this.humans=this.humans.filter(t=>t.owner!==e),this.rebuild()}clientData(e){if(e.t==="roster")this.seats=e.seats,this.total=e.total,this.cfg=e.cfg,this.onRoster();else if(e.t==="start")this.beginMatch(e.level,e.trackIdx,e.seats);else if(e.t==="flick")this.pendingFlick=e;else if(e.t==="sync")this.pendingSync=e.s;else if(e.t==="champres"){const t=this.mySeatIndex(),i=new Map(e.pts),s=this.seats.map((a,o)=>({seat:o,name:a.name,skin:a.skin,pts:i.get(o)||0,you:o===t})).sort((a,o)=>o.pts-a.pts);this.onChampStanding(s,e.race,e.total,e.last)}else if(e.t==="champend"){const t=this.seats[e.seat];this.active=!1,this.onChampEnd({name:t?.name||"",skin:t?.skin||"coca",you:e.seat===this.mySeatIndex()})}else e.t==="tolobby"?(this.active=!1,this.onToLobby()):e.t==="full"?(this.onError("A sala está cheia"),this.onClosed()):e.t==="bye"&&(this.onError("O anfitrião encerrou a sala"),this.onClosed())}startMatch(){if(!this.isHost)return;this.rebuild();let e=this.cfg.level,t=this.cfg.trackIdx;if(this.cfg.pick==="randlevel"?t=Math.floor(Math.random()*10):this.cfg.pick==="randany"&&(e=Math.floor(Math.random()*5),t=Math.floor(Math.random()*10)),this.cfg.roomMode==="champ"){const s=Math.max(2,Math.min(9,this.cfg.champRaces)),a=[0,1,2,3,4,5,6,7,8,9];for(let r=a.length-1;r>0;r--){const c=Math.floor(Math.random()*(r+1));[a[r],a[c]]=[a[c],a[r]]}const o=a.slice(0,s).map(r=>({level:e,idx:r}));this.champ={race:0,total:s,pts:new Map,seq:o},e=o[0].level,t=o[0].idx}else this.champ=null;const i=this.seats.map(s=>({...s}));this.net.broadcast({t:"start",level:e,trackIdx:t,seats:i}),this.beginMatch(e,t,i)}beginMatch(e,t,i){this.seats=i,this.active=!0,this.lastTok="",this.decided=!1,this.aiWait=0,this.applied.clear(),this.pendingFlick=null,this.pendingSync=null;const s=i.map(a=>({name:a.name,isAI:a.kind==="ai",ai:a.ai,skin:a.skin,team:a.team}));this.onStartMatch(s,e,t)}isChamp(){return!!this.champ}champRows(){const e=this.mySeatIndex();return this.seats.map((t,i)=>({seat:i,name:t.name,skin:t.skin,pts:this.champ.pts.get(i)||0,you:i===e})).sort((t,i)=>i.pts-t.pts)}hostFinishRace(e){if(!this.isHost||!this.champ)return;const t=[12,9,7,5,3,1];e.standings().forEach((a,o)=>this.champ.pts.set(a.id,(this.champ.pts.get(a.id)||0)+(t[o]||0)));const i=this.champ.race+1>=this.champ.total,s=this.champRows();this.net.broadcast({t:"champres",pts:[...this.champ.pts.entries()],race:this.champ.race+1,total:this.champ.total,last:i}),this.onChampStanding(s,this.champ.race+1,this.champ.total,i)}hostNextChamp(){if(!this.isHost||!this.champ)return;if(this.champ.race++,this.champ.race>=this.champ.total){const s=this.champRows()[0];this.net.broadcast({t:"champend",seat:s.seat}),this.onChampEnd({name:s.name,skin:s.skin,you:s.you}),this.champ=null,this.active=!1;return}const{level:e,idx:t}=this.champ.seq[this.champ.race],i=this.seats.map(s=>({...s}));this.net.broadcast({t:"start",level:e,trackIdx:t,seats:i}),this.beginMatch(e,t,i)}bind(e){this.mgr=e}backToLobby(){this.isHost&&(this.active=!1,this.net.broadcast({t:"tolobby"}),this.humans=this.humans.filter(e=>!e.off),this.rebuild(),this.onToLobby())}mySeatIndex(){return this.seats.findIndex(e=>e.kind==="human"&&e.owner===this.myId)}controlsActiveSeat(){const e=this.mgr;if(!e)return!1;const t=this.seats[e.current];return!!t&&t.kind==="human"&&!t.off&&t.owner===this.myId}tok(e){return String(e.flickCount)}emitFlick(e,t,i,s){this.applied.add(s),this.decided=!0;const a={t:"flick",tok:s,dir:t,power:i};this.isHost?this.net.broadcast(a):this.net.send("host",a),e.flick(t,i)}localFlick(e,t){const i=this.mgr;!i||i.phase!=="aim"||!this.controlsActiveSeat()||this.emitFlick(i,e,t,this.tok(i))}localUseItem(){}tick(e){const t=this.mgr;if(!t||!this.active||t.phase!=="aim")return;this.pendingSync&&(t.applySnapshot(this.pendingSync),this.pendingSync=null);const i=this.tok(t);if(i!==this.lastTok&&(this.lastTok=i,this.decided=!1,this.aiWait=0,this.isHost&&this.net.broadcast({t:"sync",s:t.snapshot()})),this.pendingFlick&&this.pendingFlick.tok===i&&!this.applied.has(i)){const o=this.pendingFlick;this.pendingFlick=null,this.applied.add(i),this.decided=!0,t.flick(o.dir,o.power);return}if(this.decided)return;const s=this.seats[t.current];if(this.isHost&&s&&(s.kind==="ai"||s.off)&&(this.aiWait+=e,this.aiWait>.7)){const o=t.caps[t.current],r=dd(o,t.caps,t.track);this.emitFlick(t,r.dir,r.power,i)}}aiLabel(e){return e?hd[e]:"IA"}}const Ed=document.getElementById("scene"),Qr=bv(Ed);let Gt,Tt=new _l(34,54),_t=null;const el=new Vv,Et=new qv,js=new $v,Re=new Qv,dt=new Bb;let mn="quick",rt=null,bt=null,Mn=null,Ot=null,Ks=0,bn=!1,_i=!1,ea=null;window.addEventListener("pointerdown",()=>{Tl(),bn||ei("menu")});function Zn(n){rt=n,mn=n.mode,Ks=0;let e=n.customTrack?n.customTrack:fd(n.level,n.trackIdx);n.mode==="caos"&&(e=ab(e)),Gt=Zh(e.bg),Qh(Gt,e.w,e.h),_t=El(e),Gt.add(_t.group),Gt.add(el.group,Et.points,js.group),Tt=new _l(e.w,e.h),Tt.setFrustum(21,innerWidth,innerHeight),Cl(),Re.setup(e,n.players),Re.chaos=n.mode==="caos",Re.manualControl=n.mode==="online",dt.bind(Re),el.build(Re.caps),wd.setCamera(Tt.camera,Tt),Ge.showGame(),bn=!0,ei(wb(e.theme)),Ge.updateHUD(Re,Al())}function Al(){return Re.phase==="aim"&&(dt.active?dt.controlsActiveSeat():!Re.activeCap().isAI)}Re.onToast=(n,e)=>Ge.toast(n,e);Re.onChange=()=>Ge.updateHUD(Re,Al());Re.onFlick=(n,e)=>{wt.flick(e),td[Re.track.surfaceAt(n.pos)],Et.dust(n.pos.x,n.pos.y,8),js.hide()};Re.onItem=(n,e,t)=>{wt.bonus(),Et.impact(n.pos.x,n.pos.y,10,t?"#ff9de0":"#b98cff")};Re.onEvent=n=>{switch(n.type){case"wall":wt.wall(n.power),Et.impact(n.x,n.y,n.power*.4,"#ffe6b0");break;case"stone":wt.wall(n.power),Et.impact(n.x,n.y,n.power*.5,"#e8e0d0");break;case"capHit":wt.clack(n.power),Et.impact(n.x,n.y,n.power*.6,"#fff");break;case"hole":wt.hole(),Et.dust(n.x,n.y,14,"#3a2c1a");break;case"bomb":wt.bad(),Et.impact(n.x,n.y,10,"#ff8a5a");break;case"bonus":wt.bonus(),Et.impact(n.x,n.y,10,"#8affc0");break;case"out":wt.bad(),Et.dust(n.x,n.y,10,"#cbb58a");break;case"ramp":wt.bonus(),Et.impact(n.x,n.y,8,"#9dffb8");break;case"land":wt.wall(4),Et.dust(n.x,n.y,14,"#d8c090");break;case"top":wt.clack(Math.min(1,n.power*.12)),Et.impact(n.x,n.y,n.power*.5,"#ff7ab0");break;case"bug":wt.squeak(),Et.dust(n.x,n.y,6,"#d8362e");break;case"band":wt.elastic(Math.min(1,n.power*.1)),Et.impact(n.x,n.y,n.power*.6,"#ff8a8a");break;case"mill":wt.wall(n.power),Et.impact(n.x,n.y,n.power*.4,"#8fd0ff");break;case"balloon":{if(wt.pop(),Et.impact(n.x,n.y,14,"#7ac8f2"),Et.dust(n.x,n.y,18,"#4a90b8"),Gt){const e=new Q(new Sn(1.7,26),new Ve({color:"#3f8ec8",roughness:.15,transparent:!0,opacity:.72}));e.rotation.x=-Math.PI/2,e.position.set(n.x,.02,n.y),Gt.add(e)}break}case"finish":Et.confetti(n.x,n.y);break}};const Ge=new Kr({start:n=>{if(dt.active&&dt.leave(),Tl(),n.mode==="champ"){const e=n.champFmt||"copa",t=s=>{for(let a=s.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[s[a],s[o]]=[s[o],s[a]]}return s};let i;if(e==="gp")i=[0,1,2,3,4].map(s=>({level:s,idx:Math.floor(Math.random()*Wt)}));else{const s=e==="sprint"?3:e==="maratona"?7:5;i=t([0,1,2,3,4,5,6,7,8,9]).slice(0,s).map(a=>({level:n.level,idx:a}))}bt={seq:i,race:0,pts:new Map,fmt:e,hist:[]},n.level=i[0].level,n.trackIdx=i[0].idx}else bt=null;n.mode==="elim"?(Mn={players:n.players.slice(),level:n.level,race:0,out:[]},n.trackIdx=Math.floor(Math.random()*Wt)):Mn=null,n.mode==="camp"&&n.campComp?Ot={compId:n.campComp,race:0,pts:new Map,hist:[]}:Ot=null,Zn(n)},setVols:(n,e,t)=>{xd(n),_d(e),Md(t),Ie.setVols(n,e,t)},setSkin:n=>{Ie.setSkin(n),wt.ui()},preview:n=>zb(n)},dt);dt.onStartMatch=(n,e,t)=>{rt=null,bt=null,Vi=!1,Zn({level:e,trackIdx:t,pick:"specific",players:n,mode:"online"})};dt.onToLobby=()=>{bn=!1,Tn=!1,Vi=!1,Mi(),ei("menu"),Ge.showLobby()};dt.onClosed=()=>{const n=bn;bn=!1,Tn=!1,Vi=!1,n&&Mi(),ei("menu"),Ge.showOnlineHome()};dt.onChampStanding=(n,e,t,i)=>Ge.showOnlineChampStanding(n,e,t,i,dt.isHost);dt.onChampEnd=n=>{Vi=!0,n.you&&Ie.addWin(),wt.win(),Ge.showChampion({rows:[],fmt:"champ",youWon:n.you,name:n.name,skin:n.skin})};Ge.onUseItem=()=>{dt.active?dt.localUseItem():Re.useItem()};Ge.onCampBack=()=>{bn=!1,Tn=!1,Ot=null,Mi(),ei("menu"),Ge.showCampaign()};Ge.onCampRetry=n=>{bn=!1,Tn=!1,Ot=null,Mi(),Ge.launchCamp(wl(n))};Ge.onCampFinale=()=>{bn=!1,Tn=!1,Ot=null,Mi(),ei("menu"),Ge.showCampFinale()};Ge.onPause=()=>{Re.phase!=="over"&&(Tn=!0,Ge.showPause())};Ge.onResume=()=>{Tn=!1,Ge.hideModal()};Ge.onRestart=()=>{Tn=!1,Ge.hideModal(),rt&&Zn(rt)};Ge.onMenu=()=>{bn=!1,Tn=!1,Mi(),ei("menu"),Ge.showMenu()};Ge.onNext=()=>{if(Ge.hideModal(),Ot&&rt){Ot.race++,rt.trackIdx=Math.floor(Math.random()*Wt),Zn(rt);return}if(bt){if(bt.race++,bt.race>=bt.seq.length){Vb();return}rt.level=bt.seq[bt.race].level,rt.trackIdx=bt.seq[bt.race].idx,Zn(rt);return}if(Mn&&rt){const n=Re.standings(),e=n[n.length-1];if(Mn.players=Mn.players.filter(t=>!(t.name===e.name&&t.skin===e.skin)),Mn.players.length<=1){const t=Mn.players[0],i=t&&!t.isAI;i&&Ie.addWin(),Ge.showChampion({rows:[],fmt:"elim",youWon:!!i,name:t?t.name:"",skin:t?t.skin:"coca"}),Mn=null;return}Mn.race++,rt.players=Mn.players,rt.trackIdx=Math.floor(Math.random()*Wt),Zn(rt);return}rt&&(rt.pick==="randany"?(rt.level=Math.floor(Math.random()*5),rt.trackIdx=Math.floor(Math.random()*Wt)):rt.pick==="randlevel"?rt.trackIdx=Math.floor(Math.random()*Wt):rt.trackIdx=(rt.trackIdx+1)%Wt,Zn(rt))};xd(Ie.get().music);_d(Ie.get().sfx);Md(Ie.get().muted);jt.music=Ie.get().music;jt.sfx=Ie.get().sfx;jt.muted=Ie.get().muted;let Tn=!1;const wd=new rb(Ed,Tt.camera,Tt,{canAim:()=>bn&&!Tn&&Al(),capPos:()=>{const n=Re.activeCap();return n?{x:n.pos.x,y:n.pos.y}:null},onAim:(n,e,t)=>{const i=Re.activeCap();js.set(i.pos.x,i.pos.y,n,e,t)},onRelease:(n,e,t)=>{js.hide(),(mn==="daily"||mn==="trial")&&Ks++,dt.active?dt.localFlick({x:n,y:e},t):Re.flick({x:n,y:e},t)},onCancel:()=>js.hide(),editMode:()=>_i?Ge.previewEditMode():"off",onEditDown:(n,e)=>{Ge.preview3D("down",n,e)&&tl()},onEditMove:(n,e)=>{Ge.preview3D("move",n,e)&&Gb()},onEditUp:()=>{Ge.preview3D("up",0,0)&&tl()}});function Mi(){Gt&&Gt.clear(),_t=null,_i=!1}function zb(n){bn=!1,Tn=!1,ea=n,Gt=Zh(n.bg),Qh(Gt,n.w,n.h),_t=El(n),Gt.add(_t.group),Tt=new _l(n.w,n.h),Tt.frustum=Math.min(60,Math.max(n.w,n.h)*.42),Tt.resize(innerWidth,innerHeight),Tt.place(),wd.setCamera(Tt.camera,Tt),_i=!0,Ge.showPreviewBar()}let fh=0;function tl(){!_i||!Gt||(ea=Ge.rebuildPreviewDef(),_t&&(Gt.remove(_t.group),_t.group.traverse(n=>{n.geometry?.dispose?.(),n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(e=>e.dispose?.())})),_t=El(ea),Gt.add(_t.group))}function Gb(){const n=performance.now();n-fh<70||(fh=n,tl())}Ge.onPreviewBack=()=>{_i=!1,Mi(),ei("menu"),Ge.showEditor()};Ge.onPreviewPlay=()=>{_i=!1,Mi(),ea&&Zn({level:2,trackIdx:0,pick:"specific",players:Td(),mode:"quick",customTrack:ea})};function Td(){const n=Jr(Ie.skin(),3),e=["Bolha","Zé","Nina","Tato"];return[{name:"Você",isAI:!1,skin:Ie.skin()},...n.map((t,i)=>({name:e[i%e.length],isAI:!0,ai:Vt[i%Vt.length],skin:t}))]}let Vi=!1;function Hb(){if(Vi)return;if(Vi=!0,wt.win(),mn==="camp"&&Ot){const t=wl(Ot.compId),i=[12,9,7,5,3,1];Re.standings().forEach((l,h)=>Ot.pts.set(l.id,(Ot.pts.get(l.id)||0)+(i[h]||0)));const s=_n();s.races++,Ys(s),Ot.hist.push(Re.standings().findIndex(l=>!l.isAI)+1);const a=[...Ot.pts.entries()].sort((l,h)=>h[1]-l[1]).map(([l,h])=>({name:Re.caps[l].name,skin:Re.caps[l].skin,pts:h,you:!Re.caps[l].isAI}));if(!(Ot.race+1>=t.races)){Ge.showResults(Re,mn,{race:Ot.race+1,total:t.races,last:!1,rows:a,fmt:"copa",hist:Ot.hist.slice()});return}const r=a.findIndex(l=>l.you)+1,c=cb(_n(),Ot.compId,r);Ge.showCampResult({comp:t,place:r,ptsGained:c.pts,winsGained:c.wins,improved:c.improved,finished:c.finished,rows:a,hist:Ot.hist.slice(),prize:c.prize});return}if(mn==="trial"){const t=Re.caps[0].finished,i=t&&rt?Ie.setTrialBest(rt.level,rt.trackIdx,Ks):!1;Ge.showTrialResult({finished:t,flicks:Ks,best:rt?Ie.trialBest(rt.level,rt.trackIdx):void 0,record:i});return}if(mn==="dupla"){const i=[...new Set(Re.caps.map(a=>a.team))].sort().map(a=>{const o=Re.caps.filter(c=>c.team===a).map(c=>({name:c.name,skin:c.skin,place:c.place,you:!c.isAI})),r=o.reduce((c,l)=>c+l.place,0);return{tid:a,score:r,members:o,hasYou:o.some(c=>c.you)}}).sort((a,o)=>a.score-o.score),s=i[0].hasYou;s&&Ie.addWin(),Ge.showTeamResult({teams:i.map((a,o)=>({label:"Time "+(a.tid===0?"A":"B"),score:a.score,members:a.members,win:o===0,you:a.hasYou})),won:s});return}if(mn==="elim"&&Mn){const t=Re.standings(),i=t[t.length-1];Mn.out.push({name:i.name,skin:i.skin});const s=t.slice(0,-1).map(r=>({name:r.name,skin:r.skin,you:!r.isAI})),a=!i.isAI,o=s.length<=1;Ge.showElimResult({loser:{name:i.name,skin:i.skin},survivors:s,youOut:a,last:o,championName:o?s[0]?.name:""});return}if(dt.active&&dt.isChamp()){dt.isHost&&dt.hostFinishRace(Re);return}if(dt.active&&Re.teams>0){const i=[...new Set(Re.caps.map(a=>a.team))].sort().map(a=>{const o=Re.caps.filter(r=>r.team===a).map(r=>({name:r.name,skin:r.skin,place:r.place,you:r.id===dt.mySeatIndex()}));return{tid:a,score:o.reduce((r,c)=>r+c.place,0),members:o,hasYou:o.some(r=>r.you)}}).sort((a,o)=>a.score-o.score),s=i[0].hasYou;s&&Ie.addWin(),Ge.showResults(Re,mn,void 0,{teams:i.map((a,o)=>({label:"Time "+(a.tid===0?"A":"B"),score:a.score,members:a.members,win:o===0,you:a.hasYou})),won:s});return}const n=dt.active?Re.caps[dt.mySeatIndex()]:Re.caps.find(t=>!t.isAI);n&&n.place===1&&mn!=="daily"&&Ie.addWin(),mn==="daily"&&Re.caps[0].finished&&Ie.setDailyBest(qb(),Ks);let e;if(bt){const t=[12,9,7,5,3,1];Re.standings().forEach((s,a)=>bt.pts.set(s.id,(bt.pts.get(s.id)||0)+(t[a]||0))),bt.hist.push(Re.standings().findIndex(s=>!s.isAI)+1);const i=[...bt.pts.entries()].sort((s,a)=>a[1]-s[1]).map(([s,a])=>({name:Re.caps[s].name,skin:Re.caps[s].skin,pts:a,you:!Re.caps[s].isAI}));e={race:bt.race+1,total:bt.seq.length,last:bt.race+1>=bt.seq.length,rows:i,fmt:bt.fmt,hist:bt.hist.slice()}}Ge.showResults(Re,mn,e)}function Vb(){const n=[...bt.pts.entries()].sort((a,o)=>o[1]-a[1]),e=n.map(([a,o])=>({name:Re.caps[a].name,skin:Re.caps[a].skin,pts:o,you:!Re.caps[a].isAI})),t=Re.caps[n[0][0]],i=!!t&&!t.isAI;i&&Ie.addWin(),wt.win();const s=bt.fmt;bt=null,Ge.showChampion({rows:e,fmt:s,youWon:i,name:t?t.name:"",skin:t?t.skin:"coca"})}function Cl(){const n=innerWidth,e=innerHeight;Qr.setSize(n,e),Tt.resize(n,e)}addEventListener("resize",Cl);addEventListener("pointerdown",()=>Tl(),{once:!0});Ge.showMenu();Cl();try{const e=(location.hash||"").match(/[#&]p=([^&]+)/);e&&(Ge.importSharedTrack(e[1]),history.replaceState(null,"",location.pathname+location.search))}catch{}window.__go=(n,e)=>Zn({level:n,trackIdx:e,pick:"specific",players:Td(),mode:"quick"});window.__mgr=Re;window.__ui=Ge;window.__diag={get inGame(){return bn},get mode(){return mn},get previewing(){return _i},get az(){return Tt.az},get frustum(){return Tt.frustum},get music(){return Pb()},get actx(){return lo()},get mbus(){return bd()},playMusic:ei};const Wb=new gv;let Hs=0;function nl(){const n=Math.min(.05,Wb.getDelta());if(Hs+=n,_i&&Gt){if(_t)for(const e of _t.spinners)e.rotation.y+=n*2.4;if(_t)for(const e of _t.billboards)e.quaternion.copy(Tt.camera.quaternion);Qr.render(Gt,Tt.camera),requestAnimationFrame(nl);return}if(bn&&Gt){Tn||(dt.active&&dt.tick(n),Re.update(n),Re.phase==="over"?Hb():Vi=!1);let e=Re.activeCap();if(Re.phase==="resolve"){const i=Re.activeCap();if(i&&i.moving&&!i.finished)e=i;else{let s=-1,a=i;for(const o of Re.caps){if(o.finished||!o.moving)continue;const r=en(o.vel);r>s&&(s=r,a=o)}e=a}}e&&!e.finished&&Tt.follow(e.pos.x,e.pos.y),Tt.update(n);let t=0;for(const i of Re.caps)if(i.moving){const s=en(i.vel);if(s>t&&(t=s),s>3&&Math.random()<.5){const a=Re.track.surfaceAt(i.pos);(a==="sand"||a==="dirt"||a==="mud"||a==="grass"||a==="frost"||a==="carpet")&&Et.dust(i.pos.x,i.pos.y,1,a==="mud"?"#5c452a":a==="grass"?"#5f8a36":a==="frost"?"#eef8fd":a==="carpet"?"#b06a58":"#d8c090")}}if(wt.slide(t),_t)for(const i of _t.pulses){const s=1+Math.sin(Hs*4)*.18;i.mesh.scale.set(s,s,1),i.mesh.material.opacity=.22+Math.sin(Hs*4)*.12}if(_t)for(const i of _t.dynamics)i.update(n);if(_t)for(const i of _t.spinners)i.rotation.y+=n*2.4,i.position.y+=Math.sin(Hs*3+i.position.x)*.004;if(_t)for(const i of _t.billboards)i.quaternion.copy(Tt.camera.quaternion);el.update(Re.caps,Hs,Re.activeCap()?.id??-1),Et.update(n),Qr.render(Gt,Tt.camera)}requestAnimationFrame(nl)}nl();function qb(){const n=new Date;return`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`}
