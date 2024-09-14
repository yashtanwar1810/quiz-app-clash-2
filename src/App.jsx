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
import QuizCreation from "./pages/CreateQuiz";
import QuizList from "./pages/QuizList";
import QuizTaking from "./pages/TakeQuize";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/createquiz" element={<QuizCreation />} />
        <Route path="/quiz/:quizId" element={<QuizTaking />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
