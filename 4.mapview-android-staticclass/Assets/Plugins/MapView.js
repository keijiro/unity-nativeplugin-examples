#pragma strict

#if UNITY_ANDROID && !UNITY_EDITOR

static function Show(margins : int[], latitude : double, longtitude : double) {
    // Reference to UnityPlayer.currentActivity
    var unityPlayerClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
    var currentActivity = unityPlayerClass.GetStatic.<AndroidJavaObject>("currentActivity");

    // Call MapViewPlugin.showMapView
    var plugin = AndroidJavaClass("jp.unity3d.mapview4.MapViewPlugin");
    plugin.CallStatic("showMapView", margins[0], margins[1], margins[2], margins[3], latitude, longtitude, currentActivity);
}

static function Hide() {
    // Reference to UnityPlayer.currentActivity
    var unityPlayerClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
    var currentActivity = unityPlayerClass.GetStatic.<AndroidJavaObject>("currentActivity");

    // Call MapViewPlugin.hideMapView
    var plugin = AndroidJavaClass("jp.unity3d.mapview4.MapViewPlugin");
    plugin.CallStatic("hideMapView", currentActivity);
}

#else

static function Show(margins : int[], latitude : double, longtitude : double) {
    Debug.Log("Not implemented.");
}

static function Hide() {
    Debug.Log("Not implemented.");
}

#endif
