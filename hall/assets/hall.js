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
        // window.require = require;
        cc.oft = {};
        cc.loader.loadResDir(
            "data",
            (completedCount, totalCount, item) => {},
            (err, consts) => {
                console.log(consts)
                cc.oft.datas = consts;
            },
        );
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    //*************************子游戏demo 开始***************************//
    getfiles: function (name, mmm) {


        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'update/' + name);
        console.log('_storagePath:', this._storagePath);
        var UIRLFILE = "http://192.168.1.166:8080/down/remote-assets/" + name;
        var filees = this._storagePath + "/peision.manifest";
        this.manifestUrl = filees;

        var customManifestStr = JSON.stringify({

            "packageUrl": UIRLFILE,
            "remoteManifestUrl": UIRLFILE + "/peision.manifest",
            "remoteVersionUrl": UIRLFILE + "/version.manifest",
            "version": "0.0.1",
            "assets": {},
            "searchPaths": []
        });

        var versionCompareHandle = function (versionA, versionB) {
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                } else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            } else {
                return 0;
            }
        };




        this._am = new jsb.AssetsManager('', this._storagePath, versionCompareHandle);


        this._am.setVerifyCallback(function (path, asset) {

            var compressed = asset.compressed;

            var expectedMD5 = asset.md5;

            var relativePath = asset.path;

            var size = asset.size;



            if (compressed) {

                return true;
            } else {

                return true;
            }
        });


        if (cc.sys.os === cc.sys.OS_ANDROID) {

            this._am.setMaxConcurrentTask(2);
        }

        if (mmm == 1) {
            this._am.setEventCallback(this.updateCb.bind(this))

        } else {
            this._am.setEventCallback(this.checkCb.bind(this));
        }


        // cc.eventManager.addListener(this._updateListener, 1);


        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {


            if (jsb.fileUtils.isFileExist(filees)) {

                this._am.loadLocalManifest(this.manifestUrl);

            } else {

                var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
                this._am.loadLocalManifest(manifest, this._storagePath);
            }

        }


        if (mmm == 1) {

            this._shengji = true;
            this._am.update();

        } else {

            this._am.checkUpdate();
            this._shengji = false;
        }

        console.log("更新文件:" + filees);

    },

    updateCb: function (event) {

        var needRestart = false;

        //console.log( "升级执行:"+event.getEventCode()  );

        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:

                /*0 本地没有配置文件*/
                console.log('本地没有配置文件');

                break;

            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                /*1下载配置文件错误*/


                break;

            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                /*2 解析文件错误*/

                break;

            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                /*3发现新的更新*/




                break;

            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                /*4 已经是最新的*/

                break;

            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                /*5 最新进展  做 进度的*/


                cc.find("Canvas/label").getComponent(cc.Label).string = event.getPercentByFile();
                console.log(event.getDownloadedFiles() + ' / ' + event.getTotalFiles());
                var msg = event.getMessage();
                if (msg) {
                    console.log('Updated file: ' + msg);
                }



                break;


            case jsb.EventAssetsManager.ASSET_UPDATED:
                /*6需要更新*/


                break;

            case jsb.EventAssetsManager.ERROR_UPDATING:

                /*7更新错误*/

                break;


            case jsb.EventAssetsManager.UPDATE_FINISHED:
                /*8更新完成*/
                cc.find("Canvas/label").getComponent(cc.Label).string = "更新完成";
                console.log('更新完成');
                if (this.updateName == 'hall') {
                    needRestart = true;
                }
                break;

            case jsb.EventAssetsManager.UPDATE_FAILED:
                /*9更新失败*/
                this._am.downloadFailedAssets();

                this.getfiles("subgame", 1);

                break;

            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                /*10解压失败*/

                break;

        }

        if (needRestart) {
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
            cc.audioEngine.stopAll();
            cc.game.restart();
        }



    },



    checkCb: function (event) {



        console.log("检测执行:" + event.getEventCode());

        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:

                /*0 本地没有配置文件*/


                break;

            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                /*1下载配置文件错误*/


                break;

            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                /*2 解析文件错误*/

                break;

            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                /*3发现新的更新*/

                this.getfiles(this.updateName, 1);



                break;

            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                /*4 已经是最新的*/
                cc.find("Canvas/label").getComponent(cc.Label).string = "已经是最新的了！";
                break;

            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                /*5 最新进展  做 进度的*/




                break;


            case jsb.EventAssetsManager.ASSET_UPDATED:

                /*6需要更新*/

                break;

            case jsb.EventAssetsManager.ERROR_UPDATING:

                /*7更新错误*/

                break;


            case jsb.EventAssetsManager.UPDATE_FINISHED:
                /*8更新完成*/


                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                /*9更新失败*/


                break;

            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                /*10解压失败*/

                break;

        }



    },

    updateName: '',

    download_sub_game: function () {
        this.updateName = 'subgame'
        this.getfiles("subgame", 2);
    },

    download_hall: function () {
        this.updateName = 'hall'
        this.getfiles("hall", 2);
    },

    enter_sub_game: function () {
        if (!this._storagePath) {
            cc.find("Canvas/label").getComponent(cc.Label).string = "请先点击下载游戏，检查版本是否更新！！！";
            return;
        }

        if (jsb.fileUtils.isFileExist(this._storagePath + "/src/main.js")) {
            console.log('main 文件存在');
        } else {
            console.log('main 不文件存在');
        }

        window.require(this._storagePath + "/src/main.js");
    },

    on_create_game: function () {
        cc.loader.loadRes('prefab/game1', cc.Prefab, (err, res) => {
            console.log('game1: =>', res);
            const node = cc.instantiate(res);
            node.parent = this.node;
            node.x = 0;
            node.y = 0;
        });
    },

    on_create_game2: function () {
        cc.loader.loadRes('prefab/game2', cc.Prefab, (err, res) => {
            console.log('game2: =>', res);
            const node = cc.instantiate(res);
            node.parent = this.node;
            node.x = 0;
            node.y = 0;
        });
    },

    endgame(info) {
        if (cc.sys.isBrowser) {
            this.initBrowserCopy();
            this.onBrowserCopyClick(info);
        } else if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod('com.django.game/GameSdk', 'onEndGame', '(Ljava/lang/String;)V', info);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod('AppController', 'backToFlutter');
        }
    },

    //*************************子游戏demo 结束***************************//

    onDestroy: function () {
        console.log('hall => destroy');
    }
});