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
    onLoad: function () {
        cc.oft = {};
        cc.loader.loadResDir(
            "data",
            (completedCount, totalCount, item) => {},
            (err, consts) => {
                console.log(consts)
                cc.datas = consts;
            },
        );
        cc.loader.loadResDir(
            "prefab",
            (completedCount, totalCount, item) => {},
            (err, consts) => {
                console.log(consts)
                cc.prefabs = consts;
            },
        );
    },

    on_enter_click() {
        cc.director.loadScene('hall');
    }



});