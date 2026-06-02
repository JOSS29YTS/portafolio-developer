import { useForm, ValidationError } from '@formspree/react'
import { config } from '../data/portfolioConfig'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import styles from './Contact.module.css'

export default function Contact() {
  const [state, handleSubmit] = useForm(config.formspreeId)
  const { language, t } = useLanguage()

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <span className={styles.label}>{t('contact.label')}</span>
          <h2 className={styles.title}>{t('contact.title')}</h2>
          <p className={styles.sub}>
            {t('contact.text')}
          </p>
        </Reveal>

        <Reveal>
          {state.succeeded ? (
            <div className={styles.successBox}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <div>
                <strong>{language === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}</strong>
                <p>{language === 'es' ? 'Te responderé lo antes posible.' : 'I will respond as soon as possible.'}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="contact-name" className={styles.visuallyHidden}>{t('contact.name')}</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder={t('contact.name')}
                    required
                    className={styles.input}
                    disabled={state.submitting}
                  />
                  <ValidationError 
                    prefix={t('contact.name')} 
                    field="name"
                    errors={state.errors}
                    className={styles.errorField}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="contact-email" className={styles.visuallyHidden}>Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder={language === 'es' ? 'Email' : 'Email Address'}
                    required
                    className={styles.input}
                    disabled={state.submitting}
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className={styles.errorField}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact-subject" className={styles.visuallyHidden}>{language === 'es' ? 'Asunto' : 'Subject'}</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder={language === 'es' ? 'Asunto' : 'Subject'}
                  className={styles.input}
                  disabled={state.submitting}
                />
                <ValidationError 
                  prefix={language === 'es' ? 'Asunto' : 'Subject'} 
                  field="subject"
                  errors={state.errors}
                  className={styles.errorField}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact-message" className={styles.visuallyHidden}>{t('contact.message')}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder={t('contact.message')}
                  rows={5}
                  required
                  className={`${styles.input} ${styles.textarea}`}
                  disabled={state.submitting}
                />
                <ValidationError 
                  prefix={t('contact.message')} 
                  field="message"
                  errors={state.errors}
                  className={styles.errorField}
                />
              </div>

              {state.errors && state.errors.length > 0 && (
                <p className={styles.errorMsg}>
                  {language === 'es' 
                    ? 'Algo salió mal. Intenta de nuevo o escríbeme directamente a' 
                    : 'Something went wrong. Please try again or write directly to'}{' '}
                  <a href={`mailto:${config.email}`}>{config.email}</a>.
                </p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={state.submitting}
              >
                {state.submitting ? (
                  <>
                    <span className={styles.spinner} />
                    {t('contact.sending')}
                  </>
                ) : (
                  <>
                    {t('contact.send')}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
