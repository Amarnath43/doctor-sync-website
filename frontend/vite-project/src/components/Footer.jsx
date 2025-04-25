
import React from 'react'

const Footer = () => {
  return (
    <footer className="px-8 py-12 text-white bg-gradient-to-r from-gray-800 via-gray-900 to-black">
 <div className="max-w-6xl mx-auto text-center space-y-6">
   <h2 className="text-xl font-semibold">Stay Connected</h2>
   <p className="text-sm text-gray-400">
   Follow us on Social Media for the latest updates, health tips, doctor recommendations, and more!
   </p>
   <div className="flex justify-center space-x-6">
     <a
       href="#"
       className="p-3 rounded-full bg-gray-700 hover:bg-[#00DFBD] transition-all duration-300"
       aria-label="Facebook"
     >
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="currentColor"
         viewBox="0 0 24 24"
         className="w-6 h-6"
       >
         <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.672v-3.622h3.148V8.413c0-3.118 1.902-4.815 4.678-4.815 1.33 0 2.475.099 2.807.143v3.256h-1.923c-1.51 0-1.802.718-1.802 1.771v2.32h3.6l-.468 3.622h-3.132V24h6.144c.73 0 1.325-.593 1.325-1.326V1.326C24 .593 23.407 0 22.675 0z" />
       </svg>
     </a>
     <a
       href="#"
       className="p-3 rounded-full bg-gray-700 hover:bg-[#00DFBD] transition-all duration-300"
       aria-label="Twitter"
     >
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="currentColor"
         viewBox="0 0 24 24"
         className="w-6 h-6"
       >
         <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.959-2.173-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.228-.616v.061c0 2.386 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.623-.03-.924-.086.631 1.953 2.445 3.376 4.604 3.416-1.68 1.318-3.809 2.105-6.102 2.105-.394 0-.779-.023-1.17-.067 2.188 1.402 4.768 2.221 7.548 2.221 9.142 0 14.307-7.721 14.307-14.417 0-.219-.005-.436-.015-.653.983-.713 1.833-1.6 2.506-2.614z" />
       </svg>
     </a>
     <a
       href="#"
       className="p-3 rounded-full bg-gray-700 hover:bg-[#00DFBD] transition-all duration-300"
       aria-label="LinkedIn"
     >
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="currentColor"
         viewBox="0 0 24 24"
         className="w-6 h-6"
       >
         <path d="M22.23 0H1.77C.79 0 0 .774 0 1.725v20.55C0 23.226.79 24 1.77 24h20.46C23.21 24 24 23.226 24 22.275V1.725C24 .774 23.21 0 22.23 0zM7.12 20.452H3.56V9.084h3.56v11.368zm-1.78-12.85c-1.14 0-2.06-.927-2.06-2.065a2.063 2.063 0 1 1 4.12 0c0 1.138-.92 2.065-2.06 2.065zm15.172 12.85h-3.56v-5.604c0-1.34-.026-3.062-1.865-3.062-1.865 0-2.152 1.454-2.152 2.959v5.707h-3.56V9.084h3.42v1.548h.05c.476-.9 1.636-1.85 3.366-1.85 3.6 0 4.268 2.368 4.268 5.452v6.218z" />
       </svg>
     </a>
   </div>
   <p className="text-xs text-gray-500">© 2025 DoctorSync. All Rights Reserved.</p>
 </div>
</footer>
  )
}

export default Footer

 