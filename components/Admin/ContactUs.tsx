import { Mail, Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="">
      <div className="space-y-6">
        {/* Email */}
        <div className="flex items-center space-x-4">
          <Mail className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Email</h2>
            <a
              href="mailto:chaitu.vsh@gmail.com"
              className="text-gray-600 hover:text-primary"
            >
              chaitu.vsh@gmail.com
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-4">
          <Phone className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Phone</h2>
            <a className="text-gray-600 hover:text-primary">+1 (425) 469-0169</a>
            <br />
            <a className="text-gray-600 hover:text-primary">+91 9629614270</a>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-gray-500 text-sm">
        Our support team is available Monday to Friday, 9 AM – 6 PM (IST).
      </div>
    </div>
  );
}

export default ContactUs;
