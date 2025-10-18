const PrivacyAndTerms = () => {
  return (
    <div className="rounded-2xl bg-white">
        {/* Privacy Policy Section */}
        <section className="mb-10">
            <p className="text-gray-600 leading-relaxed mb-4">
            We respect your privacy and are committed to safeguarding your personal data. This policy
            explains how your information is collected, stored, and used within our platform.
            </p>
        </section>

        {/* Data Storage & Security */}
        <section className="mb-10">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Data Storage & Security</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
            All user data is stored securely using <strong>Sanity</strong> as our primary content
            management and storage platform. Data is encrypted at rest and in transit to ensure maximum
            protection.
            </p>
            <p className="text-gray-600 leading-relaxed">
            Access control mechanisms are enforced across our systems to ensure that only authorized
            personnel can view or manage sensitive data.
            </p>
        </section>

        {/* Authentication */}
        <section className="mb-10">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Authentication</h3>
            <p className="text-gray-600 leading-relaxed">
            We use <strong>Google Authentication</strong> for secure sign-in. Your credentials are never
            stored on our servers — authentication is handled directly by Google’s secure systems.
            </p>
        </section>

        {/* Usage of Data */}
        <section className="mb-10">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Usage of Data</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
            Your data is used solely to provide, improve, and personalize your experience within the
            platform. We do not sell or rent your personal information to third parties.
            </p>
            <p className="text-gray-600 leading-relaxed">
            Limited analytics may be collected to improve the functionality and performance of our
            services.
            </p>
        </section>

        {/* Terms & Conditions */}
        <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Terms & Conditions</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
            By using our platform, you agree to comply with all applicable laws and regulations. You are
            responsible for the accuracy of the information you provide and for maintaining the security
            of your account.
            </p>
            <p className="text-gray-600 leading-relaxed">
            We reserve the right to suspend or terminate accounts found in violation of these terms.
            </p>
        </section>

        {/* Contact */}
        <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Contact</h3>
            <p className="text-gray-600 leading-relaxed">
            If you have questions about these policies, please contact us at{" "}
            <a href="mailto:chaitu.vsh@gmail.com" className="text-blue-600 underline">
                chaitu.vsh@gmail.com
            </a>.
            </p>
        </section>
    </div>
  )
}

export default PrivacyAndTerms
