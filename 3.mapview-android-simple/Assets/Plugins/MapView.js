#pragma strict

import System.Runtime.InteropServices;

#if UNITY_ANDROID && !UNITY_EDITOR

static function Show() {
    var uriString = "geo:35.669221,139.74?z=20";
    
    // uri = Uri.parse(uriString);
    var uriClass = AndroidJavaClass("android.net.Uri");
    var uri = uriClass.CallStatic.<AndroidJavaObject>("parse", uriString);
    
    // Intent intent = new Intent(android.content.Intent.ACTION_VIEW, uri);
    var intent = AndroidJavaObject("android.content.Intent", "android.intent.action.VIEW", uri);
    
    // UnityPlayer.currentActivity.startActivity(intent);
    var unityPlayerClass = AndroidJavaClass("com.unity3d.player.UnityPlayer");
    var currentActivity = unityPlayerClass.GetStatic.<AndroidJavaObject>("currentActivity");
    currentActivity.Call("startActivity", intent);
}

#else 

static function Show() {
    Debug.Log("Not implemented.");
}

#endif