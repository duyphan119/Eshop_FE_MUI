import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiOAuthLogin } from "../../api/apiAuth";

const OAuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("object");
  useEffect(() => {
    apiOAuthLogin(dispatch, navigate);
  }, [dispatch, navigate]);
  return <></>;
};

export default OAuthPage;
