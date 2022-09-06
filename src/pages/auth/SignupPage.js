import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import FormInputComponent from "../../components/InputComponent";
import LogoComponent from "../../components/LogoComponent";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import registerUser from "../../redux/actions/auth/signup.action";
import ClipLoader from "react-spinners/ClipLoader";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Language, Currency } from "./Locale";

const Home = () => {
  const phoneRegExp = /^\d*(\+\d+)?$/;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    lastName: Yup.string().required("Last Name is required"),
    firstName: Yup.string().required("First Name is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(phoneRegExp, "Phone Number is not valid")
      .min(11, "Phone Number cannot be less than 11 digits")
      .max(14, "Phone Number must be more than digits"),
    // countryCode: Yup.string().required("Country Code is required"),
    // currencyCode: Yup.string().required("Currency Code is required"),
    // languageCode: Yup.string().required("Language Code is required"),
  });
  const [loading, setLoading] = useState(false);

  const countries = useMemo(() => countryList().getData(), []);
  const [language, setLanguage] = useState({ value: "en", label: "English" });
  const [currency, setCurrency] = useState({ value: "NGN", label: "Naira" });
  const [country, setCountry] = useState({ value: "NG", label: "Nigeria" });
  const [countryCodeError, setCountryCodeError] = useState(
    "Country is required"
  );
  const [currencyCodeError, setCurrencyCodeError] = useState(
    "Currency code is required"
  );
  const [languageCodeError, setLanguageCodeError] = useState(
    "Language Code is required"
  );

  const languageChange = (value) => {
    if (value) {
      setLanguage(value);
      setLanguageCodeError("");
    }
    setLanguage(value);
  };
  const currencyChange = (value) => {
    if (value) {
      setCurrency(value);
      setCurrencyCodeError("");
    }
  };
  const countryChange = (value) => {
    if (value) {
      setCountry(value);
      setCountryCodeError("");
    }
  };

  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    countryCode: "",
    currencyCode: "",
    languageCode: "",
  };

  const onSubmit = (values) => {
    if (
      country.value === "" ||
      currency.value === "" ||
      language.value === ""
    ) {
      return;
    }
    setLoading(true);
    values.countryCode = country.value;
    values.currencyCode = currency.value;
    values.languageCode = language.value;
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
      <LogoComponent />

      <div className="form__container">
        <p className="header">Create an account</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="two-column">
            <div className="form__wrapper">
              <FormInputComponent
                placeholder="Enter your first name"
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
                placeholder="Enter your last name"
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
                placeholder="Enter your email"
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
                placeholder="Enter your phone number"
                // label="Phone Number"
                type="text"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.errors.phoneNumber}
              />
            </div>
          </div>
          <div className="two-column">
            <div className="form__wrapper">
              <FormInputComponent
                type="password"
                placeholder="password"
                // label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
              />
            </div>
            <div className="form__wrapper">
              <FormInputComponent
                placeholder="Confirm password"
                // label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.errors.confirmPassword}
              />
            </div>
          </div>

          <div className="form__wrapper padding">
            <label>Select Country</label>
            <Select
              options={countries}
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
            <label>Select Language</label>
            <Select
              name="languageCode"
              options={Language}
              value={language}
              onChange={languageChange}
              className="select"
            />
            {language.value === "" && (
              <p className="error">{languageCodeError}</p>
            )}
          </div>
          <div className="form__wrapper padding">
            <label>Select Currency</label>
            <Select
              name="currencyCode"
              options={Currency}
              value={currency}
              onChange={currencyChange}
              className="select"
            />
            {currency.label === "" && (
              <p className="error">{currencyCodeError}</p>
            )}
          </div>
          <div className="form__wrapper padding">
            <Button disabled onClick={formik.handleSubmit} type="submit">
              {loading ? <ClipLoader color="white" size="40px" /> : "Sign Up"}
            </Button>
          </div>
        </form>
        <div>
          <p className="bottom__text">
            Already have an account?
            <span>
              <Link to="/"> Login</Link>{" "}
            </span>
          </p>
        </div>
      </div>
    </StyledHome>
  );
};
export default Home;
const StyledHome = styled.div`
  font-family: "Sofia Pro";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: auto;
  .form__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 600px;
    border: 1px solid #e6e6e6;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .header {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #21334f;
  }
  .two-column {
    width: 90%;
    display: flex;
    gap: 10px;
  }
  
  .form__wrapper {
    width: 90% !important;
  }
  .bottom__text {
    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #21334f;
    span {
      color: #14a800;
      Link {
        text-decoration: none;
      }
    }
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
