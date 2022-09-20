import React, { useState, useEffect} from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import FormInputComponent from "../../components/InputComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import request from "../../utils/apiHelper";
import { toast } from "react-toastify";
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

  useEffect(() => {
    // eslint-disable-next-line
    getUser();
    // eslint-disable-next-line
  }, []);
  const initialValues = {
    email: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
  };
  const dismissToast = () => {
    toast.dismiss();
  };
  const getUser = async () => {
    try {
      const response = await request.get(`profile`);
      let promiseFulfilled = response.data.data;
      formik.setFieldValue("firstName", promiseFulfilled.firstName);
      formik.setFieldValue("lastName", promiseFulfilled.lastName);
      formik.setFieldValue("email", promiseFulfilled.email);
      formik.setFieldValue("phoneNumber", promiseFulfilled.phoneNumber);
      
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
    }
  };
  const updatePofile = async (values) => {
    try {
      const response = await request.put(`profile`, values);
      let promiseFulfilled = response.data;
      toast.success(promiseFulfilled.message, {
        autoClose: 2000,
        onClose: dismissToast,
      });
    } catch (error) {
      toast.error(error, {
        autoClose: 2000,
        onClose: dismissToast,
      });
    }
  };
  const onSubmit = (values) => {
    setLoading(true);
    updatePofile(values);
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
              <div className="form__wrapper padding">
                <Button disabled={
                  formik.errors.firstName ||
                  formik.errors.lastName ||
                  formik.errors.email ||
                  formik.errors.phoneNumber
                    ? true: false}  onClick={formik.handleSubmit} type="submit">
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
