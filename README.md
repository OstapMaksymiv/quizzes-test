
# Quiz App

This project consists of a **Next.js frontend** and a **Node.js (Express) backend** connected via a **PostgreSQL database** using **Prisma ORM**.

## 📦 Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS
- **Backend:** Express.js, TypeScript, Prisma
- **Database:** PostgreSQL

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/OstapMaksymiv/quizzes-test.git
cd quiz-test
```

### 2. Install Dependencies

```bash
# For frontend
cd frontend
npm install

# For backend
cd backend
npm install
```

### 3. Set Up Environment Variables

#### Backend `.env`

```
DATABASE_URL="postgresql://user:password@localhost:5432/Quizes"
PORT=3455
```

#### Frontend `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:3455
```

> Replace with your actual PostgreSQL connection string.

### 4. Set Up the Database

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the Servers

```bash
# Start backend
cd backend
npm run dev

# Start frontend (in another terminal)
cd frontend
npm run dev
```

---

## 🧪 Creating a Sample Quiz

Use the frontend **Create Quiz** page:

1. Go to `http://localhost:3000/quizzes/create`
2. Fill in quiz title, questions, type (input, checkbox, boolean), and correct answers.
3. Save the quiz.

Or manually via backend (using tools like Postman or cURL):

```http
POST http://localhost:3455/quizzes
Content-Type: application/json

{
  "title": "Sample Quiz",
  "questions": [
    {
      "question": "What is 2+2?",
      "type": "input",
      "options": [],
      "correctAnswer": ["4"]
    }
  ]
}
```

---

## 📁 Folder Structure

```
/frontend
  ├── app/
  ├── components/
  ├── services/

/backend
  ├── src/
  │   ├── services/
  │   ├── lib/
  │   ├── types/
  │   └── index.ts
  └── prisma/
      └── schema.prisma
```

---

## 🛠 Scripts

### Frontend

```bash
npm run dev         # Start dev server
npm run build       # Production build
npm run lint        # Run ESLint
```

### Backend

```bash
npm run dev         # Start dev server with ts-node-dev
npm run build       # Compile to JS
npm run start       # Run compiled JS
```
