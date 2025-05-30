import { FiPhone, FiMapPin, FiMail } from "react-icons/fi";

const contacts = [
  {
    id: 1,
    name: "Hayahulet Getahun Besha  Bldg  8th floor, Addis Ababa, Ethiopia",
    icon: <FiMapPin />,
  },
  {
    id: 2,
    name: "Yekassa.gc@gmail.com",
    icon: <FiMail />,
  },
  {
    id: 3,
    name: "+251930352058,+251943150606,+251116352122",
    icon: <FiPhone />,
  },
];

const ContactDetails = () => {
  return (
    <div className="w-full lg:w-1/2">
      <div className="font-serif text-left max-w-xl px-6">
        <h2 className="font-general-medium text-2xl text-primary-dark dark:text-primary-light mt-12 mb-8">
          Contact details
        </h2>
        <ul className="font-general-regular">
          {contacts.map((contact) => (
            <li className="flex items-center mb-4" key={contact.id}>
              <i className="text-2xl text-gray-500 dark:text-gray-400 mr-4">
                {contact.icon}
              </i>
              <span className="text-base sm:text-lg md:text-xl lg:text-[20px] mb-2 sm:mb-4 text-ternary-dark dark:text-ternary-light break-all">
                {contact.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactDetails;
