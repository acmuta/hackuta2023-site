"use strict";
exports.id = 7839;
exports.ids = [7839];
exports.modules = {

/***/ 27839:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sendEmail)
/* harmony export */ });
/* harmony import */ var _sendgrid_mail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72096);
/* harmony import */ var _sendgrid_mail__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sendgrid_mail__WEBPACK_IMPORTED_MODULE_0__);

const { SENDGRID_API_KEY: apiKey  } = process.env;
if (!apiKey) {
    throw new Error('Invalid/Missing environment variable: "SENDGRID_API_KEY"');
}
_sendgrid_mail__WEBPACK_IMPORTED_MODULE_0___default().setApiKey(apiKey);
// logger.info('[email] backend: SendGrid')
async function sendEmail(opts) {
    return _sendgrid_mail__WEBPACK_IMPORTED_MODULE_0___default().send({
        from: {
            email: opts.fromEmail,
            name: opts.fromName || undefined
        },
        replyTo: opts.replyToEmail ? {
            email: opts.replyToEmail,
            name: opts.replyToName || undefined
        } : undefined,
        to: opts.mail.to,
        cc: opts.mail.cc,
        bcc: opts.mail.bcc,
        subject: opts.mail.subject,
        text: opts.mail.text,
        html: opts.mail.html,
        attachments: opts.mail.attachments
    });
}


/***/ })

};
;