import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import FormInputComponent from "../../components/InputComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import registerUser from "../../redux/actions/auth/signup.action";
import ClipLoader from "react-spinners/ClipLoader";
// Validation for profile update

const phoneRegExp = /^\d*(\+\d+)?$/;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    
    lastName: Yup.string().required("Last Name is required"),
    firstName: Yup.string().required("First Name is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(phoneRegExp, "Phone Number is not valid")
      .min(11, "Phone Number cannot be less than 11 digits")
      .max(14, "Phone Number must be more than digits"),
  });


const Home = () => {
  
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  const [disabled, setDisabled] = useState(true);
// console.log(countryOptions);

  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
  };
  const onSubmit = (values) => {
    setLoading(true);
    delete values.confirmPassword;
    dispatch(registerUser(values));
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
      <StyledHome>
          <p>Edit profile</p>
            <form onSubmit={formik.handleSubmit}>
              <div className="two-column">
                <div className="form__wrapper">
                  <FormInputComponent
                    placeholder="First Name"
                    // label="First Name"
                    name="firstName"
                    type="text"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.errors.firstName}
                  />
                </div>
                <div className="form__wrapper">
                  <FormInputComponent
                    placeholder="Last Name"
                    // label="Last Name"
                    name="lastName"
                    type="text"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.errors.lastName}
                  />
                </div>
              </div>
              <div className="two-column">
                <div className="form__wrapper">
                  <FormInputComponent
                    placeholder="Email"
                    // label="Email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                  />
                </div>

                <div className="form__wrapper">
                  <FormInputComponent
                    placeholder="Phone Number"
                    // label="Phone Number"
                    type="text"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={formik.errors.phoneNumber}
                  />
                </div>
              </div>

              {/* <div className="form__wrapper padding">
                <label>Country</label>
                <Select
                  options={countryOptions}
                  value={country}
                  onChange={countryChange}
                  name="countryCode"
                  className="select"
                />
                {country.value === "" && (
                  <p className="error">{countryCodeError}</p>
                )}
              </div>
              <div className="form__wrapper padding">
                <label>Language</label>
                <Select
                  name="languageCode"
                  options={languageOptions}
                  value={language}
                  onChange={languageChange}
                  className="select"
                />
                {language.value === "" && (
                  <p className="error">{languageCodeError}</p>
                )}
              </div>
              <div className="form__wrapper padding">
                <label>Currency</label>
                <Select
                  name="currencyCode"
                  options={currencyOptions}
                  value={currency}
                  onChange={currencyChange}
                  className="select"
                />
                {currency.label === "" && (
                  <p className="error">{currencyCodeError}</p>
                )}
              </div> */}
              <div className="form__wrapper padding">
                <Button disabled={disabled} onClick={formik.handleSubmit} type="submit">
                  {loading ? <ClipLoader color="white" size="40px" /> : "Save"}
                </Button>
              </div>
            </form>
      </StyledHome>
  );
};
export default Home;
const StyledHome = styled.div`
  .two-column {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form__wrapper {
    width: 100%;
  }
  .padding {
    margin-bottom: 15px;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .select {
    height: 2.5rem;
    font-size: 0.9rem;
  }
  label {
    margin-bottom: -5px;
    font-size: 0.9rem;
  }
  .error {
    color: red;
    font-size: 0.7rem;
  }
  @media only screen and (max-width: 600px) {
    .two-column {
      flex-direction: column;
    }
    .select {
      width: 90%;
    }
  }
`;
