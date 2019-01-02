(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/login.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0a9dcagMxdOWL4gVWPZ66cj', 'login', __filename);
// login.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.oft = {};
        cc.loader.loadResDir("data", function (completedCount, totalCount, item) {}, function (err, consts) {
            console.log(consts);
            cc.datas = consts;
        });
        cc.loader.loadResDir("prefab", function (completedCount, totalCount, item) {}, function (err, consts) {
            console.log(consts);
            cc.prefabs = consts;
        });
    },

    on_enter_click: function on_enter_click() {
        cc.director.loadScene('hall');
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=login.js.map
        