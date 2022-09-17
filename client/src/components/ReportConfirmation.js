import emailjs, { send } from "emailjs-com";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";

const ReportConfirmation = ({
  reportConfirmation,
  setReportConfirmation,
  post,
  recipe,
  postType,
}) => {
  const { user } = UserAuth();
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  let id;
  if (postType === "recipe") {
    id = recipe._id;
  } else if (postType === "post") {
    id = post._id;
  }

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  });

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
          <div className="p-4 w-[400px] h-[150px] confirmation flex flex-col items-center justify-center">
            {!confirmSubmit ? (
              <div>
                <p className="mb-8">
                  Does this contain explicit, offensive, or inappropriate
                  content?
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
              <div className="w-full h-full flex flex-col items-center">
                <FaTimes
                  className="cursor-pointer self-end"
                  onClick={() => setReportConfirmation(false)}
                />
                <p className="m-8">Report sent</p>
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
