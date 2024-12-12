import React, { useState, useEffect, useContext } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
function Attendance() {
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [classId, setClassId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const { user } = useContext(AuthContext);
  const handleGenerate = async (event) => {
    event.preventDefault();
    if (!classId && (!course || !semester || !section)) {
      alert(
        "Please fill out either the custom class ID or all course details."
      );
      return;
    }
    if (!subjectCode) {
      alert("Please Fill The Subject Code.");
      return;
    }
    const date = new Date();
    const formattedDate = `${date.getDate()}${
      date.getMonth() + 1
    }${date.getFullYear()}`;
    const attendanceData = {
      classId,
      subjectCode,
      teacherId,
      formattedDate,
    };
    try {
      // const respond = await axios.post('https://server-vpgh.onrender.com/submit-teacher-data',attendanceData);
      await axios.post(
        "http://localhost:3000/submit-teacher-data",
        attendanceData
      );
      toast.success("⏰ Attendance started! Let's get rolling.");
    } catch (error) {
      toast.error("Error submitting data:", error);
    }

    setIsGenerated(true);
  };

  const [timeLeft, setTimeLeft] = useState(240); //set in  second
  useEffect(() => {
    if (isGenerated && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isGenerated, timeLeft]);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const handleEndAttendance = async () => {
    setIsGenerated(false);
    toast.success("Attendance is now closed. Thank you for participating.");
    setTimeLeft(240);
  
    try {
      const response = await axios.post('http://localhost:3000/end-attendance', { classId });
  
      console.log(response.data);
    } catch (error) {
      console.error("Error ending attendance session:", error);
      toast.error("Failed to close attendance. Please try again.");
    }
  };
  
  useEffect(() => {
    let c_id = `${course}${semester}${section}`;
    c_id = c_id.toUpperCase();
    setClassId(c_id);

    setTeacherId(user.teacherId);
  }, [course, semester, section, user.teacherId]);

  const [writingCourse, setWritingCourse] = useState(false);
  const [writingClassId, setWritingClassId] = useState(false);
  const handleCourse = (e) => {
    setCourse(e.target.value);
  };
  const handlerClassId = (e) => {
    setClassId(e.target.value.toUpperCase());
  };
  const handlerSubjectCode = (e) => {
    setSubjectCode(e.target.value.toUpperCase());
  };
  useEffect(() => {
    if (course !== "") {
      setWritingCourse(true);
    }
    if (classId !== "" && course === "") {
      setWritingClassId(true);
    }
    if (course === "" && classId === "") {
      setWritingClassId(false);
      setWritingCourse(false);
    }
  }, [course, classId]);
  return (
    <div className="w-full h-full flex flex-col items-center pt-9">
      <div className="bg-[#FCFCFC] w-1/3 h-[5rem] flex justify-center items-center rounded-lg shadow-sm">
        <p className="text-3xl font-semibold text-gray-900">Take Attendance</p>
      </div>
      <div className="bg-[#FCFCFC] w-[55%] max-w-2xl p-8 mt-10 rounded-lg shadow-lg space-y-6 mx-auto">
        {!isGenerated ? (
          <form onSubmit={handleGenerate} className="flex flex-col space-y-6">
            {/* Course and Semester Fields */}
            <div className="flex justify-between">
              <div className="w-1/2 pr-2">
                <label className="block mb-1 font-semibold text-gray-700 text-xl">
                  Course
                </label>
                <input
                  type="text"
                  placeholder="BCA, BSc IT, BTech"
                  value={course}
                  onChange={handleCourse}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                  disabled={writingClassId}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block mb-1 font-semibold text-gray-700 text-xl">
                  Semester
                </label>
                <input
                  type="number"
                  placeholder="1, 2, 3"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                  disabled={writingClassId}
                />
              </div>
            </div>
            {/* Section and Subject Fields */}
            <div className="flex justify-between">
              <div className="w-1/2 pr-2">
                <label className="block mb-1 font-semibold text-gray-700 text-xl">
                  Section
                </label>
                <input
                  type="text"
                  placeholder="A, B, C"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                  disabled={writingClassId}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block mb-1 font-semibold text-gray-700 text-xl">
                  Subject Code
                </label>
                <input
                  type="text"
                  placeholder="TBC501 ,TBC402"
                  value={subjectCode}
                  onChange={handlerSubjectCode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>
            </div>
            {/* Divider Line with "OR" */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* Class ID and Date Fields */}
            <div className="flex justify-between">
              <div className="w-1/2 pr-2">
                <label className="block mb-1 font-semibold text-gray-700 text-xl">
                  Class ID
                </label>
                <input
                  type="text"
                  placeholder="BCA5E, BTech3A"
                  value={classId}
                  onChange={handlerClassId}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                  readOnly={writingCourse}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block mb-1 font-semibold text-gray-700 text-xl">
                  Date
                </label>
                <input
                  type="text"
                  value={today}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200 bg-gray-100"
                />
              </div>
            </div>
            {/* Generate Button */}
            <button
              type="submit"
              className="w-1/3 py-2 mt-4 font-semibold text-white bg-[#45AA40] rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 mx-auto"
            >
              Generate
            </button>
          </form>
        ) : (
          // Qr Genratore
          <div className="text-center flex flex-col items-center space-y-4">
            {/* QR Code */}
            <QRCodeCanvas value="https://student-flax.vercel.app/student-attendance" size={200} />
            {/* Timer */}
            <p className="text-lg font-semibold text-gray-700">{`Time Remaining: ${formatTime(
              timeLeft
            )}`}</p>
            {/* End Attendance Button */}
            <button
              onClick={handleEndAttendance}
              className="w-1/3 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200 mx-auto"
            >
              End Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
