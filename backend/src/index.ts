import express, { Request, Response } from 'express';
import cors from 'cors';
import { quizService } from './services/quizService';


const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.get('/quizzes', async (req:Request, res:Response) => {
    try {
        const quizzes = await quizService.getAllQuizzes()
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
});

app.get('/quizzes/:id', async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid quiz ID' });
        const quiz = await quizService.getQuizById(Number(req.params.id))

        if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quiz' });
    }
});
app.post('/quizzes', async (req:Request, res:Response) => {
    try {
        const { title, questions } = req.body;

        const quiz = await quizService.createQuiz({title,questions})

        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data', details: error });
    }
});


app.delete('/quizzes/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid quiz ID' });
  
    try {
      await quizService.deleteQuizById(id);
      res.status(204).send();
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Failed to delete quiz' });
    }
  });
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }); 