const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiUri = {
    auth: {
        login:"api/auth/login",
        otplogin: '/otp-login',
        verifyotp: '/otp-verfication',
        sessioninfo: 'session_info', 
        logout:"logout",
        update_user_details:"update_user_details",
    },
    jantaDrive: {
        pagename:"/pages?pagename=",
        contact:"/contact"
    },
  
};
export { apiUri, BASE_URL }