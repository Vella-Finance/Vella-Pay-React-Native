//
//  VellaPayReactNativeWebviewModule.swift
//  VellaPayReactNativeWebviewModule
//
// 
//

import Foundation

@objc(VellaPayReactNativeWebviewModule)
class VellaPayReactNativeWebviewModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
