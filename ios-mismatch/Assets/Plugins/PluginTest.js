#pragma strict

import System.Runtime.InteropServices;

#if UNITY_IPHONE && !UNITY_EDITOR

@DllImportAttribute("__Internal") static private function PluginTest_function(a : int, b : int) : int {}

static function TestFunction(a : int, b : int) : int {
    return PluginTest_function(a, b);
}

#else 

static function TestFunction(a : int, b : int) : int {
    return a + b;
}

#endif