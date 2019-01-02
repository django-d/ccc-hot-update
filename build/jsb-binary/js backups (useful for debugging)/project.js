require = function i(o, c, r) {
function l(s, e) {
if (!c[s]) {
if (!o[s]) {
var t = "function" == typeof require && require;
if (!e && t) return t(s, !0);
if (g) return g(s, !0);
var a = new Error("Cannot find module '" + s + "'");
throw a.code = "MODULE_NOT_FOUND", a;
}
var n = c[s] = {
exports: {}
};
o[s][0].call(n.exports, function(e) {
return l(o[s][1][e] || e);
}, n, n.exports, i, o, c, r);
}
return c[s].exports;
}
for (var g = "function" == typeof require && require, e = 0; e < r.length; e++) l(r[e]);
return l;
}({
hall: [ function(e, s, t) {
"use strict";
cc._RF.push(s, "8ebd7eD5e1NmoM5ZJtztGi0", "hall");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
cc.oft = {};
cc.loader.loadResDir("data", function(e, s, t) {}, function(e, s) {
console.log(s);
cc.oft.datas = s;
});
},
getfiles: function(e, s) {
this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "ALLGame/" + e;
console.log("_storagePath:", this._storagePath);
var t = "http://192.168.1.166:8080/down/remote-assets/" + e, a = this._storagePath + "/peision.manifest";
this.manifestUrl = a;
var n = JSON.stringify({
packageUrl: t,
remoteManifestUrl: t + "/peision.manifest",
remoteVersionUrl: t + "/version.manifest",
version: "0.0.1",
assets: {},
searchPaths: []
});
this._am = new jsb.AssetsManager("", this._storagePath, function(e, s) {
for (var t = e.split("."), a = s.split("."), n = 0; n < t.length; ++n) {
var i = parseInt(t[n]), o = parseInt(a[n] || 0);
if (i !== o) return i - o;
}
return a.length > t.length ? -1 : 0;
});
cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS || this._am.retain();
this._am.setVerifyCallback(function(e, s) {
s.compressed, s.md5, s.path, s.size;
return !0;
});
cc.sys.os === cc.sys.OS_ANDROID && this._am.setMaxConcurrentTask(2);
this._updateListener = 1 == s ? new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this)) : new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
cc.eventManager.addListener(this._updateListener, 1);
if (this._am.getState() === jsb.AssetsManager.State.UNINITED) if (jsb.fileUtils.isFileExist(a)) this._am.loadLocalManifest(this.manifestUrl); else {
var i = new jsb.Manifest(n, this._storagePath);
this._am.loadLocalManifest(i, this._storagePath);
}
if (1 == s) {
this._shengji = !0;
this._am.update();
} else {
this._am.checkUpdate();
this._shengji = !1;
}
console.log("更新文件:" + a);
},
updateCb: function(e) {
var s = !1;
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
console.log("本地没有配置文件");
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
case jsb.EventAssetsManager.NEW_VERSION_FOUND:
case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
cc.find("Canvas/label").getComponent(cc.Label).string = e.getPercentByFile();
console.log(e.getDownloadedFiles() + " / " + e.getTotalFiles());
var t = e.getMessage();
t && console.log("Updated file: " + t);
break;

case jsb.EventAssetsManager.ASSET_UPDATED:
case jsb.EventAssetsManager.ERROR_UPDATING:
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
cc.find("Canvas/label").getComponent(cc.Label).string = "更新完成";
console.log("更新完成");
s = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
this._am.downloadFailedAssets();
this.getfiles("subgame", 1);
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
}
if (s) {
this._updateListener = null;
var a = jsb.fileUtils.getSearchPaths(), n = this._am.getLocalManifest().getSearchPaths();
console.log(JSON.stringify(n));
Array.prototype.unshift.apply(a, n);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(a));
jsb.fileUtils.setSearchPaths(a);
cc.audioEngine.stopAll();
cc.game.restart();
}
},
checkCb: function(e) {
console.log("检测执行:" + e.getEventCode());
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
this.getfiles(this.updateName, 1);
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
cc.find("Canvas/label").getComponent(cc.Label).string = "已经是最新的了！";
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
case jsb.EventAssetsManager.ASSET_UPDATED:
case jsb.EventAssetsManager.ERROR_UPDATING:
case jsb.EventAssetsManager.UPDATE_FINISHED:
case jsb.EventAssetsManager.UPDATE_FAILED:
case jsb.EventAssetsManager.ERROR_DECOMPRESS:
}
},
updateName: "",
download_sub_game: function() {
this.updateName = "subgame";
this.getfiles("subgame", 2);
},
download_hall: function() {
this.updateName = "hall";
this.getfiles("hall", 2);
},
enter_sub_game: function() {
this._storagePath ? window.require(this._storagePath + "/src/main.js") : cc.find("Canvas/label").getComponent(cc.Label).string = "请先点击下载游戏，检查版本是否更新！！！";
},
on_create_game: function() {
cc.loader.loadRes("prefab/game1", cc.Prefab, function(e, s) {
console.log("game: =>", s);
});
},
onDestroy: function() {
console.log("hall => destroy");
}
});
cc._RF.pop();
}, {} ],
login: [ function(e, s, t) {
"use strict";
cc._RF.push(s, "0a9dcagMxdOWL4gVWPZ66cj", "login");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
cc.oft = {};
cc.loader.loadResDir("data", function(e, s, t) {}, function(e, s) {
console.log(s);
cc.datas = s;
});
cc.loader.loadResDir("prefab", function(e, s, t) {}, function(e, s) {
console.log(s);
cc.prefabs = s;
});
},
on_enter_click: function() {
cc.director.loadScene("hall");
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "hall", "login" ]);