import { useState } from "react";
import { FaSortUp, FaSortDown, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";

const Reports = () => {
  const [isAscending, setIsAscending] = useState(true);

  // Sample Revenue Data
  const revenueData = {
    monthRevenue: "₹50,000",
    lastMonthRevenue: "₹45,000",
    growthRate: "+15%",
    subscriptionRevenue: "₹30,000",
    oneTimePayments: "₹20,000",
    pendingAmount: "₹10,000",
    overduePayments: "₹5,000",
    highestEarningMonth: "July ₹80,000",
    lowestEarningMonth: "January ₹30,000",
    jobPostingRevenue: "₹20,000",
  };

  // Toggle sorting order
  const toggleSort = () => {
    setIsAscending(!isAscending);
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text("Reports Dashboard", 20, 20);
    doc.text(`Month’s Revenue: ${revenueData.monthRevenue}`, 20, 30);
    doc.text(`Last Month’s Revenue: ${revenueData.lastMonthRevenue}`, 20, 40);
    doc.text(`Growth Rate: ${revenueData.growthRate}`, 20, 50);
    doc.text(`Subscription Revenue: ${revenueData.subscriptionRevenue}`, 20, 60);
    doc.text(`One-Time Payments: ${revenueData.oneTimePayments}`, 20, 70);
    doc.text(`Pending Amount: ${revenueData.pendingAmount}`, 20, 80);
    doc.text(`Overdue Payments: ${revenueData.overduePayments}`, 20, 90);
    doc.text(`Highest Earning Month: ${revenueData.highestEarningMonth}`, 20, 100);
    doc.text(`Lowest Earning Month: ${revenueData.lowestEarningMonth}`, 20, 110);
    doc.text(`Job Posting Revenue: ${revenueData.jobPostingRevenue}`, 20, 120);
    doc.save("JobPortal_Report.pdf");
  };  

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="bg-white shadow-md p-4 md:p-6 rounded-lg">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-semibold mb-4 sm:mb-0">Reports</h1>
          <button
            onClick={downloadReport}
            className="flex items-center bg-green-500 text-white px-3 py-2 md:px-4 md:py-2 rounded hover:bg-green-600 text-sm md:text-base"
          >
            <FaDownload className="mr-2" /> Download Report (PDF)
          </button>
        </div>

        {/* Reports Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-200 p-4 rounded-lg text-sm md:text-base">
            <p>📌 <b>Total Jobs Posted:</b> 500</p>
            <p>🏆 <b>Total Applicants:</b> 1,200</p>
            <p>❌ <b>Rejected Applications:</b> 300</p>
            <p>📜 <b>Active Subscriptions:</b> 120 Paid</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg text-sm md:text-base">
            <p>📌 <b>Total Job Applications:</b> 12,500</p>
            <p>✅ <b>Accepted Applications:</b> 8,000</p>
            <p>❌ <b>Rejected Applications:</b> 3,500</p>
            <p>⏳ <b>Pending Applications:</b> 1,000</p>
          </div>
        </div>

        {/* Payment & Revenue Reports */}
        <div className="bg-white shadow-md p-4 md:p-6 rounded-lg">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Payment & Revenue Reports</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Total Revenue Generated */}
            <div>
              <h3 className="text-md md:text-lg font-semibold mb-2 flex items-center">
                Total Revenue Generated
                <button onClick={toggleSort} className="ml-2">
                  {isAscending ? <FaSortUp /> : <FaSortDown />}
                </button>
              </h3>
              <p>📈 <b>Month’s Revenue:</b> {isAscending ? revenueData.monthRevenue : revenueData.lastMonthRevenue}</p>
              <p>📊 <b>Growth Rate:</b> {revenueData.growthRate}</p>
              <p>📆 <b>Last Month’s Revenue:</b> {revenueData.lastMonthRevenue}</p>
              <p>💳 <b>Subscription Revenue:</b> {revenueData.subscriptionRevenue}</p>
              <p>💰 <b>One-Time Payments:</b> {revenueData.oneTimePayments}</p>
            </div>

            {/* Pending Payments & Month Report */}
            <div>
              <h3 className="text-md md:text-lg font-semibold mb-2">Pending Payments & Month Report</h3>
              <p>⏳ <b>Total Pending Amount:</b> {revenueData.pendingAmount}</p>
              <p>🚨 <b>Overdue Payments (30+ Days):</b> {revenueData.overduePayments}</p>
              <p>🏆 <b>Highest Earning Month:</b> {revenueData.highestEarningMonth}</p>
              <p>📉 <b>Lowest Earning Month:</b> {revenueData.lowestEarningMonth}</p>
              <p>📋 <b>Job Posting Revenue:</b> {revenueData.jobPostingRevenue}</p>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Reports;