import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { getOverview } from "../../../services/apiServices";

function DashBoard() {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverview();
  }, []);

  async function fetchDataOverview() {
    const res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);

      let totalQuiz = res?.DT?.others?.countQuiz || 0;
      let totalQuestion = res?.DT?.others?.countQuestions || 0;
      let totalAnswer = res?.DT?.others?.countAnswers || 0;

      const data = [
        {
          name: "Quizzes",
          "Total quizzes": totalQuiz,
        },
        {
          name: "Questions",
          "Total questions": totalQuestion,
        },
        {
          name: "Answers",
          "Total answers": totalAnswer,
        },
      ];

      setDataChart(data);
    }
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <h1 className="fs-4 fw-bold me-auto">Dashboard</h1>
      </div>
      <div>
        <div className="row">
          <div className="col-6">
            <div className="row gy-4">
              <div className="col-6">
                <div className="text-center py-5 border border-1 border-primary rounded 1">
                  <h2 className="fs-5 mb-2">Total User</h2>
                  <p className="fs-2">
                    {(dataOverview && dataOverview.users && dataOverview.users.total) || 0}
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center py-5 border border-1 border-primary rounded 1">
                  <h2 className="fs-5 mb-2">Total Quizzes</h2>
                  <p className="fs-2">
                    {(dataOverview && dataOverview.others && dataOverview.others.countQuiz) || 0}
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center py-5 border border-1 border-primary rounded 1">
                  <h2 className="fs-5 mb-2">Total Questions</h2>
                  <p className="fs-2">
                    {(dataOverview && dataOverview.others && dataOverview.others.countQuestions) ||
                      0}
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center py-5 border border-1 border-primary rounded 1">
                  <h2 className="fs-5 mb-2">Total Answers</h2>
                  <p className="fs-2">
                    {(dataOverview && dataOverview.others && dataOverview.others.countAnswers) || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dataChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total quizzes" fill="#8884d8" />
                <Bar dataKey="Total questions" fill="#82ca9d" />
                <Bar dataKey="Total answers" fill="#fcdb14" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
