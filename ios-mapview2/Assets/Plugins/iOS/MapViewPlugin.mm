#import <Foundation/Foundation.h>
#import <MapKit/MapKit.h>

struct Options {
    int margins[4];
    double latitude;
    double longtitude;
};

extern UIViewController *UnityGetGLViewController();

extern "C" UIView *MapViewShow(Options *options) {
    UIView *rootView = UnityGetGLViewController().view;
    
    CGRect frame = rootView.frame;
    frame.origin.x += options->margins[0];
    frame.origin.y += options->margins[1];
    frame.size.width -= options->margins[0] + options->margins[2];
    frame.size.height -= options->margins[1] + options->margins[3];
    
    MKMapView *mapView = [[MKMapView alloc] initWithFrame:frame];
    [rootView addSubview:mapView];

    [mapView setRegion:MKCoordinateRegionMake(CLLocationCoordinate2DMake(options->latitude, options->longtitude), MKCoordinateSpanMake(0.01, 0.01)) animated:YES];
    return mapView;
}

extern "C" void MapViewHide(UIView *view) {
    [view removeFromSuperview];
    [view release];
}
