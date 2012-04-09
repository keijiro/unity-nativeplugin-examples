#pragma strict

#if UNITY_ANDROID && !UNITY_EDITOR

static function Show(margins : int[], latitude : double, longtitude : double) {
    var unityPlayerClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
    var currentActivity = unityPlayerClass.GetStatic.<AndroidJavaObject>("currentActivity");
    currentActivity.Call("showMap", margins[0], margins[1], margins[2], margins[3], latitude, longtitude);
}

static function Hide() {
    var unityPlayerClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
    var currentActivity = unityPlayerClass.GetStatic.<AndroidJavaObject>("currentActivity");
    currentActivity.Call("hideMap");
}

#else

static function Show(margins : int[], latitude : double, longtitude : double) {
    Debug.Log("Not implemented.");
}

static function Hide() {
    Debug.Log("Not implemented.");
}

#endif
