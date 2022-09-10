import emailjs, { send } from "emailjs-com";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { FaTimes } from "react-icons/fa";

const ReportConfirmation = ({
  reportConfirmation,
  setReportConfirmation,
  post,
  recipe,
  postType,
}) => {
  const auth = getAuth();
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(
    auth ? auth.currentUser.email : "no email"
  );

  let id;
  if (postType === "recipe") {
    id = recipe._id;
  } else if (postType === "post") {
    id = post._id;
  }

  const sendEmail = () => {
    var templateParams = {
      email: email,
      type: "Report of offensive or innapropriate content",
      subject: `${postType} ${id}`,
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
      setReportConfirmation(false);
    }, 3000);
  };

  const handClick = () => {
    console.log("report post");
    sendEmail();
  };

  return (
    <>
      {reportConfirmation ? (
        <div className="absolute w-full h-full top-0 left-0 bg-black/[0.6] z-10 flex items-center justify-around">
          <div className="p-4 w-[400px] h-[150px] bg-slate-600 rounded-lg flex flex-col items-center justify-center">
            {!confirmSubmit ? (
              <div>
                <p className="mb-8">
                  Does this contain offensive or inappropriate content?
                </p>
                <div className="flex w-full">
                  <button
                    className="buttons h-[40px] ml-2 mr-1"
                    onClick={() => setReportConfirmation(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="buttons h-[40px] mr-2 ml-1"
                    onClick={() => {
                      handClick();
                    }}
                  >
                    Report {postType}
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <FaTimes
                  className="absolute right-0 cursor-pointer"
                  onClick={() => setReportConfirmation(false)}
                />
                <p className="p-12">Report sent</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ReportConfirmation;
