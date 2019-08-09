package com.vng.BaseProjectAppToApp.zpmodule;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import vn.zalopay.sdk.ZaloPayErrorCode;
import vn.zalopay.sdk.ZaloPayListener;
import vn.zalopay.sdk.ZaloPaySDK;

public class ZPModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mReactContext;

    ZaloPayListener listener = new ZaloPayListener() {
        @Override
        public void onPaymentSucceeded(String transactionId, String zpTranstoken) {
            WritableMap params = Arguments.createMap();
            params.putString("transactionId", transactionId);
            params.putString("zpTranstoken", zpTranstoken);
            params.putString("returnCode", "1");
            sendEvent(mReactContext, "EventPayZalo", params);
        }

        @Override
        public void onPaymentError(ZaloPayErrorCode errorCode, int paymentErrorCode, String zpTranstoken) {
            WritableMap params = Arguments.createMap();

            params.putString("returnCode", "" + errorCode.getValue());
            params.putString("zpTranstoken", "" + zpTranstoken);
            sendEvent(mReactContext, "EventPayZalo", params);
        }
    };

//    ZaloPayListener listener = new ZaloPayListener() {
//        @Override
//        public void onPaymentSucceeded(String zpTranstoken) {
//            WritableMap params = Arguments.createMap();
//            params.putString("errorCode", "1");
//            sendEvent(mReactContext, "EventPayZalo", params);
//        }
//
//        @Override
//        public void onPaymentError(ZaloPayErrorCode zaloPayErrorCode, int paymentErrorCode) {
//            WritableMap params = Arguments.createMap();
//            params.putString("errorCode", "" + paymentErrorCode);
//            sendEvent(mReactContext, "EventPayZalo", params);
//        }
//    };

    BaseActivityEventListener activityEventListener = new BaseActivityEventListener(){
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            ZaloPaySDK.getInstance().onActivityResult(requestCode, resultCode, data);
        }
    };

    public ZPModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        reactContext.addActivityEventListener(activityEventListener);
    }

    @Override
    public String getName() {
        return "PayZaloBridge";
    }

    @ReactMethod
    public void payOrder(String zpTransToken) {
        Activity currentActivity = getCurrentActivity();
        ZaloPaySDK.getInstance().payOrder(currentActivity, zpTransToken, listener);
    }

    @ReactMethod
    public void initZPDK(int appId) {
        Log.d("zpmodule", "initZPDK " + appId);
        ZaloPaySDK.getInstance().initWithAppId(appId);
    }

    private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


}
