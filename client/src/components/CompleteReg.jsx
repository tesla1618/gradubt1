import React from "react";
import axios from "axios";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import "../css/style.css";
import "../css/page.css";
import { useState } from "react";
import { API_URL } from "../config";

const LOCALHOST = `${API_URL}`;

const CompleteReg = () => {
  const { name, sid, dept } = useParams();
  const [formData, setFormData] = useState({
    sname: name,
    sid: sid,
    dept: dept,
    intake: null,
    section: null,
    session: "",
    dp: null,
  });
  const { intake, section, session, dp } = formData;

  const onChange = (e) => {
    // For file input
    if (e.target.name === "dp") {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("image-preview").src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);

      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData object to send the image
      const formData = new FormData();
      formData.append("sname", name);
      formData.append("sid", sid);
      formData.append("dept", dept);
      formData.append("intake", intake);
      formData.append("section", section);
      formData.append("session", session);
      formData.append("dp", dp); // assuming dp is a File object

      // Make a POST request to your backend with formData
      const response = await axios.post(`${LOCALHOST}/api/student/`, formData);

      // Handle the response or navigate the user accordingly
    } catch (error) {
      console.log(formData);
      // Handle error
    }
  };
  return (
    <>
      <Layout>
        <div className="pcontainer">
          <h2>Hello {name}</h2>
          <div class="alert alert-success" role="alert">
            Your account has been created successfully. However, you need to complete your registration by completing the following steps.
          </div>
          <div className="row">
            <div className="col-md-6 col-12 text-center">{dp && <img id="image-preview" alt="Preview" className="object-fit-cover rounded-circle" style={{ width: "200px", height: "200px", marginTop: "10px" }} />}</div>
            <div className="col-md-6 col-12">
              <form className="login-form" onSubmit={onSubmit} encType="multipart/form-data">
                <input type="text" name="name" disabled value={name} className="login-field" />
                <input type="text" name="sid" disabled value={sid} className="login-field" />
                <input type="text" name="dept" disabled value={dept} className="login-field" />
                <input onChange={(e) => onChange(e)} type="number" placeholder="Inake" name="intake" value={intake} className="login-field" />
                <input onChange={(e) => onChange(e)} type="number" placeholder="Section" name="section" value={section} className="login-field" />
                <input onChange={(e) => onChange(e)} type="text" placeholder="Session" name="session" value={session} className="login-field" />
                <input onChange={(e) => onChange(e)} type="file" placeholder="Profile Picture" name="dp" className="form-control dark inputfield" />
                <div className="" style={{ marginLeft: "103px" }}>
                  <button type="submit" className="btn  btn-success mt-5 ">
                    Complete Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CompleteReg;
