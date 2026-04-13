import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="relative mt-20">

      {/* 🔥 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-black"></div>

      {/* Glow */}
      <div className="absolute w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full top-0 left-0"></div>
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full bottom-0 right-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo + About */}
          <div>
            <h2 className="text-2xl font-bold mb-4">K N Singh</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing quality education since 1985. We focus on academic excellence,
              discipline, and overall student development.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { name: "Home", link: "/" },
                { name: "About", link: "/about" },
                { name: "Courses", link: "/courses" },
                { name: "Faculty", link: "/faculty" },
                { name: "Contact", link: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.link} className="hover:text-white transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Azamgarh, Uttar Pradesh</li>
              <li>📞 +91 98765 43210</li>
              <li>📧 info@knsingh.edu.in</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex gap-4 text-gray-400 text-xl">
              <a href="#" className="hover:text-blue-500 transition"><FaFacebook /></a>
              <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-red-500 transition"><FaYoutube /></a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} K N Singh Inter College. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ for education</p>
        </div>

      </div>
    </footer>
  )
}