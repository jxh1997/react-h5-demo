import Home from "@/pages/Home"
import Mine from "@/pages/Mine"

console.log(typeof process.env.API)

const routes = [
  {
    path: "/home",
    exact: true,
    component: Home
  },
  {
    path: "/mine",
    exact: true,
    component: Mine
  }
];

export default routes;