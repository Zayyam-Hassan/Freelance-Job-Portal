import React, { useState } from "react";
import Slider from "react-slick";
import {
  Star,
  Clock,
  RefreshCw,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Share2,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [activeTab, setActiveTab] = useState("about");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      country: "United States",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
      date: "2 weeks ago",
      review:
        "Amazing work! The website exceeded my expectations. The developer was very communicative and delivered everything on time. The design is beautiful and works perfectly on all devices. I'll definitely be coming back for more projects!",
      helpful: 24,
      notHelpful: 1,
    },
    {
      id: 2,
      name: "Michael Chen",
      country: "Singapore",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 5,
      date: "1 month ago",
      review:
        "Exceptional service! The attention to detail was remarkable. They went above and beyond to ensure my website was exactly what I needed. The code is clean and well-documented. Highly recommend!",
      helpful: 18,
      notHelpful: 0,
    },
    {
      id: 3,
      name: "Emma Watson",
      country: "United Kingdom",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      rating: 5,
      date: "2 months ago",
      review:
        "Outstanding experience working with this developer! They have a great eye for design and technical expertise. The website is fast, beautiful, and exactly what I was looking for. Will definitely work with them again!",
      helpful: 15,
      notHelpful: 2,
    },
  ];

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side */}
          <div className="lg:w-2/3">
            <nav className="text-[#74767E] text-sm mb-5">
              Graphics & Design {">"} Website Design {">"} Website Development
            </nav>

            <h1 className="text-[#404145] text-[28px] font-bold mb-6">
              I will create a professional and responsive website using React
              and Tailwind
            </h1>

            {/* Seller Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                alt="Seller"
              />
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[#404145]">
                  John Developer
                </span>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#FFB33E] text-[#FFB33E]"
                      />
                    ))}
                  </div>
                  <span className="text-[#FFB33E] font-medium">5.0</span>
                  <span className="text-[#74767E]">(127)</span>
                </div>
              </div>
            </div>

            {/* Image Slider */}
            <div className="mb-10">
              <Slider {...settings} className="gig-slider">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=1200&h=800&fit=crop"
                    alt="Project Preview"
                    className="w-full h-[600px] object-cover rounded-lg"
                  />
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
                    alt="Project Preview"
                    className="w-full h-[600px] object-cover rounded-lg"
                  />
                </div>
              </Slider>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex gap-8">
                <button
                  className={`pb-4 px-2 ${
                    activeTab === "about"
                      ? "border-b-2 border-[#1DBF73] text-[#1DBF73]"
                      : "text-[#74767E]"
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  About This Gig
                </button>
                <button
                  className={`pb-4 px-2 ${
                    activeTab === "reviews"
                      ? "border-b-2 border-[#1DBF73] text-[#1DBF73]"
                      : "text-[#74767E]"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </div>
            </div>

            {activeTab === "about" ? (
              <>
                {/* About This Gig */}
                <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                  <h2 className="text-[#404145] text-xl font-bold mb-6">
                    About This Gig
                  </h2>
                  <div className="text-[#62646A] leading-7 space-y-4">
                    <p>
                      I use an AI program to create images based on text
                      prompts. This means I can help you to create a vision you
                      have through a textual description of your scene without
                      requiring any reference images. Some things I've found it
                      often excels at are: Character portraits (E.g. a picture
                      to go with your DnD character) Landscapes (E.g.
                      wallpapers, illustrations to compliment a story) Logos
                      (E.g. Esports team, business, profile picture) You can be
                      as vague or as descriptive as you want. Being more vague
                      will allow the AI to be more creative which can sometimes
                      result in some amazing images. You can also be incredibly
                      precise if you have a clear image of what you want in
                      mind. All of the images I create are original and will be
                      found nowhere else. If you have any questions you're more
                      than welcome to send me a message.
                    </p>
                    <p>
                      With over 5 years of experience in web development, I
                      ensure that every project I deliver is pixel-perfect,
                      optimized for performance, and ready to help you achieve
                      your business goals.
                    </p>
                  </div>
                </div>

                {/* About The Seller */}
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h2 className="text-[#404145] text-xl font-bold mb-6">
                    About The Seller
                  </h2>
                  <div className="flex items-start gap-6">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
                      alt="Seller"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="space-y-3">
                      <h3 className="font-medium text-lg">John Developer</h3>
                      <p className="text-[#62646A]">Full Stack Web Developer</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-[#FFB33E] text-[#FFB33E]"
                            />
                          ))}
                        </div>
                        <span className="text-[#FFB33E] font-medium">5.0</span>
                        <span className="text-[#74767E]">(127)</span>
                      </div>
                      <button className="border border-[#1DBF73] text-[#1DBF73] px-6 py-2 rounded-md hover:bg-[#1DBF73] hover:text-white transition-colors">
                        Contact Me
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Reviews Section */
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-[#404145] text-xl font-bold">Reviews</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFB33E] font-medium text-xl">
                      5.0
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-[#FFB33E] text-[#FFB33E]"
                        />
                      ))}
                    </div>
                    <span className="text-[#74767E]">(127)</span>
                  </div>
                </div>

                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-8"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-[#404145]">
                              {review.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-[#74767E]">
                              <span>{review.country}</span>
                              <span>•</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Share2 className="w-5 h-5 text-[#74767E] cursor-pointer hover:text-[#1DBF73]" />
                          <Flag className="w-5 h-5 text-[#74767E] cursor-pointer hover:text-red-500" />
                        </div>
                      </div>

                      <div className="flex mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#FFB33E] text-[#FFB33E]"
                          />
                        ))}
                      </div>

                      <p className="text-[#62646A] leading-7 mb-4">
                        {review.review}
                      </p>

                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-[#74767E]">Helpful?</span>
                        <button className="flex items-center gap-2 text-[#74767E] hover:text-[#1DBF73]">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Yes</span>
                          <span>({review.helpful})</span>
                        </button>
                        <button className="flex items-center gap-2 text-[#74767E] hover:text-[#1DBF73]">
                          <ThumbsDown className="w-4 h-4" />
                          <span>No</span>
                          <span>({review.notHelpful})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Pricing Package */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Standard Package</h3>
                <span className="text-2xl font-bold">$99</span>
              </div>

              <p className="text-[#62646A] mb-6">
                Get a professional website with modern design, responsive
                layout, and optimized performance.
              </p>

              <div className="flex justify-between mb-6 text-sm text-[#62646A]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>4 Days Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>3 Revisions</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  "Responsive Design",
                  "Source Code",
                  "Content Upload",
                  "Design Customization",
                  "Include Source File",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-[#62646A]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1DBF73]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-[#1DBF73] text-white py-3 rounded-md hover:bg-[#19a463] transition-colors font-medium">
                Continue ($99)
              </button>

              <button className="w-full mt-3 border border-[#1DBF73] text-[#1DBF73] py-3 rounded-md hover:bg-[#F7F9FC] transition-colors font-medium">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
