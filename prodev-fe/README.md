React Infinite Products List

A modern, responsive React application designed to simulate an e-commerce product catalog. This project demonstrates efficient data fetching patterns using infinite scrolling, robust state management with Redux Toolkit, and a polished UI using Tailwind CSS.

📖 Table of Contents

Features

Tech Stack

Project Structure

Getting Started

Prerequisites

Installation

Usage

Key Components

Implementation Details

Infinite Scroll Logic

State Management & Error Handling

Customization

Future Enhancements

Contributing

License

✨ Features

Infinite Scrolling: Seamlessly loads new products as the user approaches the bottom of the list, eliminating the need for traditional pagination buttons.

Responsive Grid Layout: Adapts gracefully to mobile (1 column), tablet (2-3 columns), and desktop (4+ columns) screens.

Robust State Management: Handles data fetching, caching, and UI states (loading, idle, error) via Redux Toolkit.

User Feedback:

Loading Spinners: Visual cues for initial page loads and background data fetching.

Error Banners: User-friendly messages with retry functionality in case of network failures.

Interactive UI: Product cards feature hover effects, transitions, and a clean aesthetic.

Accessibility: Built with semantic HTML and ARIA attributes to ensure usability for all users.

🛠 Tech Stack

Core: React 18+

Language: TypeScript

State Management: Redux Toolkit (RTK)

Styling: Tailwind CSS

Routing/API Logic: Intersection Observer API (Native browser API for scroll detection)

📂 Project Structure

src/
├── app/
│   ├── hooks.ts           # Typed Redux hooks (useAppDispatch, useAppSelector)
│   └── store.ts           # Redux store configuration
├── components/
│   ├── ErrorBanner.tsx    # Reusable error display component
│   └── LoadingSpinner.tsx # CSS/SVG based spinner
├── features/
│   └── products/
│       ├── ProductCard.tsx
│       ├── ProductsList.tsx
│       ├── productsSlice.ts
│       └── useInfiniteProducts.ts
├── App.tsx
├── index.tsx
└── index.css


🚀 Getting Started

Prerequisites

Ensure you have Node.js (v16+) and npm or yarn installed on your machine.

Installation

Clone the repository:

git clone [https://github.com/Elite6802/E-Commerce-Product-Catalog.git](https://github.com/Elite6802/E-Commerce-Product-Catalog.git)
cd E-Commerce-Product-Catalog/prodev-fe


Install dependencies:

npm install
# or
yarn install


Run the development server:

npm start
# or
yarn start


Open http://localhost:3000 to view the app in your browser.

🎮 Usage

Once the application is running:

Initial Load: The app will fetch the first batch of products (e.g., 20 items). You will see a spinner briefly.

Scrolling: Scroll down the page. As you near the bottom (approx. 80-90% down), the Intersection Observer triggers a new API call.

Loading More: A smaller spinner appears at the bottom while new data is fetched and appended to the grid.

Error State: If you disconnect your internet or the API fails, an error banner will appear allowing you to retry the specific failed request.

🧩 Key Components

ProductsList.tsx

The container component. It subscribes to the Redux store to get the list of products and maps them to ProductCard components. It also contains the "sentinel" or "ref" element used to detect when the user has scrolled to the bottom.

ProductCard.tsx

A presentational component responsible for rendering product details (image, title, price, category). It includes CSS transitions for hover effects using Tailwind utility classes (e.g., hover:scale-105).

LoadingSpinner.tsx & ErrorBanner.tsx

Reusable UI components. ErrorBanner accepts a message and a onRetry callback prop to handle recovery flows.

⚙ Implementation Details

Infinite Scroll Logic

We use the Intersection Observer API via a custom hook or directly inside ProductsList. This is more performant than listening to window.onscroll events.

Snippet (src/features/products/ProductsList.tsx):

const observer = useRef<IntersectionObserver | null>(null);
const lastProductRef = useCallback((node: HTMLDivElement) => {
  if (isLoading) return; // Don't trigger if already fetching
  if (observer.current) observer.current.disconnect();

  observer.current = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && hasMore) {
      dispatch(fetchProducts(page + 1)); // Dispatch thunk for next page
    }
  });

  if (node) observer.current.observe(node);
}, [isLoading, hasMore, dispatch, page]);


State Management & Error Handling

We use Redux Toolkit createAsyncThunk to handle the asynchronous nature of fetching data.

State Shape:

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
}


Handling Errors: When an API call fails, the rejected case in the extraReducers catches the error. The UI reacts by checking state.status === 'failed' and rendering the ErrorBanner.

// In Component
if (status === 'failed') {
  return <ErrorBanner message={error} onRetry={() => dispatch(fetchProducts(page))} />;
}


🎨 Customization

Changing the Grid

The grid layout is defined in ProductsList.tsx using Tailwind classes. To change the number of columns:

// Current: 1 col mobile, 2 tablet, 3 desktop, 4 large desktop
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">


Styling Product Cards

Edit src/features/products/ProductCard.tsx. You can change shadow intensity, rounded corners, or font sizes using Tailwind classes directly in the JSX.

🔮 Future Enhancements

[ ] Search Functionality: Filter products by name locally or via API.

[ ] Category Filters: Add a sidebar or top bar to filter by product category.

[ ] Product Details Page: React Router integration to view single product details.

[ ] Virtualization: Implement react-window for performance if the list grows to thousands of items (DOM recycling).

[ ] Unit Testing: Add Jest/React Testing Library tests for reducers and components.

🤝 Contributing

Contributions are welcome!

Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.