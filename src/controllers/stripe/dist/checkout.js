"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_stripe_js_1 = require("@stripe/react-stripe-js");
var stripe_js_1 = require("@stripe/stripe-js");
var react_bootstrap_1 = require("react-bootstrap");
var axios_1 = require("axios");
var stripePK = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
var cardElementOptions = {
    hidePostalCode: true
};
var stripePromise = stripe_js_1.loadStripe(stripePK);
var App = function () {
    return (react_1["default"].createElement(react_stripe_js_1.Elements, { stripe: stripePromise },
        react_1["default"].createElement(CheckoutForm, null)));
};
function CheckoutForm(_a) {
    var _this = this;
    var _b = react_1.useState(false), isPaymentLoading = _b[0], setPaymentLoading = _b[1];
    var _c = react_1.useState(false), showPaymentModal = _c[0], setShowPaymentModal = _c[1];
    var _d = react_1.useState(function () { return ({ fullName: "", email: "" }); }), paymentForm = _d[0], setPaymentForm = _d[1];
    var stripe = react_stripe_js_1.useStripe();
    var elements = react_stripe_js_1.useElements();
    var createPaymentIntents = function (params) { return __awaiter(_this, void 0, void 0, function () {
        var cardElement, _a, paymentMethod, error, data, result, confirmedCardPayment, confirmedCardSetup;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cardElement = elements === null || elements === void 0 ? void 0 : elements.getElement(react_stripe_js_1.CardElement);
                    return [4 /*yield*/, (stripe === null || stripe === void 0 ? void 0 : stripe.createPaymentMethod({
                            type: "card",
                            card: cardElement,
                            billing_details: {
                                name: "Darryl Fabian",
                                email: "mailmail@mailnesia.com"
                            }
                        }))];
                case 1:
                    _a = (_b.sent()), paymentMethod = _a.paymentMethod, error = _a.error;
                    return [4 /*yield*/, axios_1["default"]({
                            method: "POST",
                            baseURL: "http://localhost:3000",
                            url: "/v1/products/purchase",
                            headers: {
                                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZlcmVuY2VJZCI6IjhlZjNkNjNmLWI0YWMtNGM4YS05MTJkLTI4NWQyZTEyMzg2MSIsInRva2VuVHlwZSI6IlNJR05fSU4iLCJpYXQiOjE2MTEzMTQ4MjEsImV4cCI6MTYxMTMyMjAyMX0.Fa4Rg6_ilsGbUTRLMIKGAlF_LhwaKIPerflNsTStT48"
                            },
                            // url: "/api/stripe/customers",
                            data: {
                                productId: "92dec9d5-bb9d-4502-a01e-f4ccc739eec0",
                                // amount: 7 * 10 0,
                                paymentMethodId: paymentMethod.id,
                                keepCardDetails: true
                            }
                        })];
                case 2:
                    data = (_b.sent()).data;
                    result = data.result;
                    console.log('dataxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx :>> ', result);
                    return [4 /*yield*/, (stripe === null || stripe === void 0 ? void 0 : stripe.confirmCardPayment(result.payment.id, {
                            payment_method: paymentMethod.id
                        }))];
                case 3:
                    confirmedCardPayment = _b.sent();
                    console.log('confirmedCxxxxxxxxxxxxardPayment :>> ', confirmedCardPayment);
                    return [4 /*yield*/, (stripe === null || stripe === void 0 ? void 0 : stripe.confirmCardSetup(result.intentSecret.client_secret, {
                            payment_method: {
                                card: cardElement
                            }
                        }))];
                case 4:
                    confirmedCardSetup = _b.sent();
                    console.log('confirmedCxxxxxxxxxxxxardPayment :>> ', confirmedCardSetup);
                    return [2 /*return*/];
            }
        });
    }); };
    var handlePaymentFormSubmitButton = function () {
        console.log('paymentForm :>> ', paymentForm);
        createPaymentIntents(paymentForm);
    };
    var handlePaymentForm = function (params) {
        setPaymentForm(function (previousValue) { return (__assign(__assign({}, previousValue), params)); });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_bootstrap_1.Button, { onClick: function () { return setShowPaymentModal(true); } }, "Show Modal"),
        "Hello world",
        react_1["default"].createElement(react_bootstrap_1.Modal, { show: showPaymentModal, onHide: function () { return setShowPaymentModal(false); }, backdrop: "static", keyboard: false },
            react_1["default"].createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1["default"].createElement(react_bootstrap_1.Modal.Title, null, "Modal title")),
            react_1["default"].createElement(react_bootstrap_1.Modal.Body, null,
                react_1["default"].createElement(react_bootstrap_1.Form.Group, null,
                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Full Name"),
                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { placeholder: "Full Name", value: paymentForm.fullName, onChange: function (e) { return handlePaymentForm({ fullName: e.target.value }); } })),
                react_1["default"].createElement(react_bootstrap_1.Form.Group, null,
                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Email address"),
                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { placeholder: "Email Address", value: paymentForm.email, onChange: function (e) { return handlePaymentForm({ email: e.target.value }); } })),
                react_1["default"].createElement(react_bootstrap_1.Form.Group, null,
                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Complete Address"),
                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { placeholder: "Complete Address" })),
                react_1["default"].createElement("div", { style: { border: "1px solid #ced4da", padding: "10px", borderRadius: "5px" } },
                    react_1["default"].createElement(react_stripe_js_1.CardElement, { options: {
                            iconStyle: "solid",
                            hidePostalCode: true,
                            style: {
                                base: {}
                            }
                        } }))),
            react_1["default"].createElement(react_bootstrap_1.Modal.Footer, null,
                react_1["default"].createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: function () { return setShowPaymentModal(false); } }, "Close"),
                react_1["default"].createElement(react_bootstrap_1.Button, { variant: "primary", onClick: handlePaymentFormSubmitButton }, "Save changes")))));
}
exports["default"] = App;
