//# frida -U -f com.android.camera -l alioth.js --no-pause
console.log("Waiting for Java..");

while (!Java.available) {
    console.log("Java not available yet");
}

console.log("Java available..");

Java.perform(function () {

    console.log("Java perform..");

    Java.use('com.android.camera.module.Camera2Module').isParallelSessionEnable.implementation = function () {
        send("--------------------------------------------------------------------------");
        send("Camera2Module.isParallelSessionEnable==>false");
        send("--------------------------------------------------------------------------");
        return this.isParallelSessionEnable();
    }
    Java.use('com.android.camera.external.mivi.MIVIHelper').requestCloudDataAsync.implementation = function () {
        send("--------------------------------------------------------------------------");
        send("MIVIHelper.requestCloudDataAsync==>NOOP");
        send("--------------------------------------------------------------------------");
    }
    Java.use('com.android.camera.external.mivi.MIVIHelper').setMiViInfo.implementation = function (str) {
        send("--------------------------------------------------------------------------");
        send("MIVIHelper.setMiViInfo==>NOOP");
        send("--------------------------------------------------------------------------");
        stackTrace()
    }
    Java.use('com.android.camera.aftersales.AftersalesManager').checkSelf.implementation = function () {
        send("--------------------------------------------------------------------------");
        send("AftersalesManager.checkSelf==>NOOP");
        send("--------------------------------------------------------------------------");
    }

    var ThreadDef = Java.use('java.lang.Thread');

    var ThreadObj = ThreadDef.$new();


    function stackTrace() {
        var stack = ThreadObj.currentThread().getStackTrace();
        for (var i = 0; i < stack.length; i++) {
            send(i + " => " + stack[i].toString());
        }
        send("--------------------------------------------------------------------------");
    }
























































        // var AliothinDef = Java.use('com.mi.device.Alioth');
    // // var Para = AliothinDef.o00OOO0O;
    // // Para.implementation = function (){
    // //     stackTrace()
    // //     return false;
    // // }
});
