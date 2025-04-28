import { useEffect } from 'react';

// This hook sets the email address for mailto links after a delay, preventing spam bots from scraping them.

function useSetEmail(email: Array<string>, className: string) {
  useEffect(() => {
    let emailSet = false;

    const setEmail = () => {
      if (emailSet) return;
      emailSet = true;

      const emailElements = document.getElementsByClassName(className);
      Array.from(emailElements).forEach((emailElement) => {
        if (emailElement instanceof HTMLElement) {
          const emailAddress = email.join('@');
          emailElement.setAttribute('href', `mailto:${emailAddress}`);
          emailElement.textContent = emailAddress;
        }
      });

      window.removeEventListener('scroll', setEmail);
      window.removeEventListener('mousemove', setEmail);
    };

    const timeoutId = setTimeout(setEmail, 2000);

    window.addEventListener('scroll', setEmail);
    window.addEventListener('mousemove', setEmail);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', setEmail);
      window.removeEventListener('mousemove', setEmail);
    };
  }, [email, className]);
}

export default useSetEmail;
