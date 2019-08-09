//
//  PayZaloBridge.m
//  EsaleMobile
//
//  Created by Mr. Jery on 7/25/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "PayZaloBridge.h"
#import <zpdk/zpdk/zpdk.h>

@interface PayZaloBridge () <ZaloPaySDKDelegate>

@end

@implementation PayZaloBridge

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"EventPayZalo"];
}

RCT_EXPORT_METHOD(payOrder:
                  (NSString *)zpTransToken) {
  [ZaloPaySDK sharedInstance].delegate = self;
  [[ZaloPaySDK sharedInstance] payOrder:zpTransToken];
}

RCT_EXPORT_METHOD(initZPDK: (int) appId) {
  [[ZaloPaySDK sharedInstance] initWithAppId:appId]; // khởi tạo ZPDK
}

- (void)zalopayCompleteWithErrorCode:(ZPErrorCode)errorCode transactionId:(NSString *)transactionId zpTranstoken:(NSString*)zptranstoken {
  NSLog(@"pay bill complete code = %ld transid = %@ zpTranstoken =%@",
        (long)errorCode, transactionId, zptranstoken);
  if(errorCode == ZPErrorCode_Success) {
    [self sendEventWithName:@"EventPayZalo" body:@{@"returnCode": [NSString stringWithFormat:@"%ld", (long)errorCode], @"transactionId":transactionId, @"zpTranstoken":zptranstoken}];
  } else {
    [self sendEventWithName:@"EventPayZalo" body:@{@"returnCode": [NSString stringWithFormat:@"%ld", (long)errorCode]}];
  }
}

@end
