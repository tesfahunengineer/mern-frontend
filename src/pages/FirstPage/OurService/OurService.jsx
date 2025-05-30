import { motion } from "framer-motion";
import road from "../../../assets/road.jpg";
import image6 from "../../../assets/image6.jpg";
import bridge from "../../../assets/bridge.jpg";
import sportfields from "../../../assets/sportfields.jpg";
import accessroad from "../../../assets/accessroad.jpg";
import viptoilet from "../../../assets/viptoilet.jpg";
import NavBar from "../../NavBar";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const OurService = () => {
  const location = useLocation();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      img: road,
      title: "Road Construction",
      description:
        "We build modern and durable roads using the latest technology. Our road construction service prioritizes safety, longevity, and efficiency. From initial design to final pavement, we use advanced materials and machinery to ensure smooth, sustainable, and weather-resistant roads. Trusted by clients across industries, we deliver projects on time and within budget—creating infrastructure that supports community growth and economic development.",
    },
    {
      img: image6,
      title: "Building Construction",
      description:
        "High-quality building construction services for residential and commercial use.We offer top-tier construction services tailored to meet the unique needs of both residential and commercial projects. Whether you're building your dream home or a commercial space, our team ensures meticulous attention to detail, using the latest techniques and premium materials. We prioritize quality, safety, and timely delivery, providing exceptional results that stand the test of time.From initial design to the final touches, we work closely with clients to bring their visions to life, delivering durable and functional spaces. With our experienced team and commitment to excellence, your project is in safe hands.",
    },
    {
      img: bridge,
      title: "Bridge Construction",
      description:
        "Robust and reliable bridge construction across various terrains.We specialize in constructing durable and reliable bridges that are designed to withstand the challenges of diverse terrains. Whether building over rivers, valleys, or mountainous regions, our expert engineers ensure that each bridge is constructed with precision and the highest quality materials. Our approach focuses on safety, structural integrity, and long-lasting performance, no matter the environmental conditions.With years of experience and advanced engineering techniques, we deliver bridges that not only meet but exceed industry standards. Each project is carefully managed to ensure timely completion, minimal disruption, and lasting value for the communities and industries that rely on them.",
    },
    {
      img: sportfields,
      title: "SportField Construction",
      description:
        "Design and construct high-quality sport fields and arenas.We specialize in the design and construction of top-quality sport fields and arenas that meet international standards. Whether it’s for soccer, football, tennis, or multi-purpose facilities, we ensure that each project is built to provide the best playing experience. Our team uses advanced materials and cutting-edge technology to create durable, safe, and aesthetically pleasing sports environments.From the initial design phase to the final construction, we prioritize functionality, safety, and sustainability. Our expert designers and engineers work closely with clients to meet specific needs and expectations, creating arenas and fields that cater to both athletes and spectators. With our comprehensive services.",
    },
    {
      img: accessroad,
      title: "AccessRoad Construction",
      description:
        "Creating accessible roads to improve connectivity.We specialize in the construction of high-quality roads designed to enhance connectivity and ensure seamless travel. Whether it's urban roads, highways, or rural access routes, our team focuses on creating durable, safe, and efficient infrastructure that improves accessibility for communities and businesses alike.Using the latest construction techniques and materials, we build roads that withstand varying traffic loads and environmental conditions. Our commitment to sustainability ensures that each project is designed with long-term durability in mind, reducing maintenance costs and providing a reliable transportation network. From planning to execution, we prioritize quality, safety, and ease of access, helping to improve mobility and foster economic growth.",
    },
    {
      img: viptoilet,
      title: "VipToilet Construction",
      description:
        "Modern and hygienic VIP toilet facilities for events and public use.We provide premium VIP toilet facilities designed to offer the highest level of comfort, hygiene, and convenience for events and public spaces. Our modern facilities are equipped with top-of-the-line features, including well-maintained interiors, elegant finishes, and eco-friendly solutions that ensure a pleasant experience for all users.Whether for high-profile events, festivals, or public gatherings, we prioritize cleanliness, functionality, and aesthetics. Our team ensures that every unit is thoroughly sanitized and stocked with essential amenities, offering a luxurious and hygienic environment for every guest. With a focus on user experience and reliability, we provide VIP toilet solutions that elevate the overall event or venue experience.",
    },
  ];
  // Check if the current route is the 'OurService' page
  const showFooter = location.pathname === "/ourservices";
  return (
    <>
      <NavBar />
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen py-12 mt-10 ">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index < 3 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group relative bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-gray-700 overflow-hidden cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-64 object-cover rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:-translate-x-2 group-hover:-translate-y-2"
                    whileHover={{ x: -5, y: -5 }}
                  />
                </div>
                <div className="mt-4">
                  <p className="font-serif text-center text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {service.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedService && (
          <div className="pt-10 sm:pt-16 fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000] px-4 overflow-y-auto ">
            <div className="pt-10 sm:pt-16 relative bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md sm:max-w-lg w-full shadow-lg my-12">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-3 right-3  text-2xl font-bold z-10 text-red-600 dark:text-red-400"
              >
                &times;
              </button>

              {/* Image */}
              <img
                src={selectedService.img}
                alt={selectedService.title}
                className="w-full sm:w-72 h-48 sm:h-64 object-cover rounded-lg mb-4"
              />

              {/* Title */}
              <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {selectedService.title}
              </h2>

              {/* Description */}
              <p className=" font-serif text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {selectedService.description}
              </p>
            </div>
          </div>
        )}
        {/* Conditionally render the footer */}
        {showFooter && <Footer />}
      </div>
    </>
  );
};

export default OurService;
