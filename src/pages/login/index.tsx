import { type ReactNode, useId, useState } from 'react'
import { Button } from '@base-ui/react/button'
import { Input } from '@base-ui/react/input'
import { OTPField } from '@base-ui/react/otp-field'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../../i18n'

const OTP_CODE = '666666'
const OTP_LENGTH = OTP_CODE.length

type LoginState = {
  email?: string
}

function BrandMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1849bf] text-white shadow-sm shadow-blue-200">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 3.2 14.5 9.5 20.8 12 14.5 14.5 12 20.8 9.5 14.5 3.2 12 9.5 9.5 12 3.2Z" />
      </svg>
    </div>
  )
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen text-slate-800"
      style={{ background: 'linear-gradient(180deg, #FFF 0%, #F2F6FF 100%)' }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-4 sm:px-8">
        <header className="flex items-center gap-3">
          <BrandMark />
          <span className="text-2xl font-semibold tracking-tight text-slate-800">Agency</span>
        </header>
        <main className="flex flex-1 items-center justify-center py-10">{children}</main>
      </div>
    </div>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const initialState = location.state as LoginState | null
  const [email, setEmail] = useState(initialState?.email ?? 'fool87664@163.com')
  const { t } = useI18n()

  return (
    <Shell>
      <div className="w-full max-w-[560px] rounded-[24px] bg-white px-6 py-8 shadow-[0_18px_60px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70 sm:px-8">
        <div className="mx-auto w-fit">
          <BrandMark />
        </div>
        <h2 className="mt-5 text-center text-xl font-semibold tracking-tight text-slate-900">{t('login.signUpTitle')}</h2>

        <div className="mt-6 space-y-3">
          <Button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <span className="text-lg">G</span>
            {t('login.social.google')}
          </Button>
          <Button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <span className="text-lg text-[#1877f2]">f</span>
            {t('login.social.facebook')}
          </Button>
          <Button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <span className="text-lg">⌘</span>
            {t('login.social.github')}
          </Button>
          <Button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <span className="text-lg"></span>
            {t('login.social.apple')}
          </Button>
        </div>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-300">
          <div className="h-px flex-1 bg-slate-200" />
          <span>{t('login.orContinueWith')}</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <label className="flex items-center gap-3 rounded-full border border-[#1849bf] px-4 py-3 text-sm text-slate-700 shadow-sm">
          <span className="text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M17.7568 2.60449C18.1307 2.60462 18.4895 2.76147 18.7539 3.04102C19.0183 3.32066 19.167 3.70028 19.167 4.0957V15.2793C19.167 15.6747 19.0182 16.0543 18.7539 16.334C18.4895 16.6135 18.1307 16.7704 17.7568 16.7705H2.24316C1.86929 16.7704 1.51047 16.6135 1.24609 16.334C0.98175 16.0543 0.833008 15.6747 0.833008 15.2793V4.0957C0.833008 3.70027 0.981699 3.32066 1.24609 3.04102C1.51047 2.76146 1.86929 2.60461 2.24316 2.60449H17.7568ZM2.24316 15.2793H17.7568V4.20508L10.9883 10.5449C10.7192 10.7971 10.3663 10.9375 10 10.9375C9.63371 10.9375 9.2808 10.7971 9.01172 10.5449L2.24316 4.2041V15.2793ZM10 9.45898L15.7275 4.0957H4.27246L10 9.45898Z" fill="#68717D"/>
</svg>
          </span>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border-0 bg-transparent p-0 text-[16px] outline-none placeholder:text-slate-400"
            placeholder={t('login.emailPlaceholder')}
            type="email"
          />
        </label>

        <Button
          type="button"
          onClick={() => navigate('/login/verify', { state: { email } as LoginState })}
          className="mt-4 w-full rounded-full bg-[#1849bf] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#133fa6] focus:outline-none focus:ring-2 focus:ring-[#1849bf]/40"
        >
          {t('login.getCode')}
        </Button>

        <p className="mt-4 text-center text-xs text-slate-400">
          {t('login.termsIntro')}
          <span className="font-semibold text-slate-600"> {t('login.terms')} </span>
          {t('login.privacy') ? ' ' : ''}
          <span className="font-semibold text-slate-600">{t('login.privacy')}</span>
        </p>
      </div>
    </Shell>
  )
}

export function VerifyPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LoginState | null
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const id = useId()
  const descriptionId = `${id}-description`
  const email = state?.email ?? '你的邮箱'
  const { t } = useI18n()

  if (!state?.email) {
    return <Navigate to="/login" replace />
  }

  const continueHome = () => {
    if (code !== OTP_CODE) {
      setError('验证码错误，请输入 666666')
      return
    }

    navigate('/home', { replace: true })
  }

  return (
    <Shell>
      <div className="w-full max-w-[420px] rounded-[24px] bg-white px-6 py-8 shadow-[0_18px_60px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70 sm:px-8">
        <div className="mx-auto w-fit">
          <BrandMark />
        </div>
        <h2 className="mt-5 text-center text-xl font-semibold tracking-tight text-slate-900">{t('login.verifyTitle')}</h2>
        <p className="mt-2 text-center text-sm text-slate-500">{t('login.verifySentTo', { email })}</p>
        <p id={descriptionId} className="mt-1 text-center text-xs text-slate-400">{t('login.verifyValid')}</p>

        <div className="mt-8 flex justify-center">
          <OTPField.Root
            id={id}
            length={OTP_LENGTH}
            value={code}
            onValueChange={(next) => {
              setCode(next)
              if (error) setError('')
            }}
            aria-describedby={descriptionId}
            className="flex gap-3"
          >
            {Array.from({ length: OTP_LENGTH }, (_, index) => (
              <OTPField.Input
                key={index}
                autoFocus={index === 0}
                className="m-0 h-10 w-10 rounded-lg border border-slate-200 bg-white text-center text-lg font-semibold text-slate-900 outline-none transition focus:border-slate-500 focus:ring-0"
                aria-label={index === 0 ? undefined : `code digit ${index + 1}`}
              />
            ))}
          </OTPField.Root>
        </div>

        {error ? <p className="mt-4 text-center text-sm text-red-500">{error}</p> : null}

        <Button
          type="button"
          onClick={continueHome}
          className={`mt-6 w-full rounded-full py-3 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#1849bf]/40 ${
            code.length === OTP_LENGTH
              ? 'bg-[#1849bf] hover:bg-[#133fa6]'
              : 'bg-[#8aa4df] hover:bg-[#7792d4]'
          }`}
        >
          {t('login.continue')}
        </Button>

        <Button
          type="button"
          onClick={() => navigate('/login', { state: { email } as LoginState })}
          className="mt-4 block w-full text-center text-xs text-slate-400 transition hover:text-slate-600"
        >
          {t('login.backStep')}
        </Button>
      </div>
    </Shell>
  )
}
