"use strict";
exports.id = 8731;
exports.ids = [8731];
exports.modules = {

/***/ 8731:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sendEmail)
/* harmony export */ });
/* harmony import */ var _mailchimp_mailchimp_transactional__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38792);
/* harmony import */ var _mailchimp_mailchimp_transactional__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mailchimp_mailchimp_transactional__WEBPACK_IMPORTED_MODULE_0__);

const { MAILCHIMP_TRANSACTIONAL_API_KEY: apiKey  } = process.env;
if (!apiKey) {
    throw new Error('Invalid/Missing environment variable: "MAILCHIMP_TRANSACTIONAL_API_KEY"');
}
const client = _mailchimp_mailchimp_transactional__WEBPACK_IMPORTED_MODULE_0___default()(apiKey);
// logger.info('[email] backend: MailChimp')
async function sendEmail(opts) {
    const messageAttachments = opts.mail.attachments?.map((attachment)=>{
        const res = {
            content: attachment.content,
            name: attachment.filename,
            type: attachment.type
        };
        return res;
    }) ?? [];
    const to = opts.mail.to?.map((recipient)=>{
        const res = {
            email: recipient.email,
            name: recipient.name,
            type: "to"
        };
        return res;
    }) ?? [];
    const cc = opts.mail.cc?.map((recipient)=>{
        const res = {
            email: recipient.email,
            name: recipient.name,
            type: "cc"
        };
        return res;
    }) ?? [];
    const bcc = opts.mail.bcc?.map((recipient)=>{
        const res = {
            email: recipient.email,
            name: recipient.name,
            type: "bcc"
        };
        return res;
    }) ?? [];
    const messageRecipients = [
        ...to,
        ...cc,
        ...bcc
    ];
    const message = {
        from_email: opts.fromEmail,
        from_name: opts.fromName || undefined,
        to: messageRecipients,
        subject: opts.mail.subject,
        text: opts.mail.text,
        html: opts.mail.html,
        attachments: messageAttachments
    };
    return client.messages.send({
        message
    });
}


/***/ })

};
;