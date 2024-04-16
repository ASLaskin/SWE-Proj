const About = () => {
    return (
      <div className='bg-gray-100 min-h-screen'>
        <header className='py-8 text-center'>
          <h1 className='text-3xl font-bold text-primaryColor'>About Us</h1>
        </header>
        <main className='container mx-auto'>
          <section className='bg-white rounded-lg shadow-md p-8 mb-8'>
            <h2 className='text-xl font-bold mb-4'>Our Mission</h2>
            <p className='text-gray-700'>
              Here at Craven, we are on a mission to revolutionize the way people
              discover and enjoy food. We believe that everyone deserves access to delicious and
              nutritious meals, and our platform is designed to make that a reality.
            </p>
          </section>
          <section className='bg-white rounded-lg shadow-md p-8 mb-8'>
            <h2 className='text-xl font-bold mb-4'>Why Recipes?</h2>
            <p className='text-gray-700'>
              Food has the power to bring people together, evoke memories, and ignite creativity.
              However, with the abundance of recipes available online, finding the perfect dish can be
              overwhelming. That's where we come in. Our app simplifies the process of discovering new
              recipes by providing a curated selection tailored to your preferences.
            </p>
          </section>
          <section className='bg-white rounded-lg shadow-md p-8'>
            <h2 className='text-xl font-bold mb-4'>Join Our Journey</h2>
            <p className='text-gray-700'>
              We are just getting started, and we invite you to be a part of our culinary adventure.
              Whether you're a seasoned chef or a cooking novice, there's something for everyone in
              our community. Together, let's explore the endless possibilities of cooking and create
              unforgettable dining experiences.
            </p>
          </section>
        </main>
        <footer className='text-center pt-10 '>
          <p className='text-gray-600'>&copy; 2024 Craven. All rights reserved.</p>
        </footer>
      </div>
    );
  };
  
  export default About;  