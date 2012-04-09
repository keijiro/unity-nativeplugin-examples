#pragma strict

import System.Runtime.InteropServices;

#if UNITY_IPHONE && !UNITY_EDITOR

@DllImportAttribute("__Internal") static private function MapViewShow() {}

static function Show() {
    MapViewShow();
}

#else 

static function Show() {
    Debug.Log("Not implemented.");
}

#endif
