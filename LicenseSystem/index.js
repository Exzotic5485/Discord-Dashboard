const _0x14ebd8=_0x35f9;function _0x35f9(_0x525ad5,_0x3259fe){const _0x2d5d92=_0x2d5d();return _0x35f9=function(_0x35f972,_0x5274a8){_0x35f972=_0x35f972-0x1c9;let _0xc771d6=_0x2d5d92[_0x35f972];return _0xc771d6;},_0x35f9(_0x525ad5,_0x3259fe);}(function(_0x5d6f4b,_0x19c5cc){const _0x50d403=_0x35f9,_0xf2e31f=_0x5d6f4b();while(!![]){try{const _0x548c5e=-parseInt(_0x50d403(0x1d9))/0x1*(-parseInt(_0x50d403(0x1c9))/0x2)+parseInt(_0x50d403(0x1cf))/0x3*(parseInt(_0x50d403(0x1da))/0x4)+parseInt(_0x50d403(0x1d6))/0x5+-parseInt(_0x50d403(0x1d1))/0x6*(parseInt(_0x50d403(0x1d2))/0x7)+parseInt(_0x50d403(0x1d5))/0x8+-parseInt(_0x50d403(0x1ca))/0x9*(parseInt(_0x50d403(0x1d0))/0xa)+-parseInt(_0x50d403(0x1ce))/0xb;if(_0x548c5e===_0x19c5cc)break;else _0xf2e31f['push'](_0xf2e31f['shift']());}catch(_0x5407c3){_0xf2e31f['push'](_0xf2e31f['shift']());}}}(_0x2d5d,0x36951));function _0x2d5d(){const _0x3d509d=['2358216dYcIEr','2091275SyHztP','Discord-dashboard\x20License\x20ID\x20is\x20not\x20valid.','POST','32997ethPqx','50768XfQecm','exports','22kSozPp','99vZReof','then','node-fetch','stringify','4142908yinByk','3wBYuFS','321410VxfPvc','18MvjBVC','314867IHwkIe','licenseId','application/json'];_0x2d5d=function(){return _0x3d509d;};return _0x2d5d();}const fetch=require(_0x14ebd8(0x1cc));class License{constructor(_0x5b1c2a){const _0x21d425=_0x14ebd8;if(!_0x5b1c2a)throw new TypeError('Discord-Dashboard\x20License\x20ID\x20is\x20not\x20defined!\x20Go\x20to\x20https://licenses.assistants.ga/\x20and\x20generate/buy\x20one\x20for\x20you.');this[_0x21d425(0x1d3)]=_0x5b1c2a;}async['ValidateLicense'](){const _0x10111c=_0x14ebd8;let _0x351023;return await fetch('https://licenses.assistants.ga/validate',{'method':_0x10111c(0x1d8),'headers':{'Content-Type':_0x10111c(0x1d4)},'body':JSON[_0x10111c(0x1cd)]({'licenseId':this[_0x10111c(0x1d3)]})})[_0x10111c(0x1cb)](_0x4a9698=>_0x4a9698['json']())[_0x10111c(0x1cb)](_0x114ce9=>{const _0x3ad577=_0x10111c;if(_0x114ce9['error'])throw new TypeError(_0x3ad577(0x1d7));_0x351023=_0x114ce9;}),_0x351023;}}module[_0x14ebd8(0x1db)]=License;
module.exports = License;