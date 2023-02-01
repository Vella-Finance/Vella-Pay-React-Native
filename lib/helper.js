"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannels = exports.getAmountValueInKobo = exports.toAmountInKobo = exports.toString = exports.toNumber = exports.isNegative = exports.isValidDecimalMonetaryValue = exports.isValidStringAmount = void 0;
var validator_1 = __importDefault(require("validator"));
var isDecimal = validator_1.default.isDecimal, isFloat = validator_1.default.isFloat, isInt = validator_1.default.isInt, toFloat = validator_1.default.toFloat, toInt = validator_1.default.toInt;
function isNumber(value) {
    return typeof value === 'number';
}
function isString(value) {
    return typeof value === 'string';
}
function isValidStringAmount(stringAmount) {
    if (isString(stringAmount) && (stringAmount === null || stringAmount === void 0 ? void 0 : stringAmount.endsWith('.'))) {
        return false;
    }
    return isDecimal(stringAmount);
}
exports.isValidStringAmount = isValidStringAmount;
function isValidDecimalMonetaryValue(amountValue) {
    if (!isNumber(amountValue) && !isString(amountValue)) {
        return false;
    }
    return isNumber(amountValue) || isValidStringAmount(amountValue);
}
exports.isValidDecimalMonetaryValue = isValidDecimalMonetaryValue;
function isNegative(amountValue) {
    if (typeof amountValue === 'string') {
        return amountValue.startsWith('-');
    }
    return amountValue < 0;
}
exports.isNegative = isNegative;
function toNumber(string) {
    if (isFloat(string)) {
        return toFloat(string);
    }
    if (isInt(string)) {
        return toInt(string);
    }
    return +string;
}
exports.toNumber = toNumber;
function toString(amountValue) {
    return isNumber(amountValue) ? amountValue.toString() : amountValue;
}
exports.toString = toString;
function toAmountInKobo(amountValue) {
    if (typeof amountValue === 'string') {
        return toNumber(amountValue);
    }
    return amountValue;
}
exports.toAmountInKobo = toAmountInKobo;
var getAmountValueInKobo = function (amount) {
    if (isValidDecimalMonetaryValue(amount)) {
        return toAmountInKobo(amount);
    }
    return 0;
};
exports.getAmountValueInKobo = getAmountValueInKobo;
var getChannels = function (channelsArrary) {
    if ((channelsArrary === null || channelsArrary === void 0 ? void 0 : channelsArrary.length) > 0) {
        var channelsString = JSON.stringify(channelsArrary);
        return "channels: ".concat(channelsString, ",");
    }
    return '';
};
exports.getChannels = getChannels;
//# sourceMappingURL=helper.js.map