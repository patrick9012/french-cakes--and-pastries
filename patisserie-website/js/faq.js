class FAQFetcher {
  constructor(apiUrl, listSelector, loadingSelector, errorSelector) {
    this.apiUrl = apiUrl;
    this.listEl = document.querySelector(listSelector);
    this.loadingEl = document.querySelector(loadingSelector);
    this.errorEl = document.querySelector(errorSelector);
    this.init();
  }

  async init() {
    this.showLoading();
    try {
      const faqs = await this.fetchFAQs();
      if (faqs && faqs.length > 0) {
        this.renderFAQs(faqs);
      } else {
        this.showError('No FAQs found.');
      }
    } catch (e) {
      this.showError('Failed to load FAQs.');
    } finally {
      this.hideLoading();
    }
  }

  async fetchFAQs() {
    // Example public FAQ API (replace with a real one if available)
    // We'll use a fallback if the API is unavailable
    try {
      const response = await fetch('https://api.sampleapis.com/futurama/questions');
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      // Map to {question, answer} format
      return data.slice(0, 5).map((item, i) => ({
        question: item.question || `Sample Question ${i+1}`,
        answer: item.answer || 'Sample answer.'
      }));
    } catch (e) {
      // Fallback: static FAQ data
      return [
        { question: 'What are your opening hours?', answer: 'We are open Monday to Saturday, 8:00 AM to 7:00 PM. Closed on Sundays.' },
        { question: 'Do you offer gluten-free or vegan pastries?', answer: 'Yes! We have a selection of gluten-free and vegan pastries. Please ask our staff for today\'s options.' },
        { question: 'Can I place a custom order for events?', answer: 'Absolutely! We love making your events special. Contact us in advance to discuss your custom pastry needs.' },
        { question: 'Do you have seating available?', answer: 'Yes, we have a cozy seating area where you can enjoy your pastries and coffee.' }
      ];
    }
  }

  renderFAQs(faqs) {
    this.listEl.innerHTML = '';
    faqs.forEach((faq, i) => {
      const item = document.createElement('div');
      item.className = 'accordion-item';
      item.innerHTML = `
        <h2 class="accordion-header" id="faq${i}-heading">
          <button class="accordion-button${i === 0 ? '' : ' collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#faq${i}" aria-expanded="${i === 0 ? 'true' : 'false'}" aria-controls="faq${i}">
            ${faq.question}
          </button>
        </h2>
        <div id="faq${i}" class="accordion-collapse collapse${i === 0 ? ' show' : ''}" aria-labelledby="faq${i}-heading" data-bs-parent="#faq-list">
          <div class="accordion-body">
            ${faq.answer}
          </div>
        </div>
      `;
      this.listEl.appendChild(item);
    });
  }

  showLoading() {
    this.loadingEl.classList.remove('d-none');
  }

  hideLoading() {
    this.loadingEl.classList.add('d-none');
  }

  showError(message) {
    this.errorEl.textContent = message;
    this.errorEl.classList.remove('d-none');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FAQFetcher(
    'https://api.sampleapis.com/futurama/questions',
    '#faq-list',
    '#faq-loading',
    '#faq-error'
  );
}); 