# Daankwee Development Handbook — Clean Production Base
Generated: 2025-11-08

## Stack
- Next.js 5 (Pages Router)
- Tailwind CSS (dark mode via `class`)
- Prisma + SQLite (local dev)
- JWT auth with HttpOnly cookie
- Resend for email
- Zod for validation
- Client-side Cart (Context + localStorage)

## 1. Project Setup
```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install @prisma/client prisma bcryptjs jsonwebtoken cookie resend zod
```
Initialize Tailwind (already configured with `tailwind.config.js` and `postcss.config.js`).

## 2. Environment
Create `.env` in project root:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="<generate a long random hex>"
RESEND_API_KEY="re_xxx"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
CONTACT_PRIMARY_EMAIL="daankwee33@gmail.com"
```
Generate a JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 3. Database
```bash
npx prisma migrate dev --name init
npx prisma studio   # optional UI
```

## 4. Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm start` — start production

## 5. Pages & Purpose (initial copy included)
- `/` — **Home**: mission, CTA to shop and about
- `/about` — **About**: brand story and mission
- `/blog` — **Blog** placeholder (hook to existing helpers later)
- `/products` — **Products**: sample items with **Add to Cart**
- `/services` — **Services** list
- `/team` — **Team** cards
- `/faq` — **FAQ** (accordion)
- `/contact` — **Contact** form -> Resend
- `/login`, `/register`, `/forgot-password`, `/reset-password` — **Auth**

## 6. Auth Flow
- `/api/register` — create user, bcrypt hash
- `/api/login` — verify password, set JWT cookie (HttpOnly, secure in prod)
- `/api/logout` — clear cookie
- `/api/forgot-password` — send time-limited token link via Resend
- `/api/reset-password` — verify token, update hash
- `/api/session` — returns current user (for Navbar)

## 7. Cart
- Client-only (Context + localStorage)
- `CartProvider` wraps `_app.js`
- Navbar shows 🛒 with count
- `/products` can add to cart
- `/cart` shows items, qty, remove, clear; checkout placeholder

## 8. Deployment Notes
- Set `NEXT_PUBLIC_APP_URL` to your real domain
- Use a verified sender in Resend (e.g., `noreply@daankwee.com`)
- Switch DB to Postgres in production by updating `schema.prisma` and `DATABASE_URL`

## 9. Git Clean Start
```bash
# in project root
git init
git add .
git commit -m "Initial: clean Next.js base with auth, cart, dark mode"
```
(If using GitHub, create a repo and push.)

## 10. Next Steps
- Replace sample products with real data (id/title/price)
- Add Profile/Orders pages (after we connect a real checkout)
- Integrate Stripe or PayPal for payments
- Hook Blog to your existing content utilities
