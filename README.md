# VellaPay React Native 
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-) 

 

Accept payment using Vella Checkout widget for react native

### [](https://github.com/vella-finance/vella-pay-react-native#installation) Installation

Add VellaPay React Native to your project by running;

```bash
npm install vella-pay-react-native
```

or

```bash
yarn add vella-pay-react-native
```





<img width="306" alt="Screenshot of library in action" src="https://user-images.githubusercontent.com/41248079/126550307-5f12c6d8-81af-4f26-951b-5d6514304022.png">

### [](https://github.com/vella-finance/vella-pay-react-native#usage) Usage 1 - Autoload Widget

```javascript
import React from 'react';
import  { Vella, VellaProps } from 'vella-pay-react-native'
import { View } from 'react-native';

function Pay() {
  return (
    <View style={{ flex: 1 }}>
      <Vella  
        vellaKey="your-vella-key-here"
        amount={'25000.00'}
        currency={'NGN'}
        billingEmail="example@mail.com"
        billingName="Tade Ogidan"
        merchantId="your-vella-tag"
        reference="PW-XXXX-XXX-XXXX-XXX"
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        autoStart={true}
      />
    </View>
  );
}
```

## Usage 2 - Using  Button

Make use of a `ref` to start transaction. See example below;

```javascript
import React, { useRef } from 'react';
import { View, TouchableOpacity,Text } from 'react-native';
import  { Vella, VellaProps } from 'vella-pay-react-native'


function App(){

  const vellaWebViewRef = useRef<VellaProps.VellaRef>(); 
  return (
    <View style={{flex: 1}}>
      <Vella  
        vellaKey="your-vella-key-here"
        amount={'25000.00'}
        currency={'NGN'}
        billingEmail="example@mail.com"
        billingName="Tade Ogidan"
        merchantId="your-vella-tag"
        reference="PW-XXXX-XXX-XXXX-XXX"
        activityIndicatorColor="green"
        autoStart={false}
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        ref={vellaWebViewRef}
      />

        <TouchableOpacity onPress={()=> vellaWebViewRef.current.startTransaction()}>
          <Text>Buy this</Text>
        </TouchableOpacity>
      </View>
  );
}
```



#### VellaPay React Native WebView API

| Name                                 |                                                                                           use/description                                                                                           |                                                      default |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------------: |
| `vellaKey`                        |                                                                   vella key (visit app.vella.finance to get yours)                                                                   |                                                     `nill` |
| `amount`                             |                                                                                          Amount to be paid                                                                                          |                                                     `nill` |
| `activityIndicatorColor`             |                                                                                           color of loader                                                                                           |                                            `green` |
| `billingEmail (required)` |                                                                                            Billers email                                                                                            |                                             `nill` |
| `billingMobile (optional)`                      |                                                                                           Billers mobile                                                                                            |                                             `nill` |
| `billingName  (required)`                        |                                                                                            Billers Name                                                                                             |                                             `nill` |
| `onCancel`                           |               callback function if user cancels,close or payment transaction could not be verified. In a case of not being verified, transactionRef number is also returned in the callback               |                                             `nill` |
| `onSuccess`                          |                                    callback function if transaction was successful and verified (it will also return the transactionRef in the callback )                                    |                                             `nill` |
| `autoStart`                          |                                                                               Auto start payment once page is opened                                                                                |                                            `false` |
| `reference`                          |                                                                         Payment Reference , if you have already generated one                                                                         |  `'auto-generated` |
| `handleWebViewMessage`               |                                                                          Will be called when a WebView receives a message                                                                           |                                             `true` |





### [](https://github.com/vella-finance/vella-pay-react-native#security) Security
If you discover any security related issues, please email hello@vella.finance instead of using the issue tracker.

