import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    accountRestrictions: {
        allowNewAccounts: { type: Boolean, default: true },
        allowResetPassword: { type: Boolean, default: true }
    },
    userDeletion: {
        gracePeriod: { type: Number, default: 7 } // Default grace period in days
    }
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
