// src/components/QuizList.js
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuizzes(quizzesData);
      } catch (error) {
        console.error("Error fetching quizzes: ", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Available Quizzes</h2>
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="hover:bg-slate-200 hover:scale-[1.010] border p-4 rounded-md shadow-sm">
            <Link
              to={`/quiz/${quiz.id}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {quiz.title}
            </Link>
            <p className="mt-2 text-gray-600">{quiz.description}</p>
          </li>
        ))}
      </ul>

      <Link
          to="/createquiz"
          className="m-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create a New Quiz
        </Link>
        
    </div>
  );
}

export default QuizList;
