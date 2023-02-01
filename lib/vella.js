"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_webview_1 = require("react-native-webview");
var helper_1 = require("./helper");
var CLOSE_URL = 'close';
var Vella = function (_a, ref) {
    var vellaKey = _a.vellaKey, billingEmail = _a.billingEmail, phone = _a.phone, _b = _a.amount, amount = _b === void 0 ? '0.00' : _b, _c = _a.currency, currency = _c === void 0 ? 'NGNT' : _c, reference = _a.reference, merchantId = _a.merchantId, billingName = _a.billingName, handleWebViewMessage = _a.handleWebViewMessage, onCancel = _a.onCancel, _d = _a.autoStart, autoStart = _d === void 0 ? false : _d, onSuccess = _a.onSuccess, _e = _a.activityIndicatorColor, activityIndicatorColor = _e === void 0 ? '#BF125D' : _e;
    var _f = (0, react_1.useState)(true), isLoading = _f[0], setisLoading = _f[1];
    var _g = (0, react_1.useState)(false), showModal = _g[0], setshowModal = _g[1];
    var webView = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        autoStartCheck();
    }, []);
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        startTransaction: function () {
            setshowModal(true);
        },
        endTransaction: function () {
            setshowModal(false);
        },
    }); });
    var autoStartCheck = function () {
        if (autoStart) {
            setshowModal(true);
        }
    };
    var VellaContent = "   \n      <!DOCTYPE html>\n      <html lang=\"en\">\n        <head>\n          <meta charset=\"UTF-8\">\n          <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n          <title>Vella</title>\n          <script src=\"https://checkout.vella.finance/widget/sdk.js\" type=\"module\" ></script>\n        </head>\n          <body  onload=\"payWithVella()\" style=\"background-color:#fff;height:100vh\">\n         \n            <script type=\"text/javascript\">\n                setTimeout(() => {\n                    payWithVella()\n                }, 1000);\n                function payWithVella() {\n\n                    var refString = '".concat(reference, "';\n                    if (ref === null || ref === \"\" || ref === undefined) {\n                        refString =  GenerateRandStrings(25);\n                    }\n                    const vellaSDK = VellaCheckoutSDK.init('").concat(vellaKey, "', {\n                    email: '").concat(billingEmail, "',\n                    name: '").concat(billingName, "',\n                    amount: ").concat((0, helper_1.getAmountValueInKobo)(amount), ",\n                    currency: '").concat(currency, "',\n                    merchant_id: '").concat(merchantId, "',\n                    reference: refString,\n                    source: \"widget-local-react-native\"\n                    });\n                \n                    vellaSDK.onSuccess(response => {\n                        var resp = {event:'successful', response, transactionRef:response.reference};\n                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))\n                    })\n                    vellaSDK.onError(error => {\n                    console.log(error)\n                    var resp = {event:'error',error};\n                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))\n                    });\n                    vellaSDK.onClose(() => {\n                    console.log(\"closed\")\n                    var resp = {event:'cancelled'};\n                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))\n                    });\n                }\n\n                function GenerateRandStrings(length) {\n                    var result = '';\n                    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';\n                    var charactersLength = characters.length;\n                    for (var i = 0; i < length; i++) {\n                    result += characters.charAt(Math.floor(Math.random() *\n                        charactersLength));\n                    }\n                    return result;\n                }\n            </script> \n          </body>\n      </html> \n      ");
    var messageReceived = function (data) {
        var webResponse = JSON.parse(data);
        if (handleWebViewMessage) {
            handleWebViewMessage(data);
        }
        switch (webResponse.event) {
            case 'cancelled':
                setshowModal(false);
                onCancel({ status: 'cancelled' });
                break;
            case 'error':
                setshowModal(false);
                onCancel({ status: 'error' });
                break;
            case 'successful':
                setshowModal(false);
                var reference_1 = webResponse.transactionRef;
                if (onSuccess) {
                    onSuccess({
                        status: 'success',
                        transactionRef: reference_1,
                        data: webResponse,
                    });
                }
                break;
            default:
                if (handleWebViewMessage) {
                    handleWebViewMessage(data);
                }
                break;
        }
    };
    var onNavigationStateChange = function (state) {
        var url = state.url;
        if (url === CLOSE_URL) {
            setshowModal(false);
        }
    };
    return (<react_native_1.Modal style={{ flex: 1 }} visible={showModal} animationType="slide" transparent={false}>
            <react_native_1.SafeAreaView style={{ flex: 1 }}>
                <react_native_webview_1.WebView style={[{ flex: 1 }]} source={{ html: VellaContent }} onMessage={function (e) {
            var _a;
            messageReceived((_a = e.nativeEvent) === null || _a === void 0 ? void 0 : _a.data);
        }} onLoadStart={function () { return setisLoading(true); }} onLoadEnd={function () { return setisLoading(false); }} onNavigationStateChange={onNavigationStateChange} ref={webView} cacheEnabled={false} cacheMode={'LOAD_NO_CACHE'}/>

                {isLoading && (<react_native_1.View>
                        <react_native_1.ActivityIndicator size="large" color={activityIndicatorColor}/>
                    </react_native_1.View>)}
            </react_native_1.SafeAreaView>
        </react_native_1.Modal>);
};
exports.default = (0, react_1.forwardRef)(Vella);
//# sourceMappingURL=vella.js.map