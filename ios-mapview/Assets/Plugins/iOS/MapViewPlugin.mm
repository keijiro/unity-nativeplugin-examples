#import <Foundation/Foundation.h>
#import <MapKit/MapKit.h>

extern UIViewController *UnityGetGLViewController();

extern "C" void MapViewShow() {
    UIView *rootView = UnityGetGLViewController().view;
    [rootView addSubview:[[MKMapView alloc] initWithFrame:rootView.frame]];
}
