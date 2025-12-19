---
title: "The Passwordless Future: An Engineering Guide to Replacing Passwords"
tags:
  - webauthn
  - passkeys
  - security
  - frontend
  - authentication
  - google-chrome
  - passwordless
date: 2025-12-19 13:15:00
updated: 2025-12-19 13:15:00
---

Passkeys are a production-ready, phishing-resistant authentication primitive built into the web platform. This is a deep, protocol-level guide for engineering teams replacing passwords for real.

<!--more-->

## Intro: Passwords are the weakest link

Let's be blunt: passwords are a legacy security model, and they are failing. Phishing remains one of the most effective attack vectors, password reuse across services is a disaster waiting to happen, and multi-factor authentication (MFA), while a necessary patch, adds user friction without solving the core problem of shared secrets.

The paradigm is shifting. The browser is no longer just a document viewer; it is evolving into a sophisticated authentication device. Passkeys are at the heart of this transformation, moving us from knowledge-based authentication to possession-based, cryptographic proof.

- **Reference:** [Google Security Blog](https://security.googleblog.com/2023/10/a-new-era-of-authentication-how.html)
- **Reference:** [web.dev Passkeys overview](https://web.dev/articles/passkey-registration)

## What passkeys actually are (a technical view)

Forget the marketing definitions. From an engineering perspective, a passkey is an asymmetric key pair managed by the operating system or browser, tied to a specific online service (an "origin").

- **Private Key:** Stored securely on the user's device in a hardware-backed secure enclave (like a TPM or Secure Enclave). It never leaves the device.
- **Public Key:** Sent to and stored by your server during registration. It's mathematically linked to the private key but cannot be used to derive it.

Authentication is performed via the W3C's **WebAuthn** standard, where the server asks the device to sign a challenge, proving possession of the private key.

Key properties that make this a fundamental security upgrade:

- **Phishing-resistant:** Keys are **origin-bound**. A passkey created for `your-app.com` cannot be used to sign a challenge from `evil-phisher.com`. This eliminates credential phishing.
- **No shared secrets:** The server never sees the private key. A database breach exposes only public keys, which are useless without their private counterparts.
- **No credential stuffing:** Since each passkey is unique to a service, credentials stolen from one site cannot be replayed on another.

- **Reference:** [WebAuthn Level 2 Specification](https://www.w3.org/TR/webauthn-2/)
- **Reference:** [Chrome WebAuthn Docs](https://developer.chrome.com/docs/identity/webauthn)

## WebAuthn architecture overview

The WebAuthn flow involves two main ceremonies: registration and authentication.

**Registration (Creating a Passkey):**

1.  **Server Creates Challenge:** The server generates a unique, random challenge and registration options.
2.  **Browser Calls Authenticator:** The browser receives these options and invokes the platform's authenticator (e.g., Windows Hello, Face ID, Android's screen lock).
3.  **User Verifies:** The user approves the creation with a biometric gesture or device PIN. This is the "user verification" step.
4.  **Public Key Returned:** The authenticator generates a new key pair, signs the challenge with the new private key, and returns the public key to the browser, which sends it to the server.
5.  **Server Stores Credential:** The server validates the signature and stores the public key and credential ID, associating them with the user's account.

**Authentication (Signing In):**

1.  **Server Issues Challenge:** The server sends a new, unique challenge to the browser.
2.  **Browser Signs with Private Key:** The browser's authenticator finds the appropriate passkey for the service, prompts the user for verification, and then signs the challenge with the stored private key.
3.  **Server Verifies Signature:** The server receives the signed challenge and verifies the signature using the public key it has on file for that user. If valid, the user is authenticated.

## Creating a passkey (registration)

**Server-side: Generate Registration Options**
Your server must generate a set of options for the `navigator.credentials.create()` call.

```javascript
const options = {
  // A unique, random, server-generated challenge
  challenge: crypto.randomUUID(),
  // Information about your service (Relying Party)
  rp: {
    name: "Example App",
    id: "example.com", // The domain where passkeys will be used
  },
  // Information about the user
  user: {
    id: userIdBuffer, // A stable, unique user ID
    name: user.email,
    displayName: user.name,
  },
  // Cryptographic algorithms you support (ES256 is standard)
  pubKeyCredParams: [
    { type: "public-key", alg: -7 }, // ES256 (ECDSA with P-256)
  ],
  // Instructions for the authenticator
  authenticatorSelection: {
    residentKey: "required",
    userVerification: "required",
  },
  timeout: 60000,
};
```

- `residentKey: 'required'` (now `discoverableCredential` in WebAuthn L3) is the key to a "passwordless" experience. It instructs the authenticator to store the credential on the device itself, allowing sign-in without a username prompt.
- `userVerification: 'required'` enforces that the user must perform a biometric or PIN verification, proving they are present.

**Client-side: Create the Credential**
The browser takes these options and handles the complex interaction with the secure hardware.

```javascript
const credential = await navigator.credentials.create({
  publicKey: options,
});
```

This single line triggers the OS-native UI for key generation and biometric verification.

- **Reference:** [MDN WebAuthn: `credentials.create()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/create)
- **Reference:** [Chrome Passkeys Docs](https://developer.chrome.com/docs/identity/passkeys)

## Authenticating with a passkey

**Client-side: Get Assertion**
For sign-in, the server provides a challenge, and the client asks the browser to get an "assertion" that proves ownership of the passkey.

```javascript
const assertion = await navigator.credentials.get({
  publicKey: {
    challenge, // A new, unique challenge from the server
    timeout: 60000,
    userVerification: "required",
  },
});
```

This is the passwordless moment. The browser, not your app, handles selecting the correct credential. The user experience is native to their OS, fast, and secure.

**Server-side: Verify Assertion**
Your server must perform several critical checks:

1.  Verify the challenge matches the one you sent.
2.  Verify the signature on the assertion data using the stored public key.
3.  Validate that the origin and RP ID in the assertion match your service's domain.

**Crucially: use a vetted, well-maintained server-side library for this.** Do not attempt to implement WebAuthn signature verification manually.

## Designing sign-in with passkeys (UX + browser)

This is where theory meets practice, and where many implementations fail. Do not build a "Sign in with a Passkey" button.

**Autofill-Driven Passkey Sign-in**
The most powerful UX for passkeys integrates directly with browser autofill. By adding `autocomplete="username webauthn"` to an input field, you signal to the browser that this form supports passkeys.

```html
<input type="text" name="username" autocomplete="username webauthn" />
```

When this input is focused, the browser automatically suggests any available passkeys for your service, right alongside saved passwords. This creates a seamless, intuitive flow that works across devices via the user's Google Account, iCloud Keychain, or password manager.

- **Reference:** [web.dev: Sign in with a passkey through autofill](https://web.dev/articles/passkey-form-autofill)

**Conditional UI (Recommended)**
For an even better experience, use "conditional mediation" to silently check for available passkeys without blocking the UI.

```javascript
// Check for passkeys as soon as the page loads
if (
  window.PublicKeyCredential &&
  PublicKeyCredential.isConditionalMediationAvailable
) {
  const assertion = await navigator.credentials.get({
    mediation: "conditional",
    publicKey: options, // Server-generated options
  });
  // If successful, sign the user in
}
```

This API allows the browser to show a non-intrusive prompt (e.g., in the autofill dropdown) if a passkey is found, leading to the highest conversion rates.

## Managing passkeys at scale

- **Multiple Devices:** Users expect passkeys to be synced across their devices. This is handled by the platform (Google, Apple). Your job is to allow a user to register multiple passkeys for their single account.
- **Credential Revocation:** In your account settings UI, users must be able to see their registered passkeys (e.g., "Chrome on Windows 11," "iPhone 15 Pro") and revoke them.
- **Account Recovery:** This is non-negotiable. Before you even consider removing passwords, you must have a robust account recovery flow (e.g., via verified email or phone number). Never leave a user locked out.

- **Reference:** [Google Account Passkey UX](https://myaccount.google.com/signinoptions/passkeys)

## Security properties vs. passwords

| Property              | Passwords | Passkeys |
| --------------------- | :-------: | :------: |
| Phishing Resistant    |    ❌     |    ✅    |
| Credential Replayable |    ✅     |    ❌    |
| User Friction         |   High    |   Low    |
| MFA Required          |    Yes    | Built-in |

Passkeys don't just enhance passwords; they are a fundamental replacement for the shared secret model.

## Deployment checklist

- **Backend:**
  - HTTPS is mandatory everywhere.
  - Set a stable, correct Relying Party (RP) ID.
  - Use a trusted server-side WebAuthn library.
  - Implement comprehensive audit logging for credential registration and revocation.
- **Frontend:**
  - Use conditional UI for the best sign-in experience.
  - Support autofill with the `webauthn` autocomplete token.
  - Avoid custom, button-based passkey flows.
- **UX:**
  - Educate users about passkeys gradually.
  - Do not force migration; allow users to add a passkey at their own pace.
  - Ensure fallback paths (passwords, magic links) and account recovery are solid.

## Common mistakes to avoid

- **Disabling autofill:** This breaks the most seamless passkey UX.
- **Forcing passkeys too early:** Let users opt-in when they are comfortable.
- **Treating WebAuthn as a modal flow:** Integrate it into your existing forms.
- **Ignoring cross-device sync:** Users expect their passkey to work on their new phone. Design for this by allowing multiple passkeys per account.

## Google ecosystem alignment

Google is all-in on passkeys because they solve security and UX problems at a platform level.

- **Chrome:** Native support for WebAuthn, autofill, and conditional UI.
- **Android & ChromeOS:** Passkeys are a first-class citizen, deeply integrated into the OS.
- **Google Accounts:** Google is one of the largest Relying Parties, using passkeys for its own user base, signaling deep commitment.

- **Reference:** [Chrome Developers Identity Docs](https://developer.chrome.com/docs/identity)

## Conclusion

The era of the password as the primary digital authenticator is ending. Passwords are a legacy transport for identity; passkeys are a platform-native capability. By embracing WebAuthn and designing for the browser, we can build authentication flows that are not only stronger but also simpler.

The future of authentication is not something users remember. It is something their devices prove.

I hope this has been helpful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno

Until next time.
