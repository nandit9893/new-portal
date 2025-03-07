"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";

const GeneralSettings = () => {
  const [allowNewAccounts, setAllowNewAccounts] = useState(false);
  const [allowResetPassword, setAllowResetPassword] = useState(false);
  const [gracePeriod, setGracePeriod] = useState(30);

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full h-full max-w-6xl bg-white shadow-lg rounded-lg p-6 md:p-8 overflow-auto">
        {/* Heading */}
        <h2 className="text-center text-3xl font-bold mb-4 text-gray-900">
          General Settings
        </h2>

        {/* Account Restrictions Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Account Restrictions:
            </h3>

            <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="mb-2 md:mb-0">
                <p className="font-semibold text-gray-900">Allow creating new accounts</p>
                <p className="text-gray-700 text-sm">
                  By default, any user visiting your domain can sign up for a new account.
                </p>
              </div>
              <Switch
                checked={allowNewAccounts}
                onChange={setAllowNewAccounts}
                className={`${allowNewAccounts ? "bg-teal-600" : "bg-gray-300"}
                  relative inline-flex h-6 w-11 items-center rounded-full transition duration-300`}
              >
                <span
                  className={`${allowNewAccounts ? "translate-x-6" : "translate-x-1"}
                    inline-block h-4 w-4 transform bg-white rounded-full transition duration-300`}
                />
              </Switch>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm mt-2">
              <div className="mb-2 md:mb-0">
                <p className="font-semibold text-gray-900">Allow resetting password</p>
                <p className="text-gray-700 text-sm">
                  By default, users can reset their passwords.
                </p>
              </div>
              <Switch
                checked={allowResetPassword}
                onChange={setAllowResetPassword}
                className={`${allowResetPassword ? "bg-teal-600" : "bg-gray-300"}
                  relative inline-flex h-6 w-11 items-center rounded-full transition duration-300`}
              >
                <span
                  className={`${allowResetPassword ? "translate-x-6" : "translate-x-1"}
                    inline-block h-4 w-4 transform bg-white rounded-full transition duration-300`}
                />
              </Switch>
            </div>
          </div>

          <hr className="border-gray-300" />

          {/* User Deletion Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              User Deletion:
            </h3>

            <div className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">User deletion grace delay</p>
                <p className="text-gray-700 text-sm">
                  The default grace delay period is 30 days. Instance Admins can adjust this period in the User deletion section.
                </p>
              </div>
              <input
                type="number"
                value={gracePeriod}
                onChange={(e) => setGracePeriod(e.target.value)}
                className="mt-2 md:mt-0 p-3 w-20 text-center bg-gray-200 rounded-lg outline-none text-gray-900 font-semibold border border-gray-400"
                min="1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;