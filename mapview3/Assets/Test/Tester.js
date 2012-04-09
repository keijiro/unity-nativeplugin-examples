#pragma strict

private var toggle = false;

function Update () {
    if (Input.GetMouseButtonDown(0)) {
        if (toggle) {
            MapView.Hide();
        } else {
            MapView.Show([32, 32, 32, 200], 35.669221, 139.74);
        }
        toggle = !toggle;
    }
}