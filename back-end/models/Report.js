import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    totalJobsPosted: { type: Number, default: 0 },
    totalApplicants: { type: Number, default: 0 },
    rejectedApplications: { type: Number, default: 0 },
    activeSubscriptions: { type: Number, default: 0 },

    jobApplications: {
        total: { type: Number, default: 0 },
        accepted: { type: Number, default: 0 },
        rejected: { type: Number, default: 0 },
        pending: { type: Number, default: 0 }
    },

    paymentRevenue: {
        totalRevenue: { type: Number, default: 0 },
        monthRevenue: { type: Number, default: 0 },
        growthRate: { type: Number, default: 0 },
        lastMonthRevenue: { type: Number, default: 0 },
        revenueSources: { type: String, default: 'Subscription / Jobs' },
        subscriptionRevenue: { type: Number, default: 0 },
        oneTimeRevenue: { type: Number, default: 0 }
    },

    pendingPayments: {
        totalPendingAmount: { type: Number, default: 0 },
        overduePayments: { type: Number, default: 0 },
        highestEarningMonth: { type: String, default: '' },
        lowestEarningMonth: { type: String, default: '' },
        jobPostingRevenue: { type: Number, default: 0 }
    }
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;