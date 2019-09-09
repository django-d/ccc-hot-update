cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello_World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
    },

    // called every frame
    update: function (dt) {

    },

    onGetHallDataClick: function () {
        const list = cc.prefabs;
        const node = cc.instantiate(list[0]);
        node.parent = this.node;
        console.log(JSON.stringify(list));
    },

    on_back: function () {
        console.log("btn_back clicked!!!!");
        window.require(cc.INGAME + "/src/dating.js");
    },

    onDestroy: function () {
        console.log('subgame => destroy');
    }
});