"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-const */
var helper_1 = require("./helper");
describe('Utility functions work properly', function () {
    test('toNumber should convert string amount to number ', function () {
        var result = (0, helper_1.toNumber)('2500.00');
        expect(result).toBe(2500);
    });
    test('isNegative should return true if amount is negative ', function () {
        var result = (0, helper_1.isNegative)('-200.00');
        expect(result).toBe(true);
        result = (0, helper_1.isNegative)(-200.0);
        expect(result).toBe(true);
        result = (0, helper_1.isNegative)(200.0);
        expect(result).toBe(false);
    });
});
//# sourceMappingURL=utils.test.js.map