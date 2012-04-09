package jp.unity3d.mapview4;

import android.app.Activity;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.FrameLayout;

public class MapViewPlugin {
    public static WebView mWebView;
    
    public static void showMapView(final int leftMargin, final int topMargin, final int rightMargin, final int bottomMargin, final double latitude, final double longtitude, final Activity activity) {
        activity.runOnUiThread(new Runnable() {
            public void run() {
                if (mWebView == null) {
                    mWebView = new WebView(activity);
                    
                    WebSettings webSettings = mWebView.getSettings();
                    webSettings.setJavaScriptEnabled(true);
                    
                    FrameLayout layout = new FrameLayout(activity);
                    activity.addContentView(layout, new ViewGroup.LayoutParams(-1, -1));
                    
                    FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(-1, -1, Gravity.NO_GRAVITY);
                    params.setMargins(leftMargin, topMargin, rightMargin, bottomMargin);
                    layout.addView(mWebView, params);
                } else {
                    mWebView.setVisibility(View.VISIBLE);
                }
                mWebView.loadUrl("http://maps.google.com/?ll=" + latitude + "," + longtitude + "&spn=0.01,0.01&z=19");
            }
        });
    }
    
    public static void hideMapView(final Activity activity) {
        activity.runOnUiThread(new Runnable() {
            public void run() {
                if (mWebView != null) mWebView.setVisibility(View.GONE);
            }
        });
    }
}
