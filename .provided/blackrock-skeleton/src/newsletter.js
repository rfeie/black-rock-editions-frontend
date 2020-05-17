const newsletterText = `We will keep you updated on print clinics, news and what we are doing.`;

const newsletter = `
<div class="sign-up">
  <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
    <div class="lg:w-0 lg:flex-1">
      <h2 class="newsletter-header text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
        Sign up for our newsletter
      </h2>
      <p class="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
        ${newsletterText}
      </p>
    </div>
    <div class="mt-8 lg:mt-0 lg:ml-8">
      <form class="sm:flex">
      <!-- <input aria-label="Email address" type="email" required class="appearance-none w-full px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out sm:max-w-xs" placeholder="Enter your email" />
      <input aria-label="Email address" type="email" required class="text-input" /> -->
      <div class="section">
      <div class="container-input">
        <input class="text-input" type="text" placeholder=" ">
        <div class="clip-second-outer">
          <div class="fill-second">
            <div class="fill-second-zigzag1 fill-second-zigzag"></div>
            <div class="fill-second-rect1"></div>
          </div>
        </div>
        <div class="clip-second-inner">
          <div class="fill-second">
            <div class="fill-second-zigzag2 fill-second-zigzag"></div>
            <div class="fill-second-rect2"></div>
          </div>
        </div>
        <div class="clip-second-inner">
          <div class="fill-second">
            <div class="fill-second-zigzag3 fill-second-zigzag"></div>
            <div class="fill-second-rect3"></div>
          </div>
        </div>
      </div>
      your email
    </div>
      <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button class="btn btn--border w-full flex items-center justify-center px-5 py-3">Sign up<span></span></button>
        </div>
      </form>
      <p class="mt-3 text-sm leading-5 text-gray-300">
        We care about the protection of your data. Read our
        <a href="#" class="text-white font-medium underline">
          Privacy Policy.
        </a>
      </p>
    </div>
  </div>
</div>
`;

export default newsletter;
