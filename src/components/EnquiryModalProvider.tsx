import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import ConnectModal, { CARD_SOURCE } from './ui/ConnectModal'
import type { ConnectModalMode } from './ui/ConnectModal'

/** Lead source for entry points that are not tied to a content card. */
const ADMISSION_SOURCE = 'get-admission'

/** Everything one open needs. `null` means the dialog is closed. */
type DialogState = {
  mode: ConnectModalMode
  personName: string | null
  interest: string | null
  source: string
}

/**
 * One enquiry dialog for the whole page.
 *
 * The dialog used to live inside the people carousel, so only the carousel's
 * Message buttons could open it. Hoisting it here lets the header, content cards
 * and conversion bands share a single instance and a single piece of state
 * instead of each growing its own copy of the modal.
 */
type EnquiryModalContextValue = {
  /**
   * Opens the sign-up form behind every "Get Admission" button.
   *
   * Pass the card title as `interest` when a content card's CTA opens it: the
   * heading is unchanged, but the lead records both `source` and `interest` so
   * the backend knows which card the visitor was reading.
   */
  openAdmission: (trigger: HTMLButtonElement | null, interest?: string) => void
  /** Opens the connect form behind a person card's Message button. */
  openPersonMessage: (personName: string, trigger: HTMLButtonElement | null) => void
  /**
   * Whether the shared dialog is currently up. Consumers that animate or
   * auto-advance while the visitor is busy reading need this to stand down.
   */
  isOpen: boolean
}

const EnquiryModalContext = createContext<EnquiryModalContextValue | null>(null)

/**
 * Access the shared dialog. Throws outside the provider, because a missing
 * provider would otherwise fail silently as a button that does nothing.
 */
export function useEnquiryModal(): EnquiryModalContextValue {
  const context = useContext(EnquiryModalContext)

  if (!context) {
    throw new Error('useEnquiryModal must be used inside <EnquiryModalProvider>')
  }

  return context
}

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState | null>(null)

  /* The button that opened the dialog, so focus can be handed back to it on
     close. A ref rather than state: the modal only needs the latest value, and
     storing it in state would reopen the dialog's focus effect on every click. */
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  const openPersonMessage = useCallback((name: string, trigger: HTMLButtonElement | null) => {
    lastTriggerRef.current = trigger
    setDialog({ mode: 'person', personName: name, interest: null, source: ADMISSION_SOURCE })
  }, [])

  const openAdmission = useCallback((trigger: HTMLButtonElement | null, interest?: string) => {
    lastTriggerRef.current = trigger
    setDialog({
      mode: 'admission',
      personName: null,
      interest: interest ?? null,
      source: interest ? CARD_SOURCE : ADMISSION_SOURCE,
    })
  }, [])

  const close = useCallback(() => setDialog(null), [])

  const value = useMemo(
    () => ({ openAdmission, openPersonMessage, isOpen: dialog !== null }),
    [openAdmission, openPersonMessage, dialog],
  )

  return (
    <EnquiryModalContext.Provider value={value}>
      {children}

      {/* Always mounted; it renders nothing until something opens it. */}
      <ConnectModal
        mode={dialog?.mode ?? 'person'}
        open={dialog !== null}
        personName={dialog?.personName ?? null}
        interest={dialog?.interest ?? null}
        source={dialog?.source}
        trigger={lastTriggerRef.current}
        onClose={close}
      />
    </EnquiryModalContext.Provider>
  )
}