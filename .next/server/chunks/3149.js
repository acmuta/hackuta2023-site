"use strict";
exports.id = 3149;
exports.ids = [3149];
exports.modules = {

/***/ 43149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sendEmail)
/* harmony export */ });
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86361);

const { SMTP_HOST , SMTP_PORT , SMTP_USER , SMTP_PASS , SMTP_SECURE  } = process.env;
const host = SMTP_HOST ?? "localhost";
const port = parseInt(SMTP_PORT ?? "25");
const secure = SMTP_SECURE === "true";
const transport = nodemailer__WEBPACK_IMPORTED_MODULE_0__.createTransport({
    host,
    port,
    secure,
    ...SMTP_USER || SMTP_PASS ? {
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    } : {},
    tls: {
        // Accept self-signed certificate.
        rejectUnauthorized: false
    }
});
// logger.info(`[email] backend: SMTP ${host}:${port} (secure: ${secure})`)
async function sendEmail(opts) {
    const addresseeConverter = (addressee)=>addressee.name ? {
            address: addressee.email,
            name: addressee.name
        } : addressee.email;
    const attachmentConverter = (attachment)=>({
            content: attachment.content,
            contentDisposition: attachment.disposition,
            contentType: attachment.type,
            encoding: "base64",
            filename: attachment.filename
        });
    return transport.sendMail({
        from: opts.fromName ? {
            address: opts.fromEmail,
            name: opts.fromName
        } : opts.fromEmail,
        replyTo: opts.replyToEmail ? opts.replyToName ? {
            address: opts.replyToEmail,
            name: opts.replyToName
        } : opts.replyToEmail : undefined,
        to: opts.mail.to?.map(addresseeConverter),
        cc: opts.mail.cc?.map(addresseeConverter),
        bcc: opts.mail.bcc?.map(addresseeConverter),
        subject: opts.mail.subject,
        text: opts.mail.text,
        html: opts.mail.html,
        attachments: opts.mail.attachments?.map(attachmentConverter)
    });
}


/***/ })

};
;