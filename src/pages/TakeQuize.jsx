// src/components/QuizTaking.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function QuizTaking() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const docRef = doc(db, 'quizzes', quizId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setQuiz(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching quiz: ', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionIndex, option) => {
    setAnswers({
      ...answers,
      [questionIndex]: option
    });
  };

  const handleTextAnswerChange = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value
    });
  };

  const handleSubmit = () => {
    let totalScore = 0;
    quiz.questions.forEach((q, index) => {
      if (q.type === 'text') {
        if (answers[index]?.toLowerCase() === q.correctOption.toLowerCase()) {
          totalScore += 1;
        }
      } else if (q.type === 'mcq' || q.type === 'true_false') {
        if (answers[index] === q.correctOption) {
          totalScore += 1;
        }
      }
    });
    setScore(totalScore);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {quiz ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
          <p className="mb-6 text-lg text-gray-700">{quiz.description}</p>
          {quiz.questions.map((q, index) => (
            <div key={index} className="border p-4 mb-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">{q.question}</h3>
              {q.type === 'mcq' && (
                q.options.map((option, i) => (
                  <div key={i} className="mt-2 flex items-center">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleAnswerChange(index, option)}
                      className="mr-2"
                    />
                    <label className="text-lg">{option}</label>
                  </div>
                ))
              )}
              {q.type === 'true_false' && (
                <div className="mt-2 flex items-center">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value="true"
                    onChange={() => handleAnswerChange(index, 'true')}
                    className="mr-2"
                  />
                  <label className="text-lg">True</label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value="false"
                    onChange={() => handleAnswerChange(index, 'false')}
                    className="mr-2 ml-4"
                  />
                  <label className="text-lg">False</label>
                </div>
              )}
              {q.type === 'text' && (
                <input
                  type="text"
                  value={answers[index] || ''}
                  onChange={(e) => handleTextAnswerChange(index, e.target.value)}
                  className="w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Submit Answers
          </button>
          {score !== null && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">Your Score: {score}/{quiz.questions.length}</h3>
            </div>
          )}
        </div>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
}

export default QuizTaking;
