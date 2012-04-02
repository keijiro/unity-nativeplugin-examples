#import <Foundation/Foundation.h>

#if 0

extern "C" int PluginTest_function(int a, int b) {
    return a + b;
}

#else

int PluginTest_result;

extern "C" void PluginTest_function(int a, int b) {
    PluginTest_result = a + b;
}

#endif
