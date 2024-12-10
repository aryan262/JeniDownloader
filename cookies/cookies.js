const ytdl = require("@distube/ytdl-core");

const cookies = [
    {
        "domain": ".youtube.com",
        "expirationDate": 1768412030.011765,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "g.a000rAiqJFGzOJVMuyyCfy_XPtS1HvAEmLvppoRPxLM9zjq_OXDkGKOJgfXzHgZKEIhPvKKEAAACgYKAbYSARQSFQHGX2MiuAax7r7EYtooXnyhXzkhlRoVAUF8yKrUiMTP81iwLto7BiO8xAiL0076"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1765388021.165861,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDTS",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "sidts-CjIB7wV3sTeuY6z2SWiZrvNckqZR_9AK9arOOaKMDuKLhkOg0FIVhl5FPbVxHSMTvmXmyxAA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1733852635,
        "hostOnly": false,
        "httpOnly": false,
        "name": "CONSISTENCY",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AKreu9vkmGU84TjQo3vlp_0YsIm19sTQWc2p8aXdwi8KMLwU7oeTYR12ZKFv259FwPBM18Magfa4IgeIaXRpYz1toC4GbnxriP81cMwUiKdxA_aoLVuNSdsjLJUHCwE29hGcXTacPGkohSZL2sYeI04m"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1768412030.011539,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SAPISID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "QbBcQBepTgr5TVls/AlOPmQ_ZKJV_PngIN"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1765388103.544746,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDCC",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AKEyXzX-n6eSxfXdmzqZr56vuPRydOpAmSuTjhSccvDu_PMx-dNU9kq9XFY7G-1dckHjULHA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1768412030.011479,
        "hostOnly": false,
        "httpOnly": true,
        "name": "SSID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AQoIQH672M-WUJlZ9"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1768412030.011565,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-1PAPISID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "QbBcQBepTgr5TVls/AlOPmQ_ZKJV_PngIN"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1768412030.011736,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "g.a000rAiqJFGzOJVMuyyCfy_XPtS1HvAEmLvppoRPxLM9zjq_OXDkT9HHhazNWBn5BRyqPJIG0gACgYKASISARQSFQHGX2MitVYFb1wViuFlxtXl_zrHMxoVAUF8yKrm9TGqP7VtYv5zyOHQ6QwW0076"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1768412030.011595,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-3PAPISID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "QbBcQBepTgr5TVls/AlOPmQ_ZKJV_PngIN"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1765388103.544783,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDCC",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AKEyXzUs_rceZZWqnRy87YyJNqzPKjw9iHn6Y7lyirQYh86_S-mNnpZgsDIV_apfVrLFvdt4"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1765388021.165967,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDTS",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "sidts-CjIB7wV3sTeuY6z2SWiZrvNckqZR_9AK9arOOaKMDuKLhkOg0FIVhl5FPbVxHSMTvmXmyxAA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767072798.685779,
        "hostOnly": false,
        "httpOnly": true,
        "name": "LOGIN_INFO",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AFmmF2swRAIgDbtagDMT5zIREv95K_MSxm09dODgMWNXakd7T9pzlVgCIF7yRrOCGbgNrhGqQOeM2v6KqKmBB7JmtFkCnQVi_GQz:QUQ3MjNmeGNEdGZMc0FoLUkzRlUzVTU1YmRIeWdqTmxDVENtNjcwRnI0QnJzRG05VzNhbVI4VGVvUlVnNXB0b0luNWxhemFvanBfamNKVHlWRTdaSlVTNEh1dEIzbEVGdWt1bHpxaER3dXBCdXBLdGtYNGc3Z3ByV0t2T0ZnUmE1cnJpRjN1dW1jUmdGb2pxRktqLThfRWdld0EydDlJT2RB"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1768412035.784183,
        "hostOnly": false,
        "httpOnly": false,
        "name": "PREF",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "f4=4000000&f6=40000000&tz=Asia.Calcutta"
    }
]

const agentOptions = {
    pipelining: 5,
    maxRedirections: 0,
};

const agent = ytdl.createAgent(cookies, agentOptions);

module.exports =  { agent }