"use strict";
exports.id = 0;
exports.ids = [0];
exports.modules = {

/***/ 50000:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "authOptions": () => (/* binding */ authOptions),
  "default": () => (/* binding */ auth),
  "getServerUser": () => (/* binding */ getServerUser)
});

// EXTERNAL MODULE: external "@next-auth/mongodb-adapter"
var mongodb_adapter_ = __webpack_require__(166);
// EXTERNAL MODULE: external "next-auth"
var external_next_auth_ = __webpack_require__(73227);
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_);
// EXTERNAL MODULE: external "next-auth/providers/discord"
var discord_ = __webpack_require__(89783);
var discord_default = /*#__PURE__*/__webpack_require__.n(discord_);
// EXTERNAL MODULE: external "next-auth/providers/email"
var email_ = __webpack_require__(9673);
var email_default = /*#__PURE__*/__webpack_require__.n(email_);
// EXTERNAL MODULE: external "next-auth/providers/github"
var github_ = __webpack_require__(47459);
var github_default = /*#__PURE__*/__webpack_require__.n(github_);
// EXTERNAL MODULE: ./src/lib/auth/shared.ts
var shared = __webpack_require__(42264);
;// CONCATENATED MODULE: ./src/lib/auth/server.ts



async function getUserPerms(user) {
    const roles = [
        "@unauthenticated",
        ...user ? [
            "@authenticated"
        ] : [],
        ...user?.roles ?? []
    ];
    return (0,shared/* mergePermission */.i3)(...roles.map((r)=>shared/* RolePermissionMap */.wI[r] ?? undefined));
}

// EXTERNAL MODULE: ./src/lib/db/index.ts
var db = __webpack_require__(55156);
// EXTERNAL MODULE: ./src/lib/utils/server.ts
var server = __webpack_require__(66028);
;// CONCATENATED MODULE: ./src/lib/email/index.ts


const { MAILCHIMP_TRANSACTIONAL_API_KEY: mcApiKey , SENDGRID_API_KEY: sgApiKey , TRANSACTIONAL_FROM_EMAIL: fromEmail , TRANSACTIONAL_FROM_NAME: fromName , TRANSACTIONAL_REPLY_TO_EMAIL: replyToEmail , TRANSACTIONAL_REPLY_TO_NAME: replyToName  } = process.env;
if (!fromEmail) {
    throw new Error('Invalid/Missing environment variable: "TRANSACTIONAL_FROM_EMAIL"');
}
let client;
if (mcApiKey) {
    client = __webpack_require__.e(/* import() */ 940).then(__webpack_require__.bind(__webpack_require__, 940));
} else if (sgApiKey) {
    client = __webpack_require__.e(/* import() */ 5192).then(__webpack_require__.bind(__webpack_require__, 85192));
} else {
    client = __webpack_require__.e(/* import() */ 8888).then(__webpack_require__.bind(__webpack_require__, 88888));
}
async function sendEmail(data) {
    const subject = (0,server/* isDevelopment */.yG)() ? `[TEST] [NOT PROD] ${data.subject}` : data.subject;
    return (await client).default({
        mail: {
            ...data,
            subject
        },
        fromEmail: fromEmail,
        fromName: fromName,
        replyToEmail: replyToEmail,
        replyToName: replyToName
    });
}

// EXTERNAL MODULE: ./src/lib/logger/index.ts + 1 modules
var logger = __webpack_require__(20384);
;// CONCATENATED MODULE: ./src/pages/api/auth/[...nextauth].ts










const { NEXTAUTH_SECRET: secret , NEXTAUTH_DISABLE_EMAIL: disableEmail  } = process.env;
if (!secret) {
    throw new Error('Invalid/Missing environment variable: "NEXTAUTH_SECRET"');
}
const SupportedProviders = new Map([
    [
        "discord",
        (discord_default())
    ],
    [
        "github",
        (github_default())
    ]
]);
function* getOAuthProviders() {
    for (const [name, provider] of SupportedProviders){
        const idEnvName = `OAUTH_${name.toUpperCase()}_ID`;
        const secretEnvName = `OAUTH_${name.toUpperCase()}_SECRET`;
        const { [idEnvName]: id , [secretEnvName]: secret  } = process.env;
        // Skip if neither id nor secret were supplied.
        // Log a warning if only one of them is supplied.
        if (!(id && secret)) {
            if (id || secret) {
                logger/* default.warn */.Z.warn(`Missing "${idEnvName}" or "${secretEnvName}" environment variable.`);
            }
            continue;
        }
        yield provider({
            clientId: id,
            clientSecret: secret,
            allowDangerousEmailAccountLinking: true
        });
    }
}
const authOptions = {
    adapter: (0,mongodb_adapter_.MongoDBAdapter)(db/* default */.Z),
    providers: [
        ...getOAuthProviders(),
        ...disableEmail === "true" ? [] : [
            email_default()({
                async sendVerificationRequest (params) {
                    const { identifier , url  } = params;
                    try {
                        await sendEmail({
                            to: [
                                {
                                    email: identifier
                                }
                            ],
                            subject: `Sign in to your ${server/* siteName */.aD} account`,
                            html: `<body>
<p>Hello,</p>
<p>Follow this link to sign in to your ${server/* siteName */.aD} account.</p>
<p><a href="${url}">${url}</a></p>
<p>
Thanks,<br>
${server/* siteName */.aD} Team
</p>
</body>`,
                            text: `Hello,

Follow this link to sign in to your ${server/* siteName */.aD} account.

${url}

Thanks,
${server/* siteName */.aD} Team`
                        });
                    } catch (e) {
                        logger/* default.error */.Z.error(e, "[NextAuth] send email");
                    }
                }
            })
        ]
    ],
    secret
};
/**
 * @deprecated use {@link import('@/lib/utils/server').getEnhancedSession}
 */ async function getServerUser(client, req, res) {
    try {
        const session = await (0,external_next_auth_.getServerSession)(...req && res ? [
            req,
            res,
            authOptions
        ] : [
            authOptions
        ]);
        if (!session?.user?.email) {
            return null;
        }
        return (0,server/* getUser */.PR)(client, session.user.email);
    } catch (e) {
        logger/* default.error */.Z.error(e, "[getServerUser]");
        return null;
    }
}
async function auth(req, res) {
    // https://next-auth.js.org/tutorials/avoid-corporate-link-checking-email-provider
    if (req.method === "HEAD") {
        return res.status(200).end();
    }
    const routeName = "enhanced-session";
    if (req.query.nextauth?.length === 1 && req.query.nextauth[0] === routeName) {
        try {
            const client = await db/* default */.Z;
            const user = await getServerUser(client, req, res);
            const perms = await getUserPerms(user);
            return res.status(200).json({
                user,
                perms
            });
        } catch (e) {
            logger/* default.error */.Z.error(e, `[/api/auth/${routeName}]`);
            return res.status(200).json({
                user: null,
                perms: shared/* RolePermissionMap.@unauthenticated */.wI["@unauthenticated"]
            });
        }
    }
    return external_next_auth_default()(req, res, authOptions);
}


/***/ })

};
;