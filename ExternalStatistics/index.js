const _0x1e29a0=_0x21dd;function _0x21dd(_0x4c357e,_0x4053fb){const _0x2e7f28=_0x2e7f();return _0x21dd=function(_0x21dd62,_0x4ea331){_0x21dd62=_0x21dd62-0x7b;let _0x2d7468=_0x2e7f28[_0x21dd62];return _0x2d7468;},_0x21dd(_0x4c357e,_0x4053fb);}(function(_0x119c6f,_0x120538){const _0x37c0ff=_0x21dd,_0xda9e7e=_0x119c6f();while(!![]){try{const _0x3d6a3c=-parseInt(_0x37c0ff(0x8d))/0x1+-parseInt(_0x37c0ff(0x84))/0x2*(parseInt(_0x37c0ff(0x80))/0x3)+parseInt(_0x37c0ff(0x8a))/0x4+parseInt(_0x37c0ff(0x8f))/0x5*(parseInt(_0x37c0ff(0x7b))/0x6)+-parseInt(_0x37c0ff(0x81))/0x7+parseInt(_0x37c0ff(0x87))/0x8*(parseInt(_0x37c0ff(0x7f))/0x9)+parseInt(_0x37c0ff(0x85))/0xa*(parseInt(_0x37c0ff(0x88))/0xb);if(_0x3d6a3c===_0x120538)break;else _0xda9e7e['push'](_0xda9e7e['shift']());}catch(_0x3fc44e){_0xda9e7e['push'](_0xda9e7e['shift']());}}}(_0x2e7f,0x9b5ac));function _0x2e7f(){const _0x189c08=['6GOmTPd','553413zHqdxM','/registerUser','/registerProject','302422vlXGGb','40RRiMZw','exports','1128cuqcJF','1044219dzBXVF','POST','1814248gXtHXV','discord-dashboard','application/json','33161lcUHWc','version','5sKLBMN','185226vMgoek','node-fetch','https://dbd-external-stats.assistants.ga','discord-dashboard-pp-system','11925zINYdV'];_0x2e7f=function(){return _0x189c08;};return _0x2e7f();}const fetch=require(_0x1e29a0(0x7c)),fs=require('fs'),DiscordDashboardPP=require(_0x1e29a0(0x7e)),PPManager=new DiscordDashboardPP['PPManager']({},{}),projectData=PPManager['GetProjectData']();function send(_0x31f31d,_0x2edea3){const _0x280798=_0x1e29a0;try{fetch(_0x280798(0x7d)+_0x31f31d,{'method':_0x280798(0x89),'body':JSON['stringify'](_0x2edea3),'headers':{'Content-Type':_0x280798(0x8c)}});}catch(_0x2fb706){}}module[_0x1e29a0(0x86)]={'registerProject':(_0x3dcefb,_0x413bb2=projectData['id'],_0x471056=projectData['name'],_0x5467b2=require(_0x1e29a0(0x8b))[_0x1e29a0(0x8e)])=>{const _0x4192f8=_0x1e29a0;send(_0x4192f8(0x83),{'cId':_0x3dcefb,'pId':_0x413bb2,'pN':_0x471056,'v':_0x5467b2});},'registerUser':(_0x541db3,_0x5e1de1=projectData['id'])=>{const _0x174164=_0x1e29a0;send(_0x174164(0x82),{'uId':_0x541db3,'pId':_0x5e1de1});},'pD':projectData};