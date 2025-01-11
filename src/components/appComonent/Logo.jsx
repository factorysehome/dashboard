import GoogleIcon from "../../assets/icons/google.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import gitIcon from "../../assets/icons/git.svg";

const Logo = () => {
  return (
    <>
     <div className=" grid grid-cols-3 justify-self-auto w-full  place-items-center ">
     <a href="https://www.google.com"><img src={GoogleIcon} alt="Google Icon" /></a>
      <a href="https://facebook.com"><img src={facebookIcon} alt="facebook Icon" /></a>
      <a href="https://github.com"><img src={gitIcon} alt="github Icon" /></a>
     </div>
      
    </>
  );
};

export default Logo;