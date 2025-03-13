const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Welcome to My sivu 😊</h1>
        <p className="mb-4 text-lg text-gray-700 text-center">This is the home page of our application.</p>
        <p className="mb-6 text-lg text-gray-700 text-center">Here you can find various features and navigate through different sections.</p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Sign up to create an account ✍️</li>
          <li>Log in to access your profile 🔑</li>
          <li>Browse restaurants and their menus 🍽️</li>
          <li>Leave feedback (Comment + Rating (1-5)) and like menus 👍</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
