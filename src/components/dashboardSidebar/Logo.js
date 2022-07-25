import Logo from "../assets/logo.svg";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const LogoDesign = () => {
  const history = useHistory();
  return(
    <LogoStyle onClick={()=>history.push("/home")}>
          <img src={Logo} alt="logo" className="logo" />
          <p className="logo-text">
            <span className="logo-total">Total</span>
            <span className="logo-care">HealthCare</span>
          </p>
        </LogoStyle>
  )
}
export default LogoDesign;
const LogoStyle = styled.div`
  max-width:200px;
  display: flex;
  align-items: center;
  padding:10px;
  cursor: pointer;
  /* background:red ; */

.logo{
  margin-top:-10px;
}
.logo-text{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logo-total{
  font-size: 18px;
  font-weight: 700;
  color: #071232;

}
.logo-care{
  font-size: 18px;
  font-weight: normal;
  color: #071232;
  margin-top:-10px;

}
`;