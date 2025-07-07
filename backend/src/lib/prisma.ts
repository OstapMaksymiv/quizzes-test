import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();
// async function main() {
//     await prisma.quiz.create({
//       data: {
//         title: 'Sample Quiz',
//         questions: {
//           create: [
//             {
//               question: 'Is the sky blue?',
//               type: 'boolean',
//               options: [],
//               correctAnswer: { set: ['true'] },
//             },
//             {
//               question: 'What is the capital of France?',
//               type: 'input',
//               options: [],
//               correctAnswer: { set: ['paris'] },
//             },
//             {
//               question: 'Select the fruits:',
//               type: 'checkbox',
//               options: ['Apple', 'Carrot', 'Banana', 'Potato'],
//               correctAnswer: { set: ['Apple', 'Banana'] },
//             },
//           ],
//         },
//       },
//     });
  
//     console.log('✅ Seed complete');
//   }
  
//   main()
//     .catch((e) => {
//       console.error(e);
//       process.exit(1);
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
export default prisma;