# Couplr: Advisor Match Mini-App 🚀

**Live Demo (Frontend):** [npx plugins add vercel/vercel-plugin]

## 💼 Business Context & Monetization
Couplr is a two-sided marketplace designed for Lead Generation. 
Users often drop off when faced with a massive directory of financial advisors. We solve this by introducing a frictionless **Quiz Flow**.
- **How it makes money:** The platform monetizes "quality conversations". By narrowing down choices to a Top-3 match and offering an easy way to send an intro message, we significantly increase the conversion rate from visitor to hot lead.

## 🏗 Architecture: SPA vs SSR
We strictly separated rendering strategies based on business needs:
- **`/quiz` (SPA):** The quiz uses Client-Side Rendering (React state). Why? Because quiz transitions must be instant without page reloads to prevent user drop-off.
- **`/advisor/[id]` (SSR):** The advisor public profile uses Server-Side Rendering. Why? Advisor profiles must be indexable by Google (SEO) and correctly display metadata when shared on social media.

## 📊 Analytics & Tracking (The Funnel)
To measure our conversion flow, we track critical user journey events. In Phase 1, these fire correctly in the console and are prepared to be routed to a `tracking_events` DB table:
1. `QUIZ_STARTED` - Fired when the user lands on the quiz page.
2. `MATCH_FOUND` - Fired when the backend returns the Top-3 advisors.
3. `MESSAGE_SENT` - Fired upon successful form submission. **Includes metadata:** `{ advisorId, timestamp }`.

## 🔌 API Documentation
- `POST /quiz` - Accepts answers, calculates match scores, and returns Top 3 advisors.
- `GET /advisors/:id` - Returns public profile data for a specific advisor.
- `POST /messages` - Saves the lead's message (`advisorId`, `senderName`, `senderEmail`, `body`) to the database.

## 🗄 Database Details (PostgreSQL)
The backend includes a fully structured TypeORM implementation:
- `matches(quiz_response_id)` - **Index created** via TypeORM `@Index` decorator for performance.
- Migrations & Seeds: Located in `backend/database/migration/` (`01-create-tables.sql`, `02-seed-advisors.sql`).
- Raw SQL Query: Added `03-top-advisors-query.sql` demonstrating a LEFT JOIN to get the Top 5 advisors by message count.

## 🧪 QA & Test Scenarios
**Base Scenarios:**
1. Quiz completion flow works end-to-end.
2. Results display exactly 3 matched advisors.
3. Advisor profile URL is accessible directly.
4. Message form requires all fields.
5. Message successfully saves to DB.

**Custom Edge Cases:**
1. **Direct Access to Results:** If a user visits `/results` without taking the quiz, they are safely redirected back to `/quiz`.
2. **Backend Network Error:** If NestJS is down, the Next.js frontend catches the `fetch` error and prevents a hard crash.
3. **Empty Message Submission:** HTML5 validation prevents submission of empty lead forms.
4. **Mobile Responsiveness:** Tailwind grid dynamically collapses from 3 columns to 1 on screens `< 640px`.
5. **Non-existent Advisor ID:** Accessing `/advisor/9999` safely handles the null data state.

## 🚀 How to Run Locally
1. Clone the monorepo.
2. Run SQL migrations from `backend/database/migration/`.
3. Open Terminal 1: `cd backend && npm install && npm run start:dev` (Port 3001)
4. Open Terminal 2: `cd frontend && npm install && npm run dev` (Port 3000)