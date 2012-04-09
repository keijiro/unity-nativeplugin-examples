#pragma strict

function Update () {
    if (Input.GetMouseButtonDown(0)) {
        var text = "";
        for (var i = 0; i <= 10; i++) {
            text += PluginTest.TestFunction(100, i) + " ";
        }
        Debug.Log(text);
    }
}