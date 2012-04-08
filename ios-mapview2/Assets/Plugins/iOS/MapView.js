#pragma strict

import System.Runtime.InteropServices;

#if UNITY_IPHONE && !UNITY_EDITOR

@StructLayout(LayoutKind.Sequential)
class MapViewOptions {
    @MarshalAs(UnmanagedType.ByValArray, SizeConst = 4)
    var _margins : int[];

    var _latitude : double;
    var _longtitude : double;

    function MapViewOptions(margins : int[], latitude : double, longtitude : double) {
        _margins = margins;
        _latitude = latitude;
        _longtitude = longtitude;
    }
}

@DllImportAttribute("__Internal") static private function MapViewShow(options : MapViewOptions) : System.IntPtr {}
@DllImportAttribute("__Internal") static private function MapViewHide(view : System.IntPtr) {}

static var view : System.IntPtr;

static function Show(margins : int[], latitude : double, longtitude : double) {
    if (view == System.IntPtr.Zero) {
        view = MapViewShow(new MapViewOptions(margins, latitude, longtitude));
    }
}

static function Hide() {
    if (view != System.IntPtr.Zero) {
        MapViewHide(view);
        view = System.IntPtr.Zero;
    }
}

#elif UNITY_ANDROID && !UNITY_EDITOR

static function Show(margins : int[], latitude : double, longtitude : double) {
    var uriString = "geo:" + latitude + "," + longtitude + "?z=20";
    // uri = Uri.parse(uriString);
    var uriClass = AndroidJavaClass("android.net.Uri");
    var uri = uriClass.CallStatic.<AndroidJavaObject>("parse", uriString);
    // Intent intent = new Intent(android.content.Intent.ACTION_VIEW, uri);
    var intent = AndroidJavaObject("android.content.Intent", "android.intent.action.VIEW", uri);
    // UnityPlayer.currentActivity.startActivity(intent);
    var unityPlayerClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
    var currentActivity = unityPlayerClass.GetStatic.<AndroidJavaObject>("currentActivity");
    currentActivity.Call("startActivity", intent);
}

static function Hide() {
    Debug.Log("Not implemented.");
}

#else

static function Show(margins : int[], latitude : double, longtitude : double) {
    Debug.Log("Not implemented.");
}

static function Hide() {
    Debug.Log("Not implemented.");
}

#endif
