var GeographicLib={Constants:{},Math:{},Accumulator:{}};(function(a){a.WGS84={a:6378137,f:1/298.257223563};a.version={major:1,minor:45,patch:0};a.version_string="1.45"})(GeographicLib.Constants);
(function(a){a.digits=53;a.epsilon=Math.pow(.5,a.digits-1);a.degree=Math.PI/180;a.sq=function(a){return a*a};a.hypot=function(a,b){var c,e;a=Math.abs(a);b=Math.abs(b);c=Math.max(a,b);e=Math.min(a,b)/(c?c:1);return c*Math.sqrt(1+e*e)};a.cbrt=function(a){var b=Math.pow(Math.abs(a),1/3);return 0>a?-b:b};a.log1p=function(a){var b=1+a,c=b-1;return 0===c?a:a*Math.log(b)/c};a.atanh=function(l){var b=Math.abs(l),b=a.log1p(2*b/(1-b))/2;return 0>l?-b:b};a.sum=function(a,b){var c=a+b,e=c-b,k=c-e;return{s:c,
t:-(e-a+(k-b))}};a.polyval=function(a,b,c,e){for(var k=0>a?0:b[c++];0<=--a;)k=k*e+b[c++];return k};a.AngRound=function(a){var b=Math.abs(a),b=.0625>b?.0625-(.0625-b):b;return 0>a?0-b:b};a.AngNormalize=function(a){a%=360;return-180>a?a+360:180>a?a:a-360};a.LatFix=function(a){return 90<Math.abs(a)?Number.NaN:a};a.AngDiff=function(l,b){var c=a.sum(a.AngNormalize(l),a.AngNormalize(-b)),e=-a.AngNormalize(c.s),c=c.t;return(180==e&&0>c?-180:e)-c};a.sincosd=function(a){var b,c;b=a%360;c=Math.floor(b/90+.5);
b=(b-90*c)*this.degree;a=Math.sin(b);b=Math.cos(b);switch(c&3){case 0:c=a;a=b;break;case 1:c=b;a=0-a;break;case 2:c=0-a;a=0-b;break;default:c=0-b}return{s:c,c:a}};a.atan2d=function(a,b){var c=0,e;Math.abs(a)>Math.abs(b)&&(c=b,b=a,a=c,c=2);0>b&&(b=-b,++c);e=Math.atan2(a,b)/this.degree;switch(c){case 1:e=(0<a?180:-180)-e;break;case 2:e=90-e;break;case 3:e=-90+e}return e}})(GeographicLib.Math);
(function(a,l){a.Accumulator=function(a){this.Set(a)};a.Accumulator.prototype.Set=function(b){b||(b=0);b.constructor===a.Accumulator?(this._s=b._s,this._t=b._t):(this._s=b,this._t=0)};a.Accumulator.prototype.Add=function(a){a=l.sum(a,this._t);var c=l.sum(a.s,this._s);a=a.t;this._s=c.s;this._t=c.t;0===this._s?this._s=a:this._t+=a};a.Accumulator.prototype.Sum=function(b){var c;return b?(c=new a.Accumulator(this),c.Add(b),c._s):this._s};a.Accumulator.prototype.Negate=function(){this._s*=-1;this._t*=
-1}})(GeographicLib.Accumulator,GeographicLib.Math);GeographicLib.DMS={};
(function(a){var l,b,c,e,k=["degrees","minutes","seconds"];l=function(a,c){return a.indexOf(c.toUpperCase())};b=function(a,c){return"0000".substr(0,Math.max(0,Math.min(4,c-a.length)))+a};a.NONE=0;a.LATITUDE=1;a.LONGITUDE=2;a.AZIMUTH=3;a.DEGREE=0;a.MINUTE=1;a.SECOND=2;a.Decode=function(f){var b,F=0,e=0,d,h,n,g=a.NONE,k;f=f.replace(/\u00b0/g,"d").replace(/\u00ba/g,"d").replace(/\u2070/g,"d").replace(/\u02da/g,"d").replace(/\u2032/g,"'").replace(/\u00b4/g,"'").replace(/\u2019/g,"'").replace(/\u2033/g,
'"').replace(/\u201d/g,'"').replace(/\u2212/g,"-").replace(/''/g,'"').trim();b=f.length;for(n=0;n<b;n=d,++e)if(k=n,0===e&&0<=l("SNWE",f.charAt(k))&&++k,(0<e||k<b&&0<=l("-+",f.charAt(k)))&&++k,d=f.substr(k,b-k).indexOf("-"),h=f.substr(k,b-k).indexOf("+"),d=0>d?b:d+k,h=0>h?b:h+k,d=Math.min(d,h),n=c(f.substr(n,d-n)),F+=n.val,n=n.ind,g==a.NONE)g=n;else if(n!=a.NONE&&g!=n)throw Error("Incompatible hemisphere specifies in "+f.substr(0,d));if(0===e)throw Error("Empty or incomplete DMS string "+f);return{val:F,
ind:g}};c=function(f){var c={},b="",q,d,h,n,g,u,t,A,y,C,G,H,K,M,R,T;do{q=1;d=0;h=f.length;n=a.NONE;g=-1;h>d&&0<=(g=l("SNWE",f.charAt(d)))&&(n=g&2?a.LONGITUDE:a.LATITUDE,q=g&1?1:-1,++d);if(h>d&&0<=(g=l("SNWE",f.charAt(h-1)))&&0<=g){if(n!==a.NONE){b=f.charAt(d-1).toUpperCase()===f.charAt(h-1).toUpperCase()?"Repeated hemisphere indicators "+f.charAt(d-1)+" in "+f.substr(d-1,h-d+1):"Contradictory hemisphere indicators "+f.charAt(d-1)+" and "+f.charAt(h-1)+" in "+f.substr(d-1,h-d+1);break}n=g&2?a.LONGITUDE:
a.LATITUDE;q=g&1?1:-1;--h}h>d&&0<=(g=l("-+",f.charAt(d)))&&0<=g&&(q*=g?1:-1,++d);if(h===d)b="Empty or incomplete DMS string "+f;else{u=[0,0,0];t=[0,0,0];G=C=y=A=0;H=d;K=!1;for(R=M=0;H<h;)if(T=f.charAt(H++),0<=(g=l("0123456789",T)))++G,0<M?++M:(y=10*y+g,++R);else if("."===T){if(K){b="Multiple decimal points in "+f.substr(d,h-d);break}K=!0;M=1}else if(0<=(g=l("D'\":",T))){if(3<=g){if(H===h){b="Illegal for colon to appear at the end of "+f.substr(d,h-d);break}g=A}if(g===A-1){b="Repeated "+k[g]+" component in "+
f.substr(d,h-d);break}else if(g<A){b=k[g]+" component follows "+k[A-1]+" component in "+f.substr(d,h-d);break}if(0===G){b="Missing numbers in "+k[g]+" component of "+f.substr(d,h-d);break}0<M&&(C=parseFloat(f.substr(H-R-M-1,R+M)),y=0);u[g]=y;t[g]=y+C;H<h&&(A=g+1,G=M=R=y=C=0)}else{b=0<=l("-+",T)?"Internal sign in DMS string "+f.substr(d,h-d):"Illegal character "+T+" in DMS string "+f.substr(d,h-d);break}if(!b.length){if(0>l("D'\":",f.charAt(H-1))){if(3<=A){b="Extra text following seconds in DMS string "+
f.substr(d,h-d);break}if(0===G){b="Missing numbers in trailing component of "+f.substr(d,h-d);break}0<M&&(C=parseFloat(f.substr(H-R-M,R+M)),y=0);u[A]=y;t[A]=y+C}if(K&&0===M)b="Decimal point in non-terminal component of "+f.substr(d,h-d);else if(60<=u[1]||60<t[1])b="Minutes "+t[1]+" not in range [0,60)";else if(60<=u[2]||60<t[2])b="Seconds "+t[2]+" not in range [0,60)";else return c.ind=n,c.val=q*(t[2]?(60*(60*t[0]+t[1])+t[2])/3600:t[1]?(60*t[0]+t[1])/60:t[0]),c}}}while(0);c.val=e(f);if(0===c.val)throw Error(b);
c.ind=a.NONE;return c};e=function(a){var c,b,e;if(3>a.length)return 0;a=a.toUpperCase().replace(/0+$/,"");c="-"===a.charAt(0)?-1:1;b="-"===a.charAt(0)||"+"===a.charAt(0)?1:0;e=a.length-1;if(e+1<b+3)return 0;a=a.substr(b,e+1-b);return"NAN"===a||"1.#QNAN"===a||"1.#SNAN"===a||"1.#IND"===a||"1.#R"===a?Number.NaN:"INF"===a||"1.#INF"===a?c*Number.POSITIVE_INFINITY:0};a.DecodeLatLon=function(c,b,e){var k={},d=a.Decode(c),h=a.Decode(b),n=d.val,d=d.ind,g=h.val,h=h.ind;e||(e=!1);d===a.NONE&&h===a.NONE?(d=e?
a.LONGITUDE:a.LATITUDE,h=e?a.LATITUDE:a.LONGITUDE):d===a.NONE?d=a.LATITUDE+a.LONGITUDE-h:h===a.NONE&&(h=a.LATITUDE+a.LONGITUDE-d);if(d===h)throw Error("Both "+c+" and "+b+" interpreted as "+(d===a.LATITUDE?"latitudes":"longitudes"));c=d===a.LATITUDE?n:g;n=d===a.LATITUDE?g:n;if(90<Math.abs(c))throw Error("Latitude "+c+" not in [-90,90]");k.lat=c;k.lon=n;return k};a.DecodeAngle=function(c){var b=a.Decode(c),e=b.val;if(b.ind!==a.NONE)throw Error("Arc angle "+c+" includes a hemisphere N/E/W/S");return e};
a.DecodeAzimuth=function(c){var b=a.Decode(c),e=b.val;if(b.ind===a.LATITUDE)throw Error("Azimuth "+c+" has a latitude hemisphere N/S");return e};a.Encode=function(c,e,k,q){var d=1,h,n,g,u;q||(q=a.NONE);if(!isFinite(c))return 0>c?"-inf":0<c?"inf":"nan";k=Math.min(15-2*e,k);for(h=0;h<e;++h)d*=60;for(h=0;h<k;++h)d*=10;q===a.AZIMUTH&&(c-=360*Math.floor(c/360));n=0>c?-1:1;c*=n;g=Math.floor(c);h=Math.floor((c-g)*d+.5)/d;1<=h&&(g+=1,--h);c=[h,0,0];for(h=1;h<=e;++h)d=Math.floor(c[h-1]),u=c[h-1]-d,c[h]=60*
u,c[h-1]=d;c[0]+=g;g="";q===a.NONE&&0>n&&(g+="-");switch(e){case a.DEGREE:g+=b(c[0].toFixed(k),q===a.NONE?0:1+Math.min(q,2)+k+(k?1:0))+"\u00b0";break;default:switch(g+=b(c[0].toFixed(0),q===a.NONE?0:1+Math.min(q,2))+"\u00b0",e){case a.MINUTE:g+=b(c[1].toFixed(k),2+k+(k?1:0))+"'";break;case a.SECOND:g+=b(c[1].toFixed(0),2)+"'",g+=b(c[2].toFixed(k),2+k+(k?1:0))+'"'}}q!==a.NONE&&q!==a.AZIMUTH&&(g+="SNWE".charAt((q===a.LATITUDE?0:2)+(0>n?0:1)));return g}})(GeographicLib.DMS);GeographicLib.Geodesic={};
GeographicLib.GeodesicLine={};GeographicLib.PolygonArea={};
(function(a,l,b,c,e){var k,f,w=20+c.digits+10,F=c.epsilon,q=200*F,d=Math.sqrt(F),h=F*q,n=1E3*d,g,u,t,A,y,C,G,H,K;a.tiny_=Math.sqrt(Number.MIN_VALUE);a.nC1_=6;a.nC1p_=6;a.nC2_=6;a.nC3_=6;a.nC4_=6;k=a.nC3_*(a.nC3_-1)/2;f=a.nC4_*(a.nC4_+1)/2;a.CAP_C1=1;a.CAP_C1p=2;a.CAP_C2=4;a.CAP_C3=8;a.CAP_C4=16;a.NONE=0;a.LATITUDE=128;a.LONGITUDE=256|a.CAP_C3;a.AZIMUTH=512;a.DISTANCE=1024|a.CAP_C1;a.STANDARD=a.LATITUDE|a.LONGITUDE|a.AZIMUTH|a.DISTANCE;a.DISTANCE_IN=2048|a.CAP_C1|a.CAP_C1p;a.REDUCEDLENGTH=4096|a.CAP_C1|
a.CAP_C2;a.GEODESICSCALE=8192|a.CAP_C1|a.CAP_C2;a.AREA=16384|a.CAP_C4;a.ALL=32671;a.LONG_UNROLL=32768;a.OUT_MASK=32640|a.LONG_UNROLL;a.SinCosSeries=function(a,c,b,d){for(var v=d.length,f=v-(a?1:0),e=2*(b-c)*(b+c),m=f&1?d[--v]:0,g=0,f=Math.floor(f/2);f--;)g=e*m-g+d[--v],m=e*g-m+d[--v];return a?2*c*b*m:b*(m-g)};g=function(a,b){var d,f=c.sq(a);d=c.sq(b);var v=(f+d-1)/6,e,g,m,h;0===d&&0>=v?d=0:(e=f*d/4,g=c.sq(v),m=v*g,h=e*(e+2*m),f=v,0<=h?(v=e+m,v+=0>v?-Math.sqrt(h):Math.sqrt(h),v=c.cbrt(v),f+=v+(0!==
v?g/v:0)):(g=Math.atan2(Math.sqrt(-h),-(e+m)),f+=2*v*Math.cos(g/3)),v=Math.sqrt(c.sq(f)+d),f=0>f?d/(v-f):f+v,d=(f-d)/(2*v),d=f/(Math.sqrt(f+c.sq(d))+d));return d};u=[1,4,64,0,256];a.A1m1f=function(a){var b=Math.floor(3);return(c.polyval(b,u,0,c.sq(a))/u[b+1]+a)/(1-a)};t=[-1,6,-16,32,-9,64,-128,2048,9,-16,768,3,-5,512,-7,1280,-7,2048];a.C1f=function(b,d){var f=c.sq(b),e=b,v=0,g,h;for(g=1;g<=a.nC1_;++g)h=Math.floor((a.nC1_-g)/2),d[g]=e*c.polyval(h,t,v,f)/t[v+h+1],v+=h+2,e*=b};A=[205,-432,768,1536,4005,
-4736,3840,12288,-225,116,384,-7173,2695,7680,3467,7680,38081,61440];a.C1pf=function(b,d){var f=c.sq(b),e=b,v=0,g,h;for(g=1;g<=a.nC1p_;++g)h=Math.floor((a.nC1p_-g)/2),d[g]=e*c.polyval(h,A,v,f)/A[v+h+1],v+=h+2,e*=b};y=[-11,-28,-192,0,256];a.A2m1f=function(a){var b=Math.floor(3);return(c.polyval(b,y,0,c.sq(a))/y[b+1]-a)/(1+a)};C=[1,2,16,32,35,64,384,2048,15,80,768,7,35,512,63,1280,77,2048];a.C2f=function(b,d){var f=c.sq(b),g=b,v=0,e,h;for(e=1;e<=a.nC2_;++e)h=Math.floor((a.nC2_-e)/2),d[e]=g*c.polyval(h,
C,v,f)/C[v+h+1],v+=h+2,g*=b};a.Geodesic=function(a,b){this.a=a;this.f=b;this._f1=1-this.f;this._e2=this.f*(2-this.f);this._ep2=this._e2/c.sq(this._f1);this._n=this.f/(2-this.f);this._b=this.a*this._f1;this._c2=(c.sq(this.a)+c.sq(this._b)*(0===this._e2?1:(0<this._e2?c.atanh(Math.sqrt(this._e2)):Math.atan(Math.sqrt(-this._e2)))/Math.sqrt(Math.abs(this._e2))))/2;this._etol2=.1*d/Math.sqrt(Math.max(.001,Math.abs(this.f))*Math.min(1,1-this.f/2)/2);if(!(isFinite(this.a)&&0<this.a))throw Error("Major radius is not positive");
if(!(isFinite(this._b)&&0<this._b))throw Error("Minor radius is not positive");this._A3x=Array(6);this._C3x=Array(k);this._C4x=Array(f);this.A3coeff();this.C3coeff();this.C4coeff()};G=[-3,128,-2,-3,64,-1,-3,-1,16,3,-1,-2,8,1,-1,2,1,1];a.Geodesic.prototype.A3coeff=function(){var a=0,b=0,d,f;for(d=5;0<=d;--d)f=Math.min(6-d-1,d),this._A3x[b++]=c.polyval(f,G,a,this._n)/G[a+f+1],a+=f+2};H=[3,128,2,5,128,-1,3,3,64,-1,0,1,8,-1,1,4,5,256,1,3,128,-3,-2,3,64,1,-3,2,32,7,512,-10,9,384,5,-9,5,192,7,512,-14,7,
512,21,2560];a.Geodesic.prototype.C3coeff=function(){var b=0,d=0,f,e,v;for(f=1;f<a.nC3_;++f)for(e=a.nC3_-1;e>=f;--e)v=Math.min(a.nC3_-e-1,e),this._C3x[d++]=c.polyval(v,H,b,this._n)/H[b+v+1],b+=v+2};K=[97,15015,1088,156,45045,-224,-4784,1573,45045,-10656,14144,-4576,-858,45045,64,624,-4576,6864,-3003,15015,100,208,572,3432,-12012,30030,45045,1,9009,-2944,468,135135,5792,1040,-1287,135135,5952,-11648,9152,-2574,135135,-64,-624,4576,-6864,3003,135135,8,10725,1856,-936,225225,-8448,4992,-1144,225225,
-1440,4160,-4576,1716,225225,-136,63063,1024,-208,105105,3584,-3328,1144,315315,-128,135135,-2560,832,405405,128,99099];a.Geodesic.prototype.C4coeff=function(){var b=0,d=0,f,e,v;for(f=0;f<a.nC4_;++f)for(e=a.nC4_-1;e>=f;--e)v=a.nC4_-e-1,this._C4x[d++]=c.polyval(v,K,b,this._n)/K[b+v+1],b+=v+2};a.Geodesic.prototype.A3f=function(a){return c.polyval(5,this._A3x,0,a)};a.Geodesic.prototype.C3f=function(b,f){var d=1,e=0,v,g;for(v=1;v<a.nC3_;++v)g=a.nC3_-v-1,d*=b,f[v]=d*c.polyval(g,this._C3x,e,b),e+=g+1};
a.Geodesic.prototype.C4f=function(b,d){var f=1,e=0,g,h;for(g=0;g<a.nC4_;++g)h=a.nC4_-g-1,d[g]=f*c.polyval(h,this._C4x,e,b),e+=h+1,f*=b};a.Geodesic.prototype.Lengths=function(c,b,f,d,e,g,h,m,k,n,w,F,p){w&=a.OUT_MASK;var q={},z=0,x=0,u=0,l=0;w&(a.DISTANCE|a.REDUCEDLENGTH|a.GEODESICSCALE)&&(u=a.A1m1f(c),a.C1f(c,F),w&(a.REDUCEDLENGTH|a.GEODESICSCALE)&&(l=a.A2m1f(c),a.C2f(c,p),z=u-l,l=1+l),u=1+u);if(w&a.DISTANCE)F=a.SinCosSeries(!0,g,h,F)-a.SinCosSeries(!0,f,d,F),q.s12b=u*(b+F),w&(a.REDUCEDLENGTH|a.GEODESICSCALE)&&
(x=a.SinCosSeries(!0,g,h,p)-a.SinCosSeries(!0,f,d,p),x=z*b+(u*F-l*x));else if(w&(a.REDUCEDLENGTH|a.GEODESICSCALE)){for(x=1;x<=a.nC2_;++x)p[x]=u*F[x]-l*p[x];x=z*b+(a.SinCosSeries(!0,g,h,p)-a.SinCosSeries(!0,f,d,p))}w&a.REDUCEDLENGTH&&(q.m0=z,q.m12b=m*d*g-e*f*h-d*h*x);w&a.GEODESICSCALE&&(b=d*h+f*g,k=this._ep2*(k-n)*(k+n)/(e+m),q.M12=b+(k*g-h*x)*f/e,q.M21=b-(k*f-d*x)*g/m);return q};a.Geodesic.prototype.InverseStart=function(b,f,d,e,h,k,w,m,F){var r={},u=e*f-h*b,l,p,P,z,x,t;r.sig12=-1;l=e*f+h*b;p=0<=
h*f+e*b&&.5>u&&.5>h*w;P=w;p&&(z=c.sq(b+e),z/=z+c.sq(f+h),r.dnm=Math.sqrt(1+this._ep2*z),P/=this._f1*r.dnm);z=Math.sin(P);x=Math.cos(P);r.salp1=h*z;r.calp1=0<=x?u+h*b*c.sq(z)/(1+x):l-h*b*c.sq(z)/(1-x);P=c.hypot(r.salp1,r.calp1);t=b*e+f*h*x;p&&P<this._etol2?(r.salp2=f*z,r.calp2=u-f*e*(0<=x?c.sq(z)/(1+x):1-x),b=c.hypot(r.salp2,r.calp2),r.salp2/=b,r.calp2/=b,r.sig12=Math.atan2(P,t)):.1<Math.abs(this._n)||0<=t||P>=6*Math.abs(this._n)*Math.PI*c.sq(f)||(0<=this.f?(d=c.sq(b)*this._ep2,d/=2*(1+Math.sqrt(1+
d))+d,e=this.f*f*this.A3f(d)*Math.PI,d=(w-Math.PI)/e,f=l/(e*f)):(u=Math.atan2(l,h*f-e*b),e=this.Lengths(this._n,Math.PI+u,b,-f,d,e,h,k,f,h,a.REDUCEDLENGTH,m,F),d=e.m12b,e=e.m0,d=-1+d/(f*h*e*Math.PI),e=-.01>d?l/d:-this.f*c.sq(f)*Math.PI,e/=f,f=(w-Math.PI)/e),f>-q&&d>-1-n?0<=this.f?(r.salp1=Math.min(1,-d),r.calp1=-Math.sqrt(1-c.sq(r.salp1))):(r.calp1=Math.max(d>-q?0:-1,d),r.salp1=Math.sqrt(1-c.sq(r.calp1))):(w=g(d,f),f=e*(0<=this.f?-d*w/(1+w):-f*(1+w)/w),z=Math.sin(f),x=-Math.cos(f),r.salp1=h*z,r.calp1=
l-h*b*c.sq(z)/(1-x)));0>=r.salp1?(r.salp1=1,r.calp1=0):(b=c.hypot(r.salp1,r.calp1),r.salp1/=b,r.calp1/=b);return r};a.Geodesic.prototype.Lambda12=function(b,f,d,e,h,g,k,m,w,n,F,q){var p={},u,l,x,t,E;0===b&&0===m&&(m=-a.tiny_);l=k*f;x=c.hypot(m,k*b);p.ssig1=b;t=l*b;p.csig1=E=m*f;u=c.hypot(p.ssig1,p.csig1);p.ssig1/=u;p.csig1/=u;p.salp2=h!==f?l/h:k;p.calp2=h!==f||Math.abs(e)!==-b?Math.sqrt(c.sq(m*f)+(f<-b?(h-f)*(f+h):(b-e)*(b+e)))/h:Math.abs(m);p.ssig2=e;e*=l;p.csig2=k=p.calp2*h;u=c.hypot(p.ssig2,p.csig2);
p.ssig2/=u;p.csig2/=u;p.sig12=Math.atan2(Math.max(0,p.csig1*p.ssig2-p.ssig1*p.csig2),p.csig1*p.csig2+p.ssig1*p.ssig2);u=Math.atan2(Math.max(0,E*e-t*k),E*k+t*e);x=c.sq(x)*this._ep2;p.eps=x/(2*(1+Math.sqrt(1+x))+x);this.C3f(p.eps,q);q=a.SinCosSeries(!0,p.ssig2,p.csig2,q)-a.SinCosSeries(!0,p.ssig1,p.csig1,q);x=-this.f*this.A3f(p.eps);p.domg12=l*x*(p.sig12+q);p.lam12=u+p.domg12;w&&(0===p.calp2?p.dlam12=-2*this._f1*d/b:(b=this.Lengths(p.eps,p.sig12,p.ssig1,p.csig1,d,p.ssig2,p.csig2,g,f,h,a.REDUCEDLENGTH,
n,F),p.dlam12=b.m12b,p.dlam12*=this._f1/(p.calp2*h)));return p};a.Geodesic.prototype.Inverse=function(b,f,d,e,g){var k={},n,m,u,r,q,l,p,t,z,x,y,E,B,D,A,C,G,H,K,L,N,J,O,Q,I,V,W,S,X,U,Y,Z;g||(g=a.STANDARD);g==a.LONG_UNROLL&&(g|=a.STANDARD);g&=a.OUT_MASK;k.lat1=b=c.LatFix(b);k.lat2=d=c.LatFix(d);n=c.AngDiff(f,e);g&a.LONG_UNROLL?(k.lon1=f,k.lon2=f+n):(k.lon1=c.AngNormalize(f),k.lon2=c.AngNormalize(e));n=c.AngRound(n);f=0<=n?1:-1;n*=f;b=c.AngRound(b);d=c.AngRound(d);e=Math.abs(b)<Math.abs(d)?-1:1;0>e&&
(f*=-1,m=b,b=d,d=m);u=0>b?1:-1;b*=u;d*=u;m=c.sincosd(b);r=this._f1*m.s;q=m.c;m=c.hypot(r,q);r/=m;q=Math.max(a.tiny_,q/m);m=c.sincosd(d);d=this._f1*m.s;l=m.c;m=c.hypot(d,l);d/=m;l=Math.max(a.tiny_,l/m);q<-r?l===q&&(d=0>d?r:-r):Math.abs(d)===-r&&(l=q);z=Math.sqrt(1+this._ep2*c.sq(r));x=Math.sqrt(1+this._ep2*c.sq(d));y=n*c.degree;m=c.sincosd(n);E=m.s;m=m.c;G=Array(a.nC1_+1);H=Array(a.nC2_+1);K=Array(a.nC3_);if(b=-90===b||0===E)B=m,D=E,A=1,C=0,L=r,N=B*q,J=d,O=A*l,E=Math.atan2(Math.max(0,N*J-L*O),N*O+
L*J),m=this.Lengths(this._n,E,L,N,z,J,O,x,q,l,g|a.DISTANCE|a.REDUCEDLENGTH,G,H),p=m.s12b,t=m.m12b,0!==(g&a.GEODESICSCALE)&&(k.M12=m.M12,k.M21=m.M21),1>E||0<=t?(E<3*a.tiny_&&(E=t=p=0),t*=this._b,p*=this._b,k.a12=E/c.degree):b=!1;if(!b&&0===r&&(0>=this.f||y<=Math.PI-this.f*Math.PI))B=A=0,D=C=1,p=this.a*y,E=I=y/this._f1,t=this._b*Math.sin(E),g&a.GEODESICSCALE&&(k.M12=k.M21=Math.cos(E)),k.a12=n/this._f1;else if(!b)if(m=this.InverseStart(r,q,z,d,l,x,y,G,H),E=m.sig12,D=m.salp1,B=m.calp1,0<=E)C=m.salp2,
A=m.calp2,I=m.dnm,p=E*this._b*I,t=c.sq(I)*this._b*Math.sin(E/I),g&a.GEODESICSCALE&&(k.M12=k.M21=Math.cos(E/I)),k.a12=E/c.degree,I=y/(this._f1*I);else{p=0;t=a.tiny_;n=1;V=a.tiny_;W=-1;for(X=S=!1;p<w;++p){m=this.Lambda12(r,q,z,d,l,x,D,B,20>p,G,H,K);U=m.lam12-y;C=m.salp2;A=m.calp2;E=m.sig12;L=m.ssig1;N=m.csig1;J=m.ssig2;O=m.csig2;Q=m.eps;I=m.domg12;m=m.dlam12;if(X||!(Math.abs(U)>=(S?8:2)*F))break;0<U&&(20>p||B/D>W/V)?(V=D,W=B):0>U&&(20>p||B/D<n/t)&&(t=D,n=B);if(20>p&&0<m&&(m=-U/m,S=Math.sin(m),Y=Math.cos(m),
Z=D*Y+B*S,0<Z&&Math.abs(m)<Math.PI)){B=B*Y-D*S;D=Z;m=c.hypot(D,B);D/=m;B/=m;S=Math.abs(U)<=16*F;continue}D=(t+V)/2;B=(n+W)/2;m=c.hypot(D,B);D/=m;B/=m;S=!1;X=Math.abs(t-D)+(n-B)<h||Math.abs(D-V)+(B-W)<h}K=g|(g&(a.REDUCEDLENGTH|a.GEODESICSCALE)?a.DISTANCE:a.NONE);m=this.Lengths(Q,E,L,N,z,J,O,x,q,l,K,G,H);p=m.s12b;t=m.m12b;0!==(g&a.GEODESICSCALE)&&(k.M12=m.M12,k.M21=m.M21);t*=this._b;p*=this._b;k.a12=E/c.degree;I=y-I}g&a.DISTANCE&&(k.s12=0+p);g&a.REDUCEDLENGTH&&(k.m12=0+t);g&a.AREA&&(y=D*q,z=c.hypot(B,
D*r),0!==z&&0!==y?(L=r,N=B*q,J=d,O=A*l,Q=c.sq(z)*this._ep2,Q/=2*(1+Math.sqrt(1+Q))+Q,y=c.sq(this.a)*z*y*this._e2,m=c.hypot(L,N),L/=m,N/=m,m=c.hypot(J,O),J/=m,O/=m,z=Array(a.nC4_),this.C4f(Q,z),L=a.SinCosSeries(!1,L,N,z),J=a.SinCosSeries(!1,J,O,z),k.S12=y*(J-L)):k.S12=0,!b&&I<.75*Math.PI&&1.75>d-r?(J=Math.sin(I),I=1+Math.cos(I),q=1+q,l=1+l,r=2*Math.atan2(J*(r*l+d*q),I*(r*d+q*l))):(r=C*B-A*D,d=A*B+C*D,0===r&&0>d&&(r=a.tiny_*B,d=-1),r=Math.atan2(r,d)),k.S12+=this._c2*r,k.S12=k.S12*e*f*u,k.S12+=0);0>
e&&(m=D,D=C,C=m,m=B,B=A,A=m,g&a.GEODESICSCALE&&(m=k.M12,k.M12=k.M21,k.M21=m));C=C*e*f;A=A*e*u;g&a.AZIMUTH&&(k.azi1=c.atan2d(D*e*f,B*e*u),k.azi2=c.atan2d(C,A));return k};a.Geodesic.prototype.GenDirect=function(b,d,f,c,e,g){g?g==a.LONG_UNROLL&&(g|=a.STANDARD):g=a.STANDARD;return(new l.GeodesicLine(this,b,d,f,g|(c?a.NONE:a.DISTANCE_IN))).GenPosition(c,e,g)};a.Geodesic.prototype.Direct=function(a,b,d,f,c){return this.GenDirect(a,b,d,!1,f,c)};a.Geodesic.prototype.ArcDirect=function(a,b,d,f,c){return this.GenDirect(a,
b,d,!0,f,c)};a.Geodesic.prototype.Line=function(a,b,d,f){return new l.GeodesicLine(this,a,b,d,f)};a.Geodesic.prototype.Polygon=function(a){return new b.PolygonArea(this,a)};a.WGS84=new a.Geodesic(e.WGS84.a,e.WGS84.f)})(GeographicLib.Geodesic,GeographicLib.GeodesicLine,GeographicLib.PolygonArea,GeographicLib.Math,GeographicLib.Constants);
(function(a,l,b){l.GeodesicLine=function(c,e,k,f,w){w||(w=a.STANDARD|a.DISTANCE_IN);this.a=c.a;this.f=c.f;this._b=c._b;this._c2=c._c2;this._f1=c._f1;this._caps=(w?w|a.LATITUDE|a.AZIMUTH:a.ALL)|a.LONG_UNROLL;this.lat1=b.LatFix(e);this.lon1=k;this.azi1=b.AngNormalize(f);e=b.sincosd(b.AngRound(this.azi1));this._salp1=e.s;this._calp1=e.c;e=b.sincosd(b.AngRound(this.lat1));f=this._f1*e.s;k=e.c;e=b.hypot(f,k);f/=e;k=Math.max(a.tiny_,k/e);this._dn1=Math.sqrt(1+c._ep2*b.sq(f));this._salp0=this._salp1*k;this._calp0=
b.hypot(this._calp1,this._salp1*f);this._ssig1=f;this._somg1=this._salp0*f;this._csig1=this._comg1=0!==f||0!==this._calp1?k*this._calp1:1;e=b.hypot(this._ssig1,this._csig1);this._ssig1/=e;this._csig1/=e;this._k2=b.sq(this._calp0)*c._ep2;e=this._k2/(2*(1+Math.sqrt(1+this._k2))+this._k2);this._caps&a.CAP_C1&&(this._A1m1=a.A1m1f(e),this._C1a=Array(a.nC1_+1),a.C1f(e,this._C1a),this._B11=a.SinCosSeries(!0,this._ssig1,this._csig1,this._C1a),k=Math.sin(this._B11),f=Math.cos(this._B11),this._stau1=this._ssig1*
f+this._csig1*k,this._ctau1=this._csig1*f-this._ssig1*k);this._caps&a.CAP_C1p&&(this._C1pa=Array(a.nC1p_+1),a.C1pf(e,this._C1pa));this._caps&a.CAP_C2&&(this._A2m1=a.A2m1f(e),this._C2a=Array(a.nC2_+1),a.C2f(e,this._C2a),this._B21=a.SinCosSeries(!0,this._ssig1,this._csig1,this._C2a));this._caps&a.CAP_C3&&(this._C3a=Array(a.nC3_),c.C3f(e,this._C3a),this._A3c=-this.f*this._salp0*c.A3f(e),this._B31=a.SinCosSeries(!0,this._ssig1,this._csig1,this._C3a));this._caps&a.CAP_C4&&(this._C4a=Array(a.nC4_),c.C4f(e,
this._C4a),this._A4=b.sq(this.a)*this._calp0*this._salp0*c._e2,this._B41=a.SinCosSeries(!1,this._ssig1,this._csig1,this._C4a))};l.GeodesicLine.prototype.GenPosition=function(c,e,k){var f={},w,l,q,d,h,n,g,u,t,A,y,C,G;k?k==a.LONG_UNROLL&&(k|=a.STANDARD):k=a.STANDARD;k=k&this._caps&a.OUT_MASK;f.lat1=this.lat1;f.azi1=this.azi1;f.lon1=k&a.LONG_UNROLL?this.lon1:b.AngNormalize(this.lon1);c?f.a12=e:f.s12=e;if(!(c||this._caps&a.DISTANCE_IN&a.OUT_MASK))return f.a12=Number.NaN,f;h=d=0;c?(w=e*b.degree,t=b.sincosd(e),
l=t.s,q=t.c):(w=e/(this._b*(1+this._A1m1)),g=Math.sin(w),l=Math.cos(w),d=-a.SinCosSeries(!0,this._stau1*l+this._ctau1*g,this._ctau1*l-this._stau1*g,this._C1pa),w-=d-this._B11,l=Math.sin(w),q=Math.cos(w),.01<Math.abs(this.f)&&(n=this._ssig1*q+this._csig1*l,g=this._csig1*q-this._ssig1*l,d=a.SinCosSeries(!0,n,g,this._C1a),g=(1+this._A1m1)*(w+(d-this._B11))-e/this._b,w-=g/Math.sqrt(1+this._k2*b.sq(n)),l=Math.sin(w),q=Math.cos(w)));n=this._ssig1*q+this._csig1*l;g=this._csig1*q-this._ssig1*l;G=Math.sqrt(1+
this._k2*b.sq(n));if(k&(a.DISTANCE|a.REDUCEDLENGTH|a.GEODESICSCALE)){if(c||.01<Math.abs(this.f))d=a.SinCosSeries(!0,n,g,this._C1a);h=(1+this._A1m1)*(d-this._B11)}t=this._calp0*n;A=b.hypot(this._salp0,this._calp0*g);0===A&&(A=g=a.tiny_);d=this._salp0;e=this._calp0*g;c&&k&a.DISTANCE&&(f.s12=this._b*((1+this._A1m1)*w+h));k&a.LONGITUDE&&(y=this._salp0*n,C=g,u=0>this._salp0?-1:1,u=k&a.LONG_UNROLL?u*(w-(Math.atan2(n,g)-Math.atan2(this._ssig1,this._csig1))+(Math.atan2(u*y,C)-Math.atan2(u*this._somg1,this._comg1))):
Math.atan2(y*this._comg1-C*this._somg1,C*this._comg1+y*this._somg1),u+=this._A3c*(w+(a.SinCosSeries(!0,n,g,this._C3a)-this._B31)),u/=b.degree,f.lon2=k&a.LONG_UNROLL?this.lon1+u:b.AngNormalize(b.AngNormalize(this.lon1)+b.AngNormalize(u)));k&a.LATITUDE&&(f.lat2=b.atan2d(t,this._f1*A));k&a.AZIMUTH&&(f.azi2=b.atan2d(d,e));k&(a.REDUCEDLENGTH|a.GEODESICSCALE)&&(t=a.SinCosSeries(!0,n,g,this._C2a),t=(1+this._A2m1)*(t-this._B21),h=(this._A1m1-this._A2m1)*w+(h-t),k&a.REDUCEDLENGTH&&(f.m12=this._b*(G*this._csig1*
n-this._dn1*this._ssig1*g-this._csig1*g*h)),k&a.GEODESICSCALE&&(t=this._k2*(n-this._ssig1)*(n+this._ssig1)/(this._dn1+G),f.M12=q+(t*n-g*h)*this._ssig1/this._dn1,f.M21=q-(t*this._ssig1-this._csig1*h)*n/G));k&a.AREA&&(k=a.SinCosSeries(!1,n,g,this._C4a),0===this._calp0||0===this._salp0?(h=d*this._calp1-e*this._salp1,g=e*this._calp1+d*this._salp1,0===h&&0>g&&(h=a.tiny_*this._calp1,g=-1)):(h=this._calp0*this._salp0*(0>=q?this._csig1*(1-q)+l*this._ssig1:l*(this._csig1*l/(1+q)+this._ssig1)),g=b.sq(this._salp0)+
b.sq(this._calp0)*this._csig1*g),f.S12=this._c2*Math.atan2(h,g)+this._A4*(k-this._B41));c||(f.a12=w/b.degree);return f};l.GeodesicLine.prototype.Position=function(a,b){return this.GenPosition(!1,a,b)};l.GeodesicLine.prototype.ArcPosition=function(a,b){return this.GenPosition(!0,a,b)}})(GeographicLib.Geodesic,GeographicLib.GeodesicLine,GeographicLib.Math);
(function(a,l,b,c){var e,k;e=function(a,c){var e;a=b.AngNormalize(a);c=b.AngNormalize(c);e=b.AngDiff(a,c);return 0>a&&0<=c&&0<e?1:0>c&&0<=a&&0>e?-1:0};k=function(a,b){a%=720;b%=720;return(0<=b&&360>b||-360>b?0:1)-(0<=a&&360>a||-360>a?0:1)};a.PolygonArea=function(a,b){this._geod=a;this.a=this._geod.a;this.f=this._geod.f;this._area0=4*Math.PI*a._c2;this.polyline=b?b:!1;this._mask=l.LATITUDE|l.LONGITUDE|l.DISTANCE|(this.polyline?l.NONE:l.AREA|l.LONG_UNROLL);this.polyline||(this._areasum=new c.Accumulator(0));
this._perimetersum=new c.Accumulator(0);this.Clear()};a.PolygonArea.prototype.Clear=function(){this._crossings=this.num=0;this.polyline||this._areasum.Set(0);this._perimetersum.Set(0);this._lat0=this._lon0=this.lat=this.lon=Number.NaN};a.PolygonArea.prototype.AddPoint=function(a,b){var c;0===this.num?(this._lat0=this.lat=a,this._lon0=this.lon=b):(c=this._geod.Inverse(this.lat,this.lon,a,b,this._mask),this._perimetersum.Add(c.s12),this.polyline||(this._areasum.Add(c.S12),this._crossings+=e(this.lon,
b)),this.lat=a,this.lon=b);++this.num};a.PolygonArea.prototype.AddEdge=function(a,b){var c;this.num&&(c=this._geod.Direct(this.lat,this.lon,a,b,this._mask),this._perimetersum.Add(b),this.polyline||(this._areasum.Add(c.S12),this._crossings+=k(this.lon,c.lon2)),this.lat=c.lat2,this.lon=c.lon2);++this.num};a.PolygonArea.prototype.Compute=function(a,b){var k={number:this.num},l,d;if(2>this.num)return k.perimeter=0,this.polyline||(k.area=0),k;if(this.polyline)return k.perimeter=this._perimetersum.Sum(),
k;l=this._geod.Inverse(this.lat,this.lon,this._lat0,this._lon0,this._mask);k.perimeter=this._perimetersum.Sum(l.s12);d=new c.Accumulator(this._areasum);d.Add(l.S12);this._crossings+e(this.lon,this._lon0)&1&&d.Add((0>d.Sum()?1:-1)*this._area0/2);a||d.Negate();b?d.Sum()>this._area0/2?d.Add(-this._area0):d.Sum()<=-this._area0/2&&d.Add(+this._area0):d.Sum()>=this._area0?d.Add(-this._area0):0>d&&d.Add(-this._area0);k.area=d.Sum();return k};a.PolygonArea.prototype.TestPoint=function(a,b,c,k){var d={number:this.num+
1},h,n,g,l;if(0===this.num)return d.perimeter=0,this.polyline||(d.area=0),d;d.perimeter=this._perimetersum.Sum();n=this.polyline?0:this._areasum.Sum();g=this._crossings;for(l=0;l<(this.polyline?1:2);++l)h=this._geod.Inverse(0===l?this.lat:a,0===l?this.lon:b,0!==l?this._lat0:a,0!==l?this._lon0:b,this._mask),d.perimeter+=h.s12,this.polyline||(n+=h.S12,g+=e(0===l?this.lon:b,0!==l?this._lon0:b));if(this.polyline)return d;g&1&&(n+=(0>n?1:-1)*this._area0/2);c||(n*=-1);k?n>this._area0/2?n-=this._area0:n<=
-this._area0/2&&(n+=this._area0):n>=this._area0?n-=this._area0:0>n&&(n+=this._area0);d.area=n;return d};a.PolygonArea.prototype.TestEdge=function(a,b,c,l){var d={number:this.num?this.num+1:0},h;if(0===this.num)return d;d.perimeter=this._perimetersum.Sum()+b;if(this.polyline)return d;tempsum=this._areasum.Sum();h=this._crossings;a=this._geod.Direct(this.lat,this.lon,a,b,this._mask);tempsum+=a.S12;h+=k(this.lon,a.lon2);a=this._geod(a.lat2,a.lon2,this._lat0,this._lon0,this._mask);perimeter+=a.s12;tempsum+=
a.S12;h+=e(a.lon2,this._lon0);h&1&&(tempsum+=(0>tempsum?1:-1)*this._area0/2);c||(tempsum*=-1);l?tempsum>this._area0/2?tempsum-=this._area0:tempsum<=-this._area0/2&&(tempsum+=this._area0):tempsum>=this._area0?tempsum-=this._area0:0>tempsum&&(tempsum+=this._area0);d.area=tempsum;return d}})(GeographicLib.PolygonArea,GeographicLib.Geodesic,GeographicLib.Math,GeographicLib.Accumulator);window.GeographicLib=GeographicLib;window.GeographicLib.Geodesic=GeographicLib.Geodesic;
window.GeographicLib.Geodesic.Geodesic=GeographicLib.Geodesic.Geodesic;