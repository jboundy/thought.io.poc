import LandingPage from "../features/home/landingPage";

const BaseRoutes = {
  path: "/",
  children: [
    {
      path: "home",
      element: <LandingPage />,
    },
  ],
};

export default BaseRoutes;
