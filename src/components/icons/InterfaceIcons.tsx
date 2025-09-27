import React from 'react';
import { 
  FaUser, FaShoppingCart, FaSignOutAlt, FaHome, FaCog, FaSearch, FaMoon, FaSun,
  FaEdit, FaTrash, FaPlus, FaTimes, FaCheck, FaChevronDown, FaUpload, FaRobot,
  FaCreditCard, FaPaypal, FaWhatsapp, FaCheckCircle, FaLightbulb, FaQuoteLeft,
  FaBook, FaShield, FaUsers, FaDollarSign, FaBars, FaEnvelope, FaPhone,
  FaGraduationCap, FaGavel, FaBuilding, FaFileAlt
} from 'react-icons/fa';
import { 
  FaGoogle, FaApple, FaFacebook, FaXTwitter 
} from 'react-icons/fa6';
import { FaBox } from 'react-icons/fa';

// Basic UI Icons
export const UserIcon = FaUser;
export const ShoppingCartIcon = FaShoppingCart;
export const LogOutIcon = FaSignOutAlt;
export const DashboardIcon = FaHome;
export const SettingsIcon = FaCog;
export const SearchIcon = FaSearch;
export const MoonIcon = FaMoon;
export const SunIcon = FaSun;
export const EditIcon = FaEdit;
export const TrashIcon = FaTrash;
export const PlusIcon = FaPlus;
export const XIcon = FaTimes;
export const CheckIcon = FaCheck;
export const ChevronDownIcon = FaChevronDown;
export const UploadCloudIcon = FaUpload;
export const MenuIcon = FaBars;

// Feature Icons
export const CheckCircleIcon = FaCheckCircle;
export const LightbulbIcon = FaLightbulb;
export const QuoteIcon = FaQuoteLeft;
export const BookOpenIcon = FaBook;
export const ShieldCheckIcon = FaShield;
export const UsersIcon = FaUsers;
export const FinancialsIcon = FaDollarSign;
export const ContactIcon = FaEnvelope;
export const PhoneIcon = FaPhone;
export const PackageIcon = FaBox;

// Payment Icons
export const CreditCardIcon = FaCreditCard;
export const PayPalIcon = FaPaypal;
export const WhatsAppIcon = FaWhatsapp;

// Social Icons
export const GoogleIcon = FaGoogle;
export const AppleIcon = FaApple;
export const FacebookIcon = FaFacebook;
export { FaXTwitter as TwitterIcon };

// Professional Icons
export const CrmIcon = FaUsers;
export const EducationIcon = FaGraduationCap;
export const LegalIcon = FaGavel;
export const BusinessIcon = FaBuilding;
export const DocumentIcon = FaFileAlt;

// Custom Logo Icon
export const NexusProIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="currentColor">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1"/>
    <path d="M12 8h16l6 12-6 12H12l-6-12z" fill="currentColor"/>
    <circle cx="20" cy="20" r="4" fill="white"/>
  </svg>
);
