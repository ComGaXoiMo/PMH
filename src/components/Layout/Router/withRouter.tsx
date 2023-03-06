import { useLocation, useParams } from "react-router-dom";

export default function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const params = useParams();
    return <Component {...props} location={location} params={params} />;
  }

  return ComponentWithRouterProp;
}
