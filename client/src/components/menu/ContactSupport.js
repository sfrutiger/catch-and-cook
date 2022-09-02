import { useState } from "react";
import emailjs, { send } from "emailjs-com";
import { UserAuth } from "../../context/AuthContext";

const ContactSupport = ({ setDisplayCase }) => {
  const { user } = UserAuth();
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [subject, setSubject] = useState("Support request with no subject");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    var templateParams = {
      username: user.displayName,
      email: user.email,
      subject: subject,
      message: message,
    };

    emailjs
      .send(
        "default_service",
        "catch_and_cook_support",
        templateParams,
        "aEwWQf9sNli1z8mmf"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setConfirmSubmit(!confirmSubmit);
    setTimeout(() => {
      setConfirmSubmit(false);
    }, 3000);
    e.target.reset();
  };

  return (
    <div name="contact" className="w-[50%] h-screen">
      <div className="section">
        <h1 className="section-header">
          Submit your request for support below
        </h1>
        <div className="w-full flex flex-col items-center">
          <form
            className="flex flex-col py-2 w-full md:w-[75%]"
            onSubmit={(e) => sendEmail(e)}
          >
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              required
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Message</label>
            <textarea
              name="message"
              required
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="buttons mt-2">Send request</button>
          </form>
          <button
            className="buttons mt-0"
            onClick={() => {
              setDisplayCase("settings");
            }}
          >
            Cancel
          </button>
          <p className={!confirmSubmit ? "hidden" : "flex text-green-500"}>
            Message sent
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
