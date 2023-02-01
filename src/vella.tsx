import * as React from 'react'
import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { Modal, View, ActivityIndicator, SafeAreaView } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { getAmountValue } from './helper';
import { VellaProps } from './types';

const CLOSE_URL = 'close';

const Vella: React.ForwardRefRenderFunction<React.ReactNode, VellaProps> = (
    {
        vellaKey,
        billingEmail,
        phone,
        amount = '0.00',
        currency = 'NGNT',
        reference,
        merchantId,
        billingName,
        handleWebViewMessage,
        onCancel,
        autoStart = false,
        onSuccess,
        activityIndicatorColor = '#BF125D',
    },
    ref,
) => {
    const [isLoading, setisLoading] = useState(true);
    const [showModal, setshowModal] = useState(false);
    const webView = useRef(null);

    useEffect(() => {
        autoStartCheck();
    }, []);

    useImperativeHandle(ref, () => ({
        startTransaction() {
            setshowModal(true);
        },
        endTransaction() {
            setshowModal(false);
        },
    }));

    const autoStartCheck = () => {
        if (autoStart) {
            setshowModal(true);
        }
    };



    const VellaContent = `   
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vella</title>
          <script src="https://checkout.vella.finance/widget/sdk.js" type="module" ></script>
        </head>
          <body  onload="payWithVella()" style="background-color:#fff;height:100vh">
         
            <script type="text/javascript">
                setTimeout(() => {
                    payWithVella()
                }, 1000);
                function payWithVella() {

                    var refString = '${reference}';
                    if (refString === null || refString === "" || refString === undefined) {
                        refString =  GenerateRandStrings(25);
                    }
                    const vellaSDK = VellaCheckoutSDK.init('${vellaKey}', {
                    email: '${billingEmail}',
                    name: '${billingName}',
                    amount: ${getAmountValue(amount)},
                    currency: '${currency}',
                    merchant_id: '${merchantId}',
                    reference: refString,
                    source: "widget-local-react-native"
                    });
                
                    vellaSDK.onSuccess(response => {
                        var resp = {event:'successful', response, transactionRef:response.reference};
                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                    })
                    vellaSDK.onError(error => {
                    console.log(error)
                    var resp = {event:'error',error};
                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                    });
                    vellaSDK.onClose(() => {
                    console.log("closed")
                    var resp = {event:'cancelled'};
                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                    });
                }

                function GenerateRandStrings(length) {
                    var result = '';
                    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var charactersLength = characters.length;
                    for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() *
                        charactersLength));
                    }
                    return result;
                }
            </script> 
          </body>
      </html> 
      `;

    const messageReceived = (data: string) => {
        const webResponse = JSON.parse(data);
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
                const reference = webResponse.transactionRef;

                if (onSuccess) {
                    onSuccess({
                        status: 'success',
                        transactionRef: reference,
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

    const onNavigationStateChange = (state: WebViewNavigation) => {
        const { url } = state;
        if (url === CLOSE_URL) {
            setshowModal(false);
        }
    };

    return (
        <Modal style={{ flex: 1 }} visible={showModal} animationType="slide" transparent={false}>
            <SafeAreaView style={{ flex: 1 }}>
                <WebView
                    style={[{ flex: 1 }]}
                    source={{ html: VellaContent }}
                    onMessage={(e) => {
                        messageReceived(e.nativeEvent?.data);
                    }}
                    onLoadStart={() => setisLoading(true)}
                    onLoadEnd={() => setisLoading(false)}
                    onNavigationStateChange={onNavigationStateChange}
                    ref={webView}
                    cacheEnabled={false}
                    cacheMode={'LOAD_NO_CACHE'}
                />

                {isLoading && (
                    <View>
                        <ActivityIndicator size="large" color={activityIndicatorColor} />
                    </View>
                )}
            </SafeAreaView>
        </Modal>
    );
};

export default forwardRef(Vella);




