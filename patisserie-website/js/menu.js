class PastryMenu {
  constructor(listSelector, loadingSelector, errorSelector) {
    this.listEl = document.querySelector(listSelector);
    this.loadingEl = document.querySelector(loadingSelector);
    this.errorEl = document.querySelector(errorSelector);
    this.allPastries = this.getStaticPastries();
    this.init();
    this.setupSearch();
  }

  async init() {
    this.showLoading();
    try {
      const pastries = this.allPastries;
      if (pastries && pastries.length > 0) {
        this.renderMenu(pastries);
      } else {
        this.showError('No pastries found.');
      }
    } catch (e) {
      this.showError('Failed to load menu.');
    } finally {
      this.hideLoading();
    }
  }

  setupSearch() {
    const form = document.getElementById('menu-search-form');
    const input = document.getElementById('menu-search-input');
    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = input.value.trim().toLowerCase();
        const filtered = this.allPastries.filter(pastry =>
          pastry.name.toLowerCase().includes(searchTerm)
        );
        this.renderMenu(filtered);
      });
    }
  }

  getStaticPastries() {
    return [
      {
        name: 'Croissant',
        description: 'A classic French pastry with a golden, flaky crust and a soft, buttery interior. Perfect for breakfast or a snack.',
        image: 'images/croissant.jpg',
        type: 'Pastry',
        price: 2.5
      },
      {
        name: 'Chocolate Éclair',
        description: 'A delicate choux pastry filled with rich chocolate cream and topped with glossy chocolate icing.',
        image: 'images/choclate eclair.jpg',
        type: 'Pastry',
        price: 3.0
      },
      {
        name: 'Macaron',
        description: 'A colorful French meringue cookie with a crisp shell and a luscious, creamy filling.',
        image: 'images/maacarons.jpg',
        type: 'Pastry',
        price: 2.0
      },
      {
        name: 'Apple Pie',
        description: 'A timeless dessert with tender apples, warm spices, and a flaky, buttery crust.',
        image: 'images/apple pie.jpg',
        type: 'Pie',
        price: 4.0
      },
      {
        name: 'Cheesecake',
        description: 'A creamy, decadent cheesecake on a crisp biscuit base, finished with a hint of vanilla.',
        image: 'images/cheesecake.jpg',
        type: 'Cake',
        price: 3.5
      },
      {
        name: 'Tiramisu',
        description: 'An Italian classic with layers of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa.',
        image: 'images/tiramissu.jpg',
        type: 'Dessert',
        price: 4.5
      },
      {
        name: 'Brownie',
        description: 'A rich, fudgy chocolate brownie with a crackly top and deep cocoa flavor.',
        image: 'images/brownie.jpg',
        type: 'Cake',
        price: 2.5
      },
      {
        name: 'Carrot Cake',
        description: 'A moist, spiced cake with grated carrots and walnuts, topped with tangy cream cheese frosting.',
        image: 'images/carotcake.jpg',
        type: 'Cake',
        price: 3.0
      },
      {
        name: 'Lemon Tart',
        description: 'A crisp pastry shell filled with tangy, sweet lemon curd and a dusting of powdered sugar.',
        image: 'images/lemon tart.jpg',
        type: 'Tart',
        price: 3.2
      },
      {
        name: 'Cinnamon Roll',
        description: 'Soft, sweet rolls swirled with cinnamon and sugar, finished with a creamy glaze.',
        image: 'images/cinnamon rolls.jpg',
        type: 'Bun',
        price: 2.8
      },
      {
        name: 'Profiterole',
        description: 'Light choux pastry puffs filled with whipped cream and topped with rich chocolate sauce.',
        image: 'images/profetirol.jpg',
        type: 'Pastry',
        price: 3.2
      },
      {
        name: 'Cupcake',
        description: 'A soft, moist mini cake topped with a swirl of creamy frosting and colorful sprinkles.',
        image: 'images/vanillacupecake.jpg',
        type: 'Cake',
        price: 2.2
      },
      {
        name: 'Scone',
        description: 'A tender, lightly sweetened British classic, perfect with clotted cream and jam.',
        image: 'images/scones.jpg',
        type: 'Cake',
        price: 2.0
      },
      {
        name: 'Baklava',
        description: 'A rich, sweet pastry made of layers of filo filled with chopped nuts and honey syrup.',
        image: 'images/Baklawa.jpg',
        type: 'Pastry',
        price: 3.5
      },
      {
        name: 'Danish Pastry',
        description: 'A flaky, buttery pastry with a sweet filling, perfect for breakfast or dessert.',
        image: 'images/Danish Pastry.jpg',
        type: 'Pastry',
        price: 3.0
      }
    ];
  }

  async fetchNutritionInfo(pastryName) {
    // Map display names to API-friendly names
    const apiNameMap = {
      'vanillacupecake': 'vanilla cupcake',
      'financier': 'almond cake'
    };
    const queryName = apiNameMap[pastryName] || pastryName;
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(queryName)}`, {
        headers: { 'X-Api-Key': '16SYOcNinyHNJm8vQ83bGw==5wbrzBhwMJH7jdvz' }
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      return data && data[0] ? data[0] : null;
    } catch (e) {
      return null;
    }
  }

  renderMenu(pastries) {
    this.listEl.innerHTML = '';
    pastries.forEach(async (pastry) => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="card pastry-card h-100 shadow-sm animate-fadein">
          <img src="${pastry.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'}" class="card-img-top" alt="${pastry.name}">
          <div class="card-body">
            <h5 class="card-title">${pastry.name}</h5>
            <p class="card-text">${pastry.description || 'A delicious treat from our patisserie.'}</p>
            <span class="badge bg-pink">${pastry.type || 'Pastry'}</span>
            <div class="nutrition-info mt-2 text-muted small">Loading nutrition info...</div>
          </div>
        </div>
      `;
      this.listEl.appendChild(col);
      // Fetch and display nutrition info
      const nutritionDiv = col.querySelector('.nutrition-info');
      const nutrition = await this.fetchNutritionInfo(pastry.name);
      if (nutrition) {
        nutritionDiv.innerHTML = `
          <strong>Nutrition (per serving):</strong><br>
          ${nutrition.calories !== undefined ? `Calories: ${nutrition.calories} kcal<br>` : ''}
          ${nutrition.serving_size_g !== undefined ? `Serving Size: ${nutrition.serving_size_g} g<br>` : ''}
          ${nutrition.protein_g !== undefined ? `Protein: ${nutrition.protein_g} g<br>` : ''}
          ${nutrition.fat_total_g !== undefined ? `Fat: ${nutrition.fat_total_g} g<br>` : ''}
          ${nutrition.carbohydrates_total_g !== undefined ? `Carbs: ${nutrition.carbohydrates_total_g} g<br>` : ''}
          ${nutrition.sugar_g !== undefined ? `Sugar: ${nutrition.sugar_g} g<br>` : ''}
          ${nutrition.fiber_g !== undefined ? `Fiber: ${nutrition.fiber_g} g<br>` : ''}
          ${nutrition.sodium_mg !== undefined ? `Sodium: ${nutrition.sodium_mg} mg<br>` : ''}
          ${nutrition.cholesterol_mg !== undefined ? `Cholesterol: ${nutrition.cholesterol_mg} mg` : ''}
        `;
      } else {
        nutritionDiv.textContent = 'Nutrition info unavailable.';
      }
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
  new PastryMenu(
    '#menu-list',
    '#menu-loading',
    '#menu-error'
  );
});

// CSS for fade-in animation
const style = document.createElement('style');
style.innerHTML = `
.animate-fadein {
  opacity: 0;
  animation: fadein 0.8s forwards;
}
@keyframes fadein {
  to { opacity: 1; }
}
.badge.bg-pink {
  background: var(--patisserie-pink);
  color: #fff;
  font-size: 1em;
}
`;
document.head.appendChild(style);
