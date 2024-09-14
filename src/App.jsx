// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Home";
import QuizCreation from "./pages/CreateQuiz";
import QuizList from "./pages/QuizList";
import QuizTaking from "./pages/TakeQuize";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/createquiz" element={<QuizCreation />} />
        <Route path="/quiz/:quizId" element={<QuizTaking />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
