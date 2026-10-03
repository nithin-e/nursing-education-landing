/**
 * Canonical contact details.
 *
 * Every phone number and email address on the site — header, footer, contact
 * section and the people cards — is derived from these values. Changing a number
 * or address here updates the visible text, the `tel:` / `mailto:` target and any
 * third-party link at once, so the printed value and the dialable target can
 * never drift apart.
 */

/** Primary number — the one shown in the header and the Contact section. */
export const PHONE_DISPLAY = '+91 7025 719 000'
export const PHONE_DIGITS = '917025719000'
export const TEL_HREF = `tel:+${PHONE_DIGITS}`

/** Second line — footer contact column only. */
export const PHONE_ALT_DISPLAY = '+91 7025 729 000'
export const PHONE_ALT_DIGITS = '917025729000'
export const TEL_ALT_HREF = `tel:+${PHONE_ALT_DIGITS}`

export const EMAIL = 'info@drexpertedu.com'
export const MAILTO_HREF = `mailto:${EMAIL}`

/** Postal address, set as one string so it wraps naturally in narrow columns. */
export const ADDRESS = '63/4942 B, Ground Floor, Karadan Square, Cherootty Nagar, Calicut, 673004'