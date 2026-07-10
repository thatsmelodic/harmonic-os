'use client';

import { useEffect } from 'react';

const FRIED_EM_PATH = '/worlds/fried-em';

export function UniverseExperienceHotfix() {
  useEffect(() => {
    const style = document.createElement('style');
    style.dataset.harmonicUniverseHotfix = 'true';
    style.textContent = `
      .fixed.inset-0.z-50 > div > .absolute { pointer-events: none !important; }
      .fixed.inset-0.z-50 button { position: relative !important; z-index: 100 !important; pointer-events: auto !important; }
      [data-fried-em-entry-hotfix] {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: .75rem;
        border-radius: 9999px;
        padding: .75rem 1rem;
        background: #ff6b35;
        color: #080808;
        font-size: .75rem;
        font-weight: 900;
        text-decoration: none;
        box-shadow: 0 0 24px rgba(255,107,53,.35);
        transition: transform .2s ease, box-shadow .2s ease;
      }
      [data-fried-em-entry-hotfix]:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 34px rgba(255,107,53,.55);
      }
    `;
    document.head.appendChild(style);

    const installFriedEmEntry = () => {
      const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('button'));
      const friedCard = buttons.find((button) => {
        const text = button.textContent?.replace(/\s+/g, ' ').trim() ?? '';
        return text.includes('Fried Em') && text.includes('They wanted smoke');
      });

      if (!friedCard || friedCard.parentElement?.querySelector('[data-fried-em-entry-hotfix]')) return;

      const link = document.createElement('a');
      link.href = FRIED_EM_PATH;
      link.textContent = 'Enter World';
      link.setAttribute('data-fried-em-entry-hotfix', 'true');
      link.setAttribute('aria-label', 'Enter Fried Em world');
      friedCard.insertAdjacentElement('afterend', link);
    };

    installFriedEmEntry();
    const observer = new MutationObserver(installFriedEmEntry);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      style.remove();
      document.querySelectorAll('[data-fried-em-entry-hotfix]').forEach((node) => node.remove());
    };
  }, []);

  return null;
}
