import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white p-4 sm:p-6 overflow-y-auto max-h-full xl:w-1/2">
        <h2 className="text-4xl font-bold text-left mt-2 sm:mt-6">Terms & Conditions</h2>

        <p className="text-sm text-gray-600 mt-6">
          Welcome to Hexagon! These terms and conditions outline the rules and regulations for the use of our platform. By accessing or using Hexagon, you agree to be bound by these terms. If you do not agree with any part of the terms, you may not access the service.
        </p>

        <div className="mt-8 space-y-6 text-sm text-gray-700">

          <div>
            <h3 className="font-semibold text-lg">1. Use of Service</h3>
            <p className="mt-2">
              You agree to use Hexagon only for lawful purposes. You are responsible for ensuring that your use of the platform does not violate any applicable laws or regulations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">2. Account Responsibility</h3>
            <p className="mt-2">
              You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">3. Image Ownership</h3>
            <p className="mt-2">
              All images generated using Hexagon are considered the intellectual property of the individual who created them. Hexagon does not claim ownership over the content created by its users.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">4. User-Generated Content</h3>
            <p className="mt-2">
              You are solely responsible for any content you generate using Hexagon. We do not monitor or control user-generated content, but we reserve the right to remove content that violates these terms.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">5. Prohibited Use</h3>
            <p className="mt-2">
              You agree not to use Hexagon to create, upload, or distribute any content that is illegal, harmful, hateful, abusive, violent, or otherwise objectionable.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">6. Limitation of Liability</h3>
            <p className="mt-2">
              Hexagon is provided "as is" without any warranties. We are not liable for any damages or losses resulting from your use or inability to use the platform.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">7. Privacy and Data Security</h3>
            <p className="mt-2">
              We are committed to protecting your personal data. Your information is securely stored and handled in accordance with industry best practices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">8. Changes to Terms</h3>
            <p className="mt-2">
              We may update our terms and conditions from time to time. Any changes will be effective immediately upon posting on this page.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">9. Governing Law</h3>
            <p className="mt-2">
              These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
          </div>

        </div>

        <p className="text-xs text-gray-500 mt-8">
          Last updated: April 27, 2025
        </p>

        <div className="mt-6">
          <Link
            to="/auth/register"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
