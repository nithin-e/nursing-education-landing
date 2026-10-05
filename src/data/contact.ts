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

/** Dialable target: country code and digits only, so no spaces to mis-dial.
 *
 * The `tel:` scheme is deliberately NOT baked in here. Call sites write
 * `href={`tel:${PHONE_TEL}`}`, because a constant that looks like a finished href
 * but silently lacks the scheme resolves as a relative URL — the browser then
 * treats "+917025719000" as a path and navigates to it instead of dialling.
 */
export const PHONE_TEL = `+${PHONE_DIGITS}`

/**
 * WhatsApp's `wa.me` expects the country code and digits with no `+`, which is
 * the same as `PHONE_DIGITS`.
 */
export const WHATSAPP_NUMBER = PHONE_DIGITS

/**
 * Prefilled WhatsApp chat link.
 *
 * The message is run through `encodeURIComponent` because it contains a space
 * and an apostrophe, neither of which is legal unencoded in a query string.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/** Second line — footer contact column only. */
export const PHONE_ALT_DISPLAY = '+91 7025 729 000'
export const PHONE_ALT_DIGITS = '917025729000'
export const PHONE_TEL_2 = `+${PHONE_ALT_DIGITS}`

export const EMAIL = 'info@drexpertedu.com'
export const MAILTO_HREF = `mailto:${EMAIL}`

/** Postal address, set as one string so it wraps naturally in narrow columns. */
export const ADDRESS = '63/4942 B, Ground Floor, Karadan Square, Cherootty Nagar, Calicut, 673004'