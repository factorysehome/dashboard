import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Footerinfo = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  
  const queryParams = new URLSearchParams(location.search);
  const pageName = queryParams.get("page");

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setLoading(true);

        // Fetch data from the API
        const response = await axios.get(
          `https://factoryseghar-backend.onrender.com/api/pages?pagename=${pageName}`
        );

        // Check if the response contains data and extract the content
        if (response.data && response.data.length > 0) {
          const { Title, content } = response.data[0]; // Access the first item in the array

          // Replace \n with <br /> for HTML content
          const formattedTitle = Title.replace(/\n/g, "<br />");
          const formattedContent = content.replace(/\n/g, "<br />");

          setPageContent({ title: formattedTitle, content: formattedContent });
        } else {
          setPageContent({ error: "No content available for this page." });
        }
      } catch (error) {
        console.error("Error fetching page content:", error);
        setPageContent({ error: "Failed to load content." });
      } finally {
        setLoading(false);
      }
    };

    if (pageName) {
      fetchPageContent();
    }
  }, [pageName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{pageName.toUpperCase()}</h1>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (pageContent?.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">{pageContent.error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        {/* Page Title */}
        <h1
          className="text-4xl font-bold text-gray-800 mb-6"
          dangerouslySetInnerHTML={{ __html: pageContent.title }}
        />

        {/* Page Content */}
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl text-gray-700 text-[24px]"
          dangerouslySetInnerHTML={{ __html: pageContent.content }}
        />
      </div>
    </div>
  );
};

export default Footerinfo;