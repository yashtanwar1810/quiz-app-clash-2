// src/components/QuizCreation.js
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function QuizCreation() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', type: 'mcq', options: ['', ''], correctOption: '' },
  ]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', type: 'mcq', options: ['', ''], correctOption: '' },
    ]);
  };
  
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'quizzes'), {
        title,
        description,
        questions,
      });
      console.log('Quiz added with ID: ', docRef.id);
      navigate(`/quiz/${docRef.id}`); // Redirect to the quiz-taking page
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Create a New Quiz</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="p-2 space-y-4">
        <div className="space-y-2">
          <label className="block text-lg font-semibold">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-lg font-semibold">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {questions.map((q, index) => (
          <div key={index} className="border border-black p-4 rounded-md shadow-sm space-y-4">
            <h3 className="text-xl font-semibold">Question {index + 1}</h3>
            <div className="space-y-2">
              <label className="block text-lg font-semibold">Question Text:</label>
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-semibold">Question Type:</label>
              <select
                value={q.type}
                onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mcq">MCQ</option>
                <option value="true_false">True/False</option>
                <option value="text">Text Input</option>
              </select>
            </div>
            {q.type === 'mcq' && (
              <>
                {q.options.map((option, i) => (
                  <div key={i} className="space-y-2">
                    <label className="block text-lg font-semibold">Option {i + 1}:</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, i, e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <div className="space-y-2">
                  <label className="block text-lg font-semibold">Correct Option:</label>
                  <input
                    type="text"
                    value={q.correctOption}
                    onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
            {q.type === 'true_false' && (
              <div className="space-y-2">
                <label className="block text-lg font-semibold">Correct Answer:</label>
                <select
                  value={q.correctOption}
                  onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            )}
            {q.type === 'text' && (
              <div className="space-y-2">
                <label className="block text-lg font-semibold">Correct Answer:</label>
                <input
                  type="text"
                  value={q.correctOption}
                  onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="mx-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Another Question
        </button>
        <button
          type="submit"
          className="mr-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}

export default QuizCreation;
