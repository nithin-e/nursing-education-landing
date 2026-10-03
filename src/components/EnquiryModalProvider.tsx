import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import ConnectModal from './ui/ConnectModal'
import type { ConnectModalMode } from './ui/ConnectModal'

/**
 * One enquiry dialog for the whole page.
 *
 * The dialog used to live inside the people carousel, so only the carousel's
 * Message buttons could open it. Hoisting it here lets the header, hero and
 * footer entry points share a single instance and a single piece of state
 * instead of each growing its own copy of the modal.
 */
type EnquiryModalContextValue = {
  /** Opens the sign-up form behind every "Get Admission" button. */
  openAdmission: (trigger: HTMLButtonElement | null) => void
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
  const [mode, setMode] = useState<ConnectModalMode | null>(null)
  const [personName, setPersonName] = useState<string | null>(null)

  /* The button that opened the dialog, so focus can be handed back to it on
     close. A ref rather than state: the modal only needs the latest value, and
     storing it in state would reopen the dialog's focus effect on every click. */
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  const open = useCallback(
    (nextMode: ConnectModalMode, nextPersonName: string | null, trigger: HTMLButtonElement | null) => {
      lastTriggerRef.current = trigger
      setMode(nextMode)
      setPersonName(nextPersonName)
    },
    [],
  )

  const openPersonMessage = useCallback(
    (name: string, trigger: HTMLButtonElement | null) => open('person', name, trigger),
    [open],
  )

  const openAdmission = useCallback(
    (trigger: HTMLButtonElement | null) => open('admission', null, trigger),
    [open],
  )

  const close = useCallback(() => setMode(null), [])

  const value = useMemo(
    () => ({ openAdmission, openPersonMessage, isOpen: mode !== null }),
    [openAdmission, openPersonMessage, mode],
  )

  return (
    <EnquiryModalContext.Provider value={value}>
      {children}

      {/* Always mounted; it renders nothing until something opens it. */}
      <ConnectModal
        mode={mode ?? 'person'}
        open={mode !== null}
        personName={personName}
        trigger={lastTriggerRef.current}
        onClose={close}
      />
    </EnquiryModalContext.Provider>
  )
}