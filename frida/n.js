//# frida -U -f com.android.camera -l n.js --no-pause
//https://codeshare.frida.re/@dzonerzy/whereisnative/
Java.perform(function () {

    var SystemDef = Java.use('java.lang.System');

    var RuntimeDef = Java.use('java.lang.Runtime');

    var exceptionClass = Java.use('java.lang.Exception');

    var SystemLoad_1 = SystemDef.load.overload('java.lang.String');

    var SystemLoad_2 = SystemDef.loadLibrary.overload('java.lang.String');

    var RuntimeLoad_1 = RuntimeDef.load.overload('java.lang.String');

    var RuntimeLoad_2 = RuntimeDef.loadLibrary.overload('java.lang.String');

    var ThreadDef = Java.use('java.lang.Thread');

    var ThreadObj = ThreadDef.$new();

    SystemLoad_1.implementation = function (library) {
        send("Loading dynamic library 1=> " + library);
        stackTrace();
        try {
            return SystemLoad_1.call(this, library);
        } catch (err) {
            // should catch here the ArithmeticException...
            console.log("CATCHED!\n" + err.stack);
            throw err;
        }
    }

    SystemLoad_2.implementation = function (library) {
        send("Loading dynamic library 2=> " + library);
        stackTrace();
        try {
            SystemLoad_2.call(this, library);
        } catch (err) {
            // should catch here the ArithmeticException...
            console.log("CATCHED!\n" + err.stack);
            throw err;
        }
        return;
    }

    RuntimeLoad_1.implementation = function (library) {
        send("Loading dynamic library 3=> " + library);
        stackTrace();
        RuntimeLoad_1.call(this, library);
        return;
    }

    RuntimeLoad_2.implementation = function (library) {
        send("Loading dynamic library 4=> " + library);
        stackTrace();
        RuntimeLoad_2.call(this, library);
        return;
    }

    function stackTrace() {
        var stack = ThreadObj.currentThread().getStackTrace();
        for (var i = 0; i < stack.length; i++) {
            send(i + " => " + stack[i].toString());
        }
        send("--------------------------------------------------------------------------");
    }

});