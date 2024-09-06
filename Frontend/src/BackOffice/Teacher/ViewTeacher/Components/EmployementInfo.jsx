// components/EnrollmentInformation.jsx
import React from 'react';

const EmployementInformation = ({ teacher }) => (
    <div className="bg-white shadow-lg mb-6">
        <div className="border-t border-gray-200 ">
            <dl>
                <div
                    className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Date d'inscription
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {new Date(teacher.employmentInfo?.hireDate).toLocaleDateString()}
                    </dd>
                </div>
                <div
                    className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Filière
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {teacher.employmentInfo?.formation?.name}
                    </dd>
                </div>
            </dl>
        </div>
        </div>
        );

        export default EmployementInformation;
