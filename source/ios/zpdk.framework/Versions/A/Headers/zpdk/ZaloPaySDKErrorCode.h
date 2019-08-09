//
//  ZaloPaySDKErrorCode.h
//  zpdk
//
//  Created by bonnpv on 11/30/16.
//  Copyright © 2016 VNG. All rights reserved.
//

#ifndef ZaloPaySDKErrorCode_h
#define ZaloPaySDKErrorCode_h

typedef enum : NSInteger {
    ZPErrorCode_Success         = 1,
    ZPErrorCode_NotInstall      = -1,
    ZPErrorCode_InvalidResponse = -2,
    ZPErrorCode_InvalidOrder    = -3,
    ZPErrorCode_UserCancel      = -4,
    ZPErrorCode_Fail            = -5,
} ZPErrorCode;

typedef enum : NSInteger {
    ZPLinkingErrorCode_Success         = 1,
    //    ZPLinkingErrorCode_NotInstall      = -1,
    //    ZPLinkingErrorCode_InvalidResponse = -2,
    //    ZPLinkingErrorCode_InvalidOrder    = -3,
    ZPLinkingErrorCode_UserCancel      = -4,
    ZPLinkingErrorCode_Fail            = -5,
    ZPLinkingErrorCode_Processing      = -6
} ZPLinkingErrorCode;

typedef struct {
    ZPLinkingErrorCode error;
    NSString *  errorMessage;
} ZPLinkingResponse;


#endif /* ZaloPaySDKErrorCode_h */
