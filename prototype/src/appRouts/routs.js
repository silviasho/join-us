import { Route } from "react-router-dom";
import React from "react";



const AppRoutes = (props) => {

  const { routes } = props
  const result = routes.map((route, i) =>
    <Route {...route} key={i} />
  )
  return <>{result}</>







}



export default AppRoutes





