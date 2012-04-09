package jp.unity3d.mapview5;

import android.app.Activity;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.FrameLayout;

import com.unity3d.player.UnityPlayer;

public class ExtendedUnityPlayerActivity extends Activity
{
    private UnityPlayer mUnityPlayer;

    private WebView mWebView;

    // UnityPlayer.init() should be called before attaching the view to a layout. 
    // UnityPlayer.quit() should be the last thing called; it will terminate the process and not return.
    protected void onCreate (Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        setTheme(android.R.style.Theme_NoTitleBar_Fullscreen);
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        mUnityPlayer = new UnityPlayer(this);

        if (mUnityPlayer.getSettings ().getBoolean ("hide_status_bar", true))
            getWindow ().setFlags (WindowManager.LayoutParams.FLAG_FULLSCREEN,
                                   WindowManager.LayoutParams.FLAG_FULLSCREEN);

        int glesMode = mUnityPlayer.getSettings().getInt("gles_mode", 1);
        boolean trueColor8888 = false;
        mUnityPlayer.init(glesMode, trueColor8888);

        View playerView = mUnityPlayer.getView();
        setContentView(playerView);

        /* -- mapview5 -- */
        mWebView = new WebView(this);
        mWebView.getSettings().setJavaScriptEnabled(true);

        FrameLayout layout = new FrameLayout(this);
        addContentView(layout, new ViewGroup.LayoutParams(-1, -1));
        layout.addView(mWebView, new FrameLayout.LayoutParams(-1, -1, Gravity.NO_GRAVITY));

        mWebView.setVisibility(View.GONE);
        /* -- mapview5 -- */

        playerView.requestFocus();
    }
    protected void onDestroy ()
    {
        super.onDestroy();
        mUnityPlayer.quit();
    }

    /* -- mapview5 -- */
    public void showMap(final int leftMargin, final int topMargin, final int rightMargin, final int bottomMargin, final double latitude, final double longtitude) {
        runOnUiThread(new Runnable() {
            public void run() {
                mWebView.loadUrl("http://maps.google.com/?ll=" + latitude + "," + longtitude + "&spn=0.01,0.01&z=19");

                FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(-1, -1, Gravity.NO_GRAVITY);
                params.setMargins(leftMargin, topMargin, rightMargin, bottomMargin);
                mWebView.setLayoutParams(params);

                mWebView.setVisibility(View.VISIBLE);
            }
        });
    }
    public void hideMap() {
        runOnUiThread(new Runnable() {
            public void run() {
                mWebView.setVisibility(View.GONE);
            }
        });
    }
    /* -- mapview5 -- */

    // onPause()/onResume() must be sent to UnityPlayer to enable pause and resource recreation on resume.
    protected void onPause()
    {
        super.onPause();
        mUnityPlayer.pause();
    }
    protected void onResume()
    {
        super.onResume();
        mUnityPlayer.resume();
    }
    public void onConfigurationChanged(Configuration newConfig)
    {
        super.onConfigurationChanged(newConfig);
        mUnityPlayer.configurationChanged(newConfig);
    }
    public void onWindowFocusChanged(boolean hasFocus)
    {
        super.onWindowFocusChanged(hasFocus);
        mUnityPlayer.windowFocusChanged(hasFocus);
    }

    // Pass any keys not handled by (unfocused) views straight to UnityPlayer
    public boolean onKeyDown(int keyCode, KeyEvent event)
    {
        return mUnityPlayer.onKeyDown(keyCode, event);
    }
    public boolean onKeyUp(int keyCode, KeyEvent event)
    {
        return mUnityPlayer.onKeyUp(keyCode, event);
    }
}
