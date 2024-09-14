// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center">
        
        <div className="flex flex-col justify-center mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz App</h1>
      <p className="mb-6 text-lg">Choose an option below:</p>
      <div className="space-y-4">
        <Link
          to="/createquiz"
          className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create a New Quiz
        </Link>
        <Link
          to="/quizlist"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Browse Quizzes
        </Link>
      </div>
    </div>
      </div>
    </>
  );
}

export default Home;
